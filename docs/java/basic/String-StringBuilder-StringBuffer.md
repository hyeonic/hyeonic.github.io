---
title: String, StringBuilder, StringBuffer
tags: ['Java', 'String', 'StringBuilder', 'StringBuffer']
---

# String, StringBuilder, StringBuffer

## String

String은 Java의 대표적인 `(Immutable Object)불변 객체`이다. `+ 연산자`를 통하여 문자열을 붙이는 경우 기존 문자열에 유연하게 추가하는 것이 아니라 `새롭게 객체를 할당`하여 반영한다.

```java
String str = "hello";
String += "world";
```

위 코드의 메모리 구조를 간략히 표현하면 아래와 같다.

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/144744257-f98b00a2-7d1b-4faa-932e-e9c4a37285ad.png>
</p>

str 참조 변수는 "hello" 객체를 참조하다가 "helloworld" 객체를 참조하도록 `재할당`한다. 기존에 참조하던 "hello"는 GC에 의해 사라진다.

```java
String str = "hello";
System.out.println(System.identityHashCode(str));
str += "world";
System.out.println(System.identityHashCode(str));
```

아래 출력 결과를 보면 서로 다른 주소 값을 가지고 있는 것을 확인할 수 있다.

```bash
968514068
785992331
```

::: tip identityHashCode(Object x)
String은 문자열 value를 활용하여 hashCode를 생성한다. 만약 같은 문자열을 가지고 있을 경우 같은 hashCode를 반환한다. identityHashCode를 사용하면 오버라이딩이 안된 객체 고유한 hashCode를 반환한다.
:::

즉 문자열을 수정하는 시점에 새로운 `String 인스턴스`가 생긴다. String으로 생성한 문자열이 빈번하게 수정되면 힙 메모리에 많은 가비지가 생성되어 해당 애플리케이션에 치명적인 영향을 끼칠 우려가 있다.

## 가변성

이를 해결하기 위해 `가변성`을 가지는 `StringBuffer`와 `StringBuilder`를 도입했다. 내부의 `append()`, `delete()` 등을 사용하면 동일 객체내에서 문자열 변경을 가능하게 한다.

StringBuffer와 StringBuilder는 동일한 인터페이스를 지원한다. 가장 큰 차이점은   `synchronized` 키워드를 활용한 `동기화의 유무`이다.

## StringBuffer

`StringBuffer`는 대부분의 메서드를 `synchronized` 키워드를 사용하여 동기화하고 있다. 덕분에 멀티 스레드 환경에서 안전하게 사용이 가능하다. 

```java
public final class StringBuffer
    extends AbstractStringBuilder
    implements java.io.Serializable, Comparable<StringBuffer>, CharSequence
{
    ...
    @Override
    @HotSpotIntrinsicCandidate
    public synchronized StringBuffer append(String str) {
        toStringCache = null;
        super.append(str);
        return this;
    }

    public synchronized StringBuffer append(StringBuffer sb) {
        toStringCache = null;
        super.append(sb);
        return this;
    }
    ...
}
```

## StringBuilder

동기화를 보장하지 않는 `StringBuilder`보다 `멀티 스레드에서 안전`한 `StringBuffer`가 항상 좋다고 생각할 수 있다. 

하지만 `sychronized`를 사용하여 `lock을 걸고 푸는 과정`에서 생기는 오버헤드로 인하여 속도가 느리다. 단편적으로 보면 동기화를 신경 쓰지 않는 `StringBuilder`가 보다 빠른 속도를 가지고 있다.

## References

[Java - System.identityHashCode()와 hashCode()의 차이점](https://codechacha.com/ko/java-system-identityhashcode/)<br>
[String 클래스를 조심히 사용하자.](https://tecoble.techcourse.co.kr/post/2020-06-15-String-vs-StringBuilder-vs-StringBuffer/)<br>
[[Java] String, StringBuffer, StringBuilder 차이 및 장단점](https://ifuwanna.tistory.com/221)

<TagLinks />