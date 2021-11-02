---
title: Strategy Pattern
tags: ['design pattern', 'strategy pattern', '전략 패턴']
---

# Strategy Pattern

`전략 패턴`은 실행 중에 알고리즘을 선택할 수 있게 하는 `behavior pattern`이다. 전략 패턴을 구성하는 세 요소는 아래와 같다.

 * 전략 메서드를 가진 전략 객체
 * 전략 객체를 사용하는 컨텍스트(전략 객체의 사용자)
 * 전략 객체를 생성해 컨텍스트에 주입하는 클라이언트(제 3자, 전략 객체의 공급자)

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/139800470-153c7224-03b2-4719-b71a-12d509a6fe0f.png>
</p>

클라이언트는 다양한 전략 중 하나를 선택하여 생성한 뒤 컨텍스트에 주입한다. 

## 예시

개발자는 Linux, MacOS, Windows 등 다양한 OS에서 작업이 가능하다. 만약 외부에서 개발 장비가 주어진 경우 개발자는 주어진 OS에 따라 개발을 진행한다. 

 * 여기서 OS는 전략이 된다.
 * 개발자는 컨텍스트가 된다.
 * 장비를 제공해주는 외부 제 3자는 클라이언트가 된다.

### Strategy

다양한 전략을 공통 방식으로 사용하기 위한 인터페이스이다. 아래 인터페이스를 기반으로 다양한 전략을 구현할 수 있다.

```java
public interface Strategy {

    void runStrategy();
}
```

### StrategyLinux

```java
public class StrategyLinux implements Strategy {

    @Override
    public void runStrategy() {
        System.out.println("Linux를 사용중입니다.");
    }
}
```

### StrategyMacOS

```java
public class StrategyMacOS implements Strategy {

    @Override
    public void runStrategy() {
        System.out.println("MacOS를 사용중입니다.");
    }
}
```

### StrategyWindows

```java
public class StrategyWindows implements Strategy {

    @Override
    public void runStrategy() {
        System.out.println("Windows를 사용중입니다.");
    }
}
```

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/139801110-9042c7bd-9ff8-44d8-9cb9-672318904d1f.png>
</p>

### Developer

이제 전략인 OS를 사용하는 개발자를 구현한다. 개발자는 구성요소의 컨텍스트를 의미한다.

```java
public class Developer {

    void runContext(Strategy strategy) {
        System.out.println("작업 시작");
        strategy.runStrategy();
        System.out.println("작업 종료");
    }
}
```

### Client

이제 OS(전략)를 생성하여 개발자(컨텍스트)에게 지급(주입)해줄 제 3자(클라이언트)를 구현한다.

```java
public class Client {

    public static void main(String[] args) {
        Strategy strategy = null;
        Developer developer = new Developer();

        // 개발자에게 Linux로 개발을 진행하게 한다.
        strategy = new StrategyLinux();
        developer.runContext(strategy);

        System.out.println();

        // 개발자에게 Mac OS로 개발을 진행하게 한다.
        strategy = new StrategyMacOS();
        developer.runContext(strategy);

        System.out.println();

        // 개발자에게 Windows로 개발을 진행하게 한다.
        strategy = new StrategyWindows();
        developer.runContext(strategy);
    }
}
```

```bash
작업 시작
Linux를 사용중입니다.
작업 종료

작업 시작
MacOS를 사용중입니다.
작업 종료

작업 시작
Windows를 사용중입니다.
작업 종료
```

## 정리

전략을 다양하게 변경하며 컨텍스트 실행이 가능하다. 정리하면 `클라이언트가 전략을 생성하여 실행할 컨텍스트에 주입하는 패턴`이다.

## References

[전략 패턴](https://ko.wikipedia.org/wiki/%EC%A0%84%EB%9E%B5_%ED%8C%A8%ED%84%B4)<br>
김종민, 『스프링 입문을 위한 자바 객체지향의 원리와 이해』, 위키북스(2015), p222-227.

<TagLinks />