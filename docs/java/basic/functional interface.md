---
title: default method 포함한 functional interface
tags: ['Java', 'function interface']
---

# default method 포함한 functional interface

함수형 인터페이스는 정확히 하나의 추상 메서드를 지정하는 인터페이스이다. 

```java
@FunctionalInterface
public interface Adder {

    int add(int a, int b);
}
```

## 디폴트 메서드의 등장

디폴트 메서드의 등장으로 인터페이스에도 바디를 제공하는 메서드를 포함할 수 있다. `추상 메서드 + 디폴트 메서드`를 포함하는 인터페이스는 과연 함수형 인터페이스로 사용이 가능할까?

## 디폴트 메서드를 포함한 Comparator

정답은 `가능`하다. 그 예시로 대표적인 함수형 인터페이스 `Comparator`를 살펴보았다.

```java
@FunctionalInterface
public interface Comparator<T> {

    int compare(T o1, T o2); // (1)

    boolean equals(Object obj); // ? (2) 

    // (3)
    default Comparator<T> reversed() {
        return Collections.reverseOrder(this);
    }

    default Comparator<T> thenComparing(Comparator<? super T> other) {
        Objects.requireNonNull(other);
        return (Comparator<T> & Serializable) (c1, c2) -> {
            int res = compare(c1, c2);
            return (res != 0) ? res : other.compare(c1, c2);
        };
    }

    default <U> Comparator<T> thenComparing(
            Function<? super T, ? extends U> keyExtractor,
            Comparator<? super U> keyComparator)
    {
        return thenComparing(comparing(keyExtractor, keyComparator));
    }

    default Comparator<T> thenComparingInt(ToIntFunction<? super T> keyExtractor) {
        return thenComparing(comparingInt(keyExtractor));
    }

    default Comparator<T> thenComparingLong(ToLongFunction<? super T> keyExtractor) {
        return thenComparing(comparingLong(keyExtractor));
    }

    default Comparator<T> thenComparingDouble(ToDoubleFunction<? super T> keyExtractor) {
        return thenComparing(comparingDouble(keyExtractor));
    }

    ...
}
```

(1) `int compare(T o1, T o2)`: 유일한 추상 메서드이다. <br>
(2) `boolean equals(Object obj)`: ? <br>
(3) 인터페이스는 디폴트 메서드를 포함할 수 있다. 많은 디폴트 메서드가 있어도 추상 메서드가 오직 하나면 함수형 인터페이스이다. <br>

## boolean equals(Object obj)

분명 하나의 추상 메서드를 가진다고 했지만 `equals` 메서드도 존재한다. `equals`는 가장 최상위 객체인 `Object`의 `public 메서드` 이기 때문에 제외한다. 

## 정리

함수형 인터페이스는 `오직 하나의 추상 메서드`를 가질 수 있다. `또한 최상위 객체인 Object의 메서드를 포함하고 그 밖에도 다수의 디폴트 메서드, static 메서드를 가질 수 있다.`

<TagLinks />