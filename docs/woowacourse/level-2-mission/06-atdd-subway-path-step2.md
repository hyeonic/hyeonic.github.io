---
title: 06. 2단계 - 지하철 경로 조회
tags: ['우아한테크코스', '미션']
date: 2022-06-17 19:30:00
feed:
  enable: true
---

# 06. 2단계 - 지하철 경로 조회

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/152970395-a31c8134-fc89-449f-b4dc-441e03df929c.png />

## 목표

우아한테크코스에서 진행한 미션의 리뷰와 피드백에 대해 정리한다. 실제 리뷰는 [[Spring 경로 조회 - 2단계] 매트(최기현) 미션 제출합니다.](https://github.com/woowacourse/atdd-subway-path/pull/272)에서 확인할 수 있다.

## 06. 2단계 - 지하철 경로 조회 확인

2단계에서는 기존 로직에서 요금 정책에 대한 기능들이 추가되었다. 실제로 운영되고 있는 지하철 요금 정책을 대부분 적용했기 때문에 실제 존재하는 서비스를 만드는 듯한 느낌도 가져갈 수 있었다.

또한 1단계에서 `도메인에서 특정 라이브러리를 의존하는 문제`에 대한 리뷰가 있었다. 이것을 개선하기 위해 다양한 고민을 진행했으며 나름의 기준도 잡히게 되어 많은 것들을 얻을 수 있는 시간이 되었다.

## 특정 라이브러리에 종속적인 도메인

도메인이 외부 라이브러리에 강하게 의존하게 되면 외부 라이브러리의 변경에 도메인이 매우 취약한 구조가 된다고 생각한다. 많은 고민 끝에 `외부 라이브러리를 사용하는 행위` 자체를 추상화하여 `PathService에 주입`하는 형태로 개선하였다.

```java
public interface PathFindable {

    Path findPath(List<Section> sections, Station source, Station target);
}
```

경로를 찾기 위해 `findPath`를 가진 `PathFindable` 인터페이스이다. 위 인터페이스를 구현한 구현체가 외부 라이브러리를 가질 수 있도록 작성했다.

```java
@Component
public class ShortestPathFindable implements PathFindable {

    private final WeightedMultigraph<Station, DefaultWeightedEdge> graph;

    public ShortestPathFindable() {
        this.graph = new WeightedMultigraph<>(SectionEdge.class);
    }
    ...
}
```

```java
@Service
@Transactional(readOnly = true)
public class PathService {
    ...
    private final PathFindable pathFindable;

    public PathService(SectionDao sectionDao, StationService stationService, PathFindable pathFindable) {
        this.pathFindable = pathFindable;
    }
    ...
}
```

이제 도메인에서 더이상 외부 라이브러리를 의존하지 않고 있다. 또한 추후 경로 조회에 대한 요구사항이 변경되면 해당 인터페이스를 기반으로 추가적으로 구현하여 `Bean`으로 등록하면 손쉽게 `PathService`의 의존성을 변경할 수 있다.

더 나아가 현재 패키지 구조는 서비스 패키지에서 해당 인터페이스와 구현체를 모두 가지고 있다. 구현체는 외부 라이브러리를 강하게 의존하고 있기 때문에 도메인의 핵심 비즈니스 로직을 담당하는 서비스 패키지 내부에 위치하는 것이 맞는지에 대한 고민이 있다. 구현체만 외부 패키지 (ex. support)에 두면 도메인 내에 외부 라이브러리의 강한 의존성을 끊어낼 수 있지 않을까 생각한다.

## OCP를 지키자

처음 요금 계산을 진행하기 위해 나이 조건 마다 분기 처리를 위한 if문을 작성하였다.

```java
public class Fare {
    ...
    private int reduceFare(int fare) {
        if (age >= 13 && age < 19) {
            return (int) ((fare - DEDUCTION) * 0.8);
        }

        if (age >= 6 && age < 13) {
            return (int) ((fare - DEDUCTION) * 0.5);
        }

        return fare;
    }
    ...
}
```

해당 구조는 결국 나이에 대한 조건이 추가된다면 if문이 늘어날 수 밖에 없는 구조를 야기한다. 이것을 개선하기 위해 아래와 같이 enum을 활용하였다.

아래는 거리 비례로 요금 계산을 위한 `DistanceProportionCalculator`이다.

```java
public enum DistanceProportionCalculator {

    DEFAULT_STANDARD(distance -> 0 <= distance && distance <= 10, ignored -> 1250),
    FIRST_STANDARD(distance -> 10 < distance && distance <= 50,
            distance -> 1250 + (int) ((Math.ceil((distance - 10 - 1) / 5) + 1) * 100)),
    SECOND_STANDARD(distance -> distance > 50,
            distance -> 2050 + (int) ((Math.ceil((distance - 50 - 1) / 8) + 1) * 100))
    ;

    private final Predicate<Integer> condition;
    private final Function<Integer, Integer> function;

    DistanceProportionCalculator(Predicate<Integer> condition, Function<Integer, Integer> function) {
        this.condition = condition;
        this.function = function;
    }

    public static DistanceProportionCalculator from(int distance) {
        return Arrays.stream(values())
                .filter(it -> it.condition.test(distance))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(distance + "는 계산이 불가능한 거리입니다."));
    }

    public int calculateFare(int distance) {
        return function.apply(distance);
    }
}
```

그 다음 나이별로 할인을 적용하기 위한 `AgeDiscounter`이다.

```java
public enum AgeDiscounter {

    INFANT(age -> 0 <= age && age < 6, fare -> 0),
    CHILDREN(age -> 6 <= age && age < 13, fare -> (int) ((fare - 350) * 0.5)),
    TEENAGER(age -> 13 <= age && age < 19, fare -> (int) ((fare - 350) * 0.8)),
    ORDINAL(age -> age >= 19, fare -> fare)
    ;

    private final Predicate<Integer> condition;
    private final Function<Integer, Integer> function;

    AgeDiscounter(Predicate<Integer> condition, Function<Integer, Integer> function) {
        this.condition = condition;
        this.function = function;
    }

    public static AgeDiscounter from(int age) {
        return Arrays.stream(values())
                .filter(it -> it.condition.test(age))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(age + "는 할인할 수 없는 나이입니다."));
    }

    public int discount(int fare) {
        return function.apply(fare);
    }
}
```

이제 Fare는 제공된 distance, age, extraFare를 기반으로 필요한 부분을 적절히 호출하여 계산할 수 있다.

```java
public class Fare {

    private final int distance;
    private final int age;
    private final int extraFare;

    public Fare(int distance, int age, int extraFare) {
        this.distance = distance;
        this.age = age;
        this.extraFare = extraFare;
    }

    public int calculateFare() {
        DistanceProportionCalculator distanceProportionCalculator = DistanceProportionCalculator.from(distance);
        int fare = distanceProportionCalculator.calculateFare(distance);
        AgeDiscounter ageDiscounter = AgeDiscounter.from(age);
        return ageDiscounter.discount(fare + extraFare);
    }
}
```

## 비즈니스 로직은 도메인 내부로

```java
@Service
@Transactional(readOnly = true)
public class PathService {
    ...
    private int getMaxExtraFare(Path shortestPath) {
        List<Section> sections = shortestPath.getSections();
        return sections.stream()
                .map(Section::getLine)
                .mapToInt(Line::getExtraFare)
                .max()
                .orElse(DEFAULT_EXTRA_FARE);
    }
    ...
}
```

::: tip 리뷰 중 일부

`리뷰어`: 해당 로직은 service보다 더 적절한 곳이 있을 것 같아요. 😎

:::

### Transaction Script Pattern

Service 계층에서 절차지향에 가까운 코드로 비즈니스 로직을 작성하는 것을 마틴파울러는 `Transaction Script Pattern`이라 불렀다.

위 방법은 객체지향 설계보다 단순히 표현 계층의 요청을 처리하기 위한 로직을 Service 계층 내부에 작성한다는 것이다. 결국 로직을 통해 도출된 객체의 경우 단순히 데이터를 표현하기 위한 용도로 사용되기 때문에 객체 내부에 행위를 가지지 않게 된다.

### Domain Model Pattern

`Transaction Script Pattern`은 매우 단순하여 빠르게 로직을 구현할 수 있지만 비즈니스 로직 자체가 복잡해지면 유지보수에 매우 취약한 구조를 야기한다.

즉 객체지향 설계를 기반으로 비즈니스 로직을 도메인 객체 내부로 이동해야 한다. 객체 내부로 적절히 캡슐화하여 기능만 외부에 제공하는 방식으로 진행하면 데이터의 변경이 생겨도 핵심 비즈니스 로직에는 최소한의 영향을 끼치며 유지보수를 진행할 수 있게 된다.

객체지향 설계는 다양한 도메인 모델을 표현하기 위해 추가적인 객체를 작성해야하며 관리해야할 포인트들이 늘어난다. 그럼에도 객체지향 설계를 진행해야 하는 이유는 무엇일까?

 * 설계에 대한 이해와 유지보수에 용이하다. 각각의 객체는 작은 책임을 가지기 때문에 각 객체의 역할을 쉽게 확인할 수 있으며 책임의 변화에도 쉽게 변경할 수 있다.
 * 테스트하기 쉬워진다. 각각의 객체들에 비즈니스 로직이 들어있기 때문에 순수한 Java 코드를 기반으로 독립된 테스트를 진행할 수 있다.
 * 확장하기 용이한 구조이다. 다양한 디자인 패턴이나 다형성을 활용하여 실제 코드를 수정하지 않고 내부 구현체를 바꾸는 행위만으로 확장에 용이한 구조를 만들 수 있다.

이제 관련 리뷰를 다시 한번 살펴보자.

::: tip 리뷰 중 일부

`리뷰어`: 해당 로직은 service보다 더 적절한 곳이 있을 것 같아요. 😎

:::

기존에 Service 계층에 작성된 `getMaxExtraFare`를 도메인 객체 내부로 이동하여 개선한다.

::: tip 리뷰 중 일부

`매트`: 언급하신 것 처럼 Lin 컬렉션을 관리하기 위한 Lines를 생성하여 가장 큰 추가 요금을 반환할 수 있도록 개선하였습니다!

```java
public class Lines {

    private static final int DEFAULT_EXTRA_FARE = 0;

    private final List<Line> value;

    public Lines(List<Line> value) {
        this.value = new ArrayList<>(value);
    }

    public int getMaxExtraFare() {
        return value.stream()
                .mapToInt(Line::getExtraFare)
                .max()
                .orElse(DEFAULT_EXTRA_FARE);
    }
}
```

:::

## 정리

우테코 이전에 작성한 웹 애플리케이션을 살펴보면 Service 계층에 온갖 중요한 비즈니스 로직을 모두 작성하였다. 당시에는 객체지향에 대한 개념 조차 잡히지 않았으며 왜 그렇게 해야 하는지 조차 인지하지 못했기 때문이다. 

또한 도메인이 외부 라이브러리에 의존하는 것이 문제인지 조차 인지하지 못했다. 단순히 주어진 과업을 해결하기 위해 동작만 하도록 만들었다. 하지만 해당 코드들은 내가 작성했지만 리팩토링하기 쉽지 않았다. 

객체지향 설계는 많은 이점을 가져온다. 테스트가 용이한 구조가 되며 확장에는 유연하게 대처할 수 있다. 우리는 더 이상 객체지향 설계를 고려하지 않고 작성할 이유가 없다고 생각한다.

## References.

[Business Logic Organization Patterns](https://github.com/msbaek/memo/blob/master/Business-Logic-Organization-Patterns.md)

<TagLinks />
