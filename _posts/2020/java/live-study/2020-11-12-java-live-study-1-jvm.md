---
title:  "1주차 과제: JVM은 무엇이며 자바 코드는 어떻게 실행하는 것인가."
# excerpt: "GitHub Blog 서비스인 github.io 블로그 시작하기로 했다."

categories:
  - Java
  - Live-study
tags:
  - java
  - livestudy
  - JDK
  - JRE
  - JVM
  - JIT
last_modified_at: 2020-11-12 14:00:00 +0900
---

## 목표
 자바 소스파일(.java)을 JVM으로 실행하는 과정 이해하기.

## 학습할 것
 * [JVM이란 무엇인가](#1-jvm이란-무엇인가) 
 * [컴파일 하는 방법](#2-컴파일-하는-방법)
 * [실행하는 방법](#3-실행하는-방법)
 * [바이트 코드란 무엇인가](#4-바이트-코드란-무엇인가)
 * [JIT 컴파일러란 무엇이며 어떻게 동작하는가](#5-jit-컴파일러란-무엇이며-어떻게-동작하는가)
 * [JVM 구성 요소](#6-jvm-구성요소)
 * [JDK와 JRE의 차이](#7-jdk와-jre의-차이)


### 1. JVM이란 무엇인가
> Java Virtual Machine의 줄임말이며 Java Byte Code를 OS에 맞게 해석해주는 역할
 
&nbsp;Java 컴파일러는 .java파일을 .class라는 Java 바이트 코드로 변환 시켜준다. 바이트 코드는 기계어가 아니기 때문에 OS에서 바로 실행되지 않는다. 

&nbsp;이때 JVM은 OS가 바이트 코드를 이해할 수 있도록 해석해준다. 바이트 코드는 JVM 위에서 OS 상관없이 실행되는 점이 Java의 가장 큰 장점이다. 

&nbsp;Java뿐만 아니라 JVM 기반으로 동작하는 프로그래밍 언어는 다양한다. 대표적인 예로 클로저, 그루비, Kotlin 등이 있다.

### 2. 컴파일 하는 방법
> java에서 컴파일 이란?
> java 언어로된 코드를 JVM이 인식할 수 있는 바이트 코드로 변환하는 것을 의미

&nbsp;Java를 빌드하게 되면 자바 컴파일러가 .java 파일을 JVM이 이해할 수 있는 바이트 코드인 .class 파일로 바꿔준다. 

&nbsp;Class Loader를 통하여 바이트 코드를 JVM내로 로드하고 Execution Engine에서 두 가지 방식을 활용(interpreter, JIT)하여 기계어로 바꿔준다.

__컴파일 과정__

Main.java

```java
public class Main(
    public static void main(String[] args) {
        System.out.println("hello world");
    }
)
``` 

```bash
$ javac Main.java
```

### 3. 실행하는 방법

&nbsp;컴파일한 .class 파일이 있는 디렉토리 위치로 이동한다.

```bash
$ java Main
```

### 4. 바이트 코드란 무엇인가
> 바이트 코드는 특정 하드웨어가 아닌 가상 컴퓨터에서 돌아가는 실행 프로그램을 위한 이진 표현법

&nbsp;Java에서 바이트 코드는 Java 가상 머신인 JVM이 이해할 수 있는 언어로 변환된 Java 소스코드를 의미한다. Java에서 바이트 코드로 표현된 파일의 확장자는 .class 이다.

### 5. JIT 컴파일러란 무엇이며 어떻게 동작하는가


> JIT (Just-in-time) 컴파일러란?
> Just-In-Time 컴파일 방식을 활용. 프로그램을 실제 실행하는 시점에 기계어로 번역하는 컴파일 기법을 활용한 컴파일러

&nbsp;JIT 컴파일러는 자주 사용하는 코드를 캐싱하고 이후에 같은 코드가 나오면 캐싱된 것을 가져다 쓴다. 매번 기계어로 번역하는 interpreter 방식보다 빠르게 기계어로 번역할 수 있다.

&nbsp; 단점은 초기 구동할 때 런타임 단계에서 컴파일하는데 시간과 메모리를 소모한다. 정적 컴파일된 프로그램에 비해 실행속도가 느리다.

### 6. JVM 구성요소

__JVM의 구조__

![JVM](/assets/images/live-study/jvm.jpg)

__6.1 Class Loader__
 - .class에서 바이트 코드를 읽고 메모리에 저장한다.
 - class loading에는 Loading, Linking, initialzing 단계로 나뉜다.

 |단계|설명|
 |---|---| 
 |loading|class를 읽어오는 과정|
 |linking|레퍼런스를 연결하는 과정|
 |initialzation|static 값 초기화 및 변수에 할당|


__6.2 memory__
 - Java 프로그램이 실행될 때 JVM이 실행되면서 OS로 부터 할당받는 메모리.

 |공간|설명|
 |---|---|
 |Stack|메소드가 호출되면 할당된다. LIFO 구조이고, 스레드가 생성되면 각 스레드마다 하나의 stack segment를 가진다. 메소드 수행시 발생되는 지역변수 또한 저장된다. stack에서는 heap 영역의 객체를 참조할 수 있으며, 기본타입 변수는 stack에 직접 생성된다.| 
 |Heap|Java 프로그램이 실행되면서 동적으로 생성된 객체가 저장되는 공간|
 |PC Register|현재 수행중인 JVM 명령 주소를 가진다. CPU안에 Program Counter와 비슷한 역할을 한다.|
 |Native Method Stack|Java 이외의 언어로 된 코드들을 위한 stack이다. JIN을 통하여 다른 언어의 코드를 수행한다.|
 |Method|class의 구성요소인 static 변수, 생성자, 메소드, 멤버변수들이 저장된다.|


 __6.3 Excution Engine__

|엔진|설명|
|---|---|
|interpreter|바이트코드를 한줄씩 실행한다.|
|JIT 컴파일러|interpreter의 효율을 높이기 위해 반복되는 코드를 캐싱하고, 컴파일된 코드를 바로 사용한다.|
|Garbage Collector|더 이상 참조하지 않는 객체들을 정리한다.|

__6.4 JNI__
 - Java Native Interface
 - Java 애플리케이션에서 OS가 구현된 언어(C, c++, 어셈블리어)로 만들어진 함수들을 사용할 수 있는 방법을 제공한다.

__6.5 Native method Libraries__
 - C, C++등으로 작성된 라이브러리


### 7. JDK와 JRE의 차이

__7.1 JRE__
 - Java Runtime Enviroment
 - JVM + 라이브러리
 - JVM의 실행환경을 구현

__7.2 JDK__
 - Java Development Kit
 - JRE + 개발시 필요한 도구(javac, java 등)
