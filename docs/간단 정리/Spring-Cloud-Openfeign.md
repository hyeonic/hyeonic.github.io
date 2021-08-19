# Spring-Cloud-Openfeign

프로젝트 도입에 앞서 관련한 지식을 습득하기 위해 OpenFeign에 대해 간단히 조사하고 작성한 예제이다.

## Feign 이란?

`Feign`은 `netflix`에서 개발한 오픈소스로 `Http client binder`이다. 선언전 방식으로 Rest 기반 호출을 추상화하여 제공한다. `interface`와 `annotation`으로 간단하게 `HTTP API` 클라이언트를 구현할 수 있다.

## Spring Cloud OpenFeign 이란?

Spring Cloud OpenFeign은 Netflix에서 개발된 Open Feign과 Spring Cloud가 통합한 버전이다.

## 의존성 추가

```groovy
plugins {
	id 'org.springframework.boot' version '2.5.3'
	id 'io.spring.dependency-management' version '1.0.11.RELEASE'
	id 'java'
}

...

ext {
    ...
	set('springCloudVersion', "2020.0.3")
    ...
}

dependencies {
    ...
	implementation 'org.springframework.cloud:spring-cloud-starter-openfeign'
    ...
}

dependencyManagement {
	imports {
		mavenBom "org.springframework.cloud:spring-cloud-dependencies:${springCloudVersion}"
	}
}
```

 * Spring boot 2.5.x 기준
 * Spring cloud openFeign을 사용하기 위한 의존성이다.

## Feign 사용하기

Feign 사용을 위해서는 `@EnableFeignClients`이 필요하다. root package에 위치해야 하며 다른 곳에 위치한 경우 `basePackages` 혹은 `basePackageClasses`를 지정해주어야 한다.

```java
@EnableFeignClients
@SpringBootApplication
public class SpringOpenfeignApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringOpenfeignApplication.class, args);
    }

}
```

`@EnableFeignClients`는 지정한 package를 돌아다니며 `@FeignClient`찾아 구현체를 생성해준다.

## @FeignClient

```java
@FeignClient(name = "user", url = "http://localhost:8080")
public interface UserClient {

    @GetMapping("/api/v1/users")
    List<User> getUsers();

    @PostMapping("/api/v1/users")
    User postUser(@RequestBody UserSaveRequestDto requestDto);
}
```

## 주의할 점

* Spring MVC의 경우 `@PathVariable`, `@QueryParam` 등 추가적인 value를 넣지 않아도 field의 이름이 default로 설정된다. 하지만 feign에서는 value를 필수적으로 세팅해줘야 제대로 mapping 된다.

* Feign client method parameter로 아무것도 설정하지 않으면 `@RequestBody`로 생각하여 처리한다. 이때 이러한 parameter가 두 개 이상 이면  `Method has too many Body parameters` 에러가 발생한다.

* feign client 용 configuration은 `@Configuration annotation`을 사용하면 안된다. feign client interface에 사용할 목적을 가지고 configuration class를 만들면 Bean이 생성되어 모든 feign client에 적용된다.

---

## References.

[우아한 feign 적용기](https://techblog.woowahan.com/2630/)
[Spring Cloud OpenFeign](https://cloud.spring.io/spring-cloud-static/spring-cloud-openfeign/2.1.0.RELEASE/single/spring-cloud-openfeign.html)