---
title: Chapter06 DI (Dependency Injection)와 서비스 로케이터
tags: ['우아한테크코스', '개발자가 반드시 정복해야 할 객체지향과 디자인 패턴']
date: 2022-03-27 01:40:00
feed:
  enable: true
---

# Chapter06 DI (Dependency Injection)와 서비스 로케이터

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/152970395-a31c8134-fc89-449f-b4dc-441e03df929c.png />

## 목표

개발자가 반드시 정복해야 할 객체 지향과 디자인 패턴 스터디를 진행하며 공부한 내용을 정리한다.

## 1. 애플리케이션 영역과 메인 영역

순환 의존이 발생하는 경우 한 패키지의 변경이 다른 패키지에 영향을 줄 가능성이 높아지기 때문에, 순환 의존은 발생시키지 않는 것이 향후 유지 보수에 유리하다.

#### 메인 영역
 * 애플리케이션 영역에서 사용될 객체를 생성한다.
 * 각 객체 간의 의존 관계를 설정한다.
 * 애플리케이션을 실행한다.

Main 클래스의 main 메서드는 애플리케이션을 실행하는데 필요한 저수준 모듈 객체를 먼저 생성하고 상위 수준 모듈을 설정한다. 

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/160247763-1cebcdea-c42d-479f-a0e3-11f3d5c1fa78.png />

메인 영역은 애플리케이션 영역의 객체를 생성하고, 설정하고, 실행하는 책임을 갖기 때문에 애플리케이션 영역에 사용할 하위 수준의 모듈을 변경하고 싶다면 메인 영역을 수정하게 된다.

위 그림에서 알 수 있듯이 모든 의존은 메인 영역에서 애플리케이션 영역으로 향한다. 즉 애플리케이션에서 메인 영역으로의 의존은 존재하지 않는다. 이것이 의미하는 것은 메인 영역을 변경해도 애플리케이션 영역은 변경되지 않는 다는 것을 의미한다. 정리하면 애플리케이션 영역에서 사용할 객체를 교체하기 위해 메인 영역의 코드를 수정하는 것은 애플리케이션 영역에는 어떠한 영향도 끼치지 않는다.

사용할 객체를 제공하는 책임을 갖는 객체를 `서비스 로케이터(Service Locator)`라고 부른다. 서비스 로케이터 방식은 로케이터를 통해 필요한 객체를 직접 찾는 방식이다. 

## 2. DI(Depedency Injection)을 이용한 의존 객체 사용

사용할 객체를 직접 생성할 경우 클래스에 대한 의존이 발생한다.

```java
public class Car {

    private final MovingStrategy movingStrategy;

    public Car() {
        this.movingStrategy = new MovingStrategy(); // DIP 위반
    }
    ...
}
```

이것은 변경에 유연하지 못한 코드를 만들게 된다.

이러한 단점을 보완하기 위해 `DI (Dependecy Injection)`이다. DI는 필요한 객체를 직접 생성하는 것이 아니라 외부에서 `주입`하는 방식이다. 아래는 생성자를 통해 의존 객체를 주입한 것이다.

```java
public class Car {

    private final MovingStrategy movingStrategy;

    public Car(MovingStrategy movingStrategy) {
        this.movingStrategy = movingStrategy;
    }
    ...
}
```

여기서 핵심은 객체가 스스로 의존하는 객체를 찾는 것이 아니라 생성자를 통해 사용할 객체를 주입받는 것이다. 외부에서 의존하는 객체를 넣어주기 때문에 `의존 주입 방식`이라고 부른다.

의존 객체를 생성하여 주입하기 위한 조립기를 별도로 분리가 가능하다. 이러한 조립기는 구현 변경의 유연함을 얻을 수 있다.

```java
public class Assembler {

    private final MovingStrategy movingStrategy;

    public void createAndWire() {
        this.movingStrategy = new RandomMovingStrategy();
    }

    public MovingStrategy getMovingStrategy() {
        return movingStrategy;
    }
}
```

이제 `Main`은 `Assembler`에게 객체 생성과 조립 책임을 위임한 뒤 필요한 객체를 구하는 방식으로 변경된다.

```java
public class Main {

    public static void main(String[] args) {
        Assembler assembler = new Assembler();
        assembler.createAndWire();

        MovingStrategy movingStrategy = assembler.getMovingStrategy();
        Car car = new Car(movingStrategy);
    }
}
```

스프링 프레임워크가 바로 객체를 생성하고 조립해 주는 기능을 제공하는 `DI 프레임워크`이다.

### 2.1 생성자 방식과 설정 메서드 방식

DI 적용을 의해 의존 객체를 전달받는 방법은 크게 두 가지이다.

 * `생성자를 활용한 방식`: 생성자를 통해 전달받는 객체는 필드에 보관한 뒤 메서드에서 사용한다. 
 * `메서드를 활용한 방식`: 메서드를 통해 전달받는 의존 객체를 필드에 보관하여 사용한다.

생성자를 통한 방식은 객체를 생성하는 시점에 모든 의존 객체를 준비할 수 있다. 즉 `객체를 생성하는 시점`에 의존 객체가 정상인지 확인할 수 있다.

### 2.2 DI와 테스트

DI 패턴을 따르면 생성자나 설정 메서드를 통해 Mock 객체를 쉽게 전달할 수 있다.

```java
public class CarTest {

    @DisplayName("이동 전략이 true이면 이동한다.")
    @Test
    void move_이동() {
        String input = "매트";
        MovingPolicy movingPolicy = () -> true; // Mock 객체 주입

        Car car = new Car(input, movingPolicy);
        car.move();

        assertThat(car.getPosition()).isEqualTo(1);
    }

    @DisplayName("이동 전략이 false인 경우.")
    @Test
    void move_이동실패() {
        String input = "매트";
        MovingPolicy movingPolicy = () -> false; // Mock 객체 주입

        Car car = new Car(input, movingPolicy);
        car.move();

        assertThat(car.getPosition()).isEqualTo(0);
    }
}
```

## 3. 서비스 로케이터를 이용한 의존 객체 사용

### 3.1 서비스 로케이터의 구현

서비스 로케이터(service locator)는 애플리케이션에서 필요로 하는 객체를 제공하는 책임을 가진다. 

```java
public class ServiceLocator {

    public MovingStrategy getMovingStrategy() {
        ...
    }
}
```

서비스 로케이터가 올바르게 동작하기 위해서는 스스로 어떤 객체를 제공해야 할지 알아야 한다. 서비스 로케이터는 애플리케이션 영역의 객체에게 직접 접근하기 때문에 애플리케이션 영역에 위치하게 된다. 메인 영역에서는 서비스 로케이터가 제공할 객체를 생성하고 이 객체를 이용하여 서비스 로케이터를 초기화 한다.

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/160249235-b13fa734-975f-431d-9820-0b10d636b428.png />

### 3.2 서비스 로케이터의 단점

서비스 로케이터의 가장 큰 단점은 동일 타입의 객체가 다수 필요한 경우 각 객체 별로 제공 메서드를 만들어 주어야 한다.

만약 메서드 이름에 추가적인 키워드를 붙여 구분하게 된다면 결국 직접 의존하는 것과 동일한 효과를 방생 시킨다. 즉 다른 구현으로 변경해야 할 때 호출하는 쪽도 함께 변경해야 한다는 것이다.

서비스 로케이터는 인터페이스 분리 원칙을 위배한다. 자신이 필요한 타입 뿐만 아니라 서비스 로케이터가 제공하는 다른 타입에 대한 의존이 함께 발생한다. 다른 의존 객체에 의해 영향을 받을 수 있다.

서비스 로케이터는 변경의 유연함을 떨어뜨리기 때문에 DI를 사용하는 것이 바람직하다.

## References

최범균 지음, 『개발자가 반드시 정복해야 할 객체지향과 디자인 패턴』, 인투북스(2014), p137-172.

<TagLinks />