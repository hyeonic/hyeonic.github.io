---
title: HashSet
tags: ['java', 'HashSet']
---

# HashSet

**OpenJdk azul-11을 기반으로 작성하였습니다. 오개념이나 잘못된 부분이 있으면 dev.hyeonic@gmail.com로 많은 피드백 부탁드립니다!**

## Set 이란?

Java의 `Set`은 `java.util` 패키지에 `인터페이스`로 해당 인터페이스를 구현한 클래스들은 다음과 같은 특징을 만족해야 한다.

 1. 요소의 `저장 순서를 유지 하지 않는다`.
 2. 같은 요소의 `중복 저장을 허용하지 않는다`.

정리하면 Set 인터페이스는 `수학적 집합 추상화`를 모델링한 것이다.

## HashSet 이란?

`HashSet` 클래스는 `Set` 인터페이스를 구현한 `구현체`로 `해시 테이블`를 활용하여 지원된다. 또한 요소들을 저장한 순서가 유지 되지 않고 null 값의 저장이 가능하다. 하지만 set의 특성을 가지고 있기 때문에 하나의 null만이 저장 가능하다. 

Set은 보통 `비선형 구조`를 이루고 있기 때문에 인덱스가 존재하지 않는다. 그렇기 때문에 값을 추가하거나 삭제할 때 해당하는 값이 `Set에 존재하는지 검색한 뒤` 이후 작업을 진행한다.

::: tip
만약 요소의 저장 순서를 유지해야 한다면 LinkedHashSet 클래스를 사용해야 한다.
:::

## 요소의 비교

`HashSet`은 새로운 객체를 저장하기 전에 먼저 객체에 선언된 `hashCode()` 메소드를 호출하여 저장된 객체들의 `해시 코드`와 비교하여 같은 해시 코드가 있다면 `equals()` 메서드로 두 객체를 비교한다. `true`가 나오면 동일한 객체라 판단하고 `저장하지 않는다`. 

## HashSet의 사용

`HashSet`은 기본적으로 `HashMap`을 활용한 부분이 많다. `HashSet`의 동작구조를 알기 위해서는 HashMap에 대한 동작구조를 이해해야 한다. 해당 게시글에서는 `HashSet`에 대한 간단한 동작 구조만 살펴볼 예정이다.

### 생성자

```java
public class HashSet<E>
    extends AbstractSet<E>
    implements Set<E>, Cloneable, java.io.Serializable
{
    ...

    private transient HashMap<E,Object> map;
    private static final Object PRESENT = new Object();

    ...

    public HashSet() {
        map = new HashMap<>();
    }

    public HashSet(Collection<? extends E> c) {
        map = new HashMap<>(Math.max((int) (c.size()/.75f) + 1, 16));
        addAll(c);
    }

    public HashSet(int initialCapacity, float loadFactor) {
        map = new HashMap<>(initialCapacity, loadFactor);
    }

    public HashSet(int initialCapacity) {
        map = new HashMap<>(initialCapacity);
    }

    ...
}
```

 * `public HashSet()`: 기본 생성자이다. `HashMap`을 기본 생성하게 되면 `capacity(16)`, `load factor(0.75)`의 값을 초기값으로 설정하여 생성한다.
 * `public HashSet(Collection<? extends E> c)`: `Collection` 타입을 매개변수로 받는 생성자이다. HashMap은 기본 `load factor(0.75)`와 지정된 `Collection`의 요소를 포함하기에 충분한 초기 용량을 설정하여 생성된다.
 * `public HashSet(int initialCapacity, float loadFactor)`: 비어있는 Set을 생성하기 위한 생성자이다. 해당 매개변수는 `HashMap`을 생성할 때 사용된다.
 * `public HashSet(int initialCapacity)`: 비어있는 Set을 생성한다. 해당 매개변수는 `HashMap`을 생성할 때 사용된다. 기본 laod factor는 0.75이다.

### 요소 추가

```java
public class HashSet<E>
    extends AbstractSet<E>
    implements Set<E>, Cloneable, java.io.Serializable
{
    ...

    public boolean add(E e) {
        return map.put(e, PRESENT)==null;
    }

    ...
}
```

 * `public add(E e)`: 입력되는 값이 `HashSet` 내부에 존재하지 않으면 요소를 추가하고 `true`를 반환한다. 내부에 요소가 존재하면 `false`를 반환한다. HashMap은 기본적으로 저장공간보다 많은 값이 추가로 들어오면 저장용량을 `약 두배`로 늘린다. HashSet은 이러한 HashMap을 사용하기 때문에 동일하다.

```java
HashSet<Integer> hashSet = new HashSet<>();
hashSet.add(1); // true
hashSet.add(2); // true
hashSet.add(3); // true
hashSet.add(3); // false
```

### 요소 삭제

```java
public class HashSet<E>
    extends AbstractSet<E>
    implements Set<E>, Cloneable, java.io.Serializable
{
    ...
    
    public boolean remove(Object o) {
        return map.remove(o)==PRESENT;
    }

    public void clear() {
        map.clear();
    }

    ...
}
```

 * `public boolean remove(Object o)`: 매개변수로 받은 객체가 존재하면 지우고 true를 반환한다. 존재하지 않다면 false를 반환한다.
 * `public void clear()`: 존재하는 모든 요소를 제거한다.

```java
HashSet<Integer> hashSet = new HashSet<>(Arrays.asList(1, 2, 3));
hashSet.remove(3); 
hashSet.clear();
```

### 집합 크기 구하기

```java
public class HashSet<E>
    extends AbstractSet<E>
    implements Set<E>, Cloneable, java.io.Serializable
{
    ...
    
    public int size() {
        return map.size();
    }

    ...
}
```

 * `public int size()`: 집합의 요소 수를 반환한다.

```java
HashSet<Integer> hashSet = new HashSet<>(Arrays.asList(1, 2, 3));
System.out.println(hashSet.size()); // 3
```

### 요소 검색

```java
public class HashSet<E>
    extends AbstractSet<E>
    implements Set<E>, Cloneable, java.io.Serializable
{
    ...
    
    public boolean contains(Object o) {
        return map.containsKey(o);
    }

    ...
}
```

 * `public boolean contains(Object o)`: 이 집합에 지정된 요소가 포함되어 있으면 `true`를 반환한다.

```java
HashSet<Integer> hashSet = new HashSet<>(Arrays.asList(1, 2, 3));
System.out.println(hashSet.contains(3)); // true
```

## References
[Interface Set](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/Set.html)<br>
[Class HashSet](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/HashSet.html)<br>
[[Java] 자바 HashSet 사용법 & 예제 총정리](https://coding-factory.tistory.com/554)<br>

<TagLinks />