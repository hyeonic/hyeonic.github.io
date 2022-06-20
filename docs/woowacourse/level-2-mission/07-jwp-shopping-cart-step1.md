---
title: 07. 1단계 - 장바구니 - 협업 미션
tags: ['우아한테크코스', '미션']
date: 2022-06-20 15:00:00
feed:
  enable: true
---

#  07. 1단계 - 장바구니 - 협업 미션

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/152970395-a31c8134-fc89-449f-b4dc-441e03df929c.png />

## 목표

우아한테크코스에서 진행한 미션의 리뷰와 피드백에 대해 정리한다. 실제 리뷰는 [[Spring 장바구니 - 1단계] 매트(최기현) 미션 제출합니다.](https://github.com/woowacourse/jwp-shopping-cart/pull/16)에서 확인할 수 있다.

## 06.1단계 - 장바구니 - 협업 미션 확인

이번 미션에서는 실제 동작하는 서비스를 만들기 위한 백엔드, 프론트엔드의 협업을 경험하며 기존에 존재하는 레거시 코드를 기반으로 진행하게 되었다. 프론트와 원할한 협업을 위해 API 명세에 많은 시간을 투자했다. 또한 기존에 제공된 레거시 코드 위에서 기능을 추가하였기 때문에 기존에 작성된  테스트 코드가 최대한 망가지지 않도록 유지하며 새로운 기능을 추가하였다.

## 적절한 문서화

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/174528907-86ec4770-87a8-4bb4-9400-a66d2ff8f4d8.png />

처음으로 프론트와의 협업을 진행했기 때문에 어떠한 방식으로 의사소통 하는 것이 좋은지 고민하였다. 백엔드 팀원들과 상의 끝에 당장 쉽게 적용할 수 있는 노션을 기반으로 API 명세 및 프로젝트를 진행하였고 얻을 수 있는 인사이트들을 정리할 수 있도록 문서화를 진행하였다. 아래는 실제 미션을 진행하며 작성한 [짱바구니 wiki](https://www.notion.so/0f0d2f9b1c4b4f6cb02b0f7215f8cccc)이다. 부족한 부분이 많지만 의식적인 연습을 통해 레벨 3에 경험하게 될 프로젝트의 보탬이 될 수 있도록 노력하였다.

## JWT

JWT (JSON Web Token)은 유저를 인증하고 식별하기 위한 토큰 기반의 인증이다. 이러한 토큰은 기존에 많이 사용하던 세션 & 쿠키와 다르게 서버가 아닌 클라이언트 측에 저장되기 때문에 서버의 부담을 덜 수 있게 되었다. 이러한 JWT에는 토큰 내부에 유저의 식별 정보나 권한 정보를 가질 수 있다는 것이다. 그렇기 때문에 담겨있는 정보가 많은 경우 토큰의 크기가 커질 수 있다.

이러한 JWT 방식 구현을 위해 `JJWT` 라이브러리를 활용하였다. 아래와 같이 `JwtTokenProvider`를 생성하는 시점에 `비밀키`와 `만료 시간`을 설정 파일에서 주입 받아 생성하여 토큰을 생성하고 검증하는 책임을 가지도록 만들었다.

```java
@Component
public class JwtTokenProvider {

    private final SecretKey key;
    private final long validityInMilliseconds;

    public JwtTokenProvider(@Value("${security.jwt.token.secret-key}") String secretKey,
                            @Value("${security.jwt.token.expire-length}") long validityInMilliseconds) {
        this.key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
        this.validityInMilliseconds = validityInMilliseconds;
    }

    public String createToken(String payload) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);

        return Jwts.builder()
                .setSubject(payload)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String getPayload(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public void validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);

            claims.getBody().getExpiration().before(new Date());
        } catch (JwtException | IllegalArgumentException e) {
            throw new InvalidTokenException();
        }
    }
}
```

위 객체를 `@Component` 키워드를 통해 Spring이 관리할 수 있도록 설정하여 필요한 곳에서 적절히 활용할 수 있도록 작성하였다. 이제 인증이 필요한 요청 시 `Authorization header`를 통해 들어온 token 정보를 검증하기 위해 `HandlerMethodArgumentResolver`를 구현한 구현체를 만들어 등록시켜주었다.

```java
public class AuthenticationPrincipalArgumentResolver implements HandlerMethodArgumentResolver {

    private static final String AUTHORIZATION_HEADER_NAME = "Authorization";

    private final JwtTokenProvider jwtTokenProvider;

    public AuthenticationPrincipalArgumentResolver(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(AuthenticationPrincipal.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
                                  NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {
        String authorizationHeader = webRequest.getHeader(AUTHORIZATION_HEADER_NAME);
        String accessToken = AuthorizationExtractor.extract(authorizationHeader);

        if (!jwtTokenProvider.validateToken(accessToken)) {
            throw new InvalidTokenException();
        }

        String username = jwtTokenProvider.getPayload(accessToken);
        return new LoginCustomer(username);
    }
}
```

해당 객체는 `@RequestBody`나 `@RequestParam`처럼 `@AuthenticationPrincipal`을 명시하게 되면, `resolveArgument`가 실행된다. 간단한 예로 실제 작성한 컨트롤러의 일부를 가져온 것이다.

```java
@RestController
@RequestMapping("/api/customers")
public class CustomerController {
    ...
    @GetMapping("/me")
    public ResponseEntity<CustomerResponse> findCustomer(@AuthenticationPrincipal LoginCustomer loginCustomer) {
        CustomerResponse customerResponse = customerService.find(loginCustomer);
        return ResponseEntity.ok(customerResponse);
    }
    ...
}
```

`AuthenticationPrincipalArgumentResolver` 또한 `WebMvcConfigurer`의 `addArgumentResolvers` 메서드를 오버라이딩 하여 추가로 등록하게 되면 기존에 존재하는 `ArgumentResolver`에 추가되어 로직이 수행된다.

```java
@Configuration
public class AuthenticationPrincipalConfig implements WebMvcConfigurer {

    private final JwtTokenProvider jwtTokenProvider;

    public AuthenticationPrincipalConfig(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        argumentResolvers.add(createAuthenticationPrincipalArgumentResolver());
    }

    @Bean
    public HandlerMethodArgumentResolver createAuthenticationPrincipalArgumentResolver() {
        return new AuthenticationPrincipalArgumentResolver();
    }
    ...
}
```

Spring에서 이미 제공되는 method arguments는 [Method arguments](https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#mvc-ann-arguments)에서 확인할 수 있다.

결국 `AuthenticationPrincipalArgumentResolver` 통해 반복해서 진행되면 검증 로직들을 제거할 수 있었으며 컨트롤러는 요청과 응답에 대한 처리에 집중할 수 있도록 개선할 수 있게 되었다.

## 제공된 상수 사용하기

기존에 `Authorization` 헤더에서 토큰 값을 꺼내기 위해 해당 문자열을 상수로 추출하여 활용하였다.

```java
public class AuthenticationPrincipalArgumentResolver implements HandlerMethodArgumentResolver {
    ...
    private static final String AUTHORIZATION_HEADER_NAME = "Authorization";
    ...
}
```

::: tip 리뷰 중 일부

`리뷰어`: Http 명세에 정의된 헤더는 `org.springframework.http.HttpHeaders`에 상수로 정의되어있어요. 이걸 활용해도 좋을거 같네요 :)

:::

이미 자주 사용하고 있는 HttpHeaders들의 경우 `org.springframework.http.HttpHeaders`에 정의되어 있었다. 아래는 HttpHeaders의 공식 문서 중 일부를 가져온 것이다.

> A data structure representing HTTP request or response headers, mapping String header names to a list of String values, also offering accessors for common application-level data types. 
> **Http 요청 및 응답 헤더를 나타내는 데이터 구조이며, 문자열 헤더 이름을 값 목록에 매핑하고 일반적인 `application-level data`에 접근을 제공한다.**

무작정 상수로 추출하기 보다 기존에 제공된 것이 있는지 확인해보는 습관을 들여야 겠다. 이렇게 프레임워크 차원에서 제공된다는 것은 그만큼 많이 사용되기도 하며 다른 개발자가 해당 코드를 봤을 때 통념적으로 사용되기 때문에 코드의 파악 또한 쉬워질 것이다.

## 클라이언트가 확인하는 예외 메시지

우리는 애플리케이션을 사용하는 사용자에게 예외가 발생할 경우 적절한 메시지를 통해 잘못된 부분들을 알려줘야 한다. 하지만 토큰에 대한 정보가 잘못된 경우 사용자가 과연 알아야 하는 정보인가 생각해볼 필요가 있다.

```java
public class InvalidTokenFormatException extends RuntimeException {

    public InvalidTokenFormatException() {
        this("token 형식이 잘못 되었습니다. (형식: Bearer aaaaaaaa.bbbbbbbb.cccccccc)");
    }
}
```

위 예시를 보면 사용자는 해당 토큰의 형식이 잘못 되었는지 알 필요가 없다. 프론트에서 해당 예외를 확인한 뒤 로그아웃 혹은 재로그인을 위한 로직으로 유도해야 한다. 즉 해당 정보는 오직 프론트 개발자에게 전달하기 위한 목적일 뿐이다.

::: tip 리뷰 중 일부

`리뷰어`: 위 메세지는 Advice를 통해서 클라이언트에 응답으로 내려가는 메세지로 보이네요. 혹시 화면에서 위 메세지가 보이는걸까요? 그렇다면 유저 친화적인 메세지로 변경해보면 어떨까요? 트레킹이 필요하다면 로깅을 활용해보면 좋을거 같아요.

`매트`: 해당 예외는 고객에게 전달하기 위한 목적보다 프론트 개발자를 위해 전달하기 위한 목적이었습니다! 프론트 개발자에게 이러한 예외 상황을 전달하기 위해서는 로깅을 활용하는 방법이 선호되어 추천해주신 건가요?!

`리뷰어`: 프론트 개발자에게 에러 상황을 알려주기 위함이군요. 매트가 위 Exception의 메세지를 가지고 트레킹 하는걸로 생각했어서 로깅을 말씀드린거긴해요. 지금 상황에서는 위 응답의 메세지를 프론트에서 사용하지 않도록 가이드가 되어야 할 것 같은데요. 서버에서 에러 상황에 대한 유저 메세지를 제어할 필요는 없을지도 고민해보면 좋을것 같습니다.

:::

결국 이 또한 충분한 대화를 통해 결정해야 할 사안임을 알게 되었고 추가적으로 목적에 따른 로깅 처리에 대해서도 고민할 수 있게 되었다.

## API 콜을 줄이기 위한 방법들

이번 미션에서 API 명세를 진행할 때 수정 및 삭제의 경우 상태 코드를 `204 No Content`로 통일하였다. 관련하여 아래와 같은 리뷰를 확인할 수 있었다.

::: tip 리뷰 중 일부

`리뷰어`: 수정, 삭제시 200 응답도 고려해볼 수 있지 않을까 싶은데요. 204를 선택하신 이유가 있을까요?

`매트`: 리소스를 변경하는 행위와 조회하는 행위를 분리하기 위한 목적입니다! 수정과 동시에 조회를 통해 body에 해당 데이터를 담을 수도 있겠지만 한 가지 요청에 너무 많은 책임을 가지고 있다고 생각하여 수정 및 삭제가 완료 되었다는 것을 명시적으로 표현하기 위해204를 활용하였습니다!

`리뷰어`: 프론트 화면이 어떻게 되는지, 어떻게 협의가 되었는지 모르겠지만 수정시에 수정된 결과나 삭제시 삭제한 엔티티의 아이디를 내려주는 경우도 종종있어요. 수정시에 내려준 결과 id나 삭제 id로 프론트 단에서 처리하는 경우에 종종 그렇게 사용하는데요. 이렇게 하면 서버 단에서도 조회하는 API 콜 하나를 줄여줄 수도 있어서 필요하다면 고려해보셔도 괜찮을거 같습니다.

:::

단순한 목적으로는 변경하는 행위와 조회하는 행위를 분리하기 위한 목적이었다. 하지만 리뷰어가 언급하신 것 처럼 서버 단에서 추가적인 조회 API 콜을 줄이기 위한 수단으로 수정 및 삭제 시 엔티티에 대한 정보나 식별자를 반환하는 방식도 고려해볼만 하다고 판단한다.

## References.

[JWT](https://jwt.io/)
[HandlerMethodArgumentResolver](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/method/support/HandlerMethodArgumentResolver.html)
[HttpHeaders](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/http/HttpHeaders.html)

<TagLinks />
