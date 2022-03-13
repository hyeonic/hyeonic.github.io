---
title: chapter03 다형성과 추상 타입
tags: ['우아한테크코스', '개발자가 반드시 정복해야 할 객체지향과 디자인 패턴']
date: 2022-03-13 21:00:00
feed:
  enable: true
---

# chapter03 다형성과 추상 타입

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/152970395-a31c8134-fc89-449f-b4dc-441e03df929c.png />

## 목표

개발자가 반드시 정복해야 할 객체 지향과 디자인 패턴 스터디를 진행하며 공부한 내용을 정리한다.

## 다형성과 상속

다형성이란 한 객체가 여러 타입을 가질 수 있다는 것을 뜻한다. Java와 같은 정적 타입 언어에서는 타입 상속을 통해 다형성을 표현한다.

타입 상속에는 크게 **인터페이스 상속**과 **구현 상속**으로 구분할 수 있다.

### 타입 상속

순전히 타입 정의만 상속 받는 것이다. Java의 경우 인터페이스나 추상 클래스를 상속받는 경우 해당한다.

```java
public interface Studiable {

    void study();
}
```

```java
public class Crew implements Studiable {

    @Override
    public void study() {
        System.out.println("호호의 스터디에 참여 중입니다.");
    }
}
```

```java
Studiable studiable = new Crew();
```

### 구현 상속

구현 상속은 클래스 상속을 통해 이루어진다. 구현 상속은 보통 상위 클래스에 정의된 기능을 재사용하기 위한 목적으로 사용된다.

```java
public class Person {

    public void introduce() {
        System.out.println("사람 입니다.");
    }
}
```

```java
public class Crew extends Person {
    
    private final int year;
}
```

클래스 상속은 구현을 재사용하면서 다형성도 함께 제공해 준다.

```java
Person person = new Crew();
```

구현 상속을 진행하면 재정의를 통해 하위 타입은 상위 타입의 기능을 자신에 맞게 수정 가능하다.

```java
public class Crew extends Person {

    @Override
    public void introduce() {
        System.out.println("크루 입니다.");
    }
}
```

`person.introduce()`는 실제 타입인 `Crew의 메서드`를 실행한다.

```java
public class Application {

    public static void main(String[] args) {
        Person person = new Crew();
        person.introduce(); // 크루 입니다.
    }
}
```

## 추상 타입과 유연함

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/158058258-f08e451c-0109-4a91-b7bb-5497a94fafc4.png />

이집트의 화가들은 사실적인 모습이 아니라 각 부분의 특징을 가장 잘 표현할 수 있도록 신체를 분해/결합하여 벽화를 그렸다고 한다. 이집트 화가들은 실제 모습이 아닌 `추상적인 모습`을 그려서 오히려 `인물의 특징`을 더욱 정확하게 묘사하려 했다.

정리하면 추상화란 구체적인 것을 분해해서 관찰자가 관심 있는 `특성`만 가지고 재조합 하는 것으로 정리할 수 있다.

### 타입 추상화

추상화는 공통된 개념을 도출해서 추상 타입을 정의 해준다.

추상화된 타입은 오퍼레이션의 시그니처만 정의하고 실제 구현은 제공하지 않는다.

```java
public interface Workable {

    void work();
}
```

위 추상 타입을 보고 실제 어떻게 일하는지는 알 수 없다. 개발자가 코드를 작성하며 일하는지, 요리사가 요리를 하는지 알 수 없이 단순히 `일하다`라는 의미만 제공한다.

Java에서는 보통 이러한 추상 타입을 인터페이스를 통해 정의한다. 

추상 타입과 실제 구현 클래스는 상속을 통해 연결된다. 

```java
public class Developer implements Workable {

    @Override
    public void work() {
        System.out.println("맥북으로 일합니다.");
    }
}
```

이제 추상 타입을 이용하여 코드를 작성할 수 있게 된다.

```java
Workable workable = new Developer();
workable.work(); // 맥북으로 일합니다.
```

`workable.work()`는 실제 객체 타입의 `work()` 메서드를 호출할 것이다.

### 구현 교체의 유연함

만약 다수의 데이터를 관리하기 위해 List를 사용한다고 가정한다. 해당 데이터는 빠른 탐색을 보장해야 한다면 간단히 ArrayList 구현체를 사용하면 된다.

```java
List<Integer> numbers = new ArrayList<>();
```

후에 추가적인 요구사항으로 삽입 삭제가 빈번하다고 가정한다. 그렇다면 간단히 LinkedList로 교체하여 사용하면 된다.

```java
numbers = new LinkedList<>();
```

사용자는 구현체가 무엇인지 상관없다. 이전과 동일하게 List를 사용하면 된다. 

아래와 같이 구현체를 활용하여 변수를 선언하게 되면 이러한 유연함을 방해할 뿐이다.

```java
ArrayList<Integer> numbers = new ArrayList<>();
```

### 변화하는 부분을 추상화하는 것

추상화를 통해 변경에 대한 유연함을 확인하였다. 하지만 이러한 추상화는 다양한 상황에서 많은 경험을 통해 늘어난다. 그렇기 때문에 변화할 부분을 미리 예측하기 보다 변화하는 부분을  추상화하는 것이 좋다.

### 자원을 직접 명시하지 않고 의존 객체 주입을 사용하라

이펙티브 자바 아이템05이다. 위에서 언급한 추상화 과정을 거치며 나온 인터페이스를 외부에서 주입 받아 사용하는 경우 테스트를 진행할 때 많은 이점을 가지고 있다.

해당 내용은 아래 정리해두었다.

[아이템05 - 자원을 직접 명시하지 말고 의존 객체 주입을 사용하라](https://hyeonic.github.io/study/effective-java/item05.html)

## References

최범균 지음, 『개발자가 반드시 정복해야 할 객체지향과 디자인 패턴』, 인투북스(2014), p58-86.

<TagLinks />