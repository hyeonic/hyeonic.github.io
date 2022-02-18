---
title: 동일성과 동등성
tags: ['우아한테크코스', '동일성', '동등성']
date: 2022-02-18 17:35:00
feed:
  enable: true
---

# 동일성과 동등성

## 동일성

보통 Java에서 `동일성(identity)`을 나타내는 동일하다는 비교하는 두 객체가 완전히 같은 경우를 의미한다.

아래는 간단한 예시이다. x좌표와 y좌표를 나타내는 `Point` 클래스가 있다고 가정한다.

#### Point  
```java
public class Point {
    private final int x;
    private final int y;

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }
}
```

위 클래스를 활용하여 객체를 생성한 뒤 메모리를 살펴보면 아래와 같이 간단히 표현이 가능하다.

```java
Point point = new Point(2, 3);
```

<CenterImage image-src="https://user-images.githubusercontent.com/59357153/154633888-fccd1624-6fda-4eaa-b272-a2f672785cef.png" />

* 참조 변수인 `point`는 `Stack` 영역에 저장된다.
* `new Point(2, 3)`는 `인스턴스 변수`로 `heap 영역`에 저장된다.
* 참조 타입의 변수들이 실행될 때 마다 `stack 영역`에 쌓여서 비효율적이므로 `heap 영역`에 `실제 데이터를 저장`하고 그 메모리 주소를 `참조하는 변수`에 담아 `stack`에 저장한다.

Java에서 객체는 위와 같은 과정을 거쳐 메모리에 저장된다. 여기서 객체간에 동일성을 판단하는 기준은 `참조하는 변수가 가리키는 주소가 같은 경우`이다.

즉 참조 변수가 `==`를 통해 같다면 동일하다.

```java
class PointTest {
    @Test
    void identity() {
        // given
        Point point1 = new Point(2, 3);
        Point point2 = point1;

        // when
        boolean result = point1 == point2;

        // then
        assertThat(result).isTrue();
    }
}
```

위 테스트는 통과한다. 그림으로 표현하면 아래와 같다.

<CenterImage image-src= https://user-images.githubusercontent.com/59357153/154635964-ace51a59-8dba-44d5-ad0f-2883df23a22d.png />

이때 참조 변수 point1과 point2는 동일하다고 볼 수 있다.

### 기본형 (primitive type)

위 예시는 객체를 기반으로 동일성을 설명하고 있다. Java에는 참조 타입 뿐만 아니라 `기본형(primitive type)`을 가지고 있다. 이러한 기본형은 Stack에 주소를 저장하는 것이 아니라 값 그자체를 저장한다. 때문에 `==` 연산자로 비교하여 같다면 동일하다고 판단한다.

```java
int a = 10;
```

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/154637008-58543c92-1582-4db0-8ca4-5b309f43f3b2.png />

그림으로 표현하면 `int a = 10`은 메모리 상에 위와 같이 저장될 것이다.

## 동등성

`동등성(equals)`은 `두 개의 객체가 같은 정보를 가진 경우` 동등하다고 판단한다. 앞서 비교한 참조 변수가 가리키는 주소가 다르더라도 `실제 객체의 내용이 같으면 두 변수는 동등`하다고 판단한다. 

동등성 판단을 위해서는 `equals 메서드`를 활용해야 한다. equals 메서드는 기본적으로 Object 클래스에 포함되어 있다.

```java
public class Object {
    ...
    public boolean equals(Object obj) {
        return (this == obj);
    }    
    ...
}
```

하지만 위 equals 메서드를 `오버로딩하지 않고 그대로 사용`하면 의도한 대로 동작하지 않을 수 있다. 위와 같이 `==` 연산자를 사용하여 그대로 반환하여 `동일성을 비교한 결과를 반환`하기 때문이다.

```java
class PointTest {
    ...
    @Test
    void equals() {
        // given
        Point point1 = new Point(2, 3);
        Point point2 = new Point(2, 3);

        // when
        boolean result = point1.equals(point2);

        // then
        assertThat(result).isTrue();
    }
}
```

위 테스트 코드는 동등성을 만족하는 듯 보이지만 결과적으로 `실패`한다. 즉 생성한 객체에 추가적인 `equals 오버로딩`을 통해 두 객체가 동등하다는 것을 확인해야 한다.

이러한 `equals 메서드`는 `ide`를 통해 간단히 오버로딩이 가능하다. 아래는 `intellij`에서 제공하는 `Point 클래스의 오버로딩된 equals 메서드`이다.

```java
public class Point {
    private final int x;
    private final int y;
    
    ...
    
    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Point point = (Point)o;
        return x == point.x && y == point.y;
    }
    ...
}
```

이제 앞서 실패한 테스트는 `성공`한다.

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/154642449-b3c6033d-d79b-4458-9302-4520a7dba5fe.png />

## 정리

::: danger

`동일성`과 `동등성`을 만족하기 위한 조건에 대해 알아보았다. 하지만 여기서 주의해야 할 점은 동일성과 동등성에 대한 키워드에 집중하였다.

equals가 언급되면 항상 같이 따라오는 키워드는 hashCode이다. 하지만 두 메서드들을 온전히 만족 시키기 위해서는 추가적인 학습과 조건이 필요하기 때문에 따로 언급하지 않았다.

:::

정리하면 아래와 같다.
* 두 개의 참조 변수가 가리키는 객체의 주소가 같다면 `동일`하다. 이러한 동일성은 `==`를 통해 확인이 가능하다.
* 두 개의 객체 속성이 같으면 `동등`하다. `equals` 메서드를 통해 확인이 가능하다.
* 만약 동등성 비교를 위해 equals 메서드를 오버로딩 없이 사용한다면 기본적으로 `==` 연산자를 사용하기 때문에 동일성 비교와 차이가 없다. 각 객체의 특성에 맞춰 `equals 메서드를 오버로딩` 해야 한다.

<TagLinks />