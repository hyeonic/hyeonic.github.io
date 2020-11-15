---
title: "git add . vs git add *"
# excerpt: "GitHub Blog 서비스인 github.io 블로그 시작하기로 했다."

categories:
  - Git
tags:
  - linux
  - git
  - bash
last_modified_at: 2020-11-15 16:00:00 +0900
---

## git add . 와 git add * 의 차이

문득 git 명령어를 사용하던 도중, git add .와 git add *에 대한 차이점이 무엇인지 궁금하였다. 교수님께 질문드리고, 추가로 구글링하여 간단하게 정리해 봤는데, 오개념이 있을 가능성이 있다. 이해하는 용도로 생각하고 확실한 개념이 잡히면 다시 정리할 계획이다. 

### git add 란?

> untracked 상태의 파일이나 modified 상태의 파일을 staging area에 올리는 것

### git add a.txt b.txt

&nbsp; 위 명령어는 단순히 a.txt와 b.txt 파일을 탐색하여 staging area에 등록하는 명령어이다. 이 한줄의 명령어에는 다양한 의미가 담겨 있다. git이라는 실행 파일의 main 함수에 parameter 값으로 add, a.txt, b.txt를 전달받고 내부 과정을 거쳐 해당 파일들이 staging area에 등록된다.

### 그렇다면 git add . 은?

&nbsp; git은 bash shell에서 실행된다. .(dot)은 shell 메타문자로 현재 디렉토리를 의미한다. .(dot)을 마주하면 bash shell이 현재 디렉토리 및 하위 디렉토리까지 뒤져가며 list를 채워 해당 add를 포함한 parameter 값을 전달한다. 전달 받은 파일명들을 확인하여 staging area에 등록시킨다.

### 그렇다면 git add * 은?

&nbsp; * 또한 bash shell이 담당한다. linux 메타문자 중 *가 의미하는 것은 문자열 와일드카드이다. 단지 현재 디렉토리에서 파일명이 일치하는 모든 파일을 찾아서 전달할 뿐이다. shell은 * 으로 하위 디렉토리까지 모두 뒤질 능력은 없다.

### git add "*"

&nbsp; 그렇다면 와일드카드에 ""를 붙이면 어떻게 의미가 해석 될까? bash shell이 해당 파일을 찾는 것이 아니라 git에게 권한을 넘겨 찾게된다. git은 하위 디렉토리까지 뒤져서 찾을 능력을 가지고 있기 때문에 현재 및 하위 디렉토리를 뒤져가며 일치하는 파일을 찾아서 전달한다.

### 정리

__파일명에 " "을 붙이는 이유__
 - shell 에게는 하위 디렉토리까지 뒤질 능력이 없다. 대표적으로 git 혹은 find 같은 명령어에 권한을 넘긴다.
 - windows의 경우 파일명에 공백이 존재할 수 도 있다. 그런 경우에 " "은 필수적으로 필요하다. Linux는 관례상 파일의 공백을 금지 시킨다.
