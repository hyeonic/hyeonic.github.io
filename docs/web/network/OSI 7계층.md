---
title: OSI 7계층
tags: ['network', 'osi']
---

# OSI 7계층

네트워크에서 통신이 일어나는 과정을 7단계로 나눈 것이다. 7개의 계층으로 나눈 이유는 통신이 일어나는 과정을 단계별로 파악할 수 있기 때문이다. 또한 특정한 곳에서 이상이 생기면 다른 계층을 건들이지 않고 해결할 수 있다.

## 물리 계층 (Physical Layer)
 * 데이터를 전기적인 신호로 변환하여 전송하는 역할을 진행한다.
 * Coax, Fiber, Wireless, Hubs, Repeaters

## 데이터 링크 계층 (Data Link Layer)
 * 송수신 되는 정보를 관리하여 안전하게 전달되도록 도와준다. 이때 MAC 주소를 통해 통신을 진행한다. frame(데이터 링크 계층 전송 단위)에 MAC 주소를 부여하고 에러검출, 재전송, 흐름 제어를 진행한다.
 * Ehternet, PPP, Switch, Bridge

## 네트워크 계층 (Network Layer)
 * 데이터를 목적지까지 가장 안전하고 빠르게 전달하는 기능을 담당한다. 라우터를 통하여 이동할 경로를 선택하여 IP 주소를 지정하고 해당 경로를 따라 packet(네트워크 계층 전송 단위)을 전달해준다.
 * `IP`, ICMP, IPSec, IGMP

## 전송 계층 (Transport Layer)
 * TCP, UDP 프로토콜을 통해 통신을 활성화한다. 포트를 개방하고 프로그램들이 전송을 진행할 수 있도록 제공해준다.
 * TCP는 연결지향적이며 packet의 손실, 중복 등이 없도록 신뢰성을 보장한다.
 * UDP는 비연결성이며 신뢰성을 보장하지 않는다. 빠른 요청과 응답이 필요할 때 유리하다.
 * `TCP`, `UDP`

## 세션 계층 (Session Layer)
 * 데이터가 통신하기 위한 논리적인 연결을 담당한다. TCP/IP 세션을 만들고 없애는 책임을 가지고 있다.
 * `API's`, `Socket`, WinSock

## 표현 계층 (Presentation Layer)
 * 데이터 표현에 대한 독립성을 제공하고 암호화하는 역할을 담당한다. 파일 인코딩, 명령어 포장 압축 및 암호화를 진행한다.
 * SSL, SSH, IMAP, FTP, `MPEG`, `JPEG`

## 응용 계층 (Application Layer)
 * 최종 목적지이다. 응용 프로세스와 직접 관계하며 일반적인 응용 서비스를 수행한다. 사용자 인터페이스, 전자 우편, 데이터베이스 관리 등의 서비스를 제공한다.
 * HTTP, FTP, IRC, SSH, DNS 

## References

[OSI 7 계층](https://gyoogle.dev/blog/computer-science/network/OSI%207%EA%B3%84%EC%B8%B5.html)<br>

<TagLinks />