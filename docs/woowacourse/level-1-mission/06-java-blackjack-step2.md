---
title: 06. 2단계 - 블랙잭(베팅)
tags: ['우아한테크코스', '미션']
date: 2022-03-21 20:30:00
feed:
  enable: true
---

# 06. 2단계 - 블랙잭(베팅)

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/152970395-a31c8134-fc89-449f-b4dc-441e03df929c.png />

## 목표

우아한테크코스에서 진행한 미션의 리뷰와 피드백에 대해 정리한다. 실제 리뷰는 [[2단계 - 블랙잭(베팅)] 매트(최기현) 미션 제출합니다.](https://github.com/woowacourse/java-blackjack/pull/326)에서 확인할 수 있다.

## 06. 2단계 - 블랙잭(베팅) 리뷰 확인

## System.lineSeparator()

::: tip 리뷰 중 일부

럿고: `System.lineSeparator()` 이걸 한번 알아보면 어떠신가요?

:::

`System.lineSeparator()`은 `JDK 1.7`부터 제공되며 프로그램이 실행되는 OS에 따라 적합한 개행 문자를 리턴해주는 것을 확인했다. Java에서 이러한 메서드를 제공하는 이유는 윈도우`(\r\n)`, 맥`(\r)`, 유닉스`(\n)`과 같은 운영체제 별로 개행문자를 다르게 해석하기 때문이라고 생각된다.

더 나아가 자동으로 개행을 작성해주는 `System.out.println()` 메서드의 내부도 살펴보았다. 내부 로직을 따라가다 보면 `newLine` 부분에서 `System.lineSeparator()`을 활용하여 줄바꿈을 진행하는 것을 확인했다.

```java
public class PrintStream extends FilterOutputStream
    implements Appendable, Closeable
{
    ...
    public void println(String x) {
        synchronized (this) {
            print(x);
            newLine(); // <- 클릭
        }
    }
    ...
}
```

```java
public class PrintStream extends FilterOutputStream
    implements Appendable, Closeable
{
    ...
    private void newLine() {
        try {
            synchronized (this) {
                ensureOpen();
                textOut.newLine(); // <- 클릭
                textOut.flushBuffer();
                charOut.flushBuffer();
                if (autoFlush)
                    out.flush();
            }
        }
        catch (InterruptedIOException x) {
            Thread.currentThread().interrupt();
        }
        catch (IOException x) {
            trouble = true;
        }
    }
    ...
}
```

```java
public class BufferedWriter extends Writer {
    ...
    public void newLine() throws IOException {
        write(System.lineSeparator()); // 사용되는 것을 확인
    }
    ...
}
```

## findFirst() vs findAny()

::: tip 리뷰 중 일부

`럿고`: findFirst()가 더 맞지 않을까요?

:::

Stream에서 어떤 조건에 일치하는 요소를 1개 찾을 때 `findFirst()`, `findAny()`와 같은 API를 사용할 수 있다. 가장 큰 차이는 `병렬 처리`할 때 이다.

### findFirst()

`findFirst()`는 여러 요소가 조건에 부합해도 Stream의 순서를 고려하여 가장 처음 부합하는 요소를 리턴한다.

### findAny()

`findAny()`는 멀티스레드에서 Stream을 처리할 때 가장 먼저 찾는 요소를 리턴한다. 즉 Stream의 순서를 고려하지 않는다.

## BigDecimal을 사용한 BettingMoney

::: tip 리뷰 중 일부

`럿고`: BigDecimal을 선택하신 이유가 있나요?

:::

::: tip 리뷰 중 일부

`매트`: 배팅 머니라서 돈이라는 도메인을 다루기 위해 BigDecimal을 사용하였습니다. Java에서 실수는 기본적으로 `부동 소수점 방식`을 활용하기 때문에 `연산 시 정확한 답을 보장하지 않는다`고 학습한 경험이 있습니다. 다양한 승리 조건에 따라 1.5, 1, 0 등을 곱해야 하기 때문에 단순히 double로 연산하게 될 경우 소중한 돈이 변경될 것을 우려하여 BigDecimal을 사용하였습니다! 

:::

::: tip 리뷰 중 일부

`럿고`: 좋은 근거입니다~ 👍

:::

이전 미션에서 금액을 다루는 도메인에 대한 리뷰를 진행할 때 BigDecimal에 대한 키워드들을 들을 수 있었다. 이번 미션에서도 비슷하게 베팅 머니인 돈과 관련된 도메인이 등장하게 되었고 이전에 학습한 것을 기반으로 적용하게 되었다.

```java
public class BettingMoney {

    private static final int MONEY_SCALE = 0;
    private static final int MONEY_LENGTH = 4;
    private static final String MONEY_DIVIDE_STANDARD = "000";

    public static final BettingMoney ZERO = new BettingMoney(BigDecimal.ZERO);

    private final BigDecimal amount;

    private BettingMoney(BigDecimal bigDecimal) {
        this.amount = bigDecimal.setScale(MONEY_SCALE, RoundingMode.FLOOR);
    }

    public static BettingMoney of(String amount) {
        validateLength(amount);
        validateDivide(amount);
        return new BettingMoney(new BigDecimal(amount));
    }

    private static void validateLength(String amount) {
        if (amount.length() < MONEY_LENGTH) {
            throw new IllegalArgumentException("배팅 금액은 1000원 이상입니다.");
        }
    }

    private static void validateDivide(String amount) {
        if (!amount.endsWith(MONEY_DIVIDE_STANDARD)) {
            throw new IllegalArgumentException("배팅 금액은 1000으로 나누어 떨어져야 합니다.");
        }
    }

    public BettingMoney times(double percent) {
        BigDecimal multiplied = BigDecimal.valueOf(percent);
        BigDecimal result = amount.multiply(multiplied);
        return new BettingMoney(result);
    }

    public BettingMoney add(BettingMoney otherBettingMoney) {
        BigDecimal add = amount.add(otherBettingMoney.amount);
        return new BettingMoney(add);
    }

    public String getAmount() {
        return amount.toString();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        BettingMoney that = (BettingMoney) o;
        return Objects.equals(amount.toString(), that.amount.toString());
    }

    @Override
    public int hashCode() {
        return Objects.hash(amount);
    }
}
```

기본적으로 VO로 동작하도록 값이 변하는 연산에는 새롭게 생성하여 반환 처리하였다. 또한 초기 `BettingMoney` 세팅 시 `1000이상이고 1000으로 나누어 떨어지는 상황`을 연출하기 위해 추가적인 검증을 진행하였다. 이러한 생성은 정적 팩토리 메서드 활용 하였다.

정적 팩토리 메서드를 사용한 이유는 외부에서 생성될 때만 해당 검증을 진행하기 위해서이다. 객체 내부에서 사용할 때 해당 검증을 적용할 필요가 없기 때문에 검증을 분리하는 식으로 구현 하였다. 또한 자주 사용 되는 `ZERO`를 상수로 선언하여 이익 계산을 할 때 초기값으로 활용할 수 있도록 작성하였다.

## 객체도 상수가 될 수 있다.

::: tip 리뷰 중 일부

`럿고`: `new Name("딜러");` 자체를 상수로 관리해도 될듯 한데, 혹시 어떻게 생각하실까요?
:::

각 참가자는 이름을 가지고 있다. 이러한 이름은 게임 시작과 동시에 입력된다. 하지만 딜러의 이름은 게임 시작과 동시에 `딜러`로 고정된다. 이러한 딜러는 게임 내내 변하지 않기 때문에 문자열 상수로 처리하였다. 하지만 현재 문자열 이름은 원시값 포장되어 Name 객체로 관리되고 있다. 즉 Name 객체 자체를 상수로 가지고 있어도 무방하다는 것이다. 사소한 차이이지만 다양한 시선에서 생각하는 방법을 확인할 수 있었다.

## 상태 패턴

수업 시간 중에 블랙잭 피드백을 진행했다. 해당 수업에서는 상태 패턴에 관한 내용을 다뤘고 이것을 간단히 학습한 뒤 이번 미션에 적용하였다. 아래는 상태 패턴에 대해 간단히 정리한 것이다.

::: tip 상태 패턴

상태 패턴은 특정 기능을 수행한 뒤 다음 상태를 반환하는 것이다. 동일한 메서드가 상태에 따라 다르게 동작할 수 있도록 별도의 하위 타입으로 구현한다. 같은 기능을 단순히 조건문을 활용할 경우 상태가 추가될 때마다 조건문도 함께 추가된다. 하지만 상태 패턴을 사용하게 될 경우 코드의 복잡도가 증가하지 않고 상태를 추가할 수 있다.

:::

아래는 이번 미션에 실제 적용한 상태 패턴이다. 가지고 있는 카드의 점수를 기반으로 현재 상태를 판단하여 다음 상태를 반환하는 방식으로 구현했다.

### State Interface

필요한 공통 상태를 선언한 인터페이스입니다. 구현할 상태에 변화를 줄 기능을 추상화한다.

```java
public interface State {

    State draw(Card card);

    State stay();

    boolean isRunning();

    boolean isFinished();

    Cards cards();

    double earningRate(State state);
}
```

해당 인터페이스를 기반으로 적절한 상태를 하위 클래스로 만들어 구현 했다. 상태 패턴을 적용한 클래스들의 다이어그램은 아래와 같다.

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/159109492-3677601f-6009-4abd-8d8a-cd13684426ef.png />

모든 상태의 시작이 Ready가 될 수 있도록 나머지 상태는 protected로 외부 생성을 제한하였다.

```java
public class Blackjack extends Finished {

    protected Blackjack(Cards cards) {
        super(cards);
    }
    ...
}
```

또한 중간에 공통 상태(Finished)를 추상 클래스로 묶어 공통적인 행위들을 final로 지정하여 상속 받은 하위 타입이 다시 오버라이딩 할 수 없도록 제한하였다.

```java
public abstract class Finished extends Started {

    protected static final double BLACKJACK_WIN_RATE = 1.5;
    protected static final int WIN_RATE = 1;
    protected static final int TIE_RATE = 0;
    protected static final int LOW_RATE = -1;

    protected Finished(Cards cards) {
        super(cards);
    }

    @Override
    public final State draw(Card card) {
        throw new IllegalStateException("카드를 뽑을 수 없는 상태입니다.");
    }

    @Override
    public final State stay() {
        throw new IllegalStateException("스테이 상태로 변경할 수 없습니다.");
    }

    @Override
    public final boolean isRunning() {
        return false;
    }

    @Override
    public final boolean isFinished() {
        return true;
    }
}
```

## Collections.emptyList() vs new List Instance

::: tip 리뷰 중 일부

`럿고`: `this(Collections.emptyList());` 이런식으로 작성이 불가능 할까요?

:::

`Collections.emptyList()`와 `new ArrayList<>()`의 핵심 차이점은 불변성이다. `Collections.emptyList()`는 수정할 수 없는 목록을 반환한다. 또한 이름에서 비어있는 리스트를 표현하고 있기 때문에 의도를 잘 표현하고 있다. 즉 더 좋은 가독성을 가지고 있다.

## References

[Java Stream - findAny()와 findFirst()의 차이점](https://codechacha.com/ko/java8-stream-difference-findany-findfirst/)<br>
[상태 패턴(State Pattern)을 사용해보자](https://tecoble.techcourse.co.kr/post/2021-04-26-state-pattern/)<br>
[Collections.emptyList() vs. New List Instance](https://www.baeldung.com/java-collections-emptylist-new-list)

<TagLinks />