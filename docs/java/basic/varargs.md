---
title: 가변인수는 신중히 사용하라
tags: ['Java', 'varargs', '아이템 53']
---

# 가변인수는 신중히 사용하라

**OpenJdk azul-11을 기반으로 작성하였습니다. 오개념이나 잘못된 부분이 있으면 dev.hyeonic@gmail.com로 많은 피드백 부탁드립니다!**

## 팩토리 메서드

`Java 9`에서는 작은 컬렉션 객체를 쉽게 만들 수 있는 `팩토리 메서드`를 제공한다. 그 중 `List 인터페이스`를 살펴보면 아래와 같은 메서드들이 `오버로딩` 되어 제공되는 것을 확인할 수 있다.

```java
public interface List<E> extends Collection<E> {
    ...
    static <E> List<E> of() {...}
    static <E> List<E> of(E e1) {...}
    static <E> List<E> of(E e1, E e2) {...}
    static <E> List<E> of(E e1, E e2, E e3) {...}
    static <E> List<E> of(E e1, E e2, E e3, E e4) {...}
    static <E> List<E> of(E e1, E e2, E e3, E e4, E e5) {...}
    ...
    static <E> List<E> of(E... elements) {...}
    ...
}
```

Java에는 다중 요소를 받을 수 있는 `가변인수 메서드`를 가지고 있다. `static <E> List<E> of(E... elements)`가 바로 `가변 인수`를 활용한 팩토리 메서드이다. 하지만 요소의 개수마다 메서드가 작성되어 있다. 추가적인 조사를 통해 이유에 대해 알아보려 한다.

## 가변인수 메서드

`Java 1.5`부터 매개변수의 개수를 `동적으로 지정`할 수 있는 `가변인수(varargs) 메서드`가 등장하였다. `가변인수 메서드`는 명시한 타입의 인수를 0개 이상 받을 수 있다. 이러한 메서드를 호출하면 `인수의 개수와 길이가 같은 배열`을 만들고 이 배열에 저장하여 가변인수 메서드에게 건네준다.

아래는 가변인수를 사용한 sum 메서드의 간단한 예시이다. 매개 변수 타입앞에 `...` 키워드를 추가하여 구현할 수 있다.

```java
static int sum(int... args) {
    int sum = 0;
    for (int arg : args) {
        sum += arg;
    }
    return sum;
}
```

```java
System.out.println(sum(1, 2, 3)); // 6
System.out.println(sum(1, 2, 3, 4, 5)); // 15
System.out.println(sum(1, 2, 3, 4, 5, 6, 7)); // 28
```

위 처럼 가변인수 메서드는 인수 개수가 정해지지 않았을 때 아주 유용하다. 

## List의 다양한 of 메서드

이제 `가변인수 메서드의 이점`을 확인하였다. 그렇다면 `List 인터페이스`는 왜 다양한 `of 메서드`를 사용하는 것인가?

정답은 바로 `성능에 대한 문제` 때문이다. `가변인수 메서드`는 호출될 때 마다 `내부적으로 배열을 새로 하나 할당하고 초기화를 진행`한다. 이것을 고려하기 위해 `List`에서는 인수가 `0개부터 10인 것` 까지 `11개의 추가적인 메서드`를 `오버로딩`하여 해결하였다. 이제 고정된 숫자의 요소를 API로 정의하므로 추가적인 비용을 해결할 수 있다.

이제 `대부분의 상황`에서 `가변인수 메서드`를 사용하지 않고 `특정 상황`에서만 `가변인수 메서드`를 사용할 것이다. 

## (번외) 인수가 1개 이상이어야 할 때

만약 `1개 이상의 수` 중에 `최소값`을 구하기 위한 요구사항이 있다고 가정한다. 최소값을 구하기 위해서는 `적어도 1개의 인수`가 필수적으로 필요하다. 하지만 가변인수 메서드를 사용하게 되면 인수 0개를 허용하게 된다. 또한 런타임 시점에 검증을 진행하기 때문에 답을 구할 수 없게 된다.

```java
static int min(int... args) {
    if (args.length == 0) {
        throw new IllegalArgumentException("인수가 1개 이상 필요합니다.");
    }
    ...
}
```

이러한 상황에서는 첫 번째로 평범한 매개변수를 받고, 가변인수는 두 번째로 받으면 앞서 언급한 문제를 해결할 수 있다.

```java
static int min(int firstArg, int... args) {
    int min = firstArg;
    for (int arg : args) {
        min = Math.min(min, arg);
    }
    return min;
}
```

## References

라울-게이브리얼 우르마, 마리오 푸스코, 앨런 마이크로프트, 『Modern Java in Action』, 한빛미디어(2019), p278.<br>
조슈아 블로크, 『Effective Java』, 인사이트(2018), p320. 아이템 53 가변인수는 신중히 사용하라<br>

<TagLinks />