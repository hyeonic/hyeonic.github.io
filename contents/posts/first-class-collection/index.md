---
title: "일급 컬렉션"
date: 2022-04-15
update: 2022-04-15
tags:
 - java
 - 일급 컬렉션
feed:
  enable: false
---


## 일급 컬렉션

`일급 컬렉션(First Class Collection)`이란 `Collection`을 `Wrapping`하며 그외 다른 인스턴스 변수가 없는 상태를 말한다. 이러한 Wrapping이 가져오는 `이점`은 아래와 같다.

 1. `비즈니스에 종속적인 자료구조`로 사용이 가능하다.
 2. Collection의 `불변성을 보장하도록 구현`할 수 있다.
 3. 해당 Collection에 대한 `행위 까지 한 곳에서 관리`할 수 있다.

간단히 정리하면 `비즈니스에 맞는 이름을 가지는 Collection을 만드는 것`이다.

간단한 예시를 들어보면 스터디 개설 및 운영을 위한 시스템 개발을 진행한다고 가정한다. 한 스터디에는 다수의 스터디원을 등록할 수 있다. 

스터디원을 나타내는 `Student`이다.

```java
public class Student {
    private String name;
    private int age;
    ...
}
```

한 스터디에는 다수의 스터디원을 가질 수 있다. 간단히 표시하면 아래와 같이 단순히 `List`를 활용하여 표현할 수 있다.

```java
public class Study {
    private String name;
    private List<Student> students;
    ...
}
```

일급 컬렉션은 이러한 `List<Student> students`를 Wrapping하여 구현한다. 앞서 언급한 것 처럼 인스턴스 변수는 students `오직 하나`이다.

```java
public class Students {
    private List<Student> students;

    public Students(List<Student> students) {
        this.students = students;
    }
}
```

일급 컬렉션으로 개선한 Study 이다.

```java
public class Study {
    private String name;
    private Students students;
    ...
}
```

## 이점 살펴보기

위에서 작성한 스터디 개설 및 운영 시스템 활용한다. 스터디 개설을 위해서는 아래와 같은 조건이 필요하다고 가정한다.

 * 스터디 개설을 위해서는 `적어도 5명`의 스터디원이 필요하다.

```java
public class Students {
    public static final int STUDENTS_MIN_SIZE = 5;
    
    private List<Student> students;

    public Students(List<Student> students) {
        validateSize(students);
        this.students = students;
    }

    private void validateSize(List<Student> students) {
        if (students.size() < STUDENS_MIN_SIZE) {
            throw new IllegalArgumentException();
        }
    }
}
```

스터디원의 수가 적절한지 `직접 검증`한다. 외부에 의존하여 검증을 진행하는 것이 아니라 상태와 행위를 일급 컬렉션 안에서 모두 진행할 수 있다.

또한 `적어도 5명이 필요한 Student List`는 기존에 제공되는 자료구조가 아니다. 해당 비즈니스(스터디 개설 및 운영 시스템)에 `종속된 자료구조`로 `추가적인 요구사항`에 유연하게 대처할 수 있다.

이제 Students에 대한 로직은 `자체적으로 처리`가 가능하다. Students는 오직 `스터디원에 대한 책임(검증 행위 등)`만 가질 수 있다.

## References

[일급 컬렉션 (First Class Collection)의 소개와 써야할 이유](https://jojoldu.tistory.com/412)<br>
[일급 컬렉션을 사용하는 이유](https://tecoble.techcourse.co.kr/post/2020-05-08-First-Class-Collection/)