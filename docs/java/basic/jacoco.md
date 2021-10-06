---
title: JaCoCo 설정
tags: ['java', '코드 분석 도구', 'JaCoCo']
---

# JaCoCo 란?

Java 코드의 커버리지를 체크하는 라이브러리이다. 테스트 코드를 돌리고 그 커버리지의 결과를 눈으로 보기 좋게 가공하여 리포트로 생성한다. 

Java 코드 커버리지 분석 도구로는 JaCoCo 말고 Cobertura, Clover 등 다양한 도구가 존재한다. 

## 테스트 코드의 중요성

테스트 코드 작성은 많은 이점을 가져온다. 작성한 코드를 검증할 수 있고 기능의 추가 및 수정에 대한 side effect를 줄일 수 있다.

## 코드 커버리지

코드 커버리지는 소프트웨어의 테스트 케이스가 얼마나 충족되었는지 알 수 있는 지표 중 하나이다. 테스트 진행 시 코드 자체가 얼마나 실행되었는지 이것을 수치로 확인할 수 있다.

이러한 코드 커버리지는 소스 코드를 기반으로 수행하는 화이트 박스 테스트를 통해 측정된다.

> 화이트 박스 테스트 (White-box test)
> * 응용 프로그램의 내부 구조와 동작을 검사한다.
> * 화이트 박스 처럼 투명한 박스 안쪽인 소프트웨어의 내부 소스 코드를 테스트하기 때문에 화이트 박스 테스트라는 명칭으로 불린다.
> * 개발자 관점의 단위 테스트 방법이다.

## 코드 커버리지 측정 기준
 * 구문 (State) 
 * 조건 (Condition)
 * 결정 (Decision)

### 구문 (statement)
 * `라인 커버리지`라고 부르기도 한다.
 * 코드 한 줄이 한 번이상 실행된다면 충족된다.
 * 가장 대표적으로 많이 사용된다.

### 조건 (Condition)
 * `모든 조건식`의 `내부 조건`이 `true/false`을 가지게 되면 충족된다.
 * 조건 커버리지를 기준으로 테스트를 진행할 경우, 구문 커버리지와 결정 커버리지를 만족하지 못하는 경우가 존재할 수 있다.

### 결정 (Decision)
 * `브랜치(Branch) 커버리지`라고 부르기도 한다.
 * `모든 조건식`이 `true/false`를 가지게 되면 충족된다.

`조건 커버리지`나 `브랜치 커버리지`는 코드 실행에 대한 테스트보다 로직의 시나리오에 대한 테스트에 가깝다. 조건문이 존재하지 않으면 코드를 **아예 테스트 하지 않는다.**

## 그래서 이걸 왜?

테스트 코드는 발생할 수 있는 모든 시나리오에 대해 작성해야 한다. 하지만 사람이 작성한 코드이기 때문에 작성한 테스트로 커버하지 못하는 부분이 생길 여지가 있다. 

이처럼 코드 커버리지는 코드의 안정성을 보장해 줄 수 있는 지표가 된다.

## 적용

개발환경은 `Spring boot 최신버전 (2.5.5)`, `java 11`, `gradle 7.2`를 사용하여 진행하였다. 또한 `싱글 모듈 프로젝트` 구조를 기반으로 적용하였다.

### JaCoCo 플러그인 추가

**build.gradle**
```groovy
plugins {
    ...
	id 'jacoco' 
}
```

JaCoCo의 버전을 추가적으로 명시할 수 있다.
```groovy
plugins {
    ...
	id 'jacoco' 
}

jacoco {
    toolVersion = '0.8.7'
}
```

### jacocoTestReport

jacocoTestReport는 바이너리 커버리지 결과를 사람이 읽기 좋은 형태로 리포트로 저장한다. 

```groovy
jacocoTestReport {
	reports {
		html.enabled true
		xml.enabled true
	}
}
```

### jacocoTestCoverageVerification

내가 원하는 커버리지 기준을 만족하는지 확인해주는 task이다. 다양한 기준을 두어 해당 task에 limit를 설정해 주면 gradle test 시도 시 빌드의 성공/실패 때 결과로 확인할 수 있다.

```groovy
// 내가 원하는 커버리지 기준을 만족하는지 확인해 주는 task
jacocoTestCoverageVerification {
	violationRules {
		rule {
            // 룰 체크 단위
			element = 'CLASS'

            // 브랜치 커버리지를 최소한 90% 만족
			limit {
				counter = 'BRANCH'
				value = 'COVEREDRATIO'
				minimum = 0.90
			}

			// 라인 커버리지를 최소한 80% 만족
			limit {
				counter = 'LINE'
				value = 'COVEREDRATIO'
				minimum = 0.80
			}
		}
	}
}
```

## 실행!

아래는 지금까지 필요한 task를 설정하고 적용한 모습이다.

```groovy
plugins {
	id 'org.springframework.boot' version '2.5.5'
	id 'io.spring.dependency-management' version '1.0.11.RELEASE'
	id 'java'
	id 'jacoco'
}

group = 'me.hyeonic'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '11'

repositories {
	mavenCentral()
}

dependencies {
	implementation 'org.springframework.boot:spring-boot-starter-web'
	testImplementation 'org.springframework.boot:spring-boot-starter-test'
}

test {
	useJUnitPlatform()
}

// 바이너리 커버리지 결과를 사람이 읽기 좋은 형태의 리포트로 저장한다.
jacocoTestReport {
	reports {
		html.enabled true
		xml.enabled true
	}
}

// 내가 원하는 커버리지 기준을 만족하는지 확인해 주는 task
jacocoTestCoverageVerification {
	violationRules {
		rule {
			element = 'CLASS'

			// 브랜치 커버리지를 최소한 90% 만족
			limit {
				counter = 'BRANCH'
				value = 'COVEREDRATIO'
				minimum = 0.90
			}

			// 라인 커버리지를 최소한 80% 만족시켜야 한다.
			limit {
				counter = 'LINE'
				value = 'COVEREDRATIO'
				minimum = 0.80
			}

		}
	}
}
```

아래와 같이 명령어를 추가한 task와 함께 실행한다.

```console
$ ./gradlew --console verbose test jacocoTestReport jacocoTestCoverageVerification
```

## 여러 task 함께 실행

매번 커버리지 확인을 위해 `jacocoTestReport`와 `jacocoTestCoverageVerification`을 지정하면 귀찮기 때문에 하나로 묶어 `testCoverage` task를 만든다.

```groovy
task testCoverage(type: Test) {
	group 'verification'
	description 'Runs the unit tests with coverage'

	dependsOn(':test',
			':jacocoTestReport',
			':jacocoTestCoverageVerification')

	tasks['jacocoTestReport'].mustRunAfter(tasks['test'])
	tasks['jacocoTestCoverageVerification'].mustRunAfter(tasks['jacocoTestReport'])
}
```

testCoverage를 실행하면 `test`, `jacocoTestReport`, `jacocoTestCoveragerVerification`을 실행할 수 있도록 `dependsOn`으로 설정한다. 해당 task는 순서를 가지고 있기 때문에 `mustRunAfter`를 활용하여 순서를 지정한다.

```
test -> jacocoTestReport -> jacocoTestCoveragerVerification
```

더 나아가 `test` task 실행 시 자동으로 `JaCoCo` 관련 task 들이 실행될 수 있도록 `finalizedBy`를 활용하여 설정한다.

```groovy
test {
    ...
    finalizedBy 'jacocoTestReport'
}

jacocoTestReport {
    ...
    finalizedBy 'jacocoTestCoverageVerification'
}
```

## 최종 코드

**build.gradle**
```groovy
plugins {
	id 'org.springframework.boot' version '2.5.5'
	id 'io.spring.dependency-management' version '1.0.11.RELEASE'
	id 'java'
	id 'jacoco'
}

group = 'me.hyeonic'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '11'

repositories {
	mavenCentral()
}

dependencies {
	implementation 'org.springframework.boot:spring-boot-starter-web'
	testImplementation 'org.springframework.boot:spring-boot-starter-test'
}

test {
	useJUnitPlatform()

	finalizedBy 'jacocoTestReport'
}

// 바이너리 커버리지 결과를 사람이 읽기 좋은 형태의 리포트로 저장한다.
jacocoTestReport {
	reports {
		html.enabled true
		xml.enabled true
	}

	finalizedBy 'jacocoTestCoverageVerification'
}

// 내가 원하는 커버리지 기준을 만족하는지 확인해 주는 task
jacocoTestCoverageVerification {
	violationRules {
		rule {
			element = 'CLASS'

			// 브랜치 커버리지를 최소한 90% 만족
			limit {
				counter = 'BRANCH'
				value = 'COVEREDRATIO'
				minimum = 0.90
			}

			// 라인 커버리지를 최소한 80% 만족시켜야 한다.
			limit {
				counter = 'LINE'
				value = 'COVEREDRATIO'
				minimum = 0.80
			}

		}
	}
}

task testCoverage(type: Test) {
	group 'verification'
	description 'Runs the unit tests with coverage'

	dependsOn(':test',
			':jacocoTestReport',
			':jacocoTestCoverageVerification')

	tasks['jacocoTestReport'].mustRunAfter(tasks['test'])
	tasks['jacocoTestCoverageVerification'].mustRunAfter(tasks['jacocoTestReport'])
}
```

## References.

[Gradle User Manual](https://docs.gradle.org/current/userguide/userguide.html)<br>
[Gradle 프로젝트에 JaCoCo 설정하기](https://techblog.woowahan.com/2661/)<br>
[코드 분석 도구 적용기 - 1편, 코드 커버리지(Code Coverage)가 뭔가요?](https://velog.io/@lxxjn0/%EC%BD%94%EB%93%9C-%EB%B6%84%EC%84%9D-%EB%8F%84%EA%B5%AC-%EC%A0%81%EC%9A%A9%EA%B8%B0-1%ED%8E%B8-%EC%BD%94%EB%93%9C-%EC%BB%A4%EB%B2%84%EB%A6%AC%EC%A7%80Code-Coverage%EA%B0%80-%EB%AD%94%EA%B0%80%EC%9A%94)<br>
[코드 분석 도구 적용기 - 2편, JaCoCo 적용하기](https://velog.io/@lxxjn0/%EC%BD%94%EB%93%9C-%EB%B6%84%EC%84%9D-%EB%8F%84%EA%B5%AC-%EC%A0%81%EC%9A%A9%EA%B8%B0-2%ED%8E%B8-JaCoCo-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0)


<TagLinks />