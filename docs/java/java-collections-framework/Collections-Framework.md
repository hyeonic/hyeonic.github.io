---
title: Collections Framework
tags: ['java', 'Collections', 'sort', 'List']
---

# Collections Framework

**OpenJdk azul-11을 기반으로 작성하였습니다. 오개념이나 잘못된 부분이 있으면 dev.hyeonic@gmail.com로 많은 피드백 부탁드립니다!**

## Collections Framework란?

`Collections Framework`란 `데이터 군을 저장하는 클래스들을 표준화한 설계`를 의미한다. 정리하면 `다수의 데이터`를 쉽고 효과적으로 처리할 수 있는 `표준화된 방법`을 제공하는 클래스의 집합을 의미한다.

::: tip Collection + Framework
다수의 데이터, 즉 데이터 그룹을 의미하는 `Collection`과 표준화된 프로그래밍 방식을 의미하는 `Framework`를 합친 단어이다.
:::

## Java의 Collections Framework

`Java 1.2` 이후로 기본적으로 `컬렉션 프레임워크`를 제공하고 있다. 이러한 컬렉션 프레임워크는 컬렉션을 표현하고 조작하기 위한 통합 아키텍처로 구현 세부 사항과 독립적으로 컬렉션을 조작할 수 있다.

[oracle 공식문서](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/doc-files/coll-index.html)에서는 `Collections Framework`를 아래와 같이 정의하고 있다.

::: tip Collections Framework Documentation

The collections framework is a unified architecture for representing and manipulating collections, enabling them to be manipulated independently of the details of their representation.

**컬렉션 프레임워크는 컬렉션을 표현하고 조작하기 위한 통합 아키텍처로, 표현 세부 사항과 독립적으로 조작할 수 있다.**

It reduces programming effort while increasing performance. 

**프로그래밍 노력은 줄이고 성능은 높인다.**

It enables interoperability among unrelated APIs, reduces effort in designing and learning new APIs, and fosters software reuse. 

**관련 없는 API 간의 상호 운용성을 가능하게 하고, 새로운 API를 설계하고 학습하는 노력을 줄이며, 소프트웨어 재사용을 촉진한다.**

The framework is based on more than a dozen collection interfaces. It includes implementations of these interfaces and algorithms to manipulate them.

**이 프레임워크는 12개 이상의 컬렉션 인터페이스를 기반으로 합니다. 이러한 인터페이스와 이를 조작하기 위한 알고리즘의 구현이 포함된다.**

:::

## Collections Framework 등장 이전

이러한 장점을 가진 컬렉션 프레임워크가 등장하기 이전에도 다수의 데이터를 다루기 위한 클래스들은 존재하였다. 그 예시가 `Vector`, `HashTable`, `Properties` 등이다. 

아래는 `Vector`의 일부를 가져온 것이다.

```java
public class Vector<E>
    extends AbstractList<E>
    implements List<E>, RandomAccess, Cloneable, java.io.Serializable
{
    ...
    public synchronized E get(int index) {
        if (index >= elementCount)
            throw new ArrayIndexOutOfBoundsException(index);

        return elementData(index);
    }

    ...
    public synchronized E set(int index, E element) {
        if (index >= elementCount)
            throw new ArrayIndexOutOfBoundsException(index);

        E oldValue = elementData(index);
        elementData[index] = element;
        return oldValue;
    }
    ...
}
```

대표적으로 `Vector`의 `get()`, `set()` 등 다양한 메서드에 동기화를 위한 `synchronized` 키워드를 가지고 있다. 빈번한 `lock/unlock`으로 인해 상당한 `오버헤드`를 발생시킨다. 그렇기 때문에 `Vector`는 `thread-safe`하지만 `효율적이지 않다.`

이러한 클래스들은 현재에도 `하위 호환성`을 위하여 남아있다. 하지만 사용하지 않는 것을 권장한다.


## 장점 살펴보기

 1. 사용자가 직접 작성할 필요가 없도록 `데이터 구조 및 알고리즘을 제공`하여 `프로그래밍 작업을 줄인다.`

 2. 데이터 구조 및 알고리즘의 `고성능 구현을 제공`하여 `성능을 향상` 시킨다.

 3. 각 `인터페이스(List, Set 등)`의 다양한 `구현체(ArrayList, LinkedList 등)`들은 상호 `호환이 가능`하기 때문에 프로그램들은 스위칭 구현체들에 의해 조정될 수 있다.

 4. 컬렉션을 주고받을 수 있는 공통 언어를 설정하여 `관련 없는 API 간의 상호 운용성을 제공`한다.

 5. 여러 개의 임시 수집 API를 학습하도록 요구하여 API 학습에 필요한 노력을 줄인다.

 6. 컬렉션 API를 만들 필요가 없기 때문에 `API를 설계하고 구현하는데 필요한 노력을 줄여준다.`

 7. 컬렉션 및 알고리즘을 조작할 수 있는 `표준 인터페이스를 제공`하여 `소프트웨어 재사용`을 도와준다.

정리하면 `컬렉션 프레임워크`는 `컬렉션(다수의 데이터)`를 다루는 데 필요한 `다양하고 풍부한 클래스를 제공`하고 있다. 이것은 개발자의 짐을 상당 부분 덜어주고 있고, 인터페이스와 `다형성`으로 인한 `객체지향적 설계`를 통해 표준화되어 있기 때문에 `쉽게 익히고 사용할 수 있다.`

## Collections Framework의 핵심 인터페이스

### Collection Interface
<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/147235045-fbcaa694-1e55-4978-a707-2d40edf9f145.png>
</p>

 * `Set`: `순서가 없는 데이터의 집합`이다. 데이터의 중복을 허용하지 않는다. 구현 클래스로는 HashSet, TreeSet 등이 있다.
 * `List`: `순서가 있는 데이터의 집합`이다. 데이터의 중복을 허용한다. 구현 클래스로는 ArrayList, Vector, Stack 등이 있다.

### Map Interface
<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/147235109-3633d7d7-7f2b-4dcf-9f12-7d9e790a65f8.png>
</p>

 * `Map`: `key와 value의 쌍`으로 이루어진 데이터의 집합이다. 순서는 유지되지 않으며, key는 중복을 허용하지 않는다. value는 중복을 허용한다. 구현 클래스로는 HashMap, TreeMap 등이 있다.

::: tip Vector, Stack, Hashtable
앞서 언급한 것 처럼 `하위 호환성`을 위해 남겨둔 것이다. 또한 `Collections Framework의 등장`으로 상속계층도가 함께 변경된 것이다.
:::

## Abstract

위에서 언급한 클래스를 살펴보면 `Abstract`라는 키워드를 가진 클래스를 살펴볼 수 있다. 

### ArrayList
```java
public class ArrayList<E> extends AbstractList<E>
        implements List<E>, RandomAccess, Cloneable, java.io.Serializable
{
    ...
}
```

### AbstractList
```java
public abstract class AbstractList<E> 
    extends AbstractCollection<E> implements List<E> {
    ...
}
```

`AbstractCollection`, `AbstractSet`, `AbstractList`, `AbstractSequentialList`, `AbstractMap`은 코어 컬렉션 인터페이스를 구현하는 데 필요한 노력을 최소화하기 위해 `기본적인 구현을 제공`한다.

대표로 `AbstractCollection`에 대해 살펴보았다.

::: tip AbstractCollection

This class provides a skeletal implementation of the Collection interface, to minimize the effort required to implement this interface.

**해당 클래스는 인터페이스를 구현하는 데 필요한 노력을 최소화하기 위해 컬렉션 인터페이스의 골격 구현을 제공한다.**

To implement an unmodifiable collection, the programmer needs only to extend this class and provide implementations for the iterator and size methods. (The iterator returned by the iterator method must implement hasNext and next.)

**수정할 수 없는 컬렉션을 구현하려면 프로그래머는 이 클래스를 확장하고 iterator와 size 메서드에 대한 구현을 제공하기만 하면 된다. (iterator 메서드에 의해 반환된 iterator는 next와 hasNext를 구현해야 한다.)**

To implement a modifiable collection, the programmer must additionally override this class's add method (which otherwise throws an UnsupportedOperationException), and the iterator returned by the iterator method must additionally implement its remove method.

**수정 가능한 컬렉션을 구현하려면 프로그래머가 이 클래스의 추가 메서드를 추가로 재정의해야 한다. (그렇지 않으면 UnsupportedOperationException를 던진다) 및 iterator 메소드에 의해 반환된 iterator는 remove 메서드를 추가로 구현해야 한다.**

The programmer should generally provide a void (no argument) and Collection constructor, as per the recommendation in the Collection interface specification.

**프로그래머는 일반적으로 컬렉션 인터페이스 사양의 권장 사항에 따라 void 및 컬렉션 생성자를 제공해야 한다.**

The documentation for each non-abstract method in this class describes its implementation in detail. 

**이 클래스의 각 비추상적 방법에 대한 문서에서는 구현에 대해 자세히 설명한다.**

Each of these methods may be overridden if the collection being implemented admits a more efficient implementation.

**구현 중인 컬렉션이 더 효율적인 구현을 허용하는 경우 이러한 각 메서드를 재정의할 수 있다.**

:::

## Concurrent Collections

둘 이상의 스레드에서 컬렉션을 사용하는 애플리케이션은 일반적인 컬렉션 사용에 신중해야 한다. Java는 동시 프로그래밍에 대한 광범위한 지원을 포함한다.

컬렉션은 매우 자주 사용되기 때문에 다양한 `concurrent interface`와 `구현 클래스`가 API에 포함되어 있다. 이러한 유형은 concurrent 프로그래밍에 필요한 기능을 제공한다.

자세한 설명은 [java util concurrent](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/concurrent/package-summary.html)에서 확인할 수 있다.

## References

[Collections Framework Documentation](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/doc-files/coll-index.html)<br>
[Collections Framework Overview](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/doc-files/coll-overview.html)<br>
[Class AbstractCollection](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/AbstractCollection.html)<br>
[자바에서 Vector와 Stack 컬렉션이 쓰이지 않는 이유?](https://aahc.tistory.com/8)

<TagLinks />