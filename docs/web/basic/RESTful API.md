---
title: REST API, RESTful API
tags: ['REST API', 'RESTful API']
---

# REST API, RESTful API

## REST API의 탄생

`REST`란 `Reresentational State Transfer`의 약자로 2000년 로이 필딩(Roy  Fielding)의 박사학위 논문에서 최초로 소개되었다. 로이 필딩은 `HTTP`의 주요 저자 중 한 사람으로 그 당시 웹(HTTP) 설계의 우수성에 비해 제대로 사용되어지지 못하는 모습에 안타까워하며 웹의 장점을 최대한 활용할 수 있는 `아키텍처`로써 REST를 발표했다.

::: tip 아키텍처
제약 조건들의 집합
:::

## REST 구성
 * 자원(Resource) - URI
 * 행위(Verb) - HTTP Method
 * 표현(Respreentation)

정리하면 REST는 `HTTP 통신`에서 어떤 자원에 대한 CRUD 요청을 `Resource`와 `Method`로 표현하여 특정한 형태로 전달하는 방식이라고 할 수 있다.

## REST의 특징 (제약 조건)
 1. Uniform (유니폼 인터페이스)
  * Uniform Interface는 URI로 지정한 리소스에 대한 조작을 통일되고 한정적인 인터페이스로 수행하는 아키텍처 스타일을 말한다.

 2. Stateless (무상태성)
  * REST는 작업을 위한 `상태 정보`를 따로 저장하고 관리하지 않는다. 세션 정보나 쿠키 정보를 별도로 저장하고 관리하지 않기 때문에 API 서버는 들어오는 요청을 `단순히 처리`하기만 하면된다. 이점으로는 서비스의 자유도 높아지고 불필요한 정보를 관리하기 않기 때문에 구현이 단순해진다.

 3. Cacheable (캐시 가능)
 * REST의 가장 큰 특징 중 하나는 `HTTP라는 기존 웹 표준을 그대로 사용`하기 때문에 기존 인프라를 그대로 활용 가능하다. 그렇기 때문에 HTTP가 가진 `캐싱 기능`이 적용 가능하다. HTTP 표준에서 사용하는 `Last-Modified` 태그나 `E-Tag`를 이용하면 캐싱 구현이 가능하다.

4. Self-descriptiveness (자체 표현 구조)
 *  REST의 또 다른 큰 특징 중 하나는 REST API 메시지만 보고 쉽게 이해할 수 있는 `자체 표현 구조`로 되어 있다.

5. Client-Server 구조
 * REST 서버는 `API를 제공`한다. 클라이언트는 `사용자 인증이나 컨텍스트(세션, 로그인 정보)등을 직접 관리`하는 구조로 각각의 역할이 확실히 구분되어 클라이언트와 서버에서 개발해야 할 내용이 명확해진다. 또한 서로 간의 `의존성을 줄일 수 있다`.

6. 계층형 구조
 *  REST 서버는 `다중 계층`으로 구성될 수 있으며 보안, 로드 밸런싱, 암호화 계층을 추가해 구조상의 `유연성`을 둘 수 있다. RPOXY나 게이트웨이 같은 네트워크 기반의 중간 매체를 사용할 수 있게 한다.

## REST API 설계

 1. URI는 정보의 자원을 표현한다.
 2. 자원에 대한 행위는 HTTP Method(GET, POST, PUT, DELETE)로 표현한다.

|Method|역할|
|---|---|
|POST|POST를 통해 해당 URI를 요청하면 리소스를 생성한다.|
|GET|GET을 통해 해당 리소스를 조회한다. 리소스를 조회하고 해당 document에 대한 정보를 가져온다.|
|PUT|PUT을 통해 해당 리소스를 수정한다.|
|DELETE|DELETE를 통해 리소스를 삭제한다.|

## RESTful 

위에서 명시한 제약 조건들 (아키텍처 스타일, 원칙)을 모두 만족하는 것을 의미한다. 정리하면 RESTful은 REST라는 아키텍처 스타일 및 원칙을 모두 만족하는 API라는 것이다.

## 장점과 단점

### 장점
 1. Open API 제공이 쉽다.
 2. 멀티 플랫폼 지원 및 연동이 쉽다.
 3. 기존 웹 인프라를 그대로 사용할 수 있다.

### 단점
 1. 사용가능한 메서드가 한정적이다.
 2. 표준이 없기 때문에 추가적인 문서가 요구된다.

## References

[REST API 제대로 알고 사용하기](https://meetup.toast.com/posts/92)<br>
[RESTful에 대해서 설명해주세요.(REST, RESTful, RESTful API 개념 정리)](https://jeong-pro.tistory.com/180)<br>
[Microsoft REST API Guidelines](https://github.com/Microsoft/api-guidelines/blob/vNext/Guidelines.md)<br>
[[Server] Restful API란?](https://mangkyu.tistory.com/46)

<TagLinks />