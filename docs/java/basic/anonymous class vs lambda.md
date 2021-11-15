---
title: anonymous class와 lambda
tags: ['Java', 'anonymous class', 'lambda']
---

# anonymous class와 lambda

**오개념이나 잘못된 부분이 있으면 dev.hyeonic@gmail.com로 많은 피드백 부탁드립니다!**

## anonymous class

`익명 클래스(anonymous class)`는 말그대로 `이름이 없는 클래스`이다. 이러한 익명 클래스를 사용하면 `클래스 선언`과 `인스턴스화`를 동시에 할 수 있다. 즉석에서 필요한 구현을 만들어 사용할 수 있다.

### Person

아래는 간단한 예시를 위한 Person 클래스이다. 간단한 생성자와 getter, setter 메서드로 구성되어 있다.

```java
public class Person {

    private String name;
    private int age;

    public Person() {
        this.name = "unknown";
        this.age = 0;
    }

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
```

```java
Person person = new Person();
```

인스턴스 생성을 위해서는 위와 같이 `new 키워드`를 사용하여 진행한다. 여기서 인스턴스 `new Person()` 는 클래스 이름 `Person`을 가진다. 즉 `이름을 가진 클래스`이다.

`이름이 없는 클래스`는 Person과 같은 이름이 없는 클래스를 뜻한다.

### anonymous class 구현

```java
Person person = new Person() {
            
    @Override
    public String getName() {
        return super.getName();
    }

    @Override
    public void setName(String name) {
        super.setName(name);
    }

    ...
};
```

위 `new Person()`로 인하여 인스턴스의 이름을 가지고 있다고 판단할 수 있지만 이후 등장하는 `{}`로 인하여 이름이 없다고 판단한다. 또한 Person 클래스에 정의한 get/set 메서드를 `재정의`한다. 

해당 인스턴스는 Person 클래스를 상속받는 형태를 띄고 있다. 위에서 나타나는 Person은 클래스 이름이 아닌 단순히 `상속 받을 클래스의 이름`을 나타낼 뿐이다. 

정리하면 `익명 클래스를 활용한 인스턴스화`는 Person 클래스를 상속한 `이름이 없는 클래스의 인스턴스`일 뿐이다. 그렇기 때문에 익명 클래스 내부에 생성자 또한 선언이 불가능하다.

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/141795323-b727eeb9-9fca-4256-9b59-bef989acf052.png>
</p>

::: warning invalid method declaration; return type required
리턴 타입을 쓰지 않아 메소드의 선언이 잘못된 경우이다.
:::

## lambda

위에서 언급한 익명 클래스는 다양한 동작을 구현할 수 있지만 부가적인 코드를 많이 가지고 있다. 더 깔끔한 코드로 동작을 구현하고 전달하기 위해 Java 8은 `람다 표현식`을 제공한다.

람다 표현식은 메서드로 전달할 수 있는 익명 함수를 단순화한 것이다. 람다 표현싱은 이름을 가지지 않고 파라미터 리스트, 바디, 반환 형식, 발생할 수 있는 예외 리스트를 가질 수 있다.

### lambda의 특징

 * 익명: 보통의 메서드와 달리 이름이 없기 때문에 익명이다.
 * 함수: 람다는 메서드처럼 특정 클래스에 종속되지 않는다. 
 * 전달: 람다 표현식을 메서드 인수로 전달하거나 변수로 저장할 수 있다.
 * 간결성: 익명 클래스 처럼 많은 자질구레한 코드를 구현할 필요가 없다.

아래는 람다 표현식의 특징들을 확인할 수 있는 간단한 예제이다.

```java
List<Integer> numbers = new ArrayList<>(List.of(3, 2, 1, 4, 10, 5, 7));
numbers.sort(new Comparator<Integer>() {
    @Override
    public int compare(Integer o1, Integer o2) {
        return o1 - o2;
    }
});
```

람다 표현식이 아닌 익명 클래스를 활용하여 동작을 구현하였다. 단순히 오름차순 정렬을 위해서 많은 코드들이 필요하다.

아래는 람다 표현식으로 개선한 것이다. 

```java
List<Integer> numbers = new ArrayList<>(List.of(3, 2, 1, 4, 10, 5, 7));
numbers.sort((o1, o2) -> o1 - o2);
```

동일하게 오름차순 정렬을 진행하지만 간결하게 표현이 가능하다. 

## functional interface

람다 표현식에 많은 장점이 있지만 모든 익명 클래스에 사용가능한 것은 아니다. 람다 표현식을 사용하기 위해서는 해당하는 익명 클래스가 `함수형 인터페이스 (functional interface)` 여야 한다.

::: tip
함수형 인터페이스는 `추상 메서드`가 `오직 하나`인 인터페이스이다. 
:::

람다 표현식은 이러한 함수형 인터페이스의 추상 메서드 구현을 직접 전달할 수 있다. 즉 `전체 표현식을 함수형 인터페이스를 구현한 클래스의 인스턴스`로 취급할 수 있다.

## anonymous class와 lambda

```java
List<Integer> numbers1 = new ArrayList<>(List.of(3, 2, 1, 4, 10, 5, 7));
numbers1.sort(new Comparator<Integer>() {
    @Override
    public int compare(Integer o1, Integer o2) {
        return o1 - o2;
    }
});

System.out.println(numbers1);

List<Integer> numbers2 = new ArrayList<>(List.of(3, 2, 1, 4, 10, 5, 7));
numbers2.sort((o1, o2) -> o1 - o2);

System.out.println(numbers2);
```

```bash
[1, 2, 3, 4, 5, 7, 10]
[1, 2, 3, 4, 5, 7, 10]
```

겉 보기에는 익명 클래스와 람다 표현식 모두 동일한 결과를 가져온다. 단순히 표현 방식에만 차이가 있는지 확인해보기 위해 두 가지 방식으로 작성 후 바이트코드를 살펴보았다.

### anonymous class의 바이트코드

```java
package me.hyeonic.javabasic.anonymousclass;

import java.util.Comparator;

public class AnonymousExample {

    public static void main(String[] args) {
        Comparator<Integer> comparator = new Comparator<Integer>() {
            @Override
            public int compare(Integer o1, Integer o2) {
                return o1 - o2;
            }
        };
    }
}
```

위 클래스의 바이트코드를 확인해보면 아래와 같다.

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/141808382-5189efc4-ccfb-4bae-96f3-c8a6fe5a0ad2.png>
</p>

익명클래스는 `INVOKESPECIAL` 이란 `OPCODE`로 생성자를 호출하고 있는 것을 확인할 수 있다.

::: tip INVOKESPECIAL
Invoke instance method; special handling for superclass, private, and instance initialization method invocations

인스턴스 메서드 호출, 슈퍼 클래스, 개인 및 인스턴스 초기화 메서드 호출에 대한 특수 처리를 의미한다.

[invokespecial](https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-6.html#jvms-6.5.invokespecial)
:::

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/141808639-9e8757b2-7fa4-4dc5-bfc9-e98ec7838dea.png>
</p>

또한 익명 클래스는 `AnonymousExample$1.class`를 생성하여 초기화를 진행하는 것을 확인할 수 있었다.

### lambda의 바이트코드

```java
package me.hyeonic.javabasic.anonymousclass;

import java.util.Comparator;

public class LambdaExample {

    public static void main(String[] args) {
        Comparator<Integer> comparator = (o1, o2) -> o1 - o2;
    }
}
```

위 클래스의 바이트코드를 확인해보면 아래와 같다.

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/141808469-e0abf3c5-3f25-42fc-a8f1-4ab516c100d9.png>
</p>

익명 클래스와는 다르게 `INVOKEDYNAMIC`을 사용하고 있다.

::: tip INVOKEDYNAMIC
Invoke dynamic method.

동적 메서드를 호출한다. Java8 부터 default method, lambda compile시에 사용된다.

[invokedynamic](https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-6.html#jvms-6.5.invokedynamic)
:::

## 서로 다른 해석의 이유

Java 8 이전 람다를 쓰기위해서는 추가적인 라이브러리가 필요하거나 코틀린의 경우 컴파일 시점에 람다를 단순히 익명 클래스로 치환한다.

람다를 단순히 익명 클래스로 치환할 경우 `람다식 마다 클래스가 하나씩 생기고 매번 새로운 인스턴스를 할당하는 문제`를 동반한다. 

Java 아키텍터들도 람다식 표현을 위해 많은 고민들을 진행하였다. 결국 `람다를 표현`할 때 `함수형 인터페이스를 사용`하기로 결정하였다. 여기에는 많은 장점들을 가져올 수 있었다.

 1. 기존에도 추상 메서드가 하나인 인터페이스를 많이 사용했기 때문에 호환을 유지할 수 있다. 
 2. 기존에 존재하던 추상 메서드가 하나인 인터페이스들도 함수형 인터페이스로 동작할 수 있게 되었다.
 3. 추가적인 타입을 추가하지 않아도 람다식을 함수형 인터페이스의 인스턴스로 변환하면 큰 변화없이 java에 적용이 가능하다.
 4. 컴파일러에서 구조적으로 람다식을 함수형 인터페이스로 인식하고 치환할 수 있다.

## translate strategy

람다는 두 가지 상반된 목표를 가진다. 
 1. 특정 전략을 따르지 않고, 미래의 최적화를 위해 유연성을 극대화 한다.
 2. 클래스 파일 표현에 안정성을 제공한다.

Java 8에서는 두 가지 목표를 모두 달성하기 위해 아래와 같은 전략을 취한다.
 1. 컴파일 시 바이트코드에는 람다를 구현하는 객체를 생성하지 않는다. 런타입에 실제 생성을 위한 방법만 표기한다.
 2. 해당 방법은 invokedynamic instrunction에 동적/정적 인수 목록으로 encoding된다.

## 정리

람다를 단순히 익명 클래스로 치환하여 해석할 경우 `람다식 마다 클래스가 하나씩 생기고 매번 새로운 인스턴스를 할당하는 문제`를 동반한다. 보다 더 나은 람다식 표현을 위해 `람다를 표현`할 때 `함수형 인터페이스를 사용`한다. 

람다는 특정 전략을 따르지 않고, 미래의 최적화를 위해 유연성을 극대화 하고, 클래스 파일 표현에 안정성을 제공해야 한다. 이것을 해결하기 위해 익명 클래스와는 다른 방식으로 해석된다.

## References

[람다의 내부동작 #1](https://tourspace.tistory.com/11)<br>
[람다의 내부동작 #2](https://tourspace.tistory.com/12)<br>
[invokespecial](https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-6.html#jvms-6.5.invokespecial)<br>
[invokedynamic](https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-6.html#jvms-6.5.invokedynamic)

<TagLinks />