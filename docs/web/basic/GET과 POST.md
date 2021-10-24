---
title: GET과 POST
tags: ['web', 'HTTP', 'GET', 'POST']
---

# GET과 POST

## HTTP

HTTP는 웹 상에서 클라이언트와 서버 간의 요청/응답으로 데이터를 주고 받을 수 있는 프로토콜이다. 서버 측은 요청을 받지 않고 응답을 보내는 일은 일어날 수 없다. 또한 HTTP는 기본적으로 상태를 유지 하지 않기 때문에 이전에 보낸 요청에 대해서는 알지 못한다.

보통 서버에 임무를 부여하기 위해 HTTP 메서드를 사용한다.

## GET

GET은 서버로부터 정보를 조회하기 위해 설계된 메서드이다. 요청을 전송할 때 필요한 데이터를 Body에 담는 것이 아니라 Query String을 통해 전송한다. 

```
hyeonic.github.io/resources?key1=value1&key2=value2
```

GET은 불필요한 요청 제한을 위하여 캐시될 수 있다. css, js를 포함한 정적 컨텐츠는 데이터의 양이 크고 변경될 일이 적기 때문에 반복해서 동일한 요청을 보내지 않고 캐시된 데이터를 사용한다. 

## POST

POST는 리소스를 생성/변경하기 위해 설계되었다. 데이터를 HTTP 메시지의 Body에 담아 전송한다. 이처럼 GET과 달리 POST는 데이터가 Body에 전송되기 때문에 눈에는 보이지 않는다. URL에서 확인할 수 있는 GET보다는 안전해보이지만 POST 요청도 결국 해당 내용을 크롬 개발자 도구와 같은 툴을 사용하면 확인할 수 있다. 그렇기 때문에 민감한 데이터는 반드시 암호화가 요구된다.

## References

[GET과 POST의 차이](https://hongsii.github.io/2017/08/02/what-is-the-difference-get-and-post/)

<TagLinks />