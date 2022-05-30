---
title: 05. 사전 준비, 1단계 - 지하철 경로 조회
tags: ['우아한테크코스', '미션']
date: 2022-05-31 00:30:00
feed:
  enable: true
---

# 05. 사전 준비, 1단계 - 지하철 경로 조회

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/152970395-a31c8134-fc89-449f-b4dc-441e03df929c.png />

## 목표

우아한테크코스에서 진행한 미션의 리뷰와 피드백에 대해 정리한다. 실제 리뷰는 [[Spring 경로 조회 - 1단계] 매트(최기현) 미션 제출합니다.](https://github.com/woowacourse/atdd-subway-path/pull/209)에서 확인할 수 있다.

## 05. 사전 준비, 1단계 - 지하철 경로 조회 확인

이번 지하철 경로 조회에서는 레거시 코드를 기반으로 추가되는 요구사항에 대응하며 변경에 유연한 구조로 설계하는 경험을 진행한다. 또한 다양한 웹 애플리케이션 아키텍처에 대해 알아보며 적절한 방안을 택해 적용한다. 

이번 미션에서는 기존 지하철 노선도 코드를 기반으로 최단 경로에 대한 기능을 추가한다. 최단 경로를 구하는 방법으로는 외부 라이브러리인 `jgrapht 라이브러리`를 활용하는 것이 요구 조건에 추가되었다.

## 학습 테스트 

앞서 언급한 것 처럼 외부 라이브러리인 jgrapht를 활용하여 최단 경로를 조회해야 한다. 처음 사용해보는 라이브러리이기 때문에 공식 문서와 예시들을 기반으로 간단한 학습 테스트를 진행하였다.

```java
public class JgraphtTest {
    ...
    @DisplayName("지하철역을 기반으로 최단 경로를 확인한다.")
    @Test
    void getDijkstraShortestPathWithStation() {
        WeightedMultigraph<Station, DefaultWeightedEdge> graph = new WeightedMultigraph(DefaultWeightedEdge.class);
        Station 낙성대역 = new Station("낙성대역");
        Station 신림역 = new Station("신림역");
        Station 신대방역 = new Station("신대방역");
        Station 신도림역 = new Station("신도림역");
        graph.addVertex(낙성대역);
        graph.addVertex(신림역);
        graph.addVertex(신대방역);
        graph.addVertex(신도림역);
        graph.setEdgeWeight(graph.addEdge(낙성대역, 신림역), 10);
        graph.setEdgeWeight(graph.addEdge(신림역, 신대방역), 10);
        graph.setEdgeWeight(graph.addEdge(신대방역, 신도림역), 10);
        graph.setEdgeWeight(graph.addEdge(낙성대역, 신도림역), 50);

        DijkstraShortestPath dijkstraShortestPath = new DijkstraShortestPath(graph);
        GraphPath<Station, DefaultWeightedEdge> shortestPath = dijkstraShortestPath.getPath(낙성대역, 신도림역);
        List<Station> vertexes = shortestPath.getVertexList();

        assertAll(
                () -> assertThat(vertexes.size()).isEqualTo(4),
                () -> assertThat(shortestPath.getWeight()).isEqualTo(30)
        );
    }
}
```

덕분에 페어와 함께 빠르게 사용법에 대해 익힐 수 있었다. 또한 라이브러리에서 다양한 기능들을 제공해주었기 때문에 요구사항 달성이 생각보다 어렵지 않게 느껴졌다. 역시 잘 만들어진 것을 사용하는 것도 좋은 해결책이 될 수 있다는 생각이 들었다.

## 식별자를 가진 객체의 동등성 비교

이번 미션을 해결하며 대부분의 도메인 객체 들이 식별자인 Id를 가지도록 작성하였다. 이러한 객체들의 동등성 비교를 위해서 Id를 포함한 모든 객체들을 비교하여 작성하였다. 아래는 실제 적용한 예시입니다.

```java
public class Section {

    private final Long id;
    private final Line line;
    private Station upStation;
    private Station downStation;
    private int distance;
    ...

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Section section = (Section) o;
        return distance == section.distance && Objects.equals(id, section.id) && Objects.equals(line,
                section.line) && Objects.equals(upStation, section.upStation) && Objects.equals(
                downStation, section.downStation);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, line, upStation, downStation, distance);
    }
}
```

이러한 선택을 한 이유는 필드가 가변인 변수를 포함하기 때문이다. 즉 도메인 필드가 변할 우려가 있기 때문에 모든 필드가 동일해야 같은 객체를 보장한다고 생각했다. 하지만 이렇게 되면 유일한 식별자인 id의 특징이 모호 해질 것 같다고 생각된다.

추가적으로 현재 해당 도메인을 실제 DB에 영속 시켜야만 id 값을 가져올 수 있다. 만약 영속되지 않은 객체와 비교해야 할 때 id는 null로 비교가 불가능할 것 같은데 이럴 땐 Id를 제외한 나머지로 동등성을 판단해야 할까? 관련하여 리뷰어에게 질문을 드렸다.

::: tip 리뷰 중 일부

`리뷰어`: 현재 도메인에서는 식별자가 없다면 동등성을 보장할 수 없을 것 같아요 😓

:::

사실 이에 대한 생각은 이전 미션에서 어느정도 정리할 수 있었다. 다시 한번 언급하면 아래와 같다.

> 대한민국에 사는 국민이라면 유일한 식별자 번호인 `주민번호`를 가지고 있을 것이다. 내 이름이 `매트`에서 `패트`로 변경되어도 `주민번호라는 식별자`는 변하지 않기 때문에 유일한 객체임을 보장한다. 이것은 단순히 유일함을 나타내는 필드일 뿐 DB에 의존하고 있다는 것을 내포하지 않는다. 즉 도메인에서 활용하는 식별자는 비즈니스 로직의 요구사항의 일부분 이기 때문에 충분히 활용될 수 있을 것이다.

## 읽기 좋은 테스트

이번에 인수 테스트를 작성할 때 좀 더 읽기 좋은 문서화를 위해 테스트에서 사용하는 변수명은 한글로 작성하였다. `인수 테스트`의 경우는 다른 의사소통 집단과의 시나리오를 기반으로 진행하기 때문에 좀 더 읽기 좋은 테스트 코드를 작성해야 한다. 한글로 작성하게 된다면 Java 언어를 모르는 사람도 쉽게 읽을 수 있을 것이다.

```java
@DisplayName("경로 관련 기능")
public class PathAcceptanceTest extends AcceptanceTest {

    @DisplayName("경로 조회")
    @TestFactory
    Stream<DynamicTest> dynamicTestFromPath() {
        Long 건대입구역 = generateStationId("건대입구역");
        Long 강남구청역 = generateStationId("강남구청역");
        Long 대림역 = generateStationId("대림역");
        Long 낙성대역 = generateStationId("낙성대역");

        Long line7 = generateLineId("7호선", "deep green", 건대입구역, 강남구청역, 10);
        addSection(line7, 강남구청역, 대림역, 10);

        Long line2 = generateLineId("2호선", "green", 건대입구역, 낙성대역, 5);
        addSection(line2, 낙성대역, 대림역, 5);
    }
    ...
}
```

::: tip 리뷰 중 일부

`리뷰어`: 읽기 좋은 테스트 👍 Station이 아닌 Long 타입이니 변수명에 아이디임을 나타내도 좋겠네요!

:::

## to be continue...

::: tip 리뷰 중 일부

`리뷰어`: 도메인에서 특정 라이브러리에 의존하게 된다면 어떤 문제가 있을까요? 또 문제를 해결하기 위해 어떤 방법이 있을지 고민해보면 좋을 것 같습니다 :)

:::

언급하신 것 처럼 도메인이 특정 라이브러리에 의존하게 되면 외부 라이브러리의 변경에 도메인이 매우 취약한 구조가 된다고 생각한다. 이것은 다음 미션을 진행하며 개선된 사항들을 정리하려 한다.

## References.

[jgrapht](https://jgrapht.org/)

<TagLinks />
