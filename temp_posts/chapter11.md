---
title: "chap11 상속과 다형성"

categories:
  - C++
tags:
  - c++
  - c++와인드업플러스
  - 상속
  - 다형성
last_modified_at: 2020-11-16 11:16:00 +0900
---

## 11. 상속과 다형성

### 11.1 기본형의 형변환 정리
 
#### 기본형에 대한 묵시적 형변환 

 1. 배열 to 포인터 변환
 2. 함수 to 포인터 변환
 3. 정수 승격
 4. 실수 승격
 5. 정수 변환
 6. 실수 변환
 7. 실수와 정수 사이의 변환
 8. 포인터 변환

#### 기본형에 대한 명시적 형변환 정리
```cpp
int num1 = 1, num2 = 2;
double mun3 = (double) num1 / (double) num2; // num1, num2를 double 형 변환 후 계산

double num2 = (double) num1;
double num2 = double (num1);
```

### 11.2 서로 다른 클래스 객체들 사이의 대입
 - 기본형들은 미리 정해진 규칙에 따라 묵시적 형변환이 일어날 수 있다. 서로 다른 클래스 객체들 사이의 묵시적 형변환은 어떻게 해야 하는가?

 다음은 자식 클래스가 부모 클래스의 참조 객체로 대입되는 예제이다.
```cpp
class Circle
{
public :
    ...
    GetArea() {...}
}

class Sphere : public Circle 
{
public: 
    ...
    GetArea() {...}
}

int main() 
{
    Sphere sph(1, 1, 1, 1);
    Circle& cir = sph; // 자식 객체이므로 부모 참조로 대입 가능하다.

    cout << cir.GetArea(); // Sphere 객체의 GetArea가 호출되길 원하지만 Circle 객체의 GetArea가 호출된다. 
}
``` 

&nbsp; 하나의 가정을 더한다. Circle와 Sphere와 아무 연관이 없는 Temp class가 있다고 하자.
```cpp
Temp temp;
Circle circle;
Sphere sphere;

1. temp = circle; // 서로 무관한 클래스 객체 사이 이므로 불가능하다.
2. circle = sphere; // 가능하다. 자동적으로 up casting 된다.
3. sphere = circle; // down casting 해야 하기 때문에 불가능 하다.
```

&nbsp; 2번의 경우 가능한 이유는 자식 클래스는 부모 클래스의 대입 연산자 함수를 따른다. default로 명시 되어 있고, 오버로딩도 가능하다.
```cpp
Circle& operator=(const Circle& cir) { ... } // 대입 연산자 오버로딩 
```

&nbsp; 대입 연산자가 수행되면 멤버 단위 복사를 수행한다. 하지만 자식 클래스에만 존재하는 temp_ 지역 변수는 대입에 관여하지 않는다.

![](/assets/images/c++/chap11-1.jpg)

&nbsp; Sphere 객체에 있는 멤버 변수 중 Circle 객체에 있는 멤버 변수의 내용만 그대로 복사된다. 이는 우리가 원하는 방향이 아니다.

#### 서로 다른 클래스 객체들 사이의 복사 생성

&nbsp; 복사 생성 또한 비슷한 상황이다.

```cpp
Temp temp(1, 1);
Circle circle = temp; // 복사 생성. 불가능하다.

Sphere sphere(1, 1, 1, 1);
Circle circle; // 가능하다. 이유는 위와 동일하다.

Circle circle(1, 1, 1);
Sphere sphere = circle; // 불가능하다.
```

### 11.3 상속 관계인 객체와 포인터의 관계

```cpp
Circle* p_circle = &sphere; // 가능하다.
Sphere* p_sphere = &circle; // 불가능하다.
```
&nbsp; 위가 가능한 이유는 자식 객체의 주소를 부모 포인터 변수에 대입하는 것은 묵시적으로 형변환이 일어나기 때문이다. 과일을 예로 들면 과일 도장을 포인터라고 가정한다. 사과, 바나나, 배 등을 찍는 행위는 가능 하지만 사과 도장이 배, 바나나를 찍는 것은 실수에 해당한다.

```cpp
int main() 
{
    Sphere sphere(1, 1, 1, 1);
    Circle* p_circle = &sphere; // 가능하다.

    cout << p_circle->GetArea();
}
```
&nbsp; 하지만 sphere의 GetArea가 호출되길 원하지만 아직 Circle에 GetArea가 호출된다. 간단하게 해결 하는 방법이 있긴 하다.

```cpp
((Sphere*) p_circle)->GetArea()
```
&nbsp; 명시적인 형변환을 사용한다.

### 11.4 가상 합수

### 12.5 가상 함수의 동작 원리

### 12.6 추상 클래스와 순수 가상 함수

### 12.7 virtual 소멸자

### 11.8 상속 관계와 포함 관계

### 11.9 변환 함수

### 11.10 cast 연산자에 의한 명시적 형변환

### 11.11 실행시간 타입 정보 알아내기

### 11.12 클래스 중심의 다중 파일 프로그래밍
