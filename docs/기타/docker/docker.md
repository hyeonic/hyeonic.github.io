---
title: docker
tags: ['docker']
---

# docker

<p align='center'>
    <img src='https://user-images.githubusercontent.com/59357153/135307677-f708244d-9aff-45f6-91c2-164e3a1afea1.png'>
</p>

Docker는 간단히 이야기 하면 컨테이너 기반의 오픈소스 가상화 플랫폼이다. 우선 컨테이너의 개념부터 알아 보았다.

## 컨테이너란?

그렇다면 위에서 언급한 `컨테이너`는 무엇을 나타내는 것인가?

일반적인 `가상 머신`은 호스트 `OS`에 `하이퍼바이저`를 설치하고 그 위에 `게스트 OS`를 동작시키는 형태로 동작한다. 

`컨테이너`란 호스트 OS의 `커널`을 공유하면서 분리된 프로세스로서 실행해 마치 가상 머신이 움직이고 있는 것처럼 보이게 하는 기술이다. 컨테이너는 단순한 프로세스이기 때문에 가상 머신에 비해 매우 가볍고 빠르게 동작할 수 있다.

<p align='center'>
    <img src='https://user-images.githubusercontent.com/59357153/135305500-424f1984-3edb-4d09-b2a9-68dbc5da5a67.png'>
</p>

이미지 출처: [컨테이너와 VM 비교](https://www.redhat.com/ko/topics/containers/containers-vs-vms)

## docker 란?

`Docker`란 컨테이너 기반의 오픈소스 가상화 플랫폼이다. Docker는 소프트웨어를 컨테이너라는 표준화된 유닛으로 패키징한다. 컨테이너 안에는 라이브러리, 시스템 도구, 실행 파일 등 소프트웨어 실행을 위한 모든 것들이 포함될 수 있다.

정리하면, 실행환경을 컨테이너로 추상화하고 동일한 인터페이스를 제공하여 환경에 구애받지 않고 애플리케이션을 신속하게 배포 및 확장 관리할 수 있도록 도와준다.

docker는 단기간에 개발자들의 많은 지지를 받을 수 있었고, 그 이유에는 크게 두 가지가 있다.

### 1. 컨테이너 관리 방식
 * `docker`는 `Dockerfile`이라는 정의 파일을 작성하여 동일한 컨테이너 이미지를 간단히 만들 수 있다. 이것은 `IaC`를 구현하는 데 매우 적합한 소프트웨어 있다.
 * 컨테이너 이미지에는 애플리케이션과 그 실행 환경 설정이 포함되어 있기 때문에 도커 엔진만 설치되어 있다면 그 애플리케이션의 동작을 보장한다.

> IaC, 코드형 인프라(Infrastructure as Code, IaC)는 수동 프로세스가 아닌 코드를 통해 인프라를 관리하고 프로비저닝하는 것을 말한다.

### 2. 컨테이너 이미지를 저장, 공유하기 위한 에코시스템 초기 부터 준비
 * 생성한 컨테이너 이미지는 각 환경에 확실히 배포할 수 있어야 한다. 
 * docker에서는 `docker hub`라고 하는, 컨테이너 이미지를 저장 및 공유 할 수 있는 `컨테이너 repository`가 제공된다. 
 * `docker push/pull` 명령으로 간단히 docker hub에 컨테이너 이미지를 전송하거나 다운로드 할 수 있다.

## References

[컨테이너와 VM 비교](https://www.redhat.com/ko/topics/containers/containers-vs-vms)<br>
[Docker - Docker란 무엇이고 왜 사용했는가?](https://jeongupark-study-house.tistory.com/76)<br>
[초보를 위한 도커 안내서 - 도커란 무엇인가? ](https://subicura.com/2017/01/19/docker-guide-for-beginners-1.html)

<TagLinks />