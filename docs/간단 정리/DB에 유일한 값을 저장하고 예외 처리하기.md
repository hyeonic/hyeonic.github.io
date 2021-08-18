# DB에 유일한 값을 저장하고 예외 처리하기

각 User는 하나의 Blog를 가질 수 있다. 

하지만 이전에는 추가적인 검증 로직을 거치지 않았기 때문에 한 user가 다수의 blog가 생성되는 것을 확인할 수 있었다.

1차로 개선한 로직에서 이것을 해결하기 위해서는 DB에 추가적인 exist 관련 조회를 통해 테이블에 데이터 유무를 확인하였다. 

하지만 더 나아가 이러한 방식이 아닌 database unique 제약 조건을 활용하여 중복 저장을 시도하는 경우 spring이 던지는 예외를 받아서 처리하는 방식으로 개선하였다.

```java
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(exclude = {"posts"})
public class Blog extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "blog_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", unique = true)
    private User user;
    
    ...
}
```

blog와 user는 1대1로 연관관계가 이루어져 있다. 두 엔티티의 주인은 blog로 설정하였기 때문에 외래키를 Blog 엔티티에 명시하였다. 추가적으로 `unique = true`로 설정하여 제약조건을 설정하였다.

이제 중복으로 저장을 시도하면 아래와 같은 예외 메시지를 확인할 수 있다.

```
org.springframework.dao.DataIntegrityViolationException: could not execute statement; SQL [n/a]; 
```

데이터를 삽입하거나 업데이트하려는 시도가 무결성 제약 조건을 위반할 때 throw되는 예외이다. 

[DataIntegrityViolationException (Spring Framework 5.3.9 API)](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/dao/DataIntegrityViolationException.html)

이제 이렇게 던진 예외를 handling 해야 한다.

```java
@Slf4j
@RestControllerAdvice
public class CommonExceptionHandler {

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponse> handleDataIntegrityViolationException(DataIntegrityViolationException e) {
        log.error("[CommonExceptionHandler]", e);
        ErrorResponse response = ErrorResponse.of(ErrorCode.DUPLICATE_RESOURCE);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
    }
}
```

`@RestControllerAdvice`를 활용하여 `DataIntegrityViolationException`을 처리하도록 구현하였다.

실제로 중복된 데이터를 저장하려고 시도해보면 409 상태코드를 반환하도록 구현하였다.

```json
{
  "timestamp": "2021-08-18T19:31:24.631023",
  "message": "Duplicate resource",
  "status": 409
}
```
