---
title: Checked Exception, Unchecked Exception
tags: ['Java', 'Checked Exception', 'Unchecked Exception']
---

# Checked Exception, Unchecked Exception

## Error와 Exception

### Error

`Error`는 시스템 혹은 하드웨어의 오작동으로 인해 발생한다. 이러한 수준의 Error는 심각한 수준의 오류이기 때문에 개발자는 이것을 미리 예측하여 방지할 수 없다.

### Exception

`Exception`은 개발자가 구현한 로직에서 발생한 실수나 사용자의 영향으로 발생한다. Exception은 미리 예측하여 방지할 수 있기 때문에 적절한 예외 처리를 진행해야 한다.

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/144165617-d389bb7c-0a11-47dc-b24a-5aab326a5982.png>
</p>

위 그림은 Java에서 `Error`와 `Exception`의 상속 구조이다. `Trowable`은 최상위 클래스 Object를 상속하고 있다.

이러한 Exception은 크게 `Checked Exception`과 `Unchecked Exception`으로 구별할 수 있다. 두 Exception의 구별은 위 그림과 같이 `Runtime Exception`의 상속 유무를 따라 구별 가능하다.

## Checked Exception vs Unchecked Exception

### Checked Exception

 * `처리 여부`: 반드시 예외를 처리해야 한다.
 * `확인 시점`: 컴파일 단계에서 확인 가능하다.
 * `대표적인 예외`: Exception을 상속 받는 하위 클래스 중 Runtime Exception을 상속하지 않은 예외
    * IOException
    * SQLException
    * ...

반드시 명시적으로 예외를 처리해야 한다. `try-catch`로 예외 처리를 하거나 `throw` 로 예외를 발생시킨 메서드로 전달해야 한다.

### Unchecked Exception

 * `처리 여부`: 예외 처리를 하지 않아도 된다.
 * `확인 시점`: 런타임 단계에서 확인 가능하다.
 * `대표적인 예외`: Runtime Exception의 하위 클래스
    * NullPointerException
    * IllegalArgumentException
    * ...

명시적인 예외 처리를 강제 하지 않는다. `try-catch`를 활용한 예외 처리, `throw`로 호출한 메서드로 예외를 던지지 않아도 괜찮다.

## References

[Checked Exception을 대하는 자세](https://cheese10yun.github.io/checked-exception/)<br>
[Java의 Error와 Exception 그리고 예외처리 전략](https://toneyparky.tistory.com/40)

<TagLinks />