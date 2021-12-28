---
title: array
tags: ["자료구조", "array"]
---

# array

**Java 기반으로 작성하였습니다. 오개념이나 잘못된 부분이 있으면 dev.hyeonic@gmail.com로 많은 피드백 부탁드립니다!**

## array 이란?

`배열(array)`이란 여러 변수를 하나의 묶음으로 다루는 것이다. 많은 양의 데이터를 저장할 때 손쉽게 다룰 수 있도록 도와준다.

정리하면 `배열은 같은 타입의 여러 변수를 하나의 묶음으로 다루는 것`이다.

## 배열 선언과 생성

### 배열 선언

원하는 타입의 변수를 선언하고 `변수 또는 타입`에 배열임을 의미하는 `대괄호([])`를 붙인다. Java에서는 주로 타입에 대괄호를 붙이는 것이 선호된다.

```java
int[] array; // 선호
int array[];
```

### 배열 생성

배열 선언은 단순히 생성된 배열을 다루기 위한 참조 변수이다. 배열을 생성하기 위해서 `new` 키워드를 활용하여 생성해야 한다.

```java
int[] array = new int[5];
```

생성된 배열은 아래와 같은 그림으로 표현된다.
<CenterImage image-src="https://user-images.githubusercontent.com/59357153/147559474-9c340c0c-c2d3-4a8f-ab34-778eb60e9807.png" />

변수와 달리 배열은 각 저장공간이 `연속적으로 배치`되어 있다.

## 인덱스

배열은 각 저장공간을 `배열의 요소(element)`라고 한다. 해당 요소에 접근하기 위해서는 `index`가 필요하다. index의 범위는 `0 ~ 배열의 길이 - 1`까지 이다.

길이가 5인 경우 `0, 1, 2, 3, 4`로 접근이 가능하다.

```java
array[0] = 10;
array[1] = 20;
array[2] = 30;
array[3] = 40;
array[4] = 50;
```

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/147566276-cecabd37-f55c-4d0d-8377-f5c2ad0b02aa.png />

위 배열의 index 범위는 `0 ~ 4`이다. 이외의 범위로 접근할 경우 `ArrayIndexOutOfBoundsException`이 발생한다.

::: tip 크기가 0인 배열

```java
int[] array = new int[0];
```

크기가 0인 배열도 생성이 가능하다.
:::

## 배열의 길이

Java에서는 `JVM이 모든 배열의 길이를 별도로 관리`한다. `배열이름.length`를 통해 배열의 길이 정보를 얻을 수 있다. 

```java
int length = array.length; // 5
```

배열은 한번 생성하면 길이를 변결할 수 없다. 즉 배열의 길이는 `변하지 않는 상수`다.

## 배열 초기화

배열은 생성과 동시에 타입에 해당하는 기본값으로 초기화된다. 선언과 동시에 특정한 값을 초기화하기 위해서는 아래와 같이 작성하면 된다.

```java
int[] numbers = new int[]{1, 2, 3, 4, 5};
```

또한 `new int[]`를 생략하여 작성할 수 있다. 

```java
int[] numbers = {1, 2, 3, 4, 5};
```

사용자가 직접 만든 클래스도 동일하게 적용이 가능하다.

```java
public class Node {
    private final String name;

    public Node(String name) {
        this.name = name;
    }
}
```

```java
Node[] nodes = new Node[]{new Node("node1"), new Node("node2")};
```

```java
Node[] nodes = {new Node("node1"), new Node("node2")};
```

## 배열 출력

배열을 출력하면 참조 변수에 저장된 주소값이 `타입@주소`의 형태로 출력된다. 이것은 Java 최상위 클래스인 `Object`의 `toString 메서드`를 그대로 사용했기 때문이다.

```java
System.out.println(numbers); // [I@2503dbd3
```

### Object
```java
public class Object {
    ...
    public String toString() {
        return getClass().getName() + "@" + Integer.toHexString(hashCode());
    }
    ...
}
```

각 요소를 출력하기 위해서는 `Arrays.toString()`을 활용한다.
```java
System.out.println(Arrays.toString(numbers)); // [1, 2, 3, 4, 5]
```

## 깊은 복사

깊은 복사란, 복사된 배열이나 원본 배열이 변경될 때 `서로 간의 간섭이 없는 복사`이다. Java에서는 단순 반복문을 활용한 복사를 제외하고 다양한 복사 방법을 제공하고 있다.

### Obejct.clone()

가장 보편적인 복사 방법이다.

```java
int[] cloneNumbers = numbers.clone();
```

### Arrays.copyOf()와 Arrays.copyOfRange()

Arrays 클래스에서 배열 전체 혹은 부분 복사를 위해 `copyOf()`와 `copyOfRange()`를 제공한다.

```java
int[] copyOfNumbers = Arrays.copyOf(numbers, numbers.length);
int[] copyOfRangeNumbers = Arrays.copyOfRange(numbers, 0, numbers.length);
```

### System.arraycopy()

`System` 클래스에서 배열을 복사할 수 있도록 `arraycopy` 메서드를 제공한다. `JNI(Java Netive Interface)`에서 제공하는 메서드이기 때문에 매우 빠르게 최적화가 되어 있다.

```java
int[] systemArraycopyNumbers = new int[numbers.length];
System.arraycopy(numbers, 0, systemArraycopyNumbers, 0, numbers.length);
```

## References
남궁성, 『자바의 정석 3rd Edition』, 도우출판(2016), p182-195.<br>
[[Java] 자바 배열을 복사하는 다양한 방법 (깊은복사, 얕은복사)](https://coding-factory.tistory.com/548)

<TagLinks />