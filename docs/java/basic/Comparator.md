---
title: Comparator 활용
tags: ['Java', '객체 비교', 'Comparator']
---

# Comparator 활용

[https://docs.oracle.com/javase/8/docs/api/java/util/Comparator.html#method.summary](https://docs.oracle.com/javase/8/docs/api/java/util/Comparator.html#method.summary)

`Comparator` 인터페이스는 메소드의 body가 없는 추상 메소드인 `compare(T o1, T o2)`가 하나만 존재하는 `함수형 인터페이스`이다. 그외 선언된 메소드들은 Java 8 이후 등장한 default 메소드로 이루어져 있다. 그렇기 때문에 해당 인터페이스를 구현하기 위해서는 `compare` 메소드만 재정의하여 사용하면 된다.

`Comparator`는 `두 객체`를 `비교`하기 위한 객체이다. 새롭게 정의한 클래스 객체에는 다양한 필드들이 존재하기 때문에 `특정한 규칙` 없이는 두 객체를 비교할 수 없다.

## Person.java
```java
public class Person {

    private final int age;
    private final String name;

    public Person(int age, String name) {
        this.age = age;
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public String getName() {
        return name;
    }
}
```

위 코드는 간단히 새롭게 정의한 `Person` 클래스이다. `나이 정보`인 age와 `이름 정보` name을 가지고 있다. 만약 사람들을 `나이가 큰 순`, `나이가 같다면 이름 사전 순`으로 정렬한다고 가정해보자. 
우리는 새롭게 정의한 `Person` 클래스를 서로 `비교`해야 한다. 단순히 나이 비교만 한다면 문제 없지만 나이가 같은 경우에는 사전 순으로 정렬해야 한다. 

사람들을 줄세우는 방법은 위 방법으로 끝이 아니다. `나이가 작은 순`으로 정렬할 수도 있고, `이름을 사전 역순`으로 정렬할 수도 있다. 매번 `정해지지 않은 규칙`들로 인하여 부가적인 코드들이 늘어날 것이다.

그 중 `Comparator` 인터페이스의 `compare` 메소드는 매개변수로 전달된 `두 객체`를 비교한다.

## 정렬에서 compare 메소드

독립적으로 넘어온 두 매개변수를 비교하는 메소드이다. 사용자가 구현하는 방식에 따라 `compare` 메소드는 `양수`, `0`, `음수`로 반환이 가능하다. 보통은 양수는 `1`, 음수는 `-1`로 표현한다.

정렬과 compare 메소드는 매우 긴밀한 연관을 가지고 있다. 어떠한 리스트를 오름차순, 혹은 내림차순 정렬을 위해서는 리스트의 원소들을 매번 비교해야 한다. 하지만 리스트의 원소들이 Person과 같이 `새롭게 정의한 클래스`인 경우 특정한 `규칙`이 없기 때문에 `정렬`이 불가능하다.

Java에서 정렬은 기본적으로 `오름차순`이 기본이다. 오름차순은 선행 원소의 크기가 후행 원소의 크기 보다 작다.

결국 기준 원소인 선행 원소를 기준으로 후행원소 보다 작으면 `음수`이므로 두 원소의 `위치`를 `교환하지 않는다`.
선행 원소가 후행 원소보다 크다면 `양수`이므로 오름차순 정렬을 위해 두 원소의 `위치`를 `교환`한다.

위의 기준은 단순히 오름차순인 경우를 예시로 든 것이다. 만약 사용자가 `내림차순` 정렬을 하고 싶다면 위에서 명시한 방법과 반대로 행하면 된다.

이런 부분은 사용자가 compare 메소드를 `어떤식으로 구현하냐`에 따라 달라진다. 즉 상황에 맞게 compare 메소드를 구현하여 적절히 사용하면 된다.

## compare 메소드 구현

`Comparator` 인터페이스는 `추상 메소드`를 1개만 가진 `함수형 인터페이스`이다. 즉 익명 클래스 구현하여 사용할 수 있다.

List 인터페이스에는 sort() default 메소드가 존재한다. 해당 메소드는 매개변수로 Compartor를 받도록 되어 있다. 
즉 우리는 요구사항에 맞춰 compare 메소드의 내용을 구현하여 전달하기만 하면 된다.

아래는 간단한 사용 방법이다.

```java
public class Main {

    public static void main(String[] args) {

        List<Person> personList = new ArrayList<>();
        personList.add(new Person(10, "personA"));
        personList.add(new Person(20, "personB"));
        personList.add(new Person(30, "personC"));
        personList.add(new Person(15, "personD"));
        personList.add(new Person(15, "personE"));
        personList.add(new Person(20, "personF"));

        personList.sort((o1, o2) -> {
            // 선행 원소의 age가 더 작은 경우 두 원소를 교환하지 않는다.
            // 즉, 오름차순 정렬이다.
            if (o1.getAge() < o2.getAge()) {
                return -1;
            // 원소의 나이가 같은 경우 name을 사전순, 즉 문자열 오름차순 정렬한다.
            } else if (o1.getAge() == o2.getAge()
                    && o1.getName().compareTo(o2.getName()) < 0) {
                return -1;
            }
            // 위에 해당하지 않는 경우 두 원소를 교환한다.
            return 1;
        });

        for (Person person : personList) {
            System.out.println(person.getAge() + " " + person.getName());
        }
    }
}
```

```
10 personA
15 personD
15 personE
20 personB
20 personF
30 personC
```

출력 결과를 살펴보면 나이 `오름차순`, 이름은 `사전순`으로 정렬된 것을 확인 할 수 있다. 

이처럼 다양한 방식으로 `compare` `메소드`를 구현하면 의도에 따라 다양한 방법으로 정렬이 가능하다.

## 더 생각해보기

Compare 메소드가 반환하는 값은 양수, 0, 음수로 크게 3가지 경우이다. 보통 0은 두 원소가 같을 때 반환한다.
정렬을 생각해보면 두 원소가 같으면 위치를 이동하거나 하지 않아도 값은 동일하게 나타난다.

구글링 중 재밌는 질문을 찾게 되었다. 

[why we need to return 0 when Comparator.compare become equal](https://stackoverflow.com/questions/58267950/why-we-need-to-return-0-when-comparator-compare-become-equal)

::: tip
Only certain, stable sort algorithms will treat negative values and 0 the same. It may be handled differently with other algorithms. Besides that, you copied the error of the OP to assume that a comparator has to return one of -1, 0, or +1. A comparator can return any int value, if nonzero, only the sign matters. – Holger Oct 25 '19 at 10:56 
:::

특정한 안정적인 정렬 알고리즘만 음수 값과 0일 `동일`하게 처리한다고 한다. 다른 알고리즘이 동일하게 처리하는 것을 보장하지 않기 때문에 `의도와 다르게` 처리될 여지가 있다. 결국 compare 메소드는 양수, 0, 음수를 `모두 반환`하도록 처리하는 것이 바람직하다!

## References

[자바 [JAVA] - Comparable 과 Comparator의 이해](https://st-lab.tistory.com/243)<br>
[Interface Comparator](https://docs.oracle.com/javase/8/docs/api/java/util/Comparator.html)<br>
[why we need to return 0 when Comparator.compare become equal](https://stackoverflow.com/questions/58267950/why-we-need-to-return-0-when-comparator-compare-become-equal)


<TagLinks />