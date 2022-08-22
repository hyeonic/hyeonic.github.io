---
title: JPA
tags: ['java', 'JPA']
---

# JPA

Java Persistence API이다. Java 진영의 ORM 표준 기술이다.

::: tip ORM Object Relational Mapping
객체와 관계형 데이터베이스를 중간에서 매핑한다. 객체가 데이터베이스 테이블이 되도록 도와준다. 대중적인 언어에는 대부분 ORM 기술이 존재한다.
:::

JPA는 인터페이스의 모음이다. JPA 2.1 표준 명세를 구현한 구현체에는 hibernate, EclipseLink, DataNucleus 등이 있다. 스프링 부트에서 `spring-boot-starter-date-jpa`을 사용하게 될 경우 구현체로 `hibernate`를 활용한다.

JPA는 애플리케이션과 JDBC 사이에서 동작한다. JPA를 활용하면 JDBC API를 통해 SQL을 만들어 데이터베이스에 호출한다. 

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/138694240-be68e866-4c8d-468a-9e21-a080843b003f.png>
</p>

## JPA의 장점

### 1. SQL 중심적인 개발에서 객체 중심으로 개발
SQL을 중심으로 개발이 이루어지면 반복적인 CRUD 작성이 이루어진다. 만약 CRUD를 전부 작성한 뒤 테이블을 수정하게 되면 관련 SQL을 모두 수정해야 한다.

### 2. 생산성 증가
SQL을 직접 작성하지 않아도 괜찮다. 또한 객체와 JPA 메서드를 활용하여 데이터베이스를 다루기 때문에 생산성이 증가한다.

### 3. 유지보수 용이
이전에는 SQL 수정이 필요할 때 DTO 필드를 모두 변경해야 하지만 JPA는 엔티티 클래스 정보만 변경하면 된다.

### 4 패러다임 불일치 해결
앞서 언급한 것 처럼 객체와 관계형 데이터베이스 중간에서 매핑을 진행하기 때문에 좀 더 객체지향 적인 개발에 집중할 수 있다. 

### 5. 성능 증가
직접 SQL을 작성하는 것과 비교하면 JPA의 1차 캐시, 트랜잭션을 지원하는 쓰기지연, 지연 로딩 등 같은 기능을 사용하면 성능 최적화가 가능하다.

## References

[JPA](https://gyoogle.dev/blog/web-knowledge/spring-knowledge/JPA.html)

<TagLinks />