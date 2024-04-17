---
title: "03. 1단계 - 로또(자동)"
date: 2022-02-28
update: 2022-02-28
tags: 
 - 우아한테크코스
 - 미션
series: "우아한테크코스 레벨1"
feed:
  enable: false
---

## 목표

![](https://user-images.githubusercontent.com/59357153/152970395-a31c8134-fc89-449f-b4dc-441e03df929c.png)

우아한테크코스에서 진행한 미션의 리뷰와 피드백에 대해 정리한다. 실제 리뷰는 [[1단계 - 로또(자동)] 매트(최기현) 미션 제출합니다.](https://github.com/woowacourse/java-lotto/pull/366)에서 확인할 수 있다.

## 미션을 대하는 자세

이번 로또 미션을 해결할 때 가장 크게 고려한 것은 `객체에게 적절한 책임을 부여`하는 것과 `의식적인 TDD 연습`이다.

### 객체에게 적절한 책임을 부여

객체에게 직관적인 메시지를 보내 자연스럽게 도메인 사이의 협력을 이룰 수 있도록 노력하였다. 초반 설계대로 대부분의 기능을 구현했지만 세부 구현을 진행할 때 마다 고려해야할 점들이 늘어나 그때 그때 필요한 것을 추가하며 살아 있는 문서가 될 수 있도록 작성하였다.

미션을 진행하며 가장 크게 느낀 것은 초반 `설계에 대한 중요성`과 `요구사항과 도메인에 대한 충분한 배경지식의 필요성`이다. 무턱대고 개발부터 진행하게 되면 어떤 객체에게 책임을 부여해야 할지 알 수 없기 때문이다. 

이번 미션은 도메인에 대한 사전 지식을 어느정도 가지고 있다고 판단했지만 그럼에도 불구하고 쉽지 않은 작업이었다. 객체에게 유의미한 메시지 전달을 위해 메서드명을 정하는 것도 쉽지 않았다. 이번 미션을 통해 이러한 연습을 꾸준히 진행해볼 생각이다.

### 의식적인 TDD

테스트 주도 개발은 지속적으로 의식하지 않으면 쉽게 적용할 수 없다. 어떻게 보면 지금까지 하던 개발 방법을 완전히 뒤집어서 적용해야 하는데 아직 습관을 버리는 것은 쉽지 않았다. 그럼에도 의식적은 연습을 통해 극복하려 했지만 오랜시간 집중하는 것은 나에게 어려운 일이 었다. 우선 TDD를 유연하게 진행하려면 앞서 언급한 것 처럼 도메인에 대한 배경지식과 요구사항에 대한 이해도가 높아야 한다. 이러한 사실을 기반으로 각 객체의 책임을 검증하며 구현 코드를 채워가야 한다.

유사한 TDD를 작성했지만 그럼에도 얻어가는 점은 많았다. 확실히 다수의 테스트 코드가 뒷받침되어 프로그램의 안정성을 확인시켜 주었다. 또한 정리한 요구사항을 기반으로 테스트를 진행했기 때문에 진행 상황도 빠르게 반영이 가능했다.

TDD는 불안함을 귀찮음으로 바꿔준다고 한다. 아직은 귀찮음의 힘이 더 크게 작용하지만 의식적인 연습을 통해 극복 가능하다고 생각한다. 

## 과연 적절한 책임인가?

미션을 진행할 때 실제 로또를 구매하는 상상을 하며 설계를 진행하였다. 보통 우리가 로또 구매를 위해서는 판매점에 방문한다. 자동으로 구매할 경우 로또 구입 금액을 지불하여 로또 번호 생성 기계에서 나오는 로또 티켓을 발급 받는다. 이것을 그림으로 표현했을 때 구입 과정은 아래와 같다고 생각했다.

![](https://user-images.githubusercontent.com/59357153/155666634-33b8b9ac-dad1-4cbd-b2d9-9006c37b28a7.png)

여기서 LottoMacine은 `로또 티켓 발급의 책임`을 가진다. 로또를 구매하는 클라이언트는 로또 머신에게 구매하기 위한 메시지를 요청한다. 이것을 기반으로 `LottoMacine`은 아래와 같이 작성되었다.

```java
public class LottoMachine {

    public LottoTickets purchase(Money money) {
        return new LottoTickets(money.calculateTicketCount(), new AutoLottoNumberGenerator());
    }
}
```

단순히 구매하는 요청 메시지 처리를 위해 `purchase`라는 메서드명을 활용했다. 하지만 아래와 같은 피드백을 확인할 수 있었다.

#### 리뷰 중 일부

```markdown
`로운`: 작업전 객체 책임 부여와 설계 너무 좋네요 💯

객체의 메서드는 자기 자신이 어떠한 행동을 한다는 것을 보여주는 것일텐데요. (create, find, print, calculate 등)
클라이언트 입장에서는 구매하는 것이 맞지만 LottoMachine입장에서는 자기가 로또를 구매하는 것이 맞는 의미인지 의문이 들었어요.

로또 티켓 리스트를 자동으로 **발급받기 위한** 기계가 아닌 로또 티켓 리스트를 자동으로 **발급하는** 기계가 아닐까요??

객체를 정의함으로써 역할과 책임을 가지게 되고 그 역할과 책임에 맞게 행동(method)을 하게 되죠.
객체를 주체성과 의인화로 표현하기도 하는데 이 관점에서는 매트의 생각의 방향과 다르지 않을까요??
메세지 전송이 행동 요청이라고 본다면 LottoMachine에게 로또 발급을 요청하는 것 아닐까요??

> 객체지향 세계에서는 모든 것이 능독적이고 자율적인 존재로 바뀐다.
> 레베카 워프스브록은 능동적이고 자율적인 존재로 소프트웨어 객체를 설계하는 원칙을 가리켜 의인화(anthropomorphism)라고 한다.
> 훌룡한 객체지향 설계란 소프트웨어를 구성하는 모든 객체들이 자율적으로 행동하는 설계를 가리킨다.
```

가장 주목해서 본 것은 `LottoMacine은 로또 티켓 리스트를 자동으로 발급하는 객체`라는 것이다. 객체는 `능동적`이고 `자율적`이어야 한다. 하지만 현재 purhase라는 의미는 외부 클라이언트에 의해 `수동적`으로 행해지고 있다.

이렇게 사소한 메서드명이지만 객체의 자율성을 침해하였다. `모든 객체들은 능동적이고 자율적인 존재`라는 것을 항상 기억해야 한다.

이제 LottoMachine은 더이상 외부에 의해 구매되는 것이 아닌 자율적으로 발급해주는 객체가 되었다.

```java
public class LottoMachine {

    public LottoTickets issue(Money money) {
        return new LottoTickets(money.calculateTicketCount(), new AutoLottoNumberGenerator());
    }
}
```

## Controller와 View의 의존성을 줄여라!

시작은 리뷰어 [로운](https://github.com/lowoon)의 한 문장이었다.

#### 리뷰 중 일부
```markdown
`로운`: controller가 view를 가지는게 맞을까요??
```

기존 `Controller`는 `InputView와 OutputView를 생성 시점에 주입`받아 사용하고 있었다.

```java
public class LottoController {

    private final InputView inputView;
    private final OutputView outputView;

    public LottoController(InputView inputView, OutputView outputView) {
        this.inputView = inputView;
        this.outputView = outputView;
    }
    ...
}
```

위와 같이 설계한 이유는 아래와 같았다.

#### 리뷰 중 일부
```markdown
`매트`: Controller에서 View에 대한 존재는 알 수 있다고 판단 하였습니다. 또한 View는 Console에만 국한된 것이 아니라 웹과 같이 다른 종류도 위치할 수 있다고 판단하여 Controller의 생성 시점에 주입될 수 있도록 작성하였습니다.

MVC 패턴을 활용하여 설계를 진행할 때 로운이 언급하신 것 처럼 Controller에서 View를 어떤식으로 사용하면 좋은지 고민이 많았습니다. 단순히 View에서 사용하는 메서드들을 static으로 만들어 유틸리티 클래스로 사용할 경우 View와 Controller의 강한 결합도로 변경에 유연하게 대처하지 못할 것이라 판단하여 생성자 주입을 통한 View 객체를 활용하였습니다.

생성자 주입 방식을 통한 의존 객체 주입은 유연성 가져다 준다고 생각합니다. 이러한 방법 이외에는 View와 Controller를 어떤식으로 활용하여 사용해야 할지 감이 잡히지 않아 해당 방식이 적절하다고 판단하여 선택하였습니다.

관련해서 Controller가 상태를 가지는 경우 주의해야 할 점이나 제가 정리한 개념 중 잘못된 것이 있는지, 참고할 수 있는 키워드를 주시면 활용하여 반영하겠습니다!
```

#### 리뷰 중 일부
```markdown
`로운`: 많은 고민과 정리를 하셨군요 👍 생성자 주입 방식을 통해 유연성을 가져다 주는 것을 알고 계시네요 💯

제가 물어본 이유도 View는 Console에만 국한된 것이 아니라 웹과 같이 다른 종류도 위치할 수 있다 이 부분 때문이었는데요.

말씀하신 web이나 앱의 요청일 경우에는 controller를 사용하지 못할거에요.
생각하신 방법에서 console view가 아닌 web인 경우라면 view를 통해 어떻게 들어오는 걸까요???

view를 통해 사용자의 값을 입력받은 것을 web에서 아이디/패스워드를 입력한 것이라고 한다면, 서버가 아이디와 패스워드 값만 받아 검증 및 처리를 하는 것과 같이 controller에 view를 통해 입력된 값만 전달되야하지 않을까요??

기본적으로 서버는 front(view)에 상관없이 요청이 들어오면 같은 형태의 데이터를 보내줄 수 있어야 해서 여쭤보게 됐어요!
```

처음 피드백을 확인했을 때 살짝 멘붕이 왔다. 결국 이전에 설계한 구조 또한 `Console View에 종속적인 Controller`를 만들게 된 것이다.

많은 고민들을 진행했다. 로운의 피드백 중 가장 집중하며 본 것은 `controller에 view를 통해 입력된 값만 전달`이다. 즉 Controller에서 View에게 메시지를 보내는 것이 아닌 `값`을 통해 둘 사이의 통신이 이루어져야 한다.

### Controller 개선하기

가장 먼저 Controller가 의존하고 있는 View를 없애고 단순히 값을 주고 받을 수 있는 구조로 개선하였다.

```java
public class LottoController {

    public MoneyDto createMoney(int money) {
        return MoneyDto.from(new Money(money));
    }

    public LottoTicketsDto createLottoTickets(int money) {
        LottoMachine lottoMachine = new LottoMachine();
        LottoTickets lottoTickets = lottoMachine.issue(new Money(money));

        return LottoTicketsDto.from(lottoTickets);
    }

    public WinningNumberDto createWinningNumber(List<Integer> normalNumbers, int bonusNumber) {
        WinningNumber winningNumber = new WinningNumber(new LottoTicket(normalNumbers), new LottoNumber(bonusNumber));

        return WinningNumberDto.from(winningNumber);
    }

    public LottoResultDto createLottoResult(int money, WinningNumberDto winningNumberDto,
                                            LottoTicketsDto lottoTicketsDto) {

        WinningNumber winningNumber = winningNumberDto.toWinningNumber();
        LottoTickets lottoTickets = lottoTicketsDto.toLottoTickets();

        LottoResult lottoResult = lottoTickets.determine(winningNumber);

        return LottoResultDto.from(lottoResult.getRanks(), lottoResult.calculateYield(new Money(money)));
    }
}
```

이제 Controller의 역할은 Console View에 종속적이지 않고 단순히 View에서 요청하는 데이터 형식에 domain을 적절히 가공하여 반환할 수 있는 형태로 개선되었다.

이것으로 인한 장점으로는 View와 Controller 사이의 결합도를 낮추고 `값 으로만 통신`하기 때문에 추후에 Web과 같은 요구사항이 추가된다면 `Controller와 Domain은 그대로 사용`이 가능할 것으로 판단한다.

## assertJ와 Junit5의 혼용

기존의 단위 테스트는 모두 assertJ로 통일하여 사용하였다. 예외를 던지지 않고 정상적으로 생성하는 테스트를 작성할 때 보통 `assertThatCode`를 활용하였다.

```java
class LottoMachineTest {

    @DisplayName("구입 금액을 기반으로 로또 티켓을 자동 발급한다.")
    @Test
    void 로또_머신_정상_발급() {
        // given
        LottoMachine lottoMachine = new LottoMachine();

        // when & then
        assertThatCode(() -> lottoMachine.issue(new Money(14000)))
                .doesNotThrowAnyException();
    }
}
```

하지만 Junit5에 더 직관적인 이름을 가진 메서드가 존재했다. 그것은 바로 `assertDoesNotThrow`였다.

처음 도입 이전에는 assertJ와 Junit5를 혼용해서 사용해도 괜찮은지 의문이었다. 관련 피드백은 아래에서 확인할 수 있었다.

#### 리뷰 중 일부
```markdown
`로운`: 한 테스트안에서 두가지를 혼용해서 사용하고 있습니다. 같이 혼용하는 것이 문제가 되지는 않아서요. 추후에 mock이라는 것도 사용하시게 될텐데 이렇게 여러가지를 같이 쓰시게 될거에요.

junit5의 assertAll을 알려드리려고 했는데 지금 말씀드리면 되겠네요 😄
```

```java
assertAll(
        () -> assertThat(rank).isEqualTo(Rank.SECOND),
        () -> assertThat(rank.getPrizeMoney()).isEqualTo(30_000_000)
);
```

```markdown
assertThat을 연달아 쓸때 첫번째 assert에서 실패하게 되면 두번째 assert는 안돌게 되는데요. assertAll을 쓰게되면 첫번째가 실패하더라도 두번째도 테스트를 하게 됩니다
```

덕분에 `assertAll`이라는 좋은 기능도 확인할 수 있었다. 이제는 부담없이 필요한 곳에 적절히 사용할 예정이다.

## 정적 팩토리 메서드의 적용

#### 리뷰 중 일부
```markdown
`로운`: 정적 팩토리 메서드를 적용해 보는 것도 좋을거 같네요!
```

[정적 팩토리 메서드(Static Factory Method)는 왜 사용할까?](https://tecoble.techcourse.co.kr/post/2020-05-26-static-factory-method/)

사실 이전에는 정적 팩토리 메서드를 왜 사용해야 하는지 알지 못했다. 이번 기회를 통해 정적 팩토리 메서드에 대해 공부하고 적용해보며 장점들을 확인할 수 있는 좋은 기회가 되었다. 

1단계 미션이 merge되면 정적 팩토리 메서드에 대해 다시 정리하여 따로 작성할 예정이다. 아래는 기존 생성자 코드를 정적 팩토리 메서드로 개선한 코드이다.

```java
public class LottoTicketsDto {

    private final List<LottoTicketDto> lottoTickets;

    private LottoTicketsDto(LottoTickets lottoTickets) {
        this.lottoTickets = lottoTickets.getLottoTickets()
                .stream()
                .map(LottoTicketDto::new)
                .collect(toList());
    }

    // 정적 팩토리 메서드
    public static LottoTicketsDto from(LottoTickets lottoTickets) {
        return new LottoTicketsDto(lottoTickets);
    }

    public LottoTickets toLottoTickets() {
        List<LottoTicket> lottoTickets = this.lottoTickets.stream()
                .map(LottoTicketDto::toLottoTicket)
                .collect(toList());
        return new LottoTickets(lottoTickets);
    }

    public List<LottoTicketDto> getLottoTickets() {
        return Collections.unmodifiableList(lottoTickets);
    }
}
```

이제 from이라는 이름을 통해 의도를 드러낼 수 있고, 생성자의 내부 구현을 숨기며 작성이 가능하다.

아래와 같이 직관적인 방식을 통해 객체를 생성할 수 있게 된다.

```java
public class LottoController {
    ...
    public LottoTicketsDto createLottoTickets(int money) {
        LottoMachine lottoMachine = new LottoMachine();
        LottoTickets lottoTickets = lottoMachine.issue(new Money(money));

        return LottoTicketsDto.from(lottoTickets);
    }
    ...
}
```

## References

[정적 팩토리 메서드(Static Factory Method)는 왜 사용할까?](https://tecoble.techcourse.co.kr/post/2020-05-26-static-factory-method/)