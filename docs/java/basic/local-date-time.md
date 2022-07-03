---
title: java에서 날짜, 시간 제대로 사용하기
tags: ['우아한테크코스', '알록달록', 'LocalDateTime']
date: 2022-07-03 14:00:00
feed:
  enable: true
---

# java에서 날짜, 시간 제대로 사용하기

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/152970395-a31c8134-fc89-449f-b4dc-441e03df929c.png />

이번 팀 프로젝트를 진행하며 손쉽게 일정을 등록하고 관리할 수 있는 공유 캘린더를 주제로 진행하게 되었다. 캘린더를 기반한 도메인이 주를 이루기 때문에 날짜와 시간에 대한 조작이 필요했다. 이번 기회를 통해 이전에 잘 사용하지 않았던 Java의 날짜, 시간을 다루기 위한 객체에 대해 알아보려 한다.

## JDK 8 이전

JDK 8 이전에는 날짜와 시간을 다루기 위해 주로 `java.util.Date`와 `java.util.Calender`를 사용했다. 하지만 해당 클래스는 아래와 같이 많은 문제를 가지고 있었다. 

 * 불변 객체가 아니다. 즉 내부 필드를 바꿀 수 있는 메서드가 제공되며 만약 여러 객체에서 공유되어 사용될 경우 부작용이 생길 우려가 있다. 
 * 헷갈리는 월 지정방식이다. `JDK 1.0`에서 Date 클래스는 `1월`을 `0`으로 표현하였기 때문에 직관적이지 않다. 가독성을 높이기 위해 일부는 `9월`을 `9 - 1`로 지정하는 방식을 사용하곤 한다.
 * 일관성이 없는 요일 상수를 가지고 있다. `Calendar.WEDNESDAY`의 경우 `public static final int WEDNESDAY = 4`로 수요일을 `4`로 표현하고 있다. 하지만 `Date` 객체의 `getDay()` 메서드를 통해 요일을 구하면 수요일은 `3`으로 표현된다.

그 밖에도 다양한 문제들을 가지고 있다. 자세한 설명은 [Java의 날짜와 시간 API](https://d2.naver.com/helloworld/645609)에서 확인할 수 있다.

## JDK 8 이후

위에서 언급한 문제를 해결하기 위해 JDK 8 이후 `LocalDate`, `LocalTime`, `LocalDateTime`이 등장하였다. 이러한 객체는 기존 `Date`와 `Calender`를 개선하기 위해 등장한 라이브러리인 `joda time`의 영향을 받아 유사하게 설계되었다. 이제 각 객체의 공식 문서를 살펴보자.

### LocalDate

::: tip 공식 문서 중 일부

A date without a time-zone in the ISO-8601 calendar system, such as 2007-12-03. LocalDate is an immutable date-time object that represents a date, often viewed as year-month-day. Other date fields, such as day-of-year, day-of-week and week-of-year, can also be accessed. For example, the value "2nd October 2007" can be stored in a LocalDate.

**ISO-8601 달력 시스템에 "2007-12-03"와 같이 표준 시간대가 없는 날짜이다. LocalDate는 날짜를 나타내는 불변의 날짜-시간 객체로, 종종 year-month-day로 표시된다. 요일, 요일 및 요일과 같은 다른 날짜 필드도 접근할 수 있다. 예를들면 "2007년 10월 2일" 값은 LocalDate에 저장할 수 있다.**

This class does not store or represent a time or time-zone. Instead, it is a description of the date, as used for birthdays. It cannot represent an instant on the time-line without additional information such as an offset or time-zone.

**이 클래스는 시간 또는 표준 시를 저장하거나 나타내지 않는다. 대신 생일에 사용되는 날짜에 대해 표현한다. ofset 또는 표준 시와 같은 추가정보 없이 타임라인의 순간을 나타낼 수 없다.**

The ISO-8601 calendar system is the modern civil calendar system used today in most of the world. It is equivalent to the proleptic Gregorian calendar system, in which today's rules for leap years are applied for all time. For most applications written today, the ISO-8601 rules are entirely suitable. However, any application that makes use of historical dates, and requires them to be accurate will find the ISO-8601 approach unsuitable.

**ISO-8601 달력 체계는 오늘날 대부분의 세계에서 사용되는 현대 민간 달력 체계이다. 오늘날 윤년에 대한 규칙이 모든 시간에 적용되는 프로프래틱 그레고리력 체계와 같다. 오늘날 작성된 대부분의 응용 프로그램에는 ISO-8601 규칙이 전적으로 적합하다. 그러나 과거 날짜를 사용하고 정확한 날짜를 요구하는 모든 응용 프로그램은 ISO-8601 접근법이 적합하지 않다는 것을 알게 될 것이다.**

This is a value-based class; use of identity-sensitive operations (including reference equality (==), identity hash code, or synchronization) on instances of LocalDate may have unpredictable results and should be avoided. The equals method should be used for comparisons.

**이것은 값 기반의 클래스이다. (==), 해시 코드 및 동기화와 같은 작업을 할 때 예측할 수 없는 결과가 발생할 수 있으므로 피해야 한다. 비교를 위해서는 동등 방법을 활용해야 한다.**

:::

아래는 간단히 `LocalDate`에 존재하는 기능들을 테스트 한 것이다.

```java
public class LocalDateTest {

    @DisplayName("LocalDate를 생성한다.")
    @Test
    void creat() {
        LocalDate localDate = LocalDate.of(2022, 07, 03);

        assertThat(localDate).isEqualTo("2022-07-03");
    }

    @DisplayName("현재 시간을 구한다.")
    @Test
    void now() {
        LocalDate now = LocalDate.now();

        assertThat(now).isNotNull();
    }

    @DisplayName("일을 더한다.")
    @Test
    void plusDays() {
        LocalDate localDate = LocalDate.of(2022, 07, 03);
        LocalDate plusLocalDate = localDate.plusDays(1);

        assertThat(plusLocalDate).isEqualTo("2022-07-04");
    }

    @DisplayName("주를 더한다.")
    @Test
    void plusWeeks() {
        LocalDate localDate = LocalDate.of(2022, 07, 03);
        LocalDate plusLocalDate = localDate.plusWeeks(5);

        assertThat(plusLocalDate).isEqualTo("2022-08-07");
    }

    @DisplayName("월을 더한다.")
    @Test
    void plusMonths() {
        LocalDate localDate = LocalDate.of(2022, 07, 03);
        LocalDate plusLocalDate = localDate.plusMonths(7);

        assertThat(plusLocalDate).isEqualTo("2023-02-03");
    }
    
    @DisplayName("연을 더한다.")
    @Test
    void plusYears() {
        LocalDate localDate = LocalDate.of(2022, 07, 03);
        LocalDate plusLocalDate = localDate.plusYears(5);

        assertThat(plusLocalDate).isEqualTo("2027-07-03");
    }

    @DisplayName("두 날짜를 비교하여 과거를 판단한다.")
    @Test
    void isBefore() {
        LocalDate first = LocalDate.of(2022, 07, 03);
        LocalDate second = LocalDate.of(2023, 07, 03);

        boolean result = first.isBefore(second);

        assertThat(result).isTrue();
    }

    @DisplayName("두 날짜를 비교하여 미래를 판단한다.")
    @Test
    void isAfter() {
        LocalDate first = LocalDate.of(2022, 07, 03);
        LocalDate second = LocalDate.of(2023, 07, 03);

        boolean result = second.isAfter(first);

        assertThat(result).isTrue();
    }

    @DisplayName("동일한 날짜의 동등성을 판단한다.")
    @Test
    void equals() {
        LocalDate first = LocalDate.of(2022, 07, 03);
        LocalDate second = LocalDate.of(2022, 07, 03);

        boolean result = first.equals(second);

        assertThat(result).isTrue();
    }
}
```

주로 year, month, day에 대한 메서드가 존재한다. 값 객체이기 때문에 내부의 값들이 동일하면 모두 동일한 객체로 판단한다. 또한 두 날짜를 비교하여 과거와 미래에 대한 판단도 진행할 수 있다.

### LocalTime

::: tip 공식 문서 중 일부

A time without a time-zone in the ISO-8601 calendar system, such as 10:15:30.
LocalTime is an immutable date-time object that represents a time, often viewed as hour-minute-second. Time is represented to nanosecond precision. For example, the value "13:45.30.123456789" can be stored in a LocalTime.

**ISO-8601 달력 시스템에서 "10:15:30"과 같이 표준 시간대가 없는 시간이다. LocalTime은 시간을 나타내는 불변의 날짜-시간 객체이다. 종종 hour-minute-second로 표시된다. 시간은 나노초 정밀도로 표현된다. 예를들면 "13:45.30.123456789"과 같이 지정할 수 있다.**

This class does not store or represent a date or time-zone. Instead, it is a description of the local time as seen on a wall clock. It cannot represent an instant on the time-line without additional information such as an offset or time-zone.

**이 클래스는 날짜 또는 표준시를 저장하거나 나타내지 않는다. 대신, 벽시계에 보이는 현지 시간에 대한 설명이다. offset 또는 표준시와 같은 추가 정보 없이 타임라인의 순간을 나타낼 수 없다.**

The ISO-8601 calendar system is the modern civil calendar system used today in most of the world. This API assumes that all calendar systems use the same representation, this class, for time-of-day.

**ISO-8601 달력 체계는 오늘날 대부분의 세계에서 사용되는 현대 민간 달력 체계이다. 이 API는 모든 캘린더 시스템이 동일한 표현을 사용한다고 가정한다.**

This is a value-based class; use of identity-sensitive operations (including reference equality (==), identity hash code, or synchronization) on instances of LocalTime may have unpredictable results and should be avoided. The equals method should be used for comparisons.

**이것은 값 기반의 클래스이다. (==), 해시 코드 및 동기화와 같은 작업을 할 때 예측할 수 없는 결과가 발생할 수 있으므로 피해야 한다. 비교를 위해서는 동등 방법을 활용해야 한다.**

:::

아래는 간단히 `LocalTime`에 존재하는 기능들을 테스트 한 것이다.

```java
public class LocalTimeTest {

    @DisplayName("LocalTime을 생성한다.")
    @Test
    void create() {
        LocalTime localTime = LocalTime.of(18, 30, 15);
        assertThat(localTime).isEqualTo("18:30:15");

        LocalTime secondWithoutLocalTime = LocalTime.of(18, 30);
        assertThat(secondWithoutLocalTime).isEqualTo("18:30");
    }

    @DisplayName("현재 시간을 구한다.")
    @Test
    void now() {
        LocalTime now = LocalTime.now();

        assertThat(now).isNotNull();
    }

    @DisplayName("시간을 더한다.")
    @Test
    void plusHours() {
        LocalTime localTime = LocalTime.of(18, 30, 15);

        LocalTime plusLocalTime = localTime.plusHours(3);

        assertThat(plusLocalTime).isEqualTo("21:30:15");
    }

    @DisplayName("분을 더한다.")
    @Test
    void plusMinutes() {
        LocalTime localTime = LocalTime.of(18, 30, 15);

        LocalTime plusLocalTime = localTime.plusMinutes(40);

        assertThat(plusLocalTime).isEqualTo("19:10:15");
    }

    @DisplayName("초를 더한다.")
    @Test
    void plusSeconds() {
        LocalTime localTime = LocalTime.of(18, 30, 15);

        LocalTime plusLocalTime = localTime.plusSeconds(15);

        assertThat(plusLocalTime).isEqualTo("18:30:30");
    }

    @DisplayName("두 시간을 비교하여 과거를 판단한다.")
    @Test
    void isBefore() {
        LocalTime first = LocalTime.of(18, 30, 15);
        LocalTime second = LocalTime.of(20, 30, 15);

        boolean result = first.isBefore(second);

        assertThat(result).isTrue();
    }

    @DisplayName("두 시간을 비교하여 미래를 판단한다.")
    @Test
    void isAfter() {
        LocalTime first = LocalTime.of(18, 30, 15);
        LocalTime second = LocalTime.of(20, 30, 15);

        boolean result = second.isAfter(first);

        assertThat(result).isTrue();
    }

    @DisplayName("동일한 시간의 동등성을 판단한다.")
    @Test
    void equals() {
        LocalTime first = LocalTime.of(18, 30, 15);
        LocalTime second = LocalTime.of(18, 30, 15);

        boolean result = first.equals(second);

        assertThat(result).isTrue();
    }
}
```

대부분 `LocalDate`와 유사하지만 시분초 조작에 초점을 두고 있다. 주의해야 할 점은 `LocalTime`의 초와 나노초는 항상 생략이 가능하다. 초를 생략할 경우 `HH:mm`으로 표기된다.

### LocalDateTime

::: tip 리뷰 중 일부

A date-time without a time-zone in the ISO-8601 calendar system, such as 2007-12-03T10:15:30. LocalDateTime is an immutable date-time object that represents a date-time, often viewed as year-month-day-hour-minute-second. Other date and time fields, such as day-of-year, day-of-week and week-of-year, can also be accessed. Time is represented to nanosecond precision. For example, the value "2nd October 2007 at 13:45.30.123456789" can be stored in a LocalDateTime.

**ISO-8601 캘린더 시스템에 "2007-12-03T 10:15:30"과 같이 표준 시간대가 없는 날짜이다. LocalDateTime은 날짜/시간을 나타내는 불변의 날짜-시간 객체로 종종 년-월-시-분-초로 표시된다. 시간은 나노초 정밀도로 표현된다. 예를 들면 "2007년 10월 2일 13:45:30.123456789" 값은 LocalDateTime에 저장할 수 있다.**

This class does not store or represent a time-zone. Instead, it is a description of the date, as used for birthdays, combined with the local time as seen on a wall clock. It cannot represent an instant on the time-line without additional information such as an offset or time-zone.

**이 클래스는 표준시를 저장하거나 나타내지 않는다. 대신, 이것은 생일날 사용되는 날짜를 벽시계에 보이는 현지 시간과 결합한 것이다. offset 또는 표준시와 같은 추가 정보 없이 타임라인의 순간을 나타낼 수 없다.**

The ISO-8601 calendar system is the modern civil calendar system used today in most of the world. It is equivalent to the proleptic Gregorian calendar system, in which today's rules for leap years are applied for all time. For most applications written today, the ISO-8601 rules are entirely suitable. However, any application that makes use of historical dates, and requires them to be accurate will find the ISO-8601 approach unsuitable.

**ISO-8601 달력 체계는 오늘날 대부분의 세계에서 사용되는 현대 민간 달력 체계이다. 이것은 오늘날 윤년에 대한 규칙이 모든 시간에 적용되는 프로프랙틱 그레고리력 체계와 같다. 오늘날 작성된 대부분의 응용 프로그램에는 ISO-8601 규칙이 전적으로 적합하다. 그러나 과거 날짜를 사용하고 정확한 날짜를 요구하는 모든 응용 프로그램은 ISO-8601 접근법이 적합하지 않다는 것을 알게 될 것이다.**

This is a value-based class; use of identity-sensitive operations (including reference equality (==), identity hash code, or synchronization) on instances of LocalDateTime may have unpredictable results and should be avoided. The equals method should be used for comparisons.

**이것은 값 기반의 클래스이다. (==), 해시 코드 및 동기화와 같은 작업을 할 때 예측할 수 없는 결과가 발생할 수 있으므로 피해야 한다. 비교를 위해서는 동등 방법을 활용해야 한다.**

:::

아래는 간단히 `LocalDateTime`에 존재하는 기능들을 테스트 한 것이다.

```java
public class LocalDateTimeTest {

    @DisplayName("LocalDateTime을 생성한다.")
    @Test
    void create() {
        LocalDateTime localDateTime = LocalDateTime.of(2022, 07, 03, 18, 30);

        assertThat(localDateTime).isEqualTo("2022-07-03T18:30");
    }

    @DisplayName("LocalDate와 LocalTime을 활용하여 LocalDateTime을 생성한다.")
    @Test
    void localDateWithLocalTime() {
        LocalDate localDate = LocalDate.of(2022, 07, 03);
        LocalTime localTime = LocalTime.of(18, 30);

        LocalDateTime localDateTime = LocalDateTime.of(localDate, localTime);

        assertThat(localDateTime).isEqualTo("2022-07-03T18:30");
    }

    @DisplayName("LocalDateTime을 활용하여 LocalDate와 LocalTime을 구한다.")
    @Test
    void getLocalDateAndGetLocalTime() {
        LocalDate localDate = LocalDate.of(2022, 07, 03);
        LocalTime localTime = LocalTime.of(18, 30);
        LocalDateTime localDateTime = LocalDateTime.of(localDate, localTime);

        assertThat(localDateTime.toLocalDate()).isEqualTo(localDate);
        assertThat(localDateTime.toLocalTime()).isEqualTo(localTime);
    }
}
```

날짜 및 시간을 더하고 비교하는 것은 앞서 작성한 `LocalDate`, `LocalTime`과 유사하다. 추가로 존재하는 기능은 `LocalDate`와 `LocalTime`을 활용하여 `LocalDateTime`을 손쉽게 만들 수 있고, `LocalDateTime`으로 `LocalDate`와 `LocalTime`을 손쉽게 변환할 수 있다.

## 정리

프로젝트 도입에 앞서 간단히 LocalDate, LocalTime, LocalDateTime의 사용법에 대해 알아보았다. Java에서 날짜 조작에 대한 대부분의 편리한 기능들을 제공하고 있기 때문에 단순히 문자열로 처리하는 것 보다 매우 효율적으로 다룰 수 있다. 또한 JDK 8 이전에 제공된 클래스들은 많은 문제들을 가지고 있었다. JDK 8 이후 등장한 클래스들은 이러한 문제들을 적절히 해결하여 제공되기 때문에 다양한 이점들을 잘 활용하여 사용하면 좋을 것 이라 판단한다.

## References.

[Java의 날짜와 시간 API](https://d2.naver.com/helloworld/645609)<br>
[Class LocalDate](https://docs.oracle.com/javase/8/docs/api/java/time/LocalDate.html)<br>
[Class LocalTime](https://docs.oracle.com/javase/8/docs/api/java/time/LocalTime.html)<br>
[Class LocalDateTime](https://docs.oracle.com/javase/8/docs/api/java/time/LocalDateTime.html)<br>
[ISO 8601](https://ko.wikipedia.org/wiki/ISO_8601)

<TagLinks />
