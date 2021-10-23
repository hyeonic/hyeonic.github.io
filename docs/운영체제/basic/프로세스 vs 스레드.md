---
title: 프로세스 vs 스레드
tags: ['os', 'process', 'thread']
---

# 프로세스 vs 스레드

## 프로세스

`실행 중인 프로그램`으로 메모리에 올라와 실행되고 있는 프로그램의 인스턴스이다. os로부터 주소 공간, 파일, 메모리 등의 시스템 자원을 할당 받으며 이것을 프로세스라고 한다. 

::: tip Program
어떤 작업을 위해 실행할 수 있는 파일을 의미한다.
:::

### 할당 받는 시스템 자원
 * CPU 시간
 * 운영되기 위해 필요한 주소 공간
 * Code, Data, Stack, Heap 구조로 되어 있는 독립된 메모리 영역

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/138554921-3829a367-ed72-4a57-8c14-185367e7da44.png>
</p>

프로세스는 각각 독립된 `메모리 영역`을 할당 받고 기본적으로 1개의 `스레드`를 가진다. 이것을 메인 스레드라고 한다. 각각의 프로세스는 별도의 주소 공간에서 실행되며, 프로세스 간의 변수 및 자료구조 접근은 불가능 하다.

::: tip
프로세스 간의 자원 접근을 위해서는 프로세스 간의 통신 `(IPC, inter-process communication)`을 사용해야 한다.
:::

## 스레드

프로세스 내에서 실행되는 여러 흐름의 단위이다. 한 프로세스 내에서 동작하는 여러 실행 흐름들은 프로세스 내의 주소 공간이나 자원을 공유하여 사용할 수 있다. 

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/138555382-0d3b2182-b73b-43c0-93dc-7b351c457a43.png>
</p>

스레드는 프로세스 내에서 각각 `Stack 영역`을  할당 받는다. 나머지 `Code, Data, Heap 영역`은 `공유`하여 사용한다. 

하나의 프로세스를 다수의 실행 흐름으로 구분하여 자우너을 공유하고 자원의 생성과 관리의 중복성을 최소화하여 수행 능력을 향상 시키는 것을 `멀티스레딩`이라고 한다. 이때 각각의 스레드는 `독립적인 작업 수행`을 위해 각자의 `stack`과 `pc register` 값을 가지고 있다.

::: tip stack과 PC Register를 독립적으로 가지고 잇는 이유
stack은 함수 호출 시 전달되는 인자, 되돌아가기 위한 주소값 및 함수 내에서 선언한 지역 변수 등을 저장하는 공간이다. stack 메모리 공간을 독립적으로 사용하면 독립된 함수 호출이 가능하다. 독립적인 실행 흐름을 추가하기 위한 최소 조건으로 독립된 stack을 할당한다.

PC는 스레드가 명령어를 어디까지 수행했는지를 저장하기 위한 register이다. 스레드는 작업을 시작할 때 부터 끝날 때 까지 CPU를 선점하지 못할 수도 있기 때문에 명령어를 어디까지 수행했는지 기억해야 한다. 그렇기 때문에 PC register는 독립적으로 할당해야 한다.
:::

## Java에서 스레드

일반 스레드와 거의 차이가 없으며 `JVM`이 `os의 역할`을 한다. Java에는 프로세스가 존재하지 않고 스레드만 존재하며 `JVM에 의해 스케줄`되는 실행 단위 코드 블록이다.

## References

[[OS] 프로세스와 스레드의 차이](https://gmlwjd9405.github.io/2018/09/14/process-vs-thread.html)<br>
[프로세스와 스레드의 차이](https://github.com/JaeYeopHan/Interview_Question_for_Beginner/blob/master/OS/README.md#%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4%EC%99%80-%EC%8A%A4%EB%A0%88%EB%93%9C%EC%9D%98-%EC%B0%A8%EC%9D%B4)

<TagLinks />