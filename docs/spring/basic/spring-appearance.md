---
title: Spring의 출현
tags: ['우아한테크코스', 'spring']
date: 2022-04-29 15:30:00
feed:
  enable: true
---

# Spring의 출현

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/152970395-a31c8134-fc89-449f-b4dc-441e03df929c.png />

## 개요

어떤 기술을 배우기 이전에 그 기술의 등장배경을 살펴보면 해당 기술이 해결하고자 하는 바를 확인할 수 있다. 레벨 2의 가장 핵심 커리큘럼은 Spring의 다양한 기술을 활용하여 웹 서비스를 작성하는 것이다. 이번 기회를 통해 Spring이 등장하게 된 배경에 대해 알아보려 한다.

## EJB (Enterprise JavaBeans)

Spring 등장 이전에는 `EJB`는 애플리케이션 업무 로직을 담당하는 Java의 표준 기술이었다. 이러한 EJB의 등장은 개발자가 애플리케이션 개발을 위한 비즈니스 로직에 집중하는 환경을 만들었지만 기능 구현을 위해 상속 및 구현 등을 활용하며 `클래스 사이의 의존도`가 커지는 상황을 만들었다. 

결국 EJB에서 사용하는 Java 스타일을 강제하여 객체지향 프로그래밍을 방해할 뿐이었다. 

## Spring의 등장

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/165894243-02dbad0b-3cf4-4a7c-b421-224554bbcf6b.png />

2002년 로드 존슨이 위에서 언급한 EJB의 문제점을 지적하며 확장 가능한 애플리케이션 개발을 위한 30,000 라인 가량의 기반 기술 예제 코드를 담은 책을 출간했다. 이러한 예제 코드는 현재 Spring의 핵심 개념인 `BeanFactory`, `ApplicationContext`, `POJO`, `IoC`, `DI` 등이 포함되어 있다.

## Why Spring 

::: tip 토비의 스프링 3.1 중 일부

Spring은 Java 엔터프라이즈 개발을 편하게 해주는 오픈소스 경량급 `애플리케이션 프레임워크`이다.

:::

여기서 우리는 애플리케이션 프레임워크에 집중해야 한다. Spring은 특정 분야에 국한된 것이 아닌 애플리케이션의 모든 부분을 다루는 핵심 기술을 바탕으로 빠르게 애플리케이션 개발을 진행할 수 있는 범용적인 `애플리케이션 프레임워크`이다.

::: tip why Spring?

Spring makes programming Java quicker, easier, and safer for everybody. Spring’s focus on speed, simplicity, and productivity has made it the world's most popular Java framework.

**Spring은 Java 프로그래밍을 더 빠르고, 더 쉽고, 더 안전하게 만든다. Spring은 `속도`, `단순성` 및 `생산성`에 초점을 맞추어 세계에서 가장 인기 있는 Java Framework를 만들었다.**

“We use a lot of the tools that come with the Spring framework and reap the benefits of having a lot of the out of the box solutions, and not having to worry about writing a ton of additional code—so that really saves us some time and energy.”

**"우리는 Spring Framework와 함께 제공되는 많은 툴을 사용하며, 즉시 사용할 수 있는 솔루션이 많고, 많은 추가 코드를 작성할 필요가 없어 시간과 에너지를 절약할 수 있다."**

[why Spring?](https://spring.io/why-spring) 중 일부

:::

## Spring Framework

::: tip Spring Framework overview

The Spring Framework provides a comprehensive programming and configuration model for modern Java-based enterprise applications - on any kind of deployment platform.

**Spring Framework는 모든 종류의 배포 플랫폼에서 최신 Java 기반 엔터프라이즈 애플리케이션을 위한 포괄적인 프로그래밍 및 구성 모델을 제공한다.**

A key element of Spring is infrastructural support at the application level: Spring focuses on the "plumbing" of enterprise applications so that teams can focus on application-level business logic, without unnecessary ties to specific deployment environments.

**Spring의 핵심 요소는 애플리케이션 레벨에서 기반 시설을 지원하는 것이다. Spring은 엔터프라이즈 애플리케이션의 `배관`에 중점을 두어 팀이 특정 구축 환경과 불필요한 연결 없이 애플리케이션 레벨 비즈니스 로직에 집중할 수 있도록 지원한다.**

[Spring Framework overview](https://spring.io/projects/spring-framework) 중 일부

:::

## 정리

Spring은 결국 Java 프로그래밍을 더 빠르고, 더 쉽고, 더 안전하게 만들기 위한 도구이다. Java는 객체지향 언어이다. Spring의 사용은 자연스럽게 기술적 코드와 비즈니스 로직을 분리하여 `좋은 객체지향 설계와 프로그래밍`을 할 수 있도록 도와준다.

## References.

[EJB(Enterprise Java Bean)](https://woongsin94.tistory.com/357)<br>
[스프링의 등장 배경과 정의, 스프링이란 무엇인가?](https://www.jiniaslog.co.kr/article/view?articleId=356)<br>
[스프링 핵심 원리 - 기본편](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%ED%95%B5%EC%8B%AC-%EC%9B%90%EB%A6%AC-%EA%B8%B0%EB%B3%B8%ED%8E%B8/dashboard)<br>
[Why Spring?](https://spring.io/why-spring)<br>
[Spring Framework overview](https://spring.io/projects/spring-framework)<br>

<TagLinks />
