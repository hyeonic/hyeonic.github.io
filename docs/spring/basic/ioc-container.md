---
title: "IoC 컨테이너"
tags: ['우아한테크코스', 'Spring', 'IoC 컨테이너']
date: 2022-10-08 18:00:00
feed:
  enable: true
---

# IoC 컨테이너

Java에서 객체가 의존성을 가지는 방법 중에는 여러 가지가 있다.

## 정적 메서드를 활용한 의존성

`static` 키워드를 활용하여 메서드를 의존하는 것은 강한 의존성을 만들기 때문에 변화에 유연하지 못하다.

```java
public class UserDao {

    private static final Map<Long, User> users = new HashMap<>();

    public static void insert(User user) {
        users.put(user.getId(), user);
    }

    public static User findById(long id) {
        return users.get(id);
    }
}
```

```java
public class UserService {
    
    public User insert(User user) {
        UserDao.insert(user); // 강한 의존성
        return UserDao.findById(user.getId());
    }
}
```

이처럼 `static` 키워드로 메서드를 의존하는 것은 아래와 같은 문제점을 가지고 있다.

- `UserService`와 `UserDao`는 강하게 결합된다.
- `UserService`를 테스트 하는 관점에서 `UserDao`는 `UserService` 내부에 감춰져 `직접 제어할 수 없는 영역`에 해당된다. 이러한 구조는 테스트를 어렵게 만든다.

## 직접 생성을 통한 의존성

```java
public class UserService {

    private final UserDao userDao = new InMemoryUserDao(); // 직접 생성하여 의존

    public User insert(User user) {
        userDao.insert(user);
        return userDao.findById(user.getId());
    }
    ...
}
```

```java
public class InMemoryUserDao implements UserDao {

    private static final Logger log = LoggerFactory.getLogger(InMemoryUserDao.class);

    private static final Map<Long, User> users = new HashMap<>();

    private final JdbcDataSource dataSource;

    public InMemoryUserDao() {
        final var jdbcDataSource = new JdbcDataSource();
        jdbcDataSource.setUrl("jdbc:h2:mem:test;DB_CLOSE_DELAY=-1;");
        jdbcDataSource.setUser("");
        jdbcDataSource.setPassword("");

        this.dataSource = jdbcDataSource;
    }

    public void insert(User user) {
        try (final var connection = dataSource.getConnection()) {
            users.put(user.getId(), user);
        } catch (SQLException e) {
            log.error(e.getMessage());
        }
    }

    public User findById(long id) {
        try (final var connection = dataSource.getConnection()) {
            return users.get(id);
        } catch (SQLException e) {
            log.error(e.getMessage());
            return null;
        }
    }
}
```

이때 발생할 수 있는 문제는 `static 메서드` 의존과 동일하다.

- `UserService`는 `InMomoryUserDao`와 강하게 결합된다. 이러한 의존성을 객체 내부에서 생성하고 있기 때문에 구현체의 변경을 진행할 때 UserService에 접근하여 직접 수정해야 한다.

## 의존성 주입

그럼 이제 `DI(Dependency Injection)`를 통해 내부에 강하게 결합한 부분을 외부에서 `주입`하는 방식으로 개선해보자.

```java
public class UserService {

    private final UserDao userDao;

    public UserService(UserDao userDao) {
        this.userDao = userDao;
    }

    public User join(User user) {
        userDao.insert(user);
        return userDao.findById(user.getId());
    }
} 
```

```java
public class InMemoryUserDao implements UserDao {

    private static final Logger log = LoggerFactory.getLogger(InMemoryUserDao.class);

    private static final Map<Long, User> users = new HashMap<>();

    private final JdbcDataSource dataSource;

    public InMemoryUserDao() {
        final var jdbcDataSource = new JdbcDataSource();
        jdbcDataSource.setUrl("jdbc:h2:mem:test;DB_CLOSE_DELAY=-1;");
        jdbcDataSource.setUser("");
        jdbcDataSource.setPassword("");

        this.dataSource = jdbcDataSource;
    }

    public void insert(User user) {
        try (final var connection = dataSource.getConnection()) {
            users.put(user.getId(), user);
        } catch (SQLException e) {
            log.error(e.getMessage());
        }
    }

    public User findById(long id) {
        try (final var connection = dataSource.getConnection()) {
            return users.get(id);
        } catch (SQLException e) {
            log.error(e.getMessage());
            return null;
        }
    }
}
```

인터페이스를 통해 `UserService`와 `InMemoryUserDao`에 `의존성을 약하게` 만들 수 있게 되었다. `UserService`의 입장에서는 `UserDao`가 어떤 구현체든 상관없다. 외부에서 주입한 구현체에 따라 동작하기 때문이다. 

`UserService` 테스트하기도 용이해진다. 만약 UserService가 의존하던 UserDao 구현체가 데이터베이스를 강하게 의존하고 있다고 가정하자. 실제 데이터베이스를 활용한 테스트를 진행하는데에는 한계가 있기 때문에 보다 더 간편한 객체로 의존성을 변경하면 손 쉽게 테스트가 가능해진다.

## DI의 한계

다만 단순한 `DI`에도 한계는 있다. 결국 UserService를 관리하는 객체에서 생성한 뒤 주입해야 한다는 것이다.

```java
public class UserController {
    
    private final UserService userService = new UserService(new InMemoryUserDao());
    ...
}
```

결국 상위 객체가 의존성을 가지는 것은 여전하다. 여기서 더 나아가 객체를 `생성`하고 `의존성을 연결`해주기 위한 `목적을 가진 객체`가 필요하다.

스프링은 이러한 객체의 생성과 의존 관계 설정, 사용, 제거 등의 작업을 `독립된 컨테이너`가 담당한다. 이것을 컨테이너가 객체에 대한 제어권을 가지고 있다하여 `IoC`라 부른다. 스프링에서 `IoC`를 담당하는 컨테이너를 `빈 팩토리` 또는 `애플리케이션 컨텍스트`라 부른다. 

`DI(Dependency Injection)`은 `IoC`를 구현하는데 사용할 수 있는 패턴이다. 객체가 직접 의존성을 생성하고 관리하는 것이 아니라 외부에서 주입 받는 형식으로 의존성을 가지게 된다.

이러한 제어의 역전을 통해 자신이 의존하는 객체를 직접 관리하던 `능동적인 객체`가 외부로 인해 의존 관계를 주입 받는 `수동적인 객체`가 될 수 있다.

## 스프링 IoC 용어 정리

### 제어의 역전 (IoC, Inversion of Control)

- 모든 제어 권한을 자신이 아닌 다른 대상에게 위임한다.
- 객체의 생성, 생명주기의 관리까지 모든 객체에 대한 제어권이 바뀌는 것을 의미한다.
- 제어의 역전이라는 개념은 상당히 오래전부터 있었다. GoF의 디자인 패턴에서도 이 용어를 쉽게 찾아볼 수 있다.

일반적인 프로그램의 흐름은 `main()` 메서드를 시작으로 사용할 객체를 결정하고, 결정한 객체를 생성하고, 생성된 객체의 메서드를 호출하는 등의 작업이 반복된다. 이러한 구조에서 각각의 객체는 능동적으로 자신이 사용하는 객체를 결정하게 된다.

제어의 역전은 이러한 제어의 흐름의 개념을 뒤집는 것이다. 제어의 역전의 핵심은 객체가 자신이 사용할 객체를 스스로 선택하지 않는다. 자신에 대한 제어권을 외부 다른 대상에게 위임한다.  

프레임워크도 제어의 역전 개념이 적용된 대표적인 기술 중 하나이다. 라이브러리는 사용하는 애플리케이션 코드가 애플리케이션의 흐름을 `직접 제어`한다. 프레임워크는 애플리케이션 코드가 프레임워크에 의해 사용된다.

제어의 역전에서는 프레임워크 또는 컨테이너와 같이 애플리케이션 컴포넌트의 생성과 관계설정, 사용, 생명주기 관리 등을 관장하는 존재가 필요하다. 그 중 스프링은 IoC를 모든 기능의 기초가 되는 기반기술로 삼고 있다.

### 빈 (bean)

- 스프링에서 `IoC 방식`으로 관리하는 객체를 말한다.
- 스프링은 `빈 팩터리`를 통해 빈 객체를 직접 생성하고 제어한다.

### 빈 팩토리 (bean factory)

- 스프링의 IoC를 담당하는 핵심 컨테이너이다.
- DI를 통해 객체 사이의 의존성을 결정한다.
- 빈을 등록하고, 생성하고, 조회하고, 반환하는 등 `빈을 관리하는 기능`을 담당한다.
- 이러한 팩토리는 `애플리케이션의 컴포넌트 역할을 담당하는 객체`와 `애플리케이션의 구조를 결정하는 객체`를 `분리` 했다는 것에 큰 의미가 담겨 있다.

### 애플리케이션 컨텍스트 (application context)

- 스프링에서 빈 팩토리를 `확장`한 IoC 컨테이너이다.
- 빈 팩토리는 주로 빈의 생성과 제어의 관점에서 이야기 한 것이다.
- DI를 위한 빈 팩토리에 엔터프라이즈 애플리케이션 개발을 위해 필요한 여러 가지 기능을 추가한 것이다.
- 애플리케이션 컨텍스트는 스프링이 제공하는 `애플리케이션 지원 기능`을 모두 포함한다.

### 컨테이너 (container) 또는 IoC 컨테이너

- IoC 방식으로 빈을 관리한다는 의미에서 애플리케이션 컨텍스트나 빈 팩토리를 말한다.

## References.

이일민 지음, 『토비의 스프링 Vol. 1』, 에이콘(2012), 88p, 92p, 94p <br>
[1. The IoC Container](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html)

<TagLinks />
