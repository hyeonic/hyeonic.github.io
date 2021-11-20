---
title: Chapter02 의미 있는 이름
tags: ['Clean Code']
---

# Chapter02 의미 있는 이름

소프트웨어에서 이름은 어디나 쓰인다. 여기저기 도처에서 사용한다. 이름을 잘 지으면 여러모로 편하다. 해당 chapter에서는 이름을 잘 짓는 간단한 규칙을 소개한다.

## 의도를 분명히 밝혀라

변수나 함수 그리고 클래스 이름은 다음과 같은 굵직한 질문에 모두 답해야 한다.
 1. 변수(혹은 함수나 클래스)의 존재 이유는? 
 2. 수행 기능은? 
 3. 사용 방법은?

따로 주석이 필요하다면 의도를 분명히 드러내지 못했다는 의미이다.

**의도가 드러나지 않는 d**
```java
int d; // 경과 시간(단위: 날짜)
```

이름 d만 보면 어떠한 의미도 드러나지 않는다. 측정하려는 값과 단위를 표현하는 `의미있는 이름`이 필요하다.

```java
int elapsedTimeInDays;
int daysSinceCreation;
int daysSinceModification;
int fileAgeInDays;
```

의도가 드러나는 이름은 코드 이해와 변경이 쉬워진다.

## 그릇된 정보를 피하라

그릇된 단서는 코드 의미를 흐린다. 

직각삼각형의 빗변 `hypotenuse`를 구현할 때 `hp`는 훌륭한 약어 처럼 보이지면 hp라는 변수는 `유닉스 플랫폼이나 유닉스 변종`을 가리키는 이름이므로 독자에게 `그릇된 정보`를 제공할 수 있다.

여러 계정을 그룹으로 묶을 때, `실제 List가 아니라면`, accountList라 명명하지 않는다. `acountGroup`이나 `bunchOfAccounts`, 아니면 단순히 `Accounts`라 명명한다.

서로 흡사한 이름을 사용하지 않도록 주의한다. 
```java
XYZControllerForEfficientHandingOfStrings
XYZControllerForEfficientStorageOfStrings
```

## 의미 있게 구분하라

연속적인 숫자를 덧붙인 이름(a1, a2, ..., aN)과 같은 이름은 아무런 정보를 제공하지 못하는 이름이다. 의도가 전혀 드러나지 않는다.

```java
public static void copyChars(char[] a1, char[] a2) {
    for (int i = 0; i < a1.length; i++) {
        a2[i] = a1[i];
    }
}
```

함수 인수 이름을 `source`와 `destination`을 사용한다면 코드 읽기가 더욱 쉬워진다.
```java
public static void copyChars(char[] source, char[] destination) {
    for (int i = 0; i < source.length; i++) {
        destination[i] = source[i];
    }
}
```

## 발음하기 쉬운 이름을 사용하라

`genymdhms`만 보면 발음도 어렵고 의도를 명확히 전달하기 힘들다. `generationTimestamp`와 같은 이름이 바람직하다.

## 검색하기 쉬운 이름을 사용하라

문자 하나를 사용하는 이름과 상수는 텍스트 코드에서 쉽게 눈에 띄지 않는다. 단순히 상수 `7`을 사용하기 보다 `MAX_CLASSES_PER_STUDENT`와 같은 이름을 사용한다.

## 인코딩을 피하라

유형이나 범위 정보까지 인코딩에 넣어 개발자에게 추가적인 부담을 주지 말아야 한다. 이전에 사용했던 헝가리식 표기법은 IDE의 발전으로 더 이상 사용하지 않는다.

## 자신의 기억력을 자랑하지 마라

전문가 프로그래머는 `명료함이 최고`라는 사실을 이해한다. 전문가 프로그래머는 자신의 능력을 좋은 방향으로 사용해 `남들이 이해하는 코드`를 내놓는다. 

## 클래스 이름

클래스 이름과 객체 이름은 `명사`나 `명사구`가 적합하다. `Customer`, `WikiPage`, `Account`, `AddressParser` 등이 좋은 예다. Manager, Processor, Date, Info 등과 같은 단어는 피하고, 동사는 사용하지 않는다.

## 메서드 이름

메서드 이름은 동사나 동사구가 적합하다. `postPayment`, `deletePage`, `save` 등이 좋은 예다. 접근자(Accessor), 변경자(Mutator), 조건자(Predicate)는 javabean 표준에 따라 값 앞에 `get`, `set`, `is`를 붙인다.

## 기발한 이름은 피하라

재미난 이름보다 명료한 이름을 선택하라. 특정 문화에서만 사용하는 농담은 피하는 편이 좋다. 의도를 분명하고 솔직하게 표현하라.

## 한 개념에 한 단어를 사용하라

똑같은 메서드를 클래스마다 fetch, retrieve, get으로 제각각 부르면 혼란스럽다. 어느 클래스에서 어느 이름을 썼는지 기억하기 어렵다. 클래스 이름 또한 마찬가지다. 일관성 있는 어휘는 코드를 사용할 프로그래머에게 선물과 같다.

## 말장난을 하지 마라

한 단어를 두 가지 목적으로 사용하지 마라. 다른 개념에 같은 단어를 사용하면 그것은 말장난에 불과하다. 전혀 다른 개념을 가진 메서드를 모두 add로 사용하기 보다 insert나 append를 사용하여 개념을 분리하여 표현한다.

## 해법 영역에서 가져온 이름을 사용하라

코드를 읽을 사람도 프로그래머이다. 전산 용어, 알고리즘 이름, 패턴 이름, 수학 용어 등을 사용해도 괜찮다. 모든 이름을 문제 영역(domain)에서 가져오는 정책은 현명하지 못하다. `AccountVisitor`, `jobQueue` 등은 좋은 예시이다.

## 문제 영역에서 가져온 이름을 사용하라

적절한 프로그래머 용어가 없다면 문제 영역에서 이름을 가져온다. 우수한 프로그래머와 설계자라면 해법 영역과 문제 영역을 구분할 줄 알아야 한다. 문제 영역 개념과 관련이 깊은 코드라면 문제 영역에서 이름을 가져와야 한다.

## 의미 있는 맥락을 추가하라

**맥락이 불분명한 변수**
```java
private void printGuessStatics(char candidate, int count) {
    String number;
    String verb;
    String pluralModifier;
    if (count == 0) {
        number = "no";
        verb = "are";
        pluralModifier = "s";
    } else if (count == 1) {
        number = "1";
        verb = "is";
        pluralModifier = "";
    } else {
        number = Integer.toString(count);
        verb = "are";
        pluralModifier = "s";
    }
    String guessMessage = String.format("There %s %s %s%s", verb, number, candidate, pluralModifier);
    print(guessMessage);
}
```

세 변수가 함수 전반에서 사용한다. 세 변수의 맥락을 분명하게 만들어야 한다.

**맥략이 분명한 변수**
```java
public class GuessStatisticsMessage {
    private String number;
    private String verb;
    private String plualModifier;

    public String make(char candidate, int count) {
        createPluralDependentMessageParts(count);
        return  String.format("There %s %s %s%s", verb, number, candidate, pluralModifier);
    }

    private void createPluralDependentMessageParts(int count) {
        if (count == 0) {
            thereAreNoLetters();
        } else if (count == 1) {
            thereIsOneLetter();
        } else {
            thereAreManyLetters(count);
        }
    }

    private void thereAreManyLetters(int count) {
        number = Integer.toString(count);
        verb = "are";
        pluralModifier = "s";
    }

    private void thereIsOneLetter() {
        number = "1";
        verb = "is";
        pluralModifier = "";
    }

    private void thereAreNoLetters() {
        number = "no";
        verb = "are";
        pluralModifier = "s";
    }
}
```

## 불필요한 맥락을 없애라

'고급 휘발유 충전소 (Gas Station Deluxe)'라는 애플리케이션을 짠다고 가정하자. 모든 클래스 이름을 `GSD`로 시작하는 것은 전혀 바람직하지 못하다.

## References

로버트 C.마틴, 『Clean Code』, 도서출판인사이트(2013), p21-38.

<TagLinks />