---
title: Overriding vs Overloading
tags: ['Java', 'overriding', 'overloading']
---

# Overriding vs Overloading

## Overriding

메서드 오버라이딩은 부모 클래스와 자식 클래스 사이에서 발생한다. 부모 클래스의 메서드를 동일한 이름으로 자식 클래스에 작성할 때 발생한다. 자식 클래스에 메서드를 오버라이딩 한 후 실행하게 되면 동적 바인딩이 일어나고 부모 클래스의 메서드는 무시된다.

### Method Overriding 조건

 1. 메서드 오버라이딩은 부모 클래스의 메서드와 완전히 `동일한 메서드를 재정의`해야 한다. `메서드 이름`, `반환 타입`, `매개 변수`가 모두 같아야 한다.
 2. 메서드 오버라이딩 시 부모 클래스 메서드의 접근 지정자보다 범위가 좁아질 수 없다. `public` 메서드 인 경우 private, protected가 아닌 반드시 `public`으로 작성해야 한다.
 3. static, private, final로 선언된 메서드는 오버라이딩 될 수 없다.

### Overriding 예시

**Figure.java**
```java
// 도형 클래스
public class Figure { 

    private int x;
    private int y;

    public Figure() {
        System.out.println("Figure 생성자");
    }

    public Figure(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public int getX() {
        return this.x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return this.y;
    }

    public void setY(int y) {
        this.y = y;
    }

    public void print() {
        System.out.println("Figure의 print");
    }
}
```

**Cycle.java**
```java
// 도형 클래스를 상속 받는 원 클래스
public class Cycle extends Figure { 

    private int radius;

    public Cycle() {
        super();
        System.out.println("cycle 생성자");
    }

    public Cycle(int x, int y, int radius) {
        super(x, y);
        this.radius = radius;
    }

    public int getRadius() {
        return this.radius;
    }

    public void setRadius(int radius) {
        this.radius = radius;
    }

    @Override 
    public void print() { // Figure 클래스의 print 메소드 오버라이딩
       System.out.println("Cycle의 print");
    }
}
```

**Main.java**
```java
public class Main {

    public static void main(String[] args) {
        Cycle cycle = new Cycle(1, 1, 3);
        cycle.print();
    }
}
```

**출력 결과**
```bash
Cycle의 print
```

### @Override

JDK 1.5에서 추가된 애노테이션이다. 자식 클래스에 오버라이딩을 위해 메서드를 작성하던 중 원형과 다를 경우 컴파일러는 새로운 메서드로 인식하고 아무런 오류를 보여주지 않는다. Java에서는 이러한 오류를 컴파일 시 쉽게 발견할 수 있도록 추가하였다. 

@Override는 컴파일러에게 다음 라인에 오는 메서드가 오버라이딩하는 메서드임을 알려주고 원형 메서드를 체크하도록 지시한다.

## Overloading

이름은 같지만 메서드의 인자의 타입과 개수, 반환 타입이 서로 다른 메서드를 여러개 정의할 수 있다. 컴파일러는 메서드 시그니처를 기반으로 메서드 오버로딩을 판단한다.

::: tip 메서드 시그니처
메서드의 이름 + 매개변수 리스트
:::

### Overloading 예시
```java
public int getSum(int a, int b) {
    return a + b;
}

public double getSum(double a, double b) {
    return a + b;
}

public int getSum(int a, int b, int c) {
    return a + b + c;
}
```

<TagLinks />