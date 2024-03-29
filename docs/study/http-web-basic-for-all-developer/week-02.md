---
title: 2주차 HTTP 기본 & HTTP 메서드
tags: ['우아한테크코스', '모든 개발자를 위한 HTTP 웹 기본 지식']
date: 2022-05-07 12:00:00
feed:
  enable: true
---

# 2주차 HTTP 기본 & HTTP 메서드

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/152970395-a31c8134-fc89-449f-b4dc-441e03df929c.png />

## 목표

스터디를 통해 [모든 개발자를 위한 HTTP 웹 기본 지식](https://www.inflearn.com/course/http-%EC%9B%B9-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC)을 듣고 요약하며 나누고 싶은 내용을 정리한다.

## HTTP (HyperText Transfer Protocol)

HTTP 메시지를 통해 다양한 데이터(ex. HTML, JSON 등)들을 전송할 수 있다. Socket 라이브러리를 통해 TCP를 직접 연결하는 특수한 경우(ex. 게임 서버)를 제외하면 대부분의 모든 것들이 HTTP를 통해 데이터를 전송한다.

### HTTP의 역사

 * 1991년 `HTTP/0.9`: 단순한 GET 메서드만 지원했다. 또한 HTTP 헤더를 포함하지 않았다.
 * 1996년 `HTTP/1.0`: 다양한 메서드와 헤더가 추가되었다.
 * 1997년 `HTTP/1.1`: 현재 사용하고 있는 HTTP의 근간이 된다. 가장 많이 사용하기 때문에 가장 중요한 버전이다. 
 * 2015년 `HTTP/2`: 성능이 개선되었다.
 * `HTTP3`: TCP 대신 UDP를 사용하며 성능이 개선되었다.

현재에도 HTTP는 지속적으로 발전하고 있다.

### HTTP 특징

 * 기본적으로 `클라이언트 서버 구조`를 가진다. 클라이언트는 서버에 `Request`를 보내고 `Response` 받기 위해 대기한다. 서버는 `Request`에 대한 결과를 만들어 `Response`를 보낸다. 보통 서버에서 클라이언트로 Request하지 않는다.
 * 상태를 가지지 않는 무상태 프로토콜(stateless)이다. 즉 비연결성을 띄고 있다.
 * HTTP 메시지를 가지고 있으며 단순한 구조 덕분에 유연한 확장이 가능하다.

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/167232335-7d43beae-9454-4de5-93d1-20d346da97bd.png />

 * `클라이언트`: UI와 사용성에 집중한다. (ex. 앱, SPA)
 * `서버`: 비즈니스 로직과 데이터에 집중한다.

서로 다른 곳에 집중하며 독립적인 성장이 가능하다.

### 무상태 프로토콜

 * 서버가 클라이언트의 상태를 보관하지 않는다. 
 * 서버의 확장성이 높지만 클라이언트가 추가적인 데이터를 전송해야 한다.

### Stateful vs Stateless

 * `Stateful`: 중간에 서버가 변경되면 안된다. 즉 항상 같은 서버가 유지되어야 한다. 만약 변경된다면 상태 정보를 공유해야 한다. 그렇기 때문에 해당 서버에 장애가 나면 해당 요청은 정상적으로 처리될 수 없다.
 * `Stateless`: 상태를 가지지 않기 때문에 아무 서버나 처리할 수 있다. 만약 다수의 트래픽이 몰린다면 서버를 증설하여 대응할 수 있다. 그렇기 때문에 해당 서버가 장애가 나면 다른 서버가 대신 처리할 수 있다.

### Stateless의 한계

 * 상태 유지를 필요로 하는 로그인과 같은 기능은 Stateless로 만들기 어렵다. 로그인한 사용자의 경우 로그인을 진행했다는 상태를 서버에서 유지해야 한다. 그렇기 때문에 브라우저 쿠키와 서버 세션을 통해 추가적인 상태를 유지한다.
 * 상태 유지는 서버의 자원을 사용한다. 즉 `최소한`만 사용하는 것이 좋다.

## 비연결성

> 여기서 비 연결성은 TCP의 연결 지향과는 결이 다르다.

 * HTTP는 기본적으로 연결을 유지하지 않는 모델이다. 일반적으로 초 단위의 빠른 속도로 응답한 뒤 연결을 제거한다.
 * 이러한 특성 덕분에 수천명이 서비스를 이용해도 실제 서버에서 동시에 처리하는 요청은 수십개에 불과하다.
 * 서버는 클라이언트의 응답을 보내기 위한 `IP, PORT 정보`를 가지고 있다. 만약 연결성인 경우 해당 정보를 서버 자원으로 유지해야 한다. 하지만 비 연결성인 경우 이것을 유지할 필요가 없기 때문에 `서버 자원`을 매우 효율적으로 사용할 수 있다.

하지만 비 연결성은 매번 새롭게 요청을 보낼 때 마다 `TCP/IP` 연결을 새롭게 생성해야 한다. 즉 요청 시 마다 새롭게 3 way handshake를 위한 시간이 소요된다. 웹 브라우저는 단순히 HTML만 활용하여 웹 페이지를 그리는 것이 아니다. 해당 페이지를 꾸미기 위한 css와 javascript 이미지 등 수 많은 자원이 함께 다운로드 된다. 매번 각기 다른 데이터를 받기 위해 연결을 진행하는 것은 매우 비효율적이다.

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/167232899-f451d480-95b9-4395-a37d-4d5741ed6b67.png />

이것을 HTTP 지속 연결(Persistent Connections)로 해결 했다. 

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/167233011-96d052d1-b90c-451f-a0dd-a416dfbb9c22.png />

지속 연결 시간은 기본적으로 60초이며 웹 서버에서 해당 시간을 수정할 수 있다. 보통 연결 제거는 서버에서 진행된다. 대부분의 웹서버가 해당 기능을 구현해두었다. 또한 HTTP/2, HTTP/3에서는 더 많은 최적화를 진행한다.

## HTTP 메시지

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/167235600-54601462-312f-4433-95bf-a29b7e81f333.png />

### HTTP 요청 메시지

```
GET /search?q=hello&hl=ko HTTP/1.1
Host: www.google.com

```

 * `start-line`: **request-line** / status-line
 * `request-line`: HTTP method SP request-target(path) SP HTTP-version CRLF
    * `HTTP method`: GET, POST, PUT, DELETE 등 서버가 수행해야 할 동작을 지정한다.
    * `request-target`: 절대경로를 활용하여 요청 대상을 지정한다.
    * `HTTP-version`: HTTP/1.1 등과 같이 버전을 명시한다.

### HTTP 응답 메시지 

```
HTTP/1.1 200 OK
Content-Type: text/html;charset=UTF-8
Content-Length: 3423

<html>
    <body>...</body>
</html>
```

 * `start-line`: request-line / **status-line**
 * `status-line`: HTTP-version SP status-code SP reason-phrase CRLF
    * `HTTP-version`: HTTP/1.1 등과 같이 버전을 명시한다.
    * `status-code`: 요청 성공과 실패를 나타낸다. 2xx은 보통 성공의 의미하며 4xx은 클라이언트의 요청 오류, 5xx은 서버 내부 오류를 나타낸다.
    * `reason-phrase`: 사람이 이해할 수 있는 짧은 코드 설명 글을 담고 있다.

### HTTP 헤더

```
field-name: field-value (field-name은 대소문자를 구분하지 않는다.)
```

 * HTTP 전송에 필요한 부가정보를 담고 있다. 
 * 표준 헤더가 있지만 필요시 임의의 헤더를 추가할 수 있다. 다만 클라이언트나 서버가 임의의 헤더를 해석하고 사용할 수 있을 때만 가능하다.

### HTTP 메시지 바디

 * 실제 전송할 데이터를 나타낸다. HTML, JSON, 이미지 등 `byte로 표현할 수 있는 모든 데이터`를 전송할 수 있다.

## HTTP 메서드

### API URI 설계

가장 중요한 것은 `리소스 식별`이다. 

 * `회원` 목록 조회 /users
 * `회원` 조회 /users/{id}
 * `회원` 등록 /users
 * `회원` 수정 /users/{id}
 * `회원` 삭제 /users/{id}

여기서 `회원`이 리소스에 해당한다. 보통 계층 구조상 상위를 컬렉션으로 인식하고 복수 단어 사용을 권장한다. 즉 user 보단 users를 사용하자.

그렇다면 각 행위(조회, 등록, 수정, 삭제 등)는 어떻게 구분해야 할까? 바로 `HTTP 메서드`를 활용하는 것이다.

## HTTP 메서드

### HTTP 메서드 종류

 * `GET`: 리소스를 조회한다.
 * `POST`: 요청 데이터를 처리한다. 주로 등록에 사용한다.
 * `PUT`: 리소스를 `대체`한다. 해당 리소스가 없다면 생성한다.
 * `PATCH`: 리소스를 부분 변경한다. 만약 리소스가 존재하지 않다면 오류가 발생한다.
 * `DELETE`: 리소스를 삭제한다.

위 메서드는 `관례적인 사용법`일 뿐이다. 온전히 지키는 것은 어려운 일이다. 해당 서버를 개발하는 개발자에게 달렸다.

그 밖에도 아래와 같은 메서드들이 존재한다.

 * `HEAD`: GET과 동일하지만 메시지 부분을 제외하고, 상태 줄과 헤더만 반환한다.
 * `OPTIONS`: 대상 리소스에 대한 통신 가능 옵션(메서드)을 설명한다. 주로 (CORS)에서 사용한다.
 * `CONNECT`: 대상 자원으로 식별되는 서버에 대한 터널을 설정한다.
 * `TRACE` 대상 리소스에 대한 경로를 따라 메시지 루프백 테스트를 수행한다.

### GET 

 * 리소스 조회에 사용한다. 서버에 전달하고자 하는 데이터가 있다면 `query parameter`를 통해 전달한다. 
 * 메시지 바디를 사용할 수 있지만 지원하지 않는 곳이 많아서 권장하지 않는다.

### POST

 * 요청 데이터를 처리한다. 메시지 바디를 통해 서버로 요청 데이터를 전달한다.
 * 서버는 메시지 바디로 들어온 데이터를 처리하는 모든 기능을 수행한다. 주로 전달된 데이터는 리소스를 등록하거나 프로세스 처리에 사용된다.
 * 해당 리소스만 변경하는 것이 아니라 `내부 프로세스를 실행`해야 할 때는 PATCH 보다 POST가 적절하다.

### PUT

 * 리소스를 대체한다. POST와 동일하게 리소스가 없으면 생성한다. 단순히 이야기하면 완전히 대체하는 것이다.
 * 클라이언트가 `리소스를 식별`할 수 있어야 한다. 해당 위치를 알고 URI를 지정한다.

### PATCH 

 * 리소스를 부분 변경한다. 또한 리소스가 존재하지 않을 경우 오류가 발생한다.
 * PATCH가 지원이 되지 않는 경우 POST를 활용한다.

### DELETE 

 * 리소스를 제거한다.

## HTTP 메서드의 속성

### 안전 (Safe)

 * 호출해도 리소스를 변경하지 않는다. 즉 변경이 일어나지 않는다.
 * GET, HEAD, OPTIONS, TRACE가 존재한다.
 * 안전은 해당 리소스만 고려한다. 로그와 같이 부가적인 것은 고려하지 않는다.

### 멱등 (Idempotent)

 * f(f(x)) = f(x)
 * 한 번 호출하든 두 번 하든 매번 결과가 같다.
 * GET, PUT, DELETE가 이에 해당한다.

> ### 멱등의 활용
> 자동 복구 메커니즘에 활용된다. 서버가 정상 응답을 주지 못했을 때 클라이언트가 같은 요청을 다시 보내도 괜찮은지에 대한 판단 근거가 될 수 있다.

멱등은 외부 요인으로 중간에 리소스가 변경하는 것 까지 고려하지 않는다.

### 캐시가능 Cacheable

 * 응답 결과 리소스를 캐시해서 사용해도 되는지 유무이다.
 * GET, HEAD, POST, PATCH는 캐시가 가능하다. 하지만 GET, HEAD 정도만 사용한다.
 * POST, PATCH의 경우 본문 내용까지 캐시 키로 고려해야 하기 때문에 구현하기 쉽지 않다.

## 공유하고 싶은 내용

### JWT를 기반으로 활용한 인증 방식은 Stateless인가?

 * 단순한 JWT를 활용할 경우 서버에서 클라이언트의 정보를 보관하지 않는다. 그렇다면 이것을 Stateless로 봐도 괜찮을까?

### 멱등

 * 멱등을 보장할 수록 유연함을 보장하는가?

### HTTP API vs REST API

* [https://bentist.tistory.com/37](https://bentist.tistory.com/37)
* [https://www.inflearn.com/questions/126743](https://www.inflearn.com/questions/126743)
* [https://www.inflearn.com/questions/152610](https://www.inflearn.com/questions/152610)

## References

[모든 개발자를 위한 HTTP 웹 기본 지식](https://www.inflearn.com/course/http-%EC%9B%B9-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC)<br>

<TagLinks />
