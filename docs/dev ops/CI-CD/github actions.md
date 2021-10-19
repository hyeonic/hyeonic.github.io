---
title: Github Actions란?
tags: ['github actions']
---

# Github Actions란?

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/135003579-e675783f-2340-47c4-ba81-ddcb2fee6fcb.png>
</p>

> Github Actions란 소프트웨어 개발 라이프사이클 안에서 특정한 이벤트 발생에 따라 자동화된 작업을 진행할 수 있도록 도와주는 기능이다. 

자동화가 필요한 작업들의 예시는 아래와 같다.

### 1. CI/CD
 * `CI/CD`는 `Continuous Integration`, `Continunous Deliver`, `Continunous Deployment`를 나타내는 용어이며 해당 `과정`들을 `자동화`하여 불필요한 공수를 줄이고 보다 빠른 서비스 개발 및 제공의 효과가 있다.

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/135002339-d7b592c1-7eef-4e76-b9a4-692a7ec3c9b1.png>
</p>

그중 `CI` 구축을 지원하는 툴로는 Jenkins, Travis CI, Circle CI, `Github Actions` 등이 있다.

### 2. Testing 
 * 팀 프로젝트 진행 시 자동으로 테스트를 진행한다.

### 3. Cron Job
 * 특정 시간대에 스크립트를 반복 실행하도록 한다.

위와 같은 `자동화 작업`을` Github Actions`에서 상단 부분 제공해 주고 있다.

## Github Actions 구성 요소

### 1. Workflow
 * `Workflow`란 `repository`에 추가할 수 있는 일련의 `자동화된 커맨드 집합`이다. `하나 이상의 Job`으로 구성되어 있으며, `Push`, `PR`과 같은 `이벤트`에 의해 실행될 수 있다. 또한 `특정 시간대`에만 실행할 수도 있다.
 * `빌드`, `테스트`, `배포` 등 각각의 역할에 맞는 `Workflow` 추가가 가능하다. `.github/workflows` 디렉토리에 `YAML` 파일로 저장한다.

### 2. Event
 * `Event`란 Workflow를 실행 시키는 `Push`, `Pull Request`, `Commit` 등 `특정 행동`을 의미한다.
 * [Repository Dispatch Webhook](https://docs.github.com/en/rest/reference/repos#create-a-repository-dispatch-event) 사용 시 `Github 외부`에서 발생한 `이벤트`에 의해 Workflow 실행이 가능하다.

### 3. Job
 * `Job`이란 동일한 `Runner`에서 `실행`되는 `여러 Step의 집합`을 의미한다. 
 * 하나의 Workflow 내의 여러 Job은 `독립적으로 실행`되지만, 필요에 따라 `의존 관계`를 설정하여 순서를 지정할 수 있다.

### 4. Step
 * `Step`이란 커맨드를 실행할 수 있는 각각의 `Task`를 의미한다. 
 * `Shell` 커맨드가 될 수도 있고, 하나의 `Action`이 될 수도 있다.
 * 하나의 Job 내에서 각각의 `Step`은 다양한 `Task`로 인해 `생성된 데이터를 공유`할 수 있다.
 
### 5. Action
 * `Action`이란 `Job`을 만들기 위해 `Step`을 결합한 독립적인 커맨드로, 재사용이 가능한 Workflow의 가장 작은 단위이다.
 * 직접 만든 Action을 사용하거나 Github에 의해 생성된 Action을 사용할 수 있다.

### 6. Runner
 * `Runner`란 Github Actions Workflow 내에 있는 `Job`을 실행시키기 위한 `애플리케이션`이다.
 * `Runner Application`은 `Github` 내에서 호스팅하는 `가상 환경` 또는 직접 호스팅하는 가상 환경에서 실행 가능하며, Github에서 호스팅하는 가상 인스턴스의 경우에는 `메모리와 용량 제한`이 존재한다.

## References

[Quickstart for GitHub Actions](https://docs.github.com/en/actions/quickstart) <br>
[GitHub Actions를 이용한 CI/CD 구축하기](https://ji5485.github.io/post/2021-06-06/build-ci-cd-pipeline-using-github-actions/)<br>
[Github Action을 사용한 Spring boot & gradle CI/CD 구축 - 1](https://stalker5217.netlify.app/devops/github-action-aws-ci-cd-1/)

<TagLinks />