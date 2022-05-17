---
title: 03. 1, 2단계 - 지하철 노선도
tags: ['우아한테크코스', '미션']
date: 2022-05-18 00:00:00
feed:
  enable: true
---

# 03. 1, 2단계 - 지하철 노선도

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/152970395-a31c8134-fc89-449f-b4dc-441e03df929c.png />

## 목표

우아한테크코스에서 진행한 미션의 리뷰와 피드백에 대해 정리한다. 실제 리뷰는 [[Spring 지하철 노선도 - 1,2단계] 매트(최기현) 미션 제출합니다.](https://github.com/woowacourse/atdd-subway-map/pull/218)에서 확인할 수 있다.

## 03. 1, 2단계 - 지하철 노선도 확인

이번 미션에서는 `API 요청에 대한 처리`와 `Dao 객체를 활용하여 데이터를 관리`하는 연습을 위한 미션인 지하철 노선도를 진행하였다. 다행히 이번에는 view에 대한 구현 없이 제공된 [API 문서v1](https://techcourse-storage.s3.ap-northeast-2.amazonaws.com/d5c93e187919493da3280be44de0f17f#Line)을 통해 필요한 기능을 구현하는 것이다.

이번 미션에서 새롭게 추가된 것은 `End to End 테스트`를 작성하는 것이다. 즉 `인수 테스트(Acceptance Test)`를 작성하는 것이다. 

## 인수 테스트 (Acceptance Test)

인수 테스트는 사용자의 시나리오에 따라 수행하는 테스트이다. 지금까지 진행했던 단위 테스트, 통합 테스트와는 다르게 실제 비즈니스에 초점을 두고 테스트를 진행한다. 이러한 인수 테스트는 소프트웨어의 내부 구조를 고려하지 않고 실제 사용자의 관점에서 테스트를 진행한다. 내부 코드에 관심을 가지지 않기 때문에 `블랙박스 테스트`이다. 인수 테스트 작성을 위해서는 E2E(End-to-End)의 형식을 활용한다. 

이번 미션에서는 `RestAssured`를 활용하여 인수 테스트를 작성하였다.

```java
@DisplayName("지하철역 관련 기능")
public class StationAcceptanceTest extends AcceptanceTest {
    ...
    @DisplayName("지하철역을 조회한다.")
    @Test
    void getStations() {
        ExtractableResponse<Response> createdResponse1 = generateStation("강남역");
        ExtractableResponse<Response> createdResponse2 = generateStation("역삼역");

        ExtractableResponse<Response> response = RestAssured.given().log().all()
                .when()
                .get("/stations")
                .then().log().all()
                .extract();

        List<Long> expectedStationIds = List.of(createdResponse1, createdResponse2)
                .stream()
                .map(ExtractableResponse::response)
                .map(ResponseBodyExtractionOptions::jsonPath)
                .map(it -> it.getLong("id"))
                .collect(toList());
        List<Long> resultStationIds = response.jsonPath()
                .getList(".", StationResponse.class)
                .stream()
                .map(it -> it.getId())
                .collect(toList());
        assertAll(
                () -> assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value()),
                () -> assertThat(resultStationIds).containsAll(expectedStationIds)
        );
    }

    private ExtractableResponse<Response> generateStation(String name) {
        Map<String, String> params = new HashMap<>();
        params.put("name", name);

        return RestAssured.given().log().all()
                .body(params)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .post("/stations")
                .then().log().all()
                .extract();
    }
}
```

## 다이나믹 테스트

::: 리뷰 중 일부

`리뷰어`: 위가 많아지다보니 코드가 약간 복잡함을 느꼈는데요.
각 테스트를 메서드로 분리하거나, junit의 다이나믹 테스트를 고려해볼 수 있을 것 같아요.

https://tecoble.techcourse.co.kr/post/2020-07-31-dynamic-test/

:::

다이나믹 테스트는 런타임 시점에 테스트가 생성되며 수행된다. 그렇기 때문에 테스트가 수행되는 도중에 동작을 변경할 수 있다. 이러한 다이나믹 테스트는 `@TestFactory`라는 애노테이션을 활용한다.

다이나믹 테스트의 이점을 가장 먼저 확인할 수 있었던 대목은 바로 HTTP 메서드 중 delete에 대한 인수 테스트를 진행할 때 멱등성에 대한 것을 검증할 때 확인할 수 있었다.

```java
@DisplayName("노선 관련 기능")
public class LineAcceptanceDynamicTest extends AcceptanceTest {
    ...
    @DisplayName("노선을 관리한다.")
    @TestFactory
    Stream<DynamicTest> dynamicTestStream() {
        ExtractableResponse<Response> createdResponse1 = generateLine("1호선", "bg-blue-600");
        ExtractableResponse<Response> createdResponse2 = generateLine("2호선", "bg-green-600");

        return Stream.of(
                ...
                dynamicTest("노선을 삭제한다.", () -> {
                    Long id = createdResponse1.body().jsonPath().getLong("id");

                    ExtractableResponse<Response> response = RestAssured.given().log().all()
                            .when()
                            .delete("/lines/" + id)
                            .then().log().all()
                            .extract();

                    assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
                }),

                dynamicTest("존재하지 않는 노선의 id를 삭제할 경우 잘못된 요청이므로 404를 반환한다.", () -> {
                    Long id = createdResponse1.body().jsonPath().getLong("id");

                    ExtractableResponse<Response> response = RestAssured.given().log().all()
                            .when()
                            .delete("/lines/" + id)
                            .then().log().all()
                            .extract();

                    assertThat(response.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
                })
        );
    }
    ...
}
```

연속적인 테스트를 통해 기존에 삭제한 id로 동일하게 삭제를 진행할 경우 404 상태 코드를 반환하는 부분이다. 정적인 테스트와는 다르게 추가적인 데이터를 설정하지 않고 자연스러운 흐름으로 검증을 진행할 수 있었다.

## 테스트 격리

테스트를 진행할 때 각각의 테스트는 순서에 의존하지 않고 독립적으로 수행되어야 한다. 즉 같은 입력값에 대해서는 항상 같은 결과물을 출력해야 한다는 것이다. 이러한 테스트 격리를 방해하는 것은 하나의 자원을 공유할 때이다. 예를들면 DB와 같은 것들을 말한다. JUnit에서는 다양한 애노테이션(@BeforeEach, @Transactional 등)으로 격리할 수 있는 수단들을 제공한다. 아래는 이번 미션을 진행할 때 제공된 인수 테스트를 위한 테스트 설정 클래스이다.

```java
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AcceptanceTest {

    @LocalServerPort
    int port;

    @BeforeEach
    public void setUp() {
        RestAssured.port = port;
    }
}
```

Spring은 테스트를 진행할 때 같은 context를 사용하는 테스트가 여러 개 존재할 경우 각각의 테스트 마다 새로운 context를 사용하지 않고 기존의 context를 `재활용`한다. 우리는 재활용에 집중해야 한다. 결국 테스트 격리를 위해서는 공유하는 자원을 사용하지 말아야 하는데 이러한 context 재활용은 결국 자원을 공유해서 사용하는 것과 같다. 위 코드에서 `@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)` 덕분에 테스트 메서드를 수행하기 이전에 매번 context가 다시 생성되도록 할 수 있다.

덕분에 각각의 테스트가 격리되어 적절히 진행될 수 있었다. 하지만 한 가지 치명적인 단점이 존재한다. 매번 context를 재생성 하기 때문에 테스트 시간이 매우 오래 걸리게 된다는 것이다.

이러한 시간을 줄이기 위한 방법은 무엇이 있을까? 우선 공유되는 자원을 파악해야 한다. 그것은 앞서 언급한 것처럼 DB이다. 결국 매번 테스트 마다 DB의 테이블이 가진 데이터만 초기화 된다면 적절히 테스트 격리를 이룰 수 있을 것이다.

### @Transactional

보통 테스트에서 `@Transactional` 애노테이션을 사용하면 트랜잭션을 롤백한다. 하지만 위 코드에서 명시된 애노테이션에서 `@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)`와 같이 PORT를 명시하게 되면 트랜잭션이 롤백되지 않는다. 결국 테스트를 시작하기 전이나 후에 DB의 데이터를 직접 조작하여 삭제해야 한다.

### @Sql을 활용한 TRUNCATE

`TRUNCATE` 명령어는 테이블의 데이터가 모두 삭제하지만 테이블 자체는 그대로 유지된다. 테이블 자체가 지워지는 `DROP`은 테이블의 존재 자체가 사라지기 때문에 구조가 남지 않지만 TRUNCATE는 테이블의 구조를 유지할 수 있다. 이러한 `TRUNCATE`를 테스트 메서드 실행 이전에 수행된다면 손쉽게 테스트 격리를 이룰 수 있다.

이러한 TRUNCATE를 테스트 실행 이전에 실행하기 위해서는 `@Sql`을 활용할 수 있다. 해당 애노테이션이 가리키는 경로에 존재하는 SQL을 우선 실행 시킨다. 

```sql
truncate table STATION;
truncate table LINE;
```

위와 같이 작성한 파일은 `test/resources` 아래에 위치 해두고 아래와 같이 명시한다.

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Sql("/truncate.sql")
public class AcceptanceTest {

    @LocalServerPort
    int port;

    @BeforeEach
    public void setUp() {
        RestAssured.port = port;
    }
}
```

이제 매번 새롭게 context를 생성하지 않기 때문에 비교적 빠른 속도로 테스트 격리를 이룰 수 있게 되었다.

## 서비스가 필요한가?

처음 미션을 접할 때 비교적 단순한 요구사항과 구조로 서비스 계층에 대한 필요성을 느끼지 못했다. 결국 페어와 상의 끝에 생성하지 않도록 결정하였다. 하지만 관련해서 아래와 같은 리뷰를 확인할 수 있었다.

::: tip 리뷰 중 일부

`리뷰어`: 개인적으로 서비스가 있었으면 좋겠습니다. 제가 생각해본 단점인데요.

 * 컨트롤러가 무거워진다.
 * 트랜잭션이 보장되지 않는다.
 * 유스케이스기반으로 테스트하기가 어렵다 -> 유스케이스기반 테스트를하려면 mvc를 띄우고 테스트해야함

물론 아직 해당되지 않을 수 있지만, 기본적으로 나누는게 좋을 것 같다고 생각해요. 업무를 하다보면 매번 베이스코드에 유지보수되고 변경이 일어나는데요. 변경이 일어나고 나서, 다시 새로운 레이어를 도입하기는 비용이 클 것 같아서요.

:::

결국 단순한 위임의 행위일지라도 계층에게 적절한 책임을 부여해야 하며 후에 있을 확장에도 대비해야 하기 때문에 서비스 계층을 생성하기도 결정하였다.

```java
@Transactional(readOnly = true)
@Service
public class StationService {

    private final StationDao stationDao;

    public StationService(StationDao stationDao) {
        this.stationDao = stationDao;
    }

    @Transactional
    public StationResponse save(StationRequest stationRequest) {
        if (stationDao.existsByName(stationRequest.getName())) {
            throw new IllegalArgumentException(stationRequest.getName() + "은 이미 존재하는 지하철역 이름입니다.");
        }

        Station station = stationDao.save(new Station(stationRequest.getName()));
        return new StationResponse(station);
    }

    public List<StationResponse> findAll() {
        return stationDao.findAll()
                .stream()
                .map(StationResponse::new)
                .collect(toList());
    }

    @Transactional
    public void deleteById(Long id) {
        stationDao.deleteById(id);
    }
}
```

서비스 계층의 도입으로 또 다른 이점을 확인할 수 있었다. `@Repository`를 활용한 Dao에서 던지는 예외들을 `catch`하여 좀 더 도메인에 유의미한 예외들로 변경하여 전달할 수 있었다.

## 멱등성을 보장하는 것

::: tip 리뷰 중 일부

`리뷰어`: HTTP에서 말하는 멱등성은 응답의 멱등성이 아닌, '리소스'의 대한 멱등성을 뜻합니다.

식별자를 찾지못하면 404를 반환하는게 일반적인 것 같습니다.

그럼 delete에서 리소스관점에서 멱등성을 어기는 예는 '마지막 노선삭제 API' 일 것 같아요. 매번 실행해도 다른 결과를 반환하고 있어서요.

https://developer.mozilla.org/ko/docs/Glossary/Idempotent

:::

### 멱등성

동일한 요청을 한 번 보내는 것과 여러 번 연속으로 보내는 것이 같은 효과를 지니고, 서버의 상태도 동일하게 남을 때, 해당 HTTP 메서드가 멱등성을 가졌다고 말한다. `GET`, `HEAD`, `PUT`, `DELETE` 메서드가 멱등성을 가진다. 이러한 멱등성은 일종의 규약이다. 만약 서버가 해당 규약을 지키지 않고 구현했다면 멱등성 제약을 어길 수 있다.

아래는 리소스 관점에서 멱등성을 지키기 위한 update와 delete 관련 메서드이다.

```java
@Transactional(readOnly = true)
@Service
public class LineService {
    ...
    @Transactional
    public LineResponse update(Long id, LineRequest lineRequest) {
        getLine(id);

        try {
            lineDao.update(id, new Line(lineRequest.getName(), lineRequest.getColor()));
        } catch (DuplicateKeyException e) {
            throw new IllegalArgumentException(lineRequest.getName() + "은 이미 존재하는 노선 이름입니다.");
        }

        return new LineResponse(getLine(id));
    }

    @Transactional
    public void deleteById(Long id) {
        getLine(id);
        lineDao.deleteById(id);
    }

    private Line getLine(Long id) {
        return lineDao.findById(id)
                .orElseThrow(() -> new NotFoundException(id + " 의 노선은 존재하지 않습니다."));
    }
}
```

getLine을 통해 해당 식별자의 Line이 없는 경우 커스텀 예외인 `NotFoundException`을 통해 예외를 던지도록 작성하였다. 던져진 예외는 `ExceptionAdviser`를 통해 상태 코드 404를 반환하도록 한다.

```java
@RestControllerAdvice
public class ExceptionAdviser {
    ...
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorResponse> notFoundExceptionHandler(Exception e) {
        return ResponseEntity.notFound().build();
    }
    ...
}
```

## References.

[단위 테스트 vs 통합 테스트 vs 인수 테스트](https://tecoble.techcourse.co.kr/post/2021-05-25-unit-test-vs-integration-test-vs-acceptance-test/)<br>
[인수테스트에서 테스트 격리하기](https://tecoble.techcourse.co.kr/post/2020-09-15-test-isolation/)<br>
[Spring DirtiesContext](https://shortstories.gitbooks.io/studybook/content/dirtiescontext.html)<br>
[멱등성](https://developer.mozilla.org/ko/docs/Glossary/Idempotent)

<TagLinks />
