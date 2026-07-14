// Q9: sociable + expose.
//
// 대상 클래스: src/user/user.service.ts (UserService) — src/user/user.validator.ts (UserValidator, 순수 로직)
//
// 힌트 API:
//   TestBed.sociable(UserService).expose(UserValidator).compile() -> { unit, unitRef }
//   expose한 클래스는 진짜 구현이 돌고, 나머지(UserRepository 등)는 여전히 자동 mock.
//
// import { TestBed, Mocked } from '@suites/unit';
// import { UserRepository } from '../../src/user/user.repository';
// import { UserService } from '../../src/user/user.service';
// import { UserValidator } from '../../src/user/user.validator';

describe('Q9: sociable + expose', () => {
  it.todo(
    'UserValidator는 진짜로 실행되고 UserRepository는 목인 상태로 UserService를 테스트한다',
  );

  it.todo(
    'expose한 UserValidator를 unitRef.get()으로 꺼내보고 결과를 기록한다 — 왜 의도적으로 막아놨는지 설명',
  );

  it.todo(
    '.expose()를 한 번도 안 부르면 어떻게 되는지 확인한다 (런타임 에러인지, 타입 에러인지)',
  );
});
