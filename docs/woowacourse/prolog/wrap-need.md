---
title: 필요에 의한 원시값 포장
tags: ['우아한테크코스', 'prolog']
date: 2022-02-18 20:35:00
feed:
  enable: true
---

# 필요에 의한 원시값 포장

## 목표

우아한테크코스에서 진행한 미션의 리뷰와 피드백에 대해 정리한다. 실제 리뷰는 [[1단계 - 자동차 경주 구현] 매트(최기현) 미션 제출합니다.](https://github.com/woowacourse/java-racingcar/pull/275)에서 확인할 수 있다.

## 검증 로직

미션을 해결하기 위해서는 다양한 요구사항에 만족해야 한다. 이러한 요구사항들은 다양한 검증로직을 동반한다. 필자는 `각 객체의 검증 책임도 자신에게 있다`고 생각하여 객체 내부에서 진행하였다. 한 예시로 최초에 Car는 단순히 String으로 name이라는 인스턴스 변수를 가지고 있었다.

```java
public class Car {
    private final String name;
    ...
    
    public Car(String name, MovingPolicy movingPolicy) {
        validateNull(name);
        validateEmpty(name);
        validateBlank(name);
        validateNameLength(name);
        this.name = name;
        ...
    }

    private void validateNull(String name) {
        if (name == null) {
            throw new IllegalArgumentException();
        }
    }
    private void validateEmpty(String name) {
        if (name.isEmpty()) {
            throw new IllegalArgumentException();
        }
    }
    private void validateBlank(String name) {
        if (name.isBlank()) {
            throw new IllegalArgumentException();
        }
    }
    private void validateNameLength(String name) {
        if (name.length() > 5) {
            throw new IllegalArgumentException();
        }
    }
    ...
}
```

하지만 과도하게 name에 대한 검증 로직이 늘어나 `해당 객체의 책임을 이해하는데 어려움`이 있다고 판단했고 결국 String을 포장한 CarName 객체를 작성하여 `이름에 대한 책임을 분리`했다.

현재에는 아래와 같이 작성하였다.

#### CarName

```java
public class CarName {
    private final String name;

    public CarName(String name) {
        validateNull(name);
        validateEmpty(name);
        validateBlank(name);
        validateNameLength(name);
        this.name = name;
    }

    private void validateNull(String name) {
        if (name == null) {
            throw new IllegalArgumentException("이름은 null이 될 수 없습니다.");
        }
    }

    private void validateEmpty(String name) {
        if (name.isEmpty()) {
            throw new IllegalArgumentException("이름이 비어 있습니다.");
        }
    }

    private void validateBlank(String name) {
        if (name.isBlank()) {
            throw new IllegalArgumentException("이름은 공백이 될 수 없습니다.");
        }
    }

    private void validateNameLength(String name) {
        if (name.length() > 5) {
            throw new IllegalArgumentException("이름은 5자를 초과할 수 없습니다.");
        }
    }

    public String getName() {
        return name;
    }
}
```

#### Car

```java
public class Car {
    private final CarName name;
    private int position;
    private final MovingPolicy movingPolicy;

    public Car(String name, MovingPolicy movingPolicy) {
        this.name = new CarName(name);
        this.position = 0;
        this.movingPolicy = movingPolicy;
    }

    public void move() {
        if (movingPolicy.isMove()) {
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

## 분리가 필요한 시점

> ### 리뷰 중 일부
> 어떤 행위를 할때는 필요에 의해서 하는게 중요하다고 생각해요. 무조건 객체 포장해야지 가 아니라 왜 포장을 해야될까를 생각해보고 하는것이 중요합니다. 매트가 조치를 한 내용을 보니 잘 하신것으로 보여요.
> * Car에서 이름검증 수행
> * 역할이 너무 많아짐을 인지
> * 분리의 필요성 인지

제이가 가장 강조한 것은 `필요에 의한 객체 포장`이다. 즉 포장을 진행할 때 그에 맞는 `이유를 동반`해야 한다.

Validator의 경우에도 마찬가지이다. CarName과 유사한 검증 코드를 가진 다양한 객체가 있는 경우 공통 부분을 선별하여 Validator를 생성하면 된다.

* CarName말고 AirplaneName, ShipName 등등이 출현
* 3개의 객체에서 중복 로직들 인지
* 분리의 필요성 인지 ➡️ `이유를 동반`
* NameValidator로 추출 ➡️ `검증을 위한 책임 부여`

정리하면, 결국 모든 코드는 존재하기 위한 이유를 동반해야 한다.

<TagLinks />