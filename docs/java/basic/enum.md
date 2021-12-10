---
title: enum
tags: ['enum']
---

# enum

사계절을 뜻하는 봄, 여름, 가을, 겨울과 같이 한정된 값만을 가진 데이터 타입을` 열거 타입 (Enumuration type)`이라고 한다. 이처럼 프로그래밍에서 `상수의 그룹`을 나타내기 위해 사용된다. 

 Java 1.5 부터 enum을 `enum 데이터 타입`으로 표시되었다. 특히 Java에서는 C/C++과 다르게 변수, 메소드, 생성자를 추가할 수 있다. 기존에 인터페이스나 클래스 내에서 상수를 선언하여 사용하였는데 상수를 관리하는데 있어서 나오는 단점들과 타입의 안정성, IDE의 지원을 받을 수 있도록 보완하여 나온 것이 Enum이다.

## enum의 등장 배경

enum 이전에 상수를 사용하던 때에는 몇 가지 문제점을 가지고 있었다.
 * 상수에 부여된 리터럴은 상수와 관련이 없다.
 * 이름의 충돌이 발생할 수 있다.

```java
public class Season {

    public static final int SPRING = 1;
    public static final int SUMMBER = 2;
    public static final int FALL = 3;
    public static final int WINTER = 4;

    public static void main(String[] args) {
        int season = SPRING;

        switch (season) {
            case SPRING:
                System.out.println("봄");
                break;
            case SUMMBER:
                System.out.println("여름");
                break;
            case FALL:
                System.out.println("가을");
                break;
            case WINTER:
                System.out.println("겨울");
                break;
        }
    }
}    
```

```bash
봄
```

첫 번째 문제를 확인하기 위해 간단하게 봄, 여름, 가을, 겨울을 1, 2, 3, 4라는 리터럴로 구분하여 부여하였다. 해당 리터럴은 단순히 상수를 구분하는 용도이고 논리적으로는 아무 의미가 없다. 즉 season 변수에 1이라는 값을 넣어도 SPRING을 넣었을 때랑 값을 결과가 나올 수 있다. 결국 `상수`와 `상수에 부여된 리터럴`들은 연관성이 없다는 것을 알 수 있었다.

```java
public class Season {

    public static final int SPRING = 1;
    public static final int SUMMBER = 2;
    public static final int FALL = 3;
    public static final int WINTER = 4;

    public static void main(String[] args) {
        int season = 1;

        switch (season) {
            case SPRING:
                System.out.println("봄");
                break;
            case SUMMBER:
                System.out.println("여름");
                break;
            case FALL:
                System.out.println("가을");
                break;
            case WINTER:
                System.out.println("겨울");
                break;
        }
    }
}
```

```bash
봄
```

또한 다른 클래스의 이름이 같은 상수도 비교해보았다.

```java
public class Season {

    // season
    public static final int SPRING = 1;
    public static final int SUMMBER = 2;
    public static final int FALL = 3;
    public static final int WINTER = 4;
}
```

```java
public class Framework {

    // framework
    public static final int SPRING = 1;
    public static final int DJANGO = 2;
    public static final int RUBY_ON_RAILS = 3;
    public static final int VUE_JS = 4;
}
```

```java
public class Exam02 {
    public static void main(String[] args) {
        System.out.println(Season.SPRING == Framework.SPRING); // true
    }
}
```

서로 다른 SPRING을 의미하고 있지만, 1이라는 리터럴을 비교하기 때문에 true을 출력한다. 

두번째 문제는 `이름의 충돌`이 발생하는 것이다. Season의 SPRING과 Framework의 SPRING을 비교해보았다. 같은 클래스에 상수를 선언하면 Seanson의 SPRING과 Framework의 SPRING이 서로 같은 변수명으로 충돌하게 된다. 그렇기 때문에 추가적으로 앞에 구분하는 문자를 붙여줘야 한다.

 * SEANSON_SPRING
 * FRAMEWOKR_SPRING

Enum은 위처럼 상수를 클래스로 정의하여 관리할 때 얻을 수 있는 이점을 모두 모아 간단하게 선언하여 사용할 수 있도록 하기 위해서 만들어졌다.

## enum 정의

가장 기본적 enum 선언이다.

```java
public enum  Phone {

    GALAXY_S21,
    GALAXY_S21_PLUS,
    GALAXY_S21_ULTRA,
    GALAXY_Z_FLIP,
    GALAXY_Z_FOLD2
}
```

또한 생성자 및 메서드를 추가할 수 있다.

```java
public enum Phone {
    GALAXY_S21(999_900, "SM-G991NZIEKOO"),
    GALAXY_S21_PLUS(1_119_900, "SM-G996NZVEKOO"),
    GALAXY_S21_ULTRA(1_452_000, "SM-G998NZKEKOO"),
    GALAXY_Z_FLIP(1_650_000, "SM-F707NZNAKOO"),
    GALAXY_Z_FOLD2(2_398_000, "SM-F916NZKAKOO");

    private final int price;
    private final String modelName;

    Phone(int price, String modelName) {
        this.price = price;
        this.modelName = modelName;
    }

    public int getPrice() {
        return this.price;
    }

    public String getModelName() {
        return this.modelName;
    }
}
```

::: warning
생성자가 존재하지만 Default 생성자는 private로 되어 있다. public으로 변경하면 컴파일 에러가 발생한다. 
:::

즉 다른 클래스나 인터페이스에서 상수 선언(static final)이 클래스 로드 시점에서 생성되는 것처럼 Enum 또한 생성자가 존재하지만 클래스가 로드되는 시점에 생성되기 때문에 임의로 생성하여 사용할 수 없다. Enum 클래스에 선언된 상수들은 클래스 로드 시점에서 모두 생성되고, signleton 형태로 애플리케이션 전체에서 사용할 수 있다.

 signleton으로 사용 가능하기 때문에 값을 유지하는 필드가 들어 있는 것은 매우 위험하기 때문에 조심해야 한다. 

```java
public enum Phone {
    GALAXY_S21(999_900, "SM-G991NZIEKOO"),
    GALAXY_S21_PLUS(1_119_900, "SM-G996NZVEKOO"),
    GALAXY_S21_ULTRA(1_452_000, "SM-G998NZKEKOO"),
    GALAXY_Z_FLIP(1_650_000, "SM-F707NZNAKOO"),
    GALAXY_Z_FOLD2(2_398_000, "SM-F916NZKAKOO");

    private final int price;
    private final String modelName;
    private int count;

    Phone(int price, String modelName) {
        this.price = price;
        this.modelName = modelName;
    }

    public void addCount(int count) {
        this.count += count;
    }
}
```

count 변수는 멀티쓰레드 환경에서 공유되고 있기 때문에 값을 유지하는 인스턴스 변수의 사용을 막거나 `thread safe`하게 유지해야 한다.

또한 상속을 지원하지 않는다. 모든 enum은 내부적으로 `java.lang.Enum` 클래스에 의해 상속된다. Java에서는 다중 상속을 지원하지 않기 때문에 enum 클래스는 다른 클래스를 상속 받을 수 없다. 상속을 지원하지 않지만 다양한 `인터페이스들은 구현`할 수 있다.

`바이트코드`를 살펴보면 `java.lang.Enum`을 `상속` 받을 것을 알 수 있다. 또한 각각 인스턴스들은 `public final static`으로 선언되어 있다. 각각 객체의 주소 값은 바뀌지 않기 때문에 "==" 비교가 가능해진다.

```java
public final enum me/hyeonic/week11/Phone extends java/lang/Enum {

  // compiled from: Phone.java

  // access flags 0x4019
  public final static enum Lme/hyeonic/week11/Phone; GALAXY_S21

  // access flags 0x4019
  public final static enum Lme/hyeonic/week11/Phone; GALAXY_S21_PLUS

  // access flags 0x4019
  public final static enum Lme/hyeonic/week11/Phone; GALAXY_S21_ULTRA

  // access flags 0x4019
  public final static enum Lme/hyeonic/week11/Phone; GALAXY_Z_FLIP

  // access flags 0x4019
  public final static enum Lme/hyeonic/week11/Phone; GALAXY_Z_FOLD2
  
  ...
}
```

### enum 안에 인스턴스 생성 시점 

enum 안에 선언한 인스턴스들의 생성 시점을 알아보기 위해 간단한 예시를 작성하였다. `enum Phone`이에 생성자와 간단한 생성 정보를 출력하는 출력문을 추가하였다.

```java
public enum Phone {
    GALAXY_S21(999_900, "SM-G991NZIEKOO"),
    GALAXY_S21_PLUS(1_119_900, "SM-G996NZVEKOO"),
    GALAXY_S21_ULTRA(1_452_000, "SM-G998NZKEKOO"),
    GALAXY_Z_FLIP(1_650_000, "SM-F707NZNAKOO"),
    GALAXY_Z_FOLD2(2_398_000, "SM-F916NZKAKOO");

    private final int price;
    private final String modelName;

    Phone(int price, String modelName) {
        System.out.println(this.name() + " -> " + price + ", " + modelName);
        this.name();
        this.price = price;
        this.modelName = modelName;
    }

    public int getPrice() {
        return this.price;
    }

    public String getModelName() {
        return this.modelName;
    }

    @Override
    public String toString() {
        return "Phone{" +
                "price=" + price +
                ", modelName='" + modelName + '\'' +
                '}';
    }
}
```

다양한 상황을 출력한다.

```java
public class Exam01 {       
    public static void main(String[] args) {                                            
        System.out.println("==================== main ====================");           
        System.out.println("================ enum 변수 선언 ================");             
        Phone phone;                                                                    
        System.out.println("============== enum 변수에 값 할당 ==============");              
        phone = Phone.GALAXY_S21;                                                       
        System.out.println("=============== enum 변수 값 사용 ===============");             
        System.out.println(phone.name() + "의 가격은 " + phone.getPrice() + "이다.");         
        System.out.println("===================== end =====================");          
    }                                                                                   
}        
```

```bash
===================== main =====================
================ enum 변수 선언 =================
============== enum 변수에 값 할당 ==============
GALAXY_S21 -> 999900, SM-G991NZIEKOO
GALAXY_S21_PLUS -> 1119900, SM-G996NZVEKOO
GALAXY_S21_ULTRA -> 1452000, SM-G998NZKEKOO
GALAXY_Z_FLIP -> 1650000, SM-F707NZNAKOO
GALAXY_Z_FOLD2 -> 2398000, SM-F916NZKAKOO
=============== enum 변수 값 사용 ===============
GALAXY_S21의 가격은 999900이다.
====================== end =====================
```

enum 변수를 단순히 선언만 하면 내부의 상수들이 선언되지 않는다. `직접적으로 값을 할당`하거나 `사용할 때` 비로소 모든 값들이 생성되는 것을 알 수 있다.

## enum이 제공하는 메서드 

### values

```java
public class Main {
    public static void main(String[] args) {
        Phone[] phones = Phone.values();

        for (Phone phone : phones) {
            System.out.println(phone.ordinal() + " " + phone.name());
            System.out.println("model name: " + phone.getModelName() + " price: " + phone.getPrice());

            System.out.println();
        }
    }
}
```

```bash
0 GALAXY_S21
model name: SM-G991NZIEKOO price: 999900

1 GALAXY_S21_PLUS
model name: SM-G996NZVEKOO price: 1119900

2 GALAXY_S21_ULTRA
model name: SM-G998NZKEKOO price: 1452000

3 GALAXY_Z_FLIP
model name: SM-F707NZNAKOO price: 1650000

4 GALAXY_Z_FOLD2
model name: SM-F916NZKAKOO price: 2398000
```

Enum 클래스가 가지고 있는 상수 값을 `배열의 형태로 리턴`한다. String 형태의 name을 반환하는게 아니라 `enum phone이 가지고 있는 모든 상수의 인스턴스를 배열에 담아 반환`한다. 그렇기 때문에 상속 받은 Enum 클래스의 메소드 뿐만 아니라 Phone에 있는 get메소드 또한 사용이 가능하다.

이러한 `values()`는 바이트코드를 살펴보면 컴파일 시점에 자동 생성한다.

<p align=center>
    <img src=https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fq6XgM%2FbtqU93WOlFf%2FE57N7NIENtpciRrHNAe6KK%2Fimg.png>
</p>

### valueOf

`valueOf()` 메소드는 인자로 들어온 값과 일치하는 상수 인스턴스가 존재하면 해당 인스턴스를 반환한다. 단순히 문자열 반환이 아닌 인스턴스 자체를 반환한다.

```java
public class Main {
    public static void main(String[] args) {
        Phone galaxy21 = Phone.valueOf("GALAXY_S21");

        System.out.println(galaxy21.name());
        System.out.println(galaxy21.ordinal());
        System.out.println(galaxy21.getModelName());
        System.out.println(galaxy21.getPrice());
    }
}
```

```bash
GALAXY_S21
0
SM-G991NZIEKOO
999900
```

존재하지 않는 상수인 경우 `IllegalArgumentException`을 던진다.

```java
public class Main {
    public static void main(String[] args) {
        Phone galaxy20 = Phone.valueOf("GALAXY_S20");

        System.out.println(galaxy20.name());
        System.out.println(galaxy20.ordinal());
        System.out.println(galaxy20.getModelName());
        System.out.println(galaxy20.getPrice());
    }
}
```

```bash
Exception in thread "main" java.lang.IllegalArgumentException: No enum constant me.hyeonic.week11.Phone.GALAXY_S20
	at java.base/java.lang.Enum.valueOf(Enum.java:240)
	at me.hyeonic.week11.Phone.valueOf(Phone.java:3)
	at me.hyeonic.week11.Main.main(Main.java:15)
```

## java.lang.Enum

`java.lang.Enum` 클래스는 Java의  enum 타임의 기반이 되는 클래스이다. enum type은 내부적으로 모두 java.lang.Enum 클래스를 상속한다. 또한 Enum 클래스의 생성자는 유일한 생성자로, 개발자는 해당 생성자를 호출할 수 없다. 

`values()와 `valueOf()`를 제외한 다른 메서드는 아래와 같다.

### public final String name()
열거형 선언에서 선언한 대로 `상수의 이름을 반환`한다. 대부분의 개발자는 `toString() 메소드` 사용을 추천한다. toString() 메소드를 오버라이딩 하여 사용하면 `사용자 친화적인 이름을 반환`할 수 있기 때문이다. name() 메소드는 릴리스마다 달라지지 않는 정확한 이름을 반환하기 때문에 `정확도가 중요한 특수한 상황`에서 사용한다.

### public final int ordinal()

열거형 상수의 `순서를 반환`한다. `선언된 위치를 기준으로 0부터 부여`된다. 개발자가 직접 사용하기 보다는, `EnumSet`과 `EnumMap`과 같은 정교한 `Enum 기반 데이터 구조`에서 사용할 수 있도록 설계되었다.

::: warning
`ordinal()` 메소드를 기반으로 코드를 작성하는 것은 위험하다. 후에 enum에 상수 인스턴스가 추가되면, 해당 index가 유지되는 것을 보장하지 않는다.
:::

## References

[Enum class](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/Enum.html)<br>

<TagLinks />