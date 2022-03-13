---
title: Chapter04 재사용, 상속보단 조립
tags: ['우아한테크코스', '개발자가 반드시 정복해야 할 객체지향과 디자인 패턴']
date: 2022-03-13 21:00:00
feed:
  enable: true
---

# Chapter04 재사용, 상속보단 조립

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/152970395-a31c8134-fc89-449f-b4dc-441e03df929c.png />

## 목표

개발자가 반드시 정복해야 할 객체 지향과 디자인 패턴 스터디를 진행하며 공부한 내용을 정리한다.

## 1. 상속과 재사용

Java에는 데이터 군을 저장하는 클래스를 표준화한 설계인 `Collections Framework`를 가지고 있다. 이러한 `Collections Framework`는 다수의 데이터를 쉽고 효과적으로 처리할 수 있는 표준화된 방법을 제공한다.

`Collections Framework`는 하위 클래스가 상위 클래스의 기능을 확장하고 있다.

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/158058409-5d36ae94-799a-4793-9483-e9b2715d3a89.png />

상속을 사용하면 쉽게 다른 클래스의 기능을 재사용하면서 기능을 `확장`할 수 있다. 하지만 이러한 상속은 변경의 유연함에서 치명적인 단점을 가지고 있다.

### 1.1 상위 클래스 변경의 어려움

상속은 상위 클래스의 변경을 어렵게 만든다. 상속 계층을 따라 상위 클래스의 변경이 하위 클래스에 영향을 주기 때문에 최악의 경우 모든 하위 클래스에 영향을 줄 수 있다. 즉 상속은 상위 클래스와 하위 클래스 사이의 `강한 결합도`를 만든다.

### 1.2 클래스의 불필요한 증가

유사한 기능 확장 과정에서 클래스의 개수가 불필요하게 증가할 수 있다. Java의 경우 다중 상속을 지원하지 않기 때문에 필요한 기능의 조합이 증가할수록 상속을 통한 재사용은 클래스의 개수 증가로 이어진다.

### 1.3 상속의 오용

이것을 보여주는 가장 좋은 예시는 `Stack`이다. `Stack`은 `Vector` 클래스를 상속하여 기능을 확장하였다. 아래는 실제 Stack의 내부 구현 코드이다.

```java
public class Stack<E> extends Vector<E> {
   
    public Stack() {
    }

    public E push(E item) {
        addElement(item);

        return item;
    }

    public synchronized E pop() {
        E       obj;
        int     len = size();

        obj = peek();
        removeElementAt(len - 1);

        return obj;
    }

    public synchronized E peek() {
        int     len = size();

        if (len == 0)
            throw new EmptyStackException();
        return elementAt(len - 1);
    }

    public boolean empty() {
        return size() == 0;
    }

    public synchronized int search(Object o) {
        int i = lastIndexOf(o);

        if (i >= 0) {
            return size() - i;
        }
        return -1;
    }

    private static final long serialVersionUID = 1224463164541339165L;
}
```

`Stack`은 `LIFO(Last in First Out)` 구조로 `push`를 통해 데이터를 삽입하고 `pop`을 통해 꺼낸다. 하지만 Java의 Stack은 큰 문제점을 가지고 있다. 바로 상속한 Vector에 있는 메서드를 사용할 수 있다는 것이다. Vector는 Array를 기반으로 데이터를 삽입, 삭제, 변경 등의 행위를 유연하게 할 수 있도록 구현된 자료구조이다.

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/158058426-0804c9d7-afb8-4f0d-be5e-d4930cdff322.png />

이것은 Stack의 의도와 다르게 동작한다. 이렇게 상속의 오용이 발생하는 이유는 Stack은 Vector와 Is-A 관계과 성립하지 않기 때문이다. 이렇게 같은 종류가 아닌 클래스의 구현을 재사용하기 위해 상속을 받게 되면 잘못된 사용으로 인한 문제가 생긴다.

## 2. 조합을 이용한 재사용

객체 조합(composition)은 여러 객체를 묶어서 더 복잡한 기능을 제공하는 객체를 만들어낸다. 조합은 보통 다른 객체를 참조하는 방식으로 구현된다. 아래는 당첨 번호를 관리하기 위한 `WinningNumber`이다.

```java
public class WinningNumber {

    private static final String DUPLICATED_WINNING_NUMBER_ERROR_MESSAGE = "로또 번호는 중복될 수 없습니다.";

    private final LottoTicket lottoNumbers;
    private final LottoNumber bonusNumber;

    public WinningNumber(LottoTicket lottoNumbers, LottoNumber bonusNumber) {
        this.lottoNumbers = lottoNumbers;
        validateDuplicateBonusNumber(lottoNumbers, bonusNumber);
        this.bonusNumber = bonusNumber;
    }

    private void validateDuplicateBonusNumber(LottoTicket lottoNumbers, LottoNumber bonusNumber) {
        if (lottoNumbers.contains(bonusNumber)) {
            throw new IllegalArgumentException(DUPLICATED_WINNING_NUMBER_ERROR_MESSAGE);
        }
    }

    public Rank compare(LottoTicket lottoTicket) {
        return Rank.of(lottoNumbers.getSameNumberCount(lottoTicket), lottoTicket.contains(bonusNumber));
    }

    public Set<LottoNumber> getLottoNumbers() {
        return Collections.unmodifiableSet(lottoNumbers.getLottoNumbers());
    }

    public LottoNumber getBonusNumber() {
        return LottoNumber.from(bonusNumber.getLottoNumber());
    }
}
```

WinningNumber는 LottoTicket과 LottoNumber를 필드로 가지며 로또 번호에 대한 다양한 기능을 재사용하고 있다. 이러한 조합은 앞서 언급한 상속을 통한 재사용의 문제를 해소해준다.

또한 이러한 조합 방식은 런타임에 해당 객체를 교체할 수 있다. 상속은 소스 코드를 작성하는 컴파일 시점에 관계가 형성되기 때문에 런타임에 상위 타임을 교체할 수 없다.

정리하면 상속을 사용하다 보면 변경의 관점에서 유연함을 떨어뜨릴 수 있다. 즉 객체 조합을 먼저 고려해야 한다.

### 2.1 위임

위임(delegation)은 내가 할일 을 다른 객체에게 넘기는 것이다. 위 코드를 보면 LottoNumber에게 포함 여부를 물어보며 위임하고 있다.

```java
if (lottoNumbers.contains(bonusNumber)) {
    throw new IllegalArgumentException(DUPLICATED_WINNING_NUMBER_ERROR_MESSAGE);
}
```

이러한 위임은 필드로 정의하지 않아도 된다. 다른 객체에게 내가 할 일을 넘기는 행위 이므로 객체를 새로 생성해서 전달해도 된다.

### 2.2 상속은 언제 사용하나

상속은 명확한 Is-A 관계에서 점진적으로 상위 클래스의 기능을 확장해 나갈 때 사용 할 수 있다.

## References

최범균 지음, 『개발자가 반드시 정복해야 할 객체지향과 디자인 패턴』, 인투북스(2014), p87-102.

<TagLinks />