---
title: 프리코스 3주차
tags: ['우아한테크코스', '프리코스']
---

# 프리코드 3주차

## 미션 - 자판기

우아한테크코스 4기 프리코스 3주차 미션을 진행하며 고민한 내용을 정리하고 추가적인 개인 목표를 세워 정리해보았다. 

 * [미션 - 자동차 경주 게임](https://github.com/hyeonic/java-vendingmachine-precourse)
 * [제출 코드](https://github.com/hyeonic/java-vendingmachine-precourse/tree/hyeonic)

## 목차

 * [1. 시작하기 전](#_1-시작하기-전)
 * [2. 구현 목록 정리](#_2-구현-목록-정리)
 * [3. Can’t automatically merge](#_1-can-t-automatically-merge)
 * [4. MVC 패턴](#_4-mvc-패턴)
 * [5. 비즈니스 로직과 UI 로직 분리](#_5-비즈니스-로직과-ui-로직-분리)
 * [6. Stream 활용](#_6-stream-활용)
 * [7. enum](#_7-enum)
 * [8. 객체에게 메시지 보내기](#_8-객체에게-메시지-보내기)
 * [9. 과도한 검증 코드와 책임의 이전](#_9-과도한-검증-코드와-책임의-이전)
 * [References](#references)

## 1. 시작하기 전

이번 주차에는 다시 한 번 초심으로 돌아가 기존에 주어진 `1, 2차 피드백`을 최대한 수용하고 객체의 `결합도는 줄이고 응집도를 높이기` 위해 노력하였다. 

3차 미션은 확실히 1, 2차보다 난이도가 높다는 느낌이 들었다. 이전에는 객체의 역할이 뚜렷하게 머리에 그려졌지만 다소 복잡한 자판기 로직으로 인해 객체에게 적절한 `역할`과 `책임`을 부여하는데 오랜 시간이 걸렸다. 

또한 현재 진행하고 있는 방식이 적절한지 끊임 없이 의심하였다. 특히 객체의 `응집도`를 높이기 위해 단순히 반복되는 검증 코드들을 남발하는 것이 아닌지 고민이 되었다. 이것은 결국 좋은 설계를 위한 `트레이드 오프`의 과정이라고 생각된다.

## 2. 구현 목록 정리

2주차 공통 피드백에는 아래와 같은 내용이 담겨 있었다.

::: tip 기능 목록 구현을 재검토한다
기능 목록을 클래스 설계와 구현, 함수(메서드) 설계와 구현과 같이 너무 상세하게 작성하지 않는다. 클래스 이름, 함수(메서드) input/output은 언제든지 변경될 수 있기 때문이다. 너무 세세한 부분까지 정리하기보다 구현해야 할 기능 목록을 정리하는 데 집중한다. **정상적인 경우도 중요하지만, 예외적인 상황도 기능 목록에 정리** 한다. 특히 예외 상황은 시작단계에서 모두 찾기 힘들기 때문에 기능을 구현하면서 계속해서 추가해 나간다.

#### 기능 목록 작성 예시
- 사용자가 입력한 이름은 쉼표 기준으로 분리해야 한다.
- 사용자 이름이 5자 이하인지 검증해야 한다.
- 자동차는 4 이상인 경우 전진한다.
- 자동차는 4 미만인 경우 정지한다.
- 0 ~ 9 사이의 임의의 값을 생성한다.
- 여러 대의 자동차 중 최대 위칫값을 구한다.
- 최대 위칫값에 해당하는 자동차 목록을 구한다.
:::

우선 구현해야 할 기능 목록을 정리하는 데 집중하기 위해 노력하였다. 기능 목록을 작성하고 개발을 진행하던 중에도 계속해서 고려해야 할 예외나 요구사항들이 생겨 났다. 그럴 때 마다 적절히 수정하여 `살아 있는 문서`를 만들기 위해 노력하였다.

::: details ver 0.1 기능 목록
반환되는 동전이 최소한이 되는 자판기를 구현한다.

### 1. 보유 금액
 * [ ] 보유 금액을 `입력` 받는다.
 * [ ] 보유 금액은 `정수`이다.
 * [ ] 보유 금액은 `음수가 될 수 없다.`
 * [ ] 보유 금액은 `10으로 나누어 떨어져야 한다.`
 * [ ] 보유 금액으로 동전을 `무작위`로 생성한다.
 * [ ] 생성이 완료되면 동전 별 보유 개수를 `출력`한다. 보유 개수가 0개인 경우에도 출력을 진행한다.
 
### 2. 투입 금액
 * [ ] 투입 금액을 `입력` 받는다.
 * [ ] 투입 금액은 `정수`이다.
 * [ ] 투입 금액은 `음수가 될 수 없다.`
 * [ ] 투입 금액은 `10으로 나누어 떨어져야 한다.`
 * [ ] 투입 금액으로는 동전을 생성하지 않는다.

### 3. 상품
 * [ ] `상품명`, `가격`, `수량`을 `입력`하여 상품을 추가한다.
 * [ ] 개별 상품은 대괄호`[]`로 묶어 세미콜론`;`으로 구분한다. ex) `[콜라,1500,20];[사이다,1000,10]`
 * [ ] 개별 상품은 `대괄호`로 묶여 있어야 한다.
 * [ ] 상품이 한 개 이상인 경우 `세미콜론`으로 구분되어야 한다.
 * [ ] 상품 가격은 `100원 부터 시작`하며, `10원으로 나누어 떨어져야 한다.`

### 4. 구매
 * [ ] 상품 구매를 위해 상품명을 `입력`한다.
 * [ ] `상품이 존재하지 않는 경우` 예외를 던지고 재입력을 진행한다.
 * [ ] 상품 구매를 진행 할 때 `현재 투입 금액`이 `출력`된다.

### 5. 잔돈 반환
 * [ ] 구매가 완료되면 `잔돈을 반환`한다.
 * [ ] 남은 금액이 `상품의 최저 가격보다 적거나`, `모든 상품이 소진된 경우` 바로 잔돈을 돌려준다.
 * [ ] 잔돈을 반환할 수 없는 경우 잔돈으로 `반환할 수 있는 금액만 반환`한다.
 * [ ] 현재 투입 금액을 출력하고 `투입 금액의 최소 개수의 동전`으로 잔돈을 돌려준다.
 * [ ] 반환되지 않은 금액은 자판기에 남는다.
:::

::: details ver 0.2 기능 목록
반환되는 동전이 최소한이 되는 자판기를 구현한다.

### 1. 보유 금액
 * [ ] 보유 금액을 `입력` 받는다.
 * [ ] 보유 금액은 `정수`이다.
 * [ ] 보유 금액은 `음수가 될 수 없다.`
 * [ ] 보유 금액은 `10으로 나누어 떨어져야 한다.`
 * [ ] 보유 금액으로 동전을 `무작위`로 생성한다.
 * [ ] 생성이 완료되면 동전 별 보유 개수를 `출력`한다. 보유 개수가 0개인 경우에도 출력을 진행한다.

### 2. 상품
* [ ] `상품명`, `가격`, `수량`을 `입력`하여 상품을 추가한다.
* [ ] `개별 상품`은 대괄호`[]`로 묶어 세미콜론`;`으로 구분한다. ex) `[콜라,1500,20];[사이다,1000,10]`
* [ ] 상품이 한 개 이상인 경우 `세미콜론`으로 구분되어야 한다.
* [ ] `개별 상품`은 `대괄호`로 묶여 있어야 한다. 
* [ ] `상품의 이름`이 `비어있는 경우` 예외를 던진다. ex) `` ✚
* [ ] `상품의 이름`이 `공백인 경우` 예외를 던진다. ex) ` ` ✚
* [ ] `상품의 가격`은 `정수`이다. ✚
* [ ] `상품의 가격`은 `음수가 될 수 없다.` ✚
* [ ] `상품의 가격`은 `100원 부터 시작`한다. ✚
* [ ] `상품의 가격`은 `10원으로 나누어 떨어져야 한다.` ✚
* [ ] `상품의 수량`은 `정수`이다. ✚
* [ ] `상품의 수량`은 `음수가 될 수 없다.` ✚

### 3. 투입 금액
 * [ ] 투입 금액을 `입력` 받는다.
 * [ ] 투입 금액은 `정수`이다.
 * [ ] 투입 금액은 `음수가 될 수 없다.`
 * [ ] 투입 금액은 `10으로 나누어 떨어져야 한다.`
 * [ ] 투입 금액으로는 동전을 생성하지 않는다.

### 4. 구매
 * [ ] 상품 구매를 위해 상품명을 `입력`한다.
 * [ ] `상품이 존재하지 않는 경우` 예외를 던지고 재입력을 진행한다.
 * [ ] 상품 구매를 진행 할 때 `현재 투입 금액`이 `출력`된다.

### 5. 잔돈 반환
 * [ ] 구매가 완료되면 `잔돈을 반환`한다.
 * [ ] 남은 금액이 `상품의 최저 가격보다 적거나`, `모든 상품이 소진된 경우` 바로 잔돈을 돌려준다.
 * [ ] 잔돈을 반환할 수 없는 경우 잔돈으로 `반환할 수 있는 금액만 반환`한다.
 * [ ] 현재 투입 금액을 출력하고 `투입 금액의 최소 개수의 동전`으로 잔돈을 돌려준다.
 * [ ] 반환되지 않은 금액은 자판기에 남는다.
:::

::: details ver 0.3 기능 목록
반환되는 동전이 최소한이 되는 자판기를 구현한다.

### 1. 보유 금액
 * [ ] 보유 금액을 `입력` 받는다.
 * [ ] 보유 금액은 `정수`이다.
 * [ ] 보유 금액은 `음수가 될 수 없다.`
 * [ ] 보유 금액은 `10으로 나누어 떨어져야 한다.`
 * [ ] 보유 금액으로 동전을 `무작위`로 생성한다.
 * [ ] 생성이 완료되면 동전 별 보유 개수를 `출력`한다. 보유 개수가 0개인 경우에도 출력을 진행한다.

### 2. 상품
* [ ] `상품명`, `가격`, `수량`을 `입력`하여 상품을 추가한다.
* [ ] `개별 상품`은 대괄호`[]`로 묶어 세미콜론`;`으로 구분한다. ex) `[콜라,1500,20];[사이다,1000,10]`
* [ ] 상품이 한 개 이상인 경우 `세미콜론`으로 구분되어야 한다.
* [ ] `개별 상품`은 `대괄호`로 묶여 있어야 한다. 
* [ ] `상품의 이름`이 `비어있는 경우` 예외를 던진다. ex) ``
* [ ] `상품의 이름`이 `공백인 경우` 예외를 던진다. ex) ` `
* [ ] `상품의 가격`은 `정수`이다.
* [ ] `상품의 가격`은 `음수가 될 수 없다.`
* [ ] `상품의 가격`은 `100원 부터 시작`한다.
* [ ] `상품의 가격`은 `10원으로 나누어 떨어져야 한다.`
* [ ] `상품의 수량`은 `정수`이다.
* [ ] `상품의 수량`은 `음수가 될 수 없다.`

### 3. 투입 금액
 * [ ] 투입 금액을 `입력` 받는다.
 * [ ] 투입 금액은 `정수`이다.
 * [ ] 투입 금액은 `음수가 될 수 없다.`
 * [ ] 투입 금액은 `10으로 나누어 떨어져야 한다.`
 * [ ] 투입 금액으로는 동전을 생성하지 않는다.

### 4. 구매
 * [ ] 상품 구매를 위해 상품명을 `입력`한다.
 * [ ] `구매 상품의 이름`이 `비어있는 경우` 예외를 던진다. ✚
 * [ ] `구매 상품의 이름`이 `공백인 경우` 예외를 던진다. ✚
 * [ ] `상품이 존재하지 않는 경우` 예외를 던지고 재입력을 진행한다.
 * [ ] 상품 구매를 진행 할 때 `현재 투입 금액`이 `출력`된다.

### 5. 잔돈 반환
 * [ ] 구매가 완료되면 `잔돈을 반환`한다.
 * [ ] 남은 금액이 `상품의 최저 가격보다 적거나`, `모든 상품이 소진된 경우` 바로 잔돈을 돌려준다.
 * [ ] 잔돈을 반환할 수 없는 경우 잔돈으로 `반환할 수 있는 금액만 반환`한다.
 * [ ] 현재 투입 금액을 출력하고 `투입 금액의 최소 개수의 동전`으로 잔돈을 돌려준다.
 * [ ] 반환되지 않은 금액은 자판기에 남는다.
:::

::: details ver 0.4 기능 목록
### 1. 보유 금액
 * [ ] 보유 금액을 `입력` 받는다.
 * [ ] 보유 금액은 `정수`이다.
 * [ ] 보유 금액은 `음수가 될 수 없다.`
 * [ ] 보유 금액은 `10으로 나누어 떨어져야 한다.`
 * [ ] 보유 금액으로 동전을 `무작위`로 생성한다.
 * [ ] 생성이 완료되면 동전 별 보유 개수를 `출력`한다. 보유 개수가 0개인 경우에도 출력을 진행한다.

### 2. 상품
 * [ ] `상품명`, `가격`, `수량`을 `입력`하여 상품을 추가한다.
 * [ ] `개별 상품`은 대괄호`[]`로 묶어 세미콜론`;`으로 구분한다. ex) `[콜라,1500,20];[사이다,1000,10]`
 * [ ] 상품이 한 개 이상인 경우 `세미콜론`으로 구분되어야 한다.
 * [ ] `개별 상품`은 `대괄호`로 묶여 있어야 한다.
 * [ ] `상품의 이름`이 `비어있는 경우` 예외를 던진다. ex) ``
 * [ ] `상품의 이름`이 `공백인 경우` 예외를 던진다. ex) ` `
 * [ ] `상품의 가격`은 `정수`이다.
 * [ ] `상품의 가격`은 `음수가 될 수 없다.`
 * [ ] `상품의 가격`은 `100원 부터 시작`한다.
 * [ ] `상품의 가격`은 `10원으로 나누어 떨어져야 한다.`
 * [ ] `상품의 수량`은 `정수`이다.
 * [ ] `상품의 수량`은 `음수가 될 수 없다.`

### 3. 투입 금액
 * [ ] 투입 금액을 `입력` 받는다.
 * [ ] 투입 금액은 `정수`이다.
 * [ ] 투입 금액은 `음수가 될 수 없다.`
 * [ ] 투입 금액은 `10으로 나누어 떨어져야 한다.`
 * [ ] 투입 금액으로는 동전을 생성하지 않는다.

### 4. 구매
 * [ ] 상품 구매를 위해 상품명을 `입력`한다.
 * [ ] `구매 상품의 이름`이 `비어있는 경우` 예외를 던진다.
 * [ ] `구매 상품의 이름`이 `공백인 경우` 예외를 던진다.
 * [ ] `상품이 존재하지 않는 경우` 예외를 던지고 재입력을 진행한다.
 * [ ] 상품 구매를 진행 할 때 `현재 투입 금액`이 `출력`된다.
 * [ ] 투입 금액이 `구매 가능한 상품의 최저 가격보다 적거나`, `모든 상품이 소진된 경우` 구매가 불가능 하다. ✚

### 5. 잔돈 반환
 * [ ] 구매가 완료되면 `잔돈을 반환`한다.
 * [ ] 잔돈을 반환할 수 없는 경우 잔돈으로 `반환할 수 있는 금액만 반환`한다.
 * [ ] 현재 투입 금액을 출력하고 `투입 금액의 최소 개수의 동전`으로 잔돈을 돌려준다.
 * [ ] 반환되지 않은 금액은 자판기에 남는다.
:::

::: details ver 0.5 기능 목록
### 1. 보유 금액
 * [ ] 보유 금액을 `입력` 받는다.
 * [ ] 보유 금액은 `정수`이다.
 * [ ] 보유 금액은 `음수가 될 수 없다.`
 * [ ] 보유 금액은 `10으로 나누어 떨어져야 한다.`
 * [ ] 보유 금액으로 동전을 `무작위`로 생성한다.
 * [ ] 생성이 완료되면 동전 별 보유 개수를 `출력`한다. 보유 개수가 0개인 경우에도 출력을 진행한다.

### 2. 상품
 * [ ] `상품명`, `가격`, `수량`을 `입력`하여 상품을 추가한다.
 * [ ] `개별 상품`은 대괄호`[]`로 묶어 세미콜론`;`으로 구분한다. ex) `[콜라,1500,20];[사이다,1000,10]`
 * [ ] 상품이 한 개 이상인 경우 `세미콜론`으로 구분되어야 한다.
 * [ ] `개별 상품`은 `대괄호`로 묶여 있어야 한다.
 * [ ] `개별 상품`의 형식이 잘못된 경우 예외를 던진다. ex) `[콜라,1500,20][콜라,1500,20]`, `[콜라,1500]`
 * [ ] `상품의 이름`이 `비어있는 경우` 예외를 던진다. ex) ``
 * [ ] `상품의 이름`이 `공백인 경우` 예외를 던진다. ex) ` `
 * [ ] `상품의 이름`은 중복될 수 없다. 중복된 경우 예외를 던진다. ✚
 * [ ] `상품의 가격`은 `정수`이다.
 * [ ] `상품의 가격`은 `음수가 될 수 없다.`
 * [ ] `상품의 가격`은 `100원 부터 시작`한다.
 * [ ] `상품의 가격`은 `10원으로 나누어 떨어져야 한다.`
 * [ ] `상품의 수량`은 `정수`이다.
 * [ ] `상품의 수량`은 `음수가 될 수 없다.`
 * [ ] `상품의 수량`은 적어도 `1개 이상`이다. ✚

### 3. 투입 금액
 * [ ] 투입 금액을 `입력` 받는다.
 * [ ] 투입 금액은 `정수`이다.
 * [ ] 투입 금액은 `음수가 될 수 없다.`
 * [ ] 투입 금액은 `10으로 나누어 떨어져야 한다.`
 * [ ] 투입 금액으로는 동전을 생성하지 않는다.
 * [ ] 투입 금액으로 `제공된 상품을 구매할 수 없는 경우(구매 가능 상품 최저가 보다 적은 경우)` 예외를 던진다. ✚

### 4. 구매
 * [ ] 상품 구매를 위해 상품명을 `입력`한다.
 * [ ] `구매 상품의 이름`이 `비어있는 경우` 예외를 던진다.
 * [ ] `구매 상품의 이름`이 `공백인 경우` 예외를 던진다.
 * [ ] `상품이 존재하지 않는 경우` 예외를 던지고 재입력을 진행한다.
 * [ ] 상품 구매를 진행 할 때 `현재 투입 금액`이 `출력`된다.
 * [ ] 투입 금액이 `구매 가능한 상품의 최저 가격보다 적거나`, `모든 상품이 소진된 경우` 구매가 불가능 하다.

### 5. 잔돈 반환
 * [ ] 구매가 완료되면 `잔돈을 반환`한다.
 * [ ] 잔돈을 반환할 수 없는 경우 잔돈으로 `반환할 수 있는 금액만 반환`한다.
 * [ ] 현재 투입 금액을 출력하고 `투입 금액의 최소 개수의 동전`으로 잔돈을 돌려준다.
 * [ ] 반환되지 않은 금액은 자판기에 남는다.
:::

## 3. Can’t automatically merge

미션 해결 중간에 테스트 코드의 수정으로 `upstream repository`에 수정에 관련된 `commit`이 추가되었다. 변경된 소스 코드를 반영하지 않고 직접 수정할 경우 `Pull Request`를 진행할 때 `Can’t automatically merge.`문구를 확인할 수 있다.

변경에 관련된 공지 메일에서도 이와 같은 설명을 언급하고 있다. 즉 소스 코드 `병합`을 통해 이것을 해결해야 한다.

### git rebase

병합하는 방법에는 크게 merge를 활용하는 방법과 `rebase`를 활용하는 방법이 있다. 그 중 `rebase`를 활용하여 적용해보려 한다.

`rebase`는 merge관련 commit을 추가적으로 생성하지 않고 해당 branch의 `base를 다시 설정`한다. 그렇기 때문에 소스 코드가 수정되어도 수정된 commit을 `중간에 반영`하고 해당 branch의 base를 재 정리한다.

이러한 rebase를 사용하면 깔끔한 commit 히스토리를 유지할 수 있다.

::: tip git-flow 적용기
자세한 내용은 git 브랜치 전략을 공부하던 중 [Git-flow](https://hyeonic.github.io/git/basic/git-flow.html)를 정리한 내용을 참고하였다. 자세한 내용은 해당 글에서 확인할 수 있다.
:::

## 4. MVC 패턴

MVC은 Model-View-Controller의 약자로 하나의 애플리케이션을 구성할 때 구성 요소를 세가지의 역할로 구분한 개발 방법론이다. 특히 소프트웨어의 `비즈니스 로직과 화면을 구분`하는데 중점을 두고 있다. 이러한 `관심사의 분리`는 객체가 각자의 책임을 가질 수 있도록 도와준다.

또한 MVC 패턴을 사용하면 Model과 View가 다른 컴포넌트들에 종속되지 않아 변경에 유리하다는 장점을 가진다.

### Model

내부 비즈니스 로직을 처리하기 위한 역할을 한다. Model은 다른 컴포넌트(ex View, Controller)들에 대해 알지 못한다. `자기 자신이 무엇을 수행하는지`만 알고 있다.

### View

화면(ex 웹, console 등)에 `무엇`을 보여주기 위한 역할이다. Model이 처리한 데이터나 그 작ㅇ버 결과를 가지고 사용자에게 출력할 화면을 만든다. View 또한 다른 컴포넌트들에 대해 알지 못한다. 단순히 자신이 무엇을 수행하는지만 알고 있다. 

### Controller

Model과 View 사이에 있는 컴포넌트이다. Model이 데이터를 `어떻게 처리`할지 알려주는 역할이다. 클라이언트의 요청을 받으면 해당 요청에 대한 실제 업무를 수행하기 위해 Model을 호출한다. Model이 업무 수행을 완료하면 그 결과를 가지고 화면을 생성하기 위해 View에 전달한다. 클라이언트의 요청에 대해 Model과 View를 결정하여 전달하는 일종의 조정자로서의 일을 진행한다.

`Controller는 다른 컴포넌트들에 대해 알고 있다.` 자기 자신 외에 Model과 View가 무엇을 수행하는지 알고 있다.

## 5. 비즈니스 로직과 UI 로직 분리

::: tip 비즈니스 로직과 UI 로직을 분리해라
비즈니스 로직과 UI 로직을 한 클래스가 담당하지 않도록 한다. 단일 책임의 원칙에도 위배된다.

```java
public class Car {
    private int position;

    // 자동차 이동 여부를 결정하는 비즈니스 로직
    public void move(int randomValue) {
        ...
    }

    // UI 로직
    private void print(int position) {
        StringBuilder sb = new StringBuilder();
        ...
    }
}
```

현재 객체의 상태를 보기 위한 로그 메시지 성격이 강하다면 `toString()`을 통해 구현한다. View에서 사용할 데이터라면 getter 메서드를 통해 데이터를 전달한다.
:::

위 내용은 2주차 공통 피드백의 일부분이다. MVC 패턴을 기반으로 `비즈니스 로직`과 `UI 로직`을 한 클래스가 담당하지 않도록 노력하였다.

```java
public class PossessionCoin {
    private static final int DEFAULT_QUANTITY = 0;
    private static final String TO_STRING_FORMAT = "%d원 - %d개";

    private final Coin coin;
    private final int quantity;

    public PossessionCoin(Coin coin, int quantity) {
        this.coin = coin;
        this.quantity = quantity;
    }

    public Coin getCoin() {
        return coin;
    }

    public boolean isExistQuantity() {
        return quantity > DEFAULT_QUANTITY;
    }

    public int calculatePossibleQuantity(InvestmentMoney investmentMoney) {
        return investmentMoney.trade(coin.getAmount(), quantity);
    }

    @Override
    public String toString() {
        return String.format(TO_STRING_FORMAT, coin.getAmount(), quantity);
    }
}
```

위 코드는 실제 미션 코드의 일부분을 가져온 것이다. 모델의 성격을 띄는 `PossessionCoin`이 `UI로직`을 가지지 않도록 조정하였다. 단순히 객체의 상태를 로그 메시지로 만들기 위해 `toString`을 활용하여 구현하였다.

## 6. Stream 활용

미션을 진행하며 `메서드 15라인`과 `depth의 제한`을 지키기 위해 노력하였다. 그 중 depth를 지키기 위해 단순 반복문을 사용하기 보다 `Stream`을 활용하여 해결하기 위해 노력하였다.

그중 가장 기억에 남는 리팩터링을 하나 소개해보려 한다.

### 반복문을 활용한 잔돈 계산

```java
public class PossessionCoins {
    List<PossessionCoin> possessionCoins;

    public PossessionCoins(List<PossessionCoin> possessionCoins) {
        this.possessionCoins = possessionCoins;
    }

    public List<PossessionCoin> getPossessionCoins() {
        return Collections.unmodifiableList(possessionCoins);
    }

    public List<Change> takeChange(InvestmentMoney investmentMoney) {
        List<Change> changes = new ArrayList<>();

        for (PossessionCoin possessionCoin : possessionCoins) {
            Coin coin = possessionCoin.getCoin();
            if (possessionCoin.isExistQuantity() && investmentMoney.isPossibleChange(coin)) {
                int coinQuantity = possessionCoin.calculate(investmentMoney);
                changes.add(new Change(coin, coinQuantity));
            }
        }

        return changes;
    }
}
```

위 코드는 보유 동전 리스트를 가지고 있는 일급 컬렉션이다. 잔돈 계산을 위해서는 `takeChange` 메서드를 활용하여 잔돈 리스트를 반환 받아야 한다. 

최초에 단순 `반복문`을 활용하여 검증을 진행하고 잔돈 개수를 계산하여 잔돈 리스트에 추가하는 로직으로 구성하였다. 하지만 메서드에 많은 기능을 담고 있으며 검증을 위한 `if`가 `&&`의 사용으로 직관적이지 않게 느껴졌다. 위 코드는 `메서드가 한 가지 일만 잘하도록 개선`하고, 로직의 `직관성을 높여야 한다는 필요성`을 느끼게 되었다.

### 개선된 잔돈 계산

```java
public class PossessionCoins {
    List<PossessionCoin> possessionCoins;

    public PossessionCoins(List<PossessionCoin> possessionCoins) {
        this.possessionCoins = possessionCoins;
    }

    public List<PossessionCoin> getPossessionCoins() {
        return Collections.unmodifiableList(possessionCoins);
    }

    public List<Change> takeChange(InvestmentMoney investmentMoney) {
        return possessionCoins.stream()
            .filter(PossessionCoin::isExistQuantity)
            .filter(investmentMoney::isPossibleChange)
            .map(possessionCoin -> getChange(investmentMoney, possessionCoin))
            .collect(toList());
    }

    private Change getChange(InvestmentMoney investmentMoney, PossessionCoin possessionCoin) {
        int coinQuantity = possessionCoin.calculatePossibleQuantity(investmentMoney);
        return new Change(possessionCoin.getCoin(), coinQuantity);
    }
}
```

Stream을 활용하여 개선한 `takeChange`이다. 우선 `getChange`을 활용하여 메서드를 분리하였다. 또한 stream의 활용으로 depth를 1까지 줄일 수 있게 되었다. 

이제 보유 동전을 탐색하며 `filter`를 활용한 검증을 진행한다. 그 다음 역할은 나눈 `getChange`를 통해 `mapping`을 진행한 뒤 종료 연산인 `collect`를 통해 `List`를 반환한다. 이전에 복잡하게 얽힌 반복문과 검증 관련 로직을 `Stream`을 통해 `더 나은 가독성`을 갖추도록 노력하였다.

::: tip Stream 학습
스트림에 대한 학습은 `Modern Java In Action`을 통해 진행하였다. 자세한 정리는 [Chapter04 스트림 소개](https://github.com/Java-Awesome/Javawesome_reading_book/blob/main/%EB%AA%A8%EB%8D%98_%EC%9E%90%EB%B0%94_%EC%9D%B8_%EC%95%A1%EC%85%98/4%EC%9E%A5/4%EC%9E%A5_%EC%B5%9C%EA%B8%B0%ED%98%84.md), [Chapter05 스트림 활용](https://github.com/Java-Awesome/Javawesome_reading_book/blob/main/%EB%AA%A8%EB%8D%98_%EC%9E%90%EB%B0%94_%EC%9D%B8_%EC%95%A1%EC%85%98/5%EC%9E%A5/5%EC%9E%A5_%EC%B5%9C%EA%B8%B0%ED%98%84.md), [Chapter06 스트림으로 데이터 수집](https://github.com/Java-Awesome/Javawesome_reading_book/blob/main/%EB%AA%A8%EB%8D%98_%EC%9E%90%EB%B0%94_%EC%9D%B8_%EC%95%A1%EC%85%98/6%EC%9E%A5/6%EC%9E%A5_%EC%B5%9C%EA%B8%B0%ED%98%84.md) 에서 확인할 수 있다.
:::

## 7. enum

이번 미션에는 동전을 나타내는 상수들이 열거 타입인 `Coin`으로 주어진다. 우선 이것이 의미하는 바를 파악하기 위해 `enum`의 등장 배경부터 살펴보았다.

enum은 Java 1.5부터 등장하였다. 이전에는 상수 사용을 위해 `정수 열거 패턴`을 주로 사용하였다. 이것에는 아래와 같이 몇 가지 문제점을 가지고 있었다.

 * 상수에 부여된 러터럴은 상수와 관련이 없다.
 * 이름의 충돌이 발생할 수 있다.
 * 타입 안전을 보장하지 않고 표현력이 좋지 않다.

::: tip enum
enum에 대한 자세한 정리는 [enum](https://hyeonic.github.io/java/basic/enum.html)에서 확인할 수 있다.
:::

정리하면 기존에 사용하던 상수 관리의 단점들을 보완하고 타입의 안정성과 IDE의 추가적인 지원을 받을 수 있다.

### enum의 values 메서드
enum에는 선언하지 않아도 다양한 메서드를 사용할 수 있다. 그 중 하나의 예시는 `values()` 이다. `values()` 메서드는 열거 형의 모든 값을 선언된 순서대로 모든 값을 포함하여 배열을 반환한다.

아래와 같이 동전을 표현하는 enum `Coin`이 있다고 가정한다. 
```java
public enum Coin {
    COIN_500(500),
    COIN_100(100),
    COIN_50(50),
    COIN_10(10);

    private final int amount;

    Coin(final int amount) {
        this.amount = amount;
    }

    public int getAmount() {
        return amount;
    }
}
```

아래와 같이 활용 가능하다.
```java
for (Coin coin : Coin.values()) {
    System.out.println(coin);
}
```

### 적용

아래는 실제 미션 코드의 일부분을 가져온 것이다.

```java
public enum Coin {
    COIN_500(500),
    COIN_100(100),
    COIN_50(50),
    COIN_10(10);

    public static final ArrayList<Coin> COINS = new ArrayList<>(Arrays.asList(Coin.values()));
    public static final String PREFIX = "COIN_";

    private final int amount;

    Coin(final int amount) {
        this.amount = amount;
    }

    public static List<Integer> getCoinAmounts() {
        return COINS.stream()
            .map(coin -> coin.amount)
            .collect(toList());
    }

    public static Coin parseCoin(int amount) {
        return Coin.valueOf(PREFIX + amount);
    }

    public int getAmount() {
        return amount;
    }
}
```

enum으로 인해 클래스와 같이 필드와 메서드들을 가질 수 있게 된다. 또한 Coin의 종류를 한정할 수 있기 때문에 추가적인 검증 과정을 줄일 수 있다.

아래는 Coin을 인스턴스 필드로 활용하는 `PossessionCoin`이다. PossessionCoin은 현재 자판기가 보유하고 있는 동전의 타입과 수량을 나타낸다.

```java
public class PossessionCoin {
    private static final int DEFAULT_QUANTITY = 0;
    private static final String TO_STRING_FORMAT = "%d원 - %d개";

    private final Coin coin;
    private final int quantity;

    public PossessionCoin(Coin coin, int quantity) {
        this.coin = coin;
        this.quantity = quantity;
    }
    ...
}
```

 * `public PossessionCoin(Coin coin, int quantity)`: 생성자를 살펴보면 Coin 타입으로 받는 것을 확인할 수 있다. 만약 단순히 int로 해당 값을 받게 된다면 500, 100, 50, 10이 아닐 경우 `추가적인 검증`이 필요하게 된다. Coin으로 한정시키게 되면 선언한 상수들만 사용하여 해당 생성자를 활용하도록 `제한`할 수 있다.

## 8. 객체에게 메시지 보내기

이번 미션을 해결하면서 가장 지키기 어려웠던 사항이었다. 피드백의 일부분을 살펴보면 아래와 같다.

::: tip 객체에 메시지를 보내라
상태 데이터를 가지는 객체에서 데이터를 꺼내려 (get)하지 말고 객체에게 메시지를 보내라. 예를 들어 Car가 우승자인지를 판단하기 위해 최대 이동 거리 값을 가지는 Car인지 판단 기능은?

```java
private boolean isMaxPosition(Car car) {
    return car.getPosition() == maxDistance;
}
```

위와 같이 구현하지 않고 다음과 같이 Car에게 메시지를 보내 구현한다.

```java
car.isMaxPosition(maxDistance);
```
:::

위 예제의 의도는 정확히 이해하였다. 하지만 실제 기능 사항을 정리하고 해결해가는 과정에서 getter를 활용하지 않고 로직을 처리하는 것은 많은 힘이 들었다. 그 중 가장 많은 고민을 진행한 것은 `상품의 가격과 투입 금액을 비교하는 부분`이다.

### 상품을 관리하는 책임을 가진 Product

아래는 자판기에 들어있는 상품 정보를 관리하기 위한 `Product`이다. 내부 인스턴스 변수들은 `원시 타입을 포장하고 있는 객체`를 사용하고 있다.

```java
public class Product {
    ...

    private final Name name;
    private final Price price;
    private final Quantity quantity;

    public Product(String inputProduct) {
        ...
        this.name = new Name(splitInputProduct[NAME_INDEX]);
        this.price = new Price(splitInputProduct[PRICE_INDEX]);
        this.quantity = new Quantity(splitInputProduct[QUANTITY_INDEX]);
    }

    ...

    public String getName() {
        return name.getName();
    }

    public int getPrice() {
        return price.getPrice();
    }

    public boolean isSameName(String productPurchaseName) {
        return this.name.isSame(productPurchaseName);
    }

    public void receive() {
        if (!quantity.isExistQuantity()) {
            throw new IllegalArgumentException(VALID_PRODUCT_QUANTITY);
        }
        quantity.decreaseQuantity();
    }

    public boolean isExistQuantity() {
        return quantity.isExistQuantity();
    }
}
```

 * `public boolean isSameName(String productPurchaseName)`: 외부에서 구입하기 위한 상품 이름을 전달 받아 동일 여부를 확인하고 반환한다.
 * `public boolean isExistQuantity()`: 상품의 수량의 존재 여부를 반환한다.

위 두 메서드는 `Product`에게 메시지를 보내서 관련 로직을 처리하기 위해 노력하였다. 하지만 문제는 `getPrice`였다.

### 투입 금액을 관리하는 책임을 가진 InvestmentMoney

투입된 금액의 검증과 로직 처리를 위한 `InvestmentMoney`이다.

```java
public class InvestmentMoney {
    ...
    private int investmentMoney;

    public InvestmentMoney(String inputInvestmentMoney) {
        ...
        int investmentMoney = Integer.parseInt(inputInvestmentMoney);
        ...
        this.investmentMoney = investmentMoney;
    }
    ...
    
    public void calculate(int price) {
        if (investmentMoney < price) {
            throw new IllegalArgumentException(VALID_PRODUCT_PRICE);
        }
        investmentMoney -= price;
    }

    public boolean isPay(Product product) {
        return investmentMoney >= product.getPrice();
    }
    ...
}
```

`public boolean isPay(Product product)` 메서드는 Product를 전달 받아 해당 price를 꺼내 `지불 가능 여부를 반환`해야 한다. 결국 투입 금액과 상품 가격을 모두 알아야 지불 여부를 확인할 수 있기 때문에 조회를 위한 getter 없이 처리하기에는 무리가 있다고 판단하였다.

단순히 `int price` 매개 변수로 받는다고 해도 결국 해당 메서드를 활용하는 부분에서 getter의 사용은 불가피하게 된다. 이러한 제한 사항들을 제외하고는 최대한 객체에게 메시지를 전달하여 처리할 수 있도록 노력하였다. 

메시지를 전달하는 목적은 결국 협력 안에서 객체가 수행하는 책임에 초점을 맞추기 위해서 이다. 이러한 메시지를 통해 객체는 책임을 갖게 된다. 좀 더 객체지향 패러다임에 맞게 작성을 위해서 `메시지가 객체를 결정`할 수 있도록 시선을 길러야 겠다.

## 9. 과도한 검증 코드와 책임의 이전

::: tip Effective Java 아이템 49. 매개변수가 유효한지 검사하라
메서드나 생성자를 작성할 때면 그 매개변수들에 어떤 제약이 있을지 생각해야 한다. 그 제약들을 문서화하고 메서드 코드 시작 부분에서 명시적으로 검사해야 한다. 이런 습관을 반드시 기르도록 하자. 그 노력은 유효성 검사가 실제 오류를 처음 걸러낼 때 충분히 보상 받을 것이다.
<br>

*Effective Java 301p*
:::

위와 같은 내용을 확인하였고 객체 생성 시점에 올바르게 생성이 가능하도록 인스턴스 변수들을 검증하기 위해 다양한 검증 코드를 활용했다. 

이러한 검증 관련 코드들은 해당 객체의 인스턴스 변수와 관련된 메서드들 이기 때문에 내부에 위치하는 것이 알맞다고 판단 했다. 또한 `단순한 검증`의 경우 `메서드 추출`을 통해 직관적인 코드를 만들 수 있었다.

아래는 검증 로직을 포함한 예시이다.
```java
public class ProductPurchase {
    private static final String VALID_EMPTY = "[ERROR] 상품명이 비어있습니다.";
    private static final String VALID_BLANK = "[ERROR] 상품명은 공백이 될 수 없습니다.";

    private final String name;

    public ProductPurchase(String name) {
        validateEmpty(name);
        validateBlank(name);
        this.name = name;
    }

    private void validateEmpty(String name) {
        if (name.isEmpty()) {
            throw new IllegalArgumentException(VALID_EMPTY);
        }
    }

    private void validateBlank(String name) {
        if (name.trim().isEmpty()) {
            throw new IllegalArgumentException(VALID_BLANK);
        }
    }

    public String getName() {
        return name;
    }
}
```

메서드 추출은 비교적 간결하게 검증 로직을 표현할 수 있다. 하지만 이러한 검증 로직이 많아 지면 생성자와 검증과 관련된 메서드들이 반 이상을 차지하게 된다.

아래는 실제 과도한 검증 로직으로 인해 `너무 많은 책임`을 부여한 것이 아닌지 고민하게 된 `Product`이다.

### Product

```java
public class Product {
    ...
    private final String name;
    private final int price;
    private int quantity;

    public Product(String inputProduct) {
        validateStartWithAndEndWith(inputProduct);
        inputProduct = inputProduct.replace(INPUT_PRODUCT_PREFIX, EMPTY);
        inputProduct = inputProduct.replace(INPUT_PRODUCT_SUFFIX, EMPTY);

        String[] splitInputProduct = inputProduct.split(INPUT_PRODUCT_SPLIT_REGEX, INPUT_PRODUCT_SPLIT_LIMIT);
        validateSplitInputProduct(splitInputProduct);

        this.name = splitInputProduct[NAME_INDEX];
        this.price = Integer.parseInt(splitInputProduct[PRICE_INDEX]);
        this.quantity = Integer.parseInt(splitInputProduct[QUANTITY_INDEX]);
    }

    private void validateStartWithAndEndWith(String inputProduct) {
        if (!(inputProduct.startsWith(INPUT_PRODUCT_PREFIX) && inputProduct.endsWith(INPUT_PRODUCT_SUFFIX))) {
            throw new IllegalArgumentException();
        }
    }

    private void validateSplitInputProduct(String[] splitInputProduct) {
        validateName(splitInputProduct[NAME_INDEX]);
        validatePrice(splitInputProduct[PRICE_INDEX]);
        validateQuantity(splitInputProduct[QUANTITY_INDEX]);
    }

    private void validateName(String name) {
        validateEmpty(name);
        validateBlank(name);
    }

    private void validateEmpty(String name) {
        if (name.isEmpty()) {
            throw new IllegalArgumentException();
        }
    }

    private void validateBlank(String name) {
        if (name.trim().isEmpty()) {
            throw new IllegalArgumentException();
        }
    }

    private void validatePrice(String inputPrice) {
        validateNumberFormat(inputPrice);
        int price = Integer.parseInt(inputPrice);

        validateNumberSize(price);
        validateDivide(price);
    }

    private void validateNumberSize(int price) {
        if (price < DEFAULT_PRICE) {
            throw new IllegalArgumentException();
        }
    }

    private void validateDivide(int price) {
        if (price % PRICE_QUOTIENT != REMAINDER) {
            throw new IllegalArgumentException();
        }
    }

    private void validateQuantity(String inputQuantity) {
        validateNumberFormat(inputQuantity);
        int quantity = Integer.parseInt(inputQuantity);
        validateNegativeNumber(quantity);
    }

    private void validateNumberFormat(String input) {
        try {
            Integer.parseInt(input);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException();
        }
    }

    private void validateNegativeNumber(int quantity) {
        if (quantity < DEFAULT_QUANTITY) {
            throw new IllegalArgumentException();
        }
    }
    ...
}
```

비즈니스 로직을 제외한 검증 코드만 100줄이 넘게 채워져 있다. 이것을 개선하기 위해 `원시 타입이 포장된 객체를 활용`하여 `객체의 책임을 이전`하였다.

### Name

상품 이름에 관한 책임을 가지는 `Name`이다. `관련 검증` 또한 `해당 객체로 이동`하게 된다.

```java
public class Name {
    private static final String VALID_EMPTY = "[ERROR] 상품 이름이 비어있습니다.";
    private static final String VALID_BLANK = "[ERROR] 상품 이름이 공백입니다.";

    private final String name;

    public Name(String name) {
        validateEmpty(name);
        validateBlank(name);
        this.name = name;
    }

    private void validateEmpty(String name) {
        if (name.isEmpty()) {
            throw new IllegalArgumentException(VALID_EMPTY);
        }
    }

    private void validateBlank(String name) {
        if (name.trim().isEmpty()) {
            throw new IllegalArgumentException(VALID_BLANK);
        }
    }

    public String getName() {
        return name;
    }

    public boolean isSame(String name) {
        if (this.name.equals(name)) {
            return true;
        }
        return false;
    }
}
```

Product의 다른 `인스턴스 변수(Price, Quantity)`들도 동일하게 객체로 포장하여 `책임을 이전`하였다.

### 개선된 Product

```java
public class Product {
    ...
    private final Name name;
    private final Price price;
    private final Quantity quantity;

    public Product(String inputProduct) {
        validateStartWithAndEndWith(inputProduct);
        inputProduct = inputProduct.replace(INPUT_PRODUCT_PREFIX, EMPTY);
        inputProduct = inputProduct.replace(INPUT_PRODUCT_SUFFIX, EMPTY);

        String[] splitInputProduct = inputProduct.split(INPUT_PRODUCT_SPLIT_REGEX, INPUT_PRODUCT_SPLIT_LIMIT);
        validateArrayLength(splitInputProduct.length);

        this.name = new Name(splitInputProduct[NAME_INDEX]);
        this.price = new Price(splitInputProduct[PRICE_INDEX]);
        this.quantity = new Quantity(splitInputProduct[QUANTITY_INDEX]);
    }

    private void validateStartWithAndEndWith(String inputProduct) {
        if (!(inputProduct.startsWith(INPUT_PRODUCT_PREFIX) && inputProduct.endsWith(INPUT_PRODUCT_SUFFIX))) {
            throw new IllegalArgumentException(VALID_START_END_WITH);
        }
    }

    private void validateArrayLength(int length) {
        if (length != DEFAULT_STRING_SPLIT_LENGTH) {
            throw new IllegalArgumentException(VALID_STRING_SPLIT_LENGTH);
        }
    }

    public String getName() {
        return name.getName();
    }

    public int getPrice() {
        return price.getPrice();
    }

    public boolean isSameName(String productPurchaseName) {
        if (this.name.isSame(productPurchaseName)) {
            return true;
        }
        return false;
    }

    public void receive() {
        if (!quantity.isExistQuantity()) {
            throw new IllegalArgumentException(VALID_PRODUCT_QUANTITY);
        }
        quantity.decreaseQuantity();
    }

    public boolean isExistQuantity() {
        if (quantity.isExistQuantity()) {
            return true;
        }
        return false;
    }
}
```

이제 각 인스턴스 변수의 `검증 책임`이 개별 포장된 객체로 `이전`되었다. 이전 보다 훨씬 깔끔한 구조를 만들 수 있도록 노력하였다.

### 정리

검증 관련 코드를 메서드로 추출하고 더 나아가 `과도한 책임`이 부여되면 해당 `책임을 분리`한다.

## References

### MVC 패턴
[세상에서 제일 쉬운 MVC 패턴](https://log.hodol.dev/techcourse/mvc-pattern)<br>
[웹 MVC 각 컴포넌트 역할](https://tecoble.techcourse.co.kr/post/2021-04-26-mvc/)

### enum
[else 예약어를 쓰지 않는다](https://tecoble.techcourse.co.kr/post/2020-07-29-dont-use-else/)<br>
[Class Enum](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/Enum.html)

### 과도한 검증 코드
[[JAVA] 객체 생성시 유효성 검사에 관하여](https://velog.io/@wannte/%EA%B0%9D%EC%B2%B4-%EC%83%9D%EC%84%B1%EC%8B%9C-%EC%9C%A0%ED%9A%A8%EC%84%B1-%EA%B2%80%EC%82%AC%EC%97%90-%EA%B4%80%ED%95%98%EC%97%AC)

<TagLinks />