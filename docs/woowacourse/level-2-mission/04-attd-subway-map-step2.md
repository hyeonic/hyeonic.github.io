---
title: 04. 3단계 - 지하철 노선도
tags: ['우아한테크코스', '미션']
date: 2022-05-19 16:20:00
feed:
  enable: true
---

# 04. 3단계 - 지하철 노선도

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/152970395-a31c8134-fc89-449f-b4dc-441e03df929c.png />

## 목표

우아한테크코스에서 진행한 미션의 리뷰와 피드백에 대해 정리한다. 실제 리뷰는 [[Spring 지하철 노선도 - 3단계] 매트(최기현) 미션 제출합니다.](https://github.com/woowacourse/atdd-subway-map/pull/283)에서 확인할 수 있다.

## 04. 3단계 - 지하철 노선도 확인

이번 미션에서는 지하철역과 노선을 기반으로 지하철 구간을 추가하기 위한 API가 추가되었다. 구간 추가를 위한 복잡한 요구사항이 추가되어 그것을 적절히 검증하기 위한 테스트 코드 작성에 많은 시간을 투자하게 되었다. 

## 도메인?? 엔티티??

보통 DB 테이블과 매핑 되는 객체를 Entity라고 알고 있다. 하지만 이번 미션에서 제공된 Line, Station, Section의 경우 Entity 처럼 생겼지만 도메인 패키지 내부에 위치하고 있었다. 또한 필드 들은 대부분 DB에 저장된 `Primary Key`를 가지고 있었다. 

레벨 1 미션을 진행할 때는 DB에 대해 전혀 고려하지 않았기 때문에 도메인 로직에 집중하여 객체를 설계할 수 있었다. 하지만 DB에서 조회한 데이터를 적절히 Mapping하며 도메인 객체로 변환하는 것은 생각보다 쉽지 않게 다가왔다. 결국 이번 미션을 접할 때도 아래와 같이 DB에 의존적인 코드를 작성하는 듯한 기분이 들었다.

```java
public class Section {
    
    private Long id;
    private Long lineId;
    private Long upStationId;
    private Long downStationId;
    private int distance;
    ...
}
```

하지만 좀 더 객체지향에 가까운 코드를 작성하려면 아래와 같은 형태가 되어야 한다고 생각했다. 각각의 필드들은 객체의 식별자를 가지는 것이 아닌 객체 자체가 담겨야 한다는 것이다.

```java
public class Section {

    private Long id;
    private Line line;
    private Station upStation;
    private Station downStation;
    private Integer distance;
    ...
}
```

관련된 고민을 진행하던 중 리뷰어에게 질문을 던졌다. 

::: tip 리뷰 중 일부

`매트`: 결국 이것을 해결하기 위해서는 도메인과 엔티티의 개념을 분리하여 관리해야 할까요??

:::

::: tip 리뷰 중 일부

`리뷰어`: 현재 도메인과 엔티티를 나누면 달라지는게 있을까요? 지금 문제는 도메인코드를 객체사이에 참조하게됐을 때, 쿼리를 작성하기가 어려운 부분이 문제 아닌가요?

:::

그렇다. Dao를 통해 온전한 도메인 객체를 만들기 위해서는 연관된 테이블을 적절히 `join`하여 사용하기 때문에 복잡한 쿼리문을 동반하게 된다. 

`Section`의 경우 `Line`과 `Station` 객체를 가지고 있다. 조회 시 적절히 데이터를 Mapping 하기 위해서는 아래와 같은 `sql`이 필요하게 된다.

```java
@Repository
public class SectionDao {
   ...
   public List<Section> findByLineId(Long lineId) {
        String sql = "select s.id, "
                + "s.line_id, l.name as line_name, l.color as line_color, "
                + "s.up_station_id, up.name as up_station_name, "
                + "s.down_station_id, down.name as down_station_name, "
                + "s.distance "
                + "from SECTION s "
                + "join LINE l on s.line_id = l.id "
                + "join STATION up on s.up_station_id = up.id "
                + "join STATION down on s.down_station_id = down.id "
                + "where s.line_id = :lineId";

        return jdbcTemplate.query(sql, Map.of("lineId", lineId), generateRowMapper());
    }
    ...
}
```

이러한 sql의 결과로 아래와 같은 `RowMapper`를 통해 객체를 생성하여 반환하게 된다.

```java
@Repository
public class SectionDao {
   ...
    private RowMapper<Section> generateRowMapper() {
        return (resultSet, rowNum) -> {
            Long sectionId = resultSet.getLong("id");

            Long lineId = resultSet.getLong("line_id");
            String lineName = resultSet.getString("line_name");
            String lineColor = resultSet.getString("line_color");
            Line line = new Line(lineId, lineName, lineColor);

            Long upStationId = resultSet.getLong("up_station_id");
            String upStationName = resultSet.getString("up_station_name");
            Station upStation = new Station(upStationId, upStationName);

            Long downStationId = resultSet.getLong("down_station_id");
            String downStationName = resultSet.getString("down_station_name");
            Station downStation = new Station(downStationId, downStationName);

            int distance = resultSet.getInt("distance");

            return new Section(sectionId, line, upStation, downStation, distance);
        };
    }
    ...
}
```

이제 Section은 다른 객체의 식별자가 아닌 객체를 가지고 있기 때문에 객체 탐색으로 해당 객체의 정보를 획득할 수 있다. 복잡한 쿼리문을 작성해야 하지만 보다 더 객체지향 적인 코드를 작성할 수 있기 때문에 장점이 더큰 리팩토링이라고 생각한다.

하지만 만약 도메인 객체의 참조가 깊은 경우는 어떻게 해야 할까? 결국 해당 객체를 온전히 생성하기 위해서는 더욱 더 복잡하고 이해하기 어려운 쿼리를 작성해야 할 것이다. 이것은 아직 직면한 상황은 아니지만 충분히 고려해야 할 부분이라고 생각한다. 

현재는 단순한 요구사항이기 때문에 비교적 적은 노력으로 온전한 도메인 객체를 만들 수 있었다. 만약 복잡한 테이블과 도메인 구조를 동반하게 된다면 매번 복잡한 쿼리를 작성하는 것은 쉽지 않을 것으로 판단한다. 결국 이것이 `SQL Mapper`의 한계일까?

::: tip 리뷰 중 일부

`리뷰어`: 말씀해주신대로 매번 쿼리를 만들어내기가 어려운 부분은 있는 것 같습니다. 나중에 배울 Spring Data를 활용하면 쉽게 가져올 수 있을 것 같습니다. 하지만 Spring Data도 만능은 아닙니다. 복잡한 쿼리는 SQL Mapper나 JDBC를 통해서 조회합니다. 즉 JPA만이 정답은 아니라고 말씀드리고싶네요.

:::

언급해주신 것 처럼 ORM을 활용하게 되면 DB 테이블의 값들을 편리하게 객체로 생성하여 관리할 수 있다. 아직 JPA를 활용한 미션을 진행하진 않았지만 ORM이 만능 해결책은 될 수 없다는 것을 염두해 두어야 겠다.

## 도메인 vs 엔티티

위에 언급한 것 처럼 객체가 id와 같은 식별자를 가진 경우 Entity의 성격을 가진 객체라고 생각했다.

::: tip 리뷰 중 일부

`매트`: 이전에 미션을 진행할 때 핵심 비즈니스 로직을 가진 도메인 객체는 `dao와 같은 영속 계층에 의존하는 구조`는 DB에 의존적인 코드를 작성할 수 있기 때문에 를 좋지 않다는 것을 학습하였습니다. 이번에 제공된 코드를 확인했을 때 domain 패키지 내부에 평소에 생각했던 `Entity`와 비슷한 객체가 위치한 것을 확인했습니다. 물론 Entity도 내부 필드를 활용한 로직을 작성할 수 있지만 식별자를 가지기 때문에 영속 계층과 가까운 객체라고 생각했습니다.

하지만 이번 개선을 통해 `Entity`라고 생각했던 Section은 단순히 DB와 매핑되는 것을 넘어 비즈니스의 핵심 로직 까지 가지게 되었습니다. 결국 `Entity`도 `domain의 일부분`처럼 사용될 수 있다고 이해해도 괜찮을까요?

:::

위와 같은 질문에 아래와 같은 답변을 확인할 수 있었다.

::: tip 리뷰 중 일부

`리뷰어`: 개인적으로 도메인객체가 id를 갖고 있다고해서 영속성에 의존한다고 생각하지 않습니다. 도메인객체도 id를 갖을 수 있지 않을까요?
사람의 식별자(주민번호), 차량의 식별자(차량번호) 등이 있을텐데, 이것도 데이터베이스에 의존하는걸까요?

:::

대한민국에 사는 국민이라면 유일한 식별자 번호인 `주민번호`를 가지고 있을 것이다. 단순히 유일함을 나타내는 필드일 뿐 이것은 DB에 의존하고 있다는 것을 내포하지 않는다. 즉 도메인에서 활용하는 식별자는 비즈니스 로직의 요구사항의 일부분 이기 때문에 충분히 활용될 수 있을 것이다.

## service가 service를 의존하는 것

`LineService`를 작성하던 중 노선은 많은 책임을 가지고 있기 때문에 다양한 `Dao를 의존`하도록 설계하였다. 하지만 `StationDao`의 경우 `StationService`도 존재하기 때문에 `LineService`가 `StationDao`를 의존할 경우 `검증을 위한 중복된 코드`를 야기하게 되었다.

Service가 Dao를 가지는 것은 Dao가 Service를 의존하지 않기 때문에 단방향 의존성을 보장한다고 생각한다. 만약 Service가 Service를 의존하게 될 경우 잘못된 설계에 의해 상호 참조될 우려가 있다고 판단했다. 

::: tip 리뷰 중 일부

`리뷰어`: 예를들어 LineService가 StationDao를 의존하게되면 어떤 문제가 발생할 수 있을까요? 또 Service를 의존했을 때 장단점을 정리해주시면 좋을 것 같습니다 🙂

:::

::: tip 리뷰 중 일부

`매트`: 현재 구조 처럼 StationService가 존재할 때 StationDao를 참조하는 것은 좋지 않다고 생각됩니다. 현재는 단순한 구조이지만 Service 계층에는 주요 비즈니스 로직의 검증과 트랜잭션을 통한 데이터 무결성을 지키고 있기 때문에 직접적으로 dao를 사용할 때 보다 안전하게 사용이 가능하고 중복 코드를 줄일 수 있습니다.

하지만 한 가지 주의해야 할 점은 뚜렷한 상위 하위의 계층 구조를 가지고 있어야 한다는 것입니다. 만약 StationService에서도 LineService를 참조하게 되면 상호 참조로 인해 애플리케이션이 시작되지도 못할 것 입니다. 이것은 설계에 문제가 있다는 것을 암시하기 때문에 로직들을 적절한 책임을 가진 객체로 이전해야 합니다.

:::

추가적으로 관련하여 크루들과 이야기를 나누던 중 굉장히 감명 깊에 들은 말이 있었다.

::: tip 익명의 크루

도메인에서도 다른 도메인을 가질 수 있는데 그게 왜 이상하냐?

:::

## 노선도의 순서를 보장하기 위한 방법들

노선에 적절히 추가할 수 있는 구간인지 검증 및 적절히 추가, 삭제를 위한 용도로 도메인 패키지에 `Section` 리스트를 관리하기 위한 일급 컬렉션 `Sections`를 생성하였다.

초기에는 로직을 수행시키기 위해 순서를 중요하지 않았기 때문에 단순한 `ArrayList`를 활용하였다. 하지만 클라이언트에서 적절히 정렬된 구간 List가 필요했기 때문에 복잡한 재귀를 통해 구간을 조회하게 되었다.

```java
public class Sections {
    ...
    private void addSection(List<Section> sections, Section prevSection) {
        sections.add(prevSection);

        for (Section currentSection : value) {
            checkConnect(sections, prevSection, currentSection);
        }
    }

    private void checkConnect(List<Section> sections, Section prevSection, Section currentSection) {
        if (prevSection.isConnect(currentSection)) {
            addSection(sections, currentSection);
        }
    }
    ...
}
```

::: tip 리뷰 중 일부

`리뷰어`: 여기 메서드 흐름이 잘 이해가 가지않습니다 🥲
어떤 역할인지 설명과 순환되는 구조를 풀어낼 수 있는 방법도 고려해보시면 좋겠습니다.

:::

::: tip 리뷰 중 일부

`매트`: 기존코드에서는 로직 상에서 단순한 ArrayList를 활용해도 무관하다고 판단하여 조회를 진행할 때만 재귀를 통해 정렬할 수 있도록 하였습니다. 지속적인 고민 끝에 노선도와 유사한 컬렉션인 `LinkedList`를 활용하기로 결정하였습니다!

이제 매번 Section을 추가하거나 삭제할 때 기존 노선의 순서를 유지한 채 관리 되므로 이전에 작성한 재귀를 통한 정렬 로직은 제거하였습니다!

:::

위와 같이 이제 노선에 구간을 추가할 때 다양한 검증을 통해 `LinkedList`에 추가하도록 개선하였다.

```java
public class Sections {
    private final LinkedList<Section> value;
    ...
    public void append(Section section) {
        validateSameSection(section);
        validateContainsStation(section);
        validateNotContainsStation(section);

        if (isUpTerminus(section)) {
            value.addFirst(section);
            return;
        }

        if (isDownTerminus(section)) {
            value.addLast(section);
            return;
        }

        decideForkedLoad(section);
    }
    ...
}
```

덕분에 조회를 진행할 때 그대로 반환하도록 개선할 수 있게 되었다.

```java
public class Sections {
    ...
    public List<Section> getValue() {
        return Collections.unmodifiableList(value);
    }
}
```

## 생각 정리

이번 미션을 통해 이전에 혼자 학습했던 Java, Spring과 관련된 지식들의 빈 공간들이 조금씩 채워져 가는 기분을 느꼈다. 특히 Service 계층에서 대부분을 차지하던 비즈니스 로직들이 적절한 책임을 가진 도메인 로직으로 이동하면서 앞서 배운 객체지향적인 코드, 변경에 유연한 코드를 만들었고 테스트 하기 용이한 구조를 만들었다.

기술적인 지식 습득도 중요하지만 못지 않게 전반적인 애플리케이션 구조에 대해서도 많은 고민을 하게 된다. 특정 계층이 왜 존재해야 하는지에 대한 의문을 가지게 됬으며 실제 적용한 사례를 통해 필요한 근거들을 채워가는 좋은 시간이 되었다.

## References.

<TagLinks />
