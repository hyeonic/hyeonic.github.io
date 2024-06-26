---
title: "[레벨 1] 01. 1단계 - 자동차 경주 구현"
date: 2022-02-15
update: 2022-02-15
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

우아한테크코스에서 진행한 미션의 리뷰와 피드백에 대해 정리한다. 실제 리뷰는 [[1단계 - 자동차 경주 구현] 매트(최기현) 미션 제출합니다.](https://github.com/woowacourse/java-racingcar/pull/275)에서 확인할 수 있다.

## 1단계 - 자동차 경주 구현 리뷰 확인

우아한테크코스의 가장 큰 장점인 실제 현업 개발자에게 작성한 코드를 리뷰 받을 수 있다는 것이다. 처음 받는 리뷰이고 누군가에게 내 코드를 보여준다는 것이 조금은 부끄럽게 다가왔다. 하지만 좋은 기회를 통해 평소 고민했던 것들을 나누며 많은 조언들과 힌트를 얻을 수 있었다.

첫 미션의 리뷰어는 제이이다. 아래는 리뷰를 통해 추가적으로 알게된 것과 피드백 후 개선 중 생겨난 고민들을 정리하였다.

### 요구사항 정리

아래는 이번 미션을 진행하며 정리한 요구사항인 구현 기능 목록이다. 프리코스 당시 진행한 미션과 동일했기 때문에 요구사항을 파악하는데 큰 힘이 들진 않았다.

```markdown
## 🛠 구현 기능 목록

* [x] 경주할 자동차의 이름을 입력한다.
* [x] 각 자동차의 이름은 `쉼표(,)`를 기준으로 구분한다.
* [x] 시도할 회수를 입력한다.
* [x] 시도할 회수는 `0이상` 이다.
* [x] 시도할 회수는 `숫자 이외의 값` 또는 `음수`를 전달할 경우 `예외를 throw` 한다.
* [x] 자동차의 이름은 `5자 이하`이다.
* [x] 자동차의 이름이 `6자 이상`이면 `예외 throw` 한다.
* [x] 자동차의 이름은 `null`, `''`, `' '` 이 올 수 없다.
* [x] 자동차의 이름이 `중복`될 경우 `예외를 throw` 한다.
* [x] 시도할 회수만큼 자동차는 움직일 수 있다.
* [x] 회수마다 `전진하는 조건을 판단`하여 자동차를 이동시킨다.
* [x] `0에서 9 사이에 random 값`을 구한 후 `random 값이 4 이상` 인 경우 `전진`하고, `3 이하`인 경우 멈춘다.
* [x] 실행 결과를 출력한다.
* [x] 경주가 완료된 후 현재 위치를 확인한 뒤 우승자를 출력한다.
* [x] 우승자는 한 명 이상일 수 있다.
* [x] 입력에 실패할 경우 `예외를 catch`하고 `재입력` 받는다.
```

현재 미션의 규모가 크지 않기 때문에 더 세부적인 그룹화는 진행하지 않았다. 관련해서는 아래와 같은 피드백을 확인할 수 있었다.

#### 리뷰 중 일부
```
나중에 프로젝트가 커지게되면 요구사항을 그룹화해서 나눠보는것도 좋을거에요.
자동차라는 그룹 하위에 이름에 대한 정책들, 움직임에 대한 정책들 같이요.
지금도 충분히 좋아요~
```

언급하신 것 처럼 규모가 커지게 되면 요구하는 사항들이 늘어나고 결국 그룹화하지 않은 목록들은 직관적이지 않게 될 것이다. 결국 사람이 보는 문서이기 때문에 한 눈에 이해할 수 있도록 작성하는 방법에 대해서도 고민해 보면 좋을 것 같다.

### 책임의 부여

이번 미션을 진행하며 각 객체에게 적절한 책임을 부여하고 객체간에 충분한 협력을 진행하기 위해 노력했다. 그러한 과정에서 생겨난 객체들의 책임을 정리하였다.

### view

#### InputView

입력의 책임을 가지고 있다. 

#### OutputView

출력에 대한 책임을 가지고 있다. 출력 양식에 맞춰 문자열을 가공하고 출력한다.

### utils

프리코스 당시 사용했던 utils의 메서드명을 참고하였다.

#### Console

입력 관련 유틸 클래스이다. 현재 한 줄 단위로 읽기 위한 기능을 가지고 있다.

#### Randoms

랜덤과 관련된 유틸 클래스이다. 파라미터로 전달된 구간 사이의 값을 랜덤으로 반환하는 기능을 가지고 있다.

### domain

#### Car

차를 표현하기 위한 Car이다. Car의 이름과 현재 위치, 이동 전략에 대한 정보를 가지고 있다. 

#### CarName

차의 이름의 표현하기 위한 객체이다. 차의 이름에 대한 검증을 모두 여기서 이루어진다.

#### Cars

Car List를 가진 일급 컬렉션이다. Cars는 Car List를 활용하여 차 이름의 중복을 검사할 수 있다. 또한 현재 위치를 기반으로 우승자 List를 확인할 수 있다.

#### MovingPolicy

자동차의 이동 전략이다. 현재에는 랜덤한 숫자를 기반으로 이동하는 랜덤 이동 정책 구현체(RandomMovingPolicy)를 활용하여 차의 이동 유무를 확인한다.

#### Count

시도 횟수를 가진 객체이다. 시도 가능 유무를 확인하고 가능하면 시도 횟수를 차감하여 게임이 가능한지 확인할 수 있다.

#### RacingCarController

자동차 경주를 제어하기 위한 Controller이다. domain과 view사이에 위치하여 제어를 진행한다.

#### 리뷰 중 일부
```
정말 잘 나누어주셨네요 👍
저는 개인적으로 문서화가 굉장히 중요하다고 생각해요. 협업하는 사람들 혹은 새로합류하는 사람들을 위해서 큰 도움이 됩니다.
큰 장점을 가지신것같아요. 나중에 많은 도움이 될거에요!
```

평소 문서화에 대한 중요성을 몸소 느끼고 있었는데 중요성을 한 번 더 언급하셨다. 앞서 말한 것 처럼 문서는 결국 사람이 보는 것이기 때문에 무엇보다 직관성이 중요하다고 생각한다.

### 전략 패턴

전략 패턴에 대해서는 직접 학습한 경험도 많고 이전 미션에도 적용하였기 때문에 쉽게 생각해낼 수 있었다. 

#### 리뷰 중 일부
```
자동차의 이동 유무를 판단하기 위한 전략 패턴을 사용하였습니다. 
Car 객체를 생성하는 시점에 전략을 정할 수 있어서 유연하게 이동과 관련된 단위 테스트를 진행할 수 있었습니다. 
후에 이동에 대한 다른 요구사항이 추가된다면 구현체를 추가하고 교체하는 행위로 쉽게 변경이 가능할 것으로 판단됩니다! 
이번에 전략 패턴을 적용하며 위와 같은 장점 들을 알 수 있었습니다.

네 저도 매트가 이야기한 코드의 유연성, 테스트의 용이성 측면에서 좋은 선택이라고 생각해요!
```

실제 적용해보며 다양한 장점들을 느낄 수 있었다. 미션을 진행할 때는 생성자를 통해 전략을 주입해주는 방식을 채택하였다. 하지만 생각해보면 move 메서드를 움직이는 시점에 해당 전략을 주입할 수도 있을 것이다. 두 상황에 대해 어떠한 장단점을 가지고 있을까?

#### 1. 생성자를 통한 전략 패턴

```java
public class Car {
    private final CarName name;
    private int position;
    private final MovingPolicy movingPolicy;

    public Car(String name, MovingPolicy movingPolicy) {
        this.name = new CarName(name);
        this.position = 0;
        this.movingPolicy = movingPolicy;
    }

    public void move() {
        if (movingPolicy.isMovable()) {
            position++;
        }
    }

    public String getName() {
        return name.getName();
    }

    public int getPosition() {
        return position;
    }
}
```

위 코드를 살펴보면 `Car 객체를 생성하는 시점`에 객체 내부의 인스턴스 변수에 전략이 정해진다. 즉 추가적인 인스턴스 변수가 필요하고, `별도의 setter나 수정 관련 메서드`가 없다면 생성된 Car의 이동 전략은 변경되지 않을 것이다.

#### 2. move() 실행 시점에 전달된 전략 패턴

```java
public class Car {
    private final CarName name;
    private int position;

    public Car(String name) {
        this.name = new CarName(name);
        this.position = 0;
    }

    public void move(MovingPolicy movingPolicy) {
        if (movingPolicy.isMovable()) {
            position++;
        }
    }

    public String getName() {
        return name.getName();
    }

    public int getPosition() {
        return position;
    }
}
```

위 코드는 전략을 가진 MovingPolicy를 `move() 메서드 실행 시점`에 전달되고 있다. 기존에 존재하던 인스턴스 변수는 유지할 필요 없어졌고, 이동할 때마다 전략을 변경할 수 있게 되었다. 하지만 move() 실행 시 외부에서 매번 전략을 전달해야 한다.

이것은 추가적인 질문을 통해 이해한 바가 맞는지 질문할 예정이다.

#### 리뷰 중 일부
```
지금 상황에서라면 1번 모습이 더 낫습니다. 
자동차의 움직임이 변경되는 요구사항이 없기 때문에 굳이 move를 할때마다 전략을 넘겨주는 행위는 불필요하다고 생각해요.
추후에 예를 들어, 객체에 매번 메세지를 보낼때마다 행위가 달라져야하는 요구사항이 생긴다면 2번으로 코드를 작성해도 될 것 같아요. 
혹은 클래스내에 전략을 List로 가지고있고 인자값을 받은 후 맞는 전략을 선택해서 실행하게끔요.
```

```java
public class AA {
    private final List<AAPolicy> AAPolicies;
```

```
정리하면 잘못된건 없고 필요에 맞춰서 유연하게 사용하는것이 중요하다고 생각해요! 
```

나의 생각도 동일하다. 현재 상황에서는 주어진 동작 방식을 변경하기 위한 요구사항이 존재하지 않기 때문에 생성자를 통해 주입하는 방식이 적절하다고 판단한다. 

정리하면, 충분한 근거와 함께 필요에 맞게 사용하면 문제는 없다! 추가적으로 전략을 List로 관리하는 꿀팁까지 얻을 수 있었다.

### 검증 로직

요구사항 만족을 위해 다양한 검증 로직을 작성하였다. 각 객체의 검증 책임도 자신에게 있다고 생각하여 객체 내부에서 진행했다. 한 예시로 최초에 Car는 단순히 String으로 name이라는 인스턴스 변수를 가지고 있었다. 

```java
public class Car {
    private final String name;
    ...
    
    public Car(String name, MovingPolicy movingPolicy) {
        validateNull(name);
        validateEmpty(name);
        validateBlank(name);
        validateNameLength(name);
        this.name = name;
        ...
    }

    private void validateNull(String name) {
        if (name == null) {
            throw new IllegalArgumentException();
        }
    }
    private void validateEmpty(String name) {
        if (name.isEmpty()) {
            throw new IllegalArgumentException();
        }
    }
    private void validateBlank(String name) {
        if (name.isBlank()) {
            throw new IllegalArgumentException();
        }
    }
    private void validateNameLength(String name) {
        if (name.length() > 5) {
            throw new IllegalArgumentException();
        }
    }
    ...
}
```

하지만 과도하게 name에 대한 검증 로직이 늘어나 해당 객체의 책임을 이해하는데 어려움이 있다고 판단했고 결국 String을 포장한 `CarName` 객체를 작성하여 이름에 대한 책임을 분리했다.

현재에는 아래와 같이 작성하였다.

#### CarName
```java
public class CarName {
    private final String name;

    public CarName(String name) {
        validateNull(name);
        validateEmpty(name);
        validateBlank(name);
        validateNameLength(name);
        this.name = name;
    }

    private void validateNull(String name) {
        if (name == null) {
            throw new IllegalArgumentException("이름은 null이 될 수 없습니다.");
        }
    }

    private void validateEmpty(String name) {
        if (name.isEmpty()) {
            throw new IllegalArgumentException("이름이 비어 있습니다.");
        }
    }

    private void validateBlank(String name) {
        if (name.isBlank()) {
            throw new IllegalArgumentException("이름은 공백이 될 수 없습니다.");
        }
    }

    private void validateNameLength(String name) {
        if (name.length() > 5) {
            throw new IllegalArgumentException("이름은 5자를 초과할 수 없습니다.");
        }
    }

    public String getName() {
        return name;
    }
}
```

#### Car

```java
public class Car {
    private final CarName name;
    private int position;
    private final MovingPolicy movingPolicy;

    public Car(String name, MovingPolicy movingPolicy) {
        this.name = new CarName(name);
        this.position = 0;
        this.movingPolicy = movingPolicy;
    }

    public void move() {
        if (movingPolicy.isMove()) {
            position++;
        }
    }

    public String getName() {
        return name.getName();
    }

    public int getPosition() {
        return position;
    }
}
```

한 가지 고민인 것은 검증에 대한 책임을 `Validator`와 같은 클래스로 분리하는 것을 종종 본 기억이 있는데 어떠한 방식이 더 선호 되는지 궁금했다.

#### 리뷰 중 일부
```markdown
어떤 행위를 할때는 필요에 의해서 하는게 중요하다고 생각해요. 무조건 객체 포장해야지 가 아니라 왜 포장을 해야될까를 생각해보고 하는것이 중요합니다.
매트가 조치를 한 내용을 보니 잘 하신것으로 보여요.

* Car에서 이름검증 수행
* 역할이 너무 많아짐을 인지
* 분리의 필요성 인지
```

제이가 가장 강조한 것은 `필요`에 의한 객체 포장이다. 즉 포장을 진행할 때 그에 맞는 이유를 동반해야 한다. 

Validator의 경우에도 마찬가지이다. CarName과 유사한 검증 코드를 가진 다양한 객체가 있는 경우 공통 부분을 선별하여 Validator를 생성하면 된다.

* CarName말고 AirplaneName, ShipName 등등이 출현
* 3개의 객체에서 중복 로직들 인지
* 분리의 필요성 인지 -> `이유를 동반`
* NameValidator로 추출 -> `검증을 위한 책임 부여`

정리하면, 결국 모든 코드는 존재하기 위한 이유를 동반해야 한다.

### 매직 넘버에 대한 기준

프리코스 진행 당시 매직 넘버, 매직 리터럴에 대한 키워드를 확인하였고 이번 미션 에도 적용하기 위해 노력했다. 하지만 메서드 명에서 해당 기능을 뚜렷하게 표현하고 있을 때 상수로 변경하는 것이 맞는지 고민이 되었다. 이유는 한 메서드에서만 사용하기 때문에 중복 사용될 우려가 없고 무의미하게 메모리를 차지하는 것은 아닌지 등 적절한 기준에 대해 알지 못했다.

아래는 고민의 흔적 중 일부이다. 결국 상수 처리하지 않고 제출하였다.

```java
public class CarName {
    private final String name;

    public CarName(String name) {
        ...
        validateNameLength(name);
        this.name = name;
    }
    ...
    private void validateNameLength(String name) {
        if (name.length() > 5) {
            throw new IllegalArgumentException("이름은 5자를 초과할 수 없습니다.");
        }
    }
    ...
}
```

#### 리뷰 중 일부
```
메서드에서 이름을 검증한다는 것은 드러납니다.
하지만 이 이름의 길이인 5라는 값을 해당 메서드 말고 다른곳에서 쓰이면 어떻게 될까요? 모두 5라는 숫자가 들어가야합니다.
혹여나 길이에 대한 정책이 바뀌게되면 모든 5를 전부 찾아서 바꿔야되겠죠. 실수로 한 부분을 바꾸지 않는다면 장애가 날 수도 있습니다.
```

정리하면, 상수 추출은 결국 `해당 메서드만을 위한 것이 아니다.` 미래의 애플리케이션은 어떠한 규모로 성장할 지 모르기 때문에 충분한 습관을 들여야 한다. 결국 자연스럽게 매직 넘버와 관련된 위험성을 줄일 수 있게 된다.

### 패키지 구조

패키지란? 관련 클래스들을 모아서 관리할 수 있도록 사용한다.

자동차 경주 미션을 진행하며 view, domain, utils로 크게 3개의 패키지를 분리했는데 domain 패키지에 Car와 Car의 이동 전략, Controller를 포함하고 있다.

#### 리뷰 중 일부
```
현재 위와 같은 모습으로 보이는데요, Controller가 domain패키지에 위치하는것이 맞을까요?
자동차 만을 위한 정책이 들어가야 domain패키지의 역할에 맞다고 생각해요. Controller에 view를 의존하고있는데 domain이 controller를 가지게되면 view도 가지게 되는 꼴이됩니다. controller를 다른 패키지로 옮겨보면 어떨까요?
```

내가 생각하는 Controller의 역할은 domain과 view제어하며 명령을 내리는 역할이라고 생각한다. 즉 Controller를 제외한 domain과 view는 `서로의 존재`를 알지 못해야 한다. 하지만 현재 Controller와 domain을 같은 패키지에 위치 시키면 즉 `domain`이 `view에 대한 정보`를 알게 된다.

관련 내용은 [웹 MVC 각 컴포넌트 역할](https://tecoble.techcourse.co.kr/post/2021-04-26-mvc/)에서 확인할 수 있었다.

제이는 미션을 진행하며 지속적인 경험을 통해 습득할 수 있다고 조언했다.

## view에서 return

현재 InputView은 입력에 대한 책임을 가지도록 설정하였습니다. view에서 도메인의 비즈니스 로직을 포함하지 않아야 한다고 학습한 경험이 있습니다. 이러한 배경 지식으로 가장 고민한 부분은 아래와 코드입니다.

```java
public class InputView {
    private static final String INPUT_NAMES_MESSAGE = "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).";
    private static final String SPLIT_REGEX = ",";
    private static final int SPLIT_LIMIT = -1;
    private static final String INPUT_COUNT_MESSAGE = "시도할 회수는 몇회인가요?";

    public static String[] getCarNames() {
        System.out.println(INPUT_NAMES_MESSAGE);
        String input = Console.readLine();
        return input.split(SPLIT_REGEX, SPLIT_LIMIT);
    }

    public static Count getCount() {
        System.out.println(INPUT_COUNT_MESSAGE);
        return new Count(Console.readLine());
    }
}
```

`getCount()`는 시도할 회수를 입력받아 `Count 객체를 생성하여 반환`한다. 보통 view에서는 domain을 활용한 비즈니스 로직을 실행하지 않아야 한다고 학습했다. 이유는 domain과 view는 서로의 존재를 몰라야 하기 때문이다.

#### 리뷰 중 일부
```
한마디로 정리하면 `view에서 domain을 생성해도 되는가?` 에 대한 질문으로 이해하였어요. 아니라면 재차 말씀부탁드려요.

현재 구조에서는 사실 뷰에서는 정말 input값만 가지고 컨트롤러로 넘어와서 컨트롤러에서 Count(도메인)을 new 해주는게 역할분리에 있어서 더 맞아보입니다.

지금 당장에 코드수정보다는 mvc 구조에 대해서 서치를 해보고 본인만의 지식으로 만들어보면 어떨까요?
여력이 된다면 수정해보시고, 조금더 레퍼런스를 찾아보고싶으시면 찾아보고 스레드로 남겨주시는것도 좋아요~
개인적으로는 추후에 코드적으로 경험할 일이 많으니 레퍼런스를 더 찾아보시는걸 추천드립니다.
```

만약 view가 웹 이라고 가정한다. 현재는 콘솔을 기반으로 한 view지만 이것을 교체하기 위해서는 최대한 domain에 대한 정보를 모르는 것이 좋다. 즉 view에 도메인 로직을 포함하면 안된다. 로직은 생성자를 포함한다.

아래와 같이 개선 가능하다.

#### InputView
```java
public class InputView {
    private static final String INPUT_NAMES_MESSAGE = "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).";
    private static final String SPLIT_REGEX = ",";
    private static final int SPLIT_LIMIT = -1;
    private static final String INPUT_COUNT_MESSAGE = "시도할 회수는 몇회인가요?";

    public static String[] getCarNames() {
        System.out.println(INPUT_NAMES_MESSAGE);
        String input = Console.readLine();
        return input.split(SPLIT_REGEX, SPLIT_LIMIT);
    }

    public static int getCount() {
        System.out.println(INPUT_COUNT_MESSAGE);
        return Console.readLine();
    }
}
```

#### RacingCarController
```java
public class RacingCarController {
    ...
    private Count getCount() {
        try {
            return new Count(InputView.getCount());
        } catch (IllegalArgumentException e) {
            OutPutView.printErrorMessage(e.getMessage());
            return getCount();
        }
    }
    ...
}
```

현재에는 view의 static 메서드를 활용하고 있다. 만약 요구사항이 변경되어 view를 바꾸게 된다면 domain 객체가 아닌 원시 타입이나 원시 타입을 포장한 객체 혹은 DTO를 사용하면 각 객체 간의 결합을 줄일 수 있다고 판단된다!

## MVC 패턴

### MVC란?

MVC(Model - View - Controller)는 애플리케이션을 세 가지 역할로 구분한 개발 방법론 중 하나이다.

### Model(Domain)
 * Controller가 호출할 때 요청에 맞는 역할을 수행한다. `비즈니스 로직을 구현하는 영역`으로 응용 프로그램에서 데이터를 처리하는 부분이 된다. 
 * DB에 연결하고 데이터를 조회, 저장 삭제 등의 작업을 수행하거나 데이터에 대한 변경 작업을 묶은 트랜잭션을 다루기도 한다.
 * Model은 다른 컴포넌트(View, Controller)들에 대해 알지 못한다. 오로지 자기 자신의 `수행해야 하는 행위`에 대해서만 알고 있다.

### View
 * `Controller`로 부터 받은 `Model`의 결과값을 가지고 `사용자에게 출력`할 화면을 만든다. `무엇을 보여주기 위한 역할`이다.
 * 만들어진 화면은 웹브라우저에 전송되어 웹브라우저에서 출력한다. 
 * View 또한 다른 컴포넌트(Model, Controller)들에 대해 알지 못한다. 자신의 수행해야 하는지만 알고 있다.

### Controller
 * 클라이언트의 요청을 받았을 때, 그 요청에 대한 `실제 업무를 수행하는 Model 컴포넌트`를 호출한다. Model이 데이터를 `어떻게 처리할지 알려주는 역할`이다.
 * 클라이언트가 보낸 데이터가 있다면 Model에 전달하기 쉽게 데이터를 가공한다. 모델이 해당 업무를 마치면 `결과`를 `View에 전달`한다.
 * 다른 컴포넌트(Model, View)들에 대해 알고 있다. Model과 View가 무엇을 수행하는지 알고 있다.

![](https://user-images.githubusercontent.com/59357153/153734491-35a83d12-3477-4a18-8314-df574d5ec32c.png)

내가 생각했을 때 MVC 패턴의 각 컴포넌트들의 의존관계를 그림으로 표현한 것이다.

### 더 생각해보기

현재 미션을 해결할 때 View는 Console로 진행된다. 하지만 추후 요구사항이 변경되어 Web의 화면을 표시하기 위한 View를 사용하기로 결정하면 어떻게 해야 하는지 생각해보았다.

의존 관계의 변경을 쉽게 하기 위해서는 협력을 이루는 객체간의 의존도가 낮아야 한다고 생각한다. 즉 View에서는 비즈니스 로직에 속하는 도메인 정보에 대해 알지 못해야 한다. 정해진 규격에 맞춘 데이터 타입을 기반으로 통신해야 한다.

즉 view에서 특정 도메인에게 메시지를 보내거나 반환하지 않아야 한다. 

### view 테스트

[System.in과 System.out에 대한 테스트](https://sakjung.tistory.com/33) 

제이의 추천 개시글을 읽어보자. 위 언급한 피드백보다 우선순위가 낫기 때문에 차근차근 리팩토링을 진행할 예정이다.

## 리뷰를 받는 사람의 자세

첫 리뷰를 진행하며 코드와 관련된 피드백도 중요하지만 가장 우선이 되야 하는건 `리뷰를 받는 사람의 자세`라고 생각한다.

#### 리뷰 중 일부
```
리뷰를 받는 사람은 이 사람이 왜 이렇게 이야기를 했을까를 고민하는것이 우선이 되어야한다고 생각해요. 하지만 더 중요한것은 리뷰어의 말이 전적으로 옳다는 아니라는 것입니다.
컨벤션이 잘못되었거나 요구사항대로 돌지 않는 버그가 있거나 하는 객관적인 것들은 다 반영이 되어야하는 부분이지만, 답이 없는 문제들 (예를 들면, 설계나 코딩 스타일 같은) 에 대해서는 사람마다 생각하는 것이 다르기 때문에 매트가 어떻게 생각하느냐가 더 중요해요.

같은 코드를 봐도 각자 본인만의 스타일이 있기 때문에 리뷰어들마다 다른 피드백이 올 수 있어요. 그 때마다 무조건적으로 받아들이게 되면 본인만의 아이덴티티가 모호해질 수 있어요. (아닌것같다고 생각하는 부분은 꼭 반론을 제시하시구요)
지금은 초반이라 걱정하지 않으셔도되지만 우테코가 끝날때쯤에는 매트는 어떤 스타일을 가진 개발자다 라는걸 어느정도 만들었으면 좋겠어요!

리뷰를 진행하실 때 중점적으로 살펴보는 태도에 대해서도 질문을 주셨는데, 저는 소통이 잘 되는걸 먼저 봐요. 어떤 코멘트를 남겼을때 긍정의 이모지 혹은 코멘트를 남기거나, 혹은 다르게 생각하면 반론의 스레드를 남기거나 하는것들이에요. 아무것도 달지 않으면 어떻게 생각하는지 알 수가 없으니까요. 매트는 잘 해주고 계셔서 걱정하지 않으셔도되어요!
```

정리하면 무조건적인 수용보다 약간의 `반란군 기질`을 발휘하며 `자신 만의 강점`을 키워야 한다는 것이다. 많은 생각을 하게 되는 조언을 들은 것 같다. 

## References

 * [웹 MVC 각 컴포넌트 역할](https://tecoble.techcourse.co.kr/post/2021-04-26-mvc/)
 * [System.in과 System.out에 대한 테스트](https://sakjung.tistory.com/33) 
