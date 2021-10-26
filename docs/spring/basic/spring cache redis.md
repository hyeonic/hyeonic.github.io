---
title: Spring cache redis
tags: ['java', 'spring', 'spring boot', 'cache', 'redis']
---

# Spring cache redis

## cache란?

데이터나 값을 미리 복사해 놓는 임시 저장소를 가리킨다. 이러한 cache는 접근 시간에 비해 원래 데이터를 접근하는 시간이 오래 걸리는 경우나 값을 다시 계산하는 시간을 절약하고 싶은 경우에 사용한다. cache에 데이터를 미리 복사해 놓으면 계산이나 접근 시간 없이 더 빠른 속도로 데이터에 접근 가능하다.

정리하면 디스크에 접근하여 정보를 얻어오는 것 보다 빠른 속도로 데이터 조회가 가능하다. 하지만 인메모리로 설정할 경우 휘발성이기 때문에 서버가 다운되면 데이터는 사라질 수 있다. 즉 영구적으로 보관하기 위한 용도가 아니다.

## 그래서 이걸 왜?

만약 메인 페이지에 랭킹과 관련된 데이터를 매번 조회한다고 가정하면 해당 웹 서비스에 접속할 때 마다 랭킹 정보들을 데이터베이스에서 조회할 것이다. 이러한 상황은 클라이언트가 갑작스럽게 몰리게 되면 큰 부담으로 다가온다.

이때 이렇게 자주 조회되는 데이터를 cache에 보관하는 것이다. cache에 보관된 데이터는 일정 시간(유효기간 TTL)을 가지고 유지된다. 해당 기간이 종료되면 cache를 삭제하게 된다. 

cache는 자주 조회되는 랭킹, 쇼핑몰의 베스트셀러, 추천 상품 등의 데이터를 보관하는데 용이하다. 단순히 관련 요청이 들어오면 데이터베이스에 접근하여 다시 조회하기 보단 cache에 저장된 기존에 조회한 데이터를 사용하면 되기 때문이다.

## Spring cache

Spring에서는 framework 레벨에서 이러한 cache를 추상화하여 지원해준다. 또한 Redis, EhCache 등 bean 설정을 통해 빠르게 cache 저장소로 추가할 수 있다. 

## Spring redis

필자는 그중 redis를 활용한 적용 예제를 간단히 사용해보려 한다. 

**build.gradle**

```groovy
plugins {
	id 'org.springframework.boot' version '2.5.4'
	id 'io.spring.dependency-management' version '1.0.11.RELEASE'
	id 'java'
}

group = 'me.hyeonic'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '11'

configurations {
	compileOnly {
		extendsFrom annotationProcessor
	}
}

repositories {
	mavenCentral()
}

dependencies {
	implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
	implementation 'org.springframework.boot:spring-boot-starter-data-redis'
	implementation 'org.springframework.boot:spring-boot-starter-web'
	compileOnly 'org.projectlombok:lombok'
	runtimeOnly 'com.h2database:h2'
	annotationProcessor 'org.projectlombok:lombok'
	testImplementation 'org.springframework.boot:spring-boot-starter-test'
}

test {
	useJUnitPlatform()
}
```

redis로 cache를 구현하기 위해 `spring-data-redis`를 추가하였다. 그 밖에도 간단한 예제 생성을 위해 `web`, `spring-data-jpa`, `h2` database의 의존성을 추가하였다.

**application.yml**
```yml
spring:
  h2:
    console:
      enabled: true

  datasource:
    hikari:
      jdbc-url: jdbc:h2:mem:testdb;MODE=MYSQL
      username: sa

  jpa:
    hibernate:
      ddl-auto: create-drop
    properties:
      hibernate:
        show_sql: false
        format_sql: true
        dialect: org.hibernate.dialect.MySQL57Dialect
        storage_engine: innodb
    defer-datasource-initialization: true

  cache:
    type: redis

  redis:
    host: localhost
    port: 6379

logging.level:
  org.hibernate.SQL: debug
  com.skhuedin.skhuedin: debug≠
```

**RedisConfig.java**
```java
@EnableRedisRepositories
@Configuration
public class RedisConfig {

    @Value("${spring.redis.host}")
    private String host;

    @Value("${spring.redis.port}")
    private int port;

    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        RedisStandaloneConfiguration redisStandaloneConfiguration = new RedisStandaloneConfiguration(host, port);
        return new LettuceConnectionFactory(redisStandaloneConfiguration);
    }
}
```

redis 연결을 위해 RedisConnectionFactory를 `@Bean`을 활용하여 등록하였다. redis는 local 환경에 설치한 후 사용하였다.

**CacheConfig.java**
```java
@EnableCaching
@RequiredArgsConstructor
@Configuration
public class CacheConfig extends CachingConfigurerSupport {

    private final RedisConnectionFactory redisConnectionFactory;

    @Bean
    public CacheManager cacheManager() {
        RedisCacheConfiguration redisCacheConfiguration = RedisCacheConfiguration.defaultCacheConfig()
                .serializeKeysWith(RedisSerializationContext.SerializationPair
                                .fromSerializer(new StringRedisSerializer()))
                .serializeValuesWith(RedisSerializationContext.SerializationPair
                                .fromSerializer(new GenericJackson2JsonRedisSerializer()))
                .entryTtl(Duration.ofSeconds(60));

        return RedisCacheManager.RedisCacheManagerBuilder
                .fromConnectionFactory(redisConnectionFactory)
                .cacheDefaults(redisCacheConfiguration)
                .build();
    }
}
```
cache 관련 설정을 하기 위한 config이다. 우선 cache 사용을 위해서는 `@EnableCaching` 애노테이션을 사용해야 한다.

추가로 Caching 설정을 도와주는 `CachingConfigurerSupport`를 상속 받아 CacheManger를 오버라이딩하여 bean으로 등록한다.

앞서 등록한 `redisConnectionFactory`를 활용하여 cacheManager에 등록하였다. 또한 `RedisCacheConfiguration`으로 cache에 대한 설정들을 작성한 후 manager와 함께 등록한다. ttl은 60초로 설정하였다. cache를 등록하면 60초 동안 유지될 것 이다.

## User

cache가 동작하는 것을 확인하기 위해 user 엔티티를 생성하였다.

**User.java**
```java
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    private String email;

    private String name;

    private Integer click;

    @Builder
    public User(String email, String name) {
        this.email = email;
        this.name = name;
        this.click = 0;
    }

    public void addClick() {
        this.click++;
    }
}
```

간단한 user 엔티티이다. click 컬럼은 데이터베이스에서 조회할 때 마다 조회 회수를 count 하기 위한 용도이다. 해당 숫자가 증가하면 데이터베이스에 접근했다고 가정한다.

**data.sql**
```sql
INSERT INTO USER (EMAIL, NAME, CLICK)
VALUES ('user1@email.com', 'user1', 0),
       ('user2@email.com', 'user2', 0),
       ('user3@email.com', 'user3', 0),
       ('user4@email.com', 'user4', 0),
       ('user5@email.com', 'user5', 0);
```

빠른 확인을 위해 `data.sql`을 활용하여 초기 데이터를 세팅한다.

**UserRepository.java**
```java
public interface UserRepository extends JpaRepository<User, Long> {
}
```

**UserService.java**
```java
public interface UserService {

    User findById(Long id);
}
```

**UserServiceImpl.java**
```java
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    @Cacheable(key = "#id",value = "user")
    public User findById(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException());

        user.addClick();

        return user;
    }
}
```

이제 실제 cache의 동작을 확인하기 위한 userService 이다.

`@Cacheable`은 cahcing된 데이터가 있으면 반환하고 없으면 데이터베이스에서 조회한 후 redis에 cache한다. name과 key를 조합하여 사용할 수 있다. key의 경우 해당 메소드의 파라미터를 사용하여 설정할 수 있다.

위 예시대로 설정하게 되면 redis에는 "user::1", "user::2"와 같은 형식으로 저장된다.

**UserController.java**
```java
@RequiredArgsConstructor
@RestController
public class UserController {

    private final UserService userService;

    @GetMapping("users/{userId}")
    public ResponseEntity findById(@PathVariable("userId") Long userId) {

        return new ResponseEntity(userService.findById(userId), HttpStatus.OK);
    }
}
```

간단히 user id를 활용하여 cache 유무를 확인하기 위한 controller 이다.

## 실행

`http://localhost:8080/users/1`를 실행하게 되면 click은 1 증가한다.

```json
{
  "id": 1,
  "email": "user1@email.com",
  "name": "user1",
  "click": 1
}
```

아까 설정해둔 60초가 지나기 전까지는 동일하게 계속 1로 유지된다. 하지만 60초가 지나게 되면 cache된 데이터는 사라지고 새롭게 조회하여 click이 증가한다.

```json
{
  "id": 1,
  "email": "user1@email.com",
  "name": "user1",
  "click": 2
}
```

---

## References

[cache](https://ko.wikipedia.org/wiki/%EC%BA%90%EC%8B%9C)

<TagLinks />