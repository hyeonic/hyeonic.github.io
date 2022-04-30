---
title: 01. 사전 준비, 1단계 - 웹 체스
tags: ['우아한테크코스', '미션']
date: 2022-04-30 16:30:00
feed:
  enable: true
---

# 01. 사전 준비, 1단계 - 웹 체스

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/152970395-a31c8134-fc89-449f-b4dc-441e03df929c.png />

## 목표

우아한테크코스에서 진행한 미션의 리뷰와 피드백에 대해 정리한다. 실제 리뷰는 [[Spring 체스 - 1단계] 매트(최기현) 미션 제출합니다.](https://github.com/woowacourse/jwp-chess/pull/342)에서 확인할 수 있다.

## 01. 사전 준비, 1단계 - 웹 체스 리뷰 확인

드디어 레벨 2가 시작되었다. 레벨 2의 첫 미션은 레벨 1동안 많은 크루들을 괴롭힌 체스 미션의 연장선이다. 레벨 1에서 구현한 체스 애플리케이션을 기반으로 Spring Framework를 활용하여 구현하는 경험을 진행한다. 

이번 미션의 목표는 아래와 같다.

* 레벨 1에서 구현한 체스 애플리케이션을 토대로 스프링 프레임워크를 활용하여 구현하는 경험한다.
* 핵심 로직은 프레임워크에 종속되지 않은게 중요하다는 점을 인지하고 이를 고려하여 개발을 하는 경험한다.
* 학습 테스트를 통해 스프링 프레임워크를 익히고 미션을 통해 실제로 적용해보는 경험을 진행한다.

## 페어 프로그래밍

이번 미션에서는 운이 좋게 **엘리**와 **릭**과 함께 3인 페어로 진행하게 되었다. 덕분에 체스 도메인 코드를 선택할 때 다양한 선택지가 있어서 좋았다. 서로의 코드를 살펴본 뒤 투표를 통해 **릭**의 코드를 기반으로 진행하기로 결정하였다. 

페어들과 이야기를 나눈 뒤 가장 중점을 둔 것은 도메인을 최대한 훼손하지 않고 `Sprak 기반`에서 `Spring 기반`으로 변경하는 것이다.

## @RestController

기반 코드를 릭 코드로 진행하기로 하였기 때문에 어떻게 동작하는지 확인해볼 필요가 있었다.

```java
public class ChessWebController {
    ...
    public void run() {

        get("/", (req, res) ->
                render(new HashMap<>(), "index.html")
        );

        path("/rooms", () -> {
            get("/:name", (req, res) -> {
                final boolean roomExist = roomService.isExistRoom(extractRoomName(req));
                if (!roomExist) {
                    res.redirect("/");
                }
                return render(new HashMap<>(), "board.html");
            });

            post("/:name", (req, res) ->
                    roomService.createRoom(extractRoomName(req))
            );

            delete("/:name", (req, res) -> {
                final String json = roomService.deleteRoom(extractRoomName(req));
                handleError(json, res);
                return json;
            });

            get("/:name/pieces", (req, res) -> {
                final String json = chessService.findAllPiece(extractRoomName(req));
                handleError(json, res);
                return json;
            });

            post("/:name/pieces", (req, res) -> {
                final String json = chessService.initPiece(extractRoomName(req));
                handleError(json, res);
                return json;
            });

            put("/:name/pieces", (req, res) -> {
                final String requestBody = req.body();
                final MoveRequestDto requestDto = MoveRequestDto.from(requestBody);
                final String json = chessService.move(extractRoomName(req), requestDto);
                handleError(json, res);
                return json;
            });

            get("/:name/scores", (req, res) -> {
                final String json = chessService.findScore(extractRoomName(req));
                handleError(json, res);
                return json;
            });

            get("/:name/turn", (req, res) -> {
                final String json = roomService.findCurrentTurn(extractRoomName(req));
                handleError(json, res);
                return json;
            });

            get("/:name/result", (req, res) -> {
                final String json = chessService.result(extractRoomName(req));
                handleError(json, res);
                return json;
            });
        });
    }
    ...
}
```

Spark 기반 구조라 알아보기 쉽지 않지만 잘 살펴보면 `json` 데이터를 기반으로 값을 반환하고 있다. Spring 전환 시에도 해당 사항을 고려하여 변경해야 했다.

### @Controller와 @ResponseBody 

기본적으로 `@Controller`를 사용하게 되면 `View`를 반환하기 위해 사용된다. Controller가 반환한 View의 이름으로 View를 랜더링하기 위해서 내부적으로 `ViewResolver`가 사용된다. ViewResolver 설정에 맞게 View를 찾아 랜더링을 진행한다.

Controller는 데이터를 반환할 수도 있다. 이때 `@ResponseBody` 애노테이션을 활용해야 한다. 이때 객체 반환을 위해 ViewResolver를 사용하는 대신 `HttpMessageConverter`가 동작한다.

`@RestController`는 `@Controller`에 `@ResponseBody`가 추가된 것이다. 즉 해당 Controller를 활용하여 데이터를 반환하도록 사용할 수 있다. 주로 REST API 개발을 위해 사용되며 해당 객체는 `ResponseEntity`로 감싸서 반환된다.

자세한 설명은 [[Spring] @Controller와 @RestController 차이](https://mangkyu.tistory.com/49)에서 확인할 수 있다.

### 변경된 Controller

앞서 언급한 것처럼 json 데이터 반환을 위해 `@RestController`를 기반으로 작성한다.

```java
@RestController
@RequestMapping("/rooms")
public class ChessController {

    private final RoomService roomService;
    private final ChessService chessService;

    public ChessController(final RoomService roomService, final ChessService chessService) {
        this.roomService = roomService;
        this.chessService = chessService;
    }

    @PostMapping("/{roomName}")
    public void createRoom(@PathVariable("roomName") final String roomName) {
        roomService.createRoom(roomName);
    }

    @DeleteMapping("/{roomName}")
    public void deleteRoom(@PathVariable("roomName") final String roomName) {
        roomService.deleteRoom(roomName);
    }

    @GetMapping("/{roomName}/pieces")
    public ResponseEntity<List<ChessPieceDto>> findPieces(@PathVariable("roomName") final String roomName) {
        final List<ChessPieceDto> chessPieces = chessService.findAllPiece(roomName);
        return ResponseEntity.ok(chessPieces);
    }

    @PostMapping("/{roomName}/pieces")
    public void createPieces(@PathVariable("roomName") final String roomName) {
        chessService.initPiece(roomName);
    }

    @PutMapping("/{roomName}/pieces")
    public ResponseEntity<MoveResult> movePiece(@PathVariable("roomName") final String roomName,
                                                @RequestBody final MoveRequestDto moveRequestDto) {
        final MoveResult moveResult = chessService.move(roomName, moveRequestDto);
        return ResponseEntity.ok(moveResult);
    }

    @GetMapping("/{roomName}/scores")
    public ResponseEntity<Score> findScore(@PathVariable("roomName") final String roomName) {
        final Score score = chessService.findScore(roomName);
        return ResponseEntity.ok(score);
    }

    @GetMapping("/{roomName}/turn")
    public ResponseEntity<CurrentTurnDto> findTurn(@PathVariable("roomName") final String roomName) {
        final CurrentTurnDto currentTurn = roomService.findCurrentTurn(roomName);
        return ResponseEntity.ok(currentTurn);
    }

    @GetMapping("/{roomName}/result")
    public ResponseEntity<EndResult> findResult(@PathVariable("roomName") final String roomName) {
        final EndResult endResult = chessService.result(roomName);
        return ResponseEntity.ok(endResult);
    }
    ...
}
```

이전 보다 확실히 직관적인 구조로 변경되어 핸들러 메서드들의 역할을 뚜렷하게 확인할 수 있게 되었다.

## JdbcTemplate은 어디에?

Spring Boot의 자동 구성은 애플리케이션에 적용할 수 있는 여러 구성 클래스로 작동한다. 이런 모든 구성은 Spring 4.0의 조건부 구성 지원 기능을 이용하여 `런타임 시점`에 구성을 사용할지 여부를 결정한다.

아래는 `org.springframework.boot.autoconfigure.jdbc` 패키지에 위치한 `JdbcTemplateConfiguration` 클래스이다.

```java
package org.springframework.boot.autoconfigure.jdbc;

...

@Configuration(proxyBeanMethods = false)
@ConditionalOnMissingBean(JdbcOperations.class)
class JdbcTemplateConfiguration {

	@Bean
	@Primary
	JdbcTemplate jdbcTemplate(DataSource dataSource, JdbcProperties properties) {
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		JdbcProperties.Template template = properties.getTemplate();
		jdbcTemplate.setFetchSize(template.getFetchSize());
		jdbcTemplate.setMaxRows(template.getMaxRows());
		if (template.getQueryTimeout() != null) {
			jdbcTemplate.setQueryTimeout((int) template.getQueryTimeout().getSeconds());
		}
		return jdbcTemplate;
	}
}
```

`jdbcTemplate(DataSource dataSource, JdbcProperties properties)` 메서드는 `@Bean` 애너테이션 덕분에 `JdbcTemplate Bean`을 구성해준다. 하지만 주목해야 할 것은 `@ConditionalOnMissingBean(JdbcOperations.class)` 부분이다.

### @ConditionalOnMissingBean(JdbcOperations.class)

`@ConditionalOnMissingBean`은 속성으로 전달된 `JdbcOperations` 타임의 `Bean`이 없을 때만 동작한다. `JdbcTemplate`은 바로 `JdbcOperations`의 구현체이다.

```java
public class JdbcTemplate extends JdbcAccessor implements JdbcOperations {
    ...
}
```

만약 개발자가 명시적으로 `JdbcOperations` 타입의 Bean을 구성했다면 `@ConditionalOnMissingBean` 애너테이션의 조건에 만족하지 못하므로 해당 메서드는 사용되지 않는다. 

정리하면 나는 명시적으로 `JdbcTempalate`를 등록하지 않았다. 그렇기 때문에 `@ConditionalOnMissingBean` 애너테이션의 조건에 만족하여 `자동 구성에서 제공하는 JdbcTemplate를 Bean`으로 등록하여 사용하고 있는 것이다.

리뷰어에게 관련 답변을 확인할 수 있었다.

::: tip 리뷰 중 일부

`매트`: Spring은 기본적으로 좀 더 명시적인 것을 우선순위로 판단하여 Bean을 등록한다고 알고 있습니다! 제가 추가적인 `JdbcTemplate`을 `Bean`으로 등록하지 않아 기본적으로 등록된 `JdbcTemplate`을 사용한다고 판단했는데 이해한 바가 맞는지 질문드립니다!

`리뷰어`: 매트가 bean을 명시적으로 등록하지 않았기 때문에 spring-jdbc에 등록된 bean을 사용한 것입니다.
설정에 있는 `@ConditionalOnMissingBean(JdbcOperations.class)`어노테이션이 `JdbcOperation.class`의 Bean이 없는경우에 해당 설정을 사용한다는 의미입니다.

:::

## 도메인 객체와 엔티티 사이의 간극

DB를 도입하던 중 Entity라는 키워드를 알게 되었다. 

::: tip Entity란?

실제 DB 테이블과 매핑되는 핵심 클래스이다. 이를 기준으로 테이블이 생성되고 스키마가 변경된다. 또한 Entity는 id로 구분된다. 그리고 비즈니스 로직을 포함할 수 있다.

:::

이전 미션을 진행하며 도메인에서 DB에 대한 의존성을 가지는 것은 좋지 않다고 판단했다. 그렇기 때문에 위와 같이 이해한 Entity와 같은 성격을 가진 객체를 전혀 사용하지 않고 있었다. 결국 Entity는 비즈니스 로직을 포함하기 때문에 도메인에 강한 의존성을 가진다고 판단했다.

결국 이러한 고민을 진행한느 것은 도메인 객체와 DB 사이의 `패러다임의 차이`에서 오는 간극이라고 생각한다. 현재 구조에서 DB와 도메인 사이의 의존성을 최소화하며 간극을 줄일 수 있는 방법은 무엇이 있는지 궁금했다.

::: tip 리뷰 중 일부

`리뷰어`: 매트가 entity를 사용하지 않은 이유가 entity를 사용하면 domain이 entity로 대체될 거라고 생각했기 때문일까요??
설명에 entity가 비지니스 로직을 포함할 수 있다고 하지만 이 말이 `entity=domain`이라는 의미는 아니라고 생각합니다.
entity가 가진 데이터만으로 비지니스 로직이 진행될 수 있으면 바로 entity의 메서드를 사용할 수 있겠지만 여러 테이블의 데이터가 필요한 경우에는 entity를 가져온 이후에 entity를 domain으로 변환하여 비지니스 로직을 진행하도록 하거든요.
entity는 db table의 저장된 데이터를 객체로 변환하지만 하나의 table에 필요한 모든 데이터가 있지 않을 수 있으니까요.
개인적으로 entity를 db table의 데이터를 가지고 오기만 하고 이 entity를 domain으로 변환하여 로직이 진행되도록 통일해도 괜찮다고 생각합니다. 이 부분은 개발자의 선택일 테니까요 (아래의 의견은 이렇게 생각할 수 있다라는 개인적인 의견입니다.)

* 모든 비지니스 로직은 domain에 정의된 객체에서 진행되도록 정한다. 즉, entity를 가져온 후 domain으로 변환한다. (통일성)
* entity에서 자체적으로 비지니스 로직을 진행할 수 있다면 추가적으로 domain 객체를 만들지 않는다. (불필요한 객체 생성 자제)

:::

위와 같은 리뷰를 확인할 수 있었다. Entity가 유의미한 비즈니스 로직을 가지고 있다고 해도 domain과 같다고 판단하지 말아야 한다는 것이다. 중요한 것은 `통일성`이다. Entity를 조합하여 domain으로 변환하기로 결정했다면 해당 로직들을 비슷한 구성으로 통일해야 한다.

## References.

[3.1.3 자동 구성에 숨은 기능 엿보기](https://thebook.io/006859/ch03/01/03/)<br>
[DTO vs VO vs Entity](https://tecoble.techcourse.co.kr/post/2021-05-16-dto-vs-vo-vs-entity/)

<TagLinks />
