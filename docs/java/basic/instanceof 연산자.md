---
title: instanceof 연산자
tags: ['Java', 'instanceof']
---

# instanceof 연산자

인스턴스는 클래스를 통해 만들어진 객체를 의미한다. `instanceof` 연산자는 `만들어진 객체가 특정 클래스의 인스턴스인지 아닌지` 확인하는 연산자이다. `instanceof` 연산자는 특정 클래스의 객체가 맞으면 `true`를 반환한다.

```java
ArrayList<Integer> list = new ArrayList<>();
list instanceof ArrayList
```

## 예제

간단한 상속 관계를 표현한 클래스들이다.

```java
public class Animal {

}

public class Whale extends Animal {
}

public class Penguin extends Animal {
}
```

```java
public class Main {

    public static void main(String[] args) {

        Animal animal = new Animal();
        Whale whale = new Whale();
        Penguin penguin = new Penguin();

        System.out.println(animal instanceof Animal);

        System.out.println(whale instanceof Animal);
        System.out.println(whale instanceof Whale);

        System.out.println(penguin instanceof Animal);
        System.out.println(penguin instanceof Penguin);

        System.out.println(animal instanceof Object);
        System.out.println(whale instanceof Object);
        System.out.println(penguin instanceof Object);
    }
}
```

실행 결과는 모두 `true`이다. 특히 모든 클래스의 최상위 클래스는 `Object`이기 때문에 해당하는 연산 또한 true를 반환한다.

```bash
true
true
true
true
true
true
true
true
```

또한 모든 참조 변수를 상위 클래스로 설정하여도 동일한 결과를 나타낸다. 객체 참조 변수의 타입이 아닌 `실제 객체의 타입에 의해 처리`되기 때문이다.

```java
public class Main {

    public static void main(String[] args) {

        Animal animal = new Animal();
        Animal whale = new Whale();
        Animal penguin = new Penguin();

        System.out.println(animal instanceof Animal);

        System.out.println(whale instanceof Animal);
        System.out.println(whale instanceof Whale);

        System.out.println(penguin instanceof Animal);
        System.out.println(penguin instanceof Penguin);

        System.out.println(animal instanceof Object);
        System.out.println(whale instanceof Object);
        System.out.println(penguin instanceof Object);
    }
}
```

```bash
true
true
true
true
true
true
true
true
```

이러한 instanceof 연산자는 클래스들의 상속 관계뿐만 아니라 `인터페이스의 구현 관계`에서도 동일하게 적용된다.

```java
public interface Swimable {
    void swim();
}

public class Whale extends Animal implements Swimable {
    @Override
    public void swim() {
    }
}

public class Penguin extends Animal implements Swimable {
    @Override
    public void swim() {
    }
}
```

```java
public class Main {

    public static void main(String[] args) {

        Animal whale = new Whale();
        Animal penguin = new Penguin();

        System.out.println(whale instanceof Swimable);
        System.out.println(penguin instanceof Swimable);
    }
}
```

```bash
true
true
```

## References

<TagLinks />