---
title: 08. 2단계 - 장바구니/주문 API 변경하기
tags: ['우아한테크코스', '미션']
date: 2022-06-23 00:00:00
feed:
  enable: true
---

# 08. 2단계 - 장바구니/주문 API 변경하기

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/152970395-a31c8134-fc89-449f-b4dc-441e03df929c.png />

## 목표

우아한테크코스에서 진행한 미션의 리뷰와 피드백에 대해 정리한다. 실제 리뷰는 [[Spring 장바구니 - 2단계] 매트(최기현) 미션 제출합니다.](https://github.com/woowacourse/jwp-shopping-cart/pull/93)에서 확인할 수 있다.

## 08. 2단계 - 장바구니/주문 API 변경하기 확인

드디어 레벨 2의 모든 미션이 마무리 되었다. 우테코에서 레벨 2에서 가져갈 공통적인 목표는 아래와 같다.

 * Spring Framework를 이용해 웹 애플리케이션을 개발한다.
 * 학습 테스트를 통해 새로운 기술을 익히고 미션에 적용한다.
 * 클라우드 환경에 애플리케이션을 배포하고 운영한다.
 * 새로운 기술을 익히는 본인만의 학습 방법을 찾는다.

그 중 내가 가장 많이 집중한 것은 어떤 기술에 대해 `왜 사용해야 하며 어떠한 근거로 도입이 되었는지 고민`하는 것이다. 의식적인 연습이나 다른 크루들과의 끊임없는 대화를 통해 이전에 혼자 학습하던 습관들을 개선하기 위해 노력하였다. 덕분에 혼자 해답을 찾기 위해 발버둥 치며 놓쳤던 지식들 사이에 온전한 나만의 근거를 채워갈 수 있는 시간이 되었다.

다시 돌아가 위 공통 목표를 살펴보면 약간이지만 대부분 달성했다고 생각한다. 다만 이미 아는 기술에 대해 더 많은 의문을 품지 못한 것이 아쉬움으로 다가온다. 아무래도 Spring에 대한 학습 경험이 있었기 때문에 미션을 진행하는데 무리가 없었지만 딱 사용하는데 그쳤다. 결국 해당 기술에 대해 동작 방식까지는 고려하지 못하여 반쪽 짜리 지식을 만들었다는 생각이 들기도 한다. 이제 남은 기간 동안 부족한 부분을 인지하고 온전한 지식으로 만들기 위한 시간으로 활용해야 겠다.

아래는 레벨 2 마지막 미션을 진행하며 리뷰어와 주고 받은 대화들과 느낀 것들을 정리한 것이다.

## Presentation Layer

`Presentation Layer`는 사용자의 요청과 응답에 대한 처리를 진행한다. 주로 Controller 및 View로 구성되며 사용자와 애플리케이션 사이의 상호작용의 위해 앞단에 위치하게 된다. 이러한 presentation layer의 역할로 아래와 같이 간략하게 정리할 수 있다.

 * 사용자의 요청을 변환한다.
 * 요청 내용에 대한 검증을 진행한다.
 * 수행 결과를 사용자에게 반환한다.

이전 미션에서 `Presentation Layer`에서 핵심 비즈니스 로직을 해결하기 위한 `Service layer`를 의존하고 있는 형태로 구성하였다. 하지만 이전에 공통적인 토큰의 인증 및 인가를 위해 `ArgumentResolver`를 등록한 뒤 활용하였다. 결국 이러한 ArgumentResolver를 Presentation Layer로 봐도 되는가에 대한 의문을 가지고 있었다. 결국 이러한 `ArgumentResolver`의 목적은 `parameter가 원하는 형태의 객체로 바인딩`하는 것이다. 즉 컨트롤러의 호출 이전에 활용되며 종속적인 개념으로 사용되기 때문에 Presentation Layer에 가깝다고 정리하였다.

## CORS의 preflight

프론트와 API가 적절한지 테스트하던 중 cors 관련 에러를 마주하게 되었다. 분명 WebConfig에 관련 설정을 추가해두었지만 어째서인지 Options 메서드를 통한 `preflight 요청`에서 `Authorization 헤더`의 부재로 `401` 예외를 마주하게 되었다. 결국 Interceptor에서 `Option 메서드`가 올 경우 아래 로직을 무시할 수 있도록 작성했지만 약간의 찝찝한 부분이 있다.

```java
public class AuthenticationInterceptor implements HandlerInterceptor {
    ...
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        if (HttpMethod.OPTIONS.matches(request.getMethod())) {
            return true;
        }

        String accessToken = AuthorizationExtractor.extract(request);
        jwtTokenProvider.validateToken(accessToken);

        String payload = jwtTokenProvider.getPayload(accessToken);
        request.setAttribute(ATTRIBUTE_PAYLOAD_KEY, payload);
        return true;
    }
}
```

결국 `preflight`를 보내는 이유가 이러한 예비 요청을 통해 해당 요청이 안전한지 확인하는 용도로 알고 있다. 하지만 이러한 요청을 무조건적으로 `true`처리하는 것이 적절한지 궁금증이 생겨 질문을 남겼다.

::: tip 리뷰 중 일부

`매트`: 이러한 요청을 무조건적으로 true 처리하는 것이 적절한지, `리뷰어님`은 동일한 상황에서 어떠한 방식으로 처리하는지 궁금합니다!

`리뷰어`: cors 관련해서 질문주신게 있네요. 사전 요청에 대해서 무조건 true를 주는게 적절한지를 질문주셨는데요. 어쩔수 없이 Interceptor 로직이 태워지기 때문에 OPTIONS에 대해서는 true를 반환하도록 해야하지 않나 싶네요..

`매트`: 별 다른 방법이 없는 것 같네요 ㅜㅠ 그렇다면 서블릿 이전에 거쳐가는 filter에서 CorsFilter를 등록하는 방식은 어떻게 생각하시나요?? 인터셉터를 거치지 않기 때문에 로직 상 더욱 적합하다고 느껴지는데 이에 대해 철시에 대한 의견이 궁금합니다!!

`리뷰어`: CorsFilter를 등록하더라도 Filter -> Interceptor -> 핸들러 메서드 -> Interceptor -> Filter 순으로 동작하기 때문에 인터셉터를 거치지 않도록 만든다는 방법이 잘 이해가 가지 않네요 ㅠ 필터 구현에 대해 생각하신게 있는걸까요?

`매트`: 아래와 같이 preflight request 처리를 위한 헤더(Access-Control-Allow-Origin, Access-Control-Allow-Methods)를 세팅한 뒤 filter 체이닝을 진행하지 않고 200 상태 코드를 반환하는 형식을 생각하고 있었습니다!

```java
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CorsFilter implements Filter {
    ...
    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "authorization, content-type, xsrf-token");
        response.addHeader("Access-Control-Expose-Headers", "xsrf-token");

        if("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }
        
        chain.doFilter(req, res);
    }
    ...
}
```

서블릿 앞단에 해당 필터를 등록한 뒤 preflight request 요청이 오게 되면 http 메서드를 확인하여 서블릿 및 인터셉터를 타지 않도록 고민하고 있습니다! 결국 Cors의 preflight 관련 처리를 CorsFilter에서 모두 처리하게 되어 책임을 분리할 수 있다고 생각했습니다!

`리뷰어`: 음 결국 모든 도메인과 url에 대해서 사전 요청 OPTIONS에 대해서는 요청을 허용한다는 의미인가보네요. 보안적인 측면에서는 허용해야할 부분만 열어주는게 제일 베스트라고는 생각하는데요. 그렇다면 지금 현재 방식이 더 낫지 않을까 생각이 들기도 하네요 ㅎㅎ...

:::

리뷰어님은 결국 인증이 필요한 부분에서만 해당 요청을 열어주는 것이 좋다고 남겨주었다. CorsFilter를 추가하게 되면 결국 관리해야 할 포인트가 늘어나게 되며 허용하는 `origin`과 `http method`가 변경될 경우 직접적인 수정을 통해 관련 처리를 진행해야 한다. 

결국 `CorsFilter`를 도입하지 않았지만 `preflight`와 해결 방법에 대해 공부할 수 있는 시간으로 활용할 수 있었다.

## 객체 의존을 위한 복잡한 sql문

기존에 도메인 객체들은 의존하는 객체의 식별자인 id만을 가지고 있었다. 보다 더 나은 객체지향적인 코드 작성을 위해 각 도메인 객체가 의존하는 객체 자체를 가질 수 있도록 개선하였다. 하지만 최초에 모든 객체를 온전한 상태로 세팅하기 위해 복잡한 sql문을 동반하게 되었다.

```java
@Repository
public class OrdersDetailDao {
    ...
    public List<OrdersDetail> findByOrdersId(Long ordersId) {
        String sql = "SELECT od.id as id, od.quantity as quantity, "
                + "o.id as orderId, "
                + "c.id as customerId, c.username as customerUsername, c.email as customerEmail, "
                + "c.password as customerPassword, c.address as customerAddress, "
                + "c.phone_number as customerPhoneNumber, "
                + "p.id as productId, p.name as productName, p.price as productPrice, "
                + "p.image_url as productImageUrl, p.description as productDescription, p.deleted as productDeleted "
                + "FROM orders_detail od "
                + "JOIN orders o ON od.orders_id = o.id "
                + "JOIN product p ON od.product_id = p.id "
                + "JOIN customer c ON o.customer_id = c.id "
                + "WHERE orders_id = :ordersId";

        SqlParameterSource parameterSource = new MapSqlParameterSource("ordersId", ordersId);
        return jdbcTemplate.query(sql, parameterSource, generateOrderDetailMapper());
    }
    ...
}
```

현재 도메인에서는 객체간의 의존의 깊이가 낮아서 구현이 가능했지만 만약 깊이가 깊어질 경우 sql문은 더욱 복잡해질 것으로 판단한다. 이것을 작성하며 가장 궁금했던 것은 온전한 객체 생성을 위해 위와 같은 방법을 진행하는 것이 적절한지의 여부이다. 만약 dao와 service 계층 사이 도메인 객체 관리를 위한 repository를 두게 되면 단일 엔티티를 조회하여 조합할 수 있을 것으로 판단한다. 하지만 이 방법은 필요한 각각의 엔티티를 조회하기 위해 추가적인 sql문을 여러번 활용해야 하는 단점이 있다. 

::: tip 리뷰 중 일부

`리뷰어`: 복잡한 쿼리문에 대해서도 질문주셨는데요. 저도 가능하면 한방쿼리를 통해서 조회하는 쿼리를 많이 사용하기는 한거 같아요. 다만, 반드시 `EXPLAIN`으로 해당 쿼리의 `실행계획`이 어떻게 되는지 확인이 필요하구요. 적절한 인덱스를 타지 않아 부하가 심하다고 생각되면 각각 따로 조회해서 조합해줬던거 같네요. 

`매트`: 아직 DB에 대한 개념이 부족하여 주신 리뷰를 완벽하게 이해 하진 못했네요 🥲 `EXPLAIN`과 `인덱스` 키워드를 통해 관련 학습 진행해보겠습니다!!

:::

리뷰어와의 대화를 통해 DB 최적화를 위한 `EXPLAIN`과 `인덱스`에 대한 키워드를 확인할 수 있었다. 방학 기간 동안 Real MySQL을 기반으로 스터디를 진행하는데 이것이 해당 키워드를 이해하는데 좋은 해답이 되지 않을까 생각된다.

## 토큰 검증 및 객체 바인딩 로직 분리

::: tip 리뷰 중 일부

`리뷰어`: 기존에는 `AuthenticationPrincipalArgumentResolver`에서 `토큰 검증 및 전달`까지 해줬던걸로 보이는데요. `AuthenticationInterceptor`와 `AuthenticationPrincipalArgumentResolver`로 나눠진것 같네요. 위와 같이 다시 구성하신 이유가 있을까요?

추가로 인터셉터에서 토큰 검증을 해서 attribute로 넘기기때문에 여기서는 getAttribute로 세팅하는 부분만 남은걸로 보이는데요. 만약 getAttribute("payload")에 값이 없는 경우는 어떻게 되나요?

`매트`: ArgumentResolver의 사용 목적에 대해 고민해보았습나다. 그러던 중 ArgumentResolver을 만들기 위해 사용하는 HandlerMethodArgumentResolver의 설명을 확인하였습니다.

> Strategy interface for resolving method parameters into argument values in the context of a given.

Spring에서는 ArgumentResolver를 하나의 전략 인터페이스로 인식하고 있으며 목적은 parameter가 원하는 형태의 객체로 바인딩하는 것이라 생각합니다. 이러한 근거를 기반으로 인증 및 인가에 대한 로직들을 모두 interceptor로 이동하였습니다!

또한 관련 attribute를 누락한 이유는 해당 `AuthenticationPrincipleArgumentResolver`는 항상 interceptor를 거칠 때만 사용해서 관련 검증을 누락시켰습니다! 철시가 언급하신 것 처럼 만약 interceptor를 거치지 않고 argument를 사용하게 되면 관련 atrribute가 존재하지 않게 되므로 관련 처리 진행하였습니다!

`리뷰어`: 현재는 Interceptor로 검증하는 곳과 AuthenticationPrincipleArgumentResolver가 사용되는 곳이 동일하기 때문에 문제가 없지만 만약 추후에 기능이 추가된다고 가정했을때 두 사용하는 곳이 달라질 수 있어서 질문드린거이긴해요. Interceptor의 사용처와 AuthenticationPrincipleArgumentResolver의 사용처를 같게 만드는 것은 사람(개발자)이 하게되는 것이니 휴먼에러의 여지도 있어서요.

값을 바인딩한다는 것에 초점을 맞추신걸로 보이는데 AuthenticationPrincipleArgumentResolver에서도 Authorization 헤더를 가지고 바인딩이 가능한만큼 AuthenticationPrincipleArgumentResolver이 검증부분을 가져가도 괜찮지 않을까 의견드려요.

`매트`: 리뷰어님의 의견에도 동의합니다! 언급해주신 것에 더 나아가 Token에 대한 검증은 필요하지만 LoginCustomer가 필요하지 않은 핸들러가 존재할 때를 고민해보았습니다. 예를들면 admin과 관련된 Role이 추가되어 id라는 식별자를 기반으로 URL(ex. /api/customers/1)에 접근하게 되면 이때 LoginCustomer는 사용되지 않기 때문에 AuthenticationPrincipleArgumentResolver의 검증 로직은 사용할 수 없으며 결국 추가적인 Interceptor를 통해 처리해야 하므로 중복된 코드를 야기하게 된다고 생각하여 현재 작성한 코드가 좀 더 확장에 유연할 수 있다고 판단합니다!

:::

검증하기 위한 위치에 대한 고민이 많았는데 리뷰어와의 대화를 통해 어떠한 상황에서 어떻게 사용될지 조금은 머릿속에 그려질 수 있었다. 결국 ArgumentResolver를 사용하는 곳에서 모두 검증이 일어나기 때문에 추가적인 Interceptor를 활용하는 것은 관리할 포인트만 늘어날 수 있다. 

하지만 확장에 유연함과 객체의 책임이 적절한지의 입장에서 보면 각각의 클래스가 최소한의 역할만을 가지고 있기 때문에 변화에 대응하기 용이하다고 판단한다. 결국 단순한 인증 로직만 필요한 컨트롤러가 생길 수 있기 때문이다. 

위와 같은 문제는 정해진 정답이 없다고 판단한다. 리뷰어와 유의미한 대화를 통해 다른 시선에서 같은 문제를 더 고민해볼 수 있었고 그로 인해 다른 프로젝트를 진행할 때 내가 알고 있는 배경지식은 두배로 활용될 수 있다. 

## References.

[백엔드 서버 아키텍처 — Presentation Layer 1. 요청 방식에 따른 Variation](https://tech.junhabaek.net/%EB%B0%B1%EC%97%94%EB%93%9C-%EC%84%9C%EB%B2%84-%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98-presentation-layer-1-%EC%9A%94%EC%B2%AD-%EB%B0%A9%EC%8B%9D%EC%97%90-%EB%94%B0%EB%A5%B8-variation-353fe464bdb4)<br>
[CORS는 왜 이렇게 우리를 힘들게 하는걸까?](https://evan-moon.github.io/2020/05/21/about-cors/)<br>
[Spring ArgumentResolver와 Interceptor](https://tecoble.techcourse.co.kr/post/2021-05-24-spring-interceptor/)

<TagLinks />
