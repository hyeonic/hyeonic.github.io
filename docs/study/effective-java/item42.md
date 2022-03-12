---
title: 아이템42 - 익명 클래스보다는 람다를 사용하라
tags: ['우아한테크코스', '이펙티브자바']
date: 2022-03-12 14:30:00
feed:
  enable: true
---

# 아이템42 - 익명 클래스보다는 람다를 사용하라

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/152970395-a31c8134-fc89-449f-b4dc-441e03df929c.png />

## 목표

이펙티브 자바 스터디를 진행하며 공부한 내용을 정리한다. 

## 익명 클래스와 람다

예전 Java에서 함수 타입을 표현하기 위해 `추상 메서드를 하나만 담는 인터페이스`를 사용했다. 이러한 인터페이스의 인스턴스는 특정 `함수` 혹은 `동작`을 나타내는데 사용했다.

JDK 1.1 등장 이후 이러한 함수 객체를 만드는 주요 수단이 `익명 클래스`가 되었다. 우선 익명 클래스가 무엇인지 알아본다.

### 익명 클래스

`익명 클래스(anonymous class)`는 말그대로 `이름이 없는 클래스`이다. 이러한 익명 클래스를 사용하면 `클래스 선언`과 `인스턴스화`를 동시에 할 수 있다. 즉석에서 필요한 구현을 만들어 사용할 수 있다.

아래는 간단한 예시를 위한 `Crew` 클래스이다. 이름과 코스 정보를 가지고 있고 리뷰 요청을 위한 메서드를 가지고 있다.

```java
public class Crew {

    private final String name;
    private final Course course;

    public Crew() {
        this.name = "unknown";
        this.course = Course.NONE;
    }

    public Crew(String name, Course course) {
        this.name = name;
        this.course = course;
    }

    public void sendPullRequest() {
        System.out.println(name + " 이/가 리뷰요청을 보냈습니다.");
    }
}
```

```java
Crew crew = new Crew("매트", Course.BACKEND);
```

기본적으로 인스턴스 생성을 위해서는 `new 키워드`를 사용하여 진행한다. 여기서 인스턴스는 `new Crew("매트", Course.BACKEND)`는 클래스 이름 `Crew`를 가진다. 즉 `이름을 가진 클래스`이다.

`이름이 없는 클래스`는 아래와 같다.

```java
Crew crew = new Crew() {

    @Override
    public void sendPullRequest() {
        System.out.println("익명의 크루가 리뷰요청을 보냈습니다.");
    }
};
```

인스턴스 생성을 위해 `new Crew()`로 인하여 인스턴스의 이름을 가지고 있다고 판단할 수 있지만 이후 등장하는 `{}`로 인하여 이름이 없다고 판단한다. 

해당 인스턴스는 Crew 클래스를 상속받는 형태를 띄고 있다. 그렇기 때문에 Crew 클래스의 메서드를 자유롭게 `재정의`할 수 있다. 위에서 나타나는 Crew는 클래스 이름이 아닌 단순히 `상속 받을 클래스의 이름`을 나타낼 뿐이다. 

정리하면 `익명 클래스를 활용한 인스턴스화`는 Crew 클래스를 상속한 `이름이 없는 클래스의 인스턴스`일 뿐이다. 익명 클래스는 이름을 가지지 않기 때문에 내부에 생성자 선언이 불가능하다.

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/158001840-9e7cac2f-f773-47a4-aced-1127eb8dcba5.png />

::: warning invalid method declaration; return type required
리턴 타입을 쓰지 않아 메소드의 선언이 잘못된 경우이다.
:::

### 람다

위에서 언급한 익명 클래스는 다양한 동작을 구현할 수 있지만 부가적인 코드를 많이 가지고 있다. 더 깔끔한 코드로 동작을 구현하고 전달하기 위해 Java 8은 `람다 표현식(Lambda Expression)`을 제공한다.

람다 표현식은 메서드로 전달할 수 있는 함수 객체를 단순화한 것이다. 람다 표현식은 이름을 가지지 않고 매개변수 리스트, 바디, 반환 형식 등을 가질 수 있다.

아래는 람다 표현식의 특징을 확인할 수 있는 간단한 예제이다.

```java
List<Integer> numbers = new ArrayList<>(List.of(3, 2, 1, 4, 10, 5, 7));
numbers.sort(new Comparator<>() {
    
    @Override
    public int compare(Integer o1, Integer o2) {
        return Integer.compare(o1, o2);
    }
});
```

람다 표현식이 아닌 `익명 클래스`를 활용하여 Comparator 클래스를 구현하였다. 단순히 오름차순 정렬을 위한 기능이지만 부가적인 많은 코드가 필요하다.

아래는 람다 표현식으로 개선한 것이다.

```java
List<Integer> numbers = new ArrayList<>(List.of(3, 2, 1, 4, 10, 5, 7));
numbers.sort((o1, o2) -> Integer.compare(o1, o2));
```

동일하게 오름차순 정렬을 진행하지만 간결하게 표현이 가능하다.

여기서 람다의 매개변수(o1, o2)의 타입은 `Integer`, 반환값의 타입은 `int`이지만 코드에는 언급되지 않는다. 컴파일러가 문맥을 살펴보며 타입을 `추론`한다. 타입 추론에 대한 규칙은 많은 내용과 복잡한 과정을 가지고 있기 때문에 자세한 언급은 생략한다.

정리하면 타입의 명시해야 코드가 더 명확할 때를 제외하고는 람다의 모든 매개 변수 타입을 생략하는 것이 보다 더 간결한 표현을 만들어 준다.

### 람다의 단점

람다는 이름 없고 문서화를 못 한다. 코드 자체로 동작이 명확하게 설명이 되지 않거나 코드 줄 수가 많아지면 람다 사용을 고민해봐야 한다. 람다는 한 줄 일 때 가장 좋고 길어야 세 줄 안에 끝내는 것이 좋다.

## this

람다는 자신을 참조할 수 없다. 람다에서 `this` 키워드는 바깥 인스턴스를 가리킨다. 

```java
public class LambdaReference {

    public static void main(String[] args) {
        LambdaReference lambdaReference = new LambdaReference();
        lambdaReference.run();
    }

    public void run() {
        Runnable runnable = () -> System.out.println(this);
        runnable.run();
    }

    @Override
    public String toString() {
        return "LambdaReference";
    }
}
```

실행하면 toString 메서드의 `LambdaReference`를 출력하고 있다.

```bash
LambdaReference
```

익명 클래스의 this 키워드는 익명 클래스의 인스턴스 자신을 가리킨다.

```java
public class AnonymousReference {

    public static void main(String[] args) {
        AnonymousReference anonymousReference = new AnonymousReference();
        anonymousReference.run();
    }

    public void run() {
        Runnable runnable = new Runnable() {
            @Override
            public void run() {
                System.out.println(this);
            }

            @Override
            public String toString() {
                return "Runnable";
            }
        };
        runnable.run();
    }

    @Override
    public String toString() {
        return "AnonymousReference";
    }
}
```
```bash
Runnable
```

## [더 알아보기] 익명 클래스와 람다는 표현 방식에만 차이가 있는가?

위 예제들을 작성하며 this를 제외하고 익명 클래스와 람다는 단순히 표현 방식에만 차이가 있다고 생각했다. 하지만 내부적으로 어떠한 차이가 있는지 궁금했다. 확인해보기 위해 같은 기능을 두 가지 방식으로 작성 후 차이를 알아보았다.

### 익명 클래스

아래는 익명 클래스로 작성된 Comparator의 구현체이다.

```java
public class AnonymousExample {

    public static void main(String[] args) {
        Comparator<Integer> comparator = new Comparator<>() {
            @Override
            public int compare(Integer o1, Integer o2) {
                return Integer.compare(o1, o2);
            }
        };
    }
}
```

빌드를 진행하면 두 개의 클래스 파일이 생성된다.

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/158003547-6a762cdd-dad0-41e0-aaae-80a0abc27c28.png />

아래는 익명 클래스로 작성한 코드의 바이트코드이다.

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/158003693-ac6df6a4-1e1f-4bac-aeed-fb6c910da9b5.png />

바이트코드를 살펴보면 따로 생성된 익명 클래스를 `INVOKESPECIAL` 이라는 `OPCODE`로 생성자를 호출하고 있다.

::: tip INVOKESPECIAL

Invoke instance method; special handling for superclass, private, and instance initialization method invocations

인스턴스 메서드 호출, 슈퍼 클래스, 개인 및 인스턴스 초기화 메서드 호출에 대한 특수 처리를 의미한다.

정리하면 생성자, private method, super 클래스 호출 등에 사용된다.

```java
new ArrayList()

invokespecial java/util/ArrayList.<init>: ()V
```

[invokespecial](https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-6.html#jvms-6.5.invokespecial)

:::

### 람다

아래는 람다로 작성된 Comparator의 구현체이다.

```java
public class LambdaExample {

    public static void main(String[] args) {
        Comparator<Integer> comparator = (o1, o2) -> Integer.compare(o1, o2);
    }
}
```

빌드를 진행하면 익명 클래스와는 다르게 한 개의 클래스 파일이 생성된다.

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/158003886-d74d13f3-9308-4d19-944e-a2ea15c61a0e.png />

추가적으로 바이트코드를 간단히 살펴보았다.

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/158003965-f6bc7307-3747-44bc-ac02-6188843a04e0.png />

가장 주목할 키워드는 `INVOKEDYNAMIC`이다. 익명 클래스와는 다른 OPCODE를 활용하고 있다.

::: tip INVOKEDYNAMIC

Invoke dynamic method.

동적 메서드를 호출한다. Java8 부터 default method, lambda compile시에 사용된다.

[invokedynamic](https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-6.html#jvms-6.5.invokedynamic)

:::

### 서로 다른 해석의 이유

람다를 단순히 익명 클래스로 치환할 경우 `람다식 마다 클래스가 하나씩 생기고 매번 새로운 인스턴스를 할당하는 문제`를 동반한다.

Java 아키텍터들도 람다식 표현을 위해 많은 고민을 진행했다. 결국 람다를 표현할 때 `함수형 인터페이스`를 사용하기로 결정하였다. 여기에는 많은 장점들을 가져올 수 있다.

::: tip 함수형 인터페이스

함수형 인터페이스는 `추상 메서드`가 오직 하나인 `인터페이스`이다.

:::

* 기존에도 추상 메서드가 하나인 인터페이스를 많이 사용했기 때문에 호환을 유지할 수 있다. 
* 기존에 존재하던 추상 메서드가 하나인 인터페이스들도 함수형 인터페이스로 동작할 수 있게 된다.
* 새로운 타입을 추가하지 않아도 람다식을 함수형 인터페이스의 인스턴스로 변환하여 큰 변화 없이 적용이 가능하다.
* 컴파일러에서 구조적으로 람다식을 함수형 인터페이스로 인식하고 치환할 수 있다.

## 정리

익명 클래스가 필요한 경우 함수형 인터페이스가 아닌 타입의 인스턴스를 만들 때만 사용한다. 또한 람다에서 this는 바깥 클래스를 가리키기 때문에 유의해서 사용해야 한다. 이러한 람다는 함수 객체를 아주 쉽게 표현할 수 있으며 익명 클래스와 다르게 새로운 인스턴스를 할당하지 않는다.

람다를 단순히 익명 클래스로 치환하여 해석할 경우 `람다식 마다 클래스가 하나씩 생기고 매번 새로운 인스턴스를 할당하는 문제`를 동반한다. Java에서는 보다 더 나은 `람다식 표현`을 위해 `함수형 인터페이스`를 사용하도록 지원하고 있다.

결론은 아이템 제목과 동일하게 익명 클래스보다는 람다를 사용해야 한다!

## References

조슈아 블로크 지음, 개앞맴시(이복연) 옮김, 『이펙티브 자바』, 프로그래밍 인사이트(2020), p254-258. <br>
[람다의 내부동작 #1](https://tourspace.tistory.com/11)<br>
[람다의 내부동작 #2](https://tourspace.tistory.com/12)<br>
[invokespecial](https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-6.html#jvms-6.5.invokespecial)<br>
[invokedynamic](https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-6.html#jvms-6.5.invokedynamic)

<TagLinks />