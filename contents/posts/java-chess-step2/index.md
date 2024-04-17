---
title: "08. 4, 5단계 - 체스"
date: 2022-04-14
update: 2022-04-14
tags: 
 - 우아한테크코스
 - 미션
series: "우아한테크코스 레벨1"
feed:
  enable: false
---

## 목표

![](https://user-images.githubusercontent.com/59357153/152970395-a31c8134-fc89-449f-b4dc-441e03df929c.png)

우아한테크코스에서 진행한 미션의 리뷰와 피드백에 대해 정리한다. 실제 리뷰는 [[4, 5단계 - 체스] 매트(최기현) 미션 제출합니다.](https://github.com/woowacourse/java-chess/pull/375)에서 확인할 수 있다.

## 08. 4, 5단계 - 체스 리뷰 확인

드디어 레벨 1의 마지막 미션이 마무리 되었다. 2달의 기간이 정말 순식간에 지나간 것 같다. 이번 미션의 요구사항은 기존 도메인 구조를 최대한 유지하며 DB와 WEB 구조를 도입하는 것이다. 하지만 처음 부터 전환 과정이 순탄했던 것은 아니다. 아래는 이번 미션을 통해 고민한 내용들을 정리하였다.

## 객체와 DB 사이의 간극

5단계에서 웹 서버를 재시작하더라도 이전에 하던 체스 게임을 다시 시작할 수 있어야 하는 요구사항이 추가되었다. 그렇기 때문에 DB에 기물과 위치에 관련된 정보를 관리해야 한다고 판단하였다.

하지만 이전에 작성한 기물에 대한 도메인 정보를 DB에 녹여내는 것은 쉽지 않았다. 정리하면 `DB 테이블의 엔티티`와 `도메인 객체` 사이의 `패러다임`의 차이에서 오는 간극을 줄일 수 있는 뚜렷한 방법이 떠오르지 않았다.

아래는 나이트를 나타내기 위한 `Knight` 객체이다.

```java
public class Knight extends Piece {

    private static final MovingStrategy MOVING_STRATEGY = new LengthBasedMovingStrategy(number -> number == 5);
    private static final String NOTATION = "N";
    private static final double SCORE = 2.5;

    public Knight(Color color) {
        super(color);
    }

    @Override
    public void validateMove(Board board, Position source, Position target) {
        if (MOVING_STRATEGY.canMove(board, source, target)) {
            return;
        }

        throw new IllegalArgumentException("기물을 이동할 수 없습니다.");
    }

    @Override
    public boolean isKing() {
        return false;
    }

    @Override
    public boolean isPawn() {
        return false;
    }

    @Override
    public String getNotation() {
        return color.parse(NOTATION);
    }

    @Override
    public double getScore() {
        return SCORE;
    }
}
```

Knight는 진영에 대한 정보와 이동 전략에 대한 정보들을 담고 있다. 이러한 객체 정보를 DB에서 관리하는 것은 한계가 있다고 생각했다. 아래는 DB로 관리하기 위한 정보를 기반으로 만든 테이블이다. DB에는 현재 포지션과 해당 포지션의 기물을 저장해두기 위해 테이블을 설계하였다.

```sql
create table piece
(
    id         varchar(2)  not null,
    piece_type varchar(20) not null,
    primary key (id)
);
```

DB에는 대부분의 것들이 문자열로 저장된다. 해당 정보를 기반으로 도메인 객체로 변환해 주기 위한 객체가 필요해졌다. 그 역할을 담당하는 것은 `PieceType`이다.

```java
public enum PieceType {

    KING_WHITE("king white", new King(Color.WHITE)),
    QUEEN_WHITE("queen white", new Queen(Color.WHITE)),
    ROOK_WHITE("rook white", new Rook(Color.WHITE)),
    KNIGHT_WHITE("knight white", new Knight(Color.WHITE)),
    BISHOP_WHITE("bishop white", new Bishop(Color.WHITE)),
    PAWN_WHITE("pawn white", new Pawn(Color.WHITE)),
    KING_BLACK("king black", new King(Color.BLACK)),
    QUEEN_BLACK("queen black", new Queen(Color.BLACK)),
    ROOK_BLACK("rook black", new Rook(Color.BLACK)),
    KNIGHT_BLACK("knight black", new Knight(Color.BLACK)),
    BISHOP_BLACK("bishop black", new Bishop(Color.BLACK)),
    PAWN_BLACK("pawn black", new Pawn(Color.BLACK));

    private final String type;
    private final Piece piece;

    PieceType(String value, Piece piece) {
        this.type = value;
        this.piece = piece;
    }

    public static PieceType of(String pieceType) {
        return Arrays.stream(values())
                .filter(value -> value.type.equals(pieceType))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 기물 유형입니다."));
    }

    public Piece getPiece() {
        return piece;
    }

    public String getType() {
        return type;
    }
}
```

DB에 저장된 type 정보를 기반으로 그에 맞는 객체를 생성해준다. 해당 객체는 DB에 대한 의존성을 강하게 가지고 있기 때문에 도메인 패키지 외부에 위치하였다.

![](https://user-images.githubusercontent.com/59357153/163393987-482221b4-a5f9-4a33-a34f-0d2e7b4d169a.png)

### 도메인 객체는 소중하다

위 처럼 도메인 객체를 DB에 저장하기 위해 변환을 위한 `enum`들은 초기에 도메인 객체 내부에 위치하였다. 관련해서 아래와 같은 리뷰를 확인할 수 있었다.

#### 리뷰 중 일부
```markdown
`루피`: 본문에 적어주신 의도라면 해당 enum 객체는 도메인으로 분류해도 괜찮을까요? 도메인 객체가 DB 의 영향을 받는 것이 문제가 없을지 한번 생각해봐주시면 좋을 것 같아요.
```

즉 해당 로직들이 도메인 패키지 내부에 위치한다는 것은 도메인 내부에 DB와 관련된 의존성을 강하게 가지는 것을 의미한다. 만약 DB가 변경된다면 이것은 도메인의 변경까지 영향이 닿게된다. 

도메인은 매우 중요한 요구사항을 해결하기 위한 `비즈니스 로직`들이 담겨 있다. 외부의 변경으로 인해 중요한 도메인 로직이 변경되면 해당 도메인을 사용하는 애플리케이션은 어떤식으로 영향이 갈지 가늠할 수 없다. 

### State 객체와 DB

이번 미션에서 가장 많은 고민을 진행한 것이다. 기존 State 객체는 상태 패턴을 통해 복잡한 상속 구조를 동반한다. 결국 복잡한 패턴은 DB에 데이터를 저장할 때 발목을 잡게 되었다. 객체 정보를 DB에 저장하는 것은 매우 어렵게 다가왔기 때문이다.

관련하여 아래와 같은 질문을 남겼다.

#### 리뷰 중 일부
```markdown
`매트`: 추가적으로 도메인 내부 DB에 대한 의존성을 없애던 중 추가적인 고민이 생겨 질문드립니다! 아래는 ChessGame의 상태 조회를 위한 메서드입니다.
```

```java
public class ChessGame {
    ...
    public State getState() {
        return state;
    }
    ...
}
```

```
현재 로직에서 상태 정보 조회가 필요한 이유는 move이후 변경된 턴 정보를 저장하기 위해 필요합니다. 한 가지 우려되는 것은 state 자체를 반환하게 될 경우 모든 행위가 public한 특성으로 인해 의도적인 변경에 대비할 수 없다는 것입니다.

결국 이러한 고민들이 생겨나는 이유는 애초에 도메인 객체 자체를 DB에 저장하기 힘든 구조로 설계한 탓이라고 판단하는데 이에 대한 루피의 의견이 궁금합니다.
```

#### 리뷰 중 일부
```markdown
`루피`: 리뷰 요청시 남겨주신 코멘트처럼 `패러다임 의 차이`로 객체의 상태를 관계형 데이터베이스의 상태에 저장하는 것은 어렵고 많은 고민이 필요한 과정이 맞다고 생각하는데요.

결국에 한 쪽에 타협을 해야하고 도메인 객체에 맞춰 테이블 구조를 만들거나 테이블 구조에 맞춰 도메인 객체를 만들거나 둘 중 하나가 될 것 같은데, 저는 도메인 객체에 맞춰 테이블 구조를 만드는 것을 선호합니다 ㅎㅎ
```

그렇다면 처음 부터 DB에 친화적인 도메인 객체를 설계해야 할까? 아직은 확신이 서지 않는다. web과 DB로 전환하며 이전에는 고민하지 못했던 많은 것들을 생각하게 되는 계기가 되었다. 뚜렷한 답을 찾은 것은 아니지만 의식적인 연습을 통해 나만의 해답을 만들어 가야 한다.

## 도메인 객체의 view 의존

앞서 언급한 것 처럼 도메인은 외부(ex. view, DB 등)에 의존하는 것은 지양하는 것이 좋다. 이것은 직접적인 사용을 통해 의존하는 것과 `간접적으로 view에 의존하는 행위`를 만드는 것을 모두 포함한다. 아래는 관련한 리뷰를 정리한 것이다.

```java
public abstract class Piece {

    protected final Color color;

    protected Piece(Color color) {
        this.color = color;
    }

    ...

    public String getColor() {
        return color.getValue();
    }
}
```

#### 리뷰 중 일부
```markdown
`루피`: `getColor()` 메서드는 view 를 알고 있어야 만들어질 수 있는 메서드가 아닐까요 ?
```

해당 메서드는 view에서 기물의 color정보가 필요할 때 사용하기 위한 메서드이다. 이것 또한 view를 알고 있어야 만들어질 수 있는 메서드이다. 즉 간접적으로 view에 대한 의존성을 가지고 있다는 것이다.

결국 `getColor()` 메서드는 아래와 같이 개선되었다.

```java
public abstract class Piece {

    protected final Color color;

    protected Piece(Color color) {
        this.color = color;
    }

    ...

    public Color getColor() {
        return color;
    }
}
```

이제 Piece는 더 이상 view에 대한 간접적인 의존성을 가지고 있지 않다. 해당 메서드는 view에 의해 추가된 것이 아니기 때문이다.

해당 리뷰를 통해서 직접적으로 view를 사용하는 것 뿐만아니라 외부에 의해서 생기는 행위 조차도 지양하는 것이 좋다는 것을 알게 되었다. 루피 또한 아래와 같이 의견을 남겨 주었다.

#### 리뷰 중 일부
```markdown
`루피`: 도메인 객체는 view 와 db 에 대하여 직접 아는 것(의존하는 것)과 간접적으로 아는 것을 모두 지양할수록 좋습니다.

이유는 `언급하신 것 처럼 도메인에서 데이터베이스를 의존하는 것은 좋지 않다고 생각합니다. 만약 요구사항의 변경으로 데이터베이스가 변경되면 가장 중요한 도메인도 영향을 끼칠 수 있기 때문이라고 판단합니다.`라고 남겨 주신 이유 때문입니다.
```

## fake 객체를 통한 테스트 더블

DB 도입 이전에 fake DAO를 통해 개발을 진행했다. 덕분에 DB에 대한 의존성 없이 service 계층을 구현할 수 있었고 DB와 연동된 DAO가 개발이 완료된 후 의존성 주입을 통해 손쉽게 구현체를 변경할 수 있었다.

#### 테스트 더블 중 fake
```markdown
* 복잡한 로직이나 객체 내부에서 필요로 하는 다른 외부 객체들의 동작을 단순화하여 구현한 객체이다.
* 동작의 구현을 가지고 있지만 실제 프로덕션에는 적합하지 않은 객체이다.
```

아래는 이번 미션에서 작성한 `fake DAO` 이다.

```java
public class MemoryPieceDao implements PieceDao {

    private static Map<String, PieceDto> store = new HashMap<>();

    @Override
    public void save(PieceDto pieceDto) {
        if (store.containsKey(pieceDto.getId())) {
            throw new IllegalArgumentException("기물의 위치는 중복될 수 없습니다.");
        }

        store.put(pieceDto.getId(), pieceDto);
    }

    @Override
    public Optional<PieceDto> findById(String id) {
        if (!store.containsKey(id)) {
            return Optional.empty();
        }

        return Optional.of(store.get(id));
    }

    @Override
    public void remove(String id) {
        if (!store.containsKey(id)) {
            throw new IllegalArgumentException("기물이 존재하지 않습니다.");
        }

        store.remove(id);
    }

    @Override
    public List<PieceDto> findAll() {
        return store.entrySet()
                .stream()
                .map(Entry::getValue)
                .collect(toList());
    }

    @Override
    public void removeAll() {
        store = new HashMap<>();
    }
}
```

```java
public class MemoryTurnDao implements TurnDao {

    private static final List<TurnDto> store = new ArrayList<>();

    @Override
    public void save(TurnDto turnDto) {
        store.add(turnDto);
    }

    @Override
    public Optional<TurnDto> findLastTurn() {
        return Optional.of(store.get(store.size() - 1));
    }
}
```

또한 테스트를 진행할 때 이러한 fake DAO를 통해 service가 가진 행위에 집중하여 `DB와 격리된 테스트`를 진행할 수 있다.

```java
class ChessServiceTest {

    private ChessService chessService;
    private PieceDao pieceDao;
    private TurnDao turnDao;

    @BeforeEach
    void setUp() {
        pieceDao = new MemoryPieceDao();
        turnDao = new MemoryTurnDao();
        chessService = new ChessService(pieceDao, turnDao);
    }

    @DisplayName("ready를 할 경우 게임은 준비 상태가 된다.")
    @Test
    void 레디_게임_준비한다() {
        chessService.ready();

        ChessGame chessGame = chessService.getChessGame();
        StateType stateType = StateType.of(chessGame.getState());

        assertThat(stateType).isEqualTo(StateType.READY);
    }

    @DisplayName("새 게임을 생성한다.")
    @Test
    void 새_게임_생성한다() {
        chessService.create();

        ChessGame chessGame = chessService.getChessGame();
        StateType stateType = StateType.of(chessGame.getState());

        assertThat(stateType).isEqualTo(StateType.WHITE_TURN);
    }

    @DisplayName("체스의 기물을 움직인다.")
    @Test
    void 기물_움직인다() {
        chessService.create();

        ChessGame chessGame = chessService.getChessGame();
        chessGame.move("a2", "a4");
        StateType stateType = StateType.of(chessGame.getState());

        assertThat(stateType).isEqualTo(StateType.BLACK_TURN);
    }

    @AfterEach
    void tearDown() {
        pieceDao.removeAll();
    }
}
```

`@BeforeEach`를 통해 setUp을 진행할 때 fake DAO를 생성하여 테스트를 진행한다.

## 미션 회고

이번 미션을 대하는 나의 마음가짐은 정말 최악이었다. 비교적 여유로운 기간이 더욱 나태하게 만들었다. 또한 미션이 마무리되고 방학이 진행되었기 때문에 의욕은 점점 떨어져 갔다. 

이것들은 결국 다 핑계일 뿐이다. 단지 크루들과 술을 마시며 노는 것이 더욱 즐거웠기에 미션을 등한시 했다. 결과적으로 퀄리티 떨어지는 질문을 남길 수 밖에 없었고 많은 실패를 경험하지 못했다. 즉 레벨 1에서만 얻을 수 있는 많은 인사이트들을 놓치고 지나가게 된 것이다. 

다가오는 레벨 2를 이번 미션 처럼 보낼 수 없다. 미션을 진행하며 느꼈던 감정을 들을 까먹지 않고 온전히 받아들이고 반성하며 부끄러워하자. 

## References

[Test Double을 알아보자](https://tecoble.techcourse.co.kr/post/2020-09-19-what-is-test-double/)
