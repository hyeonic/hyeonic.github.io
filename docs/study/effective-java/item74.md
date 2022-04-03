---
title: 아이템74 - 메서드가 던지는 모든 예외를 문서화하라
tags: ['우아한테크코스', '이펙티브자바']
date: 2022-04-03 16:30:00
feed:
  enable: true
---

# 아이템74 - 메서드가 던지는 모든 예외를 문서화하라

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/152970395-a31c8134-fc89-449f-b4dc-441e03df929c.png />

## 목표

이펙티브 자바 스터디를 진행하며 공부한 내용을 정리한다. 

## 메서드가 던지는 예외

메서드가 던지는 예외는 해당 메서드를 올바르게 사용하는데 아주 중요한 정보이다. 그렇기 때문에 각 메서드를 사용하는 클라이언트를 위해 던지는 예외를 문서화하는데 충분한 시간을 투자해야 한다.

### Checked Exception

**`Checked Exception`은 항상 따로따로 선언하고, 각 예외가 발생하는 상황을 JavaDoc의 `@throws` 태그를 사용하여 정확히 문서화 해야 한다.**

```java
public class CheckedExceptionExample {

    /**
     * 어쩌구 저쩌구
     *
     * @param arg
     * @throws SQLException
     */
    public void some(String arg) throws SQLException {
        throw new SQLException();
    }
}
```

이러한 `Checked Exception`은 공통적인 상위 클래스로 선언하는 것은 좋지 않다. `Checked Exception`을 만들기 위해서는 `Exception` 클래스를 상속해야 한다. 즉 `Checked Exception`의 모든 `상위 클래스`는 `Exception`에 해당한다.

아래는 설명은 위한 간단한 예시이다.
```java
public class CheckedExceptionExample {

    /**
     * 어쩌구 저쩌구
     *
     * @param number
     * @throws Exception
     */
    public void some(int number) throws Exception {

        if (number == 0) {
            throw new SQLException();
        }

        throw new IOException();
    }
}
```

위 처럼 공통적인 Exception을 활용하게 되면 클라이언트 입장에서 정확히 어떠한 예외인지 확인할 수 없다. 또한 다른 예외까지 삼킬 가능성이 있기 때문에 API의 사용성을 크게 떨어뜨린다. 아래와 같이 세분화하야 작성하는 것이 바람직하다.

```java
public class CheckedExceptionExample {

    /**
     * 어쩌구 저쩌구
     *
     * @param number
     * @throws SQLException
     * @throws IOException
     */
    public void some(int number) throws SQLException, IOException {

        if (number == 0) {
            throw new SQLException();
        }

        throw new IOException();
    }
}
```

::: tip main 메서드

이러한 규칙에 유일한 예외는 `main` 메서드이다. `main`은 오직 `JVM(Java Virtual Machine)`이 호출하므로 `Exception`을 선언해도 괜찮다.
 
:::

## Unchecked Exception

Java 언어가 강제하는 것은 아니지만 `Unchecked Exception` 또한 문서화해두는 것이 좋다. 메서드에 이러한 예외를 명시해 두면 사용하는 클라이언트는 해당 오류가 나지 않도록 작성할 것이다. 잘 정비된 예외 문서는 해당 메서드를 성공적으로 수행하기 위한 `전제조건`이 된다.

`인터페이스 메서드`에 `Unchecked Exception을 문서`로 남기는 것은 해당 인터페이스를 구현하는 구현체가 참고할 수 있는 좋은 수단이 된다. 이러한 규약들을 잘 지켜 구현하면 모든 구현체들이 일관된 동작을 보장한다.

**메서드가 던질 수 있는 예외를 각각 @throws 태그로 문서화하되, Unchecked Exception은 메서드 선언의 throws 목록에 넣지 말아야 한다.**

```java
public class UncheckedExceptionExample {

    /**
     * 어쩌구 저쩌구
     *
     * @param dividend
     * @param  divisor
     * @throws ArithmeticException
     */
    public double some(int dividend, int divisor) {
        return dividend / divisor;
    }
}
```

`Checked Exception`은 `Unchecked Exception`과 다르게 반드시 처리해야 하는 예외이므로 클라이언트가 처리해야 할 일이 달라진다. 

JavaDoc 유틸리티는 아래와 같이 시각적으로 구분해준다.
* `Checked Exception`: `메서드 선언부 throws절`에 등장한 예외와 메서드 주석의 `@throws` 태그 동시에 명시한 예외

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/161410380-5a5b0f13-d5b3-465b-bb3a-cf6374b51430.png />

* `Unchecked Exception`: `@throws 태그`에만 명시한 예외

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/161410698-3caf8495-e547-47ec-9465-8a67605b47ec.png />

해당 메서드를 사용하는 클라이언트는 어느 것이 `Unchecked Exception`인지 바로 확인이 가능하다.

## 클래스에 예외 명시

**한 클래스에 정의된 많은 메서드가 같은 이유로 같은 예외를 던진다면 그 예외를 클래스 설명에 추가한다. `NullPointerException`이 가장 큰 예시이다.**

```java
/**
 * 이 클래스의 모든 메서드는 인수로 null이 넘어오면 {@link NullPointerException} 을 던진다.
 */
public class ClassExample {

    public void some() {
        throw new NullPointerException();
    }
}
```

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/161410664-8be58b8c-ebc2-48a1-bdc0-807861756fad.png />

## [번외] JavaDoc 출력

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/161410791-8ae2735e-75c6-44b6-bb77-e5ff4a228d3c.png />

JavaDoc은 JDK와 함께 제공되는 특수한 도구이다. 위와 같이 HTML 형식으로 소스 코드의 코드 문서화를 도와준다. 간단히 JavaDoc 출력을 위한 방법을 알아본다.

모든 실습은 `Mac + IntelliJ`를 기준으로 작성하였다.

### 1. IntelliJ 상단 Tools의 Generate JavaDoc 선택

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/161410970-f7faf6b3-348d-435b-9c93-dc0b84887e62.png />

### 2. Output directory 지정

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/161411007-68ea6f82-04a4-418e-926f-583fd0cfeba4.png />

### 3. 한글 지원을 위한 옵션 지정

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/161411023-5d2ea748-cb5e-4005-a4d5-4b40ccc8f113.png />

* `LoCale`: `ko_KR`
* `Other command line arguments`: `-encoding UTF-8 -charset UTF-8 -docencoding UTF-8`

### 4. OK 클릭!

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/161411090-86f60efd-fd85-4e0d-90c4-078db8039d51.png />

## 정리

`Checked Exception`은 항상 따로따로 선언하고, 각 예외가 발생하는 상황을 `JavaDoc`의 `@throws` 태그를 사용하여 정확히 문서화 한다.

메서드가 던질 수 있는 예외를 각각 `@throws` 태그로 문서화 한다. 다만 `Unchecked Exception`인 경우 `메서드 선언부 throws` 목록에 넣지 말아야 한다.

한 클래스에 정의된 많은 메서드가 동일한 이유로 같은 예외를 던질 때 그 예외를 클래스 설명에 추가하는 방법도 있다.

## References
조슈아 블로크 지음, 개앞맴시(이복연) 옮김, 『이펙티브 자바』, 프로그래밍 인사이트(2020), p402-403. <br>
[Java® Platform, Standard Edition & Java Development Kit
Version 11 API Specification](https://docs.oracle.com/en/java/javase/11/docs/api/index.html)<br>

<TagLinks />
