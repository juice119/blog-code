# NestJS + Suites 학습 확인 문제

서비스, 리포지토리, 외부 API 클라이언트 등을 가진 간단한 예제 클래스(예: `UserService`, `UserRepository`)를 직접 만들어 구현하면서 공부합니다.
정답은 적지 않았고, 대신 각 문제에 "구현으로 증명하는 완료 조건"을 달았습니다. 코드가 곧 답안지가 되도록 설계했습니다.

참고 자료:
- 공식 레시피: https://docs.nestjs.com/recipes/suites
- Solitary 가이드: https://suites.dev/docs/guides/solitary/
- Testing API 레퍼런스: https://suites.dev/docs/developer-guide/unit-tests/suites-api/

---

## Level 1 — 개념 이해

구현 전에 말로(또는 노트에 글로) 답할 수 있어야 하는 질문입니다.

- **Q1.** Suites에서 Stub, Mock, `Mocked<T>`의 관계를 한 문장씩 정의할 수 있는가?
  ("Mock은 ___의 집합이다"를 채울 수 있어야 함)

- **Q2.** `TestBed.solitary()`와 `@nestjs/testing`의 `Test.createTestingModule()`은 둘 다 테스트 환경을 만든다. 내부 동작이 근본적으로 어떻게 다른가?
  (힌트: 하나는 NestJS 컨테이너를 실제로 부트스트랩하고, 하나는 하지 않는다. 그래서 속도 차이가 왜 나는가?)

- **Q3.** solitary와 sociable의 차이를 "무엇이 진짜이고 무엇이 목인가"로 설명할 수 있는가? 그리고 sociable은 여전히 왜 '단위 테스트'로 분류되는가?
  (힌트: I/O 경계)

- **Q4.** 공식 문서는 "단위 테스트는 Suites, 모듈 구성 검증은 `createTestingModule`"로 역할을 나눈다. Suites로는 **검증할 수 없는 것**이 무엇이길래 이렇게 나뉘는가?
  (힌트: 가드, 모듈 imports, 프로바이더 등록 누락)

---

## Level 2 — API 손에 익히기

각 문제를 실제 클래스로 구현하세요.

### Q5. 기본 solitary
`TestBed.solitary(UserService).compile()`로 테스트를 만들고, `unitRef.get()`으로 리포지토리 목을 꺼내 `mockResolvedValue`로 스텁하라.

✅ 완료 조건:
- `beforeAll`에서 컴파일, 테스트 실행 시간이 개당 수 ms인지 확인
- 목을 하나도 설정 안 한 메서드를 호출하면 무엇이 반환되는지 관찰하고 주석으로 기록

### Q6. `.mock().impl()` vs `.mock().final()`
같은 의존성을 두 방식으로 각각 스텁한 테스트 두 개를 작성하라.

✅ 완료 조건:
- `final()`로 스텁한 의존성을 `unitRef.get()`으로 꺼내려 하면 어떻게 되는지 직접 확인
- 왜 그렇게 설계됐는지 한 줄 주석으로 설명 (이 API의 핵심 설계 의도를 묻는 문제)

### Q7. `impl()`의 `stubFn` 파라미터
`impl(stubFn => ({...}))`에서 `stubFn`은 무엇인가? Vitest 어댑터(`@suites/doubles.vitest`)를 쓸 때 이것의 정체는?

✅ 완료 조건:
- `stubFn().mockResolvedValue(...)`로 사전 구성 + 테스트 내에서 `toHaveBeenCalledWith` 검증까지 되는 테스트 1개 작성

### Q8. 토큰 기반 의존성
`@Inject(CONFIG_OPTIONS)`처럼 커스텀 토큰으로 주입받는 의존성이 있을 때 `unitRef.get()`을 어떻게 써야 하는가?

✅ 완료 조건:
- 토큰 주입 의존성이 있는 서비스를 하나 만들어(없으면 임시로) 목을 꺼내는 데 성공

### Q9. sociable + expose
`UserService`가 순수 로직 클래스 `UserValidator`에 의존한다고 리팩터링한 뒤, `TestBed.sociable(UserService).expose(UserValidator).compile()`로 검증기는 진짜, 리포지토리는 목인 테스트를 작성하라.

✅ 완료 조건:
- expose한 `UserValidator`를 `unitRef.get()`으로 꺼내려 시도해보고 결과를 기록
- 왜 의도적으로 막아놨는지 설명할 수 있어야 함
- sociable에서 `.expose()`를 한 번도 안 부르면 어떻게 되는지도 확인

---

## Level 3 — 설계 판단

이걸 답할 수 있으면 "활용"을 넘어 "전략"이 됩니다.

### Q10. 경계 판단 문제
다음 세 가지 검증 대상을 solitary / sociable / `createTestingModule`(통합) 중 어디에 배치할지 결정하고, 각각 이유를 한 줄로 적어라.

- (a) "할인율 계산 시 쿠폰과 등급 혜택이 중복 적용되지 않는다" 같은 순수 계산 규칙
- (b) "UserService가 계산 결과를 올바른 형태로 리포지토리에 전달"
- (c) "리포지토리의 UPSERT가 중복 저장을 막음"

✅ 완료 조건:
- 세 개를 실제로 각기 다른 방식으로 구현
- (b)에서 solitary와 sociable 중 뭘 골랐는지가 핵심 — 정답이 하나는 아니고, 트레이드오프를 말할 수 있으면 통과

### Q11. 과잉 목킹 탐지
Q5에서 만든 테스트 중 `toHaveBeenCalledWith`로 검증한 것을 하나 골라, 서비스 내부 구현을 리팩터링(예: 메서드 분리, 호출 순서 변경)했을 때 깨지는지 실험하라.

✅ 완료 조건:
- "결과 검증"으로 바꿔 리팩터링에도 살아남는 버전 작성
- 언제 상호작용 검증이 정당한지(예: `deleteAuthorization` 같은 부수효과가 곧 목적인 경우) 기준을 한 줄로 도출

### Q12. Suites가 못 잡는 버그 만들기
일부러 모듈에서 프로바이더 등록을 빼먹거나 가드를 제거한 뒤, Suites 단위 테스트가 전부 통과함을 확인하라.

✅ 완료 조건:
- 같은 버그를 잡아내는 통합/e2e 테스트를 작성해서 "이 층이 왜 필요한가"를 코드로 증명 (Level 1의 Q4를 몸으로 확인하는 문제)

### Q13. 수명주기 함정
공식 예제들은 `beforeAll`에서 compile하는데, 목의 호출 기록(`toHaveBeenCalled`)은 테스트 간에 누적된다. 테스트 A의 호출이 테스트 B의 검증을 오염시키는 상황을 재현하라.

✅ 완료 조건:
- 오염 재현 → `beforeEach` compile 또는 `mockClear`로 해결한 두 버전 비교
- 각각의 비용(속도 vs 격리) 기록 (flaky의 축소판을 직접 만들어보는 문제)

---

## 추천 진행 순서

1. Q1~4를 노트에 답한다.
2. Q5~9를 하루에 하나씩 구현한다.
3. Q10~13은 실제로 진행 중인 개인 프로젝트 코드에 적용한다.

특히 Q12, Q13은 결과가 그대로 블로그 소재가 됩니다. (예: "Suites 단위 테스트가 전부 통과하는데 앱이 안 뜨는 이유")

Q10과 Q11은 정답보다 판단 근거가 중요합니다.