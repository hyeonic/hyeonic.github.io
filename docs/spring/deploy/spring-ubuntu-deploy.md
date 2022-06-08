---
title: Spring Boot Application 개발 환경과 운영 환경 분리하기
tags: ['우아한테크코스', 'spring', 'deploy']
date: 2022-06-09 01:00:00
feed:
  enable: true
---

# Spring Boot Application 개발 환경과 운영 환경 분리하기

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/152970395-a31c8134-fc89-449f-b4dc-441e03df929c.png />

## 개요

장바구니 미션을 진행하던 중 해당 애플리케이션에서 사용하는 데이터들을 영구적으로 반영하기 위한 요구사항이 추가되었다. 현재에는 간단한 테스트를 위한 임베디드 DB인 H2가 설정되어 있는 상태이다. 즉 서버를 재시작하게 되면 테스트를 진행하며 추가된 데이터들이 전부 날아가게 된다. 결국 API 통신을 진행하는 프론트는 확인을 위해 계속해서 데이터를 추가해야 했다. 

결국 데이터를 영구적으로 보관할 수 있는 수단이 필요하게 된다. 서버 측에서는 운영에 사용하기 위한 DB를 추가하여 이를 해결할 수 있다. 이번에는 운영 서버에서는 MySql, 개발과 테스트에는 H2를 사용하기 위해  ubuntu 서버 환경에서 운영 환경에서 필요한 `설정 파일(application.yml)`을 분리하여 배포를 진행해보려 한다.

## DB 서버의 private ip 주소

우리가 제공받은 DB 서버는 ec2에서 public ip를 비활성화하였기 때문에 외부에서의 접근이 불가능하다. 그렇기 때문에 같은 `VPC` 내부에 있는 웹 서버를 띄우기 위한 용도의 인스턴스를 통해서 접근해야 한다. 해당 인스턴스는 웹 서버를 위한 용도를 가지며 퍼블릭 IP를 통해 접근할 수 있기 때문이다.

::: tip VPC

Virtual Private Cloud의 준말로 사용자의 AWS 계정 전용 가상 네트워크이다.

:::

정리하면 우리가 DB 서버에 접근하기 위해서는 같은 `VPC` 내에 있는 웹 서버에서 private ip를 통해 통신할 수 있다. 웹 서버는 클라이언트의 접근을 허용해야 하기 때문에 public ip를 허용해야 한다. 외부에서 접근가능한 통로를 활용하여 DB를 뛰우기 위한 인스턴스에 접근하여 DB 설치를 진행한 뒤 웹 서버에서 해당 DB에 접근하기 위한 설정을 진행해야 한다.

결국 우리는 `여러 환경(e.g 개발, 운영 등)`에서 동일한 애플리케이션 코드로 작업할 수 있도록 설정을 외부화 해야 한다.

## Externalized Configuration

::: tip 공식 문서 중 일부

Spring Boot lets you externalize your configuration so that you can work with the same application code in different environments. You can use a variety of external configuration sources, include Java properties files, YAML files, environment variables, and command-line arguments.

Spring Boot을 사용하면 여러 환경에서 동일한 애플리케이션 코드로 작업할 수 있도록 구성을 외부화할 수 있다. Java Properties 파일, YAML 파일, command-line 인자를 포함하여 다양한 외부 구성 소스를 사용할 수 있습니다.

:::

Spring Boot는 `PropertySource`를 적용하는 순서를 정확하게 설계해두었기 때문에 상황에 맞게 값을 재정의하여 사용할 수 있다. Property를 적용하는 순서는 아래와 같다. 간단히 요약한 것이며 자세한 내용은 공식 문서에 정확히 기재되어 있다.

::: tip 공식 문서 중 일부

1. Default properties (specified by setting SpringApplication.setDefaultProperties).
2. `@PropertySource` annotations on your @Configuration classes. Please note that such property sources are not added to the Environment until the application context is being refreshed. This is too late to configure certain properties such as logging.* and spring.main.* which are read before refresh begins.
3. Config data (such as application.properties files)
4. A `RandomValuePropertySource` that has properties only in random.*.
5. OS environment variables.<br>
...

:::

::: tip 공식 문서 중 일부

파일 형식은 전체 애플리케이션에서 하나로 통일하는 것이 좋다. 같은 위치에 `.properties`와 `.yml`이 존재한다면 `.properties`가 우선이 된다.

:::

### External Application Properties

나는 이번 미션에서 `운영 서버에서 필요한 설정 파일`을 빌드된 jar 파일을 실행할 때 `참조`하여 개발 환경과의 설정 파일을 분리하기로 결정하였다. 이러한 문제에 대한 해답은 `spring.config.location`에 있었다.

### spring.config.location

공식 문서의 우선 순위를 확인해보면 우리가 `resources` 디렉토리의 아래에 설정 파일을 두는 것 보다  command-line의 arguments를 통해 적용하는 것이 더 높은 우선 순위를 가지고 있다. 즉 외부 설정 파일을 참조하여 `spring.config.location`을 통해 지정하게 되면 내부에 작성한 `application.properties` 혹은 `application.yml`는 재정의 되어 무시된다.

이제 이러한 내용을 기반으로 개발 환경과 운영 환경을 분리하여 배포를 진행해보자.

### 개발을 진행할 때

local 환경에서 실제 운영 DB에 접근하는 것은 매우 위험한 행동이며 현재 상황(private ip만 제공되는 상황)에서는 접근 조차 불가능하다. 결국 개발을 위한 추가적인 DB등을 활용해야 하기 때문에 아래와 같이 간단히 H2를 기반으로 한 설정 파일을 작성하였다.

```yaml
spring:
  sql:
    init:
      mode: always

  datasource:
    url: jdbc:h2:~/test;MODE=MYSQL;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE
    username: sa

  h2:
    console:
      enabled: true

security:
  jwt:
    token:
      secret-key: aaaaaaaaaa.bbbbbbbbbb.cccccccccc
      expire-length: 3600000
```

해당 파일은 애플리케이션 프로젝트 내부에 `resources` 디렉토리 아래에 위치하게 된다.

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/172664118-db445bea-df47-4ac2-ae71-1706a146f8b0.png />

현재에는 특별한 설정 파일을 추가적으로 활용하지 않기 때문에 위에 작성한 `application.yml`을 활용할 것이다. 하지만 운영 서버에서 위 설정을 그대로 사용한다면 결국 개발 서버와 동일하게 휘발성 성격을 가진 임베디드 DB를 그대로 사용하게 될 것이다. 

우리는 이전에 같은 VPC 내부에 추가적인 인스턴스를 활용하여 운영 환경에서 사용하는 MySQL을 설치하였다. 즉 운영을 위한 추가적인 설정을 진행해 주어야 한다. 이것은 굉장히 중요한 정보(private ip) 등을 가지고 있기 때문에 github과 같은 공개적인 저장소에 올릴 수 없다. 

### 운영 환경에서는

나는 이것을 해결하기 위해 웹 인스턴스(운영 환경)에 접근하여 추가적인 설정 파일을 작성하여 해결하였다.

#### application-prod.yml

```yaml
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://{DB 인스턴스의 private ip}:{port 번호}/{DB 이름}?serverTimezone=Asia/Seoul
    username: {DB 유저 이름}
    password: {DB 유저 비밀번호}

security:
  jwt:
    token:
      secret-key: aaaaaaaaaa.bbbbbbbbbb.cccccccccc
      expire-length: 3600000

```

해당 파일은 실제 운영 인스턴스의 아래에 위치해두었다. 

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/172665542-5d30569f-e01b-41fe-805d-74e5f80b13cc.png />

 * `application-prod.yml`: 앞서 언급한 실제 운영 DB 연결 정보를 가진 설정 파일이다.
 * `deploy.sh`: 간단한 배포를 위한 스크립트이다. 해당 파일에서 빌드된 파일을 실행할 때 위 설정 파일을 참조하도록 할 수 있다.
 * `jwp-shopping-cart`: github를 통해 clone을 진행한 프로젝트 파일이다. remote에서 pull을 받아 빌드를 진행한 뒤 실행할 수 있다.

이제 설정 파일은 모두 준비되었다. 간단한 배포 스크립트를 활용하여 설정 파일을 주입해보자.

```sh
pid=$(pgrep -f jwp-shopping-cart)

if [ -n "${pid}" ]
then
        kill -9 ${pid}
        echo kill process ${pid}
else
        echo no process
fi

cd jwp-shopping-cart
git pull origin step2

./gradlew bootJar
cd build/libs

java -jar -Dspring.config.location=/home/ubuntu/repository/application-prod.yml jwp-shopping-cart-0.0.1-SNAPSHOT.jar
```

핵심은 `java -jar -Dspring.config.location=/home/ubuntu/repository/application-prod.yml jwp-shopping-cart-0.0.1-SNAPSHOT.jar`부분이다. `spring.config.location`을 통해 실제 설정이 담긴 yml 파일을 참조하도록 설정하였다. 이제 내부에 존재하는` application.yml은 무시`되며 새롭게 작성한 `application-prod.yml`를 기반으로 웹 서버가 구동된다.

## 정리

위 방법은 단순하지만 큰 단점이 존재한다. 만약 운영 환경에서 요구하는 설정 방식이 변경된다면 실제 운영 서버에 접근하여 수정해야 한다. 당장은 편할지 모르지만 반복된 변경은 오히려 불편함만 가중 시킬 것이다. 

이번 미션을 통해서 우리는 운영 서버와 개발 서버에 대한 설정 분리에 대해 경험할 수 있었으며 이것을 달성하기 위해서는 앞서 제시한 방법 이외에도 환경 변수를 활용하는 등 다양한 방법이 존재한다. 핵심은 개발 환경과 운영 환경은 적절히 분리되어야 하며 협업을 진행하는 개발자들 사이에서도 직관적인 방식이거나 충분한 논의를 통해 모두 동일한 환경을 구성해야 한다는 것이다. 

또한 설정 파일에 대한 방식은 굉장히 많이 존재하며 Spring Boot는 이것의 적용 순서를 정확하게 설계해두었기 때문에 필요에 따라 적절히 활용하면 된다. 

## References.

[7.2.3. External Application Properties](https://docs.spring.io/spring-boot/docs/2.5.2/reference/htmlsingle/#features.external-config.files)<br>

[Externalized Configuration](https://godekdls.github.io/Spring%20Boot/externalized-configuration/#723-external-application-properties)

<TagLinks />
