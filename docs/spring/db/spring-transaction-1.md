---
title: "스프링이 개선한 트랜잭션 (1)"
tags: ['스프링', '트랜잭션']
date: 2022-12-10 00:00:00
feed:
  enable: true
---

# 스프링이 개선한 트랜잭션 (1)

> 👉 [스프링이 개선한 트랜잭션 (1)](https://hyeonic.github.io/spring/db/spring-transaction-1.html) <br>
> [스프링이 개선한 트랜잭션 (2)](https://hyeonic.github.io/spring/db/spring-transaction-2.html) <br>

> 작성에 사용된 예제 코드는 [spring-transaction](https://github.com/hyeonic/blog-code/tree/main/spring-transaction)에서 확인해볼 수 있다.

트랜잭션은 논리적인 작업 셋을 모두 완벽하게 처리하거나, 처리하지 못할 경우 원래 상태로 복구하여 작업의 일부만 적용되는 현상(Partial update)을 막아준다.

또한 트랜잭션은 하나의 논리적인 작업 셋의 쿼리 개수와 관계없이 논리적인 작업 셋 자체가 전부 적용(COMMIT)되거나 아무것도 적용되지 않는 것(ROLLBACK)을 보장해주는 것이다. 결국 트랜잭션은 여러 개의
변경 작업을 수행하는 쿼리가 조합 됐을 때만 의미 있는 개념은 아니다.

트랜잭션은 시작과 끝이 존재하는 절차(script)이다. 트랜잭션은 이러한 절차의 시작과 끝을 단위화하는 것이다. 단위화된 트랜잭션은 반드시 원자성이 보장되어야 한다.

여러 작업 셋을 하나의 트랜잭션으로 처리하기 위해서는 같은 커넥션 내에서 동작해야 한다. 이것을 구현하는 방법은 아래와 같이 매개변수를 통해 커넥션 객체를 전달하는 것이다.

```java
public class JdbcAccountRepository {
    // ...
    public Account save(final Connection connection, final Account account) throws SQLException {
        var sql = "INSERT INTO account(holder, amount) VALUES (?, ?)";
        try (var preparedStatement = connection.prepareStatement(sql)) {

            preparedStatement.setString(1, account.getHolder());
            preparedStatement.setLong(2, account.getAmount());
            preparedStatement.executeUpdate();

            return findByHolder(connection, account.getHolder())
                    .orElseThrow(NoSuchElementException::new);
        }
    }
    // ...
}
```

또한 트랜잭션과 관련된 처리가 마무리된 후 커넥션을 닫아야 한다. 위 repository보다 상위 계층에서 커넥션을 생성하고 닫는 생명 주기에 대한 책임까지 가지게 된다. 보통 service 계층은 애플리케이션의
핵심 비즈니스 로직을 처리하기 위한 계층이다. 하지만 데이터베이스 접근을 위한 커넥션에 대한 책임까지 가지게 되는 문제가 발생한다.

```java

@Service
public class AccountService {
    // ...
    public void withdraw(final Account account, final Long amount) throws SQLException {
        var connection = dataSource.getConnection();
        try {
            connection.setAutoCommit(false);
            accountRepository.update(connection,
                    new Account(account.getId(), account.getHolder(), account.getAmount() - amount));
            connection.commit();
        } catch (final SQLException e) {
            connection.rollback();
            throw new RuntimeException(e);
        }
    }
    // ...
}
```

개발자가 매번 일련의 트랜잭션을 보장하기 위해 커넥션 객체를 생성하고 반납하는 등의 로직을 관리하는 것은 매우 귀찮은 일이다. 또한 service 계층에서 처리해야 할 비즈니스 로직에 JDBC와 관련된 의존성(
SQLException 등)을 가지게 되기 때문에 변경에 유연하지 못한 구조를 가져온다. 스프링에서는 이러한 불편함을 해결하기 위해 `트랜잭션 추상화`와 `트랜잭션 동기화` 기능을 제공한다.

## 트랜잭션 추상화

현재 service 계층은 dataSource를 통해 커넥션 객체를 획득하고 있다. 또한 커넥션 객체의 `setAutoCommit()` 메서드를 통해 트랜잭션을 시작하고 있다. 만약 다른 데이터 접근 기술로
변경된다면 어떻게 될까? 실제로 순수한 JPA를 사용할 경우 아래와 같은 과정을 거쳐 트랜잭션을 시작할 수 있다.

```java
EntityTransaction entityTransaction = entityManager.getTranaction();
entityTransaction.begin();
```

데이터 접근 기술의 변경은 비즈니스 로직인 service 계층의 수정까지 야기하게 된다. 스프링은 이것을 트랜잭션의 행위들을 명시한 인터페이스를 통해 극복했다.

```java
public interface PlatformTransactionManager extends TransactionManager {

    TransactionStatus getTransaction(@Nullable TransactionDefinition definition) throws TransactionException;

    void commit(TransactionStatus status) throws TransactionException;

    void rollback(TransactionStatus status) throws TransactionException;
}
```

`PlatformTransactionManager`은 스프링의 명령형 트랜잭션 인프라의 중앙 인터페이스이다.

* `getTransaction(TransactionDefinition definition)`: 지정된 전파 동작에 따라 현재 활성 트랜잭션을 반환하거나 새 트랜잭션을 만든다.
* `commit(TransactionStatus status)`: 상태와 관련하여 주어진 트랜잭션을 커밋한다.
* `rollback(TransactionStatus status)`: 주어진 트랜잭션의 롤백을 수행한다.

이러한 트랜잭션 매니저 덕분에 특정 데이터 접근 기술에 의존하지 않고 추상화된 인터페이스를 의존하여 변경에 유연하게 대처할 수 있게 된다. 아래는 추상화된 트랜잭션 매니저 인터페이스를 활용하여 개선한 service
계층이다.

```java

@Service
public class AccountService {
    // ...
    public void withdraw(final Account account, final Long amount) {
        var transactionStatus = platformTransactionManager.getTransaction(new DefaultTransactionDefinition());
        try {
            accountRepository.update(new Account(account.getId(), account.getHolder(), account.getAmount() - amount));
            platformTransactionManager.commit(transactionStatus);
        } catch (final Exception e) {
            platformTransactionManager.rollback(transactionStatus);
            throw new RuntimeException(e);
        }
    }
}
```

이전에 JDBC에 강하게 의존하던 코드들은 사라지고 추상화된 인터페이스에만 의존하고 있다. 이제 스프링의 의존성 주입을 활용하여 데이터 접근 기술에 맞는 트랜잭션 매니저를 적절히 선택하여 활용할 수 있게 되었다.

* `getTransaction(new DefaultTransactionDefinition())`: 트랜잭션을 시작한다. `TransactionStatus`를 반환한다. 현재 트랜잭션에 대한 정보를 포함한다. 이러한
  정보를 바탕으로 이후 트랜잭션 커밋 혹은 롤백을 진행할 수 있다.
* `new DefaultTransactionDefinition()`: 트랜잭션과 관련된 옵션을 지정한다. 전부 기본 설정을 활용한다.
* `commit(transactionStatus)`: 트랜잭션을 커밋한다.
* `rollback(transactionStatus)`: 트랜잭션을 롤백한다.

트랜잭션 매니저 사용 이전에는 메서드 수행 시 매개변수로 커넥션 객체를 전달해서 같은 커넥션을 유지할 수 있도록 만들었다. 그렇다면 트랜잭션 매니저는 어떻게 같은 커넥션 내에서 동작하도록 보장하는 걸까?

## 트랜잭션 동기화

트랜잭션 동기화는 트랜잭션을 시작하기 위한 커넥션 객체를 특별한 저장소에 보관해 두고 필요할 때 꺼내 쓸 수 있도록 하는 기술이다. 트랜잭션 동기화 저장소는 스레드마다 커넥션 객체를 `독립적`으로 관리하므로 멀티 스레드 환경에서 충돌이 발생하지 않는다. `트랜잭션 매니저`는 `트랜잭션 동기화 매니저`를 통해 이것을 구현했다.

아래는 트랜잭션 매니저가 관리하는 커넥션을 획득하고 반납하는 로직이 반영된 repository이다. dataSource에서 획득하던 이전과 다르게 `DataSourceUtils`를 통해 커넥션을 획득하고 반납한다.

```java

@Repository
public class JdbcAccountRepository {
    // ...
    public Account save(final Account account) {
        var connection = DataSourceUtils.getConnection(dataSource);
        var sql = "INSERT INTO account(holder, amount) VALUES (?, ?)";
        try (var preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, account.getHolder());
            preparedStatement.setLong(2, account.getAmount());
            preparedStatement.executeUpdate();

            return findByHolder(account.getHolder())
                    .orElseThrow(NoSuchElementException::new);
        } catch (final SQLException e) {
            throw new RuntimeException(e);
        } finally {
            DataSourceUtils.releaseConnection(connection, dataSource);
        }
    }
    // ...
}
```

* `DataSourceUtils.getConnection(dataSource)`: `TransactionSynchronizationManager`가 관리하는 커넥션이 있다면 획득하고 없다면 새롭게 생성하여
  반환한다.
* `DataSourceUtils.releaseConnection(connection, dataSource)`: 커넥션을 `close()`를 통해 닫으면 유지할 수 없다. 커넥션은 이후 로직에도 계속 살아 있어야
  한다. 해당 메서드는 커넥션을 바로 닫는 것이 아니라 트랜잭션 매니저가 관리하지 않을 때 해당 커넥션을 닫는다.

### DataSourceUtils.getConnection(dataSource)

먼저 커넥션을 획득하는 로직을 차근차근 살펴보자.

```java
public abstract class DataSourceUtils {
    // ...
    public static Connection getConnection(DataSource dataSource) throws CannotGetJdbcConnectionException {
        try {
            return doGetConnection(dataSource);
        } catch (SQLException ex) {
            throw new CannotGetJdbcConnectionException("Failed to obtain JDBC Connection", ex);
        } catch (IllegalStateException ex) {
            throw new CannotGetJdbcConnectionException("Failed to obtain JDBC Connection", ex);
        }
    }
    // ...
}
```

주어진 DataSource에서 Connection을 획득한다. `SQLException`을 `UncheckedException`으로 변환하여 호출부를 단순화하고 발생하는 예외를 의미 있게 만든다.

```java
public abstract class DataSourceUtils {
    // ...
    public static Connection doGetConnection(DataSource dataSource) throws SQLException {
        Assert.notNull(dataSource, "No DataSource specified");

        ConnectionHolder conHolder = (ConnectionHolder) TransactionSynchronizationManager.getResource(dataSource);
        if (conHolder != null && (conHolder.hasConnection() || conHolder.isSynchronizedWithTransaction())) {
            conHolder.requested();
            if (!conHolder.hasConnection()) {
                logger.debug("Fetching resumed JDBC Connection from DataSource");
                conHolder.setConnection(fetchConnection(dataSource));
            }
            return conHolder.getConnection();
        }
        // Else we either got no holder or an empty thread-bound holder here.

        logger.debug("Fetching JDBC Connection from DataSource");
        Connection con = fetchConnection(dataSource);

        if (TransactionSynchronizationManager.isSynchronizationActive()) {
            try {
                // Use same Connection for further JDBC actions within the transaction.
                // Thread-bound object will get removed by synchronization at transaction completion.
                ConnectionHolder holderToUse = conHolder;
                if (holderToUse == null) {
                    holderToUse = new ConnectionHolder(con);
                } else {
                    holderToUse.setConnection(con);
                }
                holderToUse.requested();
                TransactionSynchronizationManager.registerSynchronization(
                        new ConnectionSynchronization(holderToUse, dataSource));
                holderToUse.setSynchronizedWithTransaction(true);
                if (holderToUse != conHolder) {
                    TransactionSynchronizationManager.bindResource(dataSource, holderToUse);
                }
            } catch (RuntimeException ex) {
                // Unexpected exception from external delegation call -> close Connection and rethrow.
                releaseConnection(con, dataSource);
                throw ex;
            }
        }

        return con;
    }
    // ...
}
```

실제로 주어진 DataSource에서 Connection을 획득한다. `doGetConnection()` 메서드는 Connection 객체를 생성해줄 뿐만 아니라 트랜잭션 동기화에 사용할수 있도록 특별한 저장소에 바인딩해준다. 트랜잭션이 동기화된 채로 사용하면 이후 커넥션을 획득할 때 동기화 시킨 데이터베이스 커넥션을 사용하게 된다.

`트랜잭션 추상화`를 적절히 활용하면 JDBC API와 강하게 의존하던 부분도 제거할 수 있다. 또한 `트랜잭션 동기화`를 통해 매번 전달하던 Connection 객체에 대한 의존성도 제거할 수 있게 된다.

```java

@Service
public class AccountService {
    // ...
    public void withdraw(final Account account, final Long amount) {
        var transactionStatus = platformTransactionManager.getTransaction(new DefaultTransactionDefinition());
        try {
            accountRepository.update(new Account(account.getId(), account.getHolder(), account.getAmount() - amount));
            platformTransactionManager.commit(transactionStatus);
        } catch (final Exception e) {
            platformTransactionManager.rollback(transactionStatus);
            throw new RuntimeException(e);
        }
    }
}
```

하지만 아직 몇 가지 문제가 남아 있다. service 계층은 언급한 것 처럼 애플리케이션의 비즈니스 로직이 위치하는 곳이다. 위 코드를 보면 아직도 트랜잭션에 대한 의존성이 남아 있게 된다. 이것을 어떻게 개선할 수 있을까? 

다음 시간에는 템플릿 콜백 패턴을 활용한 `TransactionTemplate`과 스프링 AOP를 활용한 선언적 트랜잭션인 `@Transactional`을 활용한 트랜잭션 로직 분리에 대해 알아보려 한다.

## References.

[Interface PlatformTransactionManager](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/transaction/PlatformTransactionManager.html)<br>
이일민 지음, 『토비의 스프링 3.1 Vol. 1 스프링의 이해와 원리』, 에이콘(2012), p349-399.<br>
[스프링 DB 1편 - 데이터 접근 핵심 원리](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-db-1/dashboard)<br>
[[Spring] 트랜잭션에 대한 이해와 Spring이 제공하는 Transaction(트랜잭션) 핵심 기술 - (1/3)](https://mangkyu.tistory.com/154)

<TagLinks />
