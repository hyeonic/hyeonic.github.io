---
title: "불변 객체"
date: 2022-04-01
update: 2022-04-01
tags:
 - java
 - 불변 객체
 - immutable object
feed:
  enable: false
---

## 불변 객체

`불변 객체(Immutable Object)`란, 생성 후 그 상태를 바꿀 수 없는 객체이다. 불변을 만들기 위해서는 `기본형 타입`과 `참조형 타입`에서 다른 방식으로 적용해야 한다.

## 기본형 타입의 불변

기본형 타입의 경우 참조 값이 아닌 실제 값이 저장되기 때문에 쉽게 적용이 가능하다. 내부 상태를 변경할 방법을 제한하면 불변을 보장한다. 즉 `setter` 생성을 제한하거나 `final` 키워드를 사용하면 된다.

```java
public class Student {
    private final int age;

    public Student(int age) {
        this.age = age;
    }

    public int getAge() {
        return age;
    }
}
```

## 참조형 타입의 불변

참조형 변수를 불변으로 만들기 위해서는 고려해야 할 것이 많다. 단순히 `final` 키워드를 사용할 경우 단순히 해당 참조 변수의 재할당만 막을 뿐이다.

아래는 간단한 예시 작성을 위한 `일급 컬렉션`이다.

```java
public class Student {
    private String name;
    private int age;

    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
```

```java
public class Students {
    private final List<Student> students;

    public Students(List<Student> students) {
        this.students = students;
    }

    public List<Student> getStudents() {
        return students;
    }
}
```

인스턴스 변수를 Student List 하나만 갖는 `일급 컬렉션`이다. 살펴보면 `setter`가 존재하지 않기 때문에 자칫 잘못하면 `불변 객체`로 오해하기 쉽다.

만약 원본 리스트가 3명의 학생을 가진다고 가정한다. 해당 리스트를 기반으로 Students를 생성한다. 불변성을 보장하기 위해서는 원본인 studentList에 값을 추가하더라도 Students 안에 students는 그대로 3명의 학생을 가져야 한다.

```java
class StudentsTest {

    @DisplayName("원본 리스트에서 값을 추가하면 해당 내부 리스트 또한 변경된다. 즉 불변이 아니다.")
    @Test
    void 원본리스트에서_추가하면_변경된다() {
        // given
        Student student1 = new Student("학생1", 20);
        Student student2 = new Student("학생2", 20);
        Student student3 = new Student("학생3", 20);

        List<Student> studentList = new ArrayList<>(Arrays.asList(student1, student2, student3));

        Students students = new Students(studentList);

        // when
        studentList.add(new Student("학생4", 20));

        // then
        assertThat(students.getStudents().size()).isEqualTo(3);
    }
}
```

하지만 위 테스트는 `실패`한다. 이유는 원본 리스트와 Students의 students는 같은 주소를 가지고 있기 때문에 `heap` 메모리 안에 데이터를 공유하고 있다. 즉 원본 리스트가 수정되면 불변을 보장할 수 없다.

이것을 막기 위해서는 생성 시점에 `방어적 복사`를 진행해야 한다.

### 방어적 복사

방어적 복사란, 생성자의 인자로 받은 객체의 `복사본`을 만들어` 내부 변수를 초기화`하거나 `getter` 메서드가 내부 변수를 반환할 때 객체의 복사본을 만들어 반환하는 것이다. 즉 `내부 객체를 보호`하기 위해 방어적인 복사를 사용하는 것이다.

이것을 적용한 `Students`는 아래와 같다.

```java
public class Students {
    private final List<Student> students;

    public Students(List<Student> students) {
        this.students = new ArrayList<>(students);
    }

    public List<Student> getStudents() {
        return students;
    }
}
```

이제 원본 리스트와 주소를 공유하지 않는다.

```java
class StudentsTest {

    @DisplayName("원본 리스트에서 값을 추가하면 해당 내부 리스트는 변경되지 않는다. 불변일까?")
    @Test
    void 원본리스트에서_추가하면_변경되지_않는다() {
        // given
        Student student1 = new Student("학생1", 20);
        Student student2 = new Student("학생2", 20);
        Student student3 = new Student("학생3", 20);

        List<Student> studentList = new ArrayList<>(Arrays.asList(student1, student2, student3));

        Students students = new Students(studentList);

        // when
        studentList.add(new Student("학생4", 20));

        // then
        assertThat(students.getStudents().size()).isEqualTo(3);
    }
}
```

한 가지 주의해야 할 점은 방어적 복사는 `깊은 복사가 아니다`. 즉 내부 요소들은 `여전히 공유`되고 있다. 즉 내부 요소가 불변성을 보장하지 않고 수정이 가능하면 해당 요소를 가지는 리스트도 불변성을 보장하지 못한다. 또한 getter를 통해 내부 List를 `그대로 반환`하는 것도 불변에 있어서 큰 문제를 야기한다.

```java
class StudentsTest {

    @DisplayName("요소들은 공유된다. 즉 불변이 아니다.")
    @Test
    void 요소들은_공유된다() {
        // given
        Student student1 = new Student("학생1", 20);
        Student student2 = new Student("학생2", 20);
        Student student3 = new Student("학생3", 20);

        List<Student> studentList = new ArrayList<>(Arrays.asList(student1, student2, student3));

        Students students = new Students(studentList);

        // when
        for (Student student : studentList) {
            student.setAge(10); // 값 수정
        }

        // then
        assertThat(students.getStudents().get(0).getAge()).isEqualTo(20); // 테스트 실패
    }

    @DisplayName("get으로 반환된 리스트를 통해 내부 리스트 변경이 가능하다. 즉 불변이 아닌다.")
    @Test
    void get으로_내부리스트_변경이_가능하다() {

        // given
        Student student1 = new Student("학생1", 20);
        Student student2 = new Student("학생2", 20);
        Student student3 = new Student("학생3", 20);

        List<Student> studentList = new ArrayList<>(Arrays.asList(student1, student2, student3));

        Students students = new Students(studentList);

        // when
        List<Student> studentsInStudentList = students.getStudents();
        studentsInStudentList.add(new Student("학생4", 20)); // 요소 추가

        // then
        assertThat(students.getStudents().size()).isEqualTo(3); // 테스트 실패
    }
}
```

위 두 테스트는 모두 `실패`한다. 즉 내부 상태를 보호하지 못한다. 이때 필요한 것은 Unmodifiable Collection이다.

### Unmodifiable Collection

Unmodifiable Collection을 이용하면 변경이 일어날 때 즉시 `UnsupportedOperationException` 예외를 던진다. 즉 해당 리스트를 `읽기 전용`으로 사용할 수 있다.

```java
class StudentsTest {

    @DisplayName("값을 추가하면 예외를 던진다.")
    @Test
    void 값을_추가하면_예외를_던진다() {
        // given
        Student student1 = new Student("학생1", 20);
        Student student2 = new Student("학생2", 20);
        Student student3 = new Student("학생3", 20);

        List<Student> studentList = new ArrayList<>(Arrays.asList(student1, student2, student3));

        Students students = new Students(studentList);

        // when & then
        assertThatThrownBy(() -> {
            students.getStudents().add(new Student("학생4", 20));
        }).isInstanceOf(UnsupportedOperationException.class);
    }
    ...
}
```

하지만 이것이 완벽한 불변성을 보장해주지 않는다. 최초 예제처럼 원본 리스트가 변경될 경우 읽기 전용으로 선언한 리스트도 똑같이 변경되기 때문에 주의해서 사용해야 한다.

## 정리

정리하면 결국 내부 객체를 완벽히 보호하기 위해서는 `방어적 복사`와 `unmodifiable collection`을 적절히 활용해야 한다. 또한 내부의 모든 요소들이 불변성을 보장해야만 불변 객체를 만들 수 있다.

```java
public class Student {
    private final String name;
    private final int age;

    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```

```java
public class Students {
    private final List<Student> students;

    public Students(List<Student> students) {
        this.students = new ArrayList<>(students);
    }

    public List<Student> getStudents() {
        return Collections.unmodifiableList(students);
    }
}
```

## References

[불변객체를 만드는 방법](https://tecoble.techcourse.co.kr/post/2020-05-18-immutable-object/)<br>
[방어적 복사와 Unmodifiable Collection](https://tecoble.techcourse.co.kr/post/2021-04-26-defensive-copy-vs-unmodifiable/)<br>
