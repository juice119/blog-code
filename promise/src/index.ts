const API_DELAY = 2_000;
const DB_DELAY = 1_000;

async function main() {
    console.log('main start');
    const result = await fetchFollowingChecked(1);
    console.log({ result });
    console.log('main end');
}
main();


async function fetchFollowingChecked(userId: number): Promise<boolean> {
  console.log('fetchFollowingChecked start');
  // requestTwitterApiForFollowingStatus 호출은 3rd-party api 서비스를 이용함
  // 해당 호출은 너무 자주 timeout 이 발생하는 가용성이 낮은 서비스임
  // 따라서 api 호출이 너무 지연되면 (약 2s) DB 에 있던 과거 값으로 응답을 주게끔 구성
  const result = await Promise.any([
    requestTwitterApiForFollowingStatus(userId),
    fetchPastFollowingStatusOnDB(userId),
  ]);

  console.log(result);

  console.log('fetchFollowingChecked end');
  return true;
}

async function requestTwitterApiForFollowingStatus(userId: number): Promise<string> {
  console.log('requestTwitterApiForFollowingStatus start');
  //   이 함수는 axios 로 twitter api 를 호출하는데 axios default timeout 설정값인 0 이 적용되어 있음
  return new Promise((resolve) => setTimeout(() => {
    console.log('requestTwitterApiForFollowingStatus end');
    resolve('isApi')
  }, API_DELAY));
}


async function fetchPastFollowingStatusOnDB(userId: number): Promise<string> {
  console.log('fetchPastFollowingStatusOnDB start');
  return new Promise((resolve) => setTimeout(() => {
    console.log('fetchPastFollowingStatusOnDB end');
    resolve('isDB')
  }, DB_DELAY));
}