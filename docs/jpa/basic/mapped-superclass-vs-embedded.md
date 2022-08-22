---
title: "@MappedSuperclass vs @Embedded"
tags: ['우아한테크코스', '상속', '조합', 'MappedSuperclass', 'Embedded']
date: 2022-08-22 18:00:00
feed:
  enable: true
---

# @MappedSuperclass vs @Embedded

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/152970395-a31c8134-fc89-449f-b4dc-441e03df929c.png />

## @MappedSuperclass

부모 클래스를 상속 받는 자식 클래스에게 매핑 정보만 제공할 때 사용한다. 즉, 단순히 `매핑 정보를 상속할 목적`으로만 사용하기 때문에 추상 클래스 처럼 사용할 수 있다. 특징으로는 아래와 같다.

 * 테이블과 직접적인 매핑 없이 자식 클래스가 매핑 정보를 상속하기 위해 사용한다.
 * 해당 클래스는 직접 생성하여 사용할 일이 없기 때문에 추상 클래스를 권장한다.

정리하면 테이블과 관계 없이 단순히 엔티티가 공통으로 사용하는 `매핑 정보를 모아주는 역할`을 담당한다. 

## @Embedded

새로운 값 타입을 직접 정의해서 사용할 수 있다. JPA에서는 이것을 임베디드 타입이라고 한다. 보다 더 객체지향적인 코드 작성을 위해 사용할 수 있다. 해당 애노테이션을 활용하면 객체의 책임에 대한 `응집도`를 높일 수 있으며, 코드가 더욱 명확해질 것이다. 특징으로는 아래와 같다.

 * `@Embeddable`: 값 타입을 정의하는 곳에 표시
 * `@Embedded`: 값 타입을 사용하는 곳에 표시
    * 둘 중 하나는 생략 가능
 * 기본 생성자 필수
 * 임베디드 타입을 포함한 모든 값 타입은 엔티티의 생명주기에 의존한다. 즉 `Composition 관계`와 가깝게 그려진다.

이러한 임베디드 타입은 단순히 엔티티의 값으로 표현되기 대문에 해당 값이 속한 엔티티 테이블에 매핑된다. 이러한 임베디드 타입 덕분에 객체와 테이블을 아주 세밀하게 조작하고 매핑할 수 있게 되었다. 잘 설계한 ORM 애플리케이션은 매핑한 테이블 수 보다 클래스 수가 더 많아질 것이다.

## @MappedSuperclass vs @Embedded

결국 두 애노테이션 모두 엔티티의 비슷한 속성을 분리하여 효과적으로 관리할 수 있는 공통점이 있다. 이 둘이 가장 큰 차이점은 바로 `상속`을 사용하는 것과 `위임`을 사용하는 것에 대한 차이이다.

아래는 객체가 생성되는 시점에 시간을 기록하기 위한 필드를 각각의 방식으로 작성한 것이다.

### @MappedSuperclass를 활용한 방식

먼저 `@MappedSuperclass`를 활용한 방식이다.

> _간단한 예시를 위해 필드 주입을 활용 하였다._

```java
@MappedSuperclass
public abstract class BaseEntity {

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // getter
}
```

```java
@Entity
public class MappedSuperclassCrew extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private Integer age;

    @Enumerated(EnumType.STRING)
    private Track track;

    protected MappedSuperclassCrew() {
    }

    public MappedSuperclassCrew(final String name, final Integer age, final Track track) {
        this.name = name;
        this.age = age;
        this.track = track;
    }

    // getter
}
```

앞서 언급한 것처럼 `@MappedSuperclass`을 활용하면 추상 클래스를 통해 중복된 필드를 상속 받아 편리하게 활용할 수 있다.

### @Embedded를 활용한 방식

다음은 `@Embedded` 활용한 방식이다.

> _간단한 예시를 위해 필드 주입을 활용 하였다._

```java
@Embeddable
public class TraceDateTime {

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createAt = LocalDateTime.now();

    protected TraceDateTime() {
    }

    // getter
}
```

```java
@Entity
public class EmbeddedCrew {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private Integer age;

    @Enumerated(EnumType.STRING)
    private Track track;

    @Embedded
    private TraceDateTime traceDateTime;

    protected EmbeddedCrew() {
    }

    public EmbeddedCrew(final String name, final Integer age, final Track track) {
        this.name = name;
        this.age = age;
        this.track = track;
    }

    // getter
}
```

## 정리

결국 단순히 이야기 하면 두 애노테이션의 가장 큰 차이는 `상속`과 `위임`이다. 우리는 객체지향적인 코드 작성을 위해 [상속과 조합에 대한 차이와 장단점](https://hyeonic.github.io/study/object-oriented-design-pattern/chapter04.html)에 대해 학습한 경험이 있다.

보다 더 유연한 객체를 다루기 위해 부모 클래스와 의존성이 강하게 엮인 [상속 보단 조합](https://github.com/woowacourse-study/2022-effective-java/blob/main/04%EC%9E%A5/%EC%95%84%EC%9D%B4%ED%85%9C_18/%EC%95%84%EC%9D%B4%ED%85%9C18-%EC%83%81%EC%86%8D%EB%B3%B4%EB%8B%A4%EB%8A%94_%EC%BB%B4%ED%8F%AC%EC%A7%80%EC%85%98%EC%9D%84_%EC%82%AC%EC%9A%A9%ED%95%98%EB%9D%BC.md)을 고려하곤 한다. 하지만 위 같은 예시의 경우 단순히 `엔티티의 중복된 필드를 재사용하기 위한 목적`이 크기 때문에 상속을 고려하는 것이 더욱 편리하다. 또한 `@MappedSuperclass`과 `Auditing` 기능을 함께 활용하면 더 편리하게 필드 값을 다룰 수 있을 것이다.

`JPQL`을 활용할 때도 차이가 발생한다.

```java
public interface MappedSuperclassCrewRepository extends JpaRepository<MappedSuperclassCrew, Long> {

    @Query("SELECT c " 
            + "FROM MappedSuperclassCrew c " 
            + "WHERE c.createdAt > :dateTime")
    List<MappedSuperclassCrew> findByCreatedAtGreaterThan(final LocalDateTime dateTime);
}
```

```java
public interface EmbeddedCrewRepository extends JpaRepository<EmbeddedCrew, Long> {

    @Query("SELECT c "
            + "FROM EmbeddedCrew c "
            + "WHERE c.traceDateTime.createAt > :dateTime")
    List<EmbeddedCrewRepository> findByCreatedAtGreaterThan(final LocalDateTime dateTime);
}
```

임베디드 타입을 사용할 경우 `c.traceDateTime.createAt`과 같이 필드명을 명시해주어야 한다.

## References.

김영한, 『자바 ORM 표준 JPA 프로그래밍』, 에이콘(201), p251-254, p321-325. <br>
[임베디드 타입과 @MappedSuperclass 차이](https://www.inflearn.com/questions/18578)

<TagLinks />
