---
title: magic number, masic literal
tags: ['Java', 'magic number', 'magic literal', '매직 넘버', '매직 리터럴']
---

# magic number, masic literal

`매직 넘버(magic number)`, `매직 리터럴(magic literal)` 이란 소스 코드에서 의미를 가진 숫자나 문자를 그대로 표현한 것을 말한다. 

이러한 표현은 소스 코드를 읽기 어렵게 만든다. 상수로 선언되어 있지 않은 숫자, 문자열은 무엇을 의미하는지 확신할 수 없게 만든다. 이러한 의미를 파악하기 위해 해당 클래스와 흐름을 이해하기 위해 많은 시간을 요구한다. 

`상수(static final)`로 선언하게 되면 이러한 값들에게 `이름이 부여`된다. 이름을 통하여 `의미와 역할`을 확실히 전달할 수 있다.

아래는 [What is a magic number, and why is it bad?](https://stackoverflow.com/questions/47882/what-is-a-magic-number-and-why-is-it-bad)의 예제를 인용한 것이다.

아래 코드는 매직 넘버가 사용된 예시이다.
```java
public class Foo {
    public void setPassword(String password) {
         // don't do this
         if (password.length() > 7) {
              throw new InvalidArgumentException("password");
         }
    }
}
```

위 코드는 아래와 같이 리팩토링 되어야 한다.
```java
public class Foo {
    public static final int MAX_PASSWORD_SIZE = 7;

    public void setPassword(String password) {
         if (password.length() > MAX_PASSWORD_SIZE) {
              throw new InvalidArgumentException("password");
         }
    }
}
```

이러한 리팩토링은 코드의 `가독성이 향상`되고 `유지 관리`가 더 쉽게 만들 수 있다.

## References
[magic number 사용을 최대한 자제하자.](https://slipp.net/questions/356)<br>
[What is a magic number, and why is it bad?](https://stackoverflow.com/questions/47882/what-is-a-magic-number-and-why-is-it-bad)<br>
[1. 의미가 불분명한 매직 넘버를 상수로 선언하라.](https://javabom.tistory.com/28)

<TagLinks />