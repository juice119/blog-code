// Q13: 수명주기 함정.
//
// beforeAll에서 한 번만 compile하면 mock 호출 기록(toHaveBeenCalled 등)이 테스트 간에 누적된다.
// 테스트 A의 호출이 테스트 B의 검증을 오염시키는 상황을 재현하고, beforeEach compile 또는
// mockClear로 해결한 버전과 비교한다.
//
// 대상 클래스: src/user/user.service.ts (UserService.purchase)

describe('beforeAll 공유 — 호출 기록이 테스트 간 누적된다 (오염 재현)', () => {
  it.todo('테스트 A에서 purchase를 호출한다');

  it.todo(
    '테스트 B에서 A의 호출까지 누적된 toHaveBeenCalledTimes를 관찰하고 기록한다',
  );
});

describe('beforeEach 격리 — 매 테스트마다 새로 컴파일 (해결)', () => {
  it.todo(
    'beforeEach에서 매번 compile해서 테스트 간 목 상태가 격리되는지 확인한다',
  );

  it.todo(
    'beforeAll 버전과 beforeEach 버전의 비용(속도 vs 격리)을 한 줄씩 기록한다',
  );
});
