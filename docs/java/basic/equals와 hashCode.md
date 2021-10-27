---
title: equals와 hashCode
tags: ['Java', 'equals', 'hashCode']
---

# equals와 hashCode

`hashCode`를 `equals`와 함께 재정의하지 hash 값을 사용하는 `Collection(HashSet, HashMap, HashTable)`을 사용할 때 문제가 발생한다.

## 문제 발생 이유

hash값을 사용하는 `Collection(HashSet, HashMap, HashTable)`은 객체가 논리적으로 같은지 비교할 때 아래와 같은 과정을 거친다. 

hashCode 메서드의 리턴 값이 일치하고 equals 메서드의 리턴 값이 true일 일 때 동등한 객체라고 판단한다.

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/139053686-091d9ca9-92c5-4103-8f1e-d4a1788a7166.png>
</p>

## References

[equals와 hashCode는 왜 같이 재정의해야 할까?](https://tecoble.techcourse.co.kr/post/2020-07-29-equals-and-hashCode/)

<TagLinks />