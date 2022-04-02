---
title: Chapter07 주요 디자인 패턴
tags: ['우아한테크코스', '개발자가 반드시 정복해야 할 객체지향과 디자인 패턴']
date: 2022-04-02 23:30:00
---

# Chapter07 주요 디자인 패턴

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/152970395-a31c8134-fc89-449f-b4dc-441e03df929c.png />

## 목표

개발자가 반드시 정복해야 할 객체 지향과 디자인 패턴 스터디를 진행하며 공부한 내용을 정리한다.

## 1. 디자인 패턴이란?

객체 지향 설계는 소프트웨어로 해결하고자 하는 문제를 다루며 재설계를 최소화하며 변하는 요구 사항에 유연하게 대처할 수 있도록 만들어 준다. 이러한 객체 지향 설계는 이전과 비슷한 상황에서 재사용하는 경우가 종종 발생하게 된다. 이렇게 `반복적으로 사용되는 설계`는 클래스, 객체의 구성, 객체 간의 메시지 흐름에 일정한 `패턴`을 가진다. 

이러한 패턴들은 아래와 같은 장점을 가져온다.
* 상황에 맞는 올바른 설계를 더 빠르게 적용 가능하다.
* 각 패턴의 장단점을 통해 설계를 선택하는데 도움을 준다.
* 설계 패턴에 이름을 붙여 시스템의 문서화, 이해, 유지 보수에 큰 도움을 준다.

## 2. 전략(Strategy) 패턴

만약 문제를 처리하기 위한 전략이 객체 내부에 존재하게 되면 처리 방법이 늘어날 때 마다 if-else를 활용한 분기가 늘어나게 된다. 전략 패턴은 이러한 `문제 처리를 위한 전략`을 `외부 객체로 분리`하는 것에서 시작한다.

아래는 전략 패턴의 각 객체들을 그림으로 표현한 것이다.
<CenterImage image-src=https://user-images.githubusercontent.com/59357153/139800470-153c7224-03b2-4719-b71a-12d509a6fe0f.png />

전략 패턴의 특징은 `전략을 사용하는 컨텍스트`가 직접 전략을 선택하지 않는다. `DI(Dependency Injection)`를 통하여 컨텍스트에게 전략을 전달해준다. 

아래는 자동차 미션을 진행할 때 사용한 예시이다.

#### MovingStrategy

다양한 전략을 공통 방식으로 사용하기 위한 인터페이스이다. 아래 인터페이스를 기반으로 다양한 전략을 구현할 수 있다.

```java
public interface MovingStrategy {
    boolean isMovable();
}
```

#### RandomMovingStrategy

전략 인터페이스를 구현한 구현체이다.

```java
public class RandomMovingStrategy implements MovingStrategy {
    private static final int MOVE_CONDITION = 4;
    private static final int START_INCLUSIVE = 0;
    private static final int END_INCLUSIVE = 9;

    public boolean isMovable() {
        return pickNumber() >= MOVE_CONDITION;
    }

    private int pickNumber() {
        return (int)((Math.random() * ((END_INCLUSIVE + 1) - START_INCLUSIVE)) + START_INCLUSIVE);
    }
}
```

#### Context

전략을 사용하는 `컨텍스트`인 Car이다. 생성 시점에 외부에서 주입 받아 사용된다.

```java
public class Car {
    private final CarName name;
    private int position;
    private final MovingStrategy movingStrategy;

    public Car(String name, MovingStrategy movingStrategy) {
        this.name = new CarName(name);
        this.position = 0;
        this.movingStrategy = movingStrategy;
    }

    public void move() {
        if (movingStrategy.isMovable()) {
            position++;
        }
    }
    ...
}
```

### 전략 패턴의 장점

Car 객체를 생성하는 시점에 전략을 정할 수 있어 유연하게 이동과 관련된 단위 테스트를 진행할 수 있다. 이동에 따른 요구사항이 추가되면 간단히 구현체를 추가하고 교체하는 행위로 쉽게 변경이 가능하다.

```java
public class CarTest {
    ...
    @DisplayName("이동 전략이 true이면 이동한다.")
    @Test
    void move_이동() {
        String input = "매트";
        MovingStrategy movingStrategy = () -> true;

        Car car = new Car(input, movingStrategy);
        car.move();

        assertThat(car.getPosition()).isEqualTo(1);
    }

    @DisplayName("이동 전략이 false이면 정지한다.")
    @Test
    void move_이동실패() {
        String input = "매트";
        MovingStrategy movingStrategy = () -> false;

        Car car = new Car(input, movingStrategy);
        car.move();

        assertThat(car.getPosition()).isEqualTo(0);
    }
}
```

### 전략 주입 시점에 따른 특징

* `생성자를 통한 전략 주입`: `객체를 생성하는 시점`에 객체 내부의 인스턴스 변수에 전략이 정해진다. 즉 추가적인 인스턴스 변수가 필요하고, 별도의 setter나 수정 관련 메서드가 없다면 생성된 Car의 이동 전략은 변경되지 않을 것이다.

* `메서드를 통한 전략 주입`: 메서드 실행 시점에 주입할 경우 인스턴스 변수는 유지할 필요 없고 해당 행위를 진행할 때 마다 전략을 변경할 수 있다. 다만 외부에서 행위를 진행할 때 매번 전략을 전달해야 한다.

### 여러 전략 관리

만약 해야 하는 전략이 여러가지라면 어떻게 해야 할까? 방법은 전략을 Collection으로 가지고 있는 것이다. 아래는 이번 미션을 진행한 간단한 예시이다.

체스에서 Pawn은 1개 이상의 이동 전략을 가지고 있다.

* Pawn은 시작점에서 1칸 혹은 2칸 이동이 가능하다.
* Pawn은 기본적으로 1칸 이동이 가능하다.
* Pawn은 캡처할 때 대각선 방향이어야 한다.

아래와 같이 다수의 전략을 관리하며 사용할 수 있다.

```java
public class Pawn extends Piece {
    ...
    private final List<MovingStrategy> movingStrategies; // 다수의 전략

    @Override
    public void validateMove(Board board, Position source, Position target) {
        boolean canMove = movingStrategies.stream()
                .anyMatch(pawnMovingStrategy -> pawnMovingStrategy.canMove(board, source, target));

        if (!canMove) {
            throw new IllegalArgumentException();
        }
    }
}
```

## 2. 템플릿 메서드(Template Method) 패턴

프로그램을 구현하다 보면 동일한 절차를 가진 코드를 작성해야 하는 경우가 있다. 실행 과정/단계는 동일한데 각 단계 중 `일부의 구현이 다른 경우` 템플릿 메서드 패턴을 사용할 수 있다.

템플릿 메서드 패턴을 사용하게 되면 동일한 실행 과정의 구현을 제공함과 동시에 하위 타입에서 일부 단계를 구현할 수 있다. 이것은 각 타입의 코드 중복을 줄일 수 있다.

또한 템플릿 메서드 패턴은 하위 클래스가 아닌 상위 클래스에서 흐름을 제어한다. 일반적으로 하위 타입이 상위 타입의 기능을 재사용할지 여부를 결정하기 때문에 흐름 제어를 하위 타입이 맡게 된다.

## 3. 상태(State) 패턴

블랙잭 미션 당시 상태 패턴에 대한 수업은 굉장히 재밌게 다가 왔다. 상태 조차도 객체라는 단위로 나눠서 추상화할 수 있다는 것이 큰 흥미를 이끌었다. 이번 미션에서도 처음 부터 상태 패턴을 고려하여 도입한 것은 아니지만 반복되는 if문 분기를 처리하기 위해서 떠올리게 되었다.

상태 패턴의 핵심은 상태를 객체로 작성하여 기능을 제공한다는 것이다. 또한 상태의 변경은 컨텍스트나 상태 객체 둘 중 하나가 맡게 된다. 

컨텍스트에서 상태를 변경하는 경우 비교적 상태 개수가 적고 상태 변경 규칙이 거의 바뀌지 않을 때 유리하다. 상태 종류가 지속적으로 변경되거나 규칙이 자주 바뀌는 경우 컨텍스트의 상태 변경 처리 로직이 복잡해질 수 있다.

상태 객체에서 컨텍스트의 상태를 변경할 경우 컨텍스트의 영향을 주지 않기 때문에 비교적 유연하다. 하지만 상태 구현 클래스가 늘어날 수록규칙을 파악하는데 어려움을 가져온다.

아래는 간단한 예시이다. 체스는 여러 가지 상태를 가지고 있다. 게임이 시작되면 White 진영부터 기물을 옮길 수 있다. 측 white turn이 된다. 이제 white와 black으로 번갈아 가며 상태가 변경된다.

### State

필요한 공통 상태를 선언한 인터페이스이다.

```java
public interface State {

    State start();

    State end();

    State move(String source, String target);

    boolean isFinished();

    Result winner();

    ChessBoard chessBoard();
}
```

해당 인터페이스를 기반으로 적절한 상태를 하위 클래스로 만들어 구현하였다. 

### Ready

모든 상태의 시작은 `Ready`로 부터 시작된다. 외부에서 사용할 때 `중간 상태에서 시작하는 것`을 의도적으로 막기 위해서이다. Ready에서는 오직 시작과 관련된 행위만 가능하다. 게임을 시작하게 되면 White 진영 부터 기물을 옮길 수 있다.

```java
public class Ready extends Started {

    public Ready() {
        super(new ChessBoard(new InitBoardGenerator()));
    }

    @Override
    public State start() {
        return new WhiteTurn(chessBoard);
    }

    @Override
    public State end() {
        throw new UnsupportedOperationException();
    }

    @Override
    public State move(String source, String target) {
        throw new UnsupportedOperationException();
    }

    @Override
    public boolean isFinished() {
        return false;
    }

    @Override
    public Result winner() {
        throw new UnsupportedOperationException();
    }
}
```

### WhiteTurn과 BlackTurn

특정 진영의 턴을 나타내기 위한 상태이다. source 위치의 기물이 해당 진영의 기물인지 확인 한 뒤 이동하여 게임의 종료 여부를 확인 한다. 기물 이동이 정상적으로 진행되면 다른 진영의 턴으로 상태를 변환해준다.

```java
public class WhiteTurn extends Running {

    protected WhiteTurn(ChessBoard chessBoard) {
        super(chessBoard);
    }

    @Override
    public State move(String source, String target) {
        if (chessBoard.isTurn(source, Color.WHITE)) {
            throw new IllegalArgumentException("black 진영의 차례가 아닙니다.");
        }

        chessBoard.move(source, target);

        if (chessBoard.isFinished()) {
            return new WhiteWin(chessBoard);
        }

        return new BlackTurn(chessBoard);
    }
}
```

```java
public class BlackTurn extends Running {

    protected BlackTurn(ChessBoard chessBoard) {
        super(chessBoard);
    }

    @Override
    public State move(String source, String target) {
        if (chessBoard.isTurn(source, Color.BLACK)) {
            throw new IllegalArgumentException("white 진영의 차례가 아닙니다.");
        }

        chessBoard.move(source, target);

        if (chessBoard.isFinished()) {
            return new BlackWin(chessBoard);
        }

        return new WhiteTurn(chessBoard);
    }
}
```

### WhiteWin, BlackWin 그리고 End 

게임이 끝난 것을 나타내기 위한 상태들이다. 기본적으로 `Finished`를 통해 공통적인 행위를 추상화하였다.

```java
public abstract class Finished extends Started {

    protected Finished(ChessBoard chessBoard) {
        super(chessBoard);
    }

    @Override
    public final State start() {
        throw new UnsupportedOperationException();
    }

    @Override
    public final State end() {
        throw new UnsupportedOperationException();
    }

    @Override
    public final State move(String source, String target) {
        throw new UnsupportedOperationException();
    }

    @Override
    public final boolean isFinished() {
        return true;
    }
}
```

끝난 상태 이므로 오직 가능한 행위는 끝났는지 확인하는 것 뿐이다. 다른 행위들은 오작동하지 않도록 모두 예외를 던진다.

또한 각 진영이 승리하게 되면 winner를 확인할 수 있다. 

```java
public class WhiteWin extends Finished {

    protected WhiteWin(ChessBoard chessBoard) {
        super(chessBoard);
    }

    @Override
    public Result winner() {
        return Result.WHITE;
    }
}
```

`End`의 경우 외부의 특수한 커맨드로 인해 동작한다. 현재 남아있는 기물들을 판단하여 승패를 결정한다.

```java
public class End extends Finished {

    protected End(ChessBoard chessBoard) {
      super(chessBoard);
    }

    @Override
    public Result winner() {
        double whiteScore = chessBoard.calculateScore(Color.WHITE);
        double blackScore = chessBoard.calculateScore(Color.BLACK);

        return Result.of(whiteScore, blackScore);
    }
}
```

이제 작성한 상태는 외부에서 작성한 명령어로 인해 변경된다. 실제 상태를 가진 `ChessGame`이다.

```java
public class ChessGame {

    private State state;

    public ChessGame() {
        this.state = new Ready();
    }

    public void start() {
        state = state.start();
    }

    public void end() {
        state = state.end();
    }

    public void move(String source, String target) {
        state = state.move(source, target);
    }

    public boolean isFinished() {
        return state.isFinished();
    }

    public double score(Color color) {
        ChessBoard chessBoard = state.chessBoard();
        return chessBoard.calculateScore(color);
    }

    public Result result() {
        return state.winner();
    }

    public List<List<Piece>> board() {
        ChessBoard chessBoard = state.chessBoard();
        Board board = chessBoard.getBoard();
        return board.getValue();
    }
}
```

클라이언트는 약속된 명령어를 통해 상태를 변경시킬 수 있다. 실제 명령을 내리는 부분은 아래와 같다.

```java
public enum Command {

    START("start", (chessGame, arguments) -> {
        chessGame.start();
        OutputView.printChessBoard(chessGame.board());
    }),

    END("end", (chessGame, arguments) -> {
        chessGame.end();
    }),

    MOVE("move", (chessGame, arguments) -> {
        chessGame.move(arguments.get(0), arguments.get(1));
        OutputView.printChessBoard(chessGame.board());
    }),

    STATUS("status", (chessGame, arguments) -> {
        double whiteScore = chessGame.score(Color.WHITE);
        double blackScore = chessGame.score(Color.BLACK);
        OutputView.printStatusMessage(whiteScore, blackScore);
    });

    private final String type;
    private final BiConsumer<ChessGame, List<String>> consumer;

    Command(String type, BiConsumer<ChessGame, List<String>> consumer) {
        this.type = type;
        this.consumer = consumer;
    }

    public static Command of(String input) {
        return Arrays.stream(values())
                .filter(command -> input.equals(command.type))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 명령입니다."));
    }

    public void accept(ChessGame chessGame, String source, String target) {
        consumer.accept(chessGame, List.of(source, target));
    }
}
```

특정 명령어를 입력하면 `BiConsumer`를 통해 상태를 변경하도록 메시지를 던진다.

## 4. 널(Null) 객체 패턴

체스판에는 64칸 중 최대 32칸의 기물을 위치 시킬 수 있다. 체스판은 이차원 리스트를 활용하여 세팅해 두었다.

그렇기 때문에 기물이 존재하지 않는 칸들을 적절히 처리해주어야 한다. 단순히 `null`을 사용할 수 있지만 특수한 객체를 활용하여 비어있는 칸을 나타내는 Piece를 활용하였다.

```java
public class EmptyPiece extends Piece {

    public EmptyPiece() {
        super(PieceType.EMPTY, Color.NONE);
    }

    @Override
    public void validateMove(Board board, Position source, Position target) {
        throw new UnsupportedOperationException();
    }

    @Override
    public boolean isEmpty() {
        return true;
    }
}
```

`EmptyPiece`는 오직 비어있는지에 대한 유무를 확인할 수 있다.

처음 의도는 단순히 null을 사용하는 것 보다 명시적이라고 판단하여 사용하였다. 스터디 중 우연히 널 객체 패턴에 대한 자료를 접한 뒤 EmptyPiece에 적용한 내용과 굉장히 유사하다고 판단하였다.

* null 대신 사용할 클래스를 구현한다. 이 클래스는 `상위 타입을 상속 `받으며 아무 기능도 수행하지 않는다.
* null을 리턴하는 대신 null을 대체할 클래스의 객체를 리턴한다.

이러한 널 객체 패턴은 null 검증을 위한 코드를 없애주며 코드의 가독성을 높여 준다. 또한 null을 사용하지 않기 때문에 의도하지 않은 `NullPointerException`을 피할 수 있다.

하지만 이러한 널 객체 패턴은 장점만 존재하는 것은 아니다. 널 객체는 실제 객체와 똑같은 모든 메시지에 응답하기 때문에 대부분의 시스템에서 정상적으로 작동할 것이다. 하지만 잘못되서 빠져나오는 부분이 없기 때문에 문제를 감지하거나 찾기 힘들어질 수 있다고 한다.

## References

최범균 지음, 『개발자가 반드시 정복해야 할 객체지향과 디자인 패턴』, 인투북스(2014), p174-257.

<TagLinks />