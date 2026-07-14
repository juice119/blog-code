// Q12: Suites가 못 잡는 버그 만들기.
//
// 일부러 모듈에서 프로바이더 등록을 빼먹거나 가드를 제거한 뒤, Suites 단위 테스트가 전부 통과함을
// 확인한다. 그다음 같은 버그를 잡아내는 통합/e2e 테스트를 작성해서 "이 층이 왜 필요한가"를 코드로
// 증명한다 (Level 1 Q4를 몸으로 확인하는 문제).
//
// 대상: src/user/user.controller.ts (UserController, @UseGuards(AuthGuard))
//       src/user/user.module.ts (UserModule 프로바이더 등록)
//       src/user/auth.guard.ts (AuthGuard)
//
// import { TestBed } from '@suites/unit';
// import { Test } from '@nestjs/testing';
// import request from 'supertest';
// import { UserController } from '../../src/user/user.controller';
// import { UserModule } from '../../src/user/user.module';
// import { CONFIG_OPTIONS } from '../../src/user/config';

describe('Q12(a): Suites solitary는 가드를 통과하지 않는다', () => {
  it.todo(
    'TestBed.solitary(UserController)로 컨트롤러 메서드를 직접 호출하면, 인증 헤더 없이도 통과하는지 확인한다',
  );
});

describe('Q12(b): 프로바이더 누락은 createTestingModule에서만 드러난다', () => {
  it.todo(
    'AuthGuard가 의존하는 CONFIG_OPTIONS 프로바이더를 일부러 빼고 테스트 모듈을 구성한 뒤, app.init()이 어떻게 실패하는지 확인한다',
  );

  it.todo(
    '정상적으로 구성된 UserModule에서는 x-api-key 헤더 없이 요청하면 401이 나는지 supertest로 검증한다',
  );
});
