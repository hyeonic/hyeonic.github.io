---
title: "[레벨 2] 02. 2단계 - 웹 체스"
date: 2022-05-02
update: 2022-05-02
tags: 
 - 우아한테크코스
 - 레벨2
 - 미션
series: "우아한테크코스 레벨2"
feed:
  enable: false
---

## 목표

![](https://user-images.githubusercontent.com/59357153/152970395-a31c8134-fc89-449f-b4dc-441e03df929c.png)

우아한테크코스에서 진행한 미션의 리뷰와 피드백에 대해 정리한다. 실제 리뷰는 [[Spring 체스 - 2단계] 매트(최기현) 미션 제출합니다.](https://github.com/woowacourse/jwp-chess/pull/429)에서 확인할 수 있다.

## 02. 2단계 - 웹 체스 리뷰 확인

2단계에서는 기존의 1단계인 Spring 적용을 넘어 체스 게임이 동시에 여러 게임이 진행될 수 있도록 동작해야하는 요구사항이 추가되었다.

처음 이러한 요구사항을 접했을 때 기존에 작성한 계층 구조를 전체적으로 개선해야 해서 막막한 기분이 들었다. 최대한 집중한 것은 이전과 동일하게 `도메인에 변경을 최소화` 하며 요구사항을 반영하는 것이다.

## Service layer의 존재 이유

1단계를 진행할 당시에는 릭이 기존에 service 계층을 구현하였기 때문에 별 다른 이유 없이 해당 계층을 유지하는 방향으로 진행하였다. 2단계는 페어가 아닌 혼자 진행하기 때문에 DB에 대한 구조를 전반적으로 개선하는 겸 기존 계층 구조를 전부 개편하기로 결심하였다.

내가 바라본 이전의 service는 단순히 `도메인의 비즈니스 로직을 실행`하거나 `DAO를 활용하여 DB를 조작`하는 일련의 행위들의 묶음들을 모아둔 객체에 불과했다. controller는 단순히 service에게 해당 행위들을 위임할 뿐이었기 때문에 더더욱 `service layer에 대한 역할`이 애매하다고 생각했다. 즉 controller에서 처리해도 무관하다고 판단했다.

그렇기 때문에 2단계를 반영할 때는 service 계층을 사용하지 않고 controller에서 바로 dao와 도메인에 접근하는 방식으로 진행하였다.

그 결과 아래와 같은 controller를 확인할 수 있었다.

```java
@RestController
@RequestMapping(value = "/api/rooms")
public class ChessApiController {

    private static final int DEFAULT_ROOM_ID = 0;

    private final JdbcRoomDao jdbcRoomDao;
    private final JdbcChessPieceDao jdbcChessPieceDao;

    public ChessApiController(final JdbcRoomDao jdbcRoomDao, final JdbcChessPieceDao jdbcChessPieceDao) {
        this.jdbcRoomDao = jdbcRoomDao;
        this.jdbcChessPieceDao = jdbcChessPieceDao;
    }
    ...
    @GetMapping("/{id}")
    public ResponseEntity<RoomResponse> getRoom(@PathVariable final int id) {
        RoomEntity roomEntity = getRoomEntity(id);

        return ResponseEntity.ok(new RoomResponse(roomEntity));
    }
    ...
    @PostMapping
    public ResponseEntity<Integer> createRoom(@RequestBody final RoomSaveRequest request) {
        final RoomEntity roomEntity = new RoomEntity(DEFAULT_ROOM_ID, request.getName(), request.getPassword(),
                GameStatus.READY.getValue(), Color.WHITE.getValue());

        final int id = jdbcRoomDao.save(roomEntity);

        return ResponseEntity.created(URI.create("/api/rooms/" + id)).body(id);
    }
    ...
    @PatchMapping("/{id}/pieces")
    public ResponseEntity<MoveResult> movePiece(@PathVariable final int id,
                                                @RequestBody final ChessPieceMoveRequest request) {
        final RoomEntity roomEntity = getRoomEntity(id);
        final ChessGame chessGame = getChessGame(roomEntity);

        final Position from = Position.from(request.getFrom());
        final Position to = Position.from(request.getTo());

        final MoveResult moveResult = chessGame.move(from, to);

        jdbcChessPieceDao.deleteByRoomIdAndPosition(roomEntity.getId(), request.getTo());
        jdbcChessPieceDao.update(roomEntity.getId(), request.getFrom(), request.getTo());

        jdbcRoomDao.update(new RoomEntity(roomEntity.getId(), roomEntity.getName(), roomEntity.getPassword(),
                moveResult.getGameStatus().getValue(), moveResult.getCurrentTurn().getValue()));

        return ResponseEntity.ok(moveResult);
    }
    ...
}
```

예시를 위해 일부분만 가져온 것이다. 로직이 정상적으로 작동 하였지만 가독성이나 역할 측면에서 약간의 우려가 남았다. 리뷰어는 해당 controller를 보고 `service를 제거한 이유`에 대해 물었다.

#### 리뷰 중 일부
```markdown
`리뷰어`: 서비스를 제거한 이유가 있을까요??

`매트`: 이전 서비스는 단순히 controller가 위임을 하기 위한 목적 뿐이라고 판단하였습니다. 이번에 Dao와 Controller를 전면적으로 개편하며 Service layer에 대한 필요성을 잘 느끼지 못해서 해당 클래스는 제거하였습니다!

이미 도메인 객체가 비즈니스 로직을 가지고 있기 때문에 추가적인 Service layer를 통한 계층 분리는 불필요 하다고 판단하였습니다. 로운이 생각했을 때 service layer를 분리하기 위한 목적은 무엇인가요? 저는 아직 계층 분리를 위한 근거의 기준이 잡히지 않아 질문드립니다!

`리뷰어`: `Service의 역할`을 생각해보면 될텐데요.

기존에는 controller만 있었고, 매트처럼 controller에서 request 검증, domain에 요청, dao에 요청, response 응답 생성 등을 다 맡아서 진행했을 겁니다. 이러다 보니 controller의 역할이 너무 커지게 되었고, 로직을 파악하는 어려움이 생겼을 거라고 생각해요.
그래서 service에 비지니스 로직을 위임하고, controller에서는 비지니스 로직 이외의 request 검증, response 응답 생성 등만 맡아서 하는 형식으로 바뀌지 않았을까 생각합니다.

현재 controller의 movePiece를 보면 체스가 작은 프로그램인데도 생각보다 코드량이 많다는 것을 알 수 있어요.
그렇다면 체스보다 훨씬 큰 프로그램의 경우에는 어떻게 될 수 있을까요? 그리고 service는 큰의미의 도메인 service가 생기게 되는데 어느 도메인에서 에러가 발생했을 경우에 파악을 하는 데에도 더 빠르게 파악할 수 있지 않을까요?

예를 들어 주문과 배달 도메인이 있는데 주문 프로세스로 a 도메인 로직이 돈 후 b 도메인 로직을 돌고 c에 요청해서 데이터를 가져와야 하고 배달도 비슷한 순서의 로직을 돈다고 한다면 orderService와 deliveryService로 나뉘어져 있어야 각각의 로직의 흐름을 파악하고 도메인에 에러가 났을 때 어디를 봐야할 지 명확하지 않을까요??
저는 우리가 도메인의 역할과 책임을 생각하고 그에 따라 확인해야 하는 위치를 파악했던 것이 service에도 동일하게 적용된다고 생각합니다~

개인적으로 현재의 수준에서는 저도 매트처럼 service가 없어도 괜찮다고 생각합니다~ service를 쓴다고 했을 때 response dto로의 변환을 controller에서 할지 service에서 할지에 대해서도 한번 고민해보시면 좋을 것 같아요~
그리고 service를 쓴다고 하면 service가 주요 `비지니스 로직을 담당`하기 때문에 `테스트는 꼭 만들어 주는 것`이 좋습니다.
```

리뷰어에게 아주 양질의 답변을 확인할 수 있었다. 많은 부분에서 고민해볼 포인트들을 남겨주었다.

### 그래서 필요한 이유는?

가장 크게 공감한 것은 `controller의 역할`이 비대해져 로직을 파악하는데 어려움이 생긴다는 것이다. controller에는 비즈니스 로직 이외에 request와 response와 관련된 로직만 담당하고 service에서 주요 비즈니스 로직을 담당하게 되면 좀 더 역할에 맞춰 계층을 바라볼 수 있을 것이다.

가장 큰 예시가 바로 내 코드 내부에 있었다. 

```java
@RestController
@RequestMapping(value = "/api/rooms")
public class ChessApiController {
    ...
    @PatchMapping("/{id}/pieces")
    public ResponseEntity<MoveResult> movePiece(@PathVariable final int id,
                                                @RequestBody final ChessPieceMoveRequest request) {
        final RoomEntity roomEntity = getRoomEntity(id);
        final ChessGame chessGame = getChessGame(roomEntity);

        final Position from = Position.from(request.getFrom());
        final Position to = Position.from(request.getTo());

        final MoveResult moveResult = chessGame.move(from, to);

        jdbcChessPieceDao.deleteByRoomIdAndPosition(roomEntity.getId(), request.getTo());
        jdbcChessPieceDao.update(roomEntity.getId(), request.getFrom(), request.getTo());

        jdbcRoomDao.update(new RoomEntity(roomEntity.getId(), roomEntity.getName(), roomEntity.getPassword(),
                moveResult.getGameStatus().getValue(), moveResult.getCurrentTurn().getValue()));

        return ResponseEntity.ok(moveResult);
    }
    ...
}
```

기물을 이동하기 위한 핸들러 메서드이다. 가독성을 위해 나름 줄바꿈을 작성했지만 도메인의 비즈니스 로직과 dao, 요청 응답 로직이 뒤섞여 다소 읽기 어려운 코드가 되었다. 만약 주요 비즈니스 로직과 dao를 service 계층으로 이전하게 되면 아래와 같이 수정될 것이다.

```java
@RestController
@RequestMapping(value = "/api/rooms")
public class ChessApiController {
    ...
    @PatchMapping("/{id}/pieces")
    public ResponseEntity<MoveResult> movePiece(@PathVariable final int id,
                                                @RequestBody final ChessPieceMoveRequest request) {

        final MoveResult moveResult = chessService.move(id, request.getFrom(), request.getTo())
        return ResponseEntity.ok(moveResult);
    }
    ...
}
```

contoller에는 요청과 응답을 제외하곤 신경 쓸 필요가 없어졌다. 또한 controller가 가지는 도메인에 대한 직접적인 의존성까지 제거할 수 있게 되었다.

### @Transactional?

이 밖에도 어떠한 장점이나 특징들이 있는지 고민해보았다.

다른 크루들의 리뷰를 살펴보면 `@Transactional`에 대한 키워드를 심심치 않게 볼 수 있었다. 나는 해당 애노테이션의 역할을 정확히 인지하지 못했기 때문에 이번 미션에서는 사용하지 않았다.

간단히 정리하면 아래와 같다.

만약 내가 로또 머신에서 로또를 구매한다고 가정한다. 로또 5장을 자동으로 구매하기 위해 5000원을 입금했다. 로또 자동 발급 도중 머신의 오류로 나는 2장의 로또만 받게 되었다. 그렇다면 나머지 3장의 로또는 어떻게 되는 것일까?

위 예시는 `로또 구매에 실패한 경우`이다. 즉 원하는 물건(로또 5장)을 받지 못했기 때문에 로또 구매라는 `일련의 과정`이 실패하게 된 것이다. 로또 구매자 입장에서는 2장의 로또를 받기 보다 자신의 돈인 5000원을 돌려받길 원할 것이다. 즉 일련의 과정 중 오류가 발생하면 없었던 일 처럼 완전히 되돌려야 한다.

Spring에서 DB와 관련하여 일련의 과정 중 없었던 일 처럼 완전히 되돌려 놓기 위해서는 `@Transactional`이 사용된다. 좀 더 깊은 내용은 추가적인 학습이 필요할 것으로 판단하여 간단한 이론만 작성하였다.

정리하면 service 계층을 활용하게 되면 일련의 과정을 나타내는 트랜잭션을 메서드 단위로 관리할 수 있다. 이것은 transcation의 특징(ACID)을 통해 클라이언트들에게 `신뢰성을 보장`할 수 있을 것이다.

## 테스트 격리하기

각각의 테스트는 서로의 순서에 상관 없이 독립적으로 수행되어야 한다. 즉 각각의 테스트는 서로 관여하지 않고 `격리`하여 진행되어야 한다.

격리 시키기 위한 조건으로는 각각의 테스트는 자원을 공유해서는 안된다. 하지만 DB라는 자원을 공유하지 않고 Dao를 격리하여 테스트 하는 것은 매우 어려운 일이었다.

### 매번 DB 삭제하기

테스트 격리를 위해 많은 고민 끝에 매번 DB를 초기화하는 방식을 생각했다. 결국 Dao에 DB를 별도로 초기화 하기 위한 메서드인 `deleteAll`이 추가되었다.

```java
@Repository
public class JdbcRoomDao {
    ...
    public void deleteAll() {
        final String sql = "DELETE FROM room";
        jdbcTemplate.update(sql);
    }
}
```

```java
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class ChessApiControllerTest {
    ...
    @BeforeEach
    void setUp() {
        RestAssured.port = port;
    }

    @AfterEach
    void tearDown() {
        roomDao.deleteAll();
    }
    ...
}
```

매번 테스트가 마무리 될 때 DB가 초기화 되기 때문에 간섭 없이 진행할 수 있다고 판단한다. 하지만 public으로 해당 행위가 열려 있기 때문에 의도하지 않게 사용될 경우 비즈니스에 큰 파급을 가져올 우려가 있다. 이에 대해 리뷰어는 아래와 같은 의견을 남겨주었다.

#### 리뷰 중 일부
```markdown
`리뷰어`: jpa 같은 경우에 deleteAll은 기본적을 제공하는 메서드입니다.

그래서 저는 개인적으로 괜찮다고 생각하는데요. 다만 테스트만을 위한 메서드를 운영 코드에 만드는 것은 좋지 않다는 것에는 저도 공감하고 있기 때문에 그 부분이 불편하다면 `test에서 jdbcTemplate를 사용해서 삭제`하도록 하는것도 방법일 것 같습니다!
```

해당 테스트는 `@SpringBootTest`를 활용하기 때문에 Bean이 모두 등록되어 있다. 즉 jdbcTemplate을 활용할 수 있다. 위 코드는 아래와 같이 개선할 수 있다.

```java
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class ChessApiControllerTest {
    ...
    private final JdbcTemplate;

    @Autowired
    public ChessApiControllerTest(final JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    ...
    @AfterEach
    void tearDown() {
        final String sql = "DELETE FROM room";
        jdbcTemplate.update(sql);
    }
    ...
}
```

## @JdbcTest를 통한 슬라이스 테스트

슬라이스 테스트란? 계층을 하나의 단위로 나눠 테스트 하는 것이다. 즉 Spring 환경에 모든 Bean들을 등록하지 않고 계층에서 사용하는 있는 특정 Bean 혹은 자원들만 함께 Spring 환경에서 테스트할 수 있도록 제공한다. 그중 `@JdbcTest`를 활용하였다.

우선 `@JdbcTest`의 특징은 아래와 같다.

 * 오직 DataSource를 필요로 하는 테스트에서 사용한다.
 * in-memory embedded database가 설정되어 테스트를 위한 JdbcTemplate이 생성된다.
 * 일반적인 `@Component` Bean들은 스캔되지 않는다.

정리하면 최소한의 Bean 정보를 활용하여 테스트를 진행할 수 있기 때문에 비교적 빠른 속도로 단위 테스트를 진행할 수 있다.

## 생성자 주입을 통한 테스트

JUnit5에서도 생성자 주입을 활용한 의존성 주입이 가능하다. 하지만 단순히 Spring에서 사용하는 것 처럼 생성자가 1개 일 때 `@Autowired를 생략할 경우` `No ParameterResolver registered for parameter`와 같은 에러를 마주할 수 있다.

#### 리뷰 중 일부

```markdown
`리뷰어`: 저는 @BeforeAll을 생각했는데 생성자를 만들어서도 사용할 수 있군요! 👍
@Autowired부분은 저도 그냥 자연스럽게 쓰고 있던 부분이랑 이번에 찾아보게 되었는데요. 

에러가 발생하는 이유는 Junit5가 DI를 스스로 지원하고, DI를 지원하는 타입이 정해져 있다고 하네요.

Junit5에서 생성자나 lombok방식으로 DI가 안되는 이유는 Junit이 생성자에 다른 의존성을 주입하려고 먼저 개입하기 때문이라고 합니다.
```

리뷰어를 통해 위와 같은 해답을 얻을 수 있었다. 정리하면 JUnit5에서 Spring에서 제공하는 DI를 활용하기 위해서는 명시적으로 `@Autowired`를 작성해야 한다.

## References.

 * [Transactional 어노테이션](https://tecoble.techcourse.co.kr/post/2021-05-25-transactional/)
 * [Business Logic Organization Patterns](https://github.com/msbaek/memo/blob/master/Business-Logic-Organization-Patterns.md)
 * [인수테스트에서 테스트 격리하기](https://tecoble.techcourse.co.kr/post/2020-09-15-test-isolation/)
 * [Spring Boot 슬라이스 테스트](https://tecoble.techcourse.co.kr/post/2021-05-18-slice-test/)
 * [JUnit5에서 의존성 주입은 @Autowired로 해야하는 이유](https://pinokio0702.tistory.com/189?category=414017)
