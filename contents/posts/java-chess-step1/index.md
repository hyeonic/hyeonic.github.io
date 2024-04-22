---
title: "[레벨 1] 07. 1, 2, 3단계 - 체스"
date: 2022-03-31
update: 2022-03-31
tags: 
 - 우아한테크코스
 - 레벨1
 - 미션
series: "우아한테크코스 레벨1"
feed:
  enable: false
---

## 목표

![](https://user-images.githubusercontent.com/59357153/152970395-a31c8134-fc89-449f-b4dc-441e03df929c.png)

우아한테크코스에서 진행한 미션의 리뷰와 피드백에 대해 정리한다. 실제 리뷰는 [[1, 2, 3단계 - 체스] 매트(최기현) 미션 제출합니다.](https://github.com/woowacourse/java-chess/pull/302)에서 확인할 수 있다.

## 07. 1, 2, 3단계 - 체스 리뷰 확인

드디어 레벨 1의 마지막 미션인 체스가 시작 되었다. 체스는 비교적 어려운 요구사항을 가지고 있기 때문에 구현 기능 목록을 정리하는 것도 쉽지 않았다. TDD, 객체의 책임 부여 등 지금까지 학습한 내용을 최대한 반영하여 진행하기 위해 노력했다.

## 상태 패턴 도입

블랙잭 미션 당시 상태 패턴에 대한 수업은 굉장히 재밌게 다가 왔다. 상태 조차도 객체라는 단위로 나눠서 추상화할 수 있다는 것이 큰 흥미를 이끌었다. 이번 미션에서도 처음 부터 상태 패턴을 고려하여 도입한 것은 아니지만 반복되는 if문 분기를 처리하기 위해서 떠올리게 되었다.

체스는 여러 가지 상태를 가지고 있다. 게임이 시작되면 White 진영부터 기물을 옮길 수 있다. 측 white turn이 된다. 이제 white와 black으로 번갈아 가며 상태가 변경된다.

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

## 비어있는 Piece

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

### 널(Null) 객체 패턴

처음 의도는 단순히 null을 사용하는 것 보다 명시적이라고 판단하여 사용하였다. 스터디 중 우연히 널 객체 패턴에 대한 자료를 접한 뒤 EmptyPiece에 적용한 내용과 굉장히 유사하다고 판단하였다.

* null 대신 사용할 클래스를 구현한다. 이 클래스는 `상위 타입을 상속 `받으며 아무 기능도 수행하지 않는다.
* null을 리턴하는 대신 null을 대체할 클래스의 객체를 리턴한다.

이러한 널 객체 패턴은 null 검증을 위한 코드를 없애주며 코드의 가독성을 높여 준다. 또한 null을 사용하지 않기 때문에 의도하지 않은 `NullPointerException`을 피할 수 있다.

하지만 이러한 널 객체 패턴은 장점만 존재하는 것은 아니다. 널 객체는 실제 객체와 똑같은 모든 메시지에 응답하기 때문에 대부분의 시스템에서 정상적으로 작동할 것이다. 하지만 잘못되서 빠져나오는 부분이 없기 때문에 문제를 감지하거나 찾기 힘들어질 수 있다고 한다.

## 큰 문제를 작은 문제로 나누어 적용하자

이번 체스 미션은 유독 요구사항을 파악하고 정리하는 과정이 어렵게 다가 왔다. 특히 복잡한 검증 로직을 동반하기 때문에 특별한 가이드 라인 없이 무에서 유를 창조하는 과정이 가장 힘들었다.

그 중 나를 가장 많이 괴롭힌 것은 `Pawn`이다. `Pawn`은 진영 별로 이동하기 위한 전략이 다르고 다른 기물을 `capture`하기 위한 조건도 까다롭다. 이것이 미션 내내 나의 발목을 붙잡았다.

아래는 수정 이전의 Pawn 이동 전략이다.

```java
public class BlackPawnMovingStrategy implements MovingStrategy {

    private static final int RANK_INDEX_STARTING_POINT = 1;
    private static final Direction MOVABLE_DIRECTION = Direction.BOTTOM;
    private static final List<Direction> CAPTURABLE_DIRECTIONS = List.of(Direction.BOTTOM_LEFT, Direction.BOTTOM_RIGHT);

    @Override
    public void validateMove(List<List<Piece>> board, Position sourcePosition, Position targetPosition) {
        int rankLength = Math.abs(sourcePosition.getRankIndex() - targetPosition.getRankIndex());
        int fileLength = Math.abs(sourcePosition.getFileIndex() - targetPosition.getFileIndex());
        Direction direction = Direction.of(sourcePosition, targetPosition);

        if (direction == MOVABLE_DIRECTION && isMovableLengthAtMove(sourcePosition, rankLength)) {
            validateMoveTop(sourcePosition, rankLength, findPiece(board, sourcePosition.add(direction)));
            validateExistPiece(findPiece(board, targetPosition));
            return;
        }
        if (CAPTURABLE_DIRECTIONS.contains(direction) && isMovableLengthAtCapture(rankLength, fileLength)) {
            validateCapture(findPiece(board, targetPosition));
            return;
        }

        throw new IllegalArgumentException("해당 기물이 갈 수 없는 경로입니다.");
    }

    private boolean isMovableLengthAtMove(Position sourcePosition, int rankLength) {
        return rankLength == 1
                || (sourcePosition.getRankIndex() == RANK_INDEX_STARTING_POINT && rankLength == 2);
    }

    private void validateMoveTop(Position source, int rankLength, Piece piece) {
        if (rankLength == 2 && source.getRankIndex() == RANK_INDEX_STARTING_POINT) {
            validateExistPiece(piece);
        }
    }

    private void validateExistPiece(Piece piece) {
        if (!piece.isEmpty()) {
            throw new IllegalArgumentException("경로에 기물이 존재하여 이동할 수 없습니다.");
        }
    }

    private boolean isMovableLengthAtCapture(int rankLength, int fileLength) {
        return rankLength + fileLength == 2;
    }

    private void validateCapture(Piece targetPiece) {
        validateEmptyPiece(targetPiece);
        validateSameColor(targetPiece);
    }

    private void validateEmptyPiece(Piece piece) {
        if (piece.isEmpty()) {
            throw new IllegalArgumentException("target 위치에 기물이 존재하지 않아 공격할 수 없습니다.");
        }
    }

    private void validateSameColor(Piece targetPiece) {
        if (targetPiece.isBlack()) {
            throw new IllegalArgumentException("공격은 다른 진영만 가능합니다.");
        }
    }

    private Piece findPiece(List<List<Piece>> board, Position position) {
        int rankIndex = position.getRankIndex();
        int fileIndex = position.getFileIndex();

        return board.get(rankIndex).get(fileIndex);
    }
}
```

이동 전략을 분석하기도 어렵고 가독성 또한 떨어진다. 해당 로직은 수정이 필요하다고 판단했다.

우선 `큰 문제`를 `작은 문제`로 나눠서 접근하였다. Pawn은 크게 3개의 이동 전략을 가지고 있다.

* Pawn은 시작점에서 1칸 혹은 2칸 이동이 가능하다.
* Pawn은 기본적으로 1칸 이동이 가능하다.
* Pawn은 캡처할 때 대각선 방향이어야 한다.

### Pawn은 시작점에서 1칸 혹은 2칸 이동이 가능하다.

```java
public class PawnStartingPointMovingStrategy implements MovingStrategy {

    private final int startIndex;
    private final Direction direction;

    public PawnStartingPointMovingStrategy(int startIndex, Direction direction) {
        this.startIndex = startIndex;
        this.direction = direction;
    }

    @Override
    public boolean canMove(Board board, Position source, Position target) {
        Direction direction = Direction.of(source, target);
        double distance = source.calculateDistance(target);

        return this.direction == direction
                && (canMoveTwoPosition(board, distance, source) || canMoveOnePosition(board, distance, source));
    }

    private boolean canMoveTwoPosition(Board board, double distance, Position source) {
        Position currentPosition = source.add(direction);
        Piece currentPiece = board.findPiece(currentPosition);

        currentPosition = currentPosition.add(direction);
        Piece targetPiece = board.findPiece(currentPosition);

        return source.getRankIndex() == startIndex
                && distance == 4
                && currentPiece.isEmpty()
                && targetPiece.isEmpty();
    }

    private boolean canMoveOnePosition(Board board, double distance, Position source) {
        Piece targetPosition = board.findPiece(source.add(direction));

        return source.getRankIndex() == startIndex
                && distance == 1
                && targetPosition.isEmpty();
    }
}
```

### Pawn은 기본적으로 1칸 이동이 가능하다.

```java
public class PawnDefaultMovingStrategy implements MovingStrategy {

    private final Direction direction;

    public PawnDefaultMovingStrategy(Direction direction) {
        this.direction = direction;
    }

    @Override
    public boolean canMove(Board board, Position source, Position target) {
        Direction direction = Direction.of(source, target);
        double distance = Math.sqrt(source.calculateDistance(target));

        return this.direction == direction && canMoveOnePosition(board, distance, source);
    }

    private boolean canMoveOnePosition(Board board, double distance, Position source) {
        Piece targetPosition = board.findPiece(source.add(direction));
        return distance == 1 && targetPosition.isEmpty();
    }
}
```

### Pawn은 캡처할 때 대각선 방향이어야 한다.

```java
public class PawnCaptureMovingStrategy implements MovingStrategy {

    private final List<Direction> directions;

    public PawnCaptureMovingStrategy(List<Direction> directions) {
        this.directions = directions;
    }

    @Override
    public boolean canMove(Board board, Position source, Position target) {
        Direction direction = Direction.of(source, target);

        return directions.contains(direction)
                && source.calculateDistance(target) == 2
                && isCapture(board, source, target);
    }

    private boolean isCapture(Board board, Position source, Position target) {
        Piece sourcePiece = board.findPiece(source);
        Piece targetPiece = board.findPiece(target);

        return !targetPiece.isEmpty() && !sourcePiece.isSameColor(targetPiece);
    }
}
```

확실히 작은 문제로 접근하고 나니 훨씬 가독성있게 느껴졌다. 이제 해당 전략들을 사용하는 `Pawn`이다.

```java
public class Pawn extends Piece {
    ...
    private final List<MovingStrategy> movingStrategies;

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

핵심은 `anyMatch`이다. 주입된 전략들을 통해 하나라도 이동이 가능하면 예외를 던지지 않고 통과한다.

## References

[널 오브젝트 패턴 (Null Object Pattern)](https://johngrib.github.io/wiki/pattern/null-object/)
