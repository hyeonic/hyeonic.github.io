---
title: Spring 3대 요소
tags: ['java', 'spring', 'spring boot']
---

# Spring 3대 요소
 * DI/IoC (Dependency Injection & Inversion of Control)
 * AOP (Aspect Oriented Programming)
 * PSA (Portable Service Abstracions)

## DI/IoC (Dependency Injection & Inversion of Control)

Spring은 `ApplicationContext`를 가지고 있고 Spring에서 관리하는 객체인 Bean들이 관리된다. 여기서 `ApplicationContext`가 컨테이너이고 Bean의 생명 주기는 이 컨테이너에 의해 관리된다.

Spring에서는 컨테이너를 통해 서로 강하게 결합되어 있는 두 클래스를 분리하고, 두 객체 간의 관계를 결정해 줌으로써 `결합도`를 낮추고 `유연성`을 확보하고자 하였다.

DI로 애플리케이션 런타임 시점에 객체를 생성하고 `관계`를 결정해 줌으로써 다른 구체 클래스에 의존하는 코드를 제거하며 서로 다른 두 객체의 결합을 약하게 만들어 줄 수 있다.

::: tip
Spring에서는 Bean들을 기본적으로 싱글톤(Singleton)으로 관리한다.
:::

### DI 방법

1. 필드 주입: @Autowired / @Resource 등의 애노테이션을 필드에 설정해준다면 Spring에서 검색 규칙에 따라 알맞은 클래스를 기반으로 만든 Bean을 주입시켜 준다.
2. 세터 주입: 애노테이션을 Setter 형태로 만든 메소드에 붙여주면 해당 필드에 Bean을 주입시켜준다.
3. 생성자 주입: 클래스 생성자에 주입시킬 Bean들을 파라미터로 넣어주고 설정하는 방법이다.

::: tip
Spring에서 추천하는 방식은 생성자 주입 방식이다. final 키워드로 인하여 immutable을 보장하고 생성자 파라미터가 모두 주입되어야 하기 때문에 보다 더 안전하다.
:::

## AOP (Aspect Oriented Programming)

관점 지향 프로그래밍이다. 객체간 공통된 로직을 따로 뽑아내어서 관리하는 것을 말한다.

## PSA (Portable Service Abstracions)

일관성 있는 서비스 추상화이다. Spring에서 DB 연동시 어댑터 패턴을 사용하는데 이를 통해 로직의 변경 없이 DB종류를 변경할 수 있다. 이처럼 같은 일을 하는 다수의 기술을 공통의 인터페이스로 `제어`할 수 있게 도와주는 것을 서비스 추상화라고 한다.

## References

[[Spring] 의존성 주입(Dependency Injection, DI)이란? 및 Spring이 의존성 주입을 지원하는 이유](https://mangkyu.tistory.com/150)<br>
[스프링의 기본 철학, 스프링 삼각형](https://blog.gthd.app/m/8)

<TagLinks />