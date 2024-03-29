---
title: 3주차 HTTP 메서드 활용 & HTTP 상태코드
tags: ['우아한테크코스', '모든 개발자를 위한 HTTP 웹 기본 지식']
date: 2022-05-15 19:00:00
feed:
  enable: true
---

# 3주차 HTTP 메서드 활용 & HTTP 상태코드

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/152970395-a31c8134-fc89-449f-b4dc-441e03df929c.png />

## 목표

스터디를 통해 [모든 개발자를 위한 HTTP 웹 기본 지식](https://www.inflearn.com/course/http-%EC%9B%B9-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC)을 듣고 요약하며 나누고 싶은 내용을 정리한다.

## HTTP 메서드 활용

클라이언트에서 서버로 데이터를 전송하는 방법은 크게 2가지이다. 

 * 쿼리 파라미터를 활용한 방식 (GET)
 * 메시지 바디를 활용한 방식 (POST)

 ### 정적 데이터 조회하기

이미지 및 정적인 문서를 조회할 때 `GET`을 활용한다. 이러한 정적 데이터는 쿼리 파라미터 없이 단순한 `리소스 경로`만으로 조회가 가능하다.

> ### GET의 캐시 처리
> GET은 URL을 키로 활용한다. 쿼리 파라미터가 다른 요청은 각각 캐싱하게 된다. 특히 CDN을 사용할 경우 이 쿼리 파라미터를 일정한 순서로 유지하는 것이 캐시 최적화에 큰 도움이 된다.

### 동적 데이터 조회하기

주로 검색, 게시판 목록에서 정렬을 위한 필터로 활용된다. 또한 조회이기 때문에 보통 `GET`을 활용한다. 이러한 동적인 데이터는 `쿼리 파라미터`를 통해 전달된다.

> ### GET과 메시지 바디
> GET 방식도 메시지 바디가 사용 가능하지만 실제 지원하지 않는 서버들도 많기 때문에 실무에서는 권장하지 않는다. 메시지 바디의 지원 유무는 전적으로 서버의 관점이다. 서버가 GET 메서드 요청에 대해 body 처리가 되어 있지 않다면 지원하지 않는다.

### HTML Form 데이터 전송

`HTML Form`을 활용하여 `submit`할 경우 보통은 `POST`를 활용하게 된다. `Content-Type`은 `application/x-www-form-urlencoded`가 사용되며 form의 내용은 메시지 바디를 통해서 전송된다. 

> ### urlencoded
> 전송 데이터는 url encoding 처리된다. 한글은 UTF-8을 활용하여 encoding한다.

물론 `GET` 사용도 가능하다. 하지만 주로 `조회`에서만 사용된다. 또한 `Content-Type`을 `multipart/form-data`로 사용할 경우 바이너리 데이터와 같은 파일들을 업로드할 때 사용한다. 

> ### HTTP Form이 지원하는 메서드
> HTML Form 전송은 GET, POST 메서드만 지원한다.

### HTTP API 데이터 전송

`서버 to 서버`나 `앱 클라이언트`에서 주로 사용된다. `웹 클라이언트`에서는 Form을 활용한 방식이 아닌 JS를 통해 통신하게 될 경우 사용된다. `Content-Type`은 `application/json`을 주로 사용한다.

#### HTTP API - 컬렉션

POST 기반 등록이다. 클라이언트는 등록될 리소스의 URI를 모른다. 서버 측에서 새로운 리소스를 생성하면 URI를 생성하여 제공한다. 

```
HTTP/1.1 201 Created
Location: /users/15
```

여기서 users는 서버가 관리하는 리소스 디렉토리인 `컬렉션(Collection)`이 된다.

#### HTTP API - 스토어

PUT 기반 등록이다. 특이점으로는 클라이언트가 리소스 URI를 알고 있다는 것이다. 즉 클라이언트가 직접 리솟 URI를 지정해야 한다. 

```
PUT /images/BE_매트.png
```

여기서 `/images`는 `클라이언트가 관리하는 리소스 저장소`이며 `스토어(Store)`라고 한다. 

#### HTML Form

HTML Form을 사용할 경우 GET, POST만 지원하므로 많은 제약사항을 가지고 있다. 즉 추가적인 행위를 나타내기 위한 `컨트롤러 URI`를 사용해야 한다. 이러한 `컨트롤러 URI`는 `동사로된 리소스 경로`로 사용된다. 아래는 `컨트롤러 URI`를 사용한 간단한 예시이다.

 * `/uesrs/new`
 * `/users/{id}/edit`
 * `/users/{id}/delete`

결국 이러한 컨트롤러 URI는 HTTP 메서드만으로 해결하기 어려울 때 사용한다. 이것은 HTTP API도 해당된다.

## 상태코드

클라이언트가 보낸 요청의 처리 상태를 응답에서 알려주는 기능이다. 만약  클라이언트가 인식할 수 없는 상태코드를 반환한다면 클라이언트는 상위 상태코드로 해석하여 처리한다. 그렇기 때문에 새로운 상태 코드가 추가되어도 클라이언트는 변경하지 않아도 된다.

 * 299가 해석되지 않을 경우 `2xx`로 처리된다. `(Successful)`

### 1xx (Informational)

요청이 수신되어 처리 중일 때 사용한다. 하지만 거의 사용되지 않는다.

### 2xx (Successful)

클라이언트의 요청을 성공적으로 처리했을 때 사용한다. 

 * `200 OK`: 단순히 요청 성공을 의미한다.
 * `201 Created`: 요청이 성공했으므로 새로운 리소스가 생성된다. 생성된 리소스는 응답의 `Location` 헤더 필드에 담겨져 전달된다.

#### REQUEST

```
POST /users HTTP/1.1
Content-Type: application/json

{
    "name": "mat",
    "position": "backend"
}
```

#### RESPONSE

```
HTTP/1.1 201 Created
Content-Type: application/json
Location: /users/12
```

 * `202 Accepted`: 요청이 접수되었지만 처리가 완료되지 않았음을 의미한다. 주로 배치 처리에서 사용된다. 요청은 정상적으로 진행되지만 1시간 뒤 프로세스가 처리하는 경우가 이에 해당한다.

 * `204 No Content`: 서버가 요청을 성공적으로 수행했지만 응답 페이로드 본문에 데이터가 없는 경우 사용한다. 단순히 결과 내용이 없어도 상태 코드만으로 성공을 인식할 수 있다.

### 3xx (Rediredction)

요청을 완료하기 위해 유저 에이전트의 추가 조치가 필요한 경우 사용한다.

> ### 리다이렉션이란?
> 웹 브라우저에서 3xx 응답 헤더에 Location이 존재할 경우 해당 위치로 자동 이동한다. 이러한 리다이렉션의 종류에는 `영구 리다이렉션`, `일시 리다이렉션`, `특수 리다이렉션`이 존재한다.

 * `영구 리다이렉션`: 특정 리소스의 URI가 영구적으로 이동한다. 검색엔진 등에서 본인이 가지고 있는 링크를 영구적으로 변경한다. 종류에는 `301 (Moved Permanetly)`, `308 (Permanent Redirect)`이 있다. `301`의 경우 리다이렉트시 요청 메서드가 GET으로 변하고 본문이 제거될 수 있다. `308`은 `301`과 동일한 기능을 가지고 있지만 리다이렉트 시 요청 메서드와 본문을 유지한다.
 * `일시 리다이렉션`: 일시적인 변경에 사용된다. `Post/Redirect/Get`을 활용할 수 있다. 또한 검색 엔진 등에서 URL이 영구적으로 변경되지 않는다. 종류에는 `302 (Found)`, `307 (Temporary Redirect)`, `303 (See Ohter)`이 있다. `302`는 리다이렉트 시 요청 메서드가 GET으로 변하고 본문이 제거될 수 있다. 307은 302와 동일한 기능이지만 요청 메서드와 본문을 유지한다. 303의 경우 302와 동일하지만 리다이렉트 시 요청 메서드가 GET으로 변경된다. 
 * `특수 리다이렉션`: 결과 대신 캐시를 활용한다.

> ### PRG: Post/Redirect/Get
> PRG를 활용하게 되면 POST 이후 GET으로 리다이렉트 되기 때문에 새로 고침을 진행해도 GET으로 결과 화면만 조회하게 된다. 이것은 `클라이언트 차원`에서 잘못된 요청을 방지하기 위해 사용된다. 서버 차원에서 예방하기 위해서는 섬세한 validation을 통해 중복된 요청이나 잘못된 요청에 대해 적절히 처리해야 한다.

### 4xx (Client Error)

클라이언트의 요청에 잘못된 문법 등으로 서버가 해당 요청을 수행할 수 없을 때 사용한다. 이러한 오류의 원인은 전적으로 `클라이언트`에 있다. 이미 잘못된 요청을 보냈기 때문에 동일한 요청을 지속해서 보낼 경우 매번 실패하게 된다.

 * `400 Bad Request`: 클라이언트가 잘못된 요청을 진행하여 서버가 해당 요청을 처리할 수 없음을 의미한다. 클라이언트는 요청 구문을 다시 한 번 검토 한 뒤 보내야 한다. 서버는 이러한 메시지를 정확히 전달하기 위해 Validation을 철저히 하여 방어해야 한다.
 * `401 Unauthorized`: 클라이언트가 해당 리소스에 대한 인증이 필요할 때 사용한다. 즉 `인증(Authentication)`이 되지 않을 때 보여준다.

> ### 인증(Autentication)과 인가(Authorization)
> 인증은 본인이 누구인지 확인하는 것이다. 인가는 권한을 부여하는 것이다. 즉 인증된 사용자에게 적절한 권한을 부여해야 한다.

 * `403 Forbidden`: 서버가 요청을 이해했지만 승인을 거부할 때 사용한다. 주로 인증된 사용자지만 접근 권한이 충분하지 않은 경우 사용한다. 만약 특정 권한이 없는 경우 해당 리소스의 존재조차 숨기고 싶을 때는 아래 `404 Not Found`를 사용한다.
 * `404 Not Found`: 요청된 리소스를 찾을 수 없을 때 사용한다. 요청 리소스가 서버에 없거나 권한이 부족한 리소스 접근을 숨기고 싶을 때 사용한다.

### 5xx (Server Error)

서버의 문제로 발생한 오류이다. 서버의 문제이기 때문에 재시도 시 성공할 수도 있고 안할 수도 있다. 서버는 이러한 오류를 만들지 않는 것이 좋다. 실제로 문제가 터졌을 때 사용하는 것이 바람직하다.

 * `500 Internal Server Error`: 서버 문제로 발생한 오류이다. 애매하면 500를 사용하는 것이 좋다.
 * `503 Service Unavailable`: 서버가 일시적인 과부화 혹은 예정된 작업으로 인해 잠시 요청 처리를 할 수 없는 경우 사용할 수 있다. `Retry-After`를 통해 얼마 뒤에 복구 되는지 보낼 수 있다. 

## 공유하고 싶은 내용

### POST를 활용하여 조회하는 것

POST도 GET과 동일하게 암호화를 진행하지 않으면 메시지 바디의 데이터들이 노출된다. POST를 조회할 때 사용하지 않는 이유는 `정해진 약속`이기 때문이다 (설계 원칙). 표준이 정의되어 있는데 이것을 지키지 않았을 때 생기는 혼선을 고려해야 한다. 

### GET을 진행할 때 조회수 증가는 멱등성을 위반하는가?

조회수가 올라가는 것이 게시글 자체의 리소스를 변경하는 것은 아니라고 판단하기 때문에 멱등성을 위반하지 않는다고 판단한다. 만약 이렇게 사소한 변경에 신경이 쓰인다면 조회수 증가를 추가적인 리소스로 설정하여 URI를 분활하는 방법도 있다.

### HTML Form도 HTTP API인가?

보통 HTTP API는 응답 결과로 HTML이 아닌 데이터를 받는 것이다.

## References

[모든 개발자를 위한 HTTP 웹 기본 지식](https://www.inflearn.com/course/http-%EC%9B%B9-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC)<br>

<TagLinks />
