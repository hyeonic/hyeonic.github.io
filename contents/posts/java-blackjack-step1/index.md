---
title: "[레벨 1] 05. 1단계 - 블랙잭"
date: 2022-03-17
update: 2022-03-17
tags: 
 - 우아한테크코스
 - 레벨1
 - 미션
series: "우아한테크코스 레벨1"
feed:
  enable: false
---

## 목표

![](https://user-images.githubusercontent.com/59357153/152970395-a31c8134-fc89-449f-b4dc-441e03df929c.png)

우아한테크코스에서 진행한 미션의 리뷰와 피드백에 대해 정리한다. 실제 리뷰는 [[1단계 - 블랙잭] 매트(최기현) 미션 제출합니다.](https://github.com/woowacourse/java-blackjack/pull/237)에서 확인할 수 있다.

## 상속을 활용한 추상화

이전까지 미션을 진행하며 이른 시기의 추상화(ex. 필요에 의해 도입하지 않고 예측을 통한 전략 패턴 도입)로 인한 코드 수정을 야기한 경험이 있었기 때문에 이번 미션에서는 최대한 추상화 과정을 미뤄서 작성하였다. 이번 미션에서도 블랙잭 게임의 참가자인 Dealer와 Player도 공통된 행위가 많다고 판단하였고 공통된 코드를 상속을 통한 추상화를 고려하였다.

하지만 상속 구조는 코드를 재사용 하기 용이하지만 상위 클래스와의 높은 결합도를 가지기 때문에 조합을 먼저 고려해야 한다고 학습한 경험이 있다. 또한 위 예시가 상속을 도입하는데 충분한 배경을 가지고 있는지 아직 판단이 잘 서지 않았다. 리뷰어 럿고는 이러한 고민에 아래와 같은 답변을 남겨 주었다.

#### 리뷰 중 일부
```markdown
`럿고`: 안녕하세요 🙂 상속에 대한 질문을 남겨주셨는데, 답변 전에 상속을 먼저 해보라고 말씀드린 이유를 설명드릴려고 해요 🙂
저의 근거는 사실 별건 아닌데요. 한번 직접 해보고 판단하자 라는 근거입니다 🙂
사실 설계를 할때, 많은 고민을 하게 되는데요. 사실 그건 저도 똑같습니다. 그러나, 해보지 않고 판단하면 놓치게 되는 경우가 많더라구요.
이미 설계할때 고민을 해보셨겠지만, 미션에 직접적으로 반영을 하지 않았다고 생각이 들어요.
이펙티브자바에서도 나오다 보니 상속보다 조합 이라는 개념을 많이 접해보셨겠지만, 그렇다고 해서 무조건 조합을 사용하라는 이야기는 아닙니다.
객체지향에서 중요한 개념중 하나가 다형성이라고 생각이 드는데요. 다형성의 이점을 얻기 위한 방법은 여러가지겠지만, 좋은 방법 중 하나는 상속입니다. 이러한 근거로 한번 직접 적용해보라고 리뷰를 드린것이니 참고해주시면 감사하겠습니다 🙂
```

정리하면 `해보지 않고 판단하는 것 보다 상속을 적용하여 경험해 본 뒤 필요에 따라 조합을 고려해보는 것을 추천`한다는 것이다. 

해당 피드백을 받고 많은 생각이 들었다. 언급한 것처럼 상속에 대한 문제는 다양한 책을 통해 접했지만 실제로 상속을 사용하며 경험해본 적은 없기 때문이다. 왜 사용하면 안되는지 의심하지 않은 채 책에서 조합을 먼저 고려하라는 말로 나는 상속을 체험해볼 좋은 기회를 놓치게 되었다.

우아한테크코스는 `best practice`를 찾는 과정이 아니다. 위 같이 `다양한 도전`과 `시행착오`를 통해 성장해야 한다. 상속도 마찬가지다. 단순히 조합을 먼저 고려하라는 가르침 때문에 상속을 경험 해보지도 못한 채 조합을 먼저 고려하였을 것이다. 직접 경험하는 것 만큼 와닿는 방식도 없다. 바로 상속을 적용하여 중복된 코드를 개선하였다.

우선 공통된 부분을 추출하여 상위 클래스에 위치 시켰다.

```java
public abstract class Participant {

    protected static final int BLACKJACK_SCORE = 21;

    protected final Name name;
    protected final Cards cards;

    public Participant(String name, List<Card> cards) {
        this.name = new Name(name);
        this.cards = new Cards(cards);
    }

    public int getTotalScore() {
        return cards.calculateTotalScore();
    }

    public void append(Card card) {
        cards.append(card);
    }

    protected boolean isBust() {
        return cards.calculateTotalScore() > BLACKJACK_SCORE;
    }

    public abstract boolean isDrawable();

    public abstract GameResult decideResult(Participant participant);

    public String getName() {
        return name.getValue();
    }

    public List<Card> getCards() {
        return cards.getValue();
    }
}
```

공통 부분을 제외한 변하는 부분은 abstract 키워드를 통해 `정제(refine)`할 수 있도록 작성하였다.

#### 상속이 적절한 경우

상속이 더욱 적절한 경우는 클래스의 행동을 `확장(extend)`하는 것이 아니라 `정제(refine)`할 때이다. 확장이란 새로운 행동을 덧 붙여 기존의 행동을 부분적으로 보완하는 것을 의미하고 정제란 부분적으로 불 완전한 행동을 완전하게 만드는 것을 의미한다.

아래는 추상 클래스 Participant를 상속 받는 Player와 Dealer이다.

```java
public class Player extends Participant {

    public Player(String name, List<Card> cards) {
        super(name, cards);
    }

    @Override
    public boolean isDrawable() {
        return cards.calculateTotalScore() <= BLACKJACK_SCORE;
    }

    @Override
    public GameResult decideResult(Participant participant) {
        if (isBust()) {
            return GameResult.LOSE;
        }

        if (participant.isBust()) {
            return GameResult.WIN;
        }

        return GameResult.of(getTotalScore(), participant.getTotalScore());
    }
}
```

```java
public class Dealer extends Participant {

    private static final String DEALER_NAME = "딜러";
    private static final int DRAWABLE_LIMIT_VALUE = 16;

    public Dealer(List<Card> cards) {
        super(DEALER_NAME, cards);
    }

    @Override
    public boolean isDrawable() {
        return cards.calculateTotalScore() <= DRAWABLE_LIMIT_VALUE;
    }

    @Override
    public GameResult decideResult(Participant participant) {
        if (participant.isBust()) {
            return GameResult.WIN;
        }

        if (isBust()) {
            return GameResult.LOSE;
        }

        return GameResult.of(getTotalScore(), participant.getTotalScore());
    }
}
```

## ArgumentsProvider를 통한 테스트 데이터

JUnit `@ParameterizedTest`을 통해 다양한 데이터를 통해 반복적인 테스트를 진행할 수 있다. 또한 다양한 애노테이션과 함께 다양한 타입의 데이터를 활용하여 테스트를 진행할 수 있다. 그 중 직접 사용한 애노테이션을 간단히 정리하였다.

* `@MethodSource`: 테스트 클래스 내의 메서드 혹은 외부 클래스 메서드가 반환하는 값을 source로 사용한다. static 메서드여야 하고 애노테이션에 해당 메서드명을 작성해야 한다.

아래 처럼 작성 가능하다.
```java
public class CardsTest {
    ...
    private static Stream<Arguments> provideArguments() {
        return Stream.of(
                arguments(new Cards(List.of(new Card(NINE, CLOVER), new Card(EIGHT, DIAMOND))), 17),
                arguments(new Cards(List.of(new Card(KING, SPADE), new Card(ACE, CLOVER))), 21),
                arguments(new Cards(List.of(new Card(SEVEN, CLOVER), new Card(KING, SPADE))), 17),
                arguments(new Cards(List.of(new Card(ACE, CLOVER), new Card(ACE, SPADE))), 12),
                arguments(new Cards(List.of(new Card(ACE, CLOVER), new Card(KING, SPADE))), 21),
                arguments(new Cards(List.of(new Card(ACE, CLOVER), new Card(THREE, HEART))), 14)
        );
    }

    @DisplayName("Cards가 주어지면 점수를 계산하면 반환한다.")
    @ParameterizedTest
    @MethodSource("provideArguments")
    void 카드_점수_계산(Cards cards, int totalScore) {
        assertThat(cards.calculateTotalScore()).isEqualTo(totalScore);
    }
}
```

만약 `이름을 전달하지 않을 경우 테스트 메서드와 이름이 같은 소스 메서드`를 검색한다. 또한 패키지 명을 포함하여 작성하는 경우 외부 클래스에 선언된 메서드를 참조할 수 있다.

하지만 문자열로 메서드명을 전달하거나 작성하지 않는 경우 검색을 통해 메서드를 탐색하기 때문에 해당 메서드가 존재하지 않거나 오타로 작성하게 되면 테스트를 실행하는 시점에 예외를 던지게 된다. 즉 컴파일 시점에 해당 오류를 찾을 수 없다는 단점이 있다.

* `@ArgumentsSource`: ArgumentProvider라는 인터페이스를 구현한 구현체를 사용한다.

```java
public class CardsArgumentsProvider implements ArgumentsProvider {

    @Override
    public Stream<? extends Arguments> provideArguments(ExtensionContext context) {
        return Stream.of(
                arguments(new Cards(List.of(new Card(NINE, CLOVER), new Card(EIGHT, DIAMOND))), 17),
                arguments(new Cards(List.of(new Card(KING, SPADE), new Card(ACE, CLOVER))), 21),
                arguments(new Cards(List.of(new Card(SEVEN, CLOVER), new Card(KING, SPADE))), 17),
                arguments(new Cards(List.of(new Card(ACE, CLOVER), new Card(ACE, SPADE))), 12),
                arguments(new Cards(List.of(new Card(ACE, CLOVER), new Card(KING, SPADE))), 21),
                arguments(new Cards(List.of(new Card(ACE, CLOVER), new Card(THREE, HEART))), 14)
        );
    }
}
```

```java
public class CardsTest {
    ...
    @DisplayName("Cards가 주어지면 점수를 계산하면 반환한다.")
    @ParameterizedTest
    @ArgumentsSource(CardsArgumentsProvider.class)
    void 카드_점수_계산(Cards cards, int totalScore) {
        assertThat(cards.calculateTotalScore()).isEqualTo(totalScore);
    }
}
```

`@MethodSource`와 동일한 기능을 제공한다. 외부에서 테스트를 위한 데이터를 관리하기 때문에 좀 더 직관적으로 관리가 가능하다. 또한 클래스를 전달하기 때문에 컴파일 시점에 존재 유무에 관한 오류들을 확인할 수 있다. 재사용 측면에서도 손쉽게 적용이 가능하다.

관련 이점들을 확인하였고 이번 미션을 진행하며 공통적으로 필요한 테스트 데이터들 중 반복적으로 사용하는 것들은 `ArgumentsProvider`를 구현하여 적절히 사용하였다.

## dto가 필요한 규모의 시스템인가?

`dto`는 `Data Transfer Object`로 데이터 전달을 위한 객체이다. `계층간 데이터를 주고 받을 때` 데이터를 전달하는 바구니로 사용된다. 보통 dto는 Controller에서 Domain과 관련된 데이터를 가공하여 View에게 전달할 때 사용하였다. 이번에도 Domain과 View에 대한 결합도를 줄이기 위해 중간에 dto를 두어 작성하였다.

하지만 아래와 같은 리뷰를 확인할 수 있었다.

#### 리뷰 중 일부
```markdown
`구구`: dto가 필요한 규모의 시스템인가요?
dto를 추가하면서 이를 처리하기 위한 메서드가 생겨나는군요.
오히려 코드 복잡도를 높이고 있지 않나요?
```

사실 이번 블랙잭 미션의 경우 MVC 중 C에 해당하는 Controller 계층을 사용하지 않아도 될 정도로 작은 규모의 애플리케이션이다. 나는 그것을 고려하지 않은 채 무작정 Controller 부터 만들고 dto를 양산하고 있었다. 그로 인해 dto 변환을 위한 부가적인 코드까지 추가되었다. 해당 리뷰를 받고 난 뒤 dto가 필요한 규모의 시스템에 대해 고민하게 되었다.

우선 dto의 목적에 대해 생각해봐야 한다. dto는 `계층간 데이터를 주고 받을 때` domain에 대한 중요한 정보를 숨기거나 view에서 필요로 하는 데이터를 가공할 때 사용한다. 또한 view의 요구사항은 domain에 비하여 자주 변경된다. 만약 view에서 domain에 대한 의존성을 가지고 있는 경우 view의 수정은 domain에 대한 수정을 야기할 수 있다. 

블랙잭 미션은 사실 계층을 나눌 만큼 큰 규모의 애플리케이션이 아니다. 특히 DB와 같은 데이터 저장소를 사용하지 않기 때문에 더더욱 Controller의 역할이 모호해진다. 이런 경우 단순히 domain만 활용하여 작성해도 괜찮을 것이라 판단한다. 한 가지 주의해야 할 점은 view에서 domain의 비즈니스 로직을 실행하는 것은 지양해야 한다는 것이다. 중요한 비즈니스 로직이 담긴 메서드를 실행할 경우 view와 domain이 강하게 결합되며 변화에 매우 취약한 구조를 야기한다. view에서는 최대한 domain에 getter를 통해 데이터를 받아서 사용해야 한다.

아직은 나의 주관보다 리뷰로 오는 피드백이 내 코드에 많은 영향을 끼치고 있다. 레벨 1 기간 동안은 코드의 근거를 만드는 것과 나의 소신을 만드는 것도 중요하지만 리뷰어들의 다양한 시선을 통해 오는 피드백을 `이해하고 수용하는 것`도 중요하다고 생각한다. 아직은 배우는 입장이기 때문에 리뷰를 보고 단순히 넘기는 것 보다 `의도를 파악하고 이해하며 내것으로 만든 뒤 적절히 응용`하는 방법도 필요하다고 생각한다.

## References

 * [Guide to JUnit 5 Parameterized Tests](https://www.baeldung.com/parameterized-tests-junit-5)
 * [DTO vs VO vs Entity](https://tecoble.techcourse.co.kr/post/2021-05-16-dto-vs-vo-vs-entity/)
