---
title: 컬렉션 리스트를 정렬하는 방법
tags: ['java', 'Collections', 'sort', 'List']
---

# 컬렉션 리스트를 정렬하는 방법

**OpenJdk azul-11을 기반으로 작성하였습니다. 오개념이나 잘못된 부분이 있으면 dev.hyeonic@gmail.com로 많은 피드백 부탁드립니다!**

## 다양한 정렬 방법

컬렉션 리스트를 정리하는 방법에는 여러가지가 있다. 대표적으로 Java API에 제공되는 메서드로는 아래와 같은 방법들이 있다.

 * Collections 클래스의 `public static <T extends Comparable<? super T>> void sort​(List<T> list)`
 * List 인터페이스의 `default void sort​(Comparator<? super E> c)`

## Collections.sort()

Collections 클래스는 `Java 1.2`때 추가되었다. 내부에는 컬렉션을 조작하기 위한 `정적 메서드`로 구성되어 있다. 

그중 sort 메서드는 아래와 같다.

::: tip Collections.sort()

Sorts the specified list into ascending order, according to the natural ordering of its elements. All elements in the list must implement the Comparable interface. Furthermore, all elements in the list must be mutually comparable (that is, e1.compareTo(e2) must not throw a ClassCastException for any elements e1 and e2 in the list).

**요소의 자연적인 순서에 따라 지정된 목록을 오름차순으로 정렬한다. 목록의 모든 요소는 비교 가능한 인터페이스로 구현해야 한다. 또한 목록의 모든 요소는 상호 비교 가능해야 한다. (e1.compareTo(e2)는 목록의 요소 e1과 e2에 대해 ClassCastException을 발생시키지 않아야 한다.)**

This sort is guaranteed to be stable: equal elements will not be reordered as a result of the sort.

**이 정렬은 stable하다. 정렬의 결과로 동일한 요소가 재정렬되지 않는다.**

The specified list must be modifiable, but need not be resizable.

**지정한 목록은 수정할 수 있어야 한다. 하지만 크기는 유지되기 때문에 조정할 필요 없다.**
:::

간단히 정리하면 CompareTo 메서드를 오버라이딩한 객체 컬렉션을 오름차순 정렬 한다. 아래는 간단한 사용 예시이다.

```java
List<String> words = new ArrayList<>(
    List.of("java", "c", "c++", "c#", "python", "ruby", "kotlin"));

Collections.sort(words);
words.forEach(System.out::println);
```

```bash
c
c#
c++
java
kotlin
python
ruby
```

오름차순 정렬되는 것을 확인할 수 있다. 내부 구현을 간단히 살펴보았다.

```java
public class Collections {
    ...
    public static <T extends Comparable<? super T>> void sort(List<T> list) {
        list.sort(null);
    }
    ...
}
```

단순히 인자로 제공된 list의 default 메서드인 sort(Compartor)로 redirect시키고 있다.

## list.sort(Comarator)

`Java 8`에는 인터페이스에 `default` 키워드를 활용하면 메서드의 내부 구현까지 가능하다. 그중 List 인터페이스의 `sort` 메서드도 한 예시이다. 

::: tip list.sort(Compartor)

Sorts this list according to the order induced by the specified Comparator. 

**지정된 Compartor에서 유도한 순서에 따라 목록을 정렬한다.**

The sort is stable: this method must not reorder equal elements.

**정렬은 stable하다. 이 메서드는 동일한 요소의 순서를 다시 지정할 수 없다.**

All elements in this list must be mutually comparable using the specified comparator (that is, c.compare(e1, e2) must not throw a ClassCastException for any elements e1 and e2 in the list).

**해당 목록의 모든 요소는 지정된 Comparator를 사용하여 상호 비교 가능해야 한다. (즉, c.compare(e1, e2)는 목록의 모든 요소 e1 및 e2에 대해 ClassCastException을 발생 시키지 않아야 한다.)**

If the specified comparator is null then all elements in this list must implement the Comparable interface and the elements' natural ordering should be used.

**지정된 Comparator가 null인 경우 이 목록의 모든 요소는 비교 Comparable 인터페이스를 구현해야 하며 요소의 자연스러운 순서를 사용해야 한다.**

This list must be modifiable, but need not be resizable.

**이 목록은 수정할 수 있어야 하지만 크기를 조정할 필요는 없다.**
:::

간단히 정리하면 인자로 주어진 Comparator 구현체를 활용하여 목록을 비교하고 유도한 순서에 따라 목록을 정렬한다. 

아래는 간단한 사용 예시이다.
```java
List<String> words = new ArrayList<>(
    List.of("java", "c", "c++", "c#", "python", "ruby", "kotlin"));

words.sort((s, anotherString) -> s.compareTo(anotherString));
 words.forEach(System.out::println);
```

```bash
c
c#
c++
java
kotlin
python
ruby
```

## 왜 이렇게 다양한가

```java
public class Collections {
    ...
    public static <T extends Comparable<? super T>> void sort(List<T> list) {
        list.sort(null);
    }

    public static <T> void sort(List<T> list, Comparator<? super T> c) {
        list.sort(c);
    }
    ...
}
```

두 메서드의 존재를 확인한 후 한 가지 의문이 들었다. Collections의 sort 메서드들은 단순히 List의 sort 메서드로 redirect할 뿐이다. 같은 역할은 하는 메서드지만 Java 8 이전에 사용하던 메서드를 남긴 이유가 궁금하였다.

그에 대한 해답은 [Difference between Collections.sort(list) and list.sort(Comparator)
](https://stackoverflow.com/questions/34910841/difference-between-collections-sortlist-and-list-sortcomparator)에서 찾아볼 수 있었다. 

::: tip Question: Difference between Collections.sort(list) and list.sort(Comparator)
Is there any reason why I should prefer Collections.sort(list) method over simply calling the list.sort()? Internally Collections.sort merely calls the sort method of the List class anyway.

**단순히 list.sort()를 호출하는 것보다 Collections.sort(list) 방법을 선호할 이유가 있는가? 내부 Collections.sort는 List 클래스의 정렬 메서드만 호출한다.**

It's just surprising that almost everyone is telling me to use Collections.sort. Why?

**다들 Collections.sort를 쓰라고 한다. 이유는 무엇인가?**
:::

::: tip Answer

The method List.sort(comparator) that you are refering to was introduced in Java 8, whereas the utility method Collections.sort has been there since Java 1.2.

**List.sort(comparator) 메서드는 Java 8에 도입된 반면, 유틸리티 메서드인 Collections.sort는 Java 1.2부터 존재해왔다.**

As such, you will find a lot of reference on the Internet mentioning that utility method but that's just because it has been in the JDK for a lot longer.

**단지 JDK가 훨씬 더 오래 있었기 때문에 Collections.sort를 활용한 방법을 더 많이 접할 뿐이다.**

Note that the change in implementation for Collections.sort [was made in 8u20](https://stackoverflow.com/questions/34827309/why-does-collections-sortlist-work-in-java-8-with-copyonwritearraylist-but-not/34827492#34827492).

**Collections.sort의 내부 구현은 변경되었다. [Why does Collections.sort(List) work in Java 8 with CopyOnWriteArrayList but not in Java 7?](https://stackoverflow.com/questions/34827309/why-does-collections-sortlist-work-in-java-8-with-copyonwritearraylist-but-not/34827492#34827492)**
:::

또 다른 답변을 확인하고 정확히 이해할 수 있었다.

::: tip Answer

This is simply a change to the APIs. With a language with such wide spread adoption as Java, what typically happens is for a period of time, the older method is preferable, to maintain legacy support.

**이것은 단순히 API에 대한 변화이다. Java와 같이 광범위한 언어를 사용하는 경우 일반적으로 일정 기간 동안 발생하는 레거시 지원을 유지하기 위해서는 이전 방법이 더 좋다.**

After this period of time, the older API becomes deprecated (or perhaps not, both can remain in place indefinitely). Within this time period improvements may be made to the new API causing its functionality to diverge slightly from the original implementation, encouraging developers to adopt it. The requirements/results of the new API may diverge slightly, and the implementation may change dramatically.

**시간이 지나면 오래된 API는 더 이상 사용되지 않는다(또는 두 API 모두 무기한 그대로 유지될 수 있다). 이 기간 내에 새로운 API가 개선되어 기능이 원래 구현에서 약간 벗어나 개발자들이 이를 채택하도록 장려할 수 있다. 새로운 API의 요구사항/결과는 약간 다를 수 있으며, 구현 방식은 크게 달라질 수 있다.**

Then, eventually, the new API takes over, and the older API is no longer required and removed. In a language with as wide of adoption as Java this can take years, or decades. Developers can have a plan to remove an API, but be forced to leave it in by the community.

**결국 새로운 API가 그 자리를 차지하게 되고, 이전 API는 더 이상 필요하지 않고 제거된다. 하지만 널리 채택되어 사용되는 Java는 몇 년 혹은 몇 십년이 걸릴 수 있다. 개발자들은 API를 제거하려는 계획을 세울 수 있지만 커뮤니티에 의해 API를 남겨두도록 강요받을 수 있다.**
:::

## 정리

정리하면 `Collections 클래스`는 인터페이스의 `default 키워드`의 등장 이전, 즉 Java 8이전에 사용하던 `유틸리티 클래스`이다. default 키워드가 존재하지 않기 때문에 해당 클래스를 조작하기 위해서는 외부에 새롭게 정의해야 했다. 

하지만 `Java 8` 이후로 List 인터페이스 내부에서도 구현 로직을 작성할 수 있게 되었다. 하지만 Java는 다양한 분야에서 넓게 사용되기 때문에 기존에 사용하던 API의 삭제는 매우 큰 리스크를 가지고 있다. 즉 이전 버전에 적용되던 코드의 `하위 호환성`을 위해서 기존 API의 내부 구현을 변경하는 방식으로 개선되었다.

## References

[Class Collections](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/Collections.html#sort(java.util.List))<br>

[Interface List](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/List.html#sort(java.util.Comparator))<br>

[Difference between Collections.sort(list) and list.sort(Comparator)](https://stackoverflow.com/questions/34910841/difference-between-collections-sortlist-and-list-sortcomparator)<br>

[Why does Collections.sort(List) work in Java 8 with CopyOnWriteArrayList but not in Java 7?](https://stackoverflow.com/questions/34827309/why-does-collections-sortlist-work-in-java-8-with-copyonwritearraylist-but-not)

<TagLinks />