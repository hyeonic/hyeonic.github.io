---
title: 멱등성 (idempotent)
tags: ['우아한테크코스', '멱등성']
date: 2022-07-31 15:00:00
feed:
  enable: true
---

# 멱등성 (idempotent)

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/152970395-a31c8134-fc89-449f-b4dc-441e03df929c.png />

> `멱등법칙` 또는 `멱등성`은 수학이나 전산학에서 연산의 한 성질을 나타내는 것으로 연산을 여러 번 적용해도 `결과가 달라 지지 않는 성질`을 의미한다.

동일한 요청을 한 번 보내는 것과 여러 번 연속으로 보내는 것이 같은 효과를 지니고, 서버의 상태도 동일하게 남을 때, 해당 HTTP 메서드가 멱등성을 가졌다고 말한다. 이러한 멱등성은 통계 기록 등을 제외하면 어떠한 `side effect`를 남길 수 없다. 서버 측에서 HTTP 메서드의 특성에 맞게 요청을 적절히 처리한 경우 `GET`, `HEAD`, `PUT`, `DELETE` 메서드는 멱등성을 가질 수 있다.

멱등성을 따지는 기준은 실제 서버의 백엔드 상태를 확인하면 된다. 또한 각 요청에 대한 응답 코드는 서로 다를 수 있다.

`GET`은 멱등성을 가진다. 여러 번 연속하여 호출 해도 클라이언트가 받는 응답을 동일하다.

```
GET /posts HTTP/1.1
GET /posts HTTP/1.1
```

`POST`는 멱등성을 가지지 않는다. 여러 번 호출할 경우 서버 측에 여러 리소스가 추가된다.

```
POST /posts HTTP/1.1
POST /posts HTTP/1.1
```

`DELETE`는 멱등성을 가진다. 첫 요청 시 `200` 혹은 `204`를 반환한다면 그 이후 `404`를 반환할 것이다.

```
DELETE /posts/{postId} HTTP/1.1 -> return 204
DELETE /posts/{postId} HTTP/1.1 -> return 404
```

`DELETE`가 멱등성을 가졌다는 것은 즉 `목록의 마지막 항목 제거`와 같이 요청 마다 서버의 리소스 변경을 야기하는 기능을 구현하지 말아야 한다는 것을 의미한다.

### 주의해야 할 점

이러한 멱등성은 일종의 규약과 같다. 서버 측에서 멱등성을 보장하지 않도록 구현하면 앞서 언급한 멱등성의 제약을 지키지 못할 수 있다.

## References.

[멱등법칙](https://ko.wikipedia.org/wiki/%EB%A9%B1%EB%93%B1%EB%B2%95%EC%B9%99)<br>
[멱등성](https://developer.mozilla.org/ko/docs/Glossary/Idempotent)<br>

<TagLinks />
