// Q10(c): "리포지토리의 UPSERT가 중복 저장을 막음"
//
// 리포지토리 레이어의 규칙이라 solitary 목킹 대상이 아니라 @nestjs/testing의
// createTestingModule 기반 통합 테스트로 검증한다.
//
// 대상 클래스: src/user/user.repository.ts (UserRepository.upsertPurchase, getPurchases)
//
// import { Test } from '@nestjs/testing';
// import { UserRepository } from '../../src/user/user.repository';

describe('Q10(c): UserRepository UPSERT', () => {
  it.todo(
    'Test.createTestingModule({ providers: [UserRepository] }).compile()로 실제 리포지토리를 준비한다',
  );

  it.todo(
    '같은 userId로 upsertPurchase를 두 번 호출해도 getPurchases 결과가 1건으로 유지되는지 검증한다',
  );
});
