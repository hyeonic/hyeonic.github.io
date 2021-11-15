---
title: java에서 제공하는 functional interface
tags: ['Java']
---

# java에서 제공하는 functional interface

**OpenJdk azul-11을 기반으로 작성하였습니다. 오개념이나 잘못된 부분이 있으면 dev.hyeonic@gmail.com로 많은 피드백 부탁드립니다!**

java api의 `java.util.function` 패키지를 살펴보면 다수의 함수형 인터페이스를 제공해준다. 그중 대표적인 `4개(Function, Consumer, Predicate, Supplier)`의 별명과 용도에 대해 정리하였다.

## Function

 * 별명: transfomer
 * 이유: 값을 변환하기 때문이다.

```java
@FunctionalInterface
public interface Function<T, R> {

    /**
     * Applies this function to the given argument.
     *
     * @param t the function argument
     * @return the function result
     */
    R apply(T t);

    ...
}
```

 * `R apply(T t)`: T타입의 값을 받아 R타입의 값을 반환한다.

## Consumer

 * 별명: Spartan
 * 이유: 모든 것을 빼앗고 아무것도 내주지 않기 때문이다.

```java
@FunctionalInterface
public interface Consumer<T> {

    /**
     * Performs this operation on the given argument.
     *
     * @param t the input argument
     */
    void accept(T t);

    ...
}

```

 * `void accept(T t)`: T타입의 값을 받아 아무것도 반환하지 않는다.

## Predicate

 * 별명: 판사
 * 이유: 참 거짓으로 판단하기 때문이다.

```java
@FunctionalInterface
public interface Predicate<T> {

    /**
     * Evaluates this predicate on the given argument.
     *
     * @param t the input argument
     * @return {@code true} if the input argument matches the predicate,
     * otherwise {@code false}
     */
    boolean test(T t);

    ...
}
```

 * `boolean test(T t)`: T타입의 값을 받아 boolean 타입으로 반환한다.

## Supplier

 * 별명: 게으른 공급자
 * 이유: 입력값도 없이 결과를 반환한다. 하지만 내가 원하는걸 미리 준비하지 않고 실제 필요로 할 때 사용하여 시스템 자원을 아낄 수 있기 때문이다.

```java
@FunctionalInterface
public interface Supplier<T> {

    /**
     * Gets a result.
     *
     * @return a result
     */
    T get();
}
```

 * `T get()`: 단순히 T타입 값을 반환한다.

## References

[나는 프로그래머다 웨비너 - 자바8 깊숙히!](https://www.youtube.com/watch?v=8FnXom0eU2A&t=0s)<br>
[람다](https://b-programmer.tistory.com/279)<br>

<TagLinks />