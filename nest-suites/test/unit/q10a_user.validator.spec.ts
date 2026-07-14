// Q10(a): "할인율 계산 시 쿠폰과 등급 혜택이 중복 적용되지 않는다" — 순수 계산 규칙.
// UserValidator는 I/O도 NestJS DI도 없는 순수 클래스라서 Suites도 createTestingModule도
// 필요 없다. `new UserValidator()`로 바로 테스트하면 된다.
//
// 대상 클래스: src/user/user.validator.ts (calculateDiscountRate, isValidEmail)

// import { UserValidator } from '../../src/user/user.validator';

describe('UserValidator', () => {
  it.todo('쿠폰율과 등급율 중 더 큰 값만 적용한다 (합산 금지)');

  it.todo('basic 등급은 등급 할인이 0이라 쿠폰율만 적용된다');

  it.todo('결과는 maxDiscountRate를 넘지 않는다');

  it.todo('이메일 형식을 검사한다');
});
