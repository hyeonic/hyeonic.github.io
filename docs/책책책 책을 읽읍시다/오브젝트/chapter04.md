---
title: Chapter04 설계 품질과 트레이드 오프
tags: ['오브젝트', 'object']
---

# Chapter04 설계 품질과 트레이드 오프

객체지향 설계의 핵심은 역할, 책임, 협력이다. 
* `협력`은 애플리케이션의 기능을 구현하기 위해 메시지를 주고받는 객체들 사이의 상호작용이다.
* `책임`은 객체가 다른 객체와 협력하기 위해 수행하는 행동 혹은 행동의 집합이다.
* `역할`은 대체 가능한 책임의 집합이다.

가장 중요한 것은 책임이다. 책임이 객체지향 애플리케이션 전체의 품질을 결정한다.

객체지향 설계란 올바른 객체에게 올바른 책임을 할당하면서 낮은 결합도와 높은 응집도를 가진 구조를 창조하는 활동이다. 
 1. 객체지향 설계의 핵심이 책임이다.
 2. 책임을 할당하는 작업이 응집도와 결합도 같은 설계 품질과 깊이 연관되어 있다.

## 01 데이터 중심의 영화 예매 시스템

객체지향 설계 시 시스템을 객체로 분할하는 방법
 1. 상태(데이터)를 분할의 중심축으로 삼는 방법
 2. 책임을 분할의 중심축으로 삼는 방법

`객체의 상태`는 `구현`에 속한다. 구현은 불안정하기 때문에 쉽게 변한다. `객체의 책임`은 `인터페이스`에 속한다. 객체는 책임을 드러내는 안정적인 인터페이스를 뒤로 책임을 수행하는 데 필요한 상태를 캡슐화함으로써 구현 변경에 대한 파장을 방지한다. 책임에 초점을 맞추면 변경에 안정적인 설계를 얻을 수 있다.

### 데이터를 준비하자

```java
public class Movie {
    private String title;
    private Duration runningTime;
    private Money fee;
    private List<DiscountCondition> discountConditions;

    private MovieType movieType;
    private Money discountAmount;
    private double discountPercent;
}
```

책임 중심의 Movie와 다른 점은 discountConditions가 직접 포함되어 있다는 것이다. 또한 DiscountPolicy라는 별도의 클래스로 분리했던 discountAmount와 discountPercent를 직접 정의하고 있다.

할인 정책은 영화별로 오직 하나만 지정할 수 있다. 할인 정책의 종류를 결정하는 것은 바로 MovieType이 된다.

```java
public enum MovieType {
    AMOUNT_DISCOUNT,    // 금액 할인 정책
    PERCENT_DISCOUNT,   // 비율 할인 정책
    NONE_DISCOUNT;      // 미적용
}
```

필요한 데이터 주비는 완료됬다. 이제 캡슐화를 위해 내부의 데이터를 반환하는 접근자와 데이터를 변경하는 수정자를 추가한다.

```java
public class Movie {
    private String title;
    private Duration runningTime;
    private Money fee;
    private List<DiscountCondition> discountConditions;

    private MovieType movieType;
    private Money discountAmount;
    private double discountPercent;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Duration getRunningTime() {
        return runningTime;
    }

    public void setRunningTime(Duration runningTime) {
        this.runningTime = runningTime;
    }

    public Money getFee() {
        return fee;
    }

    public void setFee(Money fee) {
        this.fee = fee;
    }

    public List<DiscountCondition> getDiscountConditions() {
        return discountConditions;
    }

    public void setDiscountConditions(List<DiscountCondition> discountConditions) {
        this.discountConditions = discountConditions;
    }

    public MovieType getMovieType() {
        return movieType;
    }

    public void setMovieType(MovieType movieType) {
        this.movieType = movieType;
    }

    public Money getDiscountAmount() {
        return discountAmount;
    }

    public void setDiscountAmount(Money discountAmount) {
        this.discountAmount = discountAmount;
    }

    public double getDiscountPercent() {
        return discountPercent;
    }

    public void setDiscountPercent(double discountPercent) {
        this.discountPercent = discountPercent;
    }
}
```

이제 할인 조건을 구현한다. 

```java
public class DiscountCondition {
    private DiscountConditionType type;

    private int sequence;

    private DayOfWeek dayOfWeek;
    private LocalTime startTime;
    private LocalTime endTime;

    public DiscountConditionType getType() {
        return type;
    }

    public void setType(DiscountConditionType type) {
        this.type = type;
    }

    public DayOfWeek getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(DayOfWeek dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public int getSequence() {
        return sequence;
    }

    public void setSequence(int sequence) {
        this.sequence = sequence;
    }
}
```

```java
public enum DiscountConditionType {
    SEQUENCE,   // 순번 조건
    PERIOD;     // 기간 조건
}
```

할인 조건에는 할인 조건을 결정하는 DiscountConditionType과 순번, 기간을 표현하기 위한 인스턴스 변수를 모두 포함하고 있다.

다음은 상영 정보를 위한 `Screening`이다.

```java
public class Screening {
    private Movie movie;
    private int sequence;
    private LocalDateTime whenScreened;

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public int getSequence() {
        return sequence;
    }

    public void setSequence(int sequence) {
        this.sequence = sequence;
    }

    public LocalDateTime getWhenScreened() {
        return whenScreened;
    }

    public void setWhenScreened(LocalDateTime whenScreened) {
        this.whenScreened = whenScreened;
    }
}
```

영화 예매 시스템의 목적은 영화 예매이다. `Reservation`을 추가한다.

```java
public class Reservation {
    private Customer customer;
    private Screening screening;
    private Money fee;
    private int audienceCount;

    public Reservation(Customer customer, Screening screening, Money fee,
                       int audienceCount) {
        this.customer = customer;
        this.screening = screening;
        this.fee = fee;
        this.audienceCount = audienceCount;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Screening getScreening() {
        return screening;
    }

    public void setScreening(Screening screening) {
        this.screening = screening;
    }

    public Money getFee() {
        return fee;
    }

    public void setFee(Money fee) {
        this.fee = fee;
    }

    public int getAudienceCount() {
        return audienceCount;
    }

    public void setAudienceCount(int audienceCount) {
        this.audienceCount = audienceCount;
    }
}
```

`Customer`는 고객 정보를 보관하기 위한 클래스이다.

```java
public class Customer {
    private String name;
    private String id;

    public Customer(String name, String id) {
        this.name = name;
        this.id = id;
    }
}
```

아래는 영화 예매 시스템 구현을 위한 데이터 클래스들이다.
<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/142756767-bd7c12bb-ddc4-4bf8-bee6-0d19fbd03936.png>
</p>

### 영화를 예매하자

데이터 클래스를 조합하여 영화 예매 절차를 구현하는 클래스이다.

```java
public class ReservationAgency {
    public Reservation reserve(Screening screening, Customer customer, int audienceCount) {
        Movie movie = screening.getMovie();

        boolean discountable = false;
        for (DiscountCondition condition : movie.getDiscountConditions()) {
            if (condition.getType() == DiscountConditionType.PERIOD) {
                discountable = screening.getWhenScreened().getDayOfWeek().equals(condition.getDayOfWeek()) &&
                        condition.getStartTime().compareTo(screening.getWhenScreened().toLocalTime()) <= 0 &&
                        condition.getEndTime().compareTo(screening.getWhenScreened().toLocalTime()) >= 0;
            } else {
                discountable = condition.getSequence() == screening.getSequence();
            }

            if (discountable) {
                break;
            }
        }

        Money fee;
        if (discountable) {
            Money discountAmount = Money.ZERO;
            switch (movie.getMovieType()) {
                case AMOUNT_DISCOUNT:
                    discountAmount = movie.getDiscountAmount();
                    break;
                case PERCENT_DISCOUNT:
                    discountAmount = movie.getFee().times(movie.getDiscountPercent());
                    break;
                case NONE_DISCOUNT:
                    discountAmount = Money.ZERO;
                    break;
            }

            fee = movie.getFee().minus(discountAmount).times(audienceCount);
        } else {
            fee = movie.getFee().times(audienceCount);
        }

        return new Reservation(customer, screening, fee, audienceCount);
    }
}
```

## 02 설계 트레이드 오프

데이터 중심 설계와 책임 중심 설계의 장단점을 비교하기 위해 캡슐화, 응집도, 결합도를 사용한다. 세 가지의 품질 척도의 의미를 살펴본다.

### 캡슐화

상태와 행동을 하나의 객체 안에 모으는 이유는 객체의 `내부 구현`을 외부로부터 감추기 위해서다.
::: tip 구현
나중에 변결될 가능성이 높은 어떤 것
:::

객체를 사용하면 변경 가능성이 높은 부분은 내부에 숨기고 외부에는 상대적으로 안정적인 부분만 공개하며 변경의 여파를 통제할 수 있다.

객체지향 설계의 기본적인 아이디어는 변경될 가능성이 높은 `구현`과 상대적으로 안정적인 `인터페이스`를 `분리`하고 외부에서 `인터페이스만 의존`하도록 관계를 조절하는 것이다.

캡슐화는 외부에서 알 필요가 없는 부분을 감춤으로써 대상을 단순화하는 추상화의 한 종류다. 객체지향의 가장 중요한 원리는 불안정한 구현 세부사항을 안정적인 인터페이스 뒤로 `캡슐화`하는 것이다.

정리하면 `캡슐화`란 변경 가능성이 높은 부분을 객체 내부로 숨기는 `추상화 기법`이다. 변경될 수 있는 어떤 것이라도 `캡슐화` 해야 한다. 

::: tip 유지보수성
유지보수성이란 두려움 없이, 주저함 없이, 저항감 없이 코드를 변경할 수 있는 능력을 말한다. 유지보수성을 위해 캡슐화는 매우 중요하다.
:::

### 응집도와 결합도

`응집도`는 모듈에 포함된 내부 요소들이 연관돼 있는 정보를 나타낸다. 객체지향의 관점에서 응집도는 객체 또는 클래스에 얼마나 관련 높은 책임들을 할당햇는지를 나타낸다.

`결합도`는 의존성의 정도를 나타내며 다른 모듈에 대해 얼마나 많은 지식을 갖고 있는지를 나타내는 척도다. 객체지향 관점에서 결합도는 객체 또는 클래스가 협력에 필요한 적절한 수준의 관계만을 유지하고 있는지를 나타낸다.

좋은 설계란 오늘의 기능을 수행하며 내일의 변경을 수용할 수 있는 설계다. 좋은 설계를 만들기 위해서 `높은 응집도`와 `낮은 결합도`를 추구해야 한다.

캡슐화의 정도가 응집도와 결합도에 영향을 미칠 수 있다. 캡슐화를 잘 지키면 응집도는 높아지고 모듈 사이의 결합도는 낮아진다.

## 03 데이터 중심의 영화 예매 시스템의 문제점

데이터 중심 설계는 캡슐화를 위반하고 객체 내부 구현을 인터페이스의 일부로 만든다. 그 밖의 대표적인 문제는 아래와 같다.
 * 캡슐화 위반
 * 높은 결합도
 * 낮은 응집도

### 캡슐화 위반

```java
public class Movie {
    private Money fee;

    public Money getFee() {
        return fee;
    }

    public void setFee(Money fee) {
        this.fee = fee;
    }
}
```

위 코드는 언뜻 보면 객체 내부에 접근할 수 없기 때문에 캡슐화를 잘 지키는 것 처럼 보인다. 하지만 get/set 메서드로 인해 내부에 Money 타입의 fee라는 이름의 인스턴스 변수가 `노골적으로 드러난다.`

위 처럼 접근자와 수정자에 과도하게 의존하는 설계 방식을 `추측에 의한 설계 전략`이라 부른다. 이 전략은 객체가 사용될 협력을 고려하지 않고 객체가 다양한 상황에서 사용될 수 있을 것이라는 `추측`을 기반으로 설계를 진행한다. 결과적으로 내부 구현이 그대로 노출하여 `캡슐화 원칙을 위반`하는 `변경에 취약한 설계`를 얻게 된다.

### 높은 결합도

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/142758307-8a973f46-a678-4c31-a031-1eb9cb6fe46e.png>
</p>

데이터 중심 설계의 영화 예매 시스템을 보면 대부분의 제어 로직을 가지고 있는 제어 객체인 `ReservationAgency`가 모든 데이터 객체에 의존하고 있다. 의존하고 있는 데이터 객체가 변경되면 ReservationAgency도 함께 수정해야 한다.

데이터 중심 설계는 전체 시스템을 하나의 `거대한 의존성 덩어리`로 만들어 버리기 때문에 어떤 변경이라도 일단 발생하고 나면 시스템 전체가 요동칠 수 밖에 없다.

## 04 자율적인 객체를 향해

### 캡슐화를 지켜라

객체는 자신이 어떤 데이터를 가지고 있는지를 내부에 `캡슐화`하고 외부에 공개해서는 안된다. 객체는 스스로의 `상태를 책임`져야 하며 외부에서는 인터페이스에 정의된 메서드를 통해서만 상태에 접근할 수 있어야 한다.

어떤 사각형의 너비와 높이를 증가시키는 코드가 필요하다고 가정한다. 
```java
public class Rectangle {
    private int left;
    private int top;
    private int right;
    private int bottom;

    public Rectangle(int left, int top, int right, int bottom) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }

    public int getLeft() {
        return left;
    }

    public void setLeft(int left) {
        this.left = left;
    }

    public int getTop() {
        return top;
    }

    public void setTop(int top) {
        this.top = top;
    }

    public int getRight() {
        return right;
    }

    public void setRight(int right) {
        this.right = right;
    }

    public int getBottom() {
        return bottom;
    }

    public void setBottom(int bottom) {
        this.bottom = bottom;
    }
}
```

너비와 높이 증가를 위해서는 외부 어떤 클래스 안에 아래와 같이 구현되어 있을 것이다.

```java
public class AnyClass {
    void anyMethod(Rectangle rectangle, int multiple) {
        rectangle.setRight(rectangle.getRight() * multiple);
        rectangle.setBottom(rectangle.getBottom() * multiple);
    }
}
```

위 코드는 크게 두가지의 문제점을 가지고 있다.
 1. `코드 중복`이 발생할 확률이 높다. 다른 곳에서 사각형의 너비와 높이를 증가시키는 코드가 필요하다면 그곳에도 유사한 코드를 활용하여 설정할 것이다.
 2. `변경에 취약하다.` 접근자와 수정자는 내부 구현을 인터페이스의 일부로 만들기 때문에 인스턴스 변수의 존재를 인터페이스를 통해 노출한다. 만약 내부 인스턴스가 변경되게 된다면 관련한 모든 인터페이스를 수정해야 할 것이다.

해결 방법은 캡슐화를 강화하는 것이다. Rectangle 내부에 너비와 높이 조절을 위한 로직을 추가하면 모든 문제는 해결 가능하다.
```java
public class Rectangle {
    private int left;
    private int top;
    private int right;
    private int bottom;

    public Rectangle(int left, int top, int right, int bottom) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }

    // 자신의 크기를 스스로 증가시키도록 '책임을 이동`
    public void enlarge(int multiple) {
        right *= multiple;
        bottom *= bottom;
    }
}
```

### 스스로 자신의 데이터를 책임지는 객체

상태와 행동을 객체라는 하나의 단위로 묶는 이유는 객체 스스로 자신의 상태를 처리할 수 있게 하기 위해서이다. 객체 내부에 저장되는 데이터보다 객체가 협력에 참여하며 수행할 책임을 정의하는 오퍼레이션이 더 중요하다.

객체를 설계할 때는 다음과 같은 질문을 던져야 한다.
 * 이 객체가 어떤 데이터를 포함해야 하는가?
 * 이 객체가 데이터에 대해 수행해야 하는 오퍼레이션은 무엇인가?

#### DiscountCondition

1. 이 객체가 어떤 데이터를 포함해야 하는가?

```java
public class DiscountCondition {
    private DiscountConditionType type;

    private int sequence;

    private DayOfWeek dayOfWeek;
    private LocalTime startTime;
    private LocalTime endTime;

    ...
}
```

2. 이 데이터에 대해 수행할 수 있는 오퍼레이션이 무엇인가?

DiscountCondition은 순번 조건일 경우 sequence를 이용해 할인 여부를 결정한다. 기간 조건일 경우 dayOfWeek, startTime, endTime을 활용하여 할인 여부를 결정한다.

할인 조건 판단을 위한 두 가지의 `isDiscountable` 메서드가 필요하게 된다.
```java
public class DiscountCondition {
    private DiscountConditionType type;

    private int sequence;

    private DayOfWeek dayOfWeek;
    private LocalTime startTime;
    private LocalTime endTime;

    ...

    public boolean isDiscountable(DayOfWeek dayOfWeek, LocalTime time) {
        if (type != DiscountConditionType.PERIOD) {
            throw new IllegalArgumentException();
        }

        return this.dayOfWeek.equals(dayOfWeek) &&
                this.startTime.compareTo(time) <= 0 &&
                this.endTime.compareTo(time) >= 0;
    }

    public boolean isDiscountable(int sequence) {
        if (type != DiscountConditionType.SEQUENCE) {
            throw new IllegalArgumentException();
        }

        return this.sequence == sequence;
    }
}
```

#### Movie

1. 이 객체가 어떤 데이터를 포함해야 하는가?

```java
public class Movie {
    private String title;
    private Duration runningTime;
    private Money fee;
    private List<DiscountCondition> discountConditions;

    private MovieType movieType;
    private Money discountAmount;
    private double discountPercent;

    ...
}
```

2. 이 데이터에 대해 수행할 수 있는 오퍼레이션이 무엇인가?

Movie속 데이터를 살펴보면 `영화 요금 계산`과 `할인 여부 판단`을 위한 오퍼레이션이 필요하다.

```java
public class Movie {
    ...
    public MovieType getMovieType() {
        return movieType;
    }

    // 정책 별 요금 계산
    public Money calculateAmountDiscountedFee() {
        if (movieType != MovieType.AMOUNT_DISCOUNT) {
            throw new IllegalArgumentException();
        }

        return fee.minus(discountAmount);
    }

    public Money calculatePercentDiscountedFee() {
        if (movieType != MovieType.PERCENT_DISCOUNT) {
            throw new IllegalArgumentException();
        }

        return fee.minus(fee.times(discountPercent));
    }

    // 할인 여부 판단
    public Money calculateNoneDiscountedFee() {
        if (movieType != MovieType.NONE_DISCOUNT) {
            throw new IllegalArgumentException();
        }

        return fee;
    }

        public boolean isDiscountable(LocalDateTime whenScreened, int sequence) {
        for (DiscountCondition condition : discountConditions) {
            if (condition.getType() == DiscountConditionType.PERIOD) {
                if (condition.isDiscountable(whenScreened.getDayOfWeek(), whenScreened.toLocalTime())) {
                    return true;
                }
            } else {
                if (condition.isDiscountable(sequence)) {
                    return true;
                }
            }
        }

        return false;
    }
    ...
}
```

#### Screening

위와 동일한 작업을 반복해 준다.

```java
public class Screening {
    private Movie movie;
    private int sequence;
    private LocalDateTime whenScreened;

    public Screening(Movie movie, int sequence, LocalDateTime whenScreened) {
        this.movie = movie;
        this.sequence = sequence;
        this.whenScreened = whenScreened;
    }

    public Money calculateFee(int audienceCount) {
        switch (movie.getMovieType()) {
            case AMOUNT_DISCOUNT:
                if (movie.isDiscountable(whenScreened, sequence)) {
                    return movie.calculateAmountDiscountedFee().times(audienceCount);
                }
                break;
            case PERCENT_DISCOUNT:
                if (movie.isDiscountable(whenScreened, sequence)) {
                    return movie.calculatePercentDiscountedFee().times(audienceCount);
                }
            case NONE_DISCOUNT:
                movie.calculateNoneDiscountedFee().times(audienceCount);
        }

        return movie.calculateNoneDiscountedFee().times(audienceCount);
    }
}
```

#### ReservationAgency

ReservationAgency는 이제 Screening의 calculateFee 메서드를 호출해 예매 요금을 계산한 후 계산된 요금을 이용해 Reservation을 생성한다.

```java
public class ReservationAgency {
    public Reservation reserve(Screening screening, Customer customer, int audienceCount) {
        Money fee = screening.calculateFee(audienceCount);
        return new Reservation(customer, screening, fee, audienceCount);
    }
}
```

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/142759175-deae4240-26fd-4ee4-ac2a-4d4ad02e6427.png>
</p>

데이터를 가지고 있는 개체 스스로가 구현을 담당하고 있기 때문에 해당 객체들은 스스로를 책임지고 있다.

## 05. 하지만 여전히 부족하다

두 번째 설계가 더욱 발전한 것은 많지만 첫 번째 설계에서 발생했던 대부분의 문제들은 두 번째 설계에서 동일하게 발생한다.

### 캡슐화 위반

```java
public class DiscountCondition {
    private DiscountConditionType type;

    private int sequence;

    private DayOfWeek dayOfWeek;
    private LocalTime startTime;
    private LocalTime endTime;

    ...

    public DiscountConditionType getType() {...}
    public boolean isDiscountable(DayOfWeek dayOfWeek, LocalTime time) {...}
    public boolean isDiscountable(int sequence) {...}
}
```

위 메서드들은 파라미터를 통하여 내부 정보를 노출하고 있다. getType 역시 내부 정보를 노출하고 있다. 만약 DiscountCondtion의 속성이 변경되면 해당 메서드를 사용하던 클라이언트도 함께 수정해야 한다. Movie 역시 동일한 문제를 가지고 있다.

```java
public class Movie {
    private String title;
    private Duration runningTime;
    private Money fee;
    private List<DiscountCondition> discountConditions;

    private MovieType movieType;
    private Money discountAmount;
    private double discountPercent;

    ...

    public MovieType getMovieType() {...}
    public Money calculateAmountDiscountedFee() {...}
    public Money calculatePercentDiscountedFee() {...}
    public Money calculateNoneDiscountedFee() {...}
    public boolean isDiscountable(LocalDateTime whenScreened, int sequence) {...}
}
```

::: tip 캡슐화
캡슐화는 변할 수 있는 어떤 것이라도 감추는 것이다. 내부 구현의 변경으로 인해 외부 객체가 영향을 받는다면 캡슐화를 위반한 것이다. 정리하면 그것이 무엇이든 구현과 관련된 것이라면 변하는 어떤 것이든 감춰야 한다.
:::

## 06 데이터 중심 설계의 문제점

 * 데이터 중심의 설계는 본질적으로 너무 이른  시기에 데이터에 관해 결정하도록 강요한다.
 * 데이터 중심의 설계에서는 협력이라는 문맥을 고려하지 않고 객체를 고립시킨 채 오퍼레이션을 결정한다.

### 데이터 중심 설계는 객체의 행동보다는 상태에 초점을 맞춘다

데이터는 `구현의 일부`다. 데이터 주도 설계는 설계를 시작하는 처음부터 데이터에 관해 결정하도록 강요하기 때문에 너무 이른 시기에 내부 구현에 초점을 맞춘다.

### 데이터 중심 설계는 객체를 고립시킨 채 오퍼레이션을 정의하도록 한다

객체지향 애플리케이션을 구현한다는 것은 협력하는 객체들의 공동체를 구축한다는 것을 의미한다. 따라서 협력이라는 문맥안에서 필요한 책임을 결정하고 이를 수행할 적절한 객체를 결정하는 것이 가장 중요하다. 올바른 객체지향 설계는 내부가 아니라 외부에 맞춰져 있어야 한다.

데이터 중심 설계의 초점은 객체의 외부가 아니라 내부로 향한다. 변경에 유연하지 못한 이유는 바로 이 때문이다.

## References

조영호, 『오브젝트』, 위키북스(2019), p97-132.

<TagLinks />