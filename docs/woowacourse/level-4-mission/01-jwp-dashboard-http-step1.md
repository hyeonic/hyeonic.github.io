---
title: 01. 톰캣 구현하기
tags: ['우아한테크코스', '미션']
date: 2022-09-11 22:00:00
feed:
  enable: true
---

# 01. 톰캣 구현하기

벌써 우아한테크코스 레벨 4가 시작 되었다. 2월을 시작으로 벌써 7개월이 넘는 시간이 흘렀다. 레벨 1에서는 기본적인 java 문법과 TDD를 활용한 단위 테스트, 레벨 2에서는 Spring framework를 활용한 웹 애플리케이션 개발과 배포 등에 대해 학습 하였다. 레벨 3에서는 팀 프로젝트를 진행했기 때문에 추가적인 미션은 진행하지 않았다. 

레벨 4에서는 기존 레벨 1, 2, 3와는 조금 다르게 진행된다. 무엇보다 내용 요약이나 반복적인 암기가 아닌 `목적에 대해 고민`하고, 실습을 통한 연습과 실제 프로젝트 적용 등 `능동적인 학습 방법`에 대해 강조하고 있다.

또한 레벨 1, 2 미션과 다르게 크루가 직접 리뷰어가 되어 리뷰를 남기도록 한다. 나 또한 누군가의 리뷰어가 되어 미션을 함께 진행한다. 누군가 나에게 남긴 리뷰에 대해 잘 이해 하고 나의 생각을 남기는 것도 중요하지만, 리뷰어의 입장에서 상대방의 의도를 적절히 끌어내는 것도 매우 중요한 역량이라 생각한다. 이번 기회를 통해 이러한 역량을 함께 키울 수 있을 것 같아서 미션 기간 내내 재미있게 진행했다. 아직 미숙한 점이 많아 다른 크루의 리뷰와 내가 이전에 리뷰어에게 받은 리뷰를 통해 어떠한 부분을 중점적으로 리뷰하면 좋은지 고민해보면 향후 리뷰어의 역할에서 보다 더 `유의미한 성장`을 할 수 있을 것이라 판단한다.

레벨 4의 첫 미션은 바로 `톰캣 구현하기`이다. 톰캣 구현하기 미션은 아래와 같은 학습 목표를 가지고 있다.

 * HTTP와 서블릿에 대한 이해도를 높인다.
 * 스레드, 스레드풀을 적용해보고 동시성 처리를 경험한다.

톰캣의 모든 컴포넌트를 구현하는 것은 아니다. 톰캣 구현을 통해 HTTP 프로토콜에 대한 구조를 익히고 직접 서블릿을 구현하며 웹 서버의 역할과 목적에 대해서도 고민할 수 있다. 이 밖에도 패키지 구조를 통한 의존성 등 고민해야할 포인트들이 많다.

> 이 글은 우아한테크코스에서 진행한 미션의 리뷰와 나의 고민과 생각에 대해 정리한다. 실제 리뷰는 [[톰캣 구현하기 - 1단계] 매트(최기현) 미션 제출합니다.](https://github.com/woowacourse/jwp-dashboard-http/pull/125)에서 확인할 수 있다.

## 요구사항 파악하기

이번 미션은 크게 `4 단계`로 이루어져 있다. 아래는 각 단계 별 체크 리스트 중 이번 1차 제출에서 구현한 것을 표시한 것이다.

### 🚀 1단계 - HTTP 서버 구현하기

 * [x] http://localhost:8080/index.html 페이지에 접근 가능하다.
 * [x] 접근한 페이지의 js, css 파일을 불러올 수 있다.
 * [x] uri의 QueryString을 파싱하는 기능이 있다.

### 🚀 2단계 - 로그인 구현하기

 * [x] HTTP Reponse의 상태 응답 코드를 302로 반환한다.
 * [x] POST로 들어온 요청의 Request Body를 파싱할 수 있다.
 * [ ] 로그인에 성공하면 HTTP Reponse의 헤더에 Set-Cookie가 존재한다.
 * [ ] 서버에 세션을 관리하는 클래스가 있고, 쿠키로부터 전달 받은 JSESSIONID 값이 저장된다.

### 🚀 3단계 - 리팩터링

 * [x] HTTP Request, HTTP Response 클래스로 나눠서 구현했다.
 * [x] Controller 인터페이스와 RequestMapping 클래스를 활용하여 if절을 제거했다.

### 🚀 4단계 - 동시성 확장하기

 * [ ] Executors로 만든 ExecutorService 객체를 활용하여 스레드 처리를 하고 있다.

아쉽게도 미션의 의도와 다르게 순차적으로 미션을 해결하지 못했다. 1단계를 진행하던 중 반복적인 `if`절과 HTTP 요청과 응답을 위해 반복적으로 사용하는 `HttpRequest`와 `HttpResponse`의 `객체의 책임`이 뚜렷해져 우선적으로 고려하게 되었다. 덕분에 나머지 2단계를 해결할 때 보다 더 쉽게 기능을 확장할 수 있을 거라 기대한다.

## 톰캣이란?

이번 미션은 무엇보다 톰캣을 구현하는 것이다. 그렇다면 우리는 톰캣은 무엇이며 어떠한 문제를 해결하기 위한 것인지 알아야 한다고 생각했다. [Tomcat](https://hyeonic.github.io/infra/basic/tomcat.html)은 미션 시작 전 톰캣은 무엇인지 간단히 정리한 것이다.

글에서 언급한 것 처럼, `톰캣`은 `Java EE(Jakarta EE)`의 `Web Container(Servlet Container)` 스펙의 구현이며, HTTP에 대한 요청을 처리하고 웹 애플리케이션을 구동할 수 있는 `server`이다.

> Java EE(Jakarta EE)의 모든 스펙을 구현한 것을 WAS라 한다. 보통 Web Container(Servlet Container)를 구현하면 통상적으로 WAS라 불린다.

## try-with-resources

우리는 `ServerSocket`에 설정한 `port`를 통해 연결 요청을 기다린다. 

```java
public class Connector implements Runnable {
    ...
    private static final int DEFAULT_PORT = 8080;
    private static final int DEFAULT_ACCEPT_COUNT = 100;

    private final ServerSocket serverSocket;
    private boolean stopped;

    public Connector() {
        this(DEFAULT_PORT, DEFAULT_ACCEPT_COUNT);
    }

    public Connector(final int port, final int acceptCount) {
        this.serverSocket = createServerSocket(port, acceptCount);
        this.stopped = false;
    }

    private ServerSocket createServerSocket(final int port, final int acceptCount) {
        try {
            final int checkedPort = checkPort(port);
            final int checkedAcceptCount = checkAcceptCount(acceptCount);
            return new ServerSocket(checkedPort, checkedAcceptCount);
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }
    ...
}
```

요청이 오면 클라이언트와 연결을 맺고 해당 클라이언트와 통신할 수 있는 `Socket`을 생성 한 뒤 특정 프로토콜을 처리할 수 있는 `Processor`로 전달된다.

```java
public class Http11Processor implements Runnable, Processor {
    ...
    private final Socket connection;

    public Http11Processor(final Socket connection) {
        this.connection = connection;
    }

    @Override
    public void run() {
        process(connection);
    }

    @Override
    public void process(final Socket connection) {
        try (final var inputStream = connection.getInputStream();
             final var outputStream = connection.getOutputStream()) {
            ...
            outputStream.write(response.getBytes());
            outputStream.flush();
        } catch (IOException | UncheckedServletException e) {
            log.error(e.getMessage(), e);
        }
    }
}
```

우리는 미션에서는 `HTTP 1.1` 프토토콜 처리를 위한 `Http11Processor`를 구현하도록 간단한 기반 코드를 제공하고 있다. 우리는 연결된 `connection`을 통해 데이터를 읽어 HTTP Request에 대한 정보를 확인해야 한다.

이러한 `Socket`은 앞서 언급한 것 처럼 서버와 클라이언트에 대한 `연결`을 맺는 것이다. 만약 `Socket` 사용이 완료된 뒤 자원을 반납하지 않으면 서버의 불필요한 리소스를 소비하게 된다. 

Java 7에 도입된 `try-with-resources`는 리소스를 try 블록에 사용할 수 있으며, 해당 블록이 실행된 후 리소스가 자동으로 닫힌다. 단 `Socket` 처럼 `AutoCloseable` 인터페이스를 적절히 `구현`해야 한다.

```java
public class Socket implements java.io.Closeable {
    ...
}
```

```java
public interface Closeable extends AutoCloseable {
    ...
}
```

이러한 `try-with-resources`는 `try ()`의 `()`사이에 작성한 순서의 역순으로 리소스가 닫힌다. 아래는 내가 이번 미션에 직접 작성한 코드 중 일부를 가져온 것이다.

```java
public class Http11Processor implements Runnable, Processor {
    @Override
    public void process(final Socket connection) {
        try (InputStream inputStream = connection.getInputStream(); // 1
             InputStreamReader inputStreamReader = new InputStreamReader(inputStream); // 2
             BufferedReader bufferedReader = new BufferedReader(inputStreamReader); // 3
             OutputStream outputStream = connection.getOutputStream() // 4
        ) {
            ...
        } catch (IOException e) {
            log.error(e.getMessage(), e);
        }
    }
}
```

`4 -> 3 -> 2 -> 1`의 순서로 리소스가 닫히게 된다.

주의해야 할 점은 특정 리소스를 메서드로 분리하여 다시 한 번 `try-with-resources`로 묶지 말아야 한다는 것이다. 아래 코드를 살펴보자.

```java
public class Http11Processor implements Runnable, Processor {
    ...
    @Override
    public void process(final Socket connection) {
        try (InputStream inputStream = connection.getInputStream();
             OutputStream outputStream = connection.getOutputStream()) {
            ...
            getHttpResponse(inputStream, outputStream); // 1
            outputStream.write(...); // 2
            outputStream.flush(); // 3
        } catch (IOException e) {
            log.error(e.getMessage(), e);
        }
    }

    private HttpResponse getHttpResponse(final InputStream inputStream, final OutputStream outputStream) {
        try (InputStreamReader inputStreamReader = new InputStreamReader(inputStream);
             BufferedReader bufferedReader = new BufferedReader(inputStreamReader)) {
            ...
        } catch (IOException e) {
            log.error(e.getMessage(), e);
        }
    }
}
```

위와 같이 `inputStream`을 추가적인 메서드로 분리한 뒤 `try-with-resources`를 사용 했다고 가정한다. 해당 메서드가 끝나는 시점에 이미 `inputStream`과 `outputStream`에 대한 리소스는 닫히게 된다. 더 나아가 `inputStream`과 `outputStream`을 획득하기 위해 사용한 `socket`의 리소스도 닫히게 된다. 그로 인하여 `2, 3`을 실행하는 시점에 socket이 닫혀 아래와 같은 예외 상황을 마주할 수 있다.

```shell
00:45:41.839 [Thread-1] ERROR org.apache.coyote.http11.Http11Processor - Socket closed
java.net.SocketException: Socket closed
	at java.base/java.net.SocketOutputStream.socketWrite(SocketOutputStream.java:113)
	at java.base/java.net.SocketOutputStream.write(SocketOutputStream.java:129)
    ...
```

## Servlet 구현하기

Servlet은 공식 문서에 따르면 `Java EE(Jakarta EE)`의 기술 기반 `웹 컴포넌트`로, 컨테이너에 의해 관리되며 `동적 콘텐츠`를 생성한다. Servlet은 다른 컴포넌트 처럼 웹 서버에 동적으로 로드되고 실행될 수 있는 바이트 코드로 컴파일 된다. Servlet 엔진이라고도 하는 컨테이너는 Servlet 기능을 제공하는 웹 서버의 확장이다. Servlet은 Servlet Container에 의해 구현된 요청/응답 패러다임을 통해 웹 클라이언트와 상호 작용한다.

나는 Servlet 명세와 유사하게 작성하기 위해 실제 구현 코드를 참고하여 설계를 진행 하였다. 모든 명세를 따라할 수 없기 때문에 이번 미션에서 필요한 부분을 적절히 선택하여 구현하였다. 아래는 실제 명세가 적힌 `Servlet` 인터페이스이다.

```java
public interface Servlet {

    public void init(ServletConfig config) throws ServletException; // 1

    public ServletConfig getServletConfig(); // 2

    public void service(ServletRequest req, ServletResponse res) throws ServletException, IOException; // 3

    public String getServletInfo(); // 4

    public void destroy(); // 5
}
```

 * `1`: Servlet Container는 서블릿을 인스턴스화한 후 정확히 한 번 init 메소드를 호출한다. 
 * `2`: 이 Servlet에 대한 초기화 및 시작 매개변수를 포함하는 `ServletConfig` 객체를 반환한다. 반환된 `ServletConfig` 객체는 `init()` 메소드에 전달된 객체입니다.
 * `3`: Servlet이 요청에 응답할 수 있도록 Servlet Container에 의해 호출된다. 이 메소드는 Servlet의 `init()` 메소드가 성공적으로 완료된 후에만 호출된다.
 * `4`: Servlet에 대한 정보를 반환한다.
 * `5`: 이 메소드는 Servlet의 `service()` 메소드 내의 모든 스레드가 종료되거나 시간 초과 기간이 경과한 후에만 호출된다.

`init()`, `destory()`의 경우 서블릿의 생명 주기와 관련이 깊다. 이번 미션에서는 Servlet Container를 전부 구현하는 것이 아니기 때문에 최소한의 기능만 동작할 수 있도록 `service()` 메서드만 참고 하였다. 실제 요청이 들어오면 Servlet Container를 통해 처리할 수 있는 서블릿의 `service()` 메서드가 실행될 것이다.

아래는 이번 미션에서 작성한 `Servlet` 인터페이스이다.

```java
public interface Servlet {

    boolean isSupported(final String path); // 1

    void service(final HttpRequest httpRequest, final HttpResponse httpResponse); // 2
}
```
 
 * `1`: 실제 Servlet의 경우 xml이나 애노테이션 설정을 통해 처리할 수 있는 `url pattern`을 지정한다. 유사하게 해당 로직을 처리하기 위해 Servlet 메서드가 해당 path를 처리할 수 있는지에 대한 여부를 반환하는 메서드를 추가하였다.
 * `2`: 선택된 서블릿이 진행할 행위를 명시한다.

다음은 `HttpServlet`이다. 실제 명세에 따르면 웹 사이트에 적합한 HTTP 서블릿을 생성하기 위해 서브클래싱할 추상 클래스를 제공하고 있다. `HttpServlet` 의 하위 클래스는 일반적으로 다음 중 하나인 적어도 하나의 메서드를 재정의해야 한다.

 * doGet, if the servlet supports HTTP GET requests
 * doPost, for HTTP POST requests
 * doPut, for HTTP PUT requests
 * doDelete, for HTTP DELETE requests
 ...

실제 명세에 작성된 코드는 아래와 같다.

```java
public abstract class HttpServlet extends GenericServlet {
    ...
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
        throws ServletException, IOException
    {
        String msg = lStrings.getString("http.method_get_not_supported");
        sendMethodNotAllowed(req, resp, msg);
    }
    ...
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
        throws ServletException, IOException {

        String msg = lStrings.getString("http.method_post_not_supported");
        sendMethodNotAllowed(req, resp, msg);
    }
    ...
    protected void doPut(HttpServletRequest req, HttpServletResponse resp)
        throws ServletException, IOException {

        String msg = lStrings.getString("http.method_put_not_supported");
        sendMethodNotAllowed(req, resp, msg);
    }
    ...
        protected void doDelete(HttpServletRequest req,
                            HttpServletResponse resp)
        throws ServletException, IOException {

        String msg = lStrings.getString("http.method_delete_not_supported");
        sendMethodNotAllowed(req, resp, msg);
    }
    ...
}
```

모두 구현하는 것이 좋겠지만 우리는 `GET`, `POST`에 대한 요청만 처리하므로 간추려서 작성 하였다. 아래는 내가 직접 작성한 `HttpServlet`이다.

```java
public abstract class HttpServlet implements Servlet {

    public void service(final HttpRequest httpRequest, final HttpResponse httpResponse) {
        if (httpRequest.getHttpMethod() == HttpMethod.GET) {
            doGet(httpRequest, httpResponse);
            return;
        }

        if (httpRequest.getHttpMethod() == HttpMethod.POST) {
            doPost(httpRequest, httpResponse);
            return;
        }
        ...
    }

    protected abstract void doGet(final HttpRequest httpRequest, final HttpResponse httpResponse);

    protected abstract void doPost(final HttpRequest httpRequest, final HttpResponse httpResponse);
}
```

들어오는 요청의 `HTTP Method`를 판단하여 `doGet()`, `doPost()` 메서드를 호출하고 있다. 이제 실제 요청을 처리할 `Servlet` 객체를 만들어보자. 우선 `HttpServlet`을 상속 한다.

아래는 회원가입에 대한 요청 처리를 위한 `RegisterServlet`이다. 만약 `/register`와 동일한 path의 요청인 경우 해당 서블릿이 실행될 것이다.

```java
public class RegisterServlet extends HttpServlet {

    private static final Logger log = LoggerFactory.getLogger(RegisterServlet.class);
    private static final String PATH = "/register";

    @Override
    public boolean isSupported(final String path) {
        return PATH.equals(path);
    }

    @Override
    protected void doGet(final HttpRequest httpRequest, final HttpResponse httpResponse) {
        httpResponse.addStatusCode(StatusCode.OK);
        httpResponse.addView("register.html");
    }

    @Override
    protected void doPost(final HttpRequest httpRequest, final HttpResponse httpResponse) {
        if (!httpRequest.hasRequestParameter("account", "password", "email")) {
            httpResponse.addStatusCode(StatusCode.OK);
            httpResponse.addView("login.html");
        }

        String account = httpRequest.getRequestParameter("account");
        String password = httpRequest.getRequestParameter("password");
        String email = httpRequest.getRequestParameter("email");

        User user = new User(account, password, email);
        InMemoryUserRepository.save(user);
        log.info("{} 회원가입 성공!", user.getAccount());

        httpResponse.sendRedirect("/index.html");
    }
}
```

앞서 언급한 것 처럼 `HttpServlet`의 `추상 메서드`인 `doGet()`, `doPost()`를 적절히 `Override`하여 메서드 별 행위를 지정하도록 하였다.

자 이제 작성한 Servlet를 생성하고 선택하기 위한 `ServletContainer`를 작성한다.

```java
public class ServletContainer {

    private static final List<Servlet> SERVLETS = List.of(new IndexServlet(), new LoginServlet(), new RegisterServlet());
    private static final Servlet NOT_FOUND_SERVLET = new NotFoundServlet();

    private ServletContainer() {
    }

    public static Servlet findByPath(final String path) {
        return SERVLETS.stream()
                .filter(servlet -> servlet.isSupported(path))
                .findFirst()
                .orElse(NOT_FOUND_SERVLET);
    }
}
```

구조는 매우 간단하다. 현재 작성된 Servlet을 순회하며 `isSupported()`로 처리 가능 여부를 확인한다. 처리 가능한 Servlet이 있다면 반환하고 없으면 `404.html`을 처리할 수 있는 Servlet을 반환한다.

이제 아래와 같이 요청이 들어오면 `path`를 전달하여 적절한 Servlet을 찾아 `service()` 메서드를 호출한다.

```java
public class Http11Processor implements Runnable, Processor {
    ...
    @Override
    public void process(final Socket connection) {
        try (InputStream inputStream = connection.getInputStream();
             InputStreamReader inputStreamReader = new InputStreamReader(inputStream);
             BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
             OutputStream outputStream = connection.getOutputStream()) {

            HttpRequest httpRequest = generateHttpRequest(bufferedReader);
            HttpResponse httpResponse = new HttpResponse();

            Servlet servlet = ServletContainer.findByPath(httpRequest.getPath());
            servlet.service(httpRequest, httpResponse);

            write(outputStream, httpResponse);
        } catch (IOException e) {
            log.error(e.getMessage(), e);
        }
    }
}
```

## 패키지 구조와 아쉬운 점

나는 이번 미션 코드를 처음 봤을 때 크게 두 개의 프로젝트로 나뉜다고 생각했다. 하나는 일반적으로 우리가 개발하는 웹 애플리케이션, 나머지 하나는 톰캣이라고 염두 한 뒤 미션을 진행하였다.

내 판단으로는 적어도 톰캣 내부에는 우리가 개발 중인 웹 애플리케이션에 대한 의존성을 없애야 한다고 생각했다. 이유는 톰캣은 보다 더 범용적인 목적으로 사용되는 외부 라이브러리 처럼 느껴졌기 때문이다.

하지만 결과적으로 이것을 이뤄내지 못했다. 이유는 바로 `ServletContainer` 때문이다. `HttpServlet`은 실제 요청에 따라 처리하기 위한 로직이 담겨있기 때문에 웹 애플리케이션 패키지 내부에 두었다. 하지만 `ServletContainer`는 해당 Servlet에 대한 의존을 가져야만 한다. 결국 애노테이션을 활용한 리플렉션 등 추가적인 조치를 취하지 않으면 직접적인 의존성을 해결할 수 없게 된다.

```java
package org.apache.servlet; // 톰캣 구현을 위한 패키지

import java.util.List;
import nextstep.jwp.controller.IndexServlet;    // 웹 애플리케이션 의존!
import nextstep.jwp.controller.LoginServlet;    // 웹 애플리케이션 의존!
import nextstep.jwp.controller.RegisterServlet; // 웹 애플리케이션 의존!

public class ServletContainer {

    private static final List<Servlet> SERVLETS = List.of(new IndexServlet(), new LoginServlet(), new RegisterServlet());
    ...
}
```

결국 톰캣 내부에 웹 애플리케이션에 대한 의존성을 전부 끊어내지 못했다. 현재 가장 빠르게 의존성을 제거할 수 있는 방법은 `Application`에서 Tomcat을 생성하는 시점에 아래와 같이 `Servlet` 리스트를 주입하는 방식이다.

```java
public class Application {
    private static final List<Servlet> SERVLETS = List.of(new IndexServlet(), new LoginServlet(), new RegisterServlet());
    private static final Logger log = LoggerFactory.getLogger(Application.class);

    public static void main(String[] args) {
        log.info("web server start.");
        final var tomcat = new Tomcat(SERVLETS); // servlet 리스트 주입
        tomcat.start();
    }
}
```

다만 이것은 미션에서 얻고자 하는 것에 조금 벗어날 수 있다고 판단해서 적절한 타협으로 직접 의존을 통해 로직이 정상적으로 실행되는 것에 집중 하였다. 우선 이 문제에 대해 충분히 인지하고 있으니 2차 제출 때 더 고민한 뒤 개선할 예정이다.

## References.

[Java – Try with Resources](https://www.baeldung.com/java-try-with-resources)<br>
[Jakarta Servlet 5.0 Specification Document (HTML)](https://jakarta.ee/specifications/servlet/5.0/jakarta-servlet-spec-5.0.html)<br>

<TagLinks />
