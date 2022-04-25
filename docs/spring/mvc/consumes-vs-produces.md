---
title: consumes vs produces
tags: ['우아한테크코스', 'MVC']
date: 2022-04-25 16:30:00
feed:
  enable: true
---

# consumes vs produces

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/152970395-a31c8134-fc89-449f-b4dc-441e03df929c.png />

## consumes

다음 예에서 볼 수 있듯이 `consumes` 속성을 활용하면 요청의 `Content-Type` 기준으로 요청 매핑을 좁힐 수 있다.

```java
@PostMapping(path = "/pets", consumes = "application/json") 
public void addPet(@RequestBody Pet pet) {
    // ...
}
```

또한 `consumes` 속성은 부정 표현식을 지원한다. `!text/plain`은 `text/plain` 이외의 모든 컨텐츠 유형을 제공한다.

## produces

다음 예에서 볼 수 있듯이 컨트롤러 메서드가 반환하는 타입을 강제한다.

```java
@GetMapping(path = "/pets/{petId}", produces = MediaType.APPLICATION_JSON_VALUE) 
@ResponseBody
public Pet getPet(@PathVariable String petId) {
    // ...
}
```

위 메서드는 이제 `application/json` 형태로만 반환이 가능하다. 보내야 하는 타입이 정해져 있다면 `produces` 속성을 활용한다.

만약 클라이언트 입장에서 특정 타입의 데이터만 원한하면 HTTP 요청 메시지에 `Accept`를 활용하여 전달할 수 있다.

## Content-Type 

HTTP 메시지에 담겨 보내는 메시지 형식을 알려주기 위한 헤더이다. 대부분의 HTTP 표준 스펙을 따르는 브라우저와 웹 서버는 우선적으로 `Content-Type` 헤더를 기준으로 HTTP 메시지에 담긴 데이터를 분석하고 파싱한다.

## Accept 헤더

Accept 헤더는 클라이언트에서 웹 서버로 요청 시 요청 메시지에 담기는 헤더이다. 즉 클라이언트 자신에게 이러한 데이터 타입만 허용하겠다는 의미이다. 만약 Accept 헤더 값에 `application/json`을 설정한다면 웹서버에게 json 데이터만 처리할 수 있다고 어필하는 것과 같다.

## 정리

`consumes`는 클라이언트가 서버에게 보내는 타입을 명시한다. `produces`는 서버가 클라이언트에게 반환하는 데이터 타입을 명시한다.

이러한 속성을 명시적으로 사용하면 Mapping할 때 받고 싶은 데이터를 강제할 수 있으므로 오류 상황을 줄일 수 있다.

## References.

[[Spring] consumes와 produces의 차이](https://mungto.tistory.com/438)<br>
[[HTTP] HTTP 헤더 중 Content-Type 헤더와 Accept 헤더의 용도와 차이점](https://dololak.tistory.com/630)<br>
[https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#mvc-ann-requestmapping-consumes](https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#mvc-ann-requestmapping-consumes)<br>
[https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#mvc-ann-requestmapping-produces](https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#mvc-ann-requestmapping-produces)

<TagLinks />
