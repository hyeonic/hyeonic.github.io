---
title: EnumMap
tags: ['우아한테크코스', 'EnumMap']
date: 2022-03-02 19:30:00
feed:
  enable: true
---

# EnumMap

## 목표

EnumMap의 내부 구현을 살펴보며 간단한 동작 방식에 대해 이해한다.

## EnumMap이란?

EnumMap은 열거 타입을 키로 사용하도록 설계한 아주 빠른 Map 구현체이다. 아래는 [EnumMap](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/EnumMap.html)에 적힌 설명을 해석한 것이다.

::: tip EnumMap

A specialized Map implementation for use with enum type keys. All of the keys in an enum map must come from a single enum type that is specified, explicitly or implicitly, when the map is created. Enum maps are represented internally as arrays. This representation is extremely compact and efficient.

**열거형 키와 함께 사용할 특수 구현이다. 열거형 맵의 모든 키는 맵을 만들 때 명시적으로 혹은 암시적으로 지정된 단일 열거형에서 가져와야 한다. 열거 맵은 내부적으로 배열로 표현된다. 이러한 표현은 매우 간결하고 효율적이다.**

Enum maps are maintained in the natural order of their keys (the order in which the enum constants are declared). This is reflected in the iterators returned by the collections views (keySet(), entrySet(), and values()).

**열거형 맵은 키의 자연스러운 순서(열거형 상수가 선언되는 순서)로 유지된다. 이것은 keySet(), entrySet(), values()에 의해 반환되는 iterators에 반영된다.**

Iterators returned by the collection views are weakly consistent: they will never throw ConcurrentModificationException and they may or may not show the effects of any modifications to the map that occur while the iteration is in progress.

**컬렉션 뷰에서 반환되는 Iterators는 일관성이 약하므로 ConcurrentModificationException을 던지지 않으며 반복이 진행되는 동안 발생하는 수정은 보여주거나 보여주지 않을 수도 있다.**

Like most collection implementations EnumMap is not synchronized. If multiple threads access an enum map concurrently, and at least one of the threads modifies the map, it should be synchronized externally. This is typically accomplished by synchronizing on some object that naturally encapsulates the enum map. If no such object exists, the map should be "wrapped" using the `Collections.synchronizedMap(java.util.Map<K, V>)` method. This is best done at creation time, to prevent accidental unsynchronized access:

**대부분의 컬렉션 구현과 마찬가지로 EnumMap은 동기화 되지 않는다. 여러 스레드가 동시에 맵에 접근하고 스레드 중 적어도 하나가 수정하면 외부에서 동기화해야 한다. 이것은 일반적으로 enum map을 캡슐화하는 일부 객체에서 수행해야 한다. 이러한 객체가 존재하지 않으면 Collections.synchronizedMap(java.util.Map<K, V>)를 사용하여 맵을 감싸야 한다.**

:::

위 설명에서 중점적으로 살펴볼 키워드는 아래와 같다.
* `열거 맵은 내부적으로 배열로 표현된다`
* 열거형 맵은 키의 `자연스러운 순서(열거형 상수가 선언되는 순서)`로 유지된다. 이것은 keySet(), entrySet(), values()에 의해 반환되는 iterators에 반영된다.

## 열거 맵은 내부적으로 배열로 표현된다

아래는 EnumMap 내부의 일부분을 가져온 것이다.

```java
public class EnumMap<K extends Enum<K>, V> extends AbstractMap<K, V>
    implements java.io.Serializable, Cloneable
{
    ...
    private final Class<K> keyType;
    private transient K[] keyUniverse;
    private transient Object[] vals;
    private transient int size = 0;
    ...
    public EnumMap(Class<K> keyType) {
        this.keyType = keyType;
        keyUniverse = getKeyUniverse(keyType);
        vals = new Object[keyUniverse.length];
    }
    ...
}
```

* `private transient Object[] vals`: 해당 부분이 Map의 value를 관리하기 위한 배열이다.

아래는 간단한 예시를 위한 Rank이다.
```java
public enum Rank {

    NOTHING(0, 0),
    FIFTH(5_000, 3),
    FORTH(50_000, 4),
    THIRD(1_500_000, 5),
    SECOND(30_000_000, 5),
    FIRST(2_000_000_000, 6);

    private final int prizeMoney;
    private final int count;

    Rank(int prizeMoney, int count) {
        this.prizeMoney = prizeMoney;
        this.count = count;
    }
}
```

보통 `EnumMap`을 생성하기 위해서는 아래와 같이 사용한다. 

Rank의 지정된 유형을 활용하여 `비어있는 EnumMap`을 생성한다.

```java
Map<Rank, Integer> ranks = new EnumMap<>(Rank.class); // {}
```

혹은 열거형 값을 Key로 가진 Map을 생성하여 전달할 수 있다.

```java
ranks = new EnumMap<>(Map.of(Rank.FIFTH, 1, Rank.SECOND, 2)); // {FIFTH=1, SECOND=2}
```

생성자의 내부 구현을 살펴보면 앞서 언급한 배열을 활용하는 것을 알 수 있다.

```java
public EnumMap(Class<K> keyType) {
    this.keyType = keyType;
    keyUniverse = getKeyUniverse(keyType);
    vals = new Object[keyUniverse.length]; // 배열 초기화
}
```

이제 해당 Map을 사용하기 위한 메서드들을 살펴보았다.

### public V get(Object key)

```java
public class EnumMap<K extends Enum<K>, V> extends AbstractMap<K, V>
    implements java.io.Serializable, Cloneable
{
    ...
    public V get(Object key) {
        return (isValidKey(key) ?
                unmaskNull(vals[((Enum<?>)key).ordinal()]) : null);
    }
    ...
}
```

조회하기 위한 `get()` 메서드이다. 주목해야 할 것은 `vals[((Enum<?>)key).ordinal()]`이다. 앞서 언급한 배열에서 [Enum](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/Enum.html#ordinal())의 `ordinal()`이라는 메서드를 활용하여 배열에 접근하고 있다.

::: tip ordinal()

Returns the ordinal of this enumeration constant (its position in its enum declaration, where the initial constant is assigned an ordinal of zero). Most programmers will have no use for this method. It is designed for use by sophisticated enum-based data structures, such as EnumSet and EnumMap.

**이 열거 상수의 서수(처음 상수가 0인 열거 선언에서 해당 위치)를 반환한다. 대부분의 프로그래머들은 이 방법을 사용하지 않을 것이다. EnumSet 및 EnumMap과 같은 정교한 열거 기반 데이터 구조에서 사용하도록 설계되었다.**

:::

### public V put(K key, V value)

```java
public class EnumMap<K extends Enum<K>, V> extends AbstractMap<K, V>
    implements java.io.Serializable, Cloneable
{
    ...
    public V put(K key, V value) {
        typeCheck(key);

        int index = key.ordinal();
        Object oldValue = vals[index];
        vals[index] = maskNull(value);
        if (oldValue == null)
            size++;
        return unmaskNull(oldValue);
    }
    ...
}
```

put도 마찬가지로 배열에 값을 넣는 식으로 구현되어 있다.

## 열거형 맵은 키의 자연스러운 순서(열거형 상수가 선언되는 순서)로 유지된다

실험을 위해 무작위한 순서대로 넣어 생성한 뒤 단순 출력을 진행하였다.

```java
Map<Rank, Integer> ranks = new EnumMap<>(
        Map.of(
            Rank.FIRST, 1,
            Rank.SECOND, 2,
            Rank.NOTHING, 10,
            Rank.FIFTH, 5)
);

for (Rank rank : ranks.keySet()) {
    System.out.println("key -> " + rank + " value -> " + ranks.get(rank));
}
```

```
key -> NOTHING value -> 10
key -> FIFTH value -> 5
key -> SECOND value -> 2
key -> FIRST value -> 1
```

key의 순서는 NOTHING, FIFTH, SECOND, FIRST 순이다. 이것은 enum에서 생성한 순서를 그대로 유지하고 있다.

## 정리

EnumMap은 열거 타입을 키로 사용하도록 설계하였고 내부적으로 배열을 사용하기 때문에 일반적으로 빠른 Map 구현체이다. 만약 Enum을 key로 활용한 구조가 필요하다면 EnumMap을 사용하면 된다.

또한 이펙티브 자바 아이템 37에서는 `ordinal 인덱싱 대신 EnumMap을 사용하라`라고 언급했다. 앞서 언급한 것 처럼 ordinal은 개발자를 위한 것이 아닌 `EnumMap`, `EnumSet`에서 사용하기 위한 메서드이다. 억지로 사용하기 보다 잘 제공된 Collections Framework를 사용하는 편이 났다.

## References

[EnumMap](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/EnumMap.html)

<TagLinks />