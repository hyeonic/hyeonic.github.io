# spotify 관련 정보 받기

## 엑세스 토큰 받기

### 인가 코드 받기

```
GET https://accounts.spotify.com/authorize
```

request
```
GET https://accounts.spotify.com/authorize?client_id={client_id}&response_type=code&
redirect_uri={redirect uri}&
scope=user-read-private user-read-email&
state=12345
```

response
```
https://{redirect uri}?code={인가 code 정보}
```

state에는 무엇을 적어야 할까? -> 활용 방안 더 찾아보기
`state`: client에서 사용되는 상태정보이고 Authorization Server와 값 교환 시에 이 값을 동봉하여 확인함으로써 신뢰성을 높을 수 있다.

상태 매개변수는 XSRF로부터 보호하는 데 사용됩니다. 애플리케이션은 임의의 문자열을 생성하고 state 매개변수를 사용하여 인증 서버로 보냅니다. 인증 서버는 state 매개변수를 다시 보냅니다. 두 상태가 같으면 => OK입니다. 상태 매개변수가 다른 경우 다른 사람이 요청을 시작한 것입니다.

[What is the purpose of the 'state' parameter in OAuth authorization request](https://stackoverflow.com/questions/26132066/what-is-the-purpose-of-the-state-parameter-in-oauth-authorization-request)

### 엑세스 토큰 요청

```
POST https://accounts.spotify.com/api/token
```

request
```
POST https://accounts.spotify.com/api/token
Content-Type: application/x-www-form-urlencoded

code={인가 code}
client_id={client_id}&
client_secret={client_secret}&
redirect_uri={redirect uri}&
grant_type=authorization_code
```

핵심은 `Content-Type`이 `application/x-www-form-urlencoded`이다. google과 동일한데 restTemplate.postForObject 메소드를 적용하면 지원하지 않는 media-type으로 `415`코드를 던진다.

```
org.springframework.web.client.HttpClientErrorException$UnsupportedMediaType: 415 Unsupported Media Type: [{"error":"server_error"}]
	at org.springframework.web.client.HttpClientErrorException.create(HttpClientErrorException.java:133) ~[spring-web-5.3.9.jar:5.3.9]
	at org.springframework.web.client.DefaultResponseErrorHandler.handleError(DefaultResponseErrorHandler.java:186) ~[spring-web-5.3.9.jar:5.3.9]
	at org.springframework.web.client.DefaultResponseErrorHandler.handleError(DefaultResponseErrorHandler.java:125) ~[spring-web-5.3.9.jar:5.3.9]
	at org.springframework.web.client.ResponseErrorHandler.handleError(ResponseErrorHandler.java:63) ~[spring-web-5.3.9.jar:5.3.9]
	at org.springframework.web.client.RestTemplate.handleResponse(RestTemplate.java:819) ~[spring-web-5.3.9.jar:5.3.9]
	at org.springframework.web.client.RestTemplate.doExecute(RestTemplate.java:777) ~[spring-web-5.3.9.jar:5.3.9]
	at org.springframework.web.client.RestTemplate.execute(RestTemplate.java:711) ~[spring-web-5.3.9.jar:5.3.9]
	at org.springframework.web.client.RestTemplate.postForObject(RestTemplate.java:437) ~[spring-web-5.3.9.jar:5.3.9]
	at me.hyeonic.playlist.social.SpotifyService.getAccessTokenV2(SpotifyService.java:66) ~[classes/:na]
```

결국 MultiValueMap를 활용하여 params를 세팅해 준 후 처리하였다.

```java
 public SpotifyTokenInfo getAccessToken(String code) {

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", code);
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("redirect_uri", redirectUri);
        params.add("grant_type", GRANT_TYPE);

        HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(params, httpHeaders);

        return restTemplate.postForObject(requestUrl, httpEntity, SpotifyTokenInfo.class);
    }
```

response
```json
{
    "access_token": "{access_token}",
    "token_type": "Bearer",
    "scope": "user-read-email user-read-private",
    "expires_in": "3600",
    "refresh_token": "{refresh_token}"
}
```

token 부분은 프론트에서 처리한 후 값을 받을 예정이기 때문에 간단히 조사하고 넘어간다.

## spotify playlist 목록

이제 제공받은 token을 기반으로 spotify의 playlist 목록을 가져온다.

request
```
GET https://api.spotify.com/v1/me/playlists 
Host: 
User-Agent:
Content-Type: application/json
Authorization: Bearer {access token}
```

response
```json
{
  "href": "https://api.spotify.com/v1/users/ccmoffs802b4dquohlpobbq6k/playlists?offset=0&limit=20",
  "items": [
    {
      "collaborative": false,
      "description": "",
      "external_urls": {
        "spotify": "https://open.spotify.com/playlist/2Peasf7l7K8ic2SgWRT3jU"
      },
      "href": "https://api.spotify.com/v1/playlists/2Peasf7l7K8ic2SgWRT3jU",
      "id": "2Peasf7l7K8ic2SgWRT3jU",
      "images": [
        {
          "height": 640,
          "url": "https://mosaic.scdn.co/640/ab67616d0000b273002ac80d3d6dadaf41ad22f1ab67616d0000b2734c2040d10bfbb4456f3d99ccab67616d0000b273a32e4019a5025a4d43368ff8ab67616d0000b273f1f7d6e30c8ec36f0dff3bd5",
          "width": 640
        },
        {
          "height": 300,
          "url": "https://mosaic.scdn.co/300/ab67616d0000b273002ac80d3d6dadaf41ad22f1ab67616d0000b2734c2040d10bfbb4456f3d99ccab67616d0000b273a32e4019a5025a4d43368ff8ab67616d0000b273f1f7d6e30c8ec36f0dff3bd5",
          "width": 300
        },
        {
          "height": 60,
          "url": "https://mosaic.scdn.co/60/ab67616d0000b273002ac80d3d6dadaf41ad22f1ab67616d0000b2734c2040d10bfbb4456f3d99ccab67616d0000b273a32e4019a5025a4d43368ff8ab67616d0000b273f1f7d6e30c8ec36f0dff3bd5",
          "width": 60
        }
      ],
      "name": "기리보이",
      "owner": {
        "display_name": "hyeonic",
        "external_urls": {
          "spotify": "https://open.spotify.com/user/ccmoffs802b4dquohlpobbq6k"
        },
        "href": "https://api.spotify.com/v1/users/ccmoffs802b4dquohlpobbq6k",
        "id": "ccmoffs802b4dquohlpobbq6k",
        "type": "user",
        "uri": "spotify:user:ccmoffs802b4dquohlpobbq6k"
      },
      "primary_color": null,
      "public": false,
      "snapshot_id": "MTYsMDZlZmY2YWNlMzkzNGY5YjA2ODUzYjJlNTc2Nzc0M2E0M2VhNjNjNA==",
      "tracks": {
        "href": "https://api.spotify.com/v1/playlists/2Peasf7l7K8ic2SgWRT3jU/tracks",
        "total": 14
      },
      "type": "playlist",
      "uri": "spotify:playlist:2Peasf7l7K8ic2SgWRT3jU"
    }
  ],
  "limit": 20,
  "next": null,
  "offset": 0,
  "previous": null,
  "total": 1
}
```

HttpHeaders 
```java
public void add(String headerName,
                @Nullable
                String headerValue)

Add the given, single header value under the given name.

Specified by:
add in interface MultiValueMap<String,String>
Parameters:
headerName - the header name
headerValue - the header value
Throws:
UnsupportedOperationException - if adding headers is not supported
See Also:
put(String, List), set(String, String)

public void set(String headerName,
                @Nullable
                String headerValue)

Set the given, single header value under the given name.

Specified by:
set in interface MultiValueMap<String,String>
Parameters:
headerName - the header name
headerValue - the header value
Throws:
UnsupportedOperationException - if adding headers is not supported
See Also:
put(String, List), add(String, String)
```

`add`는 헤더 이름에 대한 값 목록에 헤더 값을 추가한다.
`set`은 헤더 값을 단일 문자열 값으로 설정한다.

[HttpHeaders](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/http/HttpHeaders.html)





