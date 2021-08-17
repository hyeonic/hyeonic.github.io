# API 예외 처리

HTML은 대부분 4xx, 5xx와 같은 오류 페이지만 있으면 대부분 오류를 해결할 수 있다. 하지만 API의 경우에는 각 오류 상황에 맞는 오류 스펙을 정해야 하고 JSON으로 데이터를 내려주어야 한다.

## BasicErrorController

스프링 부트의 기본 설정은 오류 발생 시 `/error`를 오류 페이지로 요청한다. `BasicErrorController`는 이 경로를 기본으로 받는다. 해당 경로는 `server.error.path`에서 수정이 가능하다.

```json
{
    "timestamp": "",
    "status": 500,
    "error": "Internal Server Error",
    "exception": "java.lang.RuntimeException",
    "trace": "java.lang.RuntimeException: ...",
    "message": "잘못된 사용자",
    "path": "/api/members/ex"
}
```

스프링 부트는 BasicErrorController가 제공하는 기본 정보들을 활용하여 오류 API를 생성해준다. 하지만 이러한 정보를 그대로 노출하게 되면 보안상에 문제가 발생할 여지가 있다.

## HandlerExceptionResolver

예외가 발생하면 서블릿을 넘어 WAS로 예외가 전달되며 HTTP 상태코드가 500으로 처리된다. 하지만 원하는 것은 발생하는 예외에 따라 400, 404 등 다른 상태코드로 처리하고 싶다. 또한 오류 메시지 또한 API 마다 다르게 처리하려면 어떻게 해야 할까?

스프링 MVC는 컨트롤러 박으로 예외가 던져진 경우 예외를 해결하고, 동작을 새로 정의하는 방법을 제공한다. 

## @ExceptionHandler

스프링은 API 예외 처리 문제를 해결하기 위해 `@ExceptionHandler`라는 애노테이션을 사용하는 매우 편리한 예외 처리 기능을 제공한다. 이것은 바로 `ExceptionHandlerExceptionResolver`이다. 스프링은 이러한 `ExceptionHandlerExceptionResolver`를 기본으로 제공하고, 기본으로 제공하는 `ExceptionResolver`중에 우선순위가 가장 높다. 


**ErrorResult.java**

```java
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResult {
    private String code;
    private String message;
}
```

예외가 발생햇을 때 API 응답을 사용하는 객체이다.

```java
@ResponseStatus(HttpStatus.BAD_REQUEST)
@ExceptionHandler(IllegalArgumentException.class)
    public ErrorResult illegalExHandle(IllegalArgumentException e) {
        log.error("[exceptionHandle] ex", e);
        return new ErrorResult("BAD", e.getMessage());
}
```

`@ExceptionHandler` 애노테이션을 선언하고, 해당 컨트롤러에서 처리하고 싶은 예외를 지정해준다. 해당 컨트롤러에서 예외가 발생하면 이 메소드가 호출되어 예외를 처리한다. 또한 지정한 예외와 자식 클래스 까지 모두 잡을 수 있다. 우선순위는 자세한 것이 우선권을 가진다. 

또한 다양한 예외를 한번에 처리 가능하다.
```java
@ExceptionHandler({AException.class, BException.class})
public String ex(Exception e) {
    log.info("exception e", e);
}
```

예외를 생략할 수 있다. 생략하면 메소드 파라미터의 예외가 지정된다.
```java
@ExceptionHandler
public ResponseEntity<ErrorResult> userExHandle(Exception e) {}
```


## @ControllerAdvice

`@ExceptionHandler`는 예외를 깔끔하게 처리할 수 있지만, 정상 코드와 예외 처리 코드가 하나의 컨트롤러에 섞여 있다. 이때 `@ControllerAdvice`를 사용하면 둘을 분리할 수 있다.

```java
@Slf4j
@RestControllerAdvice
public class ExControllerAdvice {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(IllegalArgumentException.class)
    public ErrorResult illegalExHandle(IllegalArgumentException e) {
        log.error("[exceptionHandle] ex", e);
        return new ErrorResult("BAD", e.getMessage());
    }
}
```

`@ControllerAdvice`는 대상으로 지정한 여러 컨트롤러에 `@ExceptionHandler` 및 `@InitBinder` 기능을 부여해주는 역할을 한다. 대상을 따로 지정하지 않으면 모든 컨트롤러에 적용된다.

```java
// Target all Controllers annotated with @RestController
@ControllerAdvice(annotations = RestController.class)
public class ExampleAdvice1 {}

// Target all Controllers within specific packages
@ControllerAdvice("org.example.controllers")
public class ExampleAdvice2 {}

// Target all Controllers assignable to specific classes
@ControllerAdvice(assignableTypes = {ControllerInterface.class,
AbstractController.class})
public class ExampleAdvice3 {}
```

[1.3.7 Controller Advice](https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#mvc-ann-controller-advice)