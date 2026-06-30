/**
 * Connection Pool 유무에 따른 성능 비교 벤치마크
 *
 * 사용법:
 *   1. PostgreSQL이 로컬 또는 접근 가능한 곳에 떠있어야 합니다.
 *   2. npm install pg
 *   3. 아래 DB_CONFIG를 본인 환경에 맞게 수정
 *   4. node pool-benchmark.js
 *
 * 측정 항목:
 *   - 방식 A: 매 쿼리마다 새 Connection 생성 후 종료 (Pool 없음)
 *   - 방식 B: pg-pool로 Connection 재사용 (Pool 있음)
 *   비교 지표: 전체 소요 시간, 요청당 평균 지연, 처리량(req/sec)
 */

const { Client, Pool } = require("pg");

const DB_CONFIG_WITHOUT_POOL = {
  host: "localhost",
  port: 5432, // poolwithout 컨테이너
  user: "postgres",
  password: "postgres",
  database: "postgres",
};

const DB_CONFIG_WITH_POOL = {
  host: "localhost",
  port: 5433, // poolwith 컨테이너
  user: "postgres",
  password: "postgres",
  database: "postgres",
};

// 실제로 측정할 쿼리. 너무 가벼우면 Pool 효과가 묻힐 수 있어
// 약간의 처리 비용이 있는 쿼리를 사용합니다.
const QUERY = "SELECT pg_sleep(0.01), 1 as result";

/**
 * 방식 A: Connection Pool 없이 매 요청마다 connect → query → end
 */
async function runWithoutPool(totalRequests, concurrency) {
  const startedAt = Date.now();
  const latencies = [];

  async function singleRequest() {
    const reqStart = Date.now();
    const client = new Client(DB_CONFIG_WITHOUT_POOL);
    await client.connect(); // 매번 TCP 연결 + 인증 비용 발생
    await client.query(QUERY);
    await client.end(); // 매번 연결 종료
    latencies.push(Date.now() - reqStart);
  }

  await runBatched(totalRequests, concurrency, singleRequest);

  const totalMs = Date.now() - startedAt;
  return summarize("Connection Pool 없음", totalMs, latencies, totalRequests);
}

/**
 * 방식 B: pg-pool로 Connection 재사용
 */
async function runWithPool(totalRequests, concurrency) {
  const pool = new Pool({
    ...DB_CONFIG_WITH_POOL,
    max: concurrency, // 풀 사이즈를 동시 요청 수와 맞춰 비교 조건을 동일하게 설정
  });

  const startedAt = Date.now();
  const latencies = [];

  async function singleRequest() {
    const reqStart = Date.now();
    const client = await pool.connect(); // 유휴 connection을 즉시 재사용
    await client.query(QUERY);
    client.release(); // 종료하지 않고 풀에 반납
    latencies.push(Date.now() - reqStart);
  }

  await runBatched(totalRequests, concurrency, singleRequest);

  const totalMs = Date.now() - startedAt;
  await pool.end();
  return summarize("Connection Pool 있음", totalMs, latencies, totalRequests);
}

/**
 * concurrency만큼 동시에 실행하면서 totalRequests를 모두 처리할 때까지 반복
 */
async function runBatched(totalRequests, concurrency, fn) {
  let completed = 0;
  while (completed < totalRequests) {
    const batchSize = Math.min(concurrency, totalRequests - completed);
    const batch = Array.from({ length: batchSize }, () => fn());
    await Promise.all(batch);
    completed += batchSize;
  }
}

function summarize(label, totalMs, latencies, totalRequests) {
  const sorted = [...latencies].sort((a, b) => a - b);
  const avg = latencies.reduce((a, b) => a + b, 0) / latencies.length;
  const p50 = sorted[Math.floor(sorted.length * 0.5)];
  const p95 = sorted[Math.floor(sorted.length * 0.95)];
  const throughput = (totalRequests / totalMs) * 1000;

  const result = {
    label,
    totalMs,
    avgLatencyMs: Number(avg.toFixed(2)),
    p50LatencyMs: p50,
    p95LatencyMs: p95,
    throughputReqPerSec: Number(throughput.toFixed(2)),
  };

  console.log(`\n--- ${label} ---`);
  console.log(`총 소요 시간      : ${result.totalMs} ms`);
  console.log(`평균 지연         : ${result.avgLatencyMs} ms`);
  console.log(`p50 지연          : ${result.p50LatencyMs} ms`);
  console.log(`p95 지연          : ${result.p95LatencyMs} ms`);
  console.log(`처리량            : ${result.throughputReqPerSec} req/sec`);

  return result;
}

(async () => {
  // 동시에 보낼 요청 수와 반복 횟수 (필요에 따라 조정)
  const CONCURRENCY = 20; // 동시에 날릴 요청 수
  const TOTAL_REQUESTS = 200; // 총 요청 수

  console.log(`설정: 동시 요청 ${CONCURRENCY}개, 총 요청 ${TOTAL_REQUESTS}개`);

  //"SELECT pg_sleep(0.01) 1 as result" 쿼리를 20번씩 10번 요청하여 총 200쿼리 요청
  const withoutPool = await runWithoutPool(TOTAL_REQUESTS, CONCURRENCY);
  const withPool = await runWithPool(TOTAL_REQUESTS, CONCURRENCY);

  console.log("\n=== 비교 결과 ===");
  console.log(
    `총 소요 시간 차이 : ${withoutPool.totalMs - withPool.totalMs} ms 더 빠름 (Pool 있음)`,
  );
  console.log(
    `처리량 차이       : ${(withPool.throughputReqPerSec / withoutPool.throughputReqPerSec).toFixed(2)}배`,
  );

  process.exit(0);
})().catch((err) => {
  console.error("벤치마크 실행 중 오류:", err);
  process.exit(1);
});
