// Q10(b): "UserService가 계산 결과를 올바른 형태로 리포지토리에 전달"
//
// 검증 대상을 solitary / sociable / createTestingModule(통합) 중 어디에 배치할지 스스로 판단한다.
// 정답이 하나는 아니다 — 무엇을 골랐는지와 트레이드오프를 한 줄로 적을 수 있으면 통과.
//
//   solitary: UserValidator도 목이라 계산 로직과 무관하게 "전달 형태"만 순수하게 검증 가능.
//             단, 리포지토리로 넘기는 값이 실제 계산과 맞는지는 별도 보증이 없다.
//   sociable: UserValidator를 expose하면 실제 계산 결과가 그대로 전달되는지까지 한 번에 검증되지만,
//             검증 대상이 "전달 형태"와 "계산 로직" 둘로 넓어져 실패 원인 특정이 더 어려워진다.
//
// 대상 클래스: src/user/user.service.ts (UserService.purchase)

describe('Q10(b): UserService → UserRepository 전달 형태 검증', () => {
  it.todo(
    'solitary 또는 sociable 중 하나를 선택해 구현하고, 선택 이유를 주석으로 남긴다',
  );
});
