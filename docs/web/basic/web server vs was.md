---
title: Web Server vs WAS
tags: ['java', 'web server', 'WAS']
---

# Web Server vs WAS

## Web

현대의 웹은 모든 것이 `HTTP` 메시지를 기반으로 동작한다. 단순히 `HTML`과 같은 마크업 언어를 전달하는 용도가 아닌, `image`나 `JSON`과 같이 다양한 형태의 `데이터`를 전송할 수 있다.

## Web Server

웹 서버는 HTTP를 기반으로 동작하는 서버이다. 웹 브라우저와 같은 클라이언트로 부터 HTTP 요청을 받고, HTTP로 응답한다. 주로 html, css, js와 같은 정적인 리소스를 제공한다. 대표적인 웹 서버로는 아파치, nginx, GWS 등이 있다.

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/137123119-b99794e0-e228-4468-b58c-44fb46a99184.png>
</p>

## WAS

WAS는 HTTP 기반으로 동작하는 미들웨어로, 웹 서버의 기능과 프로그램 코드를 실행하는 애플리케이션 로직을 함께 수행한다. 즉 동적인 컨텐츠 제공을 위해 동작한다.

대표적으로 Java에서 servlet이나 jsp와 같이 프로그램 코드가 담긴 파일들을 실행할 수 있다. WAS는 이러한 코드들을 실행할 수 있는 구동 환경을 제공한다.

WAS의 종류에는 톰캣, Jetty, Undertow 등이 있다.

## Web Server는 왜 사용해야 할까?

`WAS`에는 `Web Server`가 수행할 수 있는 모든 기능들을 가지고 있다. 그럼에도 불구하고 많은 웹 시스템은 `Web server`와 `WAS`를 혼합하여 제공한다. 

그럼에도 Web Server를 사용해야 하는 이유를 알아보았다.

### 1. WAS의 기능 분담

`WAS`는 개발자가 작성한 애플리케이션 로직을 처리하기 때문에 다양한 오류나 에러에 직면할 수 있다. 또한 너무나 `많은 역할`을 담당하기 때문에 다수의 트래픽이 들어오면 서버의 과부하가 우려된다. 만약 `WAS`가 과부하에 의하여 내려간다면, 클라이언트는 해당 웹 시스템에 접근조차 할 수 없게 된다. 즉 오류 화면 조차 노출할 수 없다.

`정적 리소스`는 비교적 적은 비용으로 처리할 수 있다. 좀 더 큰 비용을 요구하는 것은 동적은 리소스를 처리하는 애플리케이션 로직이다. 그렇기 때문에 `정적인 리소스`는 `web server`가 처리하고 나머지 `동적인 처리`는 `WAS`에게 요청을 위임한다.

`WAS`는 동적 리소스만 처리하면 되기 때문에 서버에 전해지는 부하가 적어진다. 또한 정적인 리소스 요청이 많아지면 `web server`를 증설하면 되고, 동적인 요청이 많아지면 `WAS`를 늘려서 대비할 수 있다.

앞서 우려하였던 `오류 페이지` 또한 `정적 리소스`에 포함되기 때문에 비교적 잘 죽지 않는 `web server`가 이러한 `오류 페이지`를 `처리`할 수 있다.

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/137125783-888ee494-fcbc-4806-824f-3a869017b391.png>
</p>

### 2. reverse proxy

WAS의 앞 단에서 WAS의 정보를 보호하고 클라이언트에게 서버의 정보를 감춘다. 서버에는 웹 서비스의 `핵심적인 내용`이 담겨있는 곳이기 때문에 내부 구조를 감춰야 할 필요성이 있다. 아파치나 Nginx같은 웹 서버들은 서버 내부에 파일들이 어느 폴더 에 있는지 서비스가 몇 번 포트로 돌고 있는지 등 `정보를 감출 수 있다`.

### 3. cache

웹 서버는 프록시 서버에서 사용자의 요청을 캐시하여 동일한 요청이 오면 WAS로 전달하지 않고 웹 서버에 캐시된 내용을 바로 전달하도록 할 수 있다. 

### 4. load balancing

`로드밸런싱`은 네트워크 또는 서버에 가해지는 `부하`를 `분산` 시키는 기술이다. `웹 서버`는 `로드 밸런싱`의 역할을 하기도 한다.

`로드 밸런싱`이 필요한 이유는 서비스의 `지속성`을 위해서이다. 만약 WAS가 하나인데 새 기능을 추가하여 새롭게 배포한다고 가정한다. 잘 돌아가던 서비스를 `종료`하고 새롭게 추가된 기능을 적용하여 `다시 실행`해줘야 한다. 찰나의 시간이지만 클라이언트가 해당 서비스에 접근하면 오류 페이지를 맞딱뜨리게 될 것이다.

`WAS`를 여러 개 두고 서비스를 운영하게 되면 순서대로 업데이트를 진행해서 하나가 다시 실행되는 동안 웹 서버가 다른 WAS로 요청을 `분산`시켜서 클라이언트 입장에서는 서비스를 `끊김없이 이용`할 수 있도록 도와준다.

## 정리

웹 서버와 WAS는 역할이 겹치는 부분도 있지만 각자 `특화된 부분`이 많다. 그렇기 때문에 각자의 역할에 맞춰 기능들을 잘 사용하면 좀 더 양질의 웹 서비스를 구축할 수 있다.

## References

[아파치, NginX, 톰캣이 뭔가요?](https://www.yalco.kr/44_ws_was/)<br>
[Web Server와 WAS의 차이](https://gyoogle.dev/blog/web-knowledge/Web%20Server%EC%99%80%20WAS%EC%9D%98%20%EC%B0%A8%EC%9D%B4.html)

<TagLinks />