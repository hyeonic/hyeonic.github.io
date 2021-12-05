---
title: 프리코스 2주차
tags: ['우아한테크코스', '프리코스']
---

# 프리코스 2주차

## 미션 - 자동차 경주 게임

우아한테크코스 4기 프리코스 2주차 미션을 진행하며 고민한 내용을 정리하고 추가적인 개인 목표를 세워 정리해보았다.

[미션 - 자동차 경주 게임](https://github.com/woowacourse/java-racingcar-precourse)

## 구현 기능 목록

아래는 1주차 공통 피드백에 담긴 내용들이다.

::: tip 기능 목록을 업데이트하라
README.md 파일에 작성하는 기능 목록은 기능 구현을 하면서 `변경될 수 있다`. 시작할 때 모든 기능 목록을 완벽하게 정리해야 한다는 부담감을 가지기보다 기능을 구현하면서 문서를 `계속 업데이트`한다. 죽은 문서가 아니라 `살아 있는 문서`를 만들기 위해 노력한다.
:::

::: tip 기능 목록을 재검토하라
기능 목록을 클래스 설계와 구현, 함수(메서드) 설계와 구현과 같이 너무 `상세하게 작성하지 않는다.` 클래스 이름, 함수(메서드) 시그니처와 반환값은 언제든지 변경될 수 있기 때문이다. 너무 세세한 부분까지 정리하기 보다 구현해야 할 기능 목록을 정리하는 데 집중한다. **정상적인 경우도 중요하지만, 예외적인 상황도 기능 목록에 정리**한다. 특히 예외 상황은 시작 단계에서 모두 찾기 힘들기 때문에 기능을 구현하면서 계속해서 추가해 나간다.
:::

위와 같은 사항들을 확인할 수 있었다. 피드백을 기반으로 `살아 있는 문서`를 만들기 위해 노력한다.

::: details ver 0.1 기능 목록
## 🛠 구현 기능 목록

초간단 자동차 경주 게임을 구현한다.

### 1. 자동차
 * [ ] 자동차는 이름을 가질 수 있다.
 * [ ] 자동차의 이름은 `5자 이하`만 가능하다.
 * [ ] 자동차는 전진 또는 멈출 수 있다.
 * [ ] 0에서 9 사이에 무작위 값을 구한 후 무작위 값이 4 이상일 경우 전진한다.
 
### 2. 입력
 * [ ] 경주할 자동차 이름을 입력 받는다.
    * [ ] 경주할 자동차 이름은 쉼표를 기준으로 나눈다.
    * [ ] 입력 받은 자동차 이름은 검증을 마친 후 List로 변환되어 전달한다.
 * [ ] 시도할 회수를 입력 받는다.
 
### 3. 게임 실행
 * [ ] 레이싱 게임을 실행할 수 있다.
 * [ ] 레이싱 게임은 반복되지 않는다.

### 4. 출력
 * [ ] 결과값 출력에 대한 전반적인 책임을 가진다.
 * [ ] `IllegalArgumentException`이 발생할 경우 `"[ERROR]"로 시작하는 에러 메시지 출력`을 진행한다.
:::

::: details ver 0.2 기능 목록
## 🛠 구현 기능 목록

초간단 자동차 경주 게임을 구현한다.

### 1. 자동차
 * [ ] 자동차는 이름을 가질 수 있다.
 * [ ] 자동차의 이름은 `5자 이하`만 가능하다.
 * [ ] 자동차는 전진 또는 멈출 수 있다.
 * [ ] 자동차는 이동 유무를 판단하는 `isMoving` 메서드를 가진 `MovingPolicy` 인터페이스를 가진다. ✚
    * [ ] 자동차의 전진 유무는 `MovingPolicy`의 `isMoving`을 통해 확인한다. ✚
    * [ ] `MovingPolicy`의 구현체인 `RandomMovingPolicy`을 활용하여 0에서 9 사이에 무작위 값을 구한 후 무작위 값이 4 이상일 경우 전진한다. ✚
 
### 2. 입력
 * [ ] 경주할 자동차 이름을 입력 받는다.
    * [ ] 경주할 자동차 이름은 쉼표를 기준으로 나눈다.
    * [ ] 입력 받은 자동차 이름은 검증을 마친 후 List로 변환되어 전달한다.
 * [ ] 시도할 회수를 입력 받는다.
 
### 3. 게임 실행
 * [ ] 레이싱 게임을 실행할 수 있다.
 * [ ] 레이싱 게임은 반복되지 않는다.

### 4. 출력
 * [ ] 결과값 출력에 대한 전반적인 책임을 가진다.
 * [ ] `IllegalArgumentException`이 발생할 경우 `"[ERROR]"로 시작하는 에러 메시지 출력`을 진행한다.
:::

::: details ver 0.3 기능 목록
## 🛠 구현 기능 목록

초간단 자동차 경주 게임을 구현한다.

### 1. 자동차
 * [ ] 자동차는 이름을 가질 수 있다.
 * [ ] 자동차의 이름은 `5자 이하`만 가능하다.
 * [ ] 자동차는 전진 또는 멈출 수 있다.
 * [ ] 자동차는 이동 유무를 판단하는 `isMoving` 메서드를 가진 `MovingPolicy` 인터페이스를 가진다.
    * [ ] 자동차의 전진 유무는 `MovingPolicy`의 `isMoving`을 통해 확인한다.
    * [ ] `MovingPolicy`의 구현체인 `RandomMovingPolicy`을 활용하여 0에서 9 사이에 무작위 값을 구한 후 무작위 값이 4 이상일 경우 전진한다.
 
### 2. 입력
 * [ ] 경주할 자동차 이름을 입력 받는다.
    * [ ] 경주할 자동차 이름은 쉼표를 기준으로 나눈다.
    * [ ] 입력 받은 자동차 이름은 검증을 마친 후 List로 변환되어 전달한다.
 * [ ] 시도할 회수를 입력 받는다.

### 3. 자동차 리스트
 * [ ] 자동차들을 관리하는 일급 컬렉션이다. ✚
 * [ ] 자동차들을 일괄적으로 움직이게할 수 있다. ✚
 * [ ] 각 차수별 실행 결과를 만들어 반환한다. ✚
 * [ ] 최종 우승자 안내 문구를 제공한다. ✚

### 4. 게임 실행
 * [ ] 레이싱 게임을 실행할 수 있다.
 * [ ] 레이싱 게임은 반복되지 않는다.

### 5. 출력
 * [ ] 결과값 출력에 대한 전반적인 책임을 가진다.
 * [ ] `IllegalArgumentException`이 발생할 경우 `"[ERROR]"로 시작하는 에러 메시지 출력`을 진행한다.
:::

::: details ver 0.4 기능 목록
## 🛠 구현 기능 목록

초간단 자동차 경주 게임을 구현한다.

### 1. 자동차
 * [ ] 자동차는 이름을 가질 수 있다.
 * [ ] 자동차의 이름은 `5자 이하`만 가능하다.
 * [ ] 자동차의 이름은 `공백`이거나 `비어있는 경우` 예외 처리를 진행한다. 아래는 예외 처리가 일어날 수 있는 이름의 예시이다. ✚
    * ` ` ✚
    * `null` ✚
 * [ ] 자동차는 전진 또는 멈출 수 있다.
 * [ ] 자동차는 이동 유무를 판단하는 `isMoving` 메서드를 가진 `MovingPolicy` 인터페이스를 가진다.
    * [ ] 자동차의 전진 유무는 `MovingPolicy`의 `isMoving`을 통해 확인한다.
    * [ ] `MovingPolicy`의 구현체인 `RandomMovingPolicy`을 활용하여 0에서 9 사이에 무작위 값을 구한 후 무작위 값이 4 이상일 경우 전진한다.
 
### 2. 입력
 * [ ] 경주할 자동차 이름을 입력 받는다.
    * [ ] 경주할 자동차 이름은 쉼표를 기준으로 나눈다.
    * [ ] 입력 받은 자동차 이름은 검증을 마친 후 List로 변환되어 전달한다.
 * [ ] 시도할 회수를 입력 받는다.
    * [ ] 시도할 회수가 숫자가 아니면 예외를 던진다. ✚

### 3. 자동차 리스트
 * [ ] 자동차들을 관리하는 일급 컬렉션이다. 
 * [ ] 자동차들을 일괄적으로 움직이게 한다.
 * [ ] 각 차수별 실행 결과를 만들어 반환한다. 
 * [ ] 최종 우승자 안내 문구를 제공한다.

### 4. 게임 실행
 * [ ] 레이싱 게임을 실행할 수 있다.
 * [ ] 레이싱 게임은 반복되지 않는다.
 * [ ] 예외 처리가 일어나면 해당 에러 메시지를 출력한 후 입력을 다시 받는다. ✚

### 5. 출력
 * [ ] 결과값 출력에 대한 전반적인 책임을 가진다.
 * [ ] `IllegalArgumentException`이 발생할 경우 `"[ERROR]"로 시작하는 에러 메시지 출력`을 진행한다.
:::

## 매직 넘버, 매직 리터럴

::: tip 매직 넘버를 사용하지 마라
매직 넘버는 의미를 나타낼 수 있는 상수(static final)로 치환하여 코드의 가독성을 높인다.
:::

1주차 공통 피드백에서 매직 넘버와 관련된 피드백을 확인할 수 있었다. 매직 넘버, 매직 리터럴이 의미하는 바는 무엇이고 이것을 통해 얻고자 하는 것이 무엇인지 정리하였다.

`매직 넘버(magic number)`, `매직 리터럴(magic literal)` 이란 소스 코드에서 의미를 가진 숫자나 문자를 그대로 표현한 것을 말한다. 

이러한 표현은 소스 코드를 읽기 어렵게 만든다. 상수로 선언되어 있지 않은 숫자, 문자열은 무엇을 의미하는지 확신할 수 없게 만든다. 이러한 의미를 파악하기 위해 해당 클래스와 흐름을 이해하기 위해 많은 시간을 요구한다. 

`상수(static final)`로 선언하게 되면 이러한 값들에게 `이름이 부여`된다. 이름을 통하여 `의미와 역할`을 확실히 전달할 수 있다.

아래는 [What is a magic number, and why is it bad?](https://stackoverflow.com/questions/47882/what-is-a-magic-number-and-why-is-it-bad)의 예제를 인용한 것이다.

아래 코드는 매직 넘버가 사용된 예시이다.
```java
public class Foo {
    public void setPassword(String password) {
         // don't do this
         if (password.length() > 7) {
              throw new InvalidArgumentException("password");
         }
    }
}
```

위 코드는 아래와 같이 리팩토링 되어야 한다.
```java
public class Foo {
    public static final int MAX_PASSWORD_SIZE = 7;

    public void setPassword(String password) {
         if (password.length() > MAX_PASSWORD_SIZE) {
              throw new InvalidArgumentException("password");
         }
    }
}
```

이러한 리팩토링은 코드의 `가독성이 향상`되고 `유지 관리`가 더 쉽게 만들 수 있다.

### 적용

실제 제출 코드의 일부분을 가져온 것이다. 숫자와 문자열 모두 의미를 정확하게 전달할 수 있도록 이름을 부여하였기 때문에 이전 보다 더 명확하게 의도를 전달할 수 있게 되었다.

```java
public class InputView {
    private static final String INPUT_NAMES_MESSAGE = "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)";
    private static final String INPUT_TRY_COUNT_MESSAGE = "시도할 회수는 몇회인가요?";
    private static final String SPLIT_REGEX = ",";
    private static final int SPLIT_LIMIT = -1;
    private static final int ZERO_NUMBER = 0;

    public List<String> getNames() {
        System.out.println(INPUT_NAMES_MESSAGE);
        String inputNames = Console.readLine();
        String[] names = inputNames.split(SPLIT_REGEX, SPLIT_LIMIT);
        return new ArrayList<>(Arrays.asList(names));
    }

    public int getTryCount() {
        System.out.println(INPUT_TRY_COUNT_MESSAGE);
        String inputTryCount = Console.readLine();
        validateNumberFormat(inputTryCount);

        int tryCount = Integer.parseInt(inputTryCount);
        validateNegativeNumber(tryCount);
        return tryCount;
    }
    ...
}
```

## 자동차의 이름과 위치를 관리하는 Car

### Strategy Pattern 도입 배경

::: tip
Strategy Pattern의 자세한 정리는 [Strategy Pattern](https://hyeonic.github.io/design%20pattern/behavior%20pattern/Strategy%20Pattern.html)에 작성하였다.
:::

기존 Car 객체 설계 당시 단순히 `내부`에서 랜덤한 값을 활용하여 `이동 여부를 처리`하였다.

```java
public class Car {
    private static final int DEFAULT_POSITION = 0;
    private static final int NAME_MAX_LENGTH = 5;
    private static final int MIN_NUMBER_RANGE = 0;
    private static final int MAX_NUMBER_RANGE = 9;
    private static final int MOVE_CONDITION = 4;

    private final String name;
    private int position = DEFAULT_POSITION;
    public Car(String name) {
        validateName(name);
        this.name = name;
    }
    private void validateName(String name) {
        validateLength(name);
    }
    private void validateLength(String name) {
        if (name.length() > NAME_MAX_LENGTH) {
            throw new IllegalArgumentException();
        }
    }

    public void move() {
        if (isMoving()) {
            position++;
        }
    }

    private boolean isMoving() {
        if (Randoms.pickNumberInRange(MIN_NUMBER_RANGE, MAX_NUMBER_RANGE) >= MOVE_CONDITION) {
            return true;
        }
        return false;
    }
} 
```

당장 구현에 문제는 없었지만 Car에 `많은 책임`을 가지고 있지 않은지에 대한 고민과 `단위 테스트 작성` 시 move 내부를 제어할 수 없기 때문에 정상적인 테스트를 작성하는데 제한이 되었다.

그때 Strategy Pattern에 대해 공부하게 되었다. `Strategy Pattern`은 `실행 중`에 `알고리즘을 선택`할 수 있게 도와준다.

`Car`에서 `isMoving`을 전략으로 활용하여 `실행 시점`에 `이동 여부를 반환`할 수 있도록 적용하면 좋을 것 같다는 판단을 세우게 되었다.

### Strategy Pattern 적용

#### MovingPolicy
```java
@FunctionalInterface
public interface MovingPolicy {
    boolean isMoving();
}
```

다양한 `이동 정책`을 적용하기 위한 함수형 인터페이스이다.

#### RandomMovingPolicy
```java
public class RandomMovingPolicy implements MovingPolicy {
    private static final int MIN_NUMBER_RANGE = 0;
    private static final int MAX_NUMBER_RANGE = 9;
    private static final int MOVE_CONDITION = 4;

    @Override
    public boolean isMoving() {
        if (Randoms.pickNumberInRange(MIN_NUMBER_RANGE, MAX_NUMBER_RANGE) >= MOVE_CONDITION) {
            return true;
        }
        return false;
    }
}
```

`MovingPolicy`의 구현체로 `RandomMovingPolicy`를 작성하였다. `RandomMovingPolicy`는 랜덤하게 수를 뽑아 이동 조건을 판단하여 이동 유무를 반환하는 `isMoving`메서드를 오버라이딩하였다.

#### 변경된 Car

```java
public class Car {
    private static final int DEFAULT_POSITION = 0;
    private static final int NAME_MAX_LENGTH = 5;

    private final String name;
    private final MovingPolicy movingPolicy;
    private int position = DEFAULT_POSITION;

    public Car(String name, MovingPolicy movingPolicy) {
        validateName(name);
        this.name = name;
        this.movingPolicy = movingPolicy;
    }

    private void validateName(String name) {
        validateLength(name);
    }
    private void validateLength(String name) {
        if (name.length() > NAME_MAX_LENGTH) {
            throw new IllegalArgumentException();
        }
    }

    public void move() {
        if (movingPolicy.isMoving()) {
            position++;
        }
    }
} 
```

`MovingPolicy`는 `Car` 생성 시점에 전략이 정해진다. 이제 MovingPolicy의 구현체를 다양하게 적용 가능하기 때문에 Car와 Car의 이동에 대한 `결합도`도 낮출 수 있는 결과를 만들었다.

또한 추후에 요구사항 변경에 의해 다른 이동 정책이 추가되면 단순히 `MovingPolicy`를 구현하면 되기 때문에 쉽게 `확장`이 가능하다.

### 유연한 테스트 작성

```java
class CarTest {
    ...
        @DisplayName("movingPolicy의 isMoving이 true이면 position이 1 증가한다.")
    @Test
    void move_IsMovingThenTrue_IncreasePosition() {
        // given
        MovingPolicy movingPolicy = () -> true;
        Car car = new Car("pobi", movingPolicy);

        // when
        car.move();

        // then
        assertThat(car.getPosition()).isEqualTo(1);
    }

    @DisplayName("movingPolicy의 isMoving이 false이면 position은 정지한다.")
    @Test
    void move_IsMovingThenFalse_StopPosition() {
        // given
        MovingPolicy movingPolicy = () -> false;
        Car car = new Car("pobi", movingPolicy);

        // when
        car.move();

        // then
        assertThat(car.getPosition()).isEqualTo(0);
    }
    ...
}
```

이제 ``Car``의 `move`를 자유롭게 테스트 가능하다. 테스트 시점에 이동 정책을 생성한 뒤 `move`를 진행하면 반환된 결과에 따라 Car의 `position`이 변하는 것을 확인하였다.

## 캡슐화

객체를 사용하면 변경 가능성이 높은 부분은 내부에 숨기고 외부에는 상대적으로 안정적인 부분만 공개함으로써 변경의 여파를 통제할 수 있다. `캡슐화`는 외부에서 알 필요가 없는 부분을 감춤으로써 대상을 단순화하는 추상화의 종류이다. `캡슐화`는 변경 가능성이 높은 부분을 객체 내부로 숨기는 추상화 기법이다.

아래는 캡슐화를 잘 지키는 것 처럼 보인다. 인스턴스 변수는 `private`를 사용 하였고 해당 변수에 접근하기 위한 `public get/set 메서드`를 가지고 있다.
```java
public class Car {
    private final String name;
    private int positon = 0;

    public Car(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    } 

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }
}
```

하지만 `get/set 메서드`들은 객체 내부를 전혀 캡슐화 하지 못하고 있다. 오히려 보호해야할 내부의 `상태 정보를 그대로 보여주고 있다.`

객체는 `스스로의 상태를 책임`져야 하며 외부에서는 `인터페이스에 정의된 메서드`를 통해서만 상태에 접근할 수 있어야 한다.

### Car 리스트를 가지는 일급 컬렉션 Cars

레이싱 게임에서 여러 개의 Car list 관리를 위해 `일급 컬렉션` `Cars`를 사용하였다. Cars에서는 Car의 `내부 상태인 position`을 활용하여 `우승자를 선정`하고 `name을 조회`해야 했다. 이것을 구현하기 위해서는 Car의 내부 상태를 드러내는 `get 메서드`가 불가피하게 사용된다.

```java
public class Cars {
    private static final String NEW_LINE = "\n";
    private static final String WINNER_NAMES_DELIMITER = ", ";
    private static final int DEFAULT_MAX_POSITION = 0;

    private final List<Car> cars;

    public Cars(List<String> names, MovingPolicy movingPolicy) {
        this.cars = names.stream()
            .map(name -> new Car(name, movingPolicy))
            .collect(toList());
    }

    public void move() {
        cars.forEach(Car::move);
    }

    public String getExecutionResult() {
        return cars.stream()
            .map(Car::getStateMessage)
            .collect(joining(NEW_LINE));
    }

    public String getWinnersNames() {
        int maxPosition = getMaxPosition();
        return cars.stream()
            .filter(car -> car.isSamePosition(maxPosition))
            .map(Car::getName) // 불가피한 get 사용
            .collect(joining(WINNER_NAMES_DELIMITER));
    }

    private int getMaxPosition() {
        return cars.stream()
            .map(Car::getPosition) // 불가피한 get 사용
            .reduce(DEFAULT_MAX_POSITION, Integer::max);
    }
}
```

결국 이것은 Cars와 Car의 `결합도를 강하게 만드는 원인`이 아닌가 고민하게 되었다. 그렇다고 해당 로직은 Car로 옮기기에는 억지로 책임을 부여하는 듯한 기분이 들었다. 

### protected

`protected`는 상속, 같은 패키지 내의 클래스에 접근 가능하도록 하는 접근 제어자 이다. 즉 Cars와 Car를 `같은 패키지`에만 위치 시키면 다른 `외부 패키지`는 Car의 get 메서드에 접근할 수 없다. Cars에서만 사용을 제한시키면 어느정도 `캡슐화로 내부 상태를 지킬 수 있다`는 판단을 하게 되었다.

Car의 메서드는 protected로 접근 제어자를 활용하였다.

```java
public class Car {
    private static final int DEFAULT_POSITION = 0;
    private static final char NAME_BLANK = ' ';
    private static final int NAME_MAX_LENGTH = 5;
    private static final String NAME_MESSAGE = "%s : ";
    private static final int ZERO_INDEX = 0;
    private static final String MOVING_STICK = "-";

    private final String name;
    private final MovingPolicy movingPolicy;
    private int position = DEFAULT_POSITION;

    public Car(String name, MovingPolicy movingPolicy) {
        validateName(name);
        this.name = name;
        this.movingPolicy = movingPolicy;
    }

    private void validateName(String name) {
        validateEmpty(name);
        validateBlank(name);
        validateLength(name);
    }

    private void validateEmpty(String name) {
        if (name.isEmpty()) {
            throw new IllegalArgumentException(CAR_NAME_NOT_VALID.getMessage());
        }
    }

    private void validateBlank(String name) {
        for (char c : name.toCharArray()) {
            if (c != NAME_BLANK) {
                return;
            }
        }
        throw new IllegalArgumentException(CAR_NAME_NOT_VALID.getMessage());
    }

    private void validateLength(String name) {
        if (name.length() > NAME_MAX_LENGTH) {
            throw new IllegalArgumentException(CAR_NAME_NOT_VALID.getMessage());
        }
    }
    
    protected void move() {
        if (movingPolicy.isMoving()) {
            position++;
        }
    }

    protected String getStateMessage() {
        StringBuilder stringBuilder = new StringBuilder(String.format(NAME_MESSAGE, name));
        for (int i = ZERO_INDEX; i < position; i++) {
            stringBuilder.append(MOVING_STICK);
        }
        return stringBuilder.toString();
    }

    protected String getName() {
        return name;
    }

    protected int getPosition() {
        return position;
    }

    protected boolean isSamePosition(int maxPosition) {
        if (this.position == maxPosition) {
            return true;
        }
        return false;
    }
}
```

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/144700758-6ac9667f-055f-4585-9084-c5aa4411e8d1.png>
</p>

이러한 패키지 구조를 갖기 때문에 외부 다른 패키지에서는 Car의 `protected` 메서드에 접근하지 못한다.

## String의 split 메서드

기능 요구 사항을 살펴보면 자동차 이름은 쉼표(,)를 기준으로 구분하여 사용한다. Java에서 구분자를 통한 문자열을 나누기 위해서는 흔히 `split` 메서드를 활용한다.

### split

```java
public final class String
    implements java.io.Serializable, Comparable<String>, CharSequence {
    ...

    public String[] split(String regex, int limit) {
        ...
    }

    public String[] split(String regex) {
        return split(regex, 0);
    }
    ...
}
```

위는 String 클래스의 일부분을 가져온 것이다. split 메서드의 경우 서로 다른 매개변수 리스트를 가진 메서드로 오버로딩 되어 있다. 흔히 사용하는 `spit(String regex)`은 `limit`가 `0`으로 설정되어 반환한다.

limit 매개변수는 패턴이 적용되는 횟수를 제어한다. n이 0보다 크면 패턴이 최대 n - 1회 적용되고 배열의 길이는 n보다 크지 않으면 배열의 마지막 항목에는 마지막 일치 구분 기호 이후의 모든 문자열이 포함된다. `n이 양수가 아닌 경우 패턴이 최대한 많이 적용되고 배열은 임의의 길이를 가질 수 있다.` n이 0이면 패턴은 가능한 많이 적용되고 배열은 임의의 길이를 가질 수 있으며 후행 빈 문자열은 폐기된다.

여기서 limit에 음수 값을 넣어 나눌 경우 패턴이 최대한 많이 적용되며 빈문자열이 폐기되지 않고 나눠진다. 아래는 0을 넣었을 때와 음수를 넣었을 때의 차이를 비교한 것이다.

```java
List<String> list = new ArrayList<>();
list.add("a,b,c,d,e");
list.add("a,b,c,d,e,");
list.add("a,  ,b");
list.add(", , , , ");
list.add(",,,,");
list.add("a");

for (String s : list) {
    System.out.println("나눌 문자열: " + s);
    System.out.println("limt이  0일 때: " + Arrays.toString(s.split(",")));
    System.out.println("limt이 -1일 때: " + Arrays.toString(s.split(",", -1)));
    System.out.println();
}
```

```bash
나눌 문자열: a,b,c,d,e
limt이  0일 때: [a, b, c, d, e]
limt이 -1일 때: [a, b, c, d, e]

나눌 문자열: a,b,c,d,e,
limt이  0일 때: [a, b, c, d, e]
limt이 -1일 때: [a, b, c, d, e, ]

나눌 문자열: a,  ,b
limt이  0일 때: [a,   , b]
limt이 -1일 때: [a,   , b]

나눌 문자열: , , , , 
limt이  0일 때: [,  ,  ,  ,  ]
limt이 -1일 때: [,  ,  ,  ,  ]

나눌 문자열: ,,,,
limt이  0일 때: []
limt이 -1일 때: [, , , , ]

나눌 문자열: a
limt이  0일 때: [a]
limt이 -1일 때: [a]
```

가장 큰 차이를 보이는 것은 `a,b,c,d,e,`와 `,,,,`이다. limit이 0일 때는 빈 문자열이 자동으로 폐기되는 것을 확인할 수 있었다.

이번 레이싱 게임을 진행하며 자동차의 `이름에 대한 검증`은 모두 `Car`가 책임을 가지도록 하였다. 하지만 자동차의 이름을 `split`하는 것은 `InputView`의 책임으로 설정하였다. 즉 `빈 문자열`이라도 `정확히 나눠서` list로 전달해야 했다. 그래야 온전히 나눠진 문자열 리스트의 요소를 Car에서 검증이 가능하기 때문이다.

### InputView

`InputView`는 레이싱 게임의 모든 입력을 위한 책임을 가지고 있다. 앞서 언급한 것 처럼 빈 문자열까지 정확히 나누기 위해 아래와 같이 작성하였다.

```java
public class InputView {
    private static final String INPUT_NAMES_MESSAGE = "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)";
    ...
    private static final String SPLIT_REGEX = ",";
    private static final int SPLIT_LIMIT = -1;
    ...

    public List<String> getNames() {
        System.out.println(INPUT_NAMES_MESSAGE);
        String inputNames = Console.readLine();
        String[] names = inputNames.split(SPLIT_REGEX, SPLIT_LIMIT);
        return new ArrayList<>(Arrays.asList(names));
    }
    ...
}
```

`String[] names = inputNames.split(SPLIT_REGEX, SPLIT_LIMIT)`을 활용하여 쉼표(,)를 기준으로 빈 문자열을 포함하여 문자열 리스트를 만들어 반환한다. 이것에 대한 검증은 단위 테스트를 활용하여 검증하였다.

```java
class InputViewTest {
    ...
    static Stream<Arguments> getNamesMethodSourceProvider() {
        return Stream.of(
            arguments("pobi,woni,jun", 3),
            arguments(",,,,", 5),
            arguments(",pobi,", 3),
            arguments(" , ,, , ", 5),
            arguments("pobi", 1)
        );
    }

    @DisplayName("경주할 자동차 이름을 입력 받으면 쉼표를 기준으로 나눠 리스트를 반환한다.")
    @ParameterizedTest
    @MethodSource("getNamesMethodSourceProvider")
    void getNames_InputNames_ListReturn(String inputNames, int size) {
        // given
        System.setIn(generateStream(inputNames));
        InputView inputView = generateInputView();

        // when
        List<String> names = inputView.getNames();

        // then
        System.out.println(names);
        assertThat(names).isInstanceOf(List.class);
        assertThat(names.size()).isEqualTo(size);
    }
    ...
}
```

## References

### 매직 넘버, 매직 리터럴
[magic number 사용을 최대한 자제하자.](https://slipp.net/questions/356)<br>
[What is a magic number, and why is it bad?](https://stackoverflow.com/questions/47882/what-is-a-magic-number-and-why-is-it-bad)<br>
[1. 의미가 불분명한 매직 넘버를 상수로 선언하라.](https://javabom.tistory.com/28)

### 캡슐화
조영호, 『오브젝트』, 위키북스(2019), p113-132. <br>

### String split
[Class String](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#split-java.lang.String-int-)<br>

<TagLinks />