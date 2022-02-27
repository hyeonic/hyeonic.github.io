---
title: 아이템05 - 자원을 직접 명시하지 말고 의존 객체 주입을 사용하라
tags: ['우아한테크코스', '이펙티브자바']
date: 2022-02-26 16:00:00
feed:
  enable: true
---

# 아이템05 - 자원을 직접 명시하지 말고 의존 객체 주입을 사용하라

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/152970395-a31c8134-fc89-449f-b4dc-441e03df929c.png />

## 목표

이펙티브 자바 스터디를 진행하며 공부한 내용을 정리한다. 

## 유연하지 못한 정적 유틸리티 클래스

많은 클래스들은 하나 이상의 자원에 의존한다. 이번 로또 미션을 진행하며 로또를 발급하기 위해서는 로또 번호를 생성하기 위한 클래스에 의존해야 한다.

아래는 로또 번호를 자동으로 생성하기 위한 `정적 유틸리티 클래스`이다.

```java
public class AutoLottoNumberGenerator {

    private static final List<Integer> LOTTO_TOTAL_NUMBERS = IntStream.rangeClosed(1, 45)
            .boxed()
            .collect(toList());

    private AutoLottoNumberGenerator() {
    }

    public static List<Integer> generate(int size) {
        List<Integer> lottoTotalNumbers = new ArrayList<>(LOTTO_TOTAL_NUMBERS);
        Collections.shuffle(lottoTotalNumbers);

        return lottoTotalNumbers.stream()
                .limit(size)
                .collect(toList());
    }
}
```

Lotto 클래스는 6자리의 로또 번호 리스트를 가진 일급 컬렉션이다. Lotto를 생성하는 시점에 위에서 작성한 유틸리티 클래스를 활용하여 랜덤으로 번호를 생성한 뒤 활용한다.

```java
public class Lotto {

    private final Set<LottoNumber> lottoNumbers;

    public Lotto() {
        List<Integer> numbers = AutoLottoNumberGenerator.generate(); // 사용
        this.lottoNumbers = numbers.stream()
                .map(LottoNumber::new)
                .collect(toSet());
    }
}
```

```java
public class Lotto {

    private static final int DEFAULT_LOTTO_NUMBERS_SIZE = 6;

    private final Set<LottoNumber> lottoNumbers;

    public Lotto() {
        List<Integer> numbers = AutoLottoNumberGenerator.generate(DEFAULT_LOTTO_NUMBERS_SIZE);
        this.lottoNumbers = numbers.stream()
                .map(LottoNumber::new)
                .collect(toSet());
    }

    public Set<LottoNumber> getLottoNumbers() {
        return Collections.unmodifiableSet(lottoNumbers);
    }
}
```

하지만 위와 같은 방법은 자동 생성을 위한 `AutoLottoNumberGenerator`에만 의존하고 있다. 만약 요구사항이 추가되어 `수동으로 번호를 입력하는 기능`을 추가해야 한다면 `Lotto 클래스를 직접 수정`하여 반영해야 한다. 이것이 의미하는 것은 비즈니스 로직의 핵심 도메인을 수정 해야만 반영이 가능하다는 의미이다.

이렇게 **사용하는 자원에 따라 동작이 달라 지는 클래스에는 정적 유틸리티 클래스나 싱글턴 방식은 적합하지 않다.**

Lotto 클래스는 다양한 `Lotto 생성 전략`을 가질 수 있어야 한다. 이것을 이뤄내기 위해서는 `인스턴스를 생성할 때 생성자에 필요한 자원을 넘겨주는 방식`을 활용해야 한다.

## 의존 객체 주입

이제 위 예제를 생성자를 통해 의존 객체를 주입하는 방식으로 변경하였다. 우선 번호 생성 전략을 구현하기 위한 `LottoNumberGenerator` 인터페이스이다.

```java
@FunctionalInterface
public interface LottoNumberGenerator {

    List<Integer> generate(int size);
}
```

추상 메서드를 오직 1개만 가진 인터페이스이기 때문에 `함수형 인터페이스`로 활용이 가능하다. 이제 해당 인터페이스를 구현하여 자동 생성 기능을 작성한다.

```java
public class AutoLottoNumberGenerator implements LottoNumberGenerator {

    private static final int START_INCLUSIVE = 1;
    private static final int END_INCLUSIVE = 45;
    private static final List<Integer> LOTTO_TOTAL_NUMBERS = IntStream.rangeClosed(START_INCLUSIVE, END_INCLUSIVE)
            .boxed()
            .collect(toList());

    @Override
    public List<Integer> generate(int size) {
        List<Integer> lottoTotalNumbers = new ArrayList<>(LOTTO_TOTAL_NUMBERS);
        Collections.shuffle(lottoTotalNumbers);

        return lottoTotalNumbers.stream()
                .limit(size)
                .collect(toList());
    }
}
```

이전과 대부분의 구현은 유사하지만 더 이상 정적으로 generate 메서드를 사용하지 않는다. 이제 Lotto 클래스는 생성 시점에 해당 전략을 주입받도록 수정한다.

```java
public class Lotto {

    private static final int DEFAULT_LOTTO_NUMBERS_SIZE = 6;

    private final Set<LottoNumber> lottoNumbers;

    public Lotto(LottoNumberGenerator lottoNumberGenerator) {
        List<Integer> numbers = lottoNumberGenerator.generate(DEFAULT_LOTTO_NUMBERS_SIZE);
        this.lottoNumbers = numbers.stream()
                .map(LottoNumber::new)
                .collect(toSet());
    }

    public Set<LottoNumber> getLottoNumbers() {
        return Collections.unmodifiableSet(lottoNumbers);
    }
}
```

## 그래서 무슨 장점이 있는가?

의존 객체 주입 패턴은 해당 객체에게 `유연성을 부여`해주고 `테스트 용이성을 개선` 해준다. 유틸리티 클래스에 의존성을 가진 기존 코드를 테스트 하기 위해서는 랜덤으로 생성되는 로또 번호를 활용해야 한다. 이것은 확실한 테스트를 진행하는 방법이 아니다.

```java
class LottoTest {

    @DisplayName("자동으로 로또 번호를 발급 받는다.")
    @Test
    void 자동_로또_번호_발급() {
        // given & when & then
        assertThat(new Lotto().getLottoNumbers())
                .isNotIn(new LottoNumber(0), new LottoNumber(46)); // 적절 한가?
    }
}
```

의존 객체 주입 처럼 생성 시점에 로또 번호 생성 전략을 주입하게 되면 외부에서 번호 생성을 관리할 수 있기 때문에 테스트의 유연성은 늘어난다.

```java
class LottoTest {

    @DisplayName("수동으로 로또 번호를 생성한다.")
    @Test
    void 수동_로또_번호_생성() {
        // given
        List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6);
        LottoNumberGenerator lottoNumberGenerator = (size) -> numbers;

        // when
        Lotto lotto = new Lotto(lottoNumberGenerator);

        // then
        assertThat(lotto.getLottoNumbers())
                .contains(new LottoNumber(1),
                        new LottoNumber(2),
                        new LottoNumber(3),
                        new LottoNumber(4),
                        new LottoNumber(5),
                        new LottoNumber(6));
    }
}
```

이제 특정한 상황(ex. 로또 번호 6개를 맞춰 1등인 경우)과 같이 외부에서 `임의의 숫자를 부여`하여 로또를 생성한 뒤 `유연한 테스트`가 가능해진다.

## 의존성 주입(Dependency Injection)

의존 객체 주입 방식을 활용한 디자인 패턴으로 의존성 주입(Dependency Injection)이 존재한다. 의존성 주입은 `Spring 프레임워크의 3가지 핵심 프로그래밍 모델` 중 하나이다. 외부에서 두 `객체간의 관계를 결정`해주는 디자인 패턴으로, 인터페이스를 사이에 두어 클래스 레벨에서 의존 관계가 고정되지 않도록 도와준다. 이러한 방식은 `객체의 유연성`을 늘려주고 `객체간의 결합도를 낮출 수 있는 효과`를 가지고 있다.

<TagLinks />