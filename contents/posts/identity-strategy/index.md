---
title: "IDENTITY 전략는 추가 조회를 하지 않을 수 있다."
date: 2022-07-10
update: 2022-07-10
tags:
 - 우아한테크코스
 - jpa
 - IDENTITY
feed:
  enable: false
---


![](https://user-images.githubusercontent.com/59357153/152970395-a31c8134-fc89-449f-b4dc-441e03df929c.png)

## 개요

기본 키 할당 전략에 대한 학습을 진행하고 있었다. 기본 키 전략을 `IDENTITY`로 진행하면 데이터베이스에게 키 생성을 위임하기 때문에 JPA에서 기본 키 값을 얻어오기 위해서는 추가적인 데이터베이스 조회가 필요하다. 하지만 저장 관련 테스트를 진행했을 때 어디에도 조회와 관련된 쿼리는 찾을 수 없었다. 이게 어떻게 된 일인지 알아보려 한다.

## IDENTITY

앞서 언급한 것 처럼 `IDENTITY`는 기본 키 생성을 위한 전략을 데이터베이스에 위임 하는 것이다. `MySQL`은 보통 기본 키 자동 생성을 위해 `AUTO_INCREMENT`을 활용한다. 아래와 같이 `DDL`을 작성하면 INSERT할 때 자동으로 기본 키가 채워진다.

```sql
create table station (
   id bigint auto_increment,
    name varchar(255) not null,
    primary key (id)
)
```

하지만 기본 키 생성을 데이터베이스에서 진행할 경우 값이 저장되야 비로소 기본 키 값을 확인할 수 있다. 이제 JPA에 해당 전략을 적용하면 아래와 같이 작성할 수 있다.

```java
@Entity
public class Station {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    protected Station() {
    }

    public Station(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
```

간단한 예시를 위한 지하철 엔티티이다. 지하철은 이름을 가질 수 있고 기본 키 생성 전략은 `IDENTITY`이므로 데이터베이스에서 자동으로 생성된다. 만약 기본 키가 필요한 경우 조회를 위한 추가적인 쿼리가 필요할 것이다.

이제 `Station`을 저장하고 id값을 조회하는 테스트를 작성한 뒤 실행했다.

```java
@DataJpaTest
class StationRepositoryTest {

    @Autowired
    protected StationRepository stationRepository;

    @Test
    void save() {
        Station station = stationRepository.save(new Station("잠실역"));

        assertAll(() -> {
            assertThat(station.getId()).isNotNull();
            assertThat(station.getName()).isEqualTo("잠실역");
        });
    }
}
```

```bash
2022-07-10 00:56:55.797  INFO 99986 --- [    Test worker] o.h.e.t.j.p.i.JtaPlatformInitiator       : HHH000490: Using JtaPlatform implementation: [org.hibernate.engine.transaction.jta.platform.internal.NoJtaPlatform]
2022-07-10 00:56:55.806  INFO 99986 --- [    Test worker] j.LocalContainerEntityManagerFactoryBean : Initialized JPA EntityManagerFactory for persistence unit 'default'
2022-07-10 00:56:56.498  INFO 99986 --- [    Test worker] subway.domain.StationRepositoryTest      : Started StationRepositoryTest in 2.891 seconds (JVM running for 3.606)
2022-07-10 00:56:56.524  INFO 99986 --- [    Test worker] o.s.t.c.transaction.TransactionContext   : Began transaction (1) for test context [DefaultTestContext@6a362409 testClass = StationRepositoryTest, testInstance = subway.domain.StationRepositoryTest@2aa5eecd, testMethod = save@StationRepositoryTest, testException = [null], mergedContextConfiguration = [MergedContextConfiguration@36ea6a37 testClass = StationRepositoryTest, locations = '{}', classes = '{class subway.Application}', contextInitializerClasses = '[]', activeProfiles = '{}', propertySourceLocations = '{}', propertySourceProperties = '{org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTestContextBootstrapper=true}', contextCustomizers = set[org.springframework.boot.test.autoconfigure.OverrideAutoConfigurationContextCustomizerFactory$DisableAutoConfigurationContextCustomizer@3258d1dc, org.springframework.boot.test.autoconfigure.actuate.metrics.MetricsExportContextCustomizerFactory$DisableMetricExportContextCustomizer@4b4d3ed5, org.springframework.boot.test.autoconfigure.filter.TypeExcludeFiltersContextCustomizer@351584c0, org.springframework.boot.test.autoconfigure.properties.PropertyMappingContextCustomizer@e1aa1b8f, org.springframework.boot.test.autoconfigure.web.servlet.WebDriverContextCustomizerFactory$Customizer@22a24ec8, [ImportsContextCustomizer@84d34eb key = [org.springframework.boot.autoconfigure.cache.CacheAutoConfiguration, org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration, org.springframework.boot.autoconfigure.flyway.FlywayAutoConfiguration, org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration, org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration, org.springframework.boot.autoconfigure.jdbc.JdbcTemplateAutoConfiguration, org.springframework.boot.autoconfigure.liquibase.LiquibaseAutoConfiguration, org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration, org.springframework.boot.autoconfigure.transaction.TransactionAutoConfiguration, org.springframework.boot.test.autoconfigure.jdbc.TestDatabaseAutoConfiguration, org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManagerAutoConfiguration]], org.springframework.boot.test.context.filter.ExcludeFilterContextCustomizer@3df27965, org.springframework.boot.test.json.DuplicateJsonObjectContextCustomizerFactory$DuplicateJsonObjectContextCustomizer@2794add4, org.springframework.boot.test.mock.mockito.MockitoContextCustomizer@0, org.springframework.boot.test.context.SpringBootTestArgs@1, org.springframework.boot.test.context.SpringBootTestWebEnvironment@0], contextLoader = 'org.springframework.boot.test.context.SpringBootContextLoader', parent = [null]], attributes = map['org.springframework.test.context.event.ApplicationEventsTestExecutionListener.recordApplicationEvents' -> false]]; transaction manager [org.springframework.orm.jpa.JpaTransactionManager@11ce4c44]; rollback [true]
Hibernate: 
    insert 
    into
        station
        (id, name) 
    values
        (null, ?)
2022-07-10 00:56:56.612 TRACE 99986 --- [    Test worker] o.h.type.descriptor.sql.BasicBinder      : binding parameter [1] as [VARCHAR] - [잠실역]
2022-07-10 00:56:56.671  INFO 99986 --- [    Test worker] o.s.t.c.transaction.TransactionContext   : Rolled back transaction for test: [DefaultTestContext@6a362409 testClass = StationRepositoryTest, testInstance = subway.domain.StationRepositoryTest@2aa5eecd, testMethod = save@StationRepositoryTest, testException = [null], mergedContextConfiguration = [MergedContextConfiguration@36ea6a37 testClass = StationRepositoryTest, locations = '{}', classes = '{class subway.Application}', contextInitializerClasses = '[]', activeProfiles = '{}', propertySourceLocations = '{}', propertySourceProperties = '{org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTestContextBootstrapper=true}', contextCustomizers = set[org.springframework.boot.test.autoconfigure.OverrideAutoConfigurationContextCustomizerFactory$DisableAutoConfigurationContextCustomizer@3258d1dc, org.springframework.boot.test.autoconfigure.actuate.metrics.MetricsExportContextCustomizerFactory$DisableMetricExportContextCustomizer@4b4d3ed5, org.springframework.boot.test.autoconfigure.filter.TypeExcludeFiltersContextCustomizer@351584c0, org.springframework.boot.test.autoconfigure.properties.PropertyMappingContextCustomizer@e1aa1b8f, org.springframework.boot.test.autoconfigure.web.servlet.WebDriverContextCustomizerFactory$Customizer@22a24ec8, [ImportsContextCustomizer@84d34eb key = [org.springframework.boot.autoconfigure.cache.CacheAutoConfiguration, org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration, org.springframework.boot.autoconfigure.flyway.FlywayAutoConfiguration, org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration, org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration, org.springframework.boot.autoconfigure.jdbc.JdbcTemplateAutoConfiguration, org.springframework.boot.autoconfigure.liquibase.LiquibaseAutoConfiguration, org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration, org.springframework.boot.autoconfigure.transaction.TransactionAutoConfiguration, org.springframework.boot.test.autoconfigure.jdbc.TestDatabaseAutoConfiguration, org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManagerAutoConfiguration]], org.springframework.boot.test.context.filter.ExcludeFilterContextCustomizer@3df27965, org.springframework.boot.test.json.DuplicateJsonObjectContextCustomizerFactory$DuplicateJsonObjectContextCustomizer@2794add4, org.springframework.boot.test.mock.mockito.MockitoContextCustomizer@0, org.springframework.boot.test.context.SpringBootTestArgs@1, org.springframework.boot.test.context.SpringBootTestWebEnvironment@0], contextLoader = 'org.springframework.boot.test.context.SpringBootContextLoader', parent = [null]], attributes = map['org.springframework.test.context.event.ApplicationEventsTestExecutionListener.recordApplicationEvents' -> false]]
2022-07-10 00:56:56.683  INFO 99986 --- [extShutdownHook] j.LocalContainerEntityManagerFactoryBean : Closing JPA EntityManagerFactory for persistence unit 'default'
BUILD SUCCESSFUL in 4s
```

쿼리 로그를 살펴보면 insert와 관련된 쿼리를 제외하곤 전혀 찾아볼 수 없다. 또한 위 테스트는 정상적으로 실행되므로 id 값은 적절히 잘 조회 되었을 것이다.

## 기본 키 조회 쿼리는 어디에?

`IDENTITY` 전략은 `JDBC`에 `Statement`의 `getGeneratedKeys()` 메서드를 통해 데이터를 저장과 동시에 기본키를 얻어 올 수 있다. JPA의 구현체인 hibernate는 이 메서드를 활용하여 데이터베이스와 한 번의 통신으로 처리한다. 즉 생성과 동시에 기본 키를 얻어오기 때문에 한 번의 `INSERT`로 해결할 수 있다.

`getGeneratedKeys`의 공식 문서를 살펴보면 아래와 같은 내용을 확인할 수 있다.

### 공식 문서 중 일부
Retrieves any auto-generated keys created as a result of executing this Statement object. If this Statement object did not generate any keys, an empty ResultSet object is returned.

**Statement로 실행한 결과로 생성된 자동 생성 키를 검색한다. 만약 Statement 객체가 키를 생성하지 않은 경우 빈 ResultSet을 반환한다.**

Note: If the columns which represent the auto-generated keys were not specified, the JDBC driver implementation will determine the columns which best represent the auto-generated keys.

**참고: 자동 생성된 키를 나타내는 열이 지정되지 않은 경우 JDBC 드라이버 구현에 따라 자동 생성된 키를 가장 잘 나타내는 열이 결정된다.**

Returns: a ResultSet object containing the auto-generated key(s) generated by the execution of this Statement object

**반환: Statement 객체의 실행으로 생성된 자동 생성 키가 들어 있는 ResultSet 객체이다.**

`Statement` 인터페이스는 현재 h2 드라이버의 의존성을 추가한 프로젝트 에서 작성하였기 때문에 내부에 구현체 `JdbcStatement`를 사용하고 있다. 간단히 디버그 모드를 통해 save 시점에 해당 메서드가 사용되는지 확인한다.

![](https://user-images.githubusercontent.com/59357153/178113850-3ae31510-548a-46d2-b98b-ff7e5474356a.png)

## 정리

`IDENTITY` 전략은 `INSERT` 이후 기본 키에 대한 조회를 진행할 수 있다. 즉 데이터베이스에 추가적인 조회가 필요하다. 하지만 JDBC Statement의 `getGeneratedKeys` 메서드 덕분에 데이터 저장과 동시에 기본 키를 얻을 수 있다.

### 참고 사항

JPA에서 엔티티는 영속 상태가 되기 위해 식별자를 반드시 필요로 한다. IDENTITY의 경우 데이터베이스에 저장되어야 식별자를 조회할 수 있는 특성으로 인해 트랜잭션이 지원하는 쓰기 지연을 활용할 수 없다. 즉 영속 시키는 즉시 데이터베이스에 쿼리를 전달한다.

## References.

[Returning the Generated Keys in JDBC](https://www.baeldung.com/jdbc-returning-generated-keys) <br>
[Interface Statement](https://docs.oracle.com/en/java/javase/11/docs/api/java.sql/java/sql/Statement.html#getGeneratedKeys()) <br>
김영한 지음, 『자바 ORM 표준 JPA 프로그래밍』, 에이콘(2015), p133-135.
