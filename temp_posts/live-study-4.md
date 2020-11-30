---
title: "4주차 과제: 제어문"
# excerpt: "GitHub Blog 서비스인 github.io 블로그 시작하기로 했다."

categories:
  - Java
  - Live-study
tags:
  - java
  - livestudy
  - 선택문
  - 반복문
  - JUnit5
  - LinkedList
  - stack
  - queue
last_modified_at: 2020-11-26 23:00:00 +0900
---

## 목표

자바가 제공하는 제어문을 학습하세요.

---

## 학습할 것

 - 1. 선택문
 - 2. 반복문
 - 과제 0. JUnit 5 학습하세요.
 - 과제 1. live-study 대시 보드를 만드는 코드를 작성하세요.
 - 과제 2. LinkedList를 구현하세요.
 - 과제 3. Stack을 구현하세요.
 - 과제 4. 앞서 만든 ListNode를 사용해서 Stack을 구현하세요.
 - (optional) 과제 5. Queue를 구현하세요.

---

### 제어문 이란?

&nbsp; Java의 인터프리터는 위에서 아래로, 오른쪽에서 왼쪽으로 코드를 해석한다. 그런 흐름을 변경할 수 있는 것이 제어문이다.



### 1. 선택문

Java에서는 if-else와 switch로 제공된다.

#### 1.1 if-else

```java
if (조건) {
    // ...
}
```
```java
if (조건) {
    // ...
} else {
    // ...
}
```
실행되는 코드가 한 줄이면
```java
if (조건)
    // ...
```
```java
if (조건)
    // ...
else 
    // ...
```

&nbsp; 해당 조건이 true이면 중괄호 안에 코드를 실행하고 조건문을 벗어난다. false이면 해당 조건을 무시하거나 else가 있다면 처리한다.

#### 1.2 if-else if
```java
if (조건) {
    // ...
} else if (조건) {
    // ...
} else if (조건) {
    // ...
} else {
    // ...
}
```
&nbsp; 위에서 부터 조건문을 실행하고 true이면 해당 코드를 실행하고 조건문을 벗어난다. if-else if의 경우, 위에서 부터 조건을 확인하기 때문에 뒤에 조건에 걸리길 원하지만 초기의 조건문에 걸릴 수 있기 때문에 조건에 배치 순서에 유의해서 작성해야 한다.

#### 1.3 switch 
```java
switch(수식) {
    case value1:
        // ...
        break;
    case value2:
        // ...
        break;
    ..
    ..
    default:
        // 모든 case에 해당하는 값이 없거나 break가 걸리지 않았을 때
}
```

&nbsp; 위에서 부터 수식에 결과 값을 case마다 비교한다. 일치하면 해당 case에 코드를 실행한다. break가 있다면 조건문을 벗어난다. 하지만 break가 없다면 밑에 case와 또다시 비교한다. 

참고 : [https://raccoonjy.tistory.com/10](https://raccoonjy.tistory.com/10)

---

### 2. 반복문

#### 2.1 while

```java
while (조건) {
    // ...
}
```

&nbsp; 조건이 true이면 해당 loop를 계속 반복한다. loop를 실행하던 도중 break를 만나거나 조건이 false가 되면 즉시 loop를 탈출한다. loop를 멈출 수 있는 flag가 없다면 무한루프에 빠질 수 있다.

#### 2.2 do-while

```java
do {
    // ...
} while (조건);
```
&nbsp; 일반적인 while문과 상당부분 유사하지만 do-while문은 적어도 한번의 loop를 실행한다. 초기 조건을 비교하기 전에 처리해야 될 코드가 있을 때 혹은 무조건 한번 이상 실행시켜야 할 경우 유용하게 사용된다.

#### 2.3 for
```java
for (초기식; 조건; 증감) {
    // ...
}
```
&nbsp; 초기의 값을 선언하여 해당 값이 조건에 충족되는 동안 loop를 반복한다. for은 loop의 횟수가 정해져 있을 때 유용하게 사용될 수 있다. 

#### 2.4 for each

&nbsp; for each는 java 5 부터 추가되었다. for each라는 키워드가 있는것은 아니다. 기존 for문을 살짝 수정하면 바로 적용할 수 있다.

```java
for (타입 값 : iterate) {
    // ...
}
```

&nbsp; iterate 객체에서 하나씩 순차적으로 값에 대입되어 loop를 수행한다. list나 map등의 모든 항목들을 탐색할 때 매우 직관적이고 유용하게 사용할 수 있다. 하지만 기존의 for문 자체에서 횟수를 제어할 수는 없다.

참고 : [https://raccoonjy.tistory.com/10](https://raccoonjy.tistory.com/10)
참고 : [https://wikidocs.net/264](https://wikidocs.net/264)

---

### 기타 제어문

&nbsp; 제어문, 즉 선택문과 반복문은 중첩하여 사용할 수 있다. 중첩된 제어문들을 탈출하거나 지속하기 위해서는 break와 continue가 필요하다.

 - break : 반복문을 즉시 탈출한다.
 - continue : 반복문의 이하 코드를 실행하지 않고 다음 loop로 건너뛴다.

---

### [더 알아보기] java에서 이중루프를 빠져나가고 싶다면?

&nbsp; 일반적인 break는 하나의 loop만을 빠져나갈 수 있다. 중첩된 loop를 빠져나가고 싶다면 for문 위에 label를 명시해 두면 된다. 해당 label이 명시된 break를 만난다면 중첩된 반복문을 모두 빠져나온다.

```java
loop: 
for (...) {
    for (...) {
        if (...) {
            break loop;
        }
    }
}
```

---