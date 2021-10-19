---
title: Github Actions를 활용한 CI 구축
tags: ['github actions']
---

# Github Actions를 활용한 CI 구축

## 목표

`github actions`를 활용하여 `PR`를 올리거나 `main` 혹은 특정 `branch(develop)`에 `merge`하는 시점에 빌드 과정을 거쳐 `지속적 통합(Continuous Integration)`을 구축한다.

기본적인 git, github 지식을 가지고 있다고 가정하고 진행한다.

작성한 소스 코드와 작업 내역은 [github-actions-docker](https://github.com/hyeonic/github-actions-docker) 참고하세요.

## Github Actions란?

이전 게시글 참고 [Github Actions란?](https://hyeonic.github.io/%EA%B8%B0%ED%83%80/CI,CD/github%20actions.html)

## repository 생성

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/135559334-68a573b7-8d9c-424d-b468-7b1a08d6318b.png>
</p>

## spring boot 프로젝트 생성

간단한 예제를 위한 spring boot 프로젝트를 생성한다. java는 `11` 버전을 선택하였고, build type은 `gradle`를 선택하여 진행하였다.

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/135559687-1a16fc04-a389-487a-8d3a-df5a26a919ee.png>
</p>

spring boot 버전은 가장 최신 버전`(2.5.5)`을 선택하였고, 간단한 웹 서버 구축을 위해 `spring web` 의존성을 추가한다.

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/135559879-d91895a4-c990-4ae6-9aed-4f2ab110c5d3.png>
</p>

## workflow 생성

actions 탭 클릭

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/135559961-f62ea5a4-2da6-4687-aeae-67a2df1457eb.png>
</p>

spring boot 프로젝트이기 때문에 `Java with Gradle`를 클릭한다. 각각의 프로젝트 및 언어와 맞는 `workflows`를 선택하거나 직접 작성할 수 있다.

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/135560158-2dc1d656-748a-49e8-a3c8-2382341ae162.png>
</p>

`.github/workflows/*.yml`로 위치하여 생성된다. 다수의 workflow 생성을 위해서는 아래 디렉토리에 관련 파일을 추가적으로 작성하면 된다.

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/135560509-cda833b8-e51b-472b-94d6-4fc2073f5d45.png>
</p>

### ci.yml

`main branch`에 `PR` 이벤트가 일어날 경우 해당 `workflow`의 절차에 따라 실행된다.

```yml
name: Java CI with Gradle # workflow 이름

# event 정의
on:
  pull_request:
    # main branch에 PR 이벤트가 일어날 경우 해당 action 트리거
    branches: [ main ]

jobs:
  build:

    # 우분투 최신버전 가상환경 사용
    runs-on: ubuntu-latest

    steps:
    # 프로젝트 코드 checkout
    - name: Checkout
      uses: actions/checkout@v2

    # Github Action이 실행될 OS에 Java 설치
    - name: Set up JDK 11
      uses: actions/setup-java@v2
      with:
        java-version: '11'
        distribution: 'adopt'
        cache: gradle

    - name: Grant execute permission for gradlew
      run: chmod +x gradlew

    - name: Build with Gradle
      run: ./gradlew build
```

### deploy.yml

`main branch`에 `push`이벤트가 일어날 경우 해당 `workflow`의 절차에 따라 실행된다.

이전 `ci.yml`과 다른 부분은 `event 정의` 부분이다.

```yml
# ci.yml
on:
  push:
    # main branch에 push 이벤트가 일어날 경우 해당 action 트리거
    branches: [ main ]

# deploy.yml
on:
  pull_request:
    # main branch에 PR 이벤트가 일어날 경우 해당 action 트리거
    branches: [ main ]
```

아래는 `deploy.yml` 이다.

```yml
name: Java CI with Gradle # workflow 이름

# event 정의
on:
  push:
    # main branch에 push 이벤트가 일어날 경우 해당 action 트리거
    branches: [ main ]

jobs:
  build:

    # 우분투 최신버전 가상환경 사용
    runs-on: ubuntu-latest

    steps:
    # 프로젝트 코드 checkout
    - name: Checkout
      uses: actions/checkout@v2

    # Github Action이 실행될 OS에 Java 설치
    - name: Set up JDK 11
      uses: actions/setup-java@v2
      with:
        java-version: '11'
        distribution: 'adopt'
        cache: gradle

    - name: Grant execute permission for gradlew
      run: chmod +x gradlew

    - name: Build with Gradle
      run: ./gradlew build
```

생성이 완료되면 actions 탭에서 등록된 workflow를 확인할 수 있다.

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/135561069-5b476830-aa19-4267-83e7-02bb7abccb3e.png>
</p>

만약 `git-flow`와 같이 `develop branch`를 사용하거나 특정한 `branch`에 `workflow`를 걸기 위해서는 branches에 branch 이름을 추가하거나 main -> 다른 branch로 변경하면 된다.

PR과 main push를 분리한 이유는 `PR`의 경우 `ci.yml`에 `코드 커버리지`를 위한 `codecov`를 빌드 과정에 추가 하거나 `main`에 `docker` 관련 빌드 이미지을 `docker hub`로 `push` 하기 위한 과정이 필요하다면 `deploy.yml`에 추가하기만 하면 된다. 결국 각각의 역할 나누기 위해 분리하였다. 

## PR 생성

main에 PR을 진행할 경우 정상적으로 `ci.yml`이 실행되는지 확인하는 과정이다.

local 환경에서 git branch를 생성한다.

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/135561908-4c772653-c76c-41a0-9107-febe02e7419f.png>
</p>

일정 기능을 추가하거나 수정 후 `commit`을 진행하고 `origin`으로 `push`한다.

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/135562113-b7885fe3-faaa-44d1-9dd4-7b19cf49fcda.png>
</p>

github repository에서 해당 브랜치를 기반으로 PR를 생성한다.

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/135562257-886e4c49-40c1-4bbb-b806-e4a54bb3bdbb.png>
</p>

앞서 작성한 ci.yml이 실행되는 것을 확인할 수 있다.

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/135562358-180385c4-11e8-4261-ac6d-b9bc32fc8c79.png>
</p>

actions 탭에서 작성한 ci.yml에 따라 상세한 과정을 살펴볼 수 있다. 빌드가 실패할 경우 이곳에서 관련 에러를 찾을 수 있다.

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/135562513-08460033-2814-4864-88d5-2a28b7a41bc2.png>
</p>

또한 지금까지 작동된 내역까지 확인이 가능하다.

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/135562679-cefd0fa8-f30e-4e70-b3ca-ec9899174c29.png>
</p>

## main merge

`main`에 `merge`하여 `deploy.yml`의 동작을 확인한다.

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/135562833-be684a3d-1e18-443b-a4ed-70ec0527bd3e.png>
</p>

main에 push가 일어나면 해당하는 트리거가 실행되어 빌드 과정을 진행한다.

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/135562920-99e37914-aa3f-4576-be9d-cc0c76cc8af3.png>
</p>

## 그래서 이걸 왜 쓰는 걸까?

CI의 궁극적인 목표와 시나리오는 아래의 과정을 거친다.

* 개발자가 본인 local 환경에서 소스 코드를 작성하고 빌드 및 테스트 수행한다.
* 개발자가 형상관리 저장소인 github에 push한다.
* CI 서버가 github에서 변경 내역을 감지하고 해당 소스 코드를 다운로드 한다.
* CI 서버는 다운로드 한 소스 코드를 스크립트에 의해서 빌드 및 테스트 과정 수행한다.
* 빌드 및 테스트 결과를 CI 서버에 저장하거나 담당자에게 알림을 전달한다.
* CI 서버는 형상관리 저장소의 변경 사항을 계속해서 감지한다.

**개발 - 빌드 - 테스트 - 결과 전달 까지의 과정을 자동화 시키는 것이 목적이다.**

이런 일련의 과정들이 자동화되어 다수의 개발자가 협업을 진행하여도 소스 코드가 지속적으로 빠르게 통합된다.

### 장점
 * 통합 시 발생하는 문제를 빠르게 발견할 수 있다.
 * 소스 코드의 변경으로 인하여 다른 모듈과의 충돌을 조기에 발견할 수 잇다.
 * 변경된 소스 코드 테스트에 대한 결과를 빠르게 확인할 수 있다.
 * 최종 릴리즈 전에 많은 문제점을 발견할 수 있다.
 * 항상 빌드를 진행하기 때문에 배포 환경이 마련되면 언제든 배포가 가능하다.

### 단점
 * jenkins와 같이 CI를 위한 별도의 서버가 요구될 수 있다.
 * 느린 CI 서버의 경우 피드백이 지연되어 많은 시간이 요구 될 수 있다.
 * 초기 시스템 구축을 위한 추가적인 학습이 요구된다.

하지만 장점이 더 많이 와닿기 때문에 무조건 적용하는 것이 좋다고 생각한다.

## TODO

1. deploy 진행 시 docker 이미지를 빌드한 후 docker hub에 push한다.
2. deploy 진행 시 AWS Beanstalk로 배포하여 CD를 구축한다.
3. PR 진행 시 jacoco에서 합산한 코드 커버리지를 codecov로 전달하여 현재 커버리지를 지속적으로 확인한다.

## References

[CI 기능 및 특징](https://overface.tistory.com/405)<br>
[1. Github Action & AWS Beanstalk 배포하기 - Github Action으로 빌드하기](https://jojoldu.tistory.com/543?category=777282)

<TagLinks />