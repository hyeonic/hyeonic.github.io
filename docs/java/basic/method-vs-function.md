---
title: method와 function의 차이
tags: ['Java']
---

# method와 function의 차이

## method

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/141680682-e3217e15-a05c-4b5d-8da4-b0737fb5aed4.png>
</p>

메서드는 클래스에 종속적이다. 보통 파라미터를 받지 않는 `함수`는 항상 같은 값을 리턴할 것을 예상하지만 메서드의 경우 클래스에 종속적이기 때문에 파라미터를 받지 않아도 `인스턴스 변수`에 의하여 `리턴값이 달라질 수 있다.` 결국 클래스에 종속적인 메서드는 `부작용(side effect)`을 야기한다.

## function

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/141680714-79892c2c-e355-49ab-b5d7-a987e7353299.png>
</p>

Java와 같은 언어에서 `수학적인 함수`인지 아닌지가 메서드와 함수를 구분하는 가장 큰 핵심이 된다. 특히 파라미터가 같다면 수학적 함수를 반복적으로 호출했을 때 항상 같은 값을 반환한다. 즉 함수형이라는 말은 '수학의 함수처럼 부작용이 없는'라는 뜻을 내포한다. 

::: tip 수학적인 함수
수학적인 함수는 절대 부작용을 포함하지 않는다. log, sin과 같은 수학적 함수는 부작용이 없음을 보장한다. 항상 일정한 파라미터에 일정한 값을 리턴한다.
:::

::: tip
`인스턴스 변수를 이용하지 않는 정적 메서드`는 일정한 리턴값을 보장할 수 있기 때문에 함수라고 불릴 수도 있다.
:::

## References

라울-게이브리얼 우르마, 마리오 푸스코, 앨런 마이크로프트, 『Modern Java in Action』, 한빛미디어(2019), p572.

<TagLinks />