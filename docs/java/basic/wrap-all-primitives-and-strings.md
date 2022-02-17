---
title: 모든 원시값과 문자열을 포장하라
tags: ['우아한테크코스', '원시값 포장', '객체지향 생활체조']
date: 2022-02-16 23:00:00
feed:
  enable: true
---

# 모든 원시값과 문자열을 포장하라

Java에는 아래와 같은 기본형을 가지고 있다.
* `byte`
* `short`
* `int`
* `long`
* `float`
* `double`
* `boolean`
* `char`

`모든 원시값과 문자열을 포장하라`는 위와 같은 기본형을 사용하는 `원시값`과 `문자열`을 나타내는` String`을 그대로 사용하지 않고 `의미있는 객체로 포장`한다는 의미이다.

## 예시

위 설명으로는 와닿지 않기 때문에 간단한 예시를 작성하였다.

### Car

Car는 이름을 나타내는 `name`과 현재 위치를 나타내는 `position`을 가지고 있다. name에는 다양한 `요구사항`이 주어진다고 가정한다.

 * 자동차의 이름은 `5자 이하`이다.
 * 자동차의 이름은 `null`이 올 수 없다.
 * 자동차의 이름은 ` `이 올 수 없다.
 * 자동차의 이름은 ``이 올 수 없다.

이러한 요구사항 만족을 위해서는 다양한 검증 코드를 사용해야 했다.

```java
public class Car {
    private final String name;
    private int position;
    ...
    
    public Car(String name) {
        validateNull(name);
        validateEmpty(name);
        validateBlank(name);
        validateNameLength(name);
        this.name = name;
        this.position = 0;
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

 `Car와 관련된 객체`이지만 `name에 대한 검증 책임`이 대부분을 차지하고 있기 때문에 해당 `객체의 책임`을 이해하는데 어려움이 있다고 판단한다.

## 개선

위 코드는 `private final String name`을 `객체로 포장`하여 `책임을 분리`하여 개선할 수 있다.

### CarName

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

### Car

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
        if (movingPolicy.isMovable()) {
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

name에 대한 `검증 책임`을 모두 이전하였다. 이제 Car는 오직 `이동`에 대한 책임만을 가지고 있게 된다.

## 정리

정리하면 `원시값과 문자열을 객체로 포장`하여 좀 더 `유의미한 객체`로 표현하는 것이다. 

`CarName`이라는 객체는 Java에서 기존에 제공되는 API가 아니다. 즉 주어진 요구사항에 맞춰 새롭게 `문자열을 포장한 객체`이다.

<TagLinks />