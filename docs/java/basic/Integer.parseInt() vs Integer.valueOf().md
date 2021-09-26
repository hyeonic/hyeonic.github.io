---
title: Integer.parseInt() vs Integer.valueOf()
tags: ['java']
---

# Integer.parseInt() vs Integer.valueOf()

알고리즘 문제 해결을 위해 문자열을 정수형태로 바꾸려 할 때 문득 Integer.parseInt()와 Integer.valueOf()의 차이가 뭔지 궁금하였다.

우선 Integer.parseInt 메소드와 Integer.valueOf 메소드의 코드를 살펴보았다.

## Integer.parseInt

```java
public static int parseInt(String s, int radix) throws NumberFormatException
public static int parseInt(CharSequence s, int beginIndex, int endIndex, int radix) throws NumberFormatException
public static int parseInt(String s) throws NumberFormatException 
```

parseInt의 경우 3가지 메소드로 오버로딩 되어 있다. 유심해서 살펴봐야 할 부분은 반환타입이 int인 기본형으로 되어 있는 것이다.


## Integer.valueOf

```java
public static Integer valueOf(String s, int radix) throws NumberFormatException
public static Integer valueOf(String s) throws NumberFormatException
public static Integer valueOf(int i)
```

valueOf의 경우 반환타입이 wrapper 클래스인 Integer이다. 또한 기본형 타입을 Integer로 반환하기 위해 사용되기도 한다.

이러한 ValueOf는 훨씬 더 나은 공간 및 시간 성능을 제공하기 때문에 java 9 이후부터 **public Integer(int value)** 형태의 생성자 사용을 deprecated 하게 만들었다.

더불어 **public Integer(String s)** 생성자 보다 반환타입이 기본형인 경우 parseInt를, Integer 타입인 경우 valueOf의 사용을 권장한다. 

<p align='center'>
    <img src='https://user-images.githubusercontent.com/59357153/134804172-358fbf0b-1653-4ae0-a4f9-bf9c80383d15.png'>
</p>

## References.

[Integer](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/Integer.html){:.aligncenter}

<TagLinks />