---
title: 형식 맞추기
tags: ['clean code']
---

# 형식 맞추기

::: tip 
예시 코드는 [java-racingcar-precourse](https://github.com/hyeonic/java-racingcar-precourse/tree/hyeonic)에서 확인할 수 있습니다.
:::

프로그래머라면 형식을 깔끔하게 맞춰 코드를 작성해야 한다. 코드 형식을 맞취기 위한 간단한 규칙을 정하고 그 규칙을 착실히 따라야 한다. 

## 형식을 맞추는 목적

코드 형식은 의사소통의 일환이다. 오늘 구현한 기능이 다음 버전에서 바꿜 확률은 아주 높다. 오늘 구현한 코드의 가독성은 앞으로 바꿜 코드의 품질에 지대한 영향을 미친다. 

## 적절한 행 길이를 유지하라

일반적으로 큰 파일보다 작은 파일이 이해하기 쉽다.

### 신문 기사처럼 작성하라

독자는 위에서 아래로 기사을 읽는다. 소스 파일도 신문 기사와 비슷하게 작성한다. 이름은 간단하면서 설명이 가능하게 짓는다. 아래로 내려갈수록 의도를 세세하게 묘사한다. 마지막에는 가장 저차원 함수와 세부 내역이 나온다.

### 개념은 빈 행으로 분리한다

```java
package racingcar.car;

import static java.util.stream.Collectors.*;

import java.util.List;

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
            .map(Car::getName)
            .collect(joining(WINNER_NAMES_DELIMITER));
    }

    private int getMaxPosition() {
        return cars.stream()
            .map(Car::getPosition)
            .reduce(DEFAULT_MAX_POSITION, Integer::max);
    }
} 
```

위 코드를 보면 패키지 선언부, import 문, 각 메서드 사이에 빈 행이 들어간다. 빈 행은 새로운 개념을 시작한다는 시각적 단서다. 만약 이러한 빈 행을 생략하면 코드의 가독성은 현저하게 떨어진다.

```java
package racingcar.car;
import static java.util.stream.Collectors.*;
import java.util.List;
public class Cars {
    private static final String NEW_LINE = "\n";
    private static final String WINNER_NAMES_DELIMITER = ", ";
    private static final int DEFAULT_MAX_POSITION = 0;
    private final List<Car> cars;
    public Cars(List<String> names, MovingPolicy movingPolicy) {
        this.cars = names.stream()
            .map(name -> new Car(name, movingPolicy))
            .collect(toList());}
    public void move() {
        cars.forEach(Car::move);}
    public String getExecutionResult() {
        return cars.stream()
            .map(Car::getStateMessage)
            .collect(joining(NEW_LINE));}
    public String getWinnersNames() {
        int maxPosition = getMaxPosition();
        return cars.stream()
            .filter(car -> car.isSamePosition(maxPosition))
            .map(Car::getName)
            .collect(joining(WINNER_NAMES_DELIMITER));}
    private int getMaxPosition() {
        return cars.stream()
            .map(Car::getPosition)
            .reduce(DEFAULT_MAX_POSITION, Integer::max);}
} 
```

### 세로 밀집도

세로 밀집도는 연관성을 의미한다. 서로 밀집한 코드 행은 세로로 가까이 놓여야 한다. 아래 예시는 의미없는 주석으로 두 인스턴스 변수를 떨어뜨려 놓는다.

```java
public class Car {
    private static final int DEFAULT_POSITION = 0;
    ...

    /*
     * Car 클래스 이름
     */
    private final String name;
    
    /*
     * Car의 이동 정책
     */
    private final MovingPolicy movingPolicy;
    
    /*
     * Car의 위치
     */
    private int position = DEFAULT_POSITION;
    ...
}
```

아래 코드가 훨씬 더 읽기 쉽다. 코드가 한 눈에 들어온다. 같은 코드지만 더 많은 범위를 읽어야 한다.

```java
public class Car {
    private static final int DEFAULT_POSITION = 0;
    ...

    private final String name;
    private final MovingPolicy movingPolicy;
    private int position = DEFAULT_POSITION;
    ...
}
```

### 수직 거리

서로 밀접한 개념은 세로로 가까이 둬야 한다. 같은 파일에 속할 정도로 밀접한 두 개념은 세로 거리로 연관성을 표현한다. 여기서 연관성이란 한 개념을 이해하는 데 다른 개념이 중요한 정도다. 연관성이 깊은 두 개념이 멀리 떨어져 있으면 코드를 읽는 사람이 소스 파일과 클래스를 여기저기 뒤지게 된다.

변수(`StringBuilder stringBuilder`)는 사용하는 위치에 최대한 가까이 선언한다. 또한 반복을 제어하는 변수(`int i`)는 반복문 내부에 선언해야 한다.

```java
public class Car {
    ...

    protected String getStateMessage() {
        StringBuilder stringBuilder = new StringBuilder(String.format(NAME_MESSAGE, name));
        for (int i = ZERO_INDEX; i < position; i++) {
            stringBuilder.append(MOVING_STICK);
        }
        return stringBuilder.toString();
    }
}
```

인스턴스 변수는 클래스 맨 처음에 선언한다. 변수 간에 세로로 거리를 두지 않는다. 잘 설계한 클래스는 대다수의 클래스 메서드가 인스턴스 변수를 사용하기 때문이다.

```java
public class GameMachine {
    private static final int ZERO_INDEX = 0;

    private final MovingPolicy movingPolicy;
    private final InputView inputView;
    private final OutputView outputView;
    ...
}
```

한 함수가 다른 함수를 호출한다면 두 함수는 세로로 가까이 배치한다. 또한 가능하다면 호출하는 함수를 호출되는 함수보다 먼저 배치한다.

```java
public class Cars {
    ...

    public String getWinnersNames() {
        int maxPosition = getMaxPosition();
        return cars.stream()
            .filter(car -> car.isSamePosition(maxPosition))
            .map(Car::getName)
            .collect(joining(WINNER_NAMES_DELIMITER));
    }

    private int getMaxPosition() {
        return cars.stream()
            .map(Car::getPosition)
            .reduce(DEFAULT_MAX_POSITION, Integer::max);
    }
}
```

어떤 코드는 서로 끌어당긴다. 개념적인 친화도가 높기 때문이다. 친화도가 높을수록 코드를 가까이 배치한다. 아래는 JUnit5 `org.junit.jupiter.api.Assertions`이다.

```java
public class Assertions {
    ...
	public static void assertTrue(boolean condition) {
		AssertTrue.assertTrue(condition);
	}

	public static void assertTrue(boolean condition, Supplier<String> messageSupplier) {
		AssertTrue.assertTrue(condition, messageSupplier);
	}

	public static void assertTrue(BooleanSupplier booleanSupplier) {
		AssertTrue.assertTrue(booleanSupplier);
	}

	public static void assertTrue(BooleanSupplier booleanSupplier, String message) {
		AssertTrue.assertTrue(booleanSupplier, message);
	}
    ...
}
```

### 세로 순서

일반적으로 함수 호출 종속성은 아래 방향으로 유지한다. 호출되는 함수를 호출하는 함수보다 나중에 배치한다. 이렇게 배치할 경우 소스 코드 모듈이 고차원에서 저차원으로 자연스럽게 내려간다.

## 가로 형식 맞추기

짧은 행이 바람직하다. 책에서는 120자 정도로 행 길이를 제한할 것을 추천한다.

### 가로 공백과 밀집도

가로로는 공백을 사용해 밀접한 개념과 느슨한 개념을 표현한다.

```java
public void run() {
    Cars cars = getCars();
    int tryCount = getTryCount();
    System.out.println();

    repeat(cars, tryCount);
}
```

위 메서드를 살퍄보면 할당 연산자를 강조하기 위해 앞뒤에 공백을 넣었다. `=`를 기준으로 왼쪽 요소와 오른쪽 요소가 분명히 나뉜다. 

반면, 메서드 이름과 이어지는 괄호 사이에는 공백을 넣지 않는다. 함수와 인자는 서로 밀접하기 때문이다.

메서드를 호출하는 코드에서 괄호 안 인수는 공백으로 분리한다. 쉼표를 강조해 인수가 별개라는 사실을 보여준다.

```java
public static void main(String[] args) {
    GameMachine gameMachine = new GameMachine(new RandomMovingPolicy(), new InputView(), new OutputView());
    gameMachine.run();
}
```

승수 사이에는 공백이 없다. 곱셈은 우선순위가 가장 높기 때문이다. 항 사이에는 공백이 들어간다. 덧셈과 뺄셈은 운선순위가 곱셈보다 낮기 때문이다.

```java
a*a - 4*a*c
```

::: warning
코드 형식을 자동으로 맞춰주는 도구는 대다수가 연산자 우선순위를 고려하지 못한다.
:::

### 가로 정렬

선언문과 할당문을 별도로 정렬하지 않는다. 

```java
public class GameMachine {
    private final MovingPolicy movingPolicy;
    private final InputView inputView;
    private final OutputView outputView;

    public GameMachine(MovingPolicy movingPolicy, InputView inputView, OutputView outputView) {
        this.movingPolicy = movingPolicy;
        this.inputView = inputView;
        this.outputView = outputView;
    }
    ...
}
```

### 들여 쓰기

소스 파일은 윤곽도와 계층이 비슷하다. 범위로 이뤄진 계층을 표현하기 위해 코드를 들여쓴다. 들여쓰는 정도는 계층에서 코드가 자리잡은 수준에 비례한다. 클래스 내 메서드는 클래스보다 한 수준 들여쓴다. 메서드 코드는 메서드 선언보다 한 수준 들여쓴다. 블록 코드는 블록을 포함하는 코드보다 한 수준 들여쓴다.

#### 들여 쓰기 전
```java
public class RandomMovingPolicy implements MovingPolicy {
    private static final int MIN_NUMBER_RANGE = 0;
    private static final int MAX_NUMBER_RANGE = 9;
    private static final int MOVE_CONDITION = 4;
    @Override public boolean isMoving() { if (Randoms.pickNumberInRange(MIN_NUMBER_RANGE, MAX_NUMBER_RANGE) >= MOVE_CONDITION) { return true; } return false; }
}
```

#### 들여 쓰기 후
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

위 두 코드는 동일하다. 들여 쓰기는 파일의 구조가 한 눈에 들어온다.

간혹 간단한 if, while, 메서드는 들여쓰기 규칙을 무시하고픈 유혹이 생긴다. 이것 또한 가독성을 망치는 지름길이다.

## 팀 규칙

팀은 한 가지 규칙에 함의해야 한다. 모든 팀원은 그 규칙을 따라야 한다. 그래야 소프트웨어가 일괄적인 스타일을 유지할 수 있다. 

좋은 소프트웨어 시스템은 읽기 쉬운 문서로 이뤄진다는 사실을 기억하기 바란다. 스타일은 일관적이고 매끄러워야 한다. 한 소스 파일에서 봤던 형식이 다른 소스 파일에도 쓰이리라는 신뢰감을 독자에게 줘야 한다. 온갖 스타일을 뒤섞어 소스 코드를 필요 이상으로 복잡하게 만드는 실수는 피해야 한다.

## 정리

책을 접하기 이전에는 단순히 읽기 좋게 혹은 짧게 작성하는 것을 선호하였다. 다양한 예시를 기반으로 들여쓰기와 배치 순서 등을 보며 개선해야 할 점들을 확인할 수 있었다.

무엇보다 가장 중요한 것은 `동일한 코드 스타일을 유지`하는 것이다. 여러 사람이 함께 작업을 진행하기 때문에 모두 같은 코드 스타일을 유지하도록 노력해야 한다. 추후 협업을 진행할 때 책에서 강조한 내용을 기반으로 빠른 변경에 대응할 수 있는 일관된 코드를 작성할 수 있도록 노력해야 겠다.

## References

로버트 C.마틴, 『클린코드 애자일 소프트웨어 장신 정신』, 박재호 이해형 옮김, 인사이트(2013),p95-116

<TagLinks />