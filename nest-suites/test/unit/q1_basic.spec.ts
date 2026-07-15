// Level 1 — 개념 이해 (README.md 참고)
// 코드로 증명할 대상이 없는 개념 문답. 노트나 이 파일 주석에 직접 답을 채워 넣는다.

describe('Level 1 — 개념 이해', () => {
  it('Q1. Suites에서 Stub, Mock, Mocked<T>의 관계를 한 문장씩 정의할 수 있는가? ("Mock은 ___의 집합이다")', () => {
    return `
    - Stub은 정해진 값을 반환하는 개별 메서드다.
    - Mock은 Stub들의 집합이다.
    - Mocked<T>는 모든 메서드가 Stub인 클래스의 타입 표현이다.`;
  });

  it('Q2. TestBed.solitary()와 @nestjs/testing의 Test.createTestingModule()은 내부 동작이 근본적으로 어떻게 다른가? (힌트: 하나는 NestJS 컨테이너를 실제로 부트스트랩하고, 하나는 하지 않는다)', () => {
    return `
Test.createTestingModule(): 실제 NestJS DI 컨테이너를 부트스트랩한다. 
모듈 메타데이터(providers, imports 등)를 읽어 실제 Nest의 IoC 컨테이너를 구성하고, overrideProvider() 등으로 명시적으로 오버라이드하지 않는 한 모든 provider가 실제 인스턴스로 생성된다. 
컨테이너 전체가 뜨기 때문에 순환 의존성, 모듈 임포트 누락 등 실제 부트스트랩 이슈가 테스트 시점에 드러난다.

TestBed.solitary(): NestJS 컨테이너를 부트스트랩하지 않는다. 
대상 클래스(UserService)의 생성자 메타데이터(reflect-metadata로 저장된 타입 정보)만 리플렉션으로 읽어서, 실제 DI 컨테이너 없이 "가상 컨테이너(virtual test container)"를 만들고 그 의존성들을 자동으로 Mock으로 대체해 생성자에 주입한다. 
Nest 모듈 시스템 자체가 개입하지 않으므로 더 가볍고 빠르다.
    `;
  });

  it('Q3. solitary와 sociable의 차이를 "무엇이 진짜이고 무엇이 목인가"로 설명. sociable은 왜 여전히 단위 테스트로 분류되는가? (힌트: I/O 경계)', () => {
    return `
Solitary: 대상 클래스만 진짜. 생성자에 주입되는 모든 의존성은 Mock.
Sociable: 대상 클래스 + .expose()로 지정한 일부 의존성이 진짜. 그 외(특히 I/O 경계에 닿는 것들)는 여전히 Mock.

Sociable이 여전히 단위 테스트로 분류되는 이유: .expose()로 real 구현을 쓰더라도 이는 순수 로직을 가진 협력 객체(예: 다른 서비스/유틸 클래스)에 한정된다. 실제 DB, 외부 API, 파일시스템, 네트워크 같은 I/O 경계는 항상 Mock으로 남는다. 즉 여러 클래스가 실제로 협업하는 걸 검증하긴 하지만, 프로세스 경계를 넘는 실제 부작용(side effect)이 전혀 없다는 점에서 통합 테스트가 아니라 여전히 단위 테스트다. I/O가 개입하는 순간 그건 integration test 영역이다.
    `;
  });

  it('Q4. "단위 테스트는 Suites, 모듈 구성 검증은 createTestingModule" — Suites로는 검증할 수 없는 것이 무엇이길래 이렇게 나뉘는가? (힌트: 가드, 모듈 imports, 프로바이더 등록 누락)', () => {
    return `
Suites의 TestBed.solitary()/sociable()은 **대상 클래스의 생성자 메타데이터만 리플렉션으로 읽는다**. 
Nest의 @Module() 데코레이터, 모듈 그래프, IoC 컨테이너 자체를 부트스트랩하지 않는다. 따라서 다음은 원천적으로 검증 범위 밖이다.

- **모듈 imports/exports 누락**: 어떤 프로바이더가 실제로 다른 모듈에서 export되어 주입 가능한 상태인지는 모듈 그래프가 조립되어야 알 수 있다.
 Suites는 클래스 생성자만 보므로 "이 의존성이 실제 모듈 구성상 주입 가능한가"는 검증하지 못한다.
- **프로바이더 등록 누락**: providers 배열에 빠뜨렸는지, 토큰 이름이 실제 등록된 것과 일치하는지는 컨테이너가 떠야 런타임 에러로 드러난다.
- **가드/인터셉터/파이프의 실행 체인**: @UseGuards(), 글로벌 가드, 인터셉터는 Nest의 요청 실행 컨텍스트(Express/Fastify 어댑터 + Nest 실행 파이프라인)에 의해 동작한다. 
Suites는 클래스를 직접 인스턴스화할 뿐 HTTP 요청 파이프라인을 구동하지 않으므로 가드가 실제로 라우트에 적용되는지, 순서가 맞는지는 검증 불가.
- **DI 토큰 충돌/스코프 문제**: request-scoped provider, custom provider factory의 실제 동작은 컨테이너 레벨 이슈라 Suites 범위 밖.

정리하면: Suites는 "**클래스 하나가 자기 의존성을 올바르게 호출하는가**"를 검증하고, createTestingModule()은 "**이 모듈이 실제로 부트스트랩 가능하고 Nest 프레임워크 계층(DI 그래프, 가드, 파이프라인)이 올바르게 배선되는가**"를 검증한다. 후자만 진짜 컨테이너를 띄우기 때문.`;
  });
});
