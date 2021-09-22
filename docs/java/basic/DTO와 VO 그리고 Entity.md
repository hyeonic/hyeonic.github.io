---
tags: ['dto', 'vo', 'entity']
---

# DTO와 VO 그리고 Entity

## DTO

`Data Transfer Object`로 `계층(Layer)` 간 데이터 교환을 위해 사용하는 `객체`이다. 주로 데이터 교환을 위해서만 사용하기 때문에 특별한 로직을 가지고 있지 않고 `getter/setter` 메소드만 갖는다.

```java
public class UserDto {
    private String name;
    private int age;

    public UserDto(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return this.age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
```

---

## VO

`Value Object`로 `값 그 자체`를 표현하는 `객체`이다. 특별한 `로직`을 포함할 수 있으며, 객체의 `불변성(객체의 정보가 변경되지 않는 것)`을 보장한다. 

서로 다른 이름을 갖는 `VO 인스턴스`를 가질 수 있다. 모든 `속성`이 같다면 두 인스턴스는 같은 객체임을 보장해야 한다. 이것을 위해서 `VO`는 `Object` 클래스의 `equals` 메소드와 `hashCode` 메소드를 오버라이딩 해야 한다.

```java
public class User {

    private final String name;
    private final int age;

    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return age == user.age && Objects.equals(name, user.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
}
```

---

## Entity

실제 `DB`의 `테이블`과 매핑되는 `객체`이다. 식별자인 `id`를 통하여 각각의 `Entity`를 구분할 수 있다. 또한 추가적인 `로직`을 포함할 수 잇다. 

```java
@Entity
public class User {
    
    @Id @GeneratedValue(Strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private int age;

    protected User() {
    }

    @Builder
    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```

---

## DTO 와 VO

보통 웹 개발에서 `DTO`와 `VO`를 `혼용`해서 사용하곤 한다. 하지만 두 `객체`는 의미를 살펴보아도 서로 다른 점을 가지고 있다. 이제는 두 개의 `차이점`을 잘 구분해야 한다.

또한 `DTO`를 `VO`처럼 `불변 객체`로 사용하면 얻는 이점은 전송하는 과정에서 데이터가 변조되지 않음을 보장한다. 

---

## Entity 와 DTO

`Entity`를 `DTO`로 사용하게 된다면 어떤 문제점이 생기는지 살펴보았다. DB는 보통 정해지면 쉽게 속성 값이 변경되지 않는다. 하지만 `view`의 경우 `요구사항`에 따라 요청하는 데이터가 자주 바뀔 우려가 있다. 이것을 계속해서 반영하게 되면 `Entity`는 수정될 것이고, 영속성 모델을 표현한 `Entity`의 순수성은 모호해질 것이다. 그렇기 때문에 `controller layer`에서 사용할 `DTO`와 `Entity`는 분리하여 사용하는 것이 바람직하다.

이와 비슷하게 `DTO`에서 `Entity` 클래스를 참조하는 것은 괜찮지만 `Entity`에서 `DTO`를 참조하여 사용하는 것은 바람직하지 않다. 앞서 말했던 것 처럼 `DTO`의 속성이 변하게 되면 그것을 참조하는 `Entity`에게도 예상치 못하는 수정을 야기할 수 있기 때문이다.

---

## References.

[[10분 테코톡] 🎼라흐의 DTO vs VO](https://www.youtube.com/watch?v=J_Dr6R0Ov8E&t=258s)

<TagLinks />