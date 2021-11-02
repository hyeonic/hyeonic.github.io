---
title: final 키워드
tags: ['Java', 'final']
---

# final 키워드

final 키워드는 변수, 메서드, 클래스 등에 사용될 수 있다. 어떤 곳에 사용하느냐에 따라 각각 다른 의미를 가진다. 

## final 클래스(class)
 * 상속이 불가능하다. 즉 하위 클래스를 만들 수 없다.

### Animal

`final` 키워드가 추가된 `Animal` 클래스이다.

```java
public final class Animal {
}
```

### Cat

Animal 클래스를 `extends` 할 경우 컴파일 에러가 발생한다.

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/139867918-4b025f00-5f99-4c4e-b838-72ac62516924.png>
</p>

## final 변수(variable)
 * 상수 표현 시 사용한다. 초기화가 진행 된 이후 값을 수정할 수 없다.

```java
public class FinalVariable {

    final static int staticFinal1 = 1; // (1)
    final static int staticFinal2; // (2)

    final int instanceFinal1 = 1; // (3)
    final int instanceFinal2; // (4)
}
```

(1) 정적 상수이다. 선언과 동시에 `초기화`를 진행하였다. <br>
(2) 정적 상수를 선언만 진행하였다. `컴파일 에러`가 발생한다. <br>
(3) 객체 상수이다. 선언과 동시에 `초기화`를 진행하였다. <br>
(4) 객체 상수를 선언만 진행하였다. `컴파일 에러`가 발생한다. <br>

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/139870447-74e4b708-94d5-4350-a60f-ec73e08f3ddd.png>
</p>

::: tip
정적상수의 경우 `static 블록`에서 초기화가 가능하다. 객체상수 또한 단순 선언 시 `생성자` 혹은 `인스턴스 블록`에서 초기화가 가능하다.

```java
public class FinalVariable {
    static {
        // static 블록
    }

    {
        // 인스턴스 블록
    }
}
```
:::

::: tip const
다른 언어에서 읽기 전용인 상수를 final 키워드 대신 const 키워드를 사용하기도 한다. Java에서 이러한 혼동을 피하기 위해 const 키워드를 등록만 해두고 쓰지 못하게 하고 있다. (not used)
:::

## final 메서드(method)
 * 오버라이딩이 불가능하다. 상속 받았다면 그대로 사용해야 한다.

### Animal

```java
public class Animal {

    final void eat() {
        System.out.println("먹는 중..");
    }
}
```

### Cat

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/139871524-3f81bc04-19d9-4036-af81-f369b8880121.png>
</p>

## final 인자(argument)
 * 메서드의 인자를 선언할 때 사용한다. `final`로 선언된 인자는 메서드 내에서 변경이 불가능하다.

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/139872127-d4d4f79f-fe98-44ec-8f81-ae82dcf5f752.png>
</p>

## References

[Java - Final 키워드에 대한 이해](https://codechacha.com/ko/java-final-keyword/) <br>
김종민, 『스프링 입문을 위한 자바 객체지향의 원리와 이해』, 위키북스(2015), p158-160.

<TagLinks />