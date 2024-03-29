---
title: 1주차 인터넷 네트워크 & URI와 웹 브라우저 요청 흐름
tags: ['우아한테크코스', '모든 개발자를 위한 HTTP 웹 기본 지식']
date: 2022-05-01 10:00:00
feed:
  enable: true
---

# 1주차 인터넷 네트워크 & URI와 웹 브라우저 요청 흐름

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/152970395-a31c8134-fc89-449f-b4dc-441e03df929c.png />

## 목표

스터디를 통해 [모든 개발자를 위한 HTTP 웹 기본 지식](https://www.inflearn.com/course/http-%EC%9B%B9-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC)을 듣고 요약하며 나누고 싶은 내용을 정리한다.

## TCP/IP 4계층

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/166114419-a2db2c0c-1de1-44f1-ba09-643fe952d712.png />

### Application Layer

 * 서버 혹은 클라이언트의 애플리케이션이 해당 계층에서 동작한다. 웹 브라우저가 이에 해당한다.

### Transport Layer

 * 통신 노드 간의 연결을 제어하고 신뢰성 있는 데이터 전송을 담당한다.

### Internet Layer

 * 통신 노드 간의 IP 패킷을 전송하며 라우팅을 담당한다.

### Network Interface Layer

 * 물리적인 주소로 MAC을 사용한다.

## IP (인터넷 프로토콜)

 * 지정한 IP 주소로 데이터를 전달한다.
 * 통신 단위는 `패킷(Packet)`을 활용한다.

하지만 인터넷 망은 그리 단순하지 않다. 목적지 IP 까지 도달하기 위해 매우 많은 노드를 거쳐 간다.

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/166114052-f14e5cdd-cfcf-4233-80af-2a8e552d2cc1.png />

또한 `IP`는 아래와 같은 명확한 `한계`를 가지고 있다. 

* `비연결성`이기 때문에 패킷을 받을 대상이 없거나 서비스 불능 상태여도 패킷은 전송된다.
* `비신뢰성`이기 때문에 중간에 패킷이 사라질 수 있고, 데이터가 여러 패킷으로 나눠 전달될 경우 순서 또한 보장하지 않는다.
* 같은 IP를 사용하는 서버에서 통신하기 위한 애플리케이션이 둘 이상인 경우 구분할 수 있는 수단이 없다. IP는 마치 아파트 이름과 같다. 상세한 주소(통신하기 위한 애플리케이션)을 모른다면 결국 패킷을 전달할 수 없다.

> ### 애플리케이션이 둘 이상?
> 만약 내가 게임도 하고 스트리밍을 통해 음악을 듣고 있다면 둘 이상의 애플리케이션을 사용하고 있는 것과 같다.

## TCP 

`전송 제어 프로토콜(Transmission Control Protocol)`의 준말로 아래와 같은 특징들로 IP의 단점들을 보완해준다.

* `TCP 3 way handshake`를 활용한 `가상 연결`을 활용하기 때문에 `연결 지향적`이다.
* 데이터가 전달되는 것을 보장한다. - `신뢰성 보장`
* 정확한 순서로 데이터를 받을 수 있도록 보장한다. - `신뢰성 보장`

정리하면 TCP는 신뢰할 수 있는 프로토콜이다. 현재는 대부분 TCP를 활용하고 있다.

### TCP 3 way handshake

아래는 TCP 3 way handshake의 연결 과정을 그림으로 표현한 것이다.

<CenterImage image-src= https://user-images.githubusercontent.com/59357153/166114994-a8ccfc3c-b273-447b-9d8c-e2efd88986e9.png />

 * SYN은 접속 요청을 의미한다.
 * ACK는 요청 수락을 의미한다.
 * 보통 `3.ACK`에 데이터를 함께 전송한다.

위 연결은 물리적인 연결이 아닌 논리적 연결, 즉 `가상 연결`이다. 이러한 연결 덕분에 `데이터의 전달을 보증`하고 `순서를 보장`한다.

## UDP

`사용자 데이터그램 프로토콜(User Datagram Protocol)`의 준말로 TCP에 비해 간단한 구조를 가진 프로토콜이다.

 * 기능을 거의 가지고 있지 않다. 그렇기 때문에 데이터의 전달과 순서를 전혀 보장하지 않는다.
 * 단순하기 때문에 빠른 전송 속도를 가진다. TCP는 연결성이기 때문에 상대적으로 느리다.
 * IP와 거의 유사하지만 추가적으로 port와 체크섬을 진행한다.
 * 앞서 언급한 것처럼 기능을 거의 가지고 있지 않기 때문에 애플리케이션 레벨에서 추가적인 작업이 필요하다. 즉 원하는 방법으로 커스텀이 가능하다.

> ### HTTP/3
> HTTP/3에서는 추가적인 최적화를 통해 TCP가 아닌 UDP를 사용한다고 한다.

## PORT

IP는 목적지 서버를 찾는 목적이다. PORT는 목적지 서버에서 애플리케이션을 구분하기 위한 용도이다. 정리하면 같은 IP 내 에서 프로세스를 구분하기 위한 용도이다.

PORT는 `0 ~ 65535` 중 하나로 할당이 가능하다. 그 중 `0 ~ 1023`은 [well known PORT](https://shaeod.tistory.com/389) 이기 때문에 사용하지 않는 것이 좋다.

## DNS

IP는 단순히 숫자의 조합으로 이루어져 있다. 즉 사람이 기억하기 어려운 형태를 가지고 있다. 또한 IP는 변경될 가능성을 내포하고 있다.

이때 도메인 명을 적절한 IP 주소로 변환해주는 역할을 담당하는 것은 `DNS(Domain Name Server)`이다.

> ### DNS는 누가 운영하는가?
> 주로 회사나 기관이 운영한다. ex) google, cloudflare 등

## URI (Uniform Resource Identifier)

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/166171144-f475eec5-935f-4ebc-9ac6-6c1f2ac06233.png />

 * `URI`는 특정한 리소스를 `식별`하기 위한 용도로 활용된다.
 * `URI`는 세부적으로 `URL`과 `URN`을 포함한다.
 * URL은 리소스의 위치를 나타낸다. (ex. ~에 매트가 살고 있다.)
 * URN은 리소스의 이름 그 자체이다. (ex. 매트)

하지만 URN을 활용하여 리소르를 찾는 방법은 보편화 되지 않았다. 

## URL

```
scheme://[userinfo]host[:port][/path][?query][#fragment]
```

### scheme

 * 주로 프로토콜을 작성한다. http는 80, https 443을 주로 사용하기 때문에 웹 브라우저에 의해 생략할 수 있다.

### userinfo

 * URL에 사용자 정보를 포함해서 인증할 때 사용한다. 거의 사용하지 않기 때문에 생략한다. 

### host 

 * 호스트명을 의미한다. 도메인 명이나 IP 주소를 직접 사용한다.

### port

 * 접속 PORT를 작성한다. 서버 내에서 작동하는 여러 프로세스를 구분하기 위한 용도로 활용한다. 해당 PORT는 OS가 관리하며 여러 프로세스가 공유할 수 없다.

### path

 * 리소스 경로를 의미하며 주로 `계층적 구조`를 활용한다.

### query

 * `key=value`의 형태이다. `?`로 시작하며 `&`로 추가가 가능하다. 
 * 보통 `query parameter`, `query string` 등으로 불린다.

### fragment

 * html 내부 북마크를 위해 사용된다.

## 웹 브라우저 요청 흐름

 * 리소스 요청 시 웹 브라우저가 HTTP 메시지를 생성한다.
 * socket 라이브러리를 통해 TCP/IP로 3 way handshake 실행 후 서버와 가상 연결을 진행한다.
 * TCP/IP 계층으로 데이터 전송을 위한 데이터를 전달한다. 이때 HTTP 메시지가 포함된 TCP/IP 패킷을 생성한다.
 * 서버에 요청 패킷이 도착하면 패킷 껍데기를 버리고 HTTP 메시지를 해석한다.
 * HTTP 응답 메시지 또한 동일하게 패킷으로 전달한다.
 * 수 많은 노드를 거쳐 응답 패킷이 도착하면 웹 브라우저는 HTML 랜더링을 통해 화면에 보여준다.

## 공유하고 싶은 내용

### TCP와 UDP의 차이점
 
 * TCP는 연결성이며 신뢰성을 보장한다.
 * UDP는 비연결성이며 신뢰성을 보장하지 않는다.

### 3 way handshake
 
 * 3 way handshake를 진행할 때 패킷에는 어떠한 정보가 들어있는가?

### 클라이언트의 PORT는 어떻게 할당되는가?

 * 남은 PORT 중 랜덤으로 할당된다. 서버 측은 포트 포워딩을 통해 열어둔 PORT를 지정한다.

## References

[모든 개발자를 위한 HTTP 웹 기본 지식](https://www.inflearn.com/course/http-%EC%9B%B9-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC)<br>
[TCP/UDP의 잘 알려진 서비스 포트 번호 목록 - well known port](https://shaeod.tistory.com/389)

<TagLinks />
