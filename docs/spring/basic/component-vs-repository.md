---
title: Component 애노테이션 vs Repository 애노테이션
tags: ['우아한테크코스', 'spring']
date: 2022-05-09 19:30:00
feed:
  enable: true
---

# @Component vs @Repository

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/152970395-a31c8134-fc89-449f-b4dc-441e03df929c.png />

## 개요

Spring에서 Bean을 등록하기 위한 애노테이션의 차이에 대해 알아본다.

대부분의 일반적인 애플리케이션에서는 Data Access, Presentation, Service 및 business 등 고유한 계층이 존재한다. 각 계층에는 다양한 Bean(ex. Dao, Service, Controller 등)이 있다. 

이러한 Bean들을 자동으로 탐지하기 위해서 Spring은 `classpath scanning annotation`을 사용한다. 탐지된 Bean 들은 `ApplicationContext`에 등록된다.

 * `@Component`: `Spring-managed component`의 일반적인 `streotype`이다.
 * `@Service`: 서비스 계층의 클래스에 작성한다.
 * `@Repository`: 데이터베이스의 레포지토리 역할을 하는` persistence 계층`의 클래스에 작성한다.
 
위 애노테이션의 가장 큰 차이는 서로 다른 분류에 의해 사용된다는 것이다. 

### @Component

애플리케이션 전체에서 `@Componet`를 사용하여 Spring-managed component로 표시할 수 있다. Spring은 기본적으로 `@Component`가 명시된 객체를 `ApplicationContext`에 등록한다. 즉 `@Service`와 `@Repository`를 찾는 것이 아니라 내부에 작성된 `@Component`를 찾아 `ApplicationContext`에 등록하는 것이다.

아래는 실제 `Service`와 `Repository`의 내부 구현 코드를 가져온 것이다.

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Component 
public @interface Repository {

	@AliasFor(annotation = Component.class)
	String value() default "";
}
```

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Component
public @interface Service {

	@AliasFor(annotation = Component.class)
	String value() default "";
}
```

내부적으로 `@Component`가 사용되는 것을 확인할 수 있다. 

### @Repository

`@Repository`는 `persistence-specific exceptions`를 포착하여 Spring의 통합된 `unchecked exceptions`으로 변환하여 다시 던진다.

아래는 Repository 클래스의 문서를 해석한 것이다.

::: tip 문서 중 일부

Indicates that an annotated class is a "Repository", originally defined by Domain-Driven Design (Evans, 2003) as "a mechanism for encapsulating storage, retrieval, and search behavior which emulates a collection of objects".

**애노테이션을 작성한 클래스가 도메인 기반 설계에 의해 "객체 모음을 에뮬레이트하는 저장, 검색 및 검색 동작을 캡슐화하는 메커니즘"으로 정의된 "Repository"임을 나타낸다.**

Teams implementing traditional Java EE patterns such as "Data Access Object" may also apply this stereotype to DAO classes, though care should be taken to understand the distinction between Data Access Object and DDD-style repositories before doing so.

**DAO와 같은 전통적인 Java EE 패턴을 구현하는 팀도 DAO 클래스에 이러한 streotype을 적용할 수 있지만, DAO와 DDD 스타일의 Repository의 차이를 이해하기 전에 사용에 주의해야 한다.**

A class thus annotated is eligible for Spring DataAccessException translation when used in conjunction with a PersistenceExceptionTranslationPostProcessor. 

**애노테이션이 달린 클래스는 PersistenceExceptionTranslationPostProcessor와 함께 사용될 때 자동으로 예외를 Spring DataAccessException로 일괄 변환해준다.**

:::

언급된 `PersistenceExceptionTranslationPostProcessor`는 `@Bean`을 통해 컨텍스트에 추가해야 하지만 `Spring Boot`를 사용하면 자동으로 포함하게 된다.

이 `Bean Post Processor`는 `@Repository`가 달린 모든 Bean에 `advisor`를 추가한다.

### @Service

비즈니스 로직을 담당하고 있음을 나타내기 위해 `@Service`를 사용한다. 이 애노테이션은 `@Repository`와 다르게 특별한 용도를 가지고 있지 않다.

## 정리

우리는 각각의 계층의 책임과 역할에 대해 고민해야 하며 각 애노테이션의 목적에 맞게 작성해야 한다. 정리하면 각 계층의 규칙에 따라 애노테이션을 선택하는 것은 단순히 `@Component`를 사용할 때 보다 역할을 명시적으로 뚜렷하게 확인할 수 있으며 예외를 변환해주는 등 다양한 장점들을 누릴 수 있다.

## References.

[PersistenceExceptionTranslationPostProcessor](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/dao/annotation/PersistenceExceptionTranslationPostProcessor.html)<br>
[@Component vs @Repository and @Service in Spring](https://www.baeldung.com/spring-component-repository-service)<br>
[Annotation Type Repository](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/stereotype/Repository.html)

<TagLinks />
