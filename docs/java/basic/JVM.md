---
title: Java Virtual Machine
tags: ['Java', 'jvm']
---

# Java Virtual Machine
 * Java 애플리케이션을 OS 독립적으로 실행 가능할 수 있도록 도와준다.
 * GC로 자동으로 메모리 관리되기 때문에 안정적이다.

## JVM 구성

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/136951463-0690ec5f-a255-4fe9-a95e-ef3113dbbf30.png>
</p>

### java compiler
 * `java source code(.java)`는 `java compiler(javac)`를 거쳐 `bytecode(.class)`로 변환된다.

### Class Loader
 * 변경된 `class` 파일들은 `Class Loader`가 JVM 메모리 영역인 `Runtime Data Area`로 `Loading` 시킨다.

### Runtime Data Area

애플리케이션 수행을 위해 OS에서 할당 받은 공간이다.

#### method area
 * Method 영역은 JVM이 시작될 때 생성되는 공간으로 바이트코드가 이 영역에 저장된다.
 * 올라가는 정보의 종류
    * `field information`: 멤버변수의 이름, 데이터 타입, 접근 제어자에 대한 정보
    * `method information`: 메소드의 이름, 리턴타입, 매개변수, 접근 제어자에 대한 정보
    * `type information`: class/interface 여부 저장, type의 속성, 전체 이름, super class의 이름 등 

 * `클래스 데이터`를 위한 공간이다.
 * `모든 스레드가 공유`한다.

#### heap
 * heap 영역은 `동적으로 생성된 객체`가 저장되는 영역으로 `GC의 대상`이 되는 공간이다.
 * `new 연산`을 통하여 동적으로 생성된 `인스턴스 변수`가 저장된다. ex) 클래스의 객체, 배열
 * 그렇게 생성된 변수는 해당 객체가 소멸되기 전, GC가 정리하기 전까지는 해당 영역에 남아있다. 쉽게 소멸되는 데이터가 아니다.
 * `GC`의 대상이 되는 공간이다.
 * `모든 스레드가 공유`한다.

#### stack
 * `stack` 영역은 `지역변수`나 메서드의 `매개변수`, 임시적으로 사용되는 변수, `메서드의 정보`가 저장되는 영역이다.
 * 지역변수와 매개변수의 특성상 해당 메서드의 호출이 `종료`되면 이 안에 선언된 변수들은 사라진다.
 * 금방 사용되고 끝나는 데이터가 저장되는 공간이다.
 * 스레드 마다 `독립적인` `stack` 영역을 가지고 있다.

#### heap과 stack

```java
public class Location {
    private int x;
    private int y;

    public Location(int x, int y) {
        this.x = x;
        this.y = y;
    }
}
```

```java
Location location = new Location(2, 5);
```

 * `location`는 `stack` 영역에 저장된다.
 * `new Location(2, 5)`는 인스턴스 변수로 `heap` 영역에 저장된다.
 * `reference type`의 변수들이 실행될 때 마다 `stack` 영역에 쌓여서 비효율적이므로 `heap` 영역에 실제 데이터를 저장하고 그 메모리의 주소를 `참조하는 변수`를 `stack` 영역에 저장한다.

#### PC Register
 * CPU Register의 PC를 의미하는 것이 아니다.
 * 스레드가 시작될 때 생성되며, 현재 수행중인 JVM의 `명령어 주소`를 `저장`하는 공간이다. 스레드가 어떤 명령어로 수행할지를 저장하는 공간이다.

## Native Method Stack
 * Native Method Stack은 Java가 아닌 다른 언어로 작성된 코드를 위한 공간이다.
 * 즉 `JNI(Java Native Interface)`를 통해 호출하는 `C/C++` 등의 코드를 수행하기 위한 공간
 * `Java` 프로그램이 컴파일되어 생성되는 `바이트코드`가 아닌 실제 실행할 수 있는 기계어로 작성된 프로그램을 실행시키는 영역이다.

### Execution Engine
 * `Runtime Data Area`에 로딩된 클래스파일이 `execution engine`을 통해 해석될 차례이다.
 * `execution engine`은 로드된 클래스 파일의 `바이트코드`를 실행시키는 엔진이다.
 * 바이트코드를 실행시키기 위해서는 `바이트코드`를 컴퓨터가 이해할 수 있는 `기계어`로 바꾸는 작업이 필요한데, `interpreter`와 `jit compiler`가 해당 역할을 진행한다.

#### Interpreter
 * 명령어를 한줄한줄 해석하면서 실행한다.
 * 한줄씩 수행하기 때문에 느린 실행 속도를 가지고 있는 것이 단점이다.

#### JIT Compiler
 * `Interpreter`의 단점을 보완하기 위한 방법이다. 
 * `Interpreter` 방식으로 실행하다가 적절한 시점에 바이트코드 전체를 컴파일하여 기계어로 변경하고, 이후 직접 실행하는 방식이다. 
 * 한 번에 전체를 컴파일하기 때문에 `Interpreter`보다 오래 걸린다. 만약 한 번만 실행되는 코드라면 `JIT Compiler`를 사용하는 것 보다 `Interpreter`를 사용하는 것이 유리하다. JIT Compiler는 JVM 내부적으로 해당 메서드가 `얼마나 자주 수행`되는지 체크하고 특정한 상황을 넘어서면 compile을 진행한다.
 * `Runtime` 시간에 한꺼번에 변경하여 실행한다.

## Native Method Interface
 * JVM에 의해 실행되는 코드 중 네이티브로 실행하는 것이 있다면 해당 네이티브 코드를 호출하거나 호출될 수 있도록 만든 일종의 프레임워크이다.
 
## Native Method Libraries
 * 네이티브 메서드 실행에 필요한 라이브러리이다.

## TODO
 * [[JVM Internal]Java Performance Fundamental 교재를 공유합니다.](https://performeister.tistory.com/75): Java Performace Fundamental의 저자분이 책 내용을 기반으로 ppt를 공유하였다.
 * [JVM에 관하여 - Part 1, JVM, JRE, JDK](https://tecoble.techcourse.co.kr/post/2021-07-12-jvm-jre-jdk/): jvm의 내부 구조를 그림과 코드로 깔끔히 정리하였다.

## References

[자바 메모리 구조 뿌시기 [JVM이란?]](https://www.youtube.com/watch?v=AWXPnMDZ9I0)<br>
[#자바가상머신, JVM(Java Virtual Machine)이란 무엇인가?](https://asfirstalways.tistory.com/158)

<TagLinks />