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
 * [JVM이란 무엇인가](#jvm이란-무엇인가) 
 * [컴파일 하는 방법](#컴파일-하는-방법)
 * 실행하는 방법
 * 바이트코드란 무엇인가
 * JIT 컴파일러란 무엇이며 어떻게 동작하는가
 * JVM 구성 요소
 * JDK와 JRE의 차이


### JVM이란 무엇인가
> Java Virtual Machine의 줄임말이며 Java Byte Code를 OS에 맞게 해석해주는 역할
 
&nbsp;Java compiler는 .java파일을 .class라는 Java Byte Code로 변환 시켜준다. Byte Code는 기계어가 아니기 때문에 OS에서 바로 실행되지 않는다. 

&nbsp;이때 JVM은 OS가 Byte Code를 이해할 수 있도록 해석해준다. Byte Code는 JVM 위에서 OS 상관없이 실행되는 점이 Java의 가장 큰 장점이다. 

__JVM의 구조__

![JVM](/assets/images/live-study/jvm.jpg)


### 컴파일 하는 방법
> java에서 complie 이란?
> java 언어로된 코드를 JVM이 인식할 수 있는 Byte code로 변환하는 것을 의미

&nbsp;Java를 빌드하게 되면 자바 컴파일러가 .java 파일을 JVM이 이해할 수 있는 Byte Code인 .class 파일로 바꿔준다. 

&nbsp;Class Loader를 통하여 Byte Code를 JVM내로 로드하고 Execution Engine에서 두 가지 방식을 활용(interpreter, JIT)하여 기계어로 바꿔준다.

__컴파일 과정__

Main.java

```java
public class Main(
    public static void main(String args[]) {
        System.out.println("hello world");
    }
)
``` 

```bash
javac Main.java
```

