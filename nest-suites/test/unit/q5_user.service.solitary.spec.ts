// Q5~Q8: TestBed.solitary() 손에 익히기.
//
// 대상 클래스: src/user/user.service.ts (UserService)
//   생성자 의존성: UserRepository, UserValidator, @Inject(CONFIG_OPTIONS) config
//
// 힌트 API:
//   TestBed.solitary(UserService).compile() -> { unit, unitRef }
//   unitRef.get(UserRepository)                         // 자동 mock 꺼내기
//   .mock(UserRepository).impl(stubFn => ({ ... }))      // 나중에 unitRef.get()으로 재구성 가능
//   .mock(CONFIG_OPTIONS).final({ ... })                 // 불변, unitRef.get() 불가
//
// import { TestBed, Mocked } from '@suites/unit';
// import { CONFIG_OPTIONS, ConfigOptions } from '../../src/user/config';
// import { UserRepository } from '../../src/user/user.repository';
// import { UserService } from '../../src/user/user.service';

describe('Q5: 기본 solitary', () => {
  it.todo(
    'beforeAll에서 컴파일하고, unitRef.get()으로 리포지토리 목을 꺼내 mockResolvedValue로 스텁한다',
  );

  it.todo(
    '목을 하나도 설정 안 한 메서드를 호출하면 무엇이 반환되는지 관찰하고 주석으로 기록한다',
  );
});

describe('Q6: mock().impl() vs mock().final()', () => {
  it.todo('impl()로 스텁한 의존성은 unitRef.get()으로 꺼낼 수 있다');

  it.todo(
    'final()로 스텁한 의존성을 unitRef.get()으로 꺼내려 하면 어떻게 되는지 확인하고, 왜 그렇게 설계됐는지 한 줄로 설명한다',
  );
});

describe('Q7: impl()의 stubFn 파라미터', () => {
  it.todo(
    'stubFn이 무엇인지 확인하고 (Vitest 어댑터에서의 정체), stubFn().mockResolvedValue(...) 로 사전 구성 + toHaveBeenCalledWith 검증까지 하는 테스트를 작성한다',
  );
});

describe('Q8: 토큰 기반 의존성 (@Inject(CONFIG_OPTIONS))', () => {
  it.todo(
    'symbol 토큰으로 주입받는 의존성의 목을 unitRef.get(CONFIG_OPTIONS)로 꺼낸다',
  );
});
