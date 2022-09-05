---
title: Spring MVC에서 HTTP cache 적용하기
tags: ['우아한테크코스', 'MVC', 'cache', '만들면서 배우는 스프링 실습 코드', 'jwp-hands-on']
date: 2022-09-05 22:00:00
feed:
  enable: true
---

# Spring MVC에서 HTTP cache 적용하기

캐시란, 사전적 의미로 컴퓨터 과학에서 데이터나 값을 미리 복사해 놓는 `저장소`를 일컫는다. `HTTP 캐시`란 이전에 가져온 리소스를 저장한 뒤 `재사용`함으로써 웹 사이트와 애플리케이션의 `성능을 향상` 시키는 것을 의미한다. 이러한 HTTP 캐시는 클라이언트와 서버 간의 네트워크 트래픽을 줄임으로써 웹 사이트가 보다 `더 빠르게 반응`할 수 있도록 만들어준다. 

사실 이전까지는 이론으로만 캐시에 대해 학습 하였기 때문에 어떠한 방식으로 적용할 수 있는지에 대해서 의문을 가지고 있었다. 좋은 기회로 우아한테크코스에서 다양한 사례를 기반으로한 HTTP 캐시 적용 실습을 진행 하였다. 이번 기회를 통해 실습에서 다룬 내용을 간단히 정리해보려 한다. 

실습의 학습 목표는 아래와 같다.

 * HTTP를 활용하여 사이트의 성능을 개선할 수 있다.
 * HTTP 캐싱과 압축을 적용할 수 있다.

학습 순서는 아래와 같다.

 * 테스트 코드로 HTTP 헤더를 검증하는 방법을 익힌다.
 * HTTP 압축을 설정한다.
 * HTTP 헤더에 Cache-Control를 적용하고 캐싱이 적용됐는지 확인한다.
 * 캐시 무효화(Cache Busting)를 학습한다.

## 0단계 - 휴리스틱 캐싱 제거하기

 * HTTP 응답 헤더에 `Cache-Control`가 없어도 웹 브라우저가 `휴리스틱 캐싱`에 따른 암시적 캐싱을 한다.
 * 의도하지 않은 캐싱을 막기 위해 모든 응답의 헤더에 `Cache-Control: no-cache`를 명시한다.
 * 또한, 쿠키나 사용자 개인 정보 유출을 막기 위해 `private`도 추가한다.
 * 모든 응답 헤더의 기본 캐싱을 아래와 같이 설정한다.
 * `GreetingControllerTest` 클래스의 `testNoCachePrivate()` 테스트 메서드를 통과시키면 된다.

> **휴리스틱 캐싱이란?**
> 
> 브라우저나 프록시 서버에서 임의로 캐싱할 수 있다. 의도하지 않게 캐싱을 진행할 수 있다는 것이다. 
> 이것은 결국 우리가 수정한 응답이 적용되지 않을 수 있다는 것을 의미한다.

> **no-cache**
> 
> The no-cache response directive indicates that the response can be stored in caches, 
> but the response must be validated with the origin server before each reuse, 
> even when the cache is disconnected from the origin server.
> 
> 응답을 캐시에 저장할 수 있음을 나타내지만, 캐시가 origin server에서 연결이 끊어진 경우에도 응답을 재사용하기 전에 origin 서버에서 확인해야 한다.

### HandlerInterceptor의 postHandle 메서드 활용

```java
@Component
public class CacheInterceptor implements HandlerInterceptor {
    
    @Override
    public void postHandle(final HttpServletRequest request, final HttpServletResponse response, final Object handler,
                           final ModelAndView modelAndView) {
        response.addHeader("Cache-Control", "no-cache, private");
    }
}
```

### HandlerInterceptor 추가

```java
@Configuration
public class CacheWebConfig implements WebMvcConfigurer {

    private final HandlerInterceptor cacheInterceptor;

    public CacheWebConfig(final HandlerInterceptor cacheInterceptor) {
        this.cacheInterceptor = cacheInterceptor;
    }

    @Override
    public void addInterceptors(final InterceptorRegistry registry) {
        registry.addInterceptor(cacheInterceptor)
                .addPathPatterns("/**");
    }
}
```

 * `addPathPatterns("/**")`: `/` 아래 모든 파일과 일치한다.

### PathPattern 예제

 * `/pages/t?st.html`: `/pages/test.html`뿐만 아니라 `/pages/tXst.html`도 일치하지만 `/pages/toast.html`은 일치하지 않는다.
 * `/resources/*.png`: 리소스 디렉터리의 모든 `.png` 파일과 일치한다.
 * `/resources/**`: `/resources/image.png` 및 `/resources/css/spring.css`를 포함하여 `/resources/path` 아래의 모든 파일과 일치한다.
 * `/resources/{*path}`: `/resources`뿐만 아니라 `/resources` 아래에 있는 모든 파일과 일치하며 `path`라는 변수에 해당 파일의 상대 경로를 캡처한다. `/resources/image.png`는 `path` -> `/image.png`와 일치하며 `/resources/css/spring.css`은 `path` -> `/css/spring.css`과 일치한다.
 * `/resources/{filename:\\w+}.dat`: `/spring/spring.dat`과 일치하고 `spring` 값을 파일 이름 변수에 할당한다.

### 더 개선하기

```java
@Configuration
public class CacheWebConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(final InterceptorRegistry registry) {
        final var interceptor = new WebContentInterceptor();
        interceptor.addCacheMapping(CacheControl.noCache().cachePrivate(), "/*");
        registry.addInterceptor(interceptor);
    }
}
```

 * `WebContentInterceptor`: 지원되는 메서드와 필수 세션에 대한 요청을 확인 뒤 그성된 캐시 설정을 적용하여 응답을 준비하는 interceptor이다. 위 예시와 같이 `addCacheMapping()`을 통해 캐시를 적용할 수 있다.

## 1단계 - HTTP Compression 설정하기

 * HTTP 응답을 압축하면 웹 사이트의 성능을 높일 수 있다.
 * 스프링 부트 설정을 통해 `gzip`과 같은 HTTP 압축 알고리즘을 적용시킬 수 있다.
 * 테스트 코드가 통과하는지
 * `gzip`이 적용됐는지 테스트 코드가 아닌 웹 브라우저에서 HTTP 응답의 헤더를 직접 확인한다.
 * `GreetingControllerTest` 클래스의 `testCompression()` 테스트 메서드를 통과시키면 된다.

### application.yml

```yaml
server:
  compression:
    enabled: true
    min-response-size: 10
```

HTTP response compression은 `Jetty`, `Tomcat`, `Reactor Netty` 및 `Underow`에서 지원됩니다. `application.yml`에서 다음과 같이 활성화할 수 있다.

```yaml
server:
  compression:
    enabled: true
```

아래는 압축 관련 설정 정보가 담긴 `Compression` 객체이다.

```java
public class Compression {
    ...
    private DataSize minResponseSize = DataSize.ofKilobytes(2);
    ...
}
```

위 코드를 보면 기본적으로 압축을 수행하기 위해 응답 길이가 `2048 Byte` 이상이어야 한다. `server.compression.min-response-size` 속성을 설정하여 이 동작을 구성할 수 있다.

```yaml
server:
  compression:
    ...
    min-response-size: 10
```

## 2단계 - ETag/If-None-Match 적용하기

 * `ETag`와 `If-None-Match`를 사용하여 HTTP 캐싱을 적용해보자.
 * Spring mvc에서 `ShallowEtagHeaderFilter` 클래스를 제공한다.
 * 필터를 사용하여 `/etag` 경로만 ETag를 적용하자.
 * `GreetingControllerTest` 클래스의 `testETag()` 테스트 메서드를 통과시키면 된다.

### ETag/If-None-Match

태그 번호를 부여하는 방식이다. ETag에 해시값을 넣는 방식으로 활용한다.

 * `ETag`: 어떤 해시값을 넣는다.
 * `Cache-Control`: 캐시 유효 시간을 명시한다.

1시간 이후 다시 요청을 보낸 경우 `If-None-Match`에 응답의 `ETag`로 받은 해시값을 명시한다.
 * 갱신할 필요가 없는 경우 `304 Not Modified`를 통해 언제까지 유효한지 다시 명시한다.
 * 갱신이 필요한 경우 다시 응답을 만들어 보낸다.

### EtagFilterConfiguration

```java
@Configuration
public class EtagFilterConfiguration {

    @Bean
    public FilterRegistrationBean<ShallowEtagHeaderFilter> shallowEtagHeaderFilter() {
        FilterRegistrationBean<ShallowEtagHeaderFilter> filterRegistrationBean = new FilterRegistrationBean<>(
                new ShallowEtagHeaderFilter());
        filterRegistrationBean.addUrlPatterns("/etag");
        return filterRegistrationBean;
    }
}
```

### ShallowEtagHeaderFilter

응답의 내용에 따라 ETag 값을 생성하는 `Filter`이다. 이 `ETag`는 요청의 `If-None-Match` 헤더와 비교된다. 
이러한 헤더가 동일할 경우, 응답 내용은 발송되지 않고 대신 ` 304 Not Modified` 상태가 됩니다. 

## 3단계 - 캐시 무효화(Cache Busting)

 * 어떤 경우에 HTTP 캐시를 적용하는게 좋을까?
   * JS, CSS 같은 정적 리소스 파일은 캐싱을 적용하기 좋다. 
   * 하지만 자바스크립트와 css는 개발이 진행됨에 따라 자주 변경되고, 자바스크립트와 CSS 리소스 버전이 동기화되지 않으면 화면이 깨진다.
   * 캐시는 URL을 기반으로 리소스를 구분하므로 리소스가 업데이트될 때 URL을 변경하면 손쉽게 JS, CSS 파일의 캐시를 제거할 수 있다.
 * 캐시 무효화는 콘텐츠가 변경될 때 URL을 변경하여 응답을 장기간 캐시하게 만드는 기술이다. 
 * 어떻게 적용할까? 
   * 정적 리소스 파일의 `max-age`를 최대치(1년)로 설정한다. 
   * `ETag`도 적용한다. 
   * JS, CSS 리소스에 변경사항이 생기면 캐시가 제거되도록 url에 버전을 적용하자. 
 * `CacheBustingWebConfig` 클래스의 `addResourceHandlers` 메서드의 registry에 리소스 디렉터리에 버전을 추가하고 캐싱을 추가한다.
 * `GreetingControllerTest` 클래스의 `testCacheBustingOfStaticResources()` 테스트 메서드를 통과시키면 된다.

### 일반적인 캐싱 패턴

- `Cache-Control: no-cache`
- `Cache-Control: no-cache, private`

기본적으로 `no-cache`를 명시한다. 이유는 `Cache-Control`을 누락할 경우 `휴리스틱 캐싱(Heuristic caching)`이 발생할 수 있다.
브라우저나 프록시 서버에서 임의로 캐싱할 수 있다. 의도하지 않게 캐싱을 진행할 수 있다는 것이다. 
이것은 결국 우리가 수정한 응답이 적용되지 않을 수 있다는 것을 의미한다. 만약 컨텐츠에 개인화된 정보가 있을 수 있기 때문에 `private`를 명시하는 것도 좋다.

### 캐시 무효화

보통 `*.js`나 `*.css`같은 정적 리소스를 캐싱 하는 것이 좋다. 우리가 수정사항을 새로 배포하기 전에는 절대 내용이 바뀌지 않을 파일이기 때문이다. 
이러한 파일들은 최대한 오래 캐싱하며 새로 배포 되었을 때만 바로 캐시를 적용 시키기 위해 url을 다르게 가져가는 전략을 가진다.

캐시를 할때 캐시키로 `url`을 가져간다. 파일 자체는 캐시를 하지만 다른 url에 새로 배포된 파일을 캐싱할 것이다. 
이러한 전략을 `캐시 무효화`라고 한다. 아래는 캐시 무효화하기 위한 방법이다.
 * version in filename
 * version in query
 * hash in filename
 * hash in query

이러한 방식은 url이 바뀌기 때문에 자연스럽게 최신 리소스로 배포가 될 것이고, 우리가 새로 배포하기 전까지 최대한 길게 캐시 유효 시간을 늘린다. 보통 1년으로 설정한다.

### ResourceVersion

```java
@Component
public class ResourceVersion {

    private static final String DEFAULT_DATE_TIME_FORMAT = "yyyyMMddHHmmSS";

    private String version;

    @PostConstruct
    public void init() {
        this.version = now();
    }

    public String getVersion() {
        return version;
    }

    private static String now() {
        final DateTimeFormatter formatter = DateTimeFormatter.ofPattern(DEFAULT_DATE_TIME_FORMAT);
        return LocalDateTime.now().format(formatter);
    }
}
```

빈이 등록되는 시점에 `version`이 변경된다.

### CacheBustingWebConfig

```java
@Configuration
public class CacheBustingWebConfig implements WebMvcConfigurer {

    public static final String PREFIX_STATIC_RESOURCES = "/resources";
    private static final Duration ONE_YEAR = Duration.ofDays(365);

    private final ResourceVersion version;

    @Autowired
    public CacheBustingWebConfig(ResourceVersion version) {
        this.version = version;
    }

    @Override
    public void addResourceHandlers(final ResourceHandlerRegistry registry) {
        registry.addResourceHandler(PREFIX_STATIC_RESOURCES + "/" + version.getVersion() + "/**")
                .addResourceLocations("classpath:/static/")
                .setCacheControl(CacheControl.maxAge(ONE_YEAR).cachePublic());
    }
}
```

 * `addResourceHandlers`: web application root, classpath 등의 특정 위치에서 이미지, js 및 css 파일과 같은 `정적 리소스`를 서비스할 핸들러를 추가한다.
 * `addResourceHandler`: 정적 리소스를 제공할 리소스 `registry`를 추가한다. 지정된 URL 경로 패턴 중 하나와 일치하는 요청에 대해 `registry`가 호출된다. 패턴 구문은 구문 분석된 패턴이 활성화 되었을 때 `PathPattern`을 참조하고, 그렇지 않을 경우 `AntPathMatcher`를 참조한다. 이 구문은 웹 사용에 더 적합하고 더 효율적인 `PathPattern`과 대체로 동일하다. 
 * `addResourceLocations`: 정적 콘텐츠를 제공할 리소스 위치를 하나 이상 추가한다. 각 위치는 유효한 디렉터리를 가리켜야 한다. 여러 위치를 쉼표로 구분된 목록으로 지정할 수 있으며, 지정된 순서대로 해당 위치가 특정 리소스에 대해 검사된다. 예를 들어 `{"/", "classpath:/META-INF/public-web-resources/"}`을(를) 사용하면 `웹 애플리케이션 루트`의 리소스가 우선되므로 `웹 애플리케이션 루트`와 `/META-INF/public-web-resources/`디렉토리가 포함된 클래스 경로의 모든 JAR에서 리소스를 제공할 수 있다.
 * `setCacheControl`: 사용할 `Cache-Control`을 지정한다.

애플리케이션이 새롭게 배포되면 웹 애플리케이션의 모든 빈들이 다시 등록된다. version 또한 현재 시간으로 다시 등록되기 때문에 새로운 url로 인식되어 이전에 캐시된 파일은 무시된다.

### ETagFilterConfiguration

```java
@Configuration
public class EtagFilterConfiguration {

    @Bean
    public FilterRegistrationBean<ShallowEtagHeaderFilter> shallowEtagHeaderFilter() {
        FilterRegistrationBean<ShallowEtagHeaderFilter> filterRegistrationBean = new FilterRegistrationBean<>(
                new ShallowEtagHeaderFilter());
        filterRegistrationBean.addUrlPatterns("/etag", "/resources/*");
        return filterRegistrationBean;
    }
}
```
 
 * `addUrlPatterns("/etag", "/resources/*")`: `/etag`, `/resources/*` 하위로 들어온 url 패턴에 `ETag`를 추가한다.

### CacheWebConfig

```java
@Configuration
public class CacheWebConfig implements WebMvcConfigurer {

    private final HandlerInterceptor cacheInterceptor;

    public CacheWebConfig(final HandlerInterceptor cacheInterceptor) {
        this.cacheInterceptor = cacheInterceptor;
    }

    @Override
    public void addInterceptors(final InterceptorRegistry registry) {
        registry.addInterceptor(cacheInterceptor)
                .addPathPatterns("/**")
                .excludePathPatterns("/resources/**");
    }
}
```

 * `excludePathPatterns("/resources/**")`: 제외할 `PathPattern`를 지정한다.

### 더 개선하기

`ETag`를 사용하기 때문에 `Last-Modified`는 불필요하다 판단할 수 있다. 하지만 `Last-Modified`는 캐싱 외에도 클러에게 마지막 수정 시간을 알려주기 때문에 크롤링 빈도를 조정할 수 있다고 한다. 고로 둘 다 적용하는 것이 바람직하다.

```java
@Configuration
public class CacheBustingWebConfig implements WebMvcConfigurer {

    public static final String PREFIX_STATIC_RESOURCES = "/resources";
    private static final Duration ONE_YEAR = Duration.ofDays(365);

    private final ResourceVersion version;

    @Autowired
    public CacheBustingWebConfig(ResourceVersion version) {
        this.version = version;
    }

    @Override
    public void addResourceHandlers(final ResourceHandlerRegistry registry) {
        registry.addResourceHandler(PREFIX_STATIC_RESOURCES + "/" + version.getVersion() + "/**")
                .addResourceLocations("classpath:/static/")
                .setUseLastModified(true)
                .setCacheControl(CacheControl.maxAge(ONE_YEAR).cachePublic());
    }
}
```

## 후기

간단한 `Interceptor`, `Filter` 적용에 대한 경험은 많았지만 `WebContentInterceptor`와 같이 미리 정의된 클래스도 존재한다는 것을 처음 알았다. 그렇기 때문에 처음 미션을 마주했을 때 직접 캐싱을 위한 `Interceptor`를 만들어 적용하여 해결하였다.

항상 막연하게만 다가오던 HTTP 캐싱을 Spring MVC를 활용하여 적용해보았다. 다양한 사례를 기반으로 실습을 진행했기 때문에 보다 더 몰입하며 진행할 수 있었다. 다음에는 이러한 실습 내용을 기반으로 실제 우리 프로젝트의 어느 부분에 적용할 수 있는지 고민해보려 한다.

## References.
 
 * 우아한테크코스 강의자료
 * [HTTP 캐싱 by gugu](https://www.youtube.com/watch?v=UxNz_08oS4E)
 * [jwp-hands-on github repository](https://github.com/woowacourse/jwp-hands-on)
 * [PathPattern](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/util/pattern/PathPattern.html)
 * [17.3.6. Enable HTTP Response Compression](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#howto.webserver.enable-response-compression)
 * [HTTP caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)

<TagLinks />
