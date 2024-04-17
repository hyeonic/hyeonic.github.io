---
title: "04. 2단계 - 로또(수동)"
date: 2022-03-06
update: 2022-03-06
tags: 
 - 우아한테크코스
 - 미션
series: "우아한테크코스 레벨1"
feed:
  enable: false
---

## 목표

![](https://user-images.githubusercontent.com/59357153/152970395-a31c8134-fc89-449f-b4dc-441e03df929c.png)

우아한테크코스에서 진행한 미션의 리뷰와 피드백에 대해 정리한다. 실제 리뷰는 [[2단계 - 로또(수동)] 매트(최기현) 미션 제출합니다.](https://github.com/woowacourse/java-lotto/pull/429)에서 확인할 수 있다.

## 추가된 요구사항

이전 로또 생성기는 자동 기능만 제공한다. 사용자가 수동으로 추첨 번호를 입력할 수 있도록 해야 한다. 

 * 수동으로 구매할 로또 수를 입력한다.
 * 수동으로 구매할 번호를 입력한다.
 * 수동을 제외한 나머지는 자동으로 구매한다.

## 수동 기능 구현

최초 로또 생성을 위한 전략을 외부에서 주입 받는 방식으로 작성하였다.

아래는 이전 코드의 생성 전략이다.
```java
@FunctionalInterface
public interface LottoNumberGenerator {
    List<Integer> generate(int size);
}
```

위 방식을 유지하며 수동 방식을 추가하려 했다. 하지만 기존에 작성한 전략을 수정하지 않고 수동 전략을 고려하는 것은 매우 힘들게 다가왔다. 임시방편으로 LottoTickets에 다양한 정적 팩토리 메서드를 두어 해결하려 했다.

```java
public class LottoTickets {
    ...
    public static LottoTickets createAutoLottoTickets(int lottoCount, LottoNumberGenerator lottoNumberGenerator) {
        return new LottoTickets(lottoCount, lottoNumberGenerator);
    }

    public static LottoTickets createManualLottoTickets(List<List<Integer>> manualNumbers) {
        List<LottoTicket> lottoTickets = manualNumbers.stream()
                .map(LottoTicket::new)
                .collect(toList());

        return new LottoTickets(lottoTickets);
    }
    ...
}
```

하지만 이것은 오히려 복잡성을 야기하는 것 같았다. 해당 코드를 사용하는 입장에서 전혀 직관적이지 않다고 느껴졌다. 로운 역시 좋지 않다는 의견을 내게 전달하였다.

#### 리뷰 중 일부
```markdown
`로운`: 자동의 경우 LottoNumberGenerator를 사용하는데 수동의 경우에도 사용하도록 해야 전략패턴으로 사용하는 의미가 있지 않을까요??
그리고 정적 팩토리 메서드의 경우에는 매개변수 생성자를 1개 만들어 놓고 그 1개를 사용하는 방식으로 많이 사용합니다~
위와 같이 되면 매개변수 생성자도 늘어나고, 정적팩토리 메서드도 늘어나겠죠??
```

전략 패턴 사용에 대해서 다시 한 번 고민해보았다. 현재 구조에서는 로또 생성 부분을 전략으로 가지는게 맞는지 전체적인 그림을 다시 그려보며 차근차근 코드를 수정 하였다.

기존 로직은 수동을 전혀 고려하지 않고 로또 번호를 생성하였다. 즉 메서드의 시그니처가 수동 생성과는 맞지 않다고 판단했다. 그렇기 때문에 기존 로직을 과감히 삭제하고 생성자를 간결히 만들어 유연하게 대처할 수 있도록 통일하였다.

```java
public class LottoTickets {

    private final List<LottoTicket> lottoTickets;

    public LottoTickets(List<List<Integer>> manualNumbers) {
        this.lottoTickets = manualNumbers.stream()
                .map(LottoTicket::new)
                .collect(toList());
    }

    public void combine(LottoTickets targetLottoTickets) {
        lottoTickets.addAll(targetLottoTickets.lottoTickets);
    }

    public LottoResult determine(WinningNumber winningNumber) {
        Map<Rank, Long> ranks = lottoTickets.stream()
                .map(winningNumber::compare)
                .collect(groupingBy(identity(), counting()));

        return new LottoResult(ranks);
    }

    public List<LottoTicket> getLottoTickets() {
        return Collections.unmodifiableList(lottoTickets);
    }
}
```

generator를 과감히 삭제한 뒤 해당 로직을 LottoMachine으로 이동했다. 이전과 다르게 LottoTickets이 알고 있어야 하는 정보도 줄어 들고 정적 팩토리 메서드 사용을 고려하지 않아도 되는 구조로 개선되어 해당 객체의 역할이 좀 더 뚜렷해졌다고 생각된다.

이에 대한 로운의 의견이었다.

#### 리뷰 중 일부

```markdown
`로운`: lottoTicktets는 맞습니다! 다만 LottoTicket에서 하던 기능이 LottoGame으로 넘어갔는데요.
저는 LottoNumberGenerator를 implement하는 AutoLottoNumberGenerator와 ManualLottoNumberGenerator를 만들어 사용하는 것을 생각했었습니다~

고민해보시고 생각이 안나시면 다음 요청때 말씀해주세요ㅎㅎ
제가 생각한 방법을 말씀드릴게요. 다음번에 머지할 예정이라 참고만 하시면 될거 같아요.
오히려 제가 생각하는 방법이 복잡성을 높이고 오버 엔지니어링일 수 있어요.
```

해당 피드백을 듣고 많은 생각을 하게 되었다. 나는 보통 걱정이 많고 일어나지도 않은 일을 대비하는 성격을 가지고 있다. 이번 미션을 진행하며 일어나지도 않은 추가적인 요구사항에 대비하여 이른 시기에 전략 패턴을 도입했다. 하지만 이것은 오히려 변경하기 어려운 구조를 야기했고 결국 기존 코드를 대부분 수정하게 되었다.

만약 단순히 생각하여 자동 번호를 만들어 외부에서 주입받는 지금의 형식을 유지했다면 해당 시그니처를 기반으로 전략을 설계했을 것이다. 점진적으로 코드가 리팩토링이 되지 못했다. 단순히 기존 코드를 억지로 유지하며 리팩토링 하려 했다. 

많은 도메인을 접하지 못한 경험도 있지만 너무 과도한 계획과 설계는 전략을 추상화 하는데 큰 방해가 될 뿐이다. 다음 미션을 진행할 땐 해당 문제를 최대한 담백하고 깔끔하게 바라보는 시선을 길러야 겠다.

## 무분별한 DTO 사용

앞서 언급한 것 처럼 나는 걱정이 많고 일어나지 않은 일에 대비하려 한다. 이것은 DTO를 설계할 때도 발목을 잡았다. 필요에 의해 만든 것이 아니라 너무 무분별하게 많은 DTO를 만든 것이다.

#### 리뷰 중 일부
```markdown
`매트`: 이전 피드백을 기반으로 MVC 각각의 역할과 책임에 대해 학습할 수 있었습니다. 특히 controller에서는 dto를 활용한 값 전달로 view와의 결합도를 충분히 낮췄다고 생각됩니다. 다만 표현하고자 하는 값이 늘어날수록 dto의 개수가 늘어나서 다소 직관적 이지 않게 느껴지지 않을까 우려됩니다.

`로운`: 말씀하신거처럼 dto가 계속 늘어날 수 있는데요. 관리가 힘들어지게 되지만 dto를 사용함으로써 얻는 점들이 많아 사용하고 있습니다.

제가 공유드린 페이지에 있는 것들 이외에도 dto를 사용하는 이유에 대해 찾아보시면 좋을거 같아요!
그리고 dto안에 dto가 생겨나는 것이나 불필요한 dto가 생겨난다고 생각되는 dto들은 Integer, String과 같이 원시값 형태로 넘길 수 없을지 고민해보는 것도 좋은 것 같습니다.
```

로운은 정확히 내가 고민하는 것을 짚어 주었다. `불필요한 dto가 생겨난다고 생각되는 dto들은 Integer, String과 같이 원시값 형태로 넘길 수 없을지 고민`하고 있던 차에 가려운 곳을 긁어 주었다. 

피드백 이후 과감하게 DTO를 삭제하였다! 이제 좀 더 직관적으로 해당 객체들의 역할을 확인할 수 있게 되었다.

## 로또 번호를 재사용하라!

나는 다른 크루의 코드를 구경하는 것을 좋아한다. 그 사람의 코드를 통해 다양한 시선을 기를 수 있고 더 좋은 설계와 코드 작성 방식을 배울 수 있다. 이번에도 알지 못했던 방식에 대해 알 수 있게 되었다.

LottoNumber는 로또 번호 한 자리를 나타내기 위한 VO로 설계하였다. 즉 `new LottoNumber(1)`은 `new LottoNumber(1)`과 항상 동일하고 동등해야 한다. 즉 이러한 숫자 1 ~ 45는 불변을 보장하는 VO이기 때문에 재사용되어도 문제가 되지 않는다.

즉 이말은 한 번만 생성해두고 재활용 가능하다는 이야기 이다.

```java
public class LottoNumber {

    private static final int START_NUMBER = 1;
    private static final int END_NUMBER = 45;
    private static final String NUMBER_RANGE_ERROR_MESSAGE = "로또 번호의 범위는 1 ~ 45 사이입니다.";
    private static final Map<Integer, LottoNumber> LOTTO_NUMBERS = IntStream.rangeClosed(START_NUMBER, END_NUMBER)
            .boxed()
            .collect(toMap(identity(), LottoNumber::new));

    private final int lottoNumber;

    private LottoNumber(int lottoNumber) {
        this.lottoNumber = lottoNumber;
    }

    public static LottoNumber from(int lottoNumber) {
        if (!LOTTO_NUMBERS.containsKey(lottoNumber)) {
            throw new IllegalArgumentException(NUMBER_RANGE_ERROR_MESSAGE);
        }

        return LOTTO_NUMBERS.get(lottoNumber);
    }
    ...
}
```

위 코드에서 핵심은 `private static final Map<Integer, LottoNumber> LOTTO_NUMBERS`이 부분이다. 정적으로 생성하여 재사용되고 있다. Map을 활용하여 LottoNumber를 캐싱하였고, `from`을 통해 기존 객체를 꺼내 반환할 수 있도록 구현하였다.

이제 로또 번호를 중복해서 생성하지 않고 기존 것을 재사용 하도록 개선하였다.

## 공통 테스트 데이터 추출

#### 리뷰 중 일부
```markdown
`로운`: 테스트를 위한 데이터가 계속 반복이 되는거 같은데요.
이전에 말씀드린 공통적으로 사용하는 데이터를 활용하는 방법은 test에 util 혹은 다른객체나 LottoTicktesTest에 메서드를 만들어 사용되는 객체를 만들어두고 반환하도록 하는 형태로 사용하는 것을 말씀드렸던 겁니다~
```

테스트 패키지 하위에 공통적으로 사용할 수 있는 데이터나 메서드를 모아 클래스를 생성하여 개선하였다.

```java
public class LottoTestDataGenerator {

    public static List<List<LottoNumber>> generateLottoTickets() {
        return List.of(
                parseLottoNumbers(List.of(8, 21, 23, 41, 42, 43)),
                parseLottoNumbers(List.of(3, 5, 11, 16, 32, 38)),
                parseLottoNumbers(List.of(7, 11, 16, 35, 36, 44))
        );
    }

    public static List<LottoNumber> generateNumbers() {
        return parseLottoNumbers(List.of(8, 21, 23, 41, 42, 43));
    }

    public static List<LottoNumber> parseLottoNumbers(List<Integer> numbers) {
        return numbers.stream()
                .map(LottoNumber::from)
                .collect(toList());
    }
}
```

## References

[DTO의 사용 범위에 대하여](https://tecoble.techcourse.co.kr/post/2021-04-25-dto-layer-scope/)
