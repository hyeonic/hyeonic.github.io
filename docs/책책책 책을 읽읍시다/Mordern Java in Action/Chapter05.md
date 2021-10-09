---
title: Chapter05 스트림 활용
tags: ['Modern Java in Action', 'TODO']
---

# Chapter05 스트림 활용

스트림 API 내부적으로 다양한 최적화가 이루어질 수 있다. 스트림 API는 내부 반복 뿐 아니라 코드를 병렬로 실행할지 여부도 결정할 수 있다. 이러한 일은 순차적인 반복을 단일 스레드로 구현하는 외부 반복으로는 달성할 수 없다.

## 5.1 필터링

### 5.1.1 프레디케이트로 필터링

`fiter` 메서드는 `predicate`를 인수로 받아 `predicate와 일치하는 모든 요소`를 포함하는 스트림을 반환한다.

```java
List<Dish> vegetarianMenu = menu.stream()
        .filter(Dish::isVegetarian) // 채식 요리인지 확인하는 메서드 참조
        .collect(toList());
```

### 5.1.2 고유 요소 필터링

스트림은 고유 요소로 이루어진 스트림을 반환하는 distinct 메서드도 지원한다. 고유 여부는 스트림에서 만든 객체의 `hashCode`, `equals`로 결정된다. 

```java
List<Integer> numbers = Arrays.asList(1, 2, 1, 3, 3, 2, 4);
numbers.stream()
        .filter(i -> i % 2 == 0)
        .distinct()
        .forEach(System.out::println);
```

## 5.2 스트림 슬라이싱

### 5.2.1 프레디케이트를 이용한 슬라이싱

자바 9는 스트림의 요소를 효과적으로 선택할 수 있도록 takeWhile, dropWhile 두 가지 새로운 메서드를 지원한다.

#### TAKEWHILE 활용

다음과 같은 특별한 요리 목록을 갖고 있다고 가정한다.

```java
 List<Dish> specialMenu = Arrays.asList(
            new Dish("season fruit", true, 120, Dish.Type.OTHER),
            new Dish("prawns", false, 300, Dish.Type.FISH),
            new Dish("rice", true, 350, Dish.Type.OTHER),
            new Dish("chicken", false, 400, Dish.Type.MEAT),
            new Dish("french fries", true, 530, Dish.Type.OTHER));
```

이중 320 칼로리 이하의 요리를 선택하고 싶다. 이것은 앞서 배운 `filter` 메서드로 해결할 수 있을 것이다.

```java
List<Dish> filteredMenu = specialMenu.stream()
        .filter(dish -> dish.getCalories() < 320)
        .collect(toList());
```

하지만 요리 목록을 살펴보면 이미 `칼로리 오름차순`으로 정렬되어 있다. `filter` 연산을 이용하면 `전체 스트림을 반복`하며 각 요소에 `predicate`를 적용한다. 하지만 리스트가 `이미 정렬`되어 있기 때문에 `320 칼로리보다 크거나 같은 요리`가 나왔을 때 이러한 `반복 작업을 중단`할 수 있다.

이것은 `takeWhile`을 이용하여 간단히 처리할 수 있다. `무한 스트림`을 포함한 모든 스트림에 `predicate`를 적용하여 스트림을 슬라이스 할 수 있다.

```java
List<Dish> slicedMenu = specialMenu.stream()
        .takeWhile(dish -> dish.getCalories() < 320)
        .collect(toList());
```

#### DROPWHILE 활용

320 칼로리 보다 큰 요소를 탐색하기 위해서는 dropWhile를 활용하면 된다. dropWhile은 takeWhile과 정반대의 작업을 수행한다. predicate가 처음으로 거짓이 되는 지점까지 발견된 요소를 버린다. dropWhile 또한 무한한 남은 요소를 가진 `무한 스트림`에서도 동작한다.

```java
List<Dish> slicedMenu = specialMenu.stream()
        .dropWhile(dish -> dish.getCalories() < 320)
        .collect(toList());
```

#### 무한 스트림?

스트림은 `다량의 데이터 처리 작업`을 위해 자바 8에서 추가되었다. 데이터의 원소는 `유한`할 수도, `무한`할 수도 있다. 

스트림은 여러 개의 스트림을 연결하여 사용할 수 있다. 이것을 `파이프라인`이라고 부르는데, 특징은 시작 연산 부터 중간 연산을 거쳐 최종 연산으로 마무리된다. 시작 연산과 최종 연산 사이에는 하나 이상의 중간 연산이 존재할 수 있다. 

일련의 과정은 `지연 평가(Lazy evaluation)` 된다. 실제로 호출해서 값이 사용되는 것은 최종 연산이 이루어질 때 이다. 최종 연산에 사용되지 않은 데이터 원소는 계산에 사용되지 않는다. 이것이 무한 스트림을 다룰 수 있도록 해주는 열쇠가 된다.

::: tip
**지연 평가** 는 계산의 결과값이 필요할 때 까지 계산을 늦추는 기법이다. 실제로 호출해서 값이 사용되는 것은 최종 연산이 이루어질 때 이다.
:::

### 5.2.2 스트림 축소

스트림은 주어진 값 이하의 크기를 갖는 새로운 스트림을 반환하는 `limit(n)` 메서드를 지원한다. 스트림이 정렬되어 있으면 최대 요소 n개를 반환할 수 있다.

아래 코드는 predicate와 일치하는 처음 세 요소를 선택한 다음 즉시 결과를 반환한다.

```java
List<Dish> dishesLimit3 = menu.stream()
        .filter(d -> d.getCalories() > 300)
        .limit(3)
        .collect(toList());
```

정렬되지 않은 스트림에도 limit 사용이 가능하다. 하지만 결과가 정렬되어 있음을 보장할 수 없다.

### 5.2.3 요소 건너뛰기

스트림은 처음 n개의 요소를 제외한 스트림을 반환하는 skip(n) 메서드를 지원한다. n개 이하의 요소를 포함하는 스트림에 skip(n)을 호출하면 빈 스트림이 반환된다. 

```java
List<Dish> dishesSkip = menu.stream()
        .filter(d -> d.getCalories() > 300)
        .skip(2)
        .collect(toList());
```

## 5.3 매핑

### 5.3.1 스트림의 각 요소에 함수 적용하기

스트림은 `function`을 인수로 받는 `map` 메서드를 지원한다. 인수로 제공된 `function`은 각 요소에 적용되며 function을 적용한 결과가 새로운 요소로 `매핑`된다. 

::: tip
이 과정은 기존의 값을 '고친다'라는 개념보다 '새로운 버전을 만든다'라는 개념에 가까우므로 '변환'에 가까운 '매핑'이라는 단어를 사용한다.
:::

```java
List<String> dishNames = menu.stream()
        .map(Dish::getName)
        .collect(toList());
```

`getName`은 문자열을 반환하므로 `map` 메서드의 출력 스트림은 `Stream<String>`의 형식을 갖는다.

#### 다양한 예제들

1. 단어 리스트이 주어졌을 때 각 단어가 포함하는 글자수 리스트 반환
```java
List<String> words = Arrays.asList("Hello", "World");
List<Integer> wordLengths = words.stream()
        .map(String::length)
        .collect(toList());
```

2. 요리 리스트가 주어졌을 때 각 요리명의 길이 리스트 반환
```java
List<Integer> dishNameLengths = menu.stream()
        .map(Dish::getName)
        .map(String::length)
        .collect(toList());
```

### 5.3.2 스트림 평면화

리스트에서 고유 문자로 이루어진 리스트를 반환해보자.

```java
words.stream()
        .map(word -> word.split(""))
        .distinct()
        .forEach(System.out::println);
```

```
[Ljava.lang.String;@6108b2d7
[Ljava.lang.String;@1554909b
```

위 코드는 map으로 전달한 람다는 각 단어의 `String[]`을 반환한다. 그렇기 때문에 `map` 메서드가 반환한 스트림의 형식은 `Stream<String[]>`이 된다. 하지만 우리가 원하는 것은 `Stream<String>`이다.

#### map과 Arrays.stream 활용

우선 배열 스트림 대신 문자열 스트림이 필요하다. 자바에는 문자열을 받아 스트림을 만드는 `Arrays.stream()` 메서드가 있다. 하지만 결국 스트림 리스트가 만들어지면서 문제가 해결되지 않는다. 문제를 해결하려면 먼저 각 단어를 개별 문자열로 이루어진 배열로 만든 다음 각 배열을 별로의 스트림으로 만들어야 한다.

```java
words.stream()
        .map(word -> word.split("")) // 각 단어를 개별 문자열로 반환
        .map(Arrays::stream) // 각 배열을 별도의 스트림으로 생성
        .distinct()
        .forEach(System.out::println);
```

```
java.util.stream.ReferencePipeline$Head@13969fbe
java.util.stream.ReferencePipeline$Head@6aaa5eb0
```

#### flatMap 사용

```java
List<String> uniqueCharacters = words.stream()
        .map(word -> word.split("")) // 각 단어를 개별 문자를 포함하는 배열로 반환
        .flatMap(Arrays::stream) // 생성된 스트림을 하나의 스트림으로 평면화
        .distinct()
        .collect(toList());
```

`flatMap`은 각 배열을 스트림이 아니라 스트림의 콘텐츠로 매핑한다. `flatMap` 메서드는 스트림의 각 값을 다른 스트림으로 만든 다음에 모든 스트림을 하나의 스트림으로 연결하는 기능을 수행한다.

#### flatMap 응용

1. 두 개의 숫자 리스트가 있을 때 모든 숫자 쌍의 리스트를 반환한다.

```java
// 숫자 리스트
List<Integer> numbers1 = Arrays.asList(1, 2, 3, 4, 5);
List<Integer> numbers2 = Arrays.asList(6, 7, 8);

List<int[]> pairs = numbers1.stream()
        .flatMap((Integer i) -> numbers2.stream()
                .map((Integer j) -> new int[]{i, j})
        )
        .collect(toList());

pairs.forEach(pair -> System.out.printf("(%d, %d)", pair[0], pair[1]));
```

2. 더 나아가 합이 3으로 나누어 떨어지는 쌍만 반환한다.

```java
// 숫자 리스트
List<Integer> numbers1 = Arrays.asList(1, 2, 3, 4, 5);
List<Integer> numbers2 = Arrays.asList(6, 7, 8);

List<int[]> pairs = numbers1.stream()
        .flatMap((Integer i) -> numbers2.stream()
                .map((Integer j) -> new int[]{i, j})
        )
        .filter(pair -> (pair[0] + pair[1]) % 3 == 0)
        .collect(toList());
        
pairs.forEach(pair -> System.out.printf("(%d, %d)", pair[0], pair[1]));
```

## 5.4 검색과 매칭

### 5.4.1 프레디케이트가 적어도 한 요소와 일치하는지 확인

`predicate`가 주어진 스트림에서 적어도 한 요소와 일치하는지 확인할 때 `anyMatch` 메서드를 이용한다. anyMatch는 boolean을 반환하기 때문에 최종 연산이다.

```java
if (menu.stream().anyMatch(Dish::isVegetarian)) {
    System.out.println("The menu is (somewhat) vegetarian friendly!!");
}
```

### 5.4.2 프레디케이트가 모든 요소와 일치하는지 검사

`allMatch` 메서드는 스트림의 모든 요소가 주어진 `predicate`와 일치하는지 검사한다.

```java
boolean isHealthy = menu.stream()
        .allMatch(dish -> dish.getCalories() < 1000);
```

#### NONEMATCH

noneMatch는 allMatch와 반대 연산을 수행한다. noneMatch는 주어진 predicate와 일치하는 요소가 없는지 확인한다. 

```java
boolean isHealthy = menu.stream()
        .noneMatch(d -> d.getCalories() >= 1000);
```

`anyMatch`, `allMatch`, `noneMatch` 세 메서드는 스트림 **쇼트서킷** 기법, 즉 자바의 `&&`, `||`와 같은 연산을 활용한다.

::: tip
**쇼트-서킷 (Short-Circuit)** 조건문에서 여러 개의 조건을 중첩할 때 &&, ||와 같은 연산자는 참 거짓이 확정되면 뒤의 조건은 검사하지 않는다. 

스트림에서 allMatch, noneMatch, findFirst, findAny 등의 연산은 모든 스트림 요소를 처리하지 않고도 결과를 반환할 수 있다. 원하는 요소를 찾으면 즉시 결과를 반환한다. limit도 쇼트서킷 연산의 일종이다.
:::

### 5.4.3 요소 검색

findAny 메서드는 현재 스트림에서 임의의 요소를 반환한다.

```java
Optional<Dish> dish = menu.stream()
        .filter(Dish::isVegetarian)
        .findAny();
```

### 5.4.4 첫 번째 요소 찾기

리스트 또는 정렬된 연속 데이터로부터 생성된 스트림처럼 일부 스트림에는 `논리적인 아이템 순서`가 정해져 있을 수 있다. 이러한 스트림에서 첫 번째 요소를 찾기 위해서는 `findFirst()` 메서드가 필요하다.

```java
Optional<Integer> firstSquareDivisibleByThree = someNumbers.stream()
        .map(n -> n * n)
        .filter(n -> n % 3 == 0)
        .findFirst();
```

::: tip
**findFirst와 findAny가 모두 필요한 이유**

병렬성 때문이다. 병렬 실행의 경우 첫 번째 요소를 찾기 어렵다. 요소의 반환 순서가 필요없다면 병렬 스트림에서는 findAny를 사용한다.
:::

## 5.5 리듀싱

모든 스트림 요소를 처리해서 값으로 도출하는 것을 **리듀싱 연산** 이라고 한다.

### 5.5.1 요소의 합

`reduce`를 이용하면 애플리케이션의 반복된 패턴을 추상화할 수 있다. 다음처럼 스트림의 모든 요소를 더할 수 있다.

```java
int sum = numbers.stream().reduce(0, (a, b) -> a + b);
```

reduce는 두 개의 인수를 갖는다.
 * 초깃값 0
 * 두 요소를 조합해서 새로운 값을 만드는 `BinaryOperator<T>`

reduce는 스트림이 하나의 값으로 줄어들 때 까지 람다는 각 요소를 반복해서 조합한다. 

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/136559138-1c5e8da6-fa36-4493-8b00-a2e8d0533781.png>
</p>

#### 초깃값 없음

초깃값을 받지 않도록 오버로드된 `reduce`도 있다. 그러나 이 reduce는 `Optional 객체`를 반환한다. 이유는 스트림에 아무 요소도 없는 상황에서 초깃값이 없으므로 reduce는 합계를 반환할 수 없다. 그렇기 때문에 `합계가 없음`을 가리킬 수 있도록 Optional 객체를 감싸 결과를 반환한다.

```java
Optional<Integer> optionalSum = numbers.stream().reduce((a, b) -> a + b);
```

### 5.5.2 최댓값과 최솟값

```java
int max = numbers.stream().reduce(0, Integer::max);
Optional<Integer> min = numbers.stream().reduce(Integer::min);
```

#### reduce 활용

1. mapr과 reduce 메서드를 이용해서 스트림의 요리 개수를 계산한다.

스트림의 각 요소를 1로 매핑한 다음에 reduce로 이들의 합계를 계산하는 방식으로 문제를 해결할 수 있다.
```java
int count = menu.stream()
            .map(d -> 1)
            .reduce(0, (a, b) -> a + b);
```

`map`과 `reduce`를 연결하는 기법을 `맵 리듀스 패턴`이라 하며, 쉽게 병렬화하는 특징 덕분에 구글이 웹 검색에 적용하면서 유명해졌다.

::: tip
**스트림 연산: 상태 없음과 상태 있음**

`map`, `filter` 등은 입력 스트림에서 각 요소를 받아 0 또는 결과를 출력 스트림으로 보낸다. 이들은 보통 상태가 없는, 즉 **내부 상태를 갖지 않는 연산(stateless operation)** 이다.

`reduce`, `sum`, `max` 같은 연산은 결과를 누적할 내부 상태가 필요하다. 스트림에서 처리하는 요소 수와 관계없이 내부 상태의 크기는 **한정(bounded)** 되어 있다.

반면 `sorted`, `distinct` 같은 연산은 `filter`나 `map` 처럼 스트림을 입력으로 받아 다른 스트림을 출력하는 것 처럼 보인다. 하지만 `sorted`, `distinct`는 `filter`와 `map`과는 다르다. 스트림의 요소를 정렬하거나 중복을 제거하기 위해서는 과거의 이력이 필요하다. 연산을 수행하는데 필요한 저장소 크기는 정해져 있지 않다. 데이터 스트림의 크기가 크거나 무한이라면 문제가 생길 여지가 있다. 이러한 연산을 **내부 상태를 갖는 연산(stateful operation)** 이라고 한다.
:::

## 5.6 실전 연습

### 5.6.1 거래자와 트랜잭션

**Trader.java**
```java
import java.util.Objects;

public class Trader {

    private String name;
    private String city;

    public Trader(String n, String c) {
        name = n;
        city = c;
    }

    public String getName() {
        return name;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String newCity) {
        city = newCity;
    }

    @Override
    public int hashCode() {
        int hash = 17;
        hash = hash * 31 + (name == null ? 0 : name.hashCode());
        hash = hash * 31 + (city == null ? 0 : city.hashCode());
        return hash;
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if (!(other instanceof Trader)) {
            return false;
        }
        Trader o = (Trader) other;
        boolean eq = Objects.equals(name,  o.getName());
        eq = eq && Objects.equals(city, o.getCity());
        return eq;
    }

    @Override
    public String toString() {
        return String.format("Trader:%s in %s", name, city);
    }
}
```

**Transaction.java**
```java
import java.util.Objects;

public class Transaction {

    private Trader trader;
    private int year;
    private int value;

    public Transaction(Trader trader, int year, int value) {
        this.trader = trader;
        this.year = year;
        this.value = value;
    }

    public Trader getTrader() {
        return trader;
    }

    public int getYear() {
        return year;
    }

    public int getValue() {
        return value;
    }

    @Override
    public int hashCode() {
        int hash = 17;
        hash = hash * 31 + (trader == null ? 0 : trader.hashCode());
        hash = hash * 31 + year;
        hash = hash * 31 + value;
        return hash;
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if (!(other instanceof Transaction)) {
            return false;
        }
        Transaction o = (Transaction) other;
        boolean eq = Objects.equals(trader,  o.getTrader());
        eq = eq && year == o.getYear();
        eq = eq && value == o.getValue();
        return eq;
    }

    @SuppressWarnings("boxing")
    @Override
    public String toString() {
        return String.format("{%s, year: %d, value: %d}", trader, year, value);
    }
}
```

```java
Trader raoul = new Trader("Raoul", "Cambridge");
Trader mario = new Trader("Mario", "Milan");
Trader alan = new Trader("Alan", "Cambridge");
Trader brian = new Trader("Brian", "Cambridge");

List<Transaction> transactions = Arrays.asList(
        new Transaction(brian, 2011, 300),
        new Transaction(raoul, 2012, 1000),
        new Transaction(raoul, 2011, 400),
        new Transaction(mario, 2012, 710),
        new Transaction(mario, 2012, 700),
        new Transaction(alan, 2012, 950)
);
```

### 5.6.2 실전 연습 정답

1. 2011년 일어난 모든 트랜잭션을 찾아서 값을 오름차순으로 정렬한다.
```java
List<Transaction> tr2011 = transactions.stream()
        // 2011년에 발생한 트랜잭션을 필터링하도록 predicate를 넘겨줌
        .filter(transaction -> transaction.getYear() == 2011)
        // 트랜잭션값으로 요소 정렬
        .sorted(Comparator.comparing(Transaction::getValue))
        // 결과 스트림의 모든 요소 리스트로 반환
        .collect(toList());
```

2. 거래자가 근무하는 모든 도시를 중복 없이 나열한다.
```java
/* #1 distinct 활용 */
List<String> cities = transactions.stream()
        // 트랜잭션과 관련한 각 거래자와 도시 추출
        .map(transaction -> transaction.getTrader().getCity())
        // 고유 도시만 선택
        .distinct()
        .collect(Collectors.toList());

/* #2 toSet 활용 */
List<String> cities = transactions.stream()
        // 트랜잭션과 관련한 각 거래자와 도시 추출
        .map(transaction -> transaction.getTrader().getCity())
        // toSet() 활용
        .collect(Collectors.toSet());
```

3. Cambridge에서 근무하는 모든 거래자를 찾아서 이름순으로 정렬한다.
```java
List<Trader> traders = transactions.stream()
        // 트랜잭션의 모든 거래자 추출
        .map(Transaction::getTrader)
        // Cambridge 거래자만 선택
        .filter(trader -> trader.getCity().equals("Cambridge"))
        // 중복이 없도록 확인
        .distinct()
        // 결과 스트림의 거래자를 이름으로 정렬
        .sorted(comparing(Trader::getName))
        .collect(toList());
```

4. 모든 거래자의 이름을 알파벳순으로 정렬해서 반환한다.
```java
/* #1 reduce 활용 */
String traderStr = transactions.stream()
        // 모든 거래자명을 문자열 스트림으로 추출
        .map(transaction -> transaction.getTrader().getName())
        // 중복된 이름 제거
        .distinct()
        // 이름을 알파벳 순으로 정렬
        .sorted()
        // 각각의 이름을 하나의 문자열로 연결
        .reduce("", (n1, n2) -> n1 + n2);

/* joining 활용 */
String traderStr = transactions.stream()
        // 모든 거래자명을 문자열 스트림으로 추출
        .map(transaction -> transaction.getTrader().getName())
        // 중복된 이름 제거
        .distinct()
        // 이름을 알파벳 순으로 정렬
        .sorted()
        .collect(joining());
```

5. Milan에 거래자가 있는가?
```java
boolean milanBased = transactions.stream()
        .anyMatch(transaction -> transaction.getTrader().getCity().equals("Milan"));
```

6. Cambridge에 거주하는 거래자와 모든 트랜잭션값을 출력한다.
```java
transactions.stream()
        // Cambridge에 거주하는 거래자의 트랜잭션을 선택
        .filter(t -> "Cambridge".equals(t.getTrader().getCity()))
        // 각 트랜잭션값 출력
        .map(Transaction::getValue)
        .forEach(System.out::println);
```

7. 전체 트랜잭션 중 최댓값은 얼마인가?
```java
int highestValue = transactions.stream()
        .map(Transaction::getValue)
        .reduce(0, Integer::max);
```

8. 전체 트랜잭션 중 최솟값은 얼마인가?
```java
Optional<Transaction> smallestTransaction = transactions.stream()
                .min(comparing(Transaction::getValue));
```

## 5.7 숫자형 스트림

스트림 API는 숫자 스트림을 효율적으로 처리할 수 있도록 **기본형 특화 스트림** 을 제공한다.

### 5.7.1 기본형 특화 스트림

 * IntStream
 * DoubleStream
 * LongStream

#### 숫자 스트림으로 매핑

 * mapToInt
 * mapToDouble
 * mapToLong

이들은 map과 같은 기능을 수행하지만, `Stream<T>` 대신 특화된 스트림을 반환한다.

#### 객체 스트림으로 복원하기

`boxed` 메서드를 이용해서 특화 스트림을 일반 스트림으로 변환할 수 있다.
```java
IntStream intStream = menu.stream().mapToInt(Dish::getCalories);
Stream<Intger> stream = intStream.boxed();
```

#### 기본값: OptionalInt

 * OptionalInt
 * OptionalDouble
 * OptionalLong

```java
OptionalInt maxCalories = menu.stream()
        .mapToInt(Dish::getCalories)
        .max();

int max = maxCalories.orElse(1);
```

### 5.7.2 숫자 범위

자바 8의 `IntStream`과 `LongStream`에서는 `range`, `rangeClosed`라는 두 가지 정적 메서드를 제공한다. `range` 메서드는 `종료값`이 결과에 포함되지 않는 반면, `rangeClosed`의 경우 시작값과 종료값이 결과에 포함된다.

```java
System.out.println("range!");
IntStream.range(1, 10)
        .forEach(i -> System.out.print(i + " "));
System.out.println();

System.out.println("rangeClosed!");
IntStream.rangeClosed(1, 10)
        .forEach(i -> System.out.print(i + " "));
System.out.println();
```

```
range!
1 2 3 4 5 6 7 8 9 
rangeClosed!
1 2 3 4 5 6 7 8 9 10 
```

### 5.7.3 숫자 스트림 활용: 피타고라스 수

```java
// TODO
```

## 5.8 스트림 만들기

### 5.8.1 값으로 스트림 만들기

```java
// Stream.of
Stream<String> stream = Stream.of("Java 8", "Lambdas", "In", "Action");
stream.map(String::toUpperCase).forEach(System.out::println);

// Stream.empty
Stream<String> emptyStream = Stream.empty();
```

### 5.8.2 null이 될 수 있는 객체로 스트림 만들기

```java
String homeValue = System.getProperty("home");
Stream<String> homeValueStream = homeValue == null ? Stream.empty() : Stream.of(homeValue);
        
Stream<String> homeValueStream1 = Stream.ofNullable(System.getProperty("home"));
```

### 5.8.3 배열로 스트림 만들기

```java
int[] numbers = {2, 3, 5, 7, 11, 13};
System.out.println(Arrays.stream(numbers).sum());
```

### 5.8.4 파일로 스트림 만들기

```java
// TODO
```

## References

[Item 45. 스트림은 주의해서 사용하라](https://brunch.co.kr/@oemilk/206)<br>
라울-게이브리얼 우르마, 마리오 푸스코, 앨런 마이크로프트, 『Modern Java in Action』, 한빛미디어(2019), p155-196.

<TagLinks />