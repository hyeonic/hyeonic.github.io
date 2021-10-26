---
title: ArrayList
tags: ['java', 'ArrayList']
---

# ArrayList

**OpenJdk azul-11을 기반으로 작성하였습니다. 오개념이나 잘못된 부분이 있으면 dev.hyeonic@gmail.com로 많은 피드백 부탁드립니다!**

## ArrayList란?

 * `ArrayList`는 `동적 크기의 요소 모음`을 저장하기 위해 사용한다. 크기는 고정된 배열과 달라서 ArrayList는 새 요소가 추가될 때 `자동으로 크기를 늘린다`. Java Collections framwork의 일부이고 List 인터페이스의 구현체이다.
 * ArrayList는 `내부적으로 배열을 사용하여 요소를 저장`한다. 배열과 마찬가지로 `인덱스로 요소 검색`이 가능하다. 

정리하면 `ArrayList`는 `크기를 조정할 수 있는 배열`이다.

## 배열(array)과 ArrayList의 차이
 
 * `배열`의 크기는 `고정`되어 있지만 `ArrayList`의 사이즈는 `동적인 배열`이다.
 * `배열`은 `primitive type과 Object`를 모두 담을 수 있지만 `ArrayList`는 `Object`만 담을 수 있다.
 * 배열은 제네릭을 사용할 수 없지만 ArrayList는 타입 안전성을 보장해주는 `제네릭 사용`이 가능하다.
 * 길이에 대해 배열은 length 변수를 쓰고, ArrayList는 `size() 메서드`를 사용한다.
 * 배열은 element를 할당하기 위해 assignment 연산자를 사용하고, ArrayList는 `add()` 메서드를 통해 element를 삽입한다.

## ArrayList의 생성자

ArrayList를 총 3가지의 생성자를 가지고 있다. 아래는 실제 구현한 내부 코드의 일부분을 가져온 것이다.

```java
public class ArrayList<E> extends AbstractList<E>
        implements List<E>, RandomAccess, Cloneable, java.io.Serializable
{
    ...
    private static final int DEFAULT_CAPACITY = 10;

    private static final Object[] EMPTY_ELEMENTDATA = {};

    private static final Object[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA = {};

    transient Object[] elementData; // non-private to simplify nested class access

    private int size;

    public ArrayList(int initialCapacity) {
        if (initialCapacity > 0) {
            this.elementData = new Object[initialCapacity];
        } else if (initialCapacity == 0) {
            this.elementData = EMPTY_ELEMENTDATA;
        } else {
            throw new IllegalArgumentException("Illegal Capacity: "+
                                            initialCapacity);
        }
    }

    public ArrayList() {
        this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;
    }

    public ArrayList(Collection<? extends E> c) {
        Object[] a = c.toArray();
        if ((size = a.length) != 0) {
            if (c.getClass() == ArrayList.class) {
                elementData = a;
            } else {
                elementData = Arrays.copyOf(a, size, Object[].class);
            }
        } else {
            // replace with empty array.
            elementData = EMPTY_ELEMENTDATA;
        }
    }
    ...
}
```

 * `public ArrayList(int initialCapacity)`: 배열의 초기 용량을 매개변수로 받는 생성자이다.
 * `public ArrayList()`: 아무것도 받지 않는 기본 생성자이다. 빈 배열을 생성한다.
 * `public ArrayList(Collection<? extends E> c)`: Collection 타입을 매개변수로 받는 생성자이다.

## 동적으로 사이즈가 늘어나는 과정

ArrayList의 add() 메서드를 살펴보며 동작 과정을 살펴보았다.

```java
public class ArrayList<E> extends AbstractList<E>
        implements List<E>, RandomAccess, Cloneable, java.io.Serializable
{
    ...
    private void add(E e, Object[] elementData, int s) { // 2)
        if (s == elementData.length)
            elementData = grow();
        elementData[s] = e;
        size = s + 1;
    }

    public boolean add(E e) { // 1)
        modCount++; // 변경된 횟수 카운트
        add(e, elementData, size); // 2) 메서드 호출
        return true;
    }
    ...
}
```

1) `public boolean add(E e)`: add 메서드 실행 시 호출되는 `public` 메서드이다. `private void add(E e, Object[] elementData, int s)`를 호출하다.
2) `private void add(E e, Object[] elementData, int s)`: 실질적으로 값이 추가되는 부분이다. `현재 size와 배열의 length가 같다면` `grow` 메서드를 호출한다.

```java
public class ArrayList<E> extends AbstractList<E>
        implements List<E>, RandomAccess, Cloneable, java.io.Serializable
{
    ...
    private Object[] grow(int minCapacity) { // 2)
        return elementData = Arrays.copyOf(elementData,
                                           newCapacity(minCapacity));
    }

    private Object[] grow() { // 1)
        return grow(size + 1);
    }

    private int newCapacity(int minCapacity) { // 3)
        // overflow-conscious code
        // 기존 용량이다.
        int oldCapacity = elementData.length;
        // 기존 용량 + 기존 용량 / 2를 의미한다. 쉬프트 연산을 사용하였다.
        int newCapacity = oldCapacity + (oldCapacity >> 1);
        if (newCapacity - minCapacity <= 0) {
            // elementData가 비어있는 경우
            if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA)
                // DEFAULT_CAPACITY(10)과 minCapacity 중 큰 값을 반환한다.
                return Math.max(DEFAULT_CAPACITY, minCapacity);
            if (minCapacity < 0) // overflow
                throw new OutOfMemoryError();
            return minCapacity;
        }
        return (newCapacity - MAX_ARRAY_SIZE <= 0)
            ? newCapacity
            : hugeCapacity(minCapacity);
    }

    private static int hugeCapacity(int minCapacity) {
        if (minCapacity < 0) // overflow
            throw new OutOfMemoryError();
        return (minCapacity > MAX_ARRAY_SIZE)
            ? Integer.MAX_VALUE
            : MAX_ARRAY_SIZE;
    }    
    ...
}
```

1) `private Object[] grow()`: `private int newCapacity(int minCapacity)`로 `size + 1`을 전달한다.
2) `private Object[] grow(int minCapacity)`: new Capacity만큼 늘어난 배열에 복사한다.
3) `private int newCapacity(int minCapacity)`: 새로운 용량을 정하는 부분이다. 핵심은 만약 비어있는 배열인 경우 초기 배열의 크기를 `10`으로 지정해준다.

정리하면 결국 `new ArrayList<>()`를 활용하여 생성할 경우 내부 배열의 초기 용량은 `10`이 된다. 만약 용량 보다 더 많은 요소를 추가할 경우 `기본 용량 + 기존 용량 / 2`만큼 배열의 크기를 확보하여 복사한다.

## References

[What is the difference between an array and an array list?](https://www.quora.com/What-is-the-difference-between-an-array-and-an-array-list#:~:targetText=First%20and%20Major%20difference%20between%20Array%20and%20ArrayList%20in%20Java,primitives%20and%20Objects%20in%20Java.)

<TagLinks />