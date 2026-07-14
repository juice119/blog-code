// Q11: 과잉 목킹 탐지.
//
// Q7에서 toHaveBeenCalledWith로 검증한 테스트를 하나 골라, 서비스 내부 구현을 리팩터링(메서드 분리,
// 호출 순서 변경 등)했을 때 깨지는지 실험한다.
//
// 대상 클래스: src/user/user.service.ts (UserService.purchase, UserService.revokeAccess)

describe('Q11: 상호작용 검증 vs 결과 검증', () => {
  it.todo(
    'toHaveBeenCalledWith로 검증한 기존 테스트가 내부 구현 변경에 깨지는지 실험한다',
  );

  it.todo(
    '같은 시나리오를 "결과 검증"으로 바꿔 리팩터링에도 살아남는 버전을 작성한다',
  );

  it.todo(
    'revokeAccess처럼 부수효과 자체가 목적인 메서드에서 상호작용 검증(toHaveBeenCalledWith)이 정당한 이유를 한 줄로 적는다',
  );
});
