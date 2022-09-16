---
title: Spring vs Spring Boot
tags: ['java', 'spring', 'spring boot']
---

# Spring vs Spring Boot

## Why Spring?

> Spring makes programming Java quicker, easier, and safer for everybody. Spring’s focus on speed, simplicity, and productivity has made it the world's most popular Java framework.

Spring은 모든 사람에게 java 프로그래밍을 더 빠르고 쉽고 안전하게 만들어준다. Spring은 속도, 단순성 및 생산성에 초점을 맞추기 때문에 세계에서 가장 인기 있는 Java 프레임워크가 되었다.

Spring은 말 그대로 Java 언어 기반의 프레임워크이다. Java는 객체 지향 언어이다. Spring은 이러한 객체 지향 언어의 `강력한 특징`을 살려내기 위한 프레임워크이다. 즉 Spring은 `좋은 객체 지향 애플리케이션 개발`을 도와주는 프레임워크이다.

Spring은 객체 지향의 특징인 `다형성`을 극대화 할 수 있도록 도와준다. `제어의 역전(IoC, Inversion of Control)`, `의존관계 주입 (Dependency Injection)`은 다형성을 활용하여 역할과 구현을 편리하게 다룰 수 있도록 지원한다.

## 이렇게 장점이 많은데 왜?

`Spring`은 `Java 개발`을 진행할 때 많은 문제를 해결해준다. 하지만 Spring 프로젝트를 초기에 설정하기 위한 `비용`은 너무 많이 든다. 원하는 기능을 추가하기 위해서 `dependency`를 추가할 때 버전정보까지 정확하게 확인하고 추가해야 한다.

또한 database 등 추가적인 설정을 요구하는 경우 각기 다른 방식으로 설정 관련 xml을 추가하여 명시해야 했다. 결국 간단한 웹 프로젝트를 만들려고 해도 개발자들은 프로젝트 세팅에 `많은 시간을 투자`해야 했다. 

## Spring Boot의 등장

> Spring Boot makes it easy to create stand-alone, production-grade Spring based Applications that you can "just run".

Spring Boot는 `"just run"`할 수 있는 단독적으로 실제 운영 수준의 Spring 기반 애플리케이션을 쉽게 만들 수 있도록 도와준다.

### Spring Boot 특징

1. Spring Boot는 `내장 tomcat`을 가지고 있다. 따로 외부 WAS를 설치하여 사용하거나 버전을 관리하는 수고를 덜 수 있다. 또한 tomcat이 아닌 jetty로 변경 또한 빠르고 쉽게 진행 가능하다. 덕분에 `jar` 파일로 간단하고 빠르게 배포가 가능하다.

2. `starter`로 인하여 `dependency` 관리가 `자동`으로 이뤄진다. 앞서 언급한 것 처럼 Spring Boot 이전에는 dependency의 호환 버전을 일일이 확인해서 맞춰야 했고, 모두 직접 관리하기 때문에 버전 변경 시 다른 dependency까지 영향을 끼칠 우려가 있었다. 하지만 starter가 자동으로 호환되는 버전을 관리하기 때문에 우리는 단순히 사용하고 싶은 dependency를 추가하기만 하면 된다. 

3. 이전에 일일이 작성해줘야 했던 `configuration` 관련 설정들을 `application.properties` 혹은 `application.yml`을 활용하여 직관적이고 편리하게 설정이 가능하다.

## 이제는 개발에 집중!

Spring Boot를 사용하면 개발자들은 초반 프로젝트 구성에 힘쓰는 것 보다 좀 더 개발에만 몰두하고 고민하여 좀 더 양질의 작업을 진행할 수 있다.

## References.

[Why Spring?](https://spring.io/why-spring)<br>
[Spring Boot](https://spring.io/projects/spring-boot)<br>
[[10분 테코톡] 🦊닉의 Spring vs Spring Boot](https://www.youtube.com/watch?v=6h9qmKWK6Io&list=PLgXGHBqgT2TvpJ_p9L_yZKPifgdBOzdVH&index=146)

<TagLinks />