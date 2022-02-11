---
title: .gitkeep
tags: ['git', '우아한테크코스']
---

# .gitkeep

gitkeep 파일은 git 사용자가 만든 빈 파일이다. 보통 commit을 진행하면 빈 디렉토리는 인식되지 않는다. 이러한 상황에 `.gitkeep`파일을 사용하면 해당 디렉토리는 `누락되지 않고 반영`된다.

아래와 같은 디렉토리 구조를 가진 프로젝트가 있다고 가정한다.

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/153545563-7ed76bff-a40e-47fd-b91c-e8f27b49ebb4.png />

현재 calculator 패키지 아래는 비어있는 상태이다. 이 상태에서 commit을 진행하고 push하여 remote repository를 살펴보면 아래와 같다.

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/153545992-7a239352-1243-4582-8f1a-88f8f0f9e126.png />

디렉토리 및 패키지의 흔적을 전혀 찾아볼 수 없다.

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/153546167-79e716df-3734-4a67-81cd-5fda51c64c77.png />

이제 `.gitkeep` 파일을 적용시킨 뒤 다시 commit 및 push를 진행한다. remote repository를 살펴보면 정상적으로 등록된 것을 확인할 수 있다.

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/153546198-e4c5c390-f259-43ac-90f1-a47f5bdf0b58.png />

<TagLinks />