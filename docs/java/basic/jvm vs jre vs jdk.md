---
title: JVM vs JRE vs JDK
tags: ['Java', 'jvm', 'jre', 'jdk']
---

# JVM vs JRE vs JDK 

## JVM

`Java Virtual Machine`의 약자로 Java로 작성한 애플리케이션을 `OS에 독립적`으로 실행할 수 있도록 도와준다. 각 `OS`마다 미리 설치된 `JVM`은 OS별로 동일하게 작동하도록 `.class` 파일에게 `환경을 제공`한다. 또한 `GC`를 사용하여 메모리를 효율적으로 관리하고 최적화한다.

OS에 독립적으로 실행가능한 이유는 `.java`로 작성된 소스 코드는 컴파일러를 거쳐 `바이트코드`인 `.class` 파일로 변환된다. 변환된 `.class` 파일은 `JVM` 위에서 동작한다. 

::: tip
JVM이 `.java` 파일을 `.class` 파일로 컴파일하는 것이 아니다. 컴파일은 `javac`가 담당한다. 
:::

## JRE

`Java Runtime Enviroment`의 `JVM`이 원활하게 작동할 수 있도록 추가적인 환경을 제공한다.

`JRE`는 `JVM`, `Class Loader`, `Java Class Libraries`로 구성되어 있다. `Java Class Libraries`는 `java.io`, `java.util` 등 `Java 실행`을 위해 필요한 라이브러리를 가지고 있다.

`JRE`는 그 자체로 특별한 기능을 하는 것이 아니라 `Class Loader`, `Java Class Libraries`를 활용하여 바이트코드(.class)가 `JVM`에서 원할히 작동할 수 있도록 `환경을 조성`해준다. 

정리하면 `JRE`는 실제 애플리케이션을 `실행`시키는데 집중한다.

## JDK

`Java Development Kit`의 약자로 `Java`를 활용하여 `애플리케이션 개발`을 진행할 때 필요한 `도구의 모음`이다. Java 실행을 위한 `JRE`를 포함하여 java 소스 코드를 바이트코드로 변환하기 위한 컴파일러 `javac`, 디버깅을 위한 `jdb`등을 포함한다.

정리하면 Java를 공부하고 개발하기 위해서는 `JDK`가 필요하다.

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/137770071-62cb6a46-a47b-4f5c-be49-ab307bd5d70f.png>
</p>

## References

[JVM에 관하여 - Part 1, JVM, JRE, JDK](https://tecoble.techcourse.co.kr/post/2021-07-12-jvm-jre-jdk/)<br>
[What is a Java runtime environment (JRE)?](https://www.redhat.com/en/topics/cloud-native-apps/what-is-a-Java-runtime-environment)

<TagLinks />