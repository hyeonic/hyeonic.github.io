---
title: "프리코스 1주차"
date: 2021-11-01
update: 2021-11-01
tags: 
 - 우아한테크코스
 - 프리코스
series: "우아한테크코스 4기 프리코스"
feed:
  enable: false
---

## 미션 - 숫자 야구 게임

우아한테크코스 4기 프리코스 1주차 미션을 진행하며 고민한 내용을 정리하고 추가적인 개인 목표를 세워 정리해보았다.

[미션 - 숫자 야구 게임](https://github.com/woowacourse/java-baseball-precourse)

## 구현 기능 목록

프로젝트를 진행할 때 최초에 모든 기능 목록을 작성하기 보다 작업을 진행하며 추가적인 기능을 지속적으로 업데이트 할 수 있도록 노력하였다.

<details>
<summary>ver 0.1 기능 목록</summary>

1부터 9까지 서로 다른 수로 이루어진 3자리 수를 맞추는 야구 게임

### 1. 1에서 9까지의 서로 다른 임의의 수를 3개 자동으로 생성한다.
 * 임의의 수는 `camp.nextstep.edu.missionutils`에서 제공하는 `Randoms` API 사용. 값 추출은 `pickNumberInRange()`를 활용한다.
 * 3자리 수는 서로 다른 수 이기 때문에 `중복 여부`를 확인하여 생성한다.

### 2. 사용자에게 3자리 수를 입력 받는다.
 * 상대방(컴퓨터)은 입력 안내 메시지를 제공한다.

### 3. 사용자의 입력을 바탕으로 볼, 스트라이크의 개수를 반환한다.
 * 같은 수만 n개 존재할 경우: `n볼`
 * 같은 수가 같은 자리에 n개 있는 경우: `n스트라이크`
 * 다른 자리에 같은 수가 n개, 같은 수가 같은 자리에 m개 있는 경우: `n볼 m스트라이크` 
 * 같은 수가 전혀 없는 경우: `낫싱`

### 4. 게임은 정답을 맞출 때 까지 반복된다.
 * 3스트라이크가 나오면 해당 게임은 종료된다.

### 5. 게임이 종료되면 재시작, 애플리케이션 종료할 수 있다.
 * 사용자가 1을 입력하면 게임은 새로 시작한다.
 * 사용자가 2를 입력하면 게임은 즉시 종료된다. 즉 `애플리케이션이 종료`된다.

### 6. 사용자가 잘못된 값을 입력할 경우 `IllegalArgumentException` 을 발생시킨다.
 * 해당 예외가 발생하면 `애플리케이션을 종료` 시킨다. 즉 게임을 더 이상 진행할 수 없다.
</details>

<details>
<summary>ver 0.2 기능 목록</summary>

1부터 9까지 서로 다른 수로 이루어진 3자리 수를 맞추는 야구 게임

### 1. 1에서 9까지의 서로 다른 임의의 수를 3개 자동으로 생성한다.
 * 임의의 수는 `camp.nextstep.edu.missionutils`에서 제공하는 `Randoms` API 사용한다. 값 추출은 `pickNumberInRange()`를 활용한다.
 * 3자리 수는 서로 다른 수 이기 때문에 `중복 여부`를 확인하여 생성한다.

### 2. 사용자에게 3자리 수를 입력 받는다.
 * 상대방(컴퓨터)은 입력 안내 메시지를 제공한다.
 * 3자리가 넘어가면 `IllegalArgumentException`을 던진다. ✚

### 3. 사용자의 입력을 바탕으로 볼, 스트라이크의 개수를 반환한다.
 * 임의의 수와 입력값을 활용하여 볼, 스트라이크의 개수를 계산한다. ✚
 * 같은 수만 n개 존재할 경우: `n볼`
 * 같은 수가 같은 자리에 n개 있는 경우: `n스트라이크`
 * 다른 자리에 같은 수가 n개, 같은 자리에 같은 수가 m개 있는 경우: `n볼 m스트라이크`
 * 같은 수가 전혀 없는 경우: `낫싱`
 * 스트라이크 개수를 기준으로 게임 성공 여부를 반환한다. ✚

### 4. 게임은 정답을 맞출 때 까지 반복된다.
 * 3스트라이크가 나오면 해당 게임은 종료된다.

### 5. 게임이 종료되면 재시작, 애플리케이션 종료할 수 있다.
 * 사용자가 1을 입력하면 게임은 새로 시작한다.
 * 사용자가 2를 입력하면 게임은 즉시 종료된다. 즉 `애플리케이션이 종료`된다.

### 6. 사용자가 잘못된 값을 입력할 경우 IllegalArgumentException 을 발생시킨다.
 * 해당 예외가 발생하면 `애플리케이션을 종료` 시킨다. 즉 게임을 더 이상 진행할 수 없다.
</details>

<details>
<summary>ver 0.3 기능 목록</summary>

1부터 9까지 서로 다른 수로 이루어진 3자리 수를 맞추는 야구 게임

### 1. 1에서 9까지의 서로 다른 임의의 수를 3개 자동으로 생성한다.
 * 임의의 수는 `camp.nextstep.edu.missionutils`에서 제공하는 `Randoms` API 사용한다. 값 추출은 `pickNumberInRange()`를 활용한다.
 * 3자리 수는 서로 다른 수 이기 때문에 `중복 여부`를 확인하여 생성한다.

### 2. 사용자에게 3자리 수를 입력 받는다.
 * 상대방(컴퓨터)은 입력 안내 메시지를 제공한다.
 * 잘못된 예외에 대한 예외 처리를 진행한다.
     * 입력 받은 수가 3자리가 아니면 예외를 던진다. ✚
     * 입력값이 숫자가 아니면 예외를 던진다. ✚
     * 입력 받은 수 중 같은 수가 존재하면 예외를 던진다. ✚
     * 입력 받은 수가 1 ~ 9 범위가 아니면 예외를 던진다. 즉 0이 될 수 없다. ✚

### 3. 사용자의 입력을 바탕으로 볼, 스트라이크의 개수를 반환한다.
 * 임의의 수와 입력값을 활용하여 볼, 스트라이크의 개수를 계산한다. ✚
 * 같은 수만 n개 존재할 경우: `n볼`
 * 같은 수가 같은 자리에 n개 있는 경우: `n스트라이크`
 * 다른 자리에 같은 수가 n개, 같은 자리에 같은 수가 m개 있는 경우: `n볼 m스트라이크`
 * 같은 수가 전혀 없는 경우: `낫싱`
 * 스트라이크 개수를 기준으로 게임 성공 여부를 반환한다. ✚

### 4. 게임은 정답을 맞출 때 까지 반복된다.
 * 3스트라이크가 나오면 해당 게임은 종료된다.

### 5. 게임이 종료되면 재시작, 애플리케이션 종료할 수 있다.
 * 사용자가 1을 입력하면 게임은 새로 시작한다.
 * 사용자가 2를 입력하면 게임은 즉시 종료된다. 즉 `애플리케이션이 종료`된다.
 * 1과 2 이외의 입력이 주어지면 `IllegalArgumentException`을 던진다.

### 6. 사용자가 잘못된 값을 입력할 경우 IllegalArgumentException 을 발생시킨다.
 * 해당 예외가 발생하면 `애플리케이션을 종료` 시킨다. 즉 게임을 더 이상 진행할 수 없다.
</details>

## 자바 코드 컨벤션 적용

[캠퍼스 핵데이 Java 코딩 컨벤션](https://naver.github.io/hackday-conventions-java/)

이번 프리코스에서는 코드 컨벤션 적용을 위해 위 링크를 참고하였다. 또한 빠른 적용을 위해 xml 파일까지 제공된다.

현재 개발 m1 맥북 + intellij를 활용하여 개발을 진행하고 있다. 위 설정을 그대로 적용하고 git commit을 진행하면 tab size가 8로 적용되는 문제를 확인하였다. 

![](https://user-images.githubusercontent.com/59357153/143804973-88a32d76-6019-4cca-b8e2-56fe9ae36560.png)

위 `Use tab character`를 해제하고 다시 commit을 진행하면 tab size가 정상적으로 적용된 것을 확인할 수 있었다.

## 상수 사용

문자열, 정수 등의 값을 하드 코딩하지 않고 static final을 활용하여 적용하였다. 해당 문자열, 숫자에 의도를 나타낼 수 있도록 노력하였다.

```java
private static final int NUMBERS_SIZE = 3;
private static final int RANGE_MIN_NUMBER = 1;
private static final int RANGE_MAX_NUMBER = 9;
```

## 역할, 책임, 협력에 기반하여 설계하기  
객체들이 애플리케이션의 기능을 구현하기 위해 수행하는 상호작용을 `협력`이라고 한다. 객체가 협력에 참여하기 위해 수행하는 로직은 `책임`이라고 부른다. 객체들이 협력 안에서 수행하는 책임들이 모여 객체가 수행하는 `역할`을 구성한다. 

`오브젝트`를 읽으며 객체에게 적절한 책임을 부여하여 설계하도록 노력하였다.

### BaseballNumbers: 서로 다른 임의의 수를 생성하기 위한 책임

```java
public class BaseballNumbers {
    private static final int NUMBERS_SIZE = 3;
    private static final int RANGE_MIN_NUMBER = 1;
    private static final int RANGE_MAX_NUMBER = 9;

    private List<Integer> baseballNumbers = new ArrayList<>();

    public BaseballNumbers() {
        this.baseballNumbers = new ArrayList<>();
        generateNumbers();
    }

    public List<Integer> getNumbers() {
        return Collections.unmodifiableList(baseballNumbers);
    }

    private void generateNumbers() {
        while (validateSize()) {
            addRandomNumber(Randoms.pickNumberInRange(RANGE_MIN_NUMBER, RANGE_MAX_NUMBER));
        }
    }

    private boolean validateSize() {
        if (baseballNumbers.size() == NUMBERS_SIZE) {
            return false;
        }
        return true;
    }

    private void addRandomNumber(int randomNumber) {
        if (validateDuplicate(randomNumber)) {
            baseballNumbers.add(randomNumber);
        }
    }

    private boolean validateDuplicate(int randomNumber) {
        if (baseballNumbers.contains(randomNumber)) {
            return false;
        }
        return true;
    }
}
```

`BaseballNumbers`는 `1에서 9까지의 서로 다른 임의의 수를 3개 자동으로 생성하는 책임`만 가진다. 랜덤으로 생성된 List는 한 번 생성되면 게임이 진행되는 동안 내부 요소들이 변하지 않아야 한다. 때문에 List를 그대로 외부에 노출하는 것은 큰 리스크를 가지고 있다고 판단하였다. 

또한 `1에서 9까지 서로 다른 임의의 수를 3개를 가진 List`는 기존에 제공되는 자료구조가 아니다. 오직 숫자야구 게임이라는 비즈니스에 종속된 자료구조이다. 이러한 자료구조는 `일급 컬렉션`을 활용하여 구현하였다. 일급 컬렉션의 이점과 사용 이유에 대해 학습하는 좋은 계기가 되었다.

### InputView: 사용자에게 입력 받는 책임

```java
public class InputView {
    private static final String INPUT_NUMBERS_MESSAGE = "숫자를 입력해주세요 : ";
    private static final String INPUT_RESTART_MESSAGE = "게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.";
    private static final String INPUT_NUMBERS_DELIMITER = "";
    private static final int INPUT_NUMBERS_SIZE = 3;
    private static final String INPUT_RESTART_COMMAND = "1";
    private static final String INPUT_END_COMMAND = "2";
    private static final int INPUT_MIN_NUMBER = 1;
    private static final int INPUT_MAX_NUMBER = 9;

    public List<Integer> getInputNumbers() {
        System.out.print(INPUT_NUMBERS_MESSAGE);
        String inputNumbers = Console.readLine();
        validateSize(inputNumbers.length());
        validateDigit(inputNumbers);

        List<Integer> numbers = toList(inputNumbers);
        validateDuplicate(numbers);
        validateNumberRange(numbers);
        return numbers;
    }

    public boolean isRestart() {
        String command = inputCommand();
        validateCommand(command);

        if (command.equals(INPUT_RESTART_COMMAND)) {
            return true;
        }
        return false;
    }

    private void validateSize(int size) {
        if (size != INPUT_NUMBERS_SIZE) {
            throw new IllegalArgumentException(INVALID_SIZE.getMessage());
        }
    }

    private void validateDigit(String inputNumbers) {
        try {
            Integer.parseInt(inputNumbers);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException(INVALID_NUMBER.getMessage());
        }
    }

    private List<Integer> toList(String inputNumbers) {
        return Arrays.stream(inputNumbers.split(INPUT_NUMBERS_DELIMITER))
            .map(Integer::parseInt)
            .collect(Collectors.toList());
    }

    private void validateDuplicate(List<Integer> numbers) {
        Set<Integer> noneDuplicatedNumbers = new HashSet<>(numbers);
        if (noneDuplicatedNumbers.size() != INPUT_NUMBERS_SIZE) {
            throw new IllegalArgumentException(DUPLICATE_NUMBER.getMessage());
        }
    }

    private void validateNumberRange(List<Integer> numbers) {
        long size = numbers.stream()
            .filter(i -> i >= INPUT_MIN_NUMBER && i <= INPUT_MAX_NUMBER)
            .count();

        if (size != INPUT_NUMBERS_SIZE) {
            throw new IllegalArgumentException(INVALID_NUMBER_RANGE.getMessage());
        }
    }

    private String inputCommand() {
        System.out.println(INPUT_RESTART_MESSAGE);
        return Console.readLine();
    }

    private void validateCommand(String command) {
        if (!command.equals(INPUT_RESTART_COMMAND) && !command.equals(INPUT_END_COMMAND)) {
            throw new IllegalArgumentException(INVALID_INPUT_COMMAND.getMessage());
        }
    }
}
```

입력과 관련된 모든 책임이 부여된다. 사용자가 잘못된 입력을 시도할 경우 적절한 예외처리를 할 수 있도록 구현하였다. 아쉬운 점은 잘못된 입력에 대한 검증에 대한 책임까지 가지고 있기 때문에 너무 많은 책임을 부여한 것은 아닌지 고민이 되었다. 

결국 얻고자 하는 것은 `중복되지 않는 3개의 숫자`인데 이것을 이루기 위해서는 위에서 작성한 BaseballNumbers의 검증 방식과 상당 부분 중복 되고 있었다. `3개의 숫자를 관리하기 위한 책임`을 분리하는 것이 더 좋은지 고민하였지만 너무 세세하게 책임을 나누지 않기로 결정하였다.

중복된 숫자인지 검증하기 위해 `Set`을 사용하였다. 입력된 숫자는 무조건 3자리를 보장해야 한다. 해당 숫자 리스트를 Set으로 변경한 뒤 size가 3보다 작으면 중복된 숫자가 있다고 판단하여 예외 처리를 진행한다.

### BaseballReferee: ball, strike의 개수를 계산하는 책임

```java
public class BaseballReferee {
    private static final int ZERO_COUNT = 0;
    private static final int START_INDEX = 0;
    private static final int END_INDEX = 2;

    public BaseballState referee(List<Integer> baseballNumbers, List<Integer> inputNumbers) {
        int ballCount = calculateBall(baseballNumbers, inputNumbers);
        int strikeCount = calculateStrike(baseballNumbers, inputNumbers);
        return new BaseballState(ballCount - strikeCount, strikeCount);
    }

    private int calculateBall(List<Integer> baseballNumbers, List<Integer> inputNumbers) {
        int originalSize = baseballNumbers.size() + inputNumbers.size();
        Set<Integer> noneDuplicateNumbers = new HashSet<>();
        noneDuplicateNumbers.addAll(baseballNumbers);
        noneDuplicateNumbers.addAll(inputNumbers);
        return originalSize - noneDuplicateNumbers.size();
    }

    private int calculateStrike(List<Integer> baseballNumbers, List<Integer> inputNumbers) {
        int strikeCount = ZERO_COUNT;
        for (int i = START_INDEX; i <= END_INDEX; i++) {
            if (baseballNumbers.get(i).equals(inputNumbers.get(i))) {
                strikeCount++;
            }
        }

        return strikeCount;
    }
}
```

`BaseballReferee`은 이름처럼 `심판의 역할`을 진행한다. `referee` 메서드는 랜덤으로 생성된 baseballNumbers와 입력으로 주어진 inputNumbers를 활용하여 ball과 strike를 계산하여 ball과 strike의 개수를 관리하는 `BaseballState`를 반환한다.

ball 계산을 진행할 때 Set을 활용하였다. 중복된 숫자가 존재할 경우 합산한 size가 줄어 들기 때문에 줄어든 size 만큼 ball 개수라고 판단하였다.

### BaseballState: 계산된 ball, strike의 개수를 관리하는 책임

```java
public class BaseballState {
    private static final String BALL = "%d볼";
    private static final String STRIKE = "%d스트라이크";
    private static final String BALL_AND_STRIKE = "%d볼 %d스트라이크";
    private static final String NOTTING = "낫싱";
    private static final int ZERO_COUNT = 0;
    private static final int SUCCESS_STRIKE_COUNT = 3;

    private final int ballCount;
    private final int strikeCount;

    public BaseballState(int ballCount, int strikeCount) {
        this.ballCount = ballCount;
        this.strikeCount = strikeCount;
    }

    public boolean isSuccess() {
        if (strikeCount == SUCCESS_STRIKE_COUNT) {
            return true;
        }
        return false;
    }

    public String getMessage() {
        if (ballCount == ZERO_COUNT && strikeCount == ZERO_COUNT) {
            return NOTTING;
        }

        if (ballCount == ZERO_COUNT) {
            return String.format(STRIKE, strikeCount);
        }

        if (strikeCount == ZERO_COUNT) {
            return String.format(BALL, ballCount);
        }

        return String.format(BALL_AND_STRIKE, ballCount, strikeCount);
    }
}
```

계산된 Ball, Strike의 개수를 관리하기 위한 책임을 가진 `BaseballState`이다. 단순히 `ballCount`, `strikeCount`를 get으로 반환하여 내부 특성을 노출하지 않도록 노력하였다. 

즉 외부에서 해당 특성을 활용한 비즈니스 로직을 사용하지 않고 모두 BaseballState `내부에서 처리`하도록 구현하였다. ballCount와 strikeCount 라는 특성을 활용하여 게임 성공 여부와 메시지를 생성하는 메서드를 제공한다. 

### GameMachine: 게임을 성공적으로 진행할 책임

```java
public class GameMachine {
    private final BaseballReferee baseballReferee;
    private final InputView inputView;
    private final OutputView outputView;

    public GameMachine(BaseballReferee baseballReferee, InputView inputView, OutputView outputView) {
        this.baseballReferee = baseballReferee;
        this.inputView = inputView;
        this.outputView = outputView;
    }

    public void run() {
        BaseballNumbers baseballNumbers = new BaseballNumbers();
        while (true) {
            BaseballState state = baseballReferee.referee(baseballNumbers.getNumbers(), inputView.getInputNumbers());
            outputView.outputRefereeResult(state.getMessage());

            if (state.isSuccess()) {
                outputView.outputSuccess();
                restart();
                break;
            }
        }
    }

    private void restart() {
        if (inputView.isRestart()) {
            run();
        }
    }
}
```

게임을 진행할 책임을 가진 `GameMachine`이다. GameMachine은 다양한 객체에게 `메시지`를 보내며 `협력`을 이루고 있다. 한 예시로는 baseballState에게 ball, strike 계산을 위해 `referee` 라는 메시지를 전송하여 객체 간의 통신을 진행한다. 앞서 작성한 책임을 가지는 객체들이 모두 협력을 이루며 `하나의 숫자 야구 게임`을 이루는 중심축이 되었다.

게임 반복을 위해서는 `while`을 활용한 반복문을 사용하였다.

### OutputView: 출력을 담당하는 책임

```java
public class OutputView {
    private static final String END_MESSAGE = "3개의 숫자를 모두 맞히셨습니다! 게임 종료";

    public void outputRefereeResult(String message) {
        System.out.println(message);
    }

    public void outputSuccess() {
        System.out.println(END_MESSAGE);
    }
}
```

최초에는 GameMachine에서 출력까지 모든 부분을 담당하였다. 하지만 `GameMachine`에게 오직 실행을 위한 책임을 갖도록 하기 위해 출력을 위한 책임을 분리하였다.

## 테스트 코드 작성

![](https://user-images.githubusercontent.com/59357153/143803451-e479ae65-f562-4e2c-877e-9cd9aaa6a889.png)

`given-when-then` 패턴을 적용하여 단위 테스트를 진행하였다. 최대한 모든 코드를 커버할 수 있도록 꼼꼼하게 작성하려 노력했다. 

```java
class InputViewTest {

    private static InputStream generateStream(String input) {
        return new ByteArrayInputStream(input.getBytes());
    }

    @DisplayName("숫자를 입력하면 List를 반환한다.")
    @Test
    void inputNumbersThenToList() {
        // given
        System.setIn(generateStream("123"));
        InputView inputView = new InputView();

        // when
        List<Integer> numbers = inputView.getInputNumbers();

        // then
        assertThat(numbers).isInstanceOf(List.class);
    }

    @DisplayName("입력한 숫자의 길이가 4이상이면 IllegalArgumentException을 던진다.")
    @Test
    void sizeOverThrowIllegalArgumentException() {
        // given
        System.setIn(generateStream("1234"));
        InputView inputView = new InputView();

        // when & then
        assertThatThrownBy(() -> {
            inputView.getInputNumbers();
        }).isInstanceOf(IllegalArgumentException.class);
    }
    ...
}
```

테스트 메서드 이름은 전부 `CamelCase`를 활용 했지만 가독성 측면에서 좋지 못하였다. 해당 테스트의 의도를 정확히 전달하기 위해 `@DisplayName` 애노테이션을 활용하여 가독성이 떨어지는 이름을 보완하려 노력하였다. 

## Refernces

 * 조영호, 『오브젝트』, 위키북스(2019), p73-96.

### 코딩 컨벤션
 * [hackday-conventions-java](https://naver.github.io/hackday-conventions-java/)
 * [코딩 컨벤션 적용](https://hodol.dev/journal/coding-convention/)

### 일급 컬렉션
 * [일급 컬렉션을 사용하는 이유](https://tecoble.techcourse.co.kr/post/2020-05-08-First-Class-Collection/)
 * [일급 컬렉션의 소개와 써야할 이유](https://jojoldu.tistory.com/412)

### 테스트 코드
 * [System.in과 System.out에 대한 테스트](https://sakjung.tistory.com/33)
 * [[TDD] 단위 테스트(Unit Test) 작성의 필요성 (1/3)](https://mangkyu.tistory.com/143)
