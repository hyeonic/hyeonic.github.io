---
title: MVC 패턴이란?
tags: ['desgin pattern', 'MVC', '우아한테크코스']
---

# MVC 패턴이란?

## MVC

MVC는 `Model-View-Controller`의 약자로 하나의 애플리케이션을 구성할 때 구성요소를 세가지의 역할로 구분한 개발 방법론 이다.

사용자가 입력을 담당하는 View를 통해 요청을 보내면 해당 요청을 Controller가 받고, Model을 통해 데이터를 가져온다. 해당 데이터를 바탕으로 출력을 담당하는 View를 제어해서 사용자에게 전달한다. 이러한 MVC 패턴은 Model과 View가 다른 컴토넌트들에 종속되지 않기 때문에 변화에 대응하기 용이하다.

## Model(Domain)
 * Controller가 호출할 때 요청에 맞는 역할을 수행한다. `비즈니스 로직을 구현하는 영역`으로 응용 프로그램에서 데이터를 처리하는 부분이 된다. 
 * DB에 연결하고 데이터를 조회, 저장 삭제 등의 작업을 수행하거나 데이터에 대한 변경 작업을 묶은 트랜잭션을 다루기도 한다.
 * Model은 다른 컴포넌트(View, Controller)들에 대해 알지 못한다. 오로지 자기 자신의 `수행해야 하는 행위`에 대해서만 알고 있다.

## View
 * `Controller`로 부터 받은 `Model`의 결과값을 가지고 `사용자에게 출력`할 화면을 만든다. `무엇을 보여주기 위한 역할`이다.
 * 만들어진 화면은 웹브라우저에 전송되어 웹브라우저에서 출력한다. 
 * View 또한 다른 컴포넌트(Model, Controller)들에 대해 알지 못한다. 자신의 수행해야 하는지만 알고 있다.

## Controller
 * 클라이언트의 요청을 받았을 때, 그 요청에 대한 `실제 업무를 수행하는 Model 컴포넌트`를 호출한다. Model이 데이터를 `어떻게 처리할지 알려주는 역할`이다.
 * 클라이언트가 보낸 데이터가 있다면 Model에 전달하기 쉽게 데이터를 가공한다. 모델이 해당 업무를 마치면 `결과`를 `View에 전달`한다.
 * 다른 컴포넌트(Model, View)들에 대해 알고 있다. Model과 View가 무엇을 수행하는지 알고 있다.

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/153734491-35a83d12-3477-4a18-8314-df574d5ec32c.png />

필자가 생각했을 때 MVC 패턴의 각 컴포넌트들의 의존관계를 그림으로 표현한 것이다.

### 더 생각해보기

현재 미션을 해결할 때 View는 Console로 진행된다. 하지만 추후 요구사항이 변경되어 Web의 화면을 표시하기 위한 View를 사용하기로 결정하면 어떻게 해야 하는지 생각해보았다.

의존 관계의 변경을 쉽게 하기 위해서는 협력을 이루는 객체간의 의존도가 낮아야 한다고 생각한다. 즉 View에서는 비즈니스 로직에 속하는 도메인 정보에 대해 알지 못해야 한다. 정해진 규격에 맞춘 데이터 타입을 기반으로 통신해야 한다.

즉 view에서 특정 도메인에게 메시지를 보내거나 반환하지 않아야 한다.

## Reference

[디자인 패턴 - 당신은 MVC를 안다고 할 수 있는가](https://samslow.github.io/development/2020/06/16/Design_pattern-MVC/)<br>
[1. MVC 아키텍처에 대한 이해](https://asfirstalways.tistory.com/180)<br>
[웹 MVC 각 컴포넌트 역할](https://tecoble.techcourse.co.kr/post/2021-04-26-mvc/)

<TagLinks />