---
title: "jdbcTemplate을 만들며 마주한 Template Callback 패턴"
tags: ['우아한테크코스', 'Spring', 'jdbcTempate', 'Template Callback 패턴']
date: 2022-10-09 17:00:00
feed:
  enable: true
---

# jdbcTemplate을 만들며 마주한 Template Callback 패턴

우아한테크코스 미션 중 Spring의 `JdbcTemplate`을 직접 구현해보며 순수한 JDBC만 사용했을 때 `중복되는 로직`들을 분리하며 리팩토링하는 과정을 경험하였다.

미션을 진행하며 실제 Spring의 JdbcTemplate 내부 코드를 살펴보았는데, 특정한 패턴을 가진 코드가 반복되는 것을 확인할 수 있었다. 간단한 예제를 통해 Spring은 반복된 코드를 어떻게 개선 하였는지 알아보려 한다.

구현 코드는 [jwp-dashboard-jdbc](https://github.com/hyeonic/jwp-dashboard-jdbc/tree/step1)에서 확인할 수 있다.

## 데이터베이스와 통신하기

Java에서 데이터베이스와 통신하기 위해서는 아래와 같은 과정이 필요하다.

 * 커넥션을 연결한다.
 * SQL을 전달한다.
 * 응답을 확인한다.

이러한 과정은 JDBC API를 통해 적절히 추상화 되어 있다. 자세한 내용은 [JDBC](https://hyeonic.github.io/java/jdbc/jdbc.html)에 정리해두었다. 적절한 `추상화` 덕분에 우리는 어떤 데이터베이스를 사용하는지 신경 쓰지 않고 비즈니스 로직에 집중할 수 있게 되었다.

자 이제 JDBC API를 사용하여 User를 추가하는 간단한 로직을 작성해보자.

```java
public class UserDao {

    private final DataSource dataSource;
    
    public UserDao(final DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public void insert(final User user) {
        var sql = "INSERT INTO users (account, password, email) VALUES (?, ?, ?)";
        try (var connection = dataSource.getConnection();
             var preparedStatement = connection.prepareStatement(sql)) {

            preparedStatement.setString(1, user.getAccount());
            preparedStatement.setString(2, user.getPassword());
            preparedStatement.setString(3, user.getEmail());

            preparedStatement.executeUpdate();
        } catch (final SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
```

java 7에 등장한 `try-with-resources`도 활용해보고, connection 생성을 위해 DataSource를 생성하는 방식도 외부에서 주입 받도록 설정하였다. 여기서 User 삭제하기 위한 `delete` 메서드가 추가된다고 가정하자.

```java
public class UserDao {

    private final DataSource dataSource;
    
    public UserDao(final DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public void insert(final User user) {
        var sql = "INSERT INTO users (account, password, email) VALUES (?, ?, ?)";
        try (var connection = dataSource.getConnection();
             var preparedStatement = connection.prepareStatement(sql)) {

            preparedStatement.setString(1, user.getAccount());
            preparedStatement.setString(2, user.getPassword());
            preparedStatement.setString(3, user.getEmail());

            preparedStatement.executeUpdate();
        } catch (final SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void delete(final Long id) {
        var sql = "DELETE FROM user WHERE id = ?";
        try (var connection = dataSource.getConnection();
             var prepareStatement = connection.prepareStatement(sql)) {

            prepareStatement.setLong(1, id);

            prepareStatement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
```

슬슬 중복되는 코드가 눈에 보이기 시작한다. 또한 커넥션을 획득하기 위한 `getConnection()`나 `prepareStatement()` 등은 `Checked Exception`인 `SQLException`을 catch 하도록 강제하고 있다.

중복되는 로직은 메서드 분리를 통해 개선하면 그만이다. 하지만 가장 큰 문제는 따로 있다. 우리가 `UserDao`에게 가지길 원하는 책임은 User를 저장하고, 삭제하고, 조회하는 등의 데이터 관리 측면에 가깝다. 하지만 위 코드는 데이터베이스에게 커넥션을 획득하고, 쿼리를 전송하는 등 `관심사 밖의 로직`까지 포함하고 있다.

만약 이러한 Dao가 늘어나면 어떻게 될까? 각각의 Dao는 자신의 `비즈니스 로직`과 `데이터베이스 통신을 위한 로직`들을 반복해서 작성해야 할 것이다. 

## JdbcTemplate

`JdbcTemplate`은 `org.springframework.jdbc.core` 패키지의 중심 클래스이다. 리소스 생성 및 해제를 처리하므로 커넥션을 닫는 것을 잊어버리는 등의 일반적인 오류를 방지할 수 있다. 

JdbcTemplate은 아래와 같은 일을 담당한다.

 * SQL 쿼리를 실행한다.
 * statement 및 stored procedure를 호출을 업데이트한다.
 * ResultSet 인스턴스에 대한 반복 및 반환된 매개 변수 값을 추출을 수행한다.
 * JDBC 예외를 catch하고 `org.springframework.dao`에 정의된 일반적이고 보다 유익한 예외 계층을 반환한다.

단순히 JDBC를 사용하는 것 보다 중복되는 데이터베이스와 관련된 로직을 대신 처리해주며 비즈니스 로직에 집중할 수 있게 만들어준다. 자세한 내용은 [3.3.1. Using JdbcTemplate](https://docs.spring.io/spring-framework/docs/current/reference/html/data-access.html#jdbc-JdbcTemplate)을 살펴보자.

자 이제 이러한 장점을 잘 기억해두고 간단한 버전의 JdbcTemplate을 만들어보자. 먼저 데이터베이스와의 통신 과정을 UserDao에서 분리한다.

> 직접 만든 JdbcTemplate의 메서드 시그니처는 실제 Spring JdbcTemplate을 참고하였다. 

```java
public class CustomJdbcTemplate {
    private final DataSource dataSource;

    public CustomJdbcTemplate(final DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public <T> List<T> query(final String sql, final RowMapper<T> rowMapper) {
        try (var connection = dataSource.getConnection();
             var preparedStatement = connection.prepareStatement(sql)) {
            var resultSet = preparedStatement.executeQuery();
            return toRows(rowMapper, resultSet);
        } catch (final SQLException e) {
            throw new DataAccessException(e);
        }
    }

    public <T> T queryForObject(final String sql, final RowMapper<T> rowMapper, Object... args) {
        try (var connection = dataSource.getConnection();
             var preparedStatement = connection.prepareStatement(sql)) {
            setParams(preparedStatement, args);
            var resultSet = preparedStatement.executeQuery();
            return DataAccessUtils.singleResult(toRows(rowMapper, resultSet));
        } catch (final SQLException e) {
            throw new DataAccessException(e);
        }
    }

    private <T> List<T> toRows(final RowMapper<T> rowMapper, final ResultSet resultSet) throws SQLException {
        var rows = new ArrayList<T>();
        while (resultSet.next()) {
            rows.add(rowMapper.mapRow(resultSet));
        }
        return rows;
    }

    public void update(final String sql, final Object... args) {
        try (var connection = dataSource.getConnection();
             var preparedStatement = connection.prepareStatement(sql)) {
            setParams(preparedStatement, args);
            preparedStatement.executeUpdate();
        } catch (final SQLException e) {
            throw new DataAccessException(e);
        }
    }

    private void setParams(final PreparedStatement preparedStatement, final Object... args) throws SQLException {
        for (int i = 0; i < args.length; i++) {
            preparedStatement.setObject(i + 1, args[i]);
        }
    }
}
```

JdbcTemplate에 데이터베이스 통신과 관련된 로직을 모두 이동시켰다. 덕분에 `UserDao`는 SQL 쿼리 작성한 진행하면 데이터베이스에서 조회한 값을 적절히 반환할 수 있게 되었다.

```java
package com.techcourse.dao;

// 전부 제거된 JDBC 관련 의존성
import com.techcourse.domain.User;
import nextstep.jdbc.core.JdbcTemplate;
import nextstep.jdbc.core.RowMapper;

public class UserDao {
    ...
    private final JdbcTemplate jdbcTemplate;

    public UserDao(final JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void insert(final User user) {
        var sql = "INSERT INTO users (account, password, email) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, user.getAccount(), user.getPassword(), user.getEmail());
    }

    public void update(final User user) {
        var sql = "UPDATE users SET account = ?, password = ?, email = ? WHERE id = ?";
        jdbcTemplate.update(sql, user.getAccount(), user.getPassword(), user.getEmail(), user.getId());
    }
    ...
}
```

많이 개선되었지만 아직 문제가 남아있다. `CustomJdbcTemplate`을 살펴보면 각 메서드가 데이터베이스 커넥션과 통신하기 위해 매번 열고 닫고를 반복하고 있다. 

## 템플릿 콜백 패턴

`템플릿 콜백 패턴`은 메서드를 통해 전략을 주입 받은 형태이다. `전략 패턴`의 한 종류라고 볼 수 있다. `전략 패턴`에서 핵심은 `변하는 부분`과 `변하지 않는 부분`을 잘 구분하고, 변하는 부분을 전략으로 추출해야 한다.

위 로직에서 `변하는 부분(중복되는 부분)`과 `변하지 않는 부분(중복되지 않는 부분)`은 어디일까? 바로 아래와 같다.

```java
public class CustomJdbcTemplate {
    ...
    public <T> List<T> query(final String sql, final RowMapper<T> rowMapper) {
        try (var connection = dataSource.getConnection();                   // 변하지 않는 부분     
             var preparedStatement = connection.prepareStatement(sql)) {    // 변하지 않는 부분     
            var resultSet = preparedStatement.executeQuery();               // 변하는 부분          
            return toRows(rowMapper, resultSet);                            // 변하는 부분          
        } catch (final SQLException e) {                                    // 변하지 않는 부분     
            throw new DataAccessException(e);                               // 변하지 않는 부분     
        }                                                               
    }
    ...
}
```

> `템플릿`: 변하지 않는 부분에 해당한다. <br>
> `콜백`: 다른 코드의 매개변수로 넘겨주는 실행 가능한 코드를 말한다. 콜백을 넘겨받는 메서드는 필요에 따라 적절히 활용한다. Java에는 객체 없이 메서드를 독립적으로 관리할 수 없다. Java 8 이후에는 람다를 활용하여 콜백 함수를 정의하곤 한다.

> 템플릿 콜백 패턴은 GOF의 디자인 패턴은 아니다. 스프링 내부에서 자주 사용하여 이렇게 부른다. 간단히 생각하면 전략 패턴을 메서드 실행 시점에 주입한 형태라고 생각하면 된다. 스프링 내부에서 XxxTemplate의 형태가 있다면 템플릿 콜백 패턴을 활용했다고 보면 된다.

`템플릿 콜백 패턴`도 동일하다. 변화되는 부분을 독립된 클래스, 익명 내부 클래스, 람다를 활용하여 `메서드 실행 시점에 주입`하는 형태이다. 말로하면 너무 장황하니 바로 코드로 살펴보자.

먼저 반복되는, 변하지 않는 부분을 메서드로 추출한다.

```java
public class CustomJdbcTemplate {
    ...
    private <T> T execute(final String sql, final PreparedStatementCallback<T> action) {
        try (var connection = dataSource.getConnection();
             var preparedStatement = connection.prepareStatement(sql)) {
            return action.doInPreparedStatement(preparedStatement);
        } catch (final SQLException e) {
            throw new DataAccessException(e);
        }
    }
}
```

핵심은 `PreparedStatementCallback<T> action`이다. Java는 객체 없이 독립적인 메서드를 생성할 수 없기 때문에 함수형 인터페이스를 활용한다.

```java
@FunctionalInterface
public interface PreparedStatementCallback<T> {

    T doInPreparedStatement(final PreparedStatement preparedStatement) throws SQLException, DataAccessException;
}
```

이제 `execute()` 메서드 실행 시점에 필요한 행위을 구현하여 매개변수로 넘겨준다. 

```java
public class CustomJdbcTemplate {
    ...
   public <T> List<T> query(final String sql, final RowMapper<T> rowMapper) {
        return execute(sql, preparedStatement -> {
            var resultSet = preparedStatement.executeQuery();
            return toRows(rowMapper, resultSet);
        });
    }

    public <T> T queryForObject(final String sql, final RowMapper<T> rowMapper, Object... args) {
        return execute(sql, preparedStatement -> {
            setParams(preparedStatement, args);
            var resultSet = preparedStatement.executeQuery();
            return DataAccessUtils.singleResult(toRows(rowMapper, resultSet));
        });
    }
    ...
}
```

이제 각각의 메서드는 `변하는 부분`만을 가지고 있다. 이렇게 변하는 부분은 `람다`를 통해 적절히 구현한 뒤 전달하는 형태로 개선할 수 있다.

## 정리

간단한 예제를 통해 Spring은 어떠한 방식으로 `JdbcTemplate`을 구성 했는지에 대해 알아보았다. 이전에는 단순히 사용하는데 급급했지만 직접 만들어보며 라이브러리의 의도를 보다 더 명확하게 파악할 수 있었다.

코드가 중복된다는 것은 중복되는 코드에 변화가 생길 때 영향의 범위가 커진다는 것을 의미한다. 즉 이러한 중복의 범위를 줄여야 한다. 

템플릿 콜백 패턴은 `변하는 부분`을 함수형 인터페이스로 분리하여 매개 변수로 전달 받는다. 덕분에 `변하지 않는 부분`은 중복되지 않고 재사용하여 개선할 수 있다.

### References.
[jwp-dashboard-jdbc](https://github.com/hyeonic/jwp-dashboard-jdbc/tree/step1)<br>
[JdbcTemplate](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/jdbc/core/JdbcTemplate.html)<br>
[3.3.1. Using JdbcTemplate](https://docs.spring.io/spring-framework/docs/current/reference/html/data-access.html#jdbc-JdbcTemplate)<br>
[스프링 핵심 원리 - 고급편](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%ED%95%B5%EC%8B%AC-%EC%9B%90%EB%A6%AC-%EA%B3%A0%EA%B8%89%ED%8E%B8)

<TagLinks />
