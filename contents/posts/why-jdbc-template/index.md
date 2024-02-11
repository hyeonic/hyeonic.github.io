---
title: "JdbcTemplate는 어디에?"
date: 2022-04-28
update: 2022-04-28
tags: 
 - 우아한테크코스
 - JDBC
 - spring-jdbc
feed:
  enable: false
---

![](https://user-images.githubusercontent.com/59357153/152970395-a31c8134-fc89-449f-b4dc-441e03df929c.png)

## 개요

웹 체스 미션을 진행하던 중 Spring Jdbc를 도입하기 위해 이전에 연결된 JDBC에 대한 의존성을 제거한 뒤 `Spring-jdbc`에서 제공하는 `JdbcTemplate`을 활용하여 SQL 쿼리를 사용하였다. 하지만 나는 `JdbcTemplate`에 대한 `Bean` 등록을 진행하지 않았다. 그렇다면 누가 자동으로 등록한 것일까?

![](https://user-images.githubusercontent.com/59357153/165691946-6761593a-9ea0-4a4e-aa45-72674eebc92f.png)

## JDBC (Java DataBase Connectivity)

우선 이전에 사용하던 JDBC에 대해 간단히 알아본다. JDBC는 Java와 데이터베이스를 연결하기 위한 Java 표준 인터페이스이다. 아래 그림과 같이 MySql, oracle 등 다양한 DB의 미들웨어의 드라이버를 제공하고 있다. 덕분에 어떤 DB에 연결되는지에 따라 드라이버를 선택하여 적용할 수 있다. 또한 어떤 DB의 드라이버인지 상관없이 일관적인 방식으로 사용할 수 있도록 도와준다.

![](https://user-images.githubusercontent.com/59357153/165686797-ec8e6f35-dbd1-4f7e-a2d3-dedf2bb50482.png)

일반적인 JDBC를 그대로 사용하게 되면 아래와 같은 흐름으로 사용하게 된다.

* JDBC 드라이버를 로드
* DB를 연결
* DB의 데이터 조회 및 쓰기
* DB 연결 종료

덕분에 DB에 접근하여 SQL 쿼리를 실행하기 위해 복잡한 코드를 동반하게 된다.

```java
public class JdbcPieceDao implements PieceDao {

    private static final String URL = "jdbc:mysql://localhost:3306/chess";
    private static final String USER = "user";
    private static final String PASSWORD = "password";

    @Override
    public void save(PieceDto pieceDto) {
        String sql = "INSERT INTO piece (id, piece_type) VALUES (?, ?)";

        try (Connection connection = getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setString(1, pieceDto.getId());
            PieceType pieceType = pieceDto.getPieceType();
            statement.setString(2, pieceType.getType());

            statement.executeUpdate();
        } catch (SQLException e) {
            throw new IllegalArgumentException("기물의 위치는 중복될 수 없습니다.");
        }
    }
    ...
        private Connection getConnection() {
        Connection connection = null;
        try {
            connection = DriverManager.getConnection(URL, USER, PASSWORD);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return connection;
    }
}
```

## Spring JDBC 

`Spring JDBC`는 Driver 및 DB 연결과 `Connection` 객체의 관리를 수행하는 `DataSource`를 설정을 통해 생성하며 위에서 사용한 것 처럼 JDBC API를 직접 사용했을 때 불편했던 것들을 쉽게 사용할 수 있도록 도와준다.

정리하면 JDBC API의 모든 저수준 처리를 Spring Framework에 위임하기 때문에 위에서 작성한 반복되는 처리를 개발자가 직접 처리하지 않고 Database에 대한 작업을 수행할 수 있도록 도와준다.

## Data Access with JDBC

JBDC 데이터베이스 접근의 기초를 형성하기 위해 여러 접근 방식을 선택할 수 있다.

* `JdbcTemplate`: 고전적이고 가장 인기 있는 Spring JDBC 방식이다. `lowest-level` 접근법과 다른 모든 것들은 `JdbcTemplate`를 사용한다.

* `NamedParameterJdbcTemplate`: 기존 JDBC `?` 표시자 대신 `명명된 매개 변수를 제공`하기 위해 `JdbcTemplate을 랩핑`한다. 이러한 접근 방식은 SQL 문에 대한 매개 변수가 여러 개 일 때 더 나은 문서화와 사용 편의성을 제공한다.

* `SimpleJdbcInsert`: 데이터베이스 메타데이터를 최적화하여 필요한 구성 양을 제한한다. 해당 방법을 사용하면 테이블 또는 프로시저의 이름만 제공하고 `column 이름과 일치하는 맵`을 제공해야 하므로 코딩이 매우 간소화된다. 하지만 이것은 데이터베이스가 적절한 메타데이터를 제공하는 경우에만 작동한다. 데이터베이스가 이 메타데이터를 제공하지 않는 경우 매개 변수의 명시적 구성을 제공해야 한다.

## JdbcTemplate는 어디에?

이제 JDBC와 Spring JDBC에 대한 간단한 개념 정리를 진행했다. 본론으로 넘어와 `JdbcTemplate`를 자동으로 등록한 곳을 찾아보려 한다.

Spring Boot의 자동 구성은 애플리케이션에 적용할 수 있는 여러 구성 클래스로 작동한다. 이런 모든 구성은 Spring 4.0의 조건부 구성 지원 기능을 이용하여 `런타임 시점`에 구성을 사용할지 여부를 결정한다.

아래는 `org.springframework.boot.autoconfigure.jdbc` 패키지에 위치한 `JdbcTemplateConfiguration` 클래스이다.

```java
package org.springframework.boot.autoconfigure.jdbc;

...

@Configuration(proxyBeanMethods = false)
@ConditionalOnMissingBean(JdbcOperations.class)
class JdbcTemplateConfiguration {

	@Bean
	@Primary
	JdbcTemplate jdbcTemplate(DataSource dataSource, JdbcProperties properties) {
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		JdbcProperties.Template template = properties.getTemplate();
		jdbcTemplate.setFetchSize(template.getFetchSize());
		jdbcTemplate.setMaxRows(template.getMaxRows());
		if (template.getQueryTimeout() != null) {
			jdbcTemplate.setQueryTimeout((int) template.getQueryTimeout().getSeconds());
		}
		return jdbcTemplate;
	}
}
```

`jdbcTemplate(DataSource dataSource, JdbcProperties properties)` 메서드는 `@Bean` 애너테이션 덕분에 `JdbcTemplate Bean`을 구성해준다. 하지만 주목해야 할 것은 `@ConditionalOnMissingBean(JdbcOperations.class)` 부분이다.

### @ConditionalOnMissingBean(JdbcOperations.class)

`@ConditionalOnMissingBean`은 속성으로 전달된 `JdbcOperations` 타임의 `Bean`이 없을 때만 동작한다. `JdbcTemplate`은 바로 `JdbcOperations`의 구현체이다.

```java
public class JdbcTemplate extends JdbcAccessor implements JdbcOperations {
    ...
}
```

만약 개발자가 명시적으로 `JdbcOperations` 타입의 Bean을 구성했다면 `@ConditionalOnMissingBean` 애너테이션의 조건에 만족하지 못하므로 해당 메서드는 사용되지 않는다. 

정리하면 나는 명시적으로 `JdbcTempalate`를 등록하지 않았다. 그렇기 때문에 `@ConditionalOnMissingBean` 애너테이션의 조건에 만족하여 `자동 구성에서 제공하는 JdbcTemplate를 Bean`으로 등록하여 사용하고 있는 것이다.

관련 키워드를 검색하기 위해 구글링하던 중 `stackOverflow`에서 관련 된 글을 찾아볼 수 있었다.

### Question

[How does spring boot inject the instance of ApplicationContext and JdbcTemplate using @Autowired without @Component annotation and xml configuration?](https://stackoverflow.com/questions/61452371/how-does-spring-boot-inject-the-instance-of-applicationcontext-and-jdbctemplate)

**Spring Boot에서 @Component 및 xml 구성 없이 @Autowired를 사용하여 JdbcTemplate 인스턴스를 주입하는 방법은 무엇인가?**

i'm in a spring boot app building rest controller.i find that ApplicationContext and JdbcTemplate source code,these 2 classes do not have any annotation.But they can be correctly injected into constructor.i am not using any configuration file like 'applicationContext.xml'.When do these 2 classes get scanned by spring ioc container?

**ApplicationContext 및 JdbcTemplate 소스 코드, 이 두 클래스에는 annotation이 없다. 그러나 constructor에 올바르게 삽입할 수 있다. 'applicationContext.xml'과 같은 구성 파일을 사용하지 않았다.이 두 클래스는 언제 spring ioc 컨테이너로 스캔되는가?**

### Answer

Spring Boot does a lot of auto configuration.

**Sprign Boot는 많은 자동 구성을 수행한다.**

I assume that you are using spring-data-jdbc or spring-data-jpa and there for the JdbcTemplate is auto configured.

**spring-data-jdbc 또는 spring-data-jpa를 사용하고 있으며 JdbcTemplate에 대해 자동 구성되었다고 가정한다.**

The most interesting project is: spring-boot-autoconfigure where all the magic happens.

**가장 흥미로운 프로젝트는 `spring-boot-autoconfigure`이다. 모든 마술이 일어나는 곳이다!**

And there you will find `JdbcTemplateConfiguration.java`

**또한 `JdbcTemplateConfiguration.java` 관련 설정을 찾아볼 수 있다.**

## 정리

정리하면 우린 `spring-boot-autoconfigure` 덕분에 명시적으로 JdbcTemplate을 Bean으로 등록하지 않아도 자동 설정되므로 사용가능하다.

이러한 자동 구성 덕분에 우리는 편리하게 기능에만 집중할 수 있게 된다. 만약 추가적인 JdbcTempalate에 대한 설정이 필요하다면 명시적인 등록을 추가하여 Bean으로 작성하기만 하면 된다. 

## References.

[Spring Data Access](https://docs.spring.io/spring-framework/docs/current/reference/html/data-access.html)<br>
[Infra layer with Spring — Spring jdbc 개념과 예시 코드](https://tech.junhabaek.net/infra-layer-with-spring-spring-jdbc-%EA%B0%9C%EB%85%90%EA%B3%BC-%EC%98%88%EC%8B%9C-%EC%BD%94%EB%93%9C-1c3f4e3ccb63)<br>
[Spring JDBC](https://velog.io/@koseungbin/Spring-JDBC)<br>
[How does spring boot inject the instance of ApplicationContext and JdbcTemplate using @Autowired without @Component annotation and xml configuration?](https://stackoverflow.com/questions/61452371/how-does-spring-boot-inject-the-instance-of-applicationcontext-and-jdbctemplate)
