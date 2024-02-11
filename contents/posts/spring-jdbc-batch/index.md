---
title: "Spring JDBC로 batch 활용하기"  
date: 2022-05-24
update: 2022-05-24
tags: 
 - 우아한테크코스
 - JDBC
 - spring-jdbc
 - batch
feed:
  enable: false
---

![](https://user-images.githubusercontent.com/59357153/152970395-a31c8134-fc89-449f-b4dc-441e03df929c.png)

## 개요

`batch`란 데이터를 실시간으로 처리하는 것이 아니라 일괄적으로 모아 `한번에 처리`하는 것을 의미한다. `JdbcTemplate`의 `update` 메서드와 `batchUpdate`를 비교하여 배치로 진행한 것과 일반적으로 처리한 것에 어떠한 차이가 있는지 알아보려 한다.

## 프로젝트 세팅

[github repository 바로가기](https://github.com/hyeonic/blog-code/tree/main/spring-jdbc-batch)

우선 Spirng 환경에서 jdbc와 h2 DB를 활용하기 위해 아래와 같이 `build.gradle`에 의존성을 추가하였다.

```groovy
plugins {
    id 'org.springframework.boot' version '2.7.0'
    id 'io.spring.dependency-management' version '1.0.11.RELEASE'
    id 'java'
}

group = 'me.hyeonic'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '11'

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-jdbc'

    runtimeOnly 'com.h2database:h2'

    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}

tasks.named('test') {
    useJUnitPlatform()
}
```

단순한 예제를 작성하기 위해 domain 패키지 하위에 지하철역을 나타내는 `Station` 객체를 추가한다.

```java
public class Station {

    private final Long id;
    private final String name;

    public Station(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Station(String name) {
        this(null, name);
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
```

## JdbcTemplate의 update 메서드

보통 `JdbcTemplate`의 `update`의 메서드를 활용하여 데이터를 `insert`하기 위해 아래와 같이 작성할 수 있다.

```java
@Repository
public class JdbcTemplateStationDao {

    private final JdbcTemplate jdbcTemplate;

    public JdbcTemplateStationDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void save(Station station) {
        String sql = "insert into STATION (name) values (?)";
        jdbcTemplate.update(sql, station.getName());
    }
}
```

여러번의 `insert`를 테스트하기 위해 아래와 같이 테스트 코드를 작성한 뒤 실행해보았다.

```java
@JdbcTest
class JdbcTemplateStationDaoTest {

    private final JdbcTemplateStationDao jdbcTemplateStationDao;

    @Autowired
    public JdbcTemplateStationDaoTest(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplateStationDao = new JdbcTemplateStationDao(jdbcTemplate);
    }

    @DisplayName("batch 사용하지 않고 저장한다.")
    @Test
    void batch_사용하지_않고_저장한다() {
        long start = System.currentTimeMillis();

        for (int i = 0; i < 10000; i++) {
            String name = String.valueOf(i);
            jdbcTemplateStationDao.save(new Station(name));
        }

        long end = System.currentTimeMillis();
        System.out.println("수행시간: " + (end - start) + " ms");
    }
}
```

```
수행시간: 402 ms
```

여러번의 `insert`를 진행할 때 아래와 같은 형태로 쿼리가 요청될 것이다.

```sql
insert into STATION (name) values (?)
insert into STATION (name) values (?)
insert into STATION (name) values (?)
insert into STATION (name) values (?)
insert into STATION (name) values (?)
insert into STATION (name) values (?)
insert into STATION (name) values (?)
...
```

## JdbcTemplate의 batchUpdate 메서드

`JdbcTemplate` `batchUpdate`를 활용하면 아래와 같이 일괄적으로 한 번에 처리가 가능하다.

```sql
insert into STATION (name) 
values (?),
       (?),
       (?),
       (?),
       (?),
       (?),
       ...
```

이것을 달성하기 위해서는 아래와 같이 코드를 작성해야 한다.

```java
@Repository
public class JdbcTemplateStationDao {

    private final JdbcTemplate jdbcTemplate;

    public JdbcTemplateStationDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void saveAll(List<Station> stations) {
        String sql = "insert into STATION (name) values (?)";

        jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                Station station = stations.get(i);
                ps.setString(1, station.getName());
            }

            @Override
            public int getBatchSize() {
                return stations.size();
            }
        });
    }
}
```

`batchUpdate`의 첫 번째 매개변수로 배치 처리하기 위한 쿼리문이 들어가고 두 번째 매개 변수에는 `BatchPreparedStatementSetter`의 구현체가 들어간다.

 * `setValues`: 준비된 쿼리의 매개 변수 값을 설정할 수 있다. `getBatchSize`에서 명시한 횟수 만큼 호출한다.
 * `getBatchSize` 현재 배치의 크기를 제공한다.

이제 배치를 활용하여 앞서 진행한 테스트와 동일한 데이터를 기반으로 테스트를 진행한다.

```java
@JdbcTest
class JdbcTemplateStationDaoTest {

    private final JdbcTemplateStationDao jdbcTemplateStationDao;

    @Autowired
    public JdbcTemplateStationDaoTest(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplateStationDao = new JdbcTemplateStationDao(jdbcTemplate);
    }

    @DisplayName("batch 사용하고 저장한다.")
    @Test
    void batch_사용하여_저장한다() {
        List<Station> stations = IntStream.range(0, 10000)
                .mapToObj(String::valueOf)
                .map(Station::new)
                .collect(toList());

        jdbcTemplateStationDao.saveAll(stations);
    }
}
```

위 테스트의 수행 시간은 아래와 같다.

```
수행시간: 221 ms
```

정리하면 배치를 이용한 insert가 일반적으로 빠른 것을 확인 할 수 있다.

## NamedParameterJdbcTemplate을 활용한 batch

`NamedParameterJdbcTemplate`을 활용한 배치 처리도 가능하다.

```java
@Repository
public class NamedParameterJdbcTemplateStationDao {

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public NamedParameterJdbcTemplateStationDao(JdbcTemplate jdbcTemplate) {
        this.namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(jdbcTemplate);
    }

    public void save(Station station) {
        String sql = "insert into STATION (name) values (:name)";
        SqlParameterSource params = new MapSqlParameterSource("name", station.getName());
        namedParameterJdbcTemplate.update(sql, params);
    }

    public void saveAll(List<Station> stations) {
        String sql = "insert into STATION (name) values (:name)";
        SqlParameterSource[] batch = generateParameters(stations);
        namedParameterJdbcTemplate.batchUpdate(sql, batch);
    }

    private SqlParameterSource[] generateParameters(List<Station> stations) {
        return stations.stream()
                .map(this::generateParameter)
                .toArray(SqlParameterSource[]::new);
    }

    private SqlParameterSource generateParameter(Station station) {
        return new MapSqlParameterSource("name", station.getName());
    }
}
```

대부분 사용법은 유사하지만 `NamedParameterJdbcTemplate`의 `batchUpdate`의 두번째 매개 변수로 추가적인 인터페이스를 구현하지 않고 단순히 `SqlParameterSource[]`가 들어간다. 

또한 `SqlParameterSourceUtils`를 활용하면 리스트를 활용하여 간편하게 `SqlParameterSource[]`을 만들 수 있다.

```java
@Repository
public class NamedParameterJdbcTemplateStationDao {
    ...
    public void saveAll(List<Station> stations) {
        String sql = "insert into STATION (name) values (:name)";
        namedParameterJdbcTemplate.batchUpdate(sql, SqlParameterSourceUtils.createBatch(stations));
    }
}
```

이 또한 테스트를 진행해보면 아래와 같이 유의미한 차이를 확인할 수 있었다.

```java
@JdbcTest
class NamedParameterJdbcTemplateStationDaoTest {

    private final NamedParameterJdbcTemplateStationDao namedParameterJdbcTemplateStationDao;

    @Autowired
    public NamedParameterJdbcTemplateStationDaoTest(JdbcTemplate jdbcTemplate) {
        this.namedParameterJdbcTemplateStationDao = new NamedParameterJdbcTemplateStationDao(jdbcTemplate);
    }

    @DisplayName("batch 사용하지 않고 저장한다.")
    @Test
    void batch_사용하지_않고_저장한다() {
        long start = System.currentTimeMillis();

        for (int i = 0; i < 10000; i++) {
            String name = String.valueOf(i);
            namedParameterJdbcTemplateStationDao.save(new Station(name));
        }

        long end = System.currentTimeMillis();
        System.out.println("수행시간: " + (end - start) + " ms");
    }

    @DisplayName("batch 사용하고 저장한다.")
    @Test
    void batch_사용하여_저장한다() {
        long start = System.currentTimeMillis();

        List<Station> stations = IntStream.range(0, 10000)
                .mapToObj(String::valueOf)
                .map(Station::new)
                .collect(toList());

        namedParameterJdbcTemplateStationDao.saveAll(stations);

        long end = System.currentTimeMillis();
        System.out.println("수행시간: " + (end - start) + " ms");
    }
}
```

```
수행시간: 531 ms
수행시간: 236 ms
```

## References.

[3.5. JDBC Batch Operations](https://docs.spring.io/spring-framework/docs/current/reference/html/data-access.html#jdbc-advanced-jdbc)
