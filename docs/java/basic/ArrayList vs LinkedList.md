---
title: ArrayList vs LinkedList
tags: ['Java', 'ArrayList', 'LinkedList']
---

# ArrayList vs LinkedList

**OpenJdk azul-11을 기반으로 작성하였습니다. 오개념이나 잘못된 부분이 있으면 dev.hyeonic@gmail.com로 많은 피드백 부탁드립니다!**

## List

배열은 크기가 정해져 있다. 배열의 크기를 10개로 정했다면 10개 이상의 값을 담을 수는 없다.

```java
int[] array = new int[10];
```

만약 개발 도중 크기를 알 수 없는 상황에서 동적으로 자료형의 갯수를 사용해야 하는 상황이라면 배열은 올바른 선택지가 이닐 것이다. 

Java에는 `Collection` 인터페이스를 상속한 `List` 인터페이스가 존재한다. `List`는 배열보다 편리하게 요소를 추가하거나 삭제하는 등 더 많은 기능을 가지고 있다. 위와 같은 상황에서는 List의 사용이 적절한 선택지가 될 수 있다.

이러한 `List` 인터페이스를 구현한 구현체는 아래와 같다.

<p>
    <img src=https://user-images.githubusercontent.com/59357153/136759522-06dce910-93f4-4f11-9764-23b952918562.png>
</p>

```java
List<Integer> arrayList = new ArrayLis<>();
List<Integer> linkedList = new LinkedList<>();
List<Integer> vector = new Vector<>();
```

그중 대표적으로 사용하는 `ArrayList`와 `LinkedList`의 차이와 적절한 상황에서 어떤 것을 선택하여 사용해야 할지 정리한다.

## ArrayList

`ArrayList`는 이름에서 알 수 있듯 중복을 허용하고 index로 요소에 접근하고 관리한다는 점에서 `배열`과 매우 유사하다. 최초에 배열의 크기는 고정되지만 배열의 크기보다 많이 요소를 추가할 경우 더 큰 용량의 배열을 생성하여 값을 옮기는 작업을 추가적으로 수행한다.

### ArrayList의 생성자

ArrayList를 총 3가지의 생성자를 가지고 있다. 아래는 실제 구현한 내부 코드의 일부분을 가져온 것이다.

```java
public class ArrayList<E> extends AbstractList<E>
        implements List<E>, RandomAccess, Cloneable, java.io.Serializable
{

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
 * `public ArrayList()`: 아무것도 받지 않는 기본 생성자이다.
 * `public ArrayList(Collection<? extends E> c)`: Collection 타입을 매개변수로 받는 생성자이다.

`Collection` 타입의 매개변수를 제외하면 보통 배열의 초기 용량은 10으로 설정된다.

```java
private static final int DEFAULT_CAPACITY = 10;
```

### 용량 초과!

지정된 용량을 초과하여 저장하는 경우를 확인하기 위해 `add` 메서드를 확인하였다.

아래는 add를 진행할 경우 용량이 늘어나는 과정을 확인하기 위한 내부 코드이다.

```java
public class ArrayList<E> extends AbstractList<E>
        implements List<E>, RandomAccess, Cloneable, java.io.Serializable
{

    private void add(E e, Object[] elementData, int s) {
        if (s == elementData.length)
            elementData = grow();
        elementData[s] = e;
        size = s + 1;
    }

    public boolean add(E e) {
        modCount++;
        add(e, elementData, size);
        return true;
    }

    private Object[] grow(int minCapacity) {
        return elementData = Arrays.copyOf(elementData,
                                           newCapacity(minCapacity));
    }

    private Object[] grow() {
        return grow(size + 1);
    }

    private int newCapacity(int minCapacity) {
        // overflow-conscious code
        int oldCapacity = elementData.length;
        int newCapacity = oldCapacity + (oldCapacity >> 1);
        if (newCapacity - minCapacity <= 0) {
            if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA)
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

이제 내부 구현을 차근차근 따라가며 살펴보았다.

```java
private void add(E e, Object[] elementData, int s) {
    if (s == elementData.length)
        elementData = grow();
    elementData[s] = e;
    size = s + 1;
}

public boolean add(E e) {
    modCount++;
    add(e, elementData, size);
    return true;
}
```

`public boolean add(E e)`을 활용하여 add를 진행할 경우 `private void add(E e, Object[] elementData, int s)`가 호출된다. `s == elementData.length`인 경우 `grow()` 메서드를 호출한다.

```java
private Object[] grow(int minCapacity) {
    return elementData = 
        Arrays.copyOf(elementData, newCapacity(minCapacity));
}

private Object[] grow() {
    return grow(size + 1);
}
```

grow 메서드는 size의 크기를 + 1하여 매개변수로 전달한다. 전달된 `minCapacity`는 `newCapacity()` 메서드로 전달된다.

::: tip
Returns a capacity at least as large as the given minimum capacity. Returns the current capacity increased by 50% if that suffices.
Will not return a capacity greater than MAX_ARRAY_SIZE unless the given minimum capacity is greater than MAX_ARRAY_SIZE.
:::

```java
private int newCapacity(int minCapacity) {
    // overflow-conscious code
    int oldCapacity = elementData.length;
    int newCapacity = oldCapacity + (oldCapacity >> 1);
    if (newCapacity - minCapacity <= 0) {
        if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA)
            return Math.max(DEFAULT_CAPACITY, minCapacity);
        if (minCapacity < 0) // overflow
            throw new OutOfMemoryError();
        return minCapacity;
    }
    return (newCapacity - MAX_ARRAY_SIZE <= 0)
        ? newCapacity
        : hugeCapacity(minCapacity);
}
```

용량이 실제로 늘어나는 부분은 `newCapacity()`이다. `int newCapacity = oldCapacity + (oldCapacity >> 1);`로 새롭게 용량을 늘려 `Arrays.copyOf()`로 전달한다. 용량이 적절하다면` Arrays.copyOf`를 통해 배열이 새롭게 생성되고 값은 복사된다.

::: warning
해당 부분은 Jdk나 Java의 버전에 따라 다르게 구현되어 있을 수 있습니다!
:::

### ArrayList 특징

ArrayList는 내부에 배열을 기반으로 편리한 기능들을 추가하였기 때문에 배열의 특징을 상당 부분 가지고 있다. 

 * `add(E e)`: 단순히 요소를 추가하는 경우
    * 용량을 초과하여 추가하지 않는 것은 빠르게 수행이 가능하다. 용량이 초과될 때는 배열이 새롭게 생성되어 복사가 이루어진다.

 * `add(int index, E element)`: 특정 인덱스에 요소를 추가하는 경우
    * 요소들이 연속하여 저장되어 있다. 만약 중간에 데이터가 추가된다면 추가된 데이터 이후로 모든 요소들을 한칸씩 미뤄야 한다. 결국 대부분의 요소를 옮기는 추가적인 시간이 소요된다.

 * `remove(int index)`: 특정 인덱스를 삭제하는 경우
    * 중간에 위치한 요소를 삭제하는 경우 빈 공간을 매꾸기 위한 과정이 필요하다. 결국 마지막 요소의 삭제를 제외하고는 요소를 옮기는 추가적인 시간이 소요된다.

 * `get(int index)`: 특정 인덱스를 검색하는 경우
    * 배열의 가장 큰 장점이다. 특정 인덱스에 빠르게 접근하여 값을 가져올 수 있다. 

### 간단 요약

::: tip
탐색에는 매우 유리하다. 순차적인 추가 삭제는 빠르게 이루어진다. 끝 요소 삭제를 제외하면 요소의 이동을 위한 추가적인 연산이 요구된다.
:::

## LinkedList

`LinkedList`는 내부적으로 `양방향 연결 리스트`로 구성되어 있다. 원소를 따라 `순방향` 혹은 `역방향`으로 순회가 가능하다. `LinkedList`는 크기 변경이 불가능하고 중간 인덱스에서 데이터를 삭제 및 추가에 불리한 `배열의 단점`을 `보완`할 수 있는 자료 구조이다.

실제 내부 구현을 살펴보면 `private static class`로 선언한 `Node` 클래스를 사용하는 것을 확인할 수 있었다.

```java
public class LinkedList<E>
    extends AbstractSequentialList<E>
    implements List<E>, Deque<E>, Cloneable, java.io.Serializable
{
    ...
    private static class Node<E> {
        E item;
        Node<E> next;
        Node<E> prev;

        Node(Node<E> prev, E element, Node<E> next) {
            this.item = element;
            this.next = next;
            this.prev = prev;
        }
    }
    ...
}
```

### LinkedList의 생성자

LinkedList는 총 2개의 생성자를 가지고 있다.
```java
public class LinkedList<E>
    extends AbstractSequentialList<E>
    implements List<E>, Deque<E>, Cloneable, java.io.Serializable
{
    ...
    public LinkedList() {
    }
    
    public LinkedList(Collection<? extends E> c) {
        this();
        addAll(c);
    }
    ...
}
```

 * `LinkedList()`: 기본 생성자이다.
 * `LinkedList(Collection<? extends E> c)`: Collection 타입을 매개변수로 받는 생성자이다. 

` ArrayList`와 가장 큰 `차이점`은 초기의 크기를 미리 생성하기 위한 생성자가 없다는 것이다. `LinkedList`는 특성에 맞게 초기의 크기를 미리 지정하지 않아도 된다.

### LinkedList 특징

LinkedList는 양방향 연결 리스트이기 때문에 양쪽에 요소를 추가하거나 삭제할 수 있는 메서드가 마련되어 있다.
 
 * `add(E e)`: 단순의 요소를 추가하는 경우
    * LinkedList는 add 메서드 사용 시 맨 뒤에 요소를 추가한다. 그 밖에도 요소 추가에 다양한 메소드 `addFisrt`, `push`, `offer` 등이 제공되지만 반환 타입이 다르다. 가장 뒤에 요소를 추가하는 것이기 때문에 역방향 탐색이 가능한 LinkedList는 빠르게 요소 처리가 가능하다.

* `add(int index, E element)`: 특정 인덱스에 요소를 추가하는 경우
    * 순차적으로 탐색을 진행하는 시간을 제외하고 탐색에 성공하면 양뱡향으로 연결된 리스트의 특성의 장점을 살려 빠르게 요소 추가가 가능하다. ArrayList처럼 요소를 전부 이동할 필요가 없다.
    * 리스트의 시작과 끝에 추가할 경우 추가적인 탐색을 거치지 않기 때문에 시간 복잡도 `O(1)`로 매우 빠르게 처리가 가능하다.

* `remove(int index)`: 특정 인덱스를 삭제하는 경우
    * 특정 인덱스에 요소를 추가하는 것과 동일하게 단순히 삭제하고 남은 요소끼리 링크를 다시 연결하면 되기 때문에 빠르게 요소 삭제가 가능하다.

* `get(int index)`: 특정 인덱스를 검색하는 경우
    * Head부터 해당 원소 까지 검색을 진행한다. 최악의 경우 시간 복잡도는 `O(N)`이 될 수 있다.
 
### 간단 요약

::: tip
읽기 속도는 ArrayList에 비하여 느리다. 데이터가 많을 수록 읽기 속도는 더욱 느려진다. 시작 요소와 끝 요소의 추가 및 삭제는 빠르게 적용이 가능하다. 중간 요소들의 경우 추가 및 삭제 자체는 빠르지만 해당 요소 탐색을 위한 시간이 소요된다. 추가적으로 배열에 비하여 양방향 연결을 유지하기 위한 메모리를 추가적으로 소모한다.
:::

## 시간 복잡도 비교

| |ArrayList|LinkedList|
|---|---|---|
|add(시작)|O(N)|O(1)|
|add(중간)|O(N)|O(N)|
|add(끝)|O(1)|O(1)|
|remove(시작)|O(N)|O(1)|
|remove(중간)|O(N)|O(N)|
|remove(끝)|O(N)|O(1)|
|get()|O(1)|O(N)|

일반적인 `탐색`을 위주로 사용한다면 `ArrayList`가 더 좋다. `LinkedList`의 경우 시작 혹은 끝에 잦은 추가 및 삭제는 빠르게 처리가 가능하다.

`ArrayList`는 연속된 메모리에 저장된다. `LinkedList`는 링크 연결을 위한 추가적인 메모리가 낭비되고 노드가 연속된 메모리에 저장되는 것을 보장하지 않는다.

## References

[ArrayList: how does the size increase?](https://stackoverflow.com/questions/4450628/arraylist-how-does-the-size-increase)<br>
[[JAVA] ArrayList와 LinkedList의 차이](https://devlog-wjdrbs96.tistory.com/64)<br>

<TagLinks />