---
title: "[번역] 7 Popular Unit Test Naming Conventions"
tags: ['Java', 'test']
---

# [번역] 7 Popular Unit Test Naming Conventions

단위 테스트 이름을 지정하기 위해 따를 수 있는 단위 테스트 이름 지정 전략의 목록을 제공한다. 해당 글은 다음과 같은 여러 훌륭한 페이지를 거치는 대신 빠른 참조를 위한 것이다. 더 자세한 내용을 알고 싶다면 아래 나열된 페이지에 접속해서 확인할 수 있다.

 * [Naming standards for unit tests](https://osherove.com/blog/2005/4/3/naming-standards-for-unit-tests.html)
 * [Naming Unit Tests Responsibly](http://googletesting.blogspot.in/2007/02/tott-naming-unit-tests-responsibly.html)
 * [What are some popular naming conventions for Unit Tests?](https://stackoverflow.com/questions/96297/what-are-some-popular-naming-conventions-for-unit-tests)
 * [Unit test naming best practices](https://stackoverflow.com/questions/155436/unit-test-naming-best-practices)
 * [GivenWhenThen](https://martinfowler.com/bliki/GivenWhenThen.html)

다음은 대부분의 개발자가 사용하고 있는 7가지 인기 있는 단위 테스트 명명 규칙이다.

## 1. 메서드명_테스트상태_기대결과
 * 코드 리팩토링의 일부로 메서드 이름이 변경되면 이와 같은 테스트 이름도 변경되야 하기 때문에 이러한 테스트를 이해하기 어렵게 되므로 바람직하지 않다는 의견이 있다. 

### 예시
 * isAdult_AgeLessThan18_False
 * withdrawMoney_InvalidAccount_ExceptionThrown
 * admitStudent_MissingMandatoryFields_FailToAdmit

## 2. 메서드명_기대결과_테스트상태
 * 1번과 비슷하지만 일부 개발자는 해당 컨벤션을 추천한다. 위와 동일하게 메서드 이름이 변경되면 테스트 이름도 변경되야 하므로 나중에 이해하기 어려워진다.

### 예시
 * isAdult_False_AgeLessThan18
 * withdrawMoney_ThrowsException_ifAccountIsInvalid
 * admitStudent_FailToAdmit_ifMandatoryFieldsAreMissing

## 3. test[테스트 중인 기능]
 * 테스트할 기능이 테스트명의 일부로 사용되어 쉽게 읽을 수 있도록 도와준다. 또한 test라는 접두사가 중복된다는 주장도 있다. 일부 개발자들은 이러한 형태의 네이밍 사용을 좋아한다.

### 예시
 * testIsNotAndAdultIfAgeLessThan18
 * testFailToWithdrawMoneyIfAccountIsInvalid
 * testStudentIsNotAdmittedIfMandatoryFieldsAreMissing

## 4. 테스트 중인 기능
 * 테스트 메서드로 메서드를 식별하기 위해 애노테이션을 사용하기 때문에 테스트할 기능을 단순히 작성하는 것이 더 낫다고 많은 사람들이 제안한다. 또한 코드 악취를 방지하고 단위 테스트를 문서의 대체 형식으로 수행하기 때문에 권장되는 방법이다. 

### 예시
 * IsNotAndAdultIfAgeLessThan18
 * FailToWithdrawMoneyIfAccountIsInvalid
 * StudentIsNotAdmittedIfManatoryFieldsAreMissing

## 5. Should_기대결과_When_테스트 상태
 * 이러한 형태의 네이밍은 많은 개발자들이 테스트에 대해 쉽게 이해할 수 있도록 도와준다.

### 예시
 * Should_ExpectedBehavior_When_StateUnderTest
 * Should_FailToWithdrawMoney_ForInvalidAccount
 * Should_FailToAdmit_IfMandatoryFieldsAreMissing

## 6. When_테스트상태_Expect_기대결과

### 예시
 * When_AgeLessThan18_Expect_IsAdultAsFalse
 * When_InvalidAccount_Expect_WithdrawMoneyToFail
 * When_MandatoryFieldsAreMissing_Expect_StudentAdmissionToFail

## 7. given_사전조건_when_테스트상태_Expect_기대결과
 * 이러한 방식은 BDD의 일부로 개발된 명명 규칙이다. 아이디어는 테스트를 세 부분으로 나누어 사전 조건, 테스트 상태, 기대 결과로 나눠 명명한다.

### 예시
 * Given_UserIsAuthenticated_When_InvalidAccountNumberIsUsedToWithdrawMoney_Then_TransactionsWillFail

## References

[7 Popular Unit Test Naming Conventions](https://dzone.com/articles/7-popular-unit-test-naming)

<TagLinks />