---
title: Garbage Collection란?
tags: ['Java', 'GC']
---

# Garbage Collection 란?

`Garbage Collection`은 `JVM` 상에서 더 이상 사용되지 않는 데이터가 할당되어 있는 메모리를 해제시켜준다. 보통 `GC`가 JVM `Heap 영역`에 있는 객체 중 참조되지 않는 데이터를 `자동적`으로 해제시켜주기 때문에 개발자는 `메모리 관리`를 `직접적으로 해줄 필요가 없다.`

이러한 `GC`로 인하여 `한정된 메모리`를 `효율적`으로 사용할 수 있도록 도와주고 개발자들에게 `메모리 관리`를 위한 `부담을 줄여준다.`

## Weak Generational Hypothesis

`GC`를 성공적으로 수행하는 `Algorithm`으로 설계하기 위해서는 `Weak Generational Hypothesis` `가설`이 필요하다. 

::: tip Weak Generational Hypothesis
 * 대부분의 객체는 금방 접근 불가능 상태(unreachable)가 된다.
 * 오래된 객체에서 젋은 객체로의 참조는 아주 적게 존재한다.
:::

이러한 가설을 바탕으로 GC가 수행될 수 있도록 하는 알고리즘은 기본적으로 `Mark And Sweep Algorithm`과 `Mark And Compact Algorithm`이 존재한다.

### Mark And Sweep Algorithm
어떤 `heap` 영역에 할당된 객체가 유효한 참조가 있으면 `reachability`이고 없다면 `unreachability`로 판단한다. 하나의 객체는 다른 객체를 참조하고, 다른 객체는 또 다른 객체를 참조할 수 있기 때문에 `참조 사슬`이 형성된다. 이러한 참조 사슬 중 최초에 참조한 것을 `Root Set`이라고 한다. `Heap` 영역에 있는 객체들은 4가지 경우에 대한 참조를 가진다.

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/137903377-d2671165-d22c-45aa-83a2-25b1d22c8503.png>
</p>

 1. heap 영역 내의 다른 객체에 의한 참조
 2. stack 영역에 지역변수와 매개변수들에 의한 참조
 3. native stack, JNI(Java Native Interface)에 의해 생성된 객체에 대한 참조
 4. 메서드 영역의 정적 변수에 의한 참조

이중 `2`, `3`, `4`가 `Root Set`이 될 수 있다.

`Root Set` 부터 출발하여 `참조되는 객체`들에 대해 `Mark`를 진행한다. 이 단계를 `Mark Phase`라고 한다. `Mark`되지 않은 객체들은 추적하여 삭제를 진행한다. 삭제를 진행하는 단계를 `Sweep Phase`라고 한다.

하지만 이러한 방식은 `메모리 단편화`를 야기한다. 이것을 해결하기 위해 `Mark And Compact Algorithm`이 등장하였다.

### Mark And Compact Algorithm

`Mark And Compact Algorithm`은 `Mark And Sweep Algorithm`와 동일하게 `Mark`를 진행하고 참조되지 않는 객체를 `삭제`한다. 더 나아가 `메모리를 정리`하여 `메모리 단편화`를 `해결`한다.

## Minor GC와 Major GC

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/137896624-df70dfad-8b21-482b-85f9-b478484df4b6.png>
</p>

### Minor GC
새로 생성된 대부분의 객체(인스턴스)는 `Eden` 영역에 위치한다. `Eden` 영역에서 GC가 발생한 후 살아남은 객체는 두개의 `Suvivor` 영역 중 하나로 이동한다. 이 과정은 반복되며 계속 살아남는 객체는 일정 시간 참조되고 있다는 의미로 `Old` 영역으로 이동한다. 이때도 짧은 시간의 `stop-the-world`가 일어나지만 무시 가능한 짧은 시간이기 때문에 이루어지지 않는다고 간주한다.

### Major GC
Old 영역에 있는 모든 객체들을 검사하여 참조되지 않는 객체들을 `한꺼번에 삭제`한다. 그렇기 때문에 상당히 긴 시간 동안 `stop-the-world`이 이루어진다.

::: tip stop-the-world
`GC`가 일어나면 `GC`를 담당하고 있는 스레드를 제외한 모든 스레드는 일시적으로 작동이 `정지`된다. 이것을 `stop-the-world`라고 한다. 빈번한 GC 호출은 성능을 저하시킨다. GC 튜닝이란 결국 `stop-the-world`의 시간을 줄이는 것이 핵심이다. 이것은 `Mark And Compact Algorithm`을 기반한 여러 GC 방식들을 적용하면 해결 가능하다.
:::

## GC 방식 변경

Java 애플리케이션 실행 시 다양한 종류의 GC로 변경하여 상황에 맞게 튜닝이 가능하다.

```bash
java -XX:+UseSerialGC javaApplication
java -XX:+UseParallelGC javaApplication
...
```

모든 Java 기반의 서비스에서 GC 튜닝이 필수적인 것은 아니다. 운영하고 있는 서비스의 GC를 적게 하도록 객체 생성을 줄이는 작업이 더 우선적이다. 

## References

[Java Reference와 GC](https://d2.naver.com/helloworld/329631)<br>
[Garbage Collection 튜닝](https://d2.naver.com/helloworld/37111)<br>
[JVM에 관하여 - Part 4, Garbage Collection 기초](https://tecoble.techcourse.co.kr/post/2021-08-30-jvm-gc/)<br>
[가비지컬렉션(Garbage Collection)/JVM 구동원리에 이어서](https://asfirstalways.tistory.com/159)<br>

<TagLinks />