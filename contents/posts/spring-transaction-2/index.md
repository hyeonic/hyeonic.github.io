---
title: "스프링이 개선한 트랜잭션 (2)"
date: 2022-12-10
update: 2022-12-10
tags: 
 - 스프링
 - 트랜잭션
series: "스프링이 개선한 트랜잭션"
feed:
  enable: false
---

> 작성에 사용된 예제 코드는 [spring-transaction](https://github.com/hyeonic/blog-code/tree/main/spring-transaction)에서 확인해볼 수 있다.

이전 시간에 트랜잭션 추상화를 통해 여러 데이터 접근 기술 변경에 유연한 구조를 만들었다. 또한 트랜잭션 동기화를 통해 멀티 스레드 환경에서도 별도의 커넥션 객체를 사용하여 독립적으로 트랜잭션이 적용될 수 있도록 구현하였다. 

이번 시간에는 템플릿 콜백 패턴을 활용한 `TransactionTemplate`과 스프링 AOP를 활용한 선언적 트랜잭션인 `@Transactional`을 활용한 트랜잭션 로직 분리에 대해 알아보려 한다.

## TransactionTemplate

프로그래밍 방식의 트랜잭션 구분 및 트랜잭션 예외 처리를 단순화하는 템플릿 클래스이다. `execute()` 메서드에 `TransactionCallback` 인터페이스를 구현한 구현체를 전달하여 트랜잭션을 수행할 수
있다.

```java
public class AccountService {
    // ...
    public void withdraw(final Account account, final Long amount) {
        transactionTemplate.executeWithoutResult(
                transactionStatus -> jdbcAccountRepositoryV3.update(generateAccount(account, amount))
        );
    }
    // ...
}
```

> `executeWithoutResult()`는 return이 존재하지 않는 `execute()`이다. `TransactionOperations` 인터페이스에 `default` 메서드로 명시되어 있다.

`TransactionTemplate` 덕분에 트랜잭션 시작과 커밋, 롤백에 대한 로직이 전부 제거되었다. `execute()` 메서드를 간단히 요약하면 아래와 같다.

```java
public class TransactionTemplate extends DefaultTransactionDefinition
        implements TransactionOperations, InitializingBean {
    // ...
    public <T> T execute(TransactionCallback<T> action) throws TransactionException {
        // ...
        T result;
        try {
            result = action.doInTransaction(status);
        } catch (RuntimeException | Error ex) {
            // Transactional code threw application exception -> rollback
            rollbackOnException(status, ex);
            throw ex;
            // ...
            this.transactionManager.commit(status);
            return result;
        }
        // ...
    }
    // ...
}
```

실제 코드는 더 복잡하게 되어있지만 핵심은 매개변수로 전달된 구현체의 메서드 `action.doInTransaction(status)`를 수행한다. 구현체 내부에는 우리가 작성한 비즈니스 로직이 담겨 있다. 만약
로직 수행 중 예외가 터질 경우 롤백한다. 정상적으로 수행되면 커밋한다.

하지만 아직도 비즈니스 로직과 트랜잭션 기능이 하나의 클래스에 존재하고 있다. 어떻게하면 트랜잭션에 대한 의존성을 최소화할 수 있을까? 어떻게하면 service 계층에 비즈니스 로직만 순수하게 남길 수 있을까?

## 트랜잭션 AOP

service 계층에 비즈니스 로직만 순수하게 남길 수 있는 방법은 트랜잭션이라는 부가기능을 프록시로 분리하는 것이다.

```java
public interface AccountService {

    void withdraw(final Account account, final Long amount);
}
```

먼저 행위를 명시해둔 AccountService 인터페이스이다. 실제 비즈니스 로직 명시를 위한 구현체를 추가한다.

```java

@Service
public class AppAccountService implements AccountService {

    private final JdbcAccountRepository jdbcAccountRepositoryV4;

    public AppAccountService(final JdbcAccountRepository jdbcAccountRepositoryV4) {
        this.jdbcAccountRepositoryV4 = jdbcAccountRepositoryV4;
    }

    public void withdraw(final Account account, final Long amount) {
        jdbcAccountRepositoryV4.update(generateAccount(account, amount));
    }

    private Account generateAccount(final Account account, final Long amount) {
        return new Account(account.getId(), account.getHolder(), account.getAmount() - amount);
    }
}
```

트랜잭션에 대한 부가기능을 추가하기 위해 프록시 객체를 추가한다.

```java

@Service
public class AccountServiceProxy implements AccountService {

    private final TransactionTemplate transactionTemplate;
    private final AccountService accountService;

    public AccountServiceProxy(final PlatformTransactionManager platformTransactionManager,
                               final AccountService accountService) {
        this.transactionTemplate = new TransactionTemplate(platformTransactionManager);
        this.accountService = accountService;
    }

    @Override
    public void withdraw(final Account account, final Long amount) {
        transactionTemplate.executeWithoutResult(transactionStatus -> accountService.withdraw(account, amount));
    }
}
```

이제 실제 사용 측은 프록시 객체를 활용하면 되기 때문에 두 관심사를 비즈니스 로직을 담은 객체와 프록시 객체로 나눌 수 있게 되었다. 하지만 매번 트랜잭션 적용을 위해 프록시 객체를 매번 생성하는 것은 매우 고된
일이다.

스프링은 AOP를 활용하여 매우 편리하게 프록시를 적용할 수 있다. 또한 스프링이 트랜잭션과 관련된 AOP를 이미 만들어두었기 때문에 우리는 편리하게 가져다 사용하기만 하면 된다.

### @Transactional

개별 메서드 또는 클래스에 대한 트랜잭션 특성을 설명한다. 이 애노테이션이 클래스 수준에 선언되면 선언 클래스 및 해당 하위 클래스의 모든 메서드에 기본값으로 적용된다. 개별적인 트랜잭션 처리가 필요한
곳에 `@Transactional`만 활용하면 트랜잭션 AOP가 이 애노테이션을 인식하여 자동으로 트랜잭션 프록시를 적용해준다.

```java

@Service
public class AccountService {
    // ...
    @Transactional
    public void withdraw(final Account account, final Long amount) {
        jdbcAccountRepositoryV5.update(new Account(account.getId(), account.getHolder(), account.getAmount() - amount));
    }
}
```

`@Transactional` 애노테이션을 통해 선언적 트랜잭션을 적용하기 위해서는 AOP와 Spring에서 제공하는 AOP에 대한 전반적인 지식이 필요하다. 이 부분은 추가적인 학습 이후 별도의 포스팅을 남길
예정이다.

## 정리

지금까지 service 계층에 있는 비즈니스 로직과 트랜잭션과 관련된 두 가지 관심사를 분리하기 위해 스프링이 어떤 방법을 활용했는지 알아보았다. 인터페이스를 활용한 추상화와 스레드 별도의 저장소인 스레드 로컬,
AOP 등 다양한 기술 덕분에 우리는 `@Transactional` 애노테이션을 통해 복잡한 트랜잭션을 편리하게 활용할 수 있었다.

편리한 만큼 내부 구조를 이해하는 것은 매우 까다로운 과정이다. 추후 AOP에 대한 개념, 적용 방법, 이것을 편리하게 적용하기 위한 스프링의 노력들을 추가적으로 학습한 뒤 트랜잭션이 적용된 클래스 및 메서드를
감지하고 부가기능을 도입하는 과정을 알아보려 한다.

## References.

[Interface PlatformTransactionManager](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/transaction/PlatformTransactionManager.html)<br>
이일민 지음, 『토비의 스프링 3.1 Vol. 1 스프링의 이해와 원리』, 에이콘(2012), p349-399.<br>
[스프링 DB 1편 - 데이터 접근 핵심 원리](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-db-1/dashboard)<br>
[[Spring] 트랜잭션에 대한 이해와 Spring이 제공하는 Transaction(트랜잭션) 핵심 기술 - (1/3)](https://mangkyu.tistory.com/154)
