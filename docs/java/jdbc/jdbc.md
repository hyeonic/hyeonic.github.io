---
title: "JDBC"
tags: ['우아한테크코스', 'JDBC']
date: 2022-10-08 10:00:00
feed:
  enable: true
---

# JDBC

`JDBC (Java Database Connectivity) API`는 Java 프로그래밍 언어에서 `범용 데이터 접근`을 제공한다. `JDBC API`를 사용하면 관계형 데이터베이스에서 스프레드 시트 및 플랫 파일에 이르기까지 거의 모든 데이터 소스에 접근할 수 있다. JDBC 기술은 tools와 alternate interfaces를 구축할 수 있는 common base를 제공한다.

특정 DBMS에서 JDBC API를 사용하려면 JDBC 기술과 데이터베이스 사이를 중재하는 JDBC 기술 기반의 드라이버가 필요하다. 다양한 요인에 따라 드라이버는 순전히 Java 프로그래밍 언어 또는 Java 프로그래밍 언어와 JNI (Java Native Interface) 네이티브 메서드가 혼합된 형태로 작성될 수 있다. 

## 왜 등장하게 되었을까?

애플리케이션 개발을 위해서는 데이터를 활용해야 한다. 이러한 데이터는 적절한 저장소에서 안전하게 관리되어야 한다. 이것을 보통 데이터베이스에 보관한다.

클라이언트는 애플리케이션의 서버를 통해 데이터를 조작한다. 애플리케이션 서버는 이러한 데이터를 적절히 관리하기 위해 아래 과정을 거치며 데이터베이스와 통신한다.

- 커넥션을 연결한다.
- SQL을 전달한다.
- 결과 응답을 확인한다.

데이터베이스의 종류는 수십가지이다. 각각의 데이터베이스는 커넥션을 연결하고, SQL을 전달하고 응답을 확인하는 방법이 각기 다르다. 이러한 문제를 해결하기 위해 JDBC라는 `표준`이 등장 하게 되었다. 우리는 구현체에 신경 쓰지 않고 JDBC에 명세된 표준 API에 의존하여 애플리케이션 서버를 구축하면 된다.

물론 인터페이스만으로 애플리케이션이 동작하지 않는다. 해당 인터페이스를 적절히 구현한 구현체가 필요하다. 보통 이러한 구현체는 각 데이터베이스 회사에서 구현한 라이브러리로 제공된다. 이것을 JDBC 드라이버라 한다. 우리가 MySQL에 접근하기 위해서 gradle에 `runtimeOnly 'mysql:mysql-connector-java'`을 추가한 경험이 있을 것이다. 이 라이브러리 내부에는 JDBC의 표준 인터페이스가 적절히 `구현`되어 제공된다.

## 표준의 이점은 무엇일까?

Java는 이렇게 인터페이스를 통한 표준을 적절히 제공해주고 있다. 이것의 장점은 표준을 통해 구현된 구현체를 직접적으로 의존하지 않고 개발을 진행할 수 있다. 

표준을 통해 인터페이스만 의존하면 구현체는 손 쉽게 `변경`할 수 있을 것이다. 이것은 결국 객체지향 관점에서 인터페이스를 통한 `느슨한 결합`을 통해 유연하게 의존 객체를 변경할 수 있다는 것을 의미한다.

## Driver와 Datasource

### Driver

```java
public interface Driver {

    Connection connect(String url, java.util.Properties info)
        throws SQLException;

    boolean acceptsURL(String url) throws SQLException;

    DriverPropertyInfo[] getPropertyInfo(String url, java.util.Properties info)
                         throws SQLException;

    int getMajorVersion();

    int getMinorVersion();

    boolean jdbcCompliant();

    public Logger getParentLogger() throws SQLFeatureNotSupportedException;
}
```

모든 Driver 클래스에서 구현해야 하는 인터페이스이다. Java SQL 프레임워크는 여러 데이터베이스 드라이버를 허용한다. 각 드라이버는 드라이버 인터페이스를 구현한 클래스를 제공해야 한다. DirverManager는 찾을 수 있는 드라이버를 로드 하기 위해 시도하고, 주어진 connection 요청에 대해 각 드라이버에게 대상 URL에 연결을 시도하도록 차례로 요청한다.

```java
class DriverManagerTest {

    private static final String H2_URL = "jdbc:h2:./test";
    private static final String USER = "sa";
    private static final String PASSWORD = "";

    @Test
    void driverManager() throws SQLException {
        try (final Connection connection = DriverManager.getConnection(H2_URL, USER, PASSWORD)) {
            assertThat(connection.isValid(1)).isTrue();
        }
    }
```

JDBC는 `java.sql.Connection` 표준 인터페이스를 정의한다. 각 데이터베이스 벤더사들은 그에 맞는 구현체를 구현한다. 

`DriverManager`는 라이브러리로 등록된 드라이버 목록을 `자동`으로 인식한다. `getConnection()` 메서드를 실행하는 시점에 등록된 `Connection` 구현체를 반환하게 된다.

### DataSource

데이터베이스 커넥션을 획득하기 위해서는 DriverManager를 통해 복잡한 과정을 거쳐야만 가능하다. 커넥션을 획득하는 것은 단순해보이지만 굉장히 `비싼 비용`을 가지고 있다.

- 데이터베이스와 TCP/IP 통신을 진행한 뒤 커넥션을 연결한다.
- 연결된 커넥션으로 ID, PASSWORD 등을 데이터베이스에 전달한다.
- 인증이 완료되면 데이터베이스 세션을 생성한다.
- 커넥션 생성이 완료되면 응답한다.
- 응답 받은 드라이버는 커넥션 객체를 생성하여 반환한다.

보통 비싼 생성 비용을 가진 커넥션 객체는 미리 `생성`한 뒤 `재사용` 하는 방식으로 개선한다. 이것을 `데이터베이스 커넥션 풀`이라 한다.

`커넥션 풀`에 속한 커넥션은 데이터베이스와 `항상 연결된 상태`를 유지한다. 사용자는 SQL 요청을 위해 매번 커넥션을 연결하는 것이 아니라 커넥션 풀에서 `유휴 상태의 커넥션`을 꺼내 사용한 뒤 적절히 `반납`한다. 여기서 반납한다는 것은 커넥션을 종료하는 것이 아니라 다시 `커넥션 풀로 반환`한다는 의미이다.

`DriverManager`를 활용한 커넥션 생성은 매 `요청 마다 새롭게 생성하는 구조`를 가진다. `DataSource`는 이러한 단점을 극복하기 위해 `커넥션 획득 방법`을 적절히 `추상화`하였다.

```java
public interface DataSource  extends CommonDataSource, Wrapper {

  Connection getConnection() throws SQLException;

  Connection getConnection(String username, String password)
    throws SQLException;

  @Override
  java.io.PrintWriter getLogWriter() throws SQLException;

  @Override
  void setLogWriter(java.io.PrintWriter out) throws SQLException;

  @Override
  void setLoginTimeout(int seconds) throws SQLException;

  @Override
  int getLoginTimeout() throws SQLException;

  default ConnectionBuilder createConnectionBuilder() throws SQLException {
        throw new SQLFeatureNotSupportedException("createConnectionBuilder not implemented");
  };

}
```

DataSource 인터페이스는 각 데이터베이스 벤더사에 의해 구현된다. 구현에는 세 가지 유형을 가지고 있다.

- `Basic implementation`: 표준 Connection 객체를 생성한다.
- `Connection Pooling implementation`: connection pooling에 자동으로 참여하는 Connection 객체를 생성한다. 이 구현은 중간 계층 connection pooling manager와 함께 동작한다.
- `Distributed transaction implementation`: 분산 트랜잭션에 사용할 수 있는 Connection 객체를 생성하고 거의 항상 connection pooling에 참여한다. 이 구현은 중간 계층의 트랜잭션 manger와 함께 작동하며 거의 항상 connection pooling manager와 함께 작동한다.

DataSource 객체를 통해 접근하는 드라이버는 DriverManger에 등록되지 않는다. 대신 조회 작업을 통해 DataSource 객체를 검색한 다음 Connection 객체를 만드는 데 사용된다. 기본 구현의 경우 DataSource 객체를 통해 얻은 연결은 DriverManger를 통해 얻은 연결과 동일하다.

```java
class DataSourceTest {

    private static final String H2_URL = "jdbc:h2:./test";
    private static final String USER = "sa";
    private static final String PASSWORD = "";

    @Test
    void dataSource() throws SQLException {
        final JdbcDataSource dataSource = new JdbcDataSource();
        dataSource.setURL(H2_URL);
        dataSource.setUser(USER);
        dataSource.setPassword(PASSWORD);

        try (final var connection = dataSource.getConnection()) {
            assertThat(connection.isValid(1)).isTrue();
        }
    }
}
```

DataSource는 데이터베이스 연결을 위한 정보를 생성과 동시에 설정할 수 있다. DriverManager 처럼 connection을 연결할 때 마다 정보를 전달할 필요가 없다. 덕분에 한 번 세팅 해두면 dataSource를 의존한 객체는 편리하게 connection을 가져다 쓸 수 있다.

또한 커넥션 풀을 구현한 `DataSource` 구현체를 활용할 수 있다. 아래는 h2 드라이버에 구현된 `JdbcConnectionPool`이다.

```java
package org.h2.jdbcx;

public final class JdbcConnectionPool
        implements DataSource, ConnectionEventListener, JdbcConnectionPoolBackwardsCompat {
    ...
    @Override
    public Connection getConnection() throws SQLException {
        ... 
    }
}
```

정리하면 `DataSource`는 다양한 구현체를 사용하여 `커넥션 풀을 구성`하고, 인터페이스를 통한 객체간의 `느슨한 결합`을 유지할 수 있다.

- 느슨한 결합은 데이터베이스를 쉽게 전환할 수 있도록 도와준다.
- Connection을 만드는 것은 많은 비용을 소모한다. 대부분의 데이터베이스는 이것을 개선하기 위해 커넥션 풀을 제공한다.

## Connection

특정 데이터베이스와 connection(session)이다. SQL문이 실행되고 연결 컨텍스트 내에서 결과가 반환된다.

Connection 객체의 데이터베이스는 테이블, 지원되는 SQL 문법, stored procedures, 연결 기능 등을 설명하는 정보를 제공할 수 있다. 이 정보는 `getMetaData()` 메서드를 사용하여 가져온다.

## Statement와 PreparedStatement

두 인터페이스는 모두 `SQL 쿼리 전달`을 위한 역할이다. 내부적으로 `CheckedException`인 `SQLException`을 던지기 때문에 예외에 대한 추가적인 처리를 진행해야 한다.

```java
public class SQLException extends java.lang.Exception
                          implements Iterable<Throwable> {

    ...
    public SQLException(String reason, String SQLState, int vendorCode) {
        super(reason);
        this.SQLState = SQLState;
        this.vendorCode = vendorCode;
        if (!(this instanceof SQLWarning)) {
            if (DriverManager.getLogWriter() != null) {
                DriverManager.println("SQLState(" + SQLState +
                                                ") vendor code(" + vendorCode + ")");
                printStackTrace(DriverManager.getLogWriter());
            }
        }
    }
    ...
}
```

### Statement

`Statement` 객체가 생성되면 `executeQuery()` 메서드를 호출하여 SQL문을 실행시킬 수 있다. 메서드의 인수로 SQL문을 담은 `String 객체`를 전달한다. 정적인 쿼리문을 처리할 수 있다. 쿼리문에 값이 미리 입력되어 있어야 한다.

### PreparedStatement

SQL 문장이 미리 컴파일되고 실행 시간동안 인수값을 위한 공간을 확보할 수 있다. `Statement` 객체의 SQL은 실행될 때 마다 서버에서 분석해야 하는 반면, `PreparedStatement` 객체는 한 번 분석되면 `재사용` 하여 효율적으로 사용할 수 있다. 

각각의 인수에 대해 `place holder`를 사용하여 SQL 문장을 정의할 수 있다. 동일한 SQL문을 특정 값만 바꿔 여러 번 실행해야 할 때 혹은 인수가 많아서 SQL 문을 정리해야 할 때 유용하다.

## ResultSet

일반적으로 데이터베이스 쿼리문을 실행하여 생성되는 데이터베이스 결과 집합을 나타내기 위한 데이터 테이블이다. 

ResultSet 객체는 현재 데이터 행을 가리키는 커서를 유지한다. 처음에 커서는 첫 번째 행 앞에 배치된다. `next()` 메서드는 커서를 다음 행으로 옮기고 ResultSet 객체에 행이 더 이상 없을 때 false를 반환하므로 결과 집합을 반복하는 while loop에서 사용할 수 있다.

기본 `ResultSet` 객체는 업데이트할 수 없으며 앞으로만 이동하는 커서만 존재한다. 따라서 첫 번째 행부터 마지막 행까지 한 번만 반복할 수 있다. 

## SQLException은 왜 Checked Exception일까?

`DataSource`를 활용하여 `Connection`, `Statement`, `ResultSet`과 같은 객체를 사용하다 보면 대부분 `SQLException`을 던지는 것을 확인할 수 있다. 

생길 수 있는 예외를 명시하는 것은 개발자가 해당 객체를 사용할 때 인지할 수 있는 좋은 수단이 된다. 다만 `SQLException`의 경우 `Exception` 클래스를 상속한 `Checked Exception`이기 때문에 컴파일 시점에 예외 핸들링을 강제한다.

때문에 객체를 사용할 때 마다 반복적인 `try-catch-finally`로 자원을 해제 시켜야 한다. 그나마 Java 7 이후에는 `try-with-resources`가 등장 했기 때문에 전보다는 깔끔한 코드를 작성할 수 있게 되었다

```java
package nextstep.jdbc.core;

...

public class JdbcTemplate {
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

`Effective Java 아이템 70 - 복구할 수 있는 상황에는 검사 예외를, 프로그래밍 오류에는 런타임 예외를 사용하라`에 따르면 `Checked Exception`이 적절한 상황은 `호출한 쪽에서 복구하리라 여겨지는 상황이라면 Checked Exception을 사용하라`고 명시되어 있다.

만약 `Connection` 객체 연결 실패로 `SQLException`이 발생 했다고 가정해보자. 과연 개발자는 `catch`에서 어떠한 복구 전략을 떠올릴 수 있을까? 이미 실패한 연결을 다시 요청해야 할까? 그렇다고 예외를 무시하는 것은 바람직하지 못하다. 결국 보다 더 유의미한 예외로 포장하여 다시 전파할 뿐이다.

이러나 저러나 `Checked Exception`은 개발자에게 처리를 강제하는 것은 여전하다. 아무래도 외부 서버와의 통신을 진행하면 예측할 수 없기 때문에 이러한 `처리를 강제`하는 취지에서 등장 하지 않았을까 판단한다. 

## References.

[https://all-record.tistory.com/79](https://all-record.tistory.com/79)<br>
[https://docs.oracle.com/javase/8/docs/api/java/sql/DriverManager.html](https://docs.oracle.com/javase/8/docs/api/java/sql/DriverManager.html)<br>
[https://docs.oracle.com/javase/8/docs/api/javax/sql/DataSource.html](https://docs.oracle.com/javase/8/docs/api/javax/sql/DataSource.html)<br>
조슈아 블로크 지음, 개앞맴시(이복연) 옮김, 『이펙티브 자바』, 프로그래밍 인사이트(2020), p390-392.

<TagLinks />
