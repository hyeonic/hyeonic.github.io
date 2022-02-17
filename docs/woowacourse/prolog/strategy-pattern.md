---
title: 전략 패턴 활용 하기
tags: ['우아한테크코스', 'prolog']
date: 2022-02-16 23:00:00
feed:
  enable: true
---

# 전략 패턴 활용 하기

## 목표

우아한테크코스에서 진행한 미션의 리뷰와 피드백에 대해 정리한다. 실제 리뷰는 [[1단계 - 자동차 경주 구현] 매트(최기현) 미션 제출합니다.](https://github.com/woowacourse/java-racingcar/pull/275)에서 확인할 수 있다.

## 전략 패턴이란?

`전략 패턴(Strategy Pattern)`은 실행 중인 알고리즘을 선택할 수 있게 하는 `행동 패턴(behavior pattern)`이다. 전략 패턴을 구성하는 세 요소는 아래와 같다.

 * 전략 메서드를 가진 `전략 객체`
 * 전략 객체를 사용하는 `컨텍스트(전략 객체의 사용자)`
 * 전략 객체를 생성해 컨텍스트에 주입하는 `클라이언트(제 3자, 전략 객체의 공급자)`

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/139800470-153c7224-03b2-4719-b71a-12d509a6fe0f.png />

클라이언트는 다양한 전략 중 하나를 선택하여 생성한 뒤 컨텍스트에 주입한다.

## 예시

자동차 경주를 진행한다고 가정한다. 자동차는 `외부`에서 `이동 여부`가 주어진 경우 해당 여부에 따라 위치를 이동한다.

### Strategy

다양한 전략을 공통 방식으로 사용하기 위한 인터페이스이다. 아래 인터페이스를 기반으로 다양한 전략을 구현할 수 있다.

#### MovingStrategy

```java
public interface MovingStrategy {
    boolean isMovable();
}
```

#### RandomMovingStrategy

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

### Context

이제 전략인 `MovingStrategy`를 사용하는 자동차를 구현한다. 자동차는 전략 패턴의 구성요소 중 `컨텍스트`를 의미한다.

#### Car

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

    public String getName() {
        return name.getName();
    }

    public int getPosition() {
        return position;
    }
}
```

Car 객체는 생성하는 시점에 외부에서 전략을 주입 받아 사용할 수 있다.

### Client

이제 `전략(MovingStrategy)`를 생성하여 `컨텍스트(Car)`에게 `주입`해줄 제 3자인 `클라이언트`를 구현한다.

#### RacingCarController

```java
public class RacingCarController {
    ...
    private Cars getCars() {
        try {
            return new Cars(inputView.getCarNames(), new RandomMovingPolicy());
        } catch (IllegalArgumentException e) {
            outputView.printErrorMessage(e.getMessage());
            return getCars();
        }
    }
    ...
}
```

#### Cars

```java
public class Cars {
    ...
    public Cars(String[] names, MovingPolicy movingPolicy) {
        List<Car> cars = Arrays.stream(names)
            .map(name -> new Car(name, movingPolicy))
            .collect(toList());
        validateDuplicate(names);
        this.cars = cars;
    }
    ...
}
```

RacingCarController에서 생성된 전략은 Cars 일급 컬렉션으로 전달되어 Car 리스트가 생성되는 시점에 주입된다.

## 전략 패턴의 장점

`Car 객체를 생성하는 시점`에 `전략`을 정할 수 있어서 `유연`하게 이동과 관련된 `단위 테스트`를 진행할 수 있다. 후에 이동에 대한 다른 요구사항이 추가된다면 구현체를 추가하고 `교체하는 행위`로 쉽게 변경이 가능할 것으로 판단된다.

### 유연한 단위 테스트

```java
public class CarTest {
    ...
    @DisplayName("이동 전략이 true이면 이동한다.")
    @Test
    void move_이동() {
        // given
        String input = "잉";
        MovingStrategy movingStrategy = () -> true;

        // when
        Car car = new Car(input, movingStrategy);
        car.move();

        // then
        assertThat(car.getPosition()).isEqualTo(1);
    }

    @DisplayName("이동 전략이 false이면 정지한다.")
    @Test
    void move_이동실패() {
        // given
        String input = "잉";
        MovingStrategy movingStrategy = () -> false;

        // when
        Car car = new Car(input, movingStrategy);
        car.move();

        // then
        assertThat(car.getPosition()).isEqualTo(0);
    }
}
```

## 전략이 주입되는 시기에 따른 특징

하지만 생각해보면 Car의 `move 메서드`를 움직이는 시점에 해당 전략을 주입할 수도 있을 것이다. 두 상황에 대해 어떠한 특징을 가지고 있을까?

### 1. 생성자를 통한 전략 패턴

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

    public String getName() {
        return name.getName();
    }

    public int getPosition() {
        return position;
    }
}
```

위 코드를 살펴보면 `Car 객체를 생성하는 시점`에 객체 내부의 인스턴스 변수에 전략이 정해진다. 즉 추가적인 인스턴스 변수가 필요하고, `별도의 setter나 수정 관련 메서드`가 없다면 생성된 Car의 이동 전략은 변경되지 않을 것이다.

### 2. move() 실행 시점에 전달된 전략 패턴

```java
public class Car {
    private final CarName name;
    private int position;

    public Car(String name) {
        this.name = new CarName(name);
        this.position = 0;
    }

    public void move(MovingStrategy movingStrategy) {
        if (movingStrategy.isMovable()) {
            position++;
        }
    }a

    public String getName() {
        return name.getName();
    }

    public int getPosition() {
        return position;
    }
}
```

위 코드는 전략을 가진 `MovingStrategy`를 `move() 메서드 실행 시점`에 전달되고 있다. 기존에 존재하던 인스턴스 변수는 유지할 필요 없어졌고, 이동할 때마다 전략을 변경할 수 있게 되었다. 하지만 `move()` 실행 시 외부에서 매번 전략을 전달해야 한다.

## 정리

충분한 근거와 함께 필요에 맞게 사용하면 문제는 없다! 요구사항에 맞춰 충분히 고민한 뒤 판단하여 적용하면 된다.

또한 List로 여러 개의 전략을 가지고 선택하는 방식으로도 구현이 가능하다.

```java
public class Car {
    private final List<MovingStrategy> movingStrategies;
    ...
}
```

## References

<TagLinks />