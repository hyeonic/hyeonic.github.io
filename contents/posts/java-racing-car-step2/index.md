---
title: "[레벨 1] 02. 2단계 - 자동차 경주 구현"
date: 2022-02-17
update: 2022-02-17
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

우아한테크코스에서 진행한 미션의 리뷰와 피드백에 대해 정리한다. 실제 리뷰는 [[2단계 - 자동차 경주 리팩터링] 매트(최기현) 미션 제출합니다.](https://github.com/woowacourse/java-racingcar/pull/349)에서 확인할 수 있다.

## 1. 객체지향 관점에서 유틸리티 클래스

최초에 미션을 접하고 설계를 진행할 때에도 객체지향적인 설계를 위해 노력했다. 하지만 모든 클래스에서 공유하여 사용할 수 있는 `클래스 메서드`들의 사용은 장점도 많지만 객체지향에 가깝지 않다고 학습한 경험이 있고 `클래스 메서드`들은 `객체의 생명주기`와 관계없이 관리되기 때문에 객체가 중심이 되는 `객체지향`과는 거리가 멀다고 판단했다.

또한 기존 utils 패키지에 존재하던 `유틸리티 클래스(Console, Randoms)`의 역할이 다소 부실하다고 느꼈습니다. 또한 사용되는 곳이 한정적이기 때문에 굳이 클래스 분리를 하지 않고 객체 내부로 `해당 책임을 이전(InputView, RandomMovingPolicy)` 하여 유틸리티 클래스를 제거했다.

이러한 학습을 기반으로 아래와 같이 개선했다.

* 기존 utils 패키지에 있던 모든 클래스를 제거했다.
* 클래스 메서드를 가졌던 InputView와 OutputView를 객체 생성으로 변경한 뒤 Controller 생성 시점에 주입했다.

#### InputView

```java
public class InputView {
    private static final String INPUT_NAMES_MESSAGE = "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).";
    private static final String SPLIT_REGEX = ",";
    private static final int SPLIT_LIMIT = -1;
    private static final String INPUT_COUNT_MESSAGE = "시도할 회수는 몇회인가요?";

    private final Scanner scanner;

    public InputView() {
        this.scanner = new Scanner(System.in);
    }

    public String[] getCarNames() {
        System.out.println(INPUT_NAMES_MESSAGE);
        String input = scanner.nextLine();
        return input.split(SPLIT_REGEX, SPLIT_LIMIT);
    }

    public String getCount() {
        System.out.println(INPUT_COUNT_MESSAGE);
        return scanner.nextLine();
    }
}
```

#### OutputView

```java
public class OutputView {
    private static final String STATUS_MESSAGE = "\n실행 결과";
    private static final String WINNER_NAME_DELIMITER = ", ";
    private static final String END_MESSAGE = "가 최종 우승했습니다.";

    public void printStatusMessage() {
        System.out.println(STATUS_MESSAGE);
    }

    public void printStatus(String carsStatus) {
        System.out.println(carsStatus);
        System.out.println();
    }

    public void printResult(List<String> winners) {
        System.out.println(String.join(WINNER_NAME_DELIMITER, winners) + END_MESSAGE);
    }

    public void printErrorMessage(String message) {
        System.out.println(message + "\n");
    }
}
```

#### Application

```java
public class Application {

    public static void main(String[] args) {
        new RacingCarController(new InputView(), new OutputView()).run();
    }
}
```

### 변경 후 이점

변경 후 이점에 대해 고민 해보았다. 우선 RancingCarController 생성 시점에 View에 대한 의존성을 주입하기 때문에 후에 요구사항이 변경된다면 View를 다른 종류의 View(ex. web)를 주입하여 유연하게 변경이 가능하다고 생각한다.

또한 외부의 자원에 의존하지 않기 때문에 단위 테스트를 작성할 때 온전히 해당 객체만을 테스트할 수 있었다. 덕분에 view와 관련된 단위 테스트까지 진행할 수 있었다.

제이에게 이러한 방향성을 가지고 개선하였다는 것을 전달하였고 아래와 같은 답변을 확인할 수 있었다.

#### 리뷰 중 일부
```
첫 번째 미션인데도 불구하고 많은것을 도전해보셨네요 👍
랜덤값을 이용하는 Car에 대한 테스트를 어떻게 진행해야할까를 넘어서 Controller도 상황에 맞게 테스트 가능한 구조를 만들어보셨네요. 말씀 주신 내용에 대한 이견은 없습니다! 구조가 훨씬 유연해졌다고 생각해요.
```

긍정적인 답변을 확인할 수 있었다. 후에는 특정 객체를 생성하여 주입하는 책임을 따로 분리해볼 생각이다. 현재에는 생성자 주입을 통한 점진적인 코드로 발전시키기 위해 노력하고 있다.

## View 테스트 진행

기존에 받은 피드백을 기반으로 view 테스트를 진행했고, 의도한 대로 동작하는 것을 확인했다. 특히 @MethodSource를 활용하여 복잡한 객체를 전달하는 방법을 습득하였다.

```java
private staticStream<Arguments> getNamesMethodSourceProvider() {
    return Stream.of(
        Arguments.arguments("pobi,woni,jun", 3),
        Arguments.arguments(",,,,", 5),
        Arguments.arguments(",pobi,", 3),
        Arguments.arguments(" , ,, , ", 5),
        Arguments.arguments("pobi", 1)
    );
}
```

## 의도하지 않은 DTO 도입

이전에 Car에서 값을 가공하여 출력문을 만드는 책임을 `CarsStatus`에게 주어 `domain 패키지`에 위치하였다. 하지만 관련해서 아래와 같은 피드백을 확인하였다.

#### 리뷰 중 일부
```
CarStatus라는 도메인패키지에 위치하고있는 클래스안에서 carStatus.append(CAR_STATUS_CRITERIA); 와 같이 뷰에서 그려주는 로직들이 들어있는데요,(makeCarStatus메서드) domain에서 뷰에 그려주는 로직들을 분리하여 view에게 책임을 가져가도록 리팩토링해보면 어떨까요?
```

처음 의도는 `view에서 단순히 domain을 get하는 행위 조차 분리하기 위한 목적`이었다. 하지만 결국 CarsStatus에서는 `출력을 위한 문장을 만드는 책임`을 가지게 되었다. 결국 `domain 내부에 view와 관련된 로직이 포함`된 것이다. 

하지만 도저히 `view에서 domain 관련 객체를 get하는 것`은 자존심이 허락하지 않았다. 결국 개선하기 위한 다른 방법이 필요했다.

위와 같은 피드백을 확인하고 아래와 같이 개선하였다.
 * `CarsStatus` 객체를 `제거`하였다.
 * `domain`이 `view`에서 사용되지 않도록 `추가적인 DTO를 사용`하여 `결합도를 낮추었다.`

#### CarDto

Car 객체의 정보를 전달하기 위한 DTO이다.

```java
public class CarDto {
    private final String name;
    private final int position;

    public CarDto(Car car) {
        this.name = car.getName();
        this.position = car.getPosition();
    }

    public String getName() {
        return name;
    }

    public int getPosition() {
        return position;
    }
}
```

#### CarsDto

Cars 객체의 정보를 전달하기 위한 DTO이다.

```java
public class CarsDto {
    private final List<CarDto> cars;

    public CarsDto(Cars cars) {
        this.cars = cars.getCars()
            .stream()
            .map(CarDto::new)
            .collect(toList());
    }

    public List<CarDto> getCars() {
        return Collections.unmodifiableList(cars);
    }
}
```

`getCars()`를 활용할 때 `Collections.unmodifiableList()`를 활용하여 불변성을 유지하기 위해 노력하였다.

#### OutputView

이제 `Cars(domain)`에서 직접적으로 값을 꺼내 출력문을 만들지 않고 `CarsDto`를 통해 전달 받은 값으로 출력문을 생성하도록 개선하였다.

```java
public class OutputView {
    private static final String STATUS_MESSAGE = "\n실행 결과";
    private static final String CARS_STATUS_JOIN_DELIMITER = "\n";
    private static final String CAR_STATUS_CRITERIA = " : ";
    private static final int DEFAULT_POSITION = 0;
    private static final String CAR_STATUS_POSITION = "-";
    private static final String WINNER_NAME_DELIMITER = ", ";
    private static final String END_MESSAGE = "가 최종 우승했습니다.";

    public void printStatusMessage() {
        System.out.println(STATUS_MESSAGE);
    }

    public void printStatus(CarsDto carsDto) {
        System.out.println(makeCarsStatus(carsDto));
        System.out.println();
    }

    public String makeCarsStatus(CarsDto carsDto) {
        return carsDto.getCars()
            .stream()
            .map(this::makeCarStatus)
            .collect(joining(CARS_STATUS_JOIN_DELIMITER));
    }

    private String makeCarStatus(CarDto carDto) {
        StringBuilder carStatus = new StringBuilder(carDto.getName());
        carStatus.append(CAR_STATUS_CRITERIA);
        int position = carDto.getPosition();
        while (position-- > DEFAULT_POSITION) {
            carStatus.append(CAR_STATUS_POSITION);
        }
        return carStatus.toString();
    }

    public void printResult(List<String> winners) {
        System.out.println(String.join(WINNER_NAME_DELIMITER, winners) + END_MESSAGE);
    }

    public void printErrorMessage(String message) {
        System.out.println(message + "\n");
    }
}
```

객체 간의 의존 관계를 그림으로 표현하면 아래와 같다.

![](https://user-images.githubusercontent.com/59357153/154450880-b0c996b9-5366-4505-80d5-5be2ed0aca4b.png)

## VO 

관련해서는 [VO(Value Ojbect)란 무엇일까?](https://tecoble.techcourse.co.kr/post/2020-06-11-value-object)에서 답을 확인할 수 있었다. 추가적인 학습을 통해 정리가 필요 할 것 같다.

## References

 * [웹 MVC 각 컴포넌트 역할](https://tecoble.techcourse.co.kr/post/2021-04-26-mvc/)
 * [System.in과 System.out에 대한 테스트](https://sakjung.tistory.com/33)
 * [VO(Value Ojbect)란 무엇일까?](https://tecoble.techcourse.co.kr/post/2020-06-11-value-object)
