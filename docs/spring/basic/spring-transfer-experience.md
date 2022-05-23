---
title: Spring으로 전환 후 우리가 느낀 이점들
tags: ['우아한테크코스', 'spring']
date: 2022-05-24 00:00:00
feed:
  enable: true
---

# Spring으로 전환 후 우리가 느낀 이점들

<CenterImage image-src=https://user-images.githubusercontent.com/59357153/152970395-a31c8134-fc89-449f-b4dc-441e03df929c.png />

## 개요

미션을 진행하기 이전에 Spring을 사용할 때는 이점들과 어떤 부분에서 객체지향적인 코드를 작성하도록 도와주는지 집중하지 않은 채 단순히 사용하기 급급했다. 나는 단순히 Spring을 사용함으로 이루고자 하는 것들을 무시한 채 기능 개발에 급급하여 공부를 해왔던 것이다.

이번 `지하철역/노선 관리 기능 미션`을 진행하던 중 아래와 같은 제약 사항을 확인할 수 있었다.

::: warning 프로그래밍 제약 사항

`@Service`, `@Component` 등의 어노테이션을 사용해 스프링 빈으로 지정하지 않기
 * 스프링 컨테이너 사용 전/후의 차이를 명확히 경험하기 위해 스프링 빈 사용을 금지
(API 요청을 받기위한 필수 컴포넌트를 제외 ex. `@Controller`)
 * 스프링 빈을 사용하지 않고 Service, Dao 객체를 직접 생성하고 의존 관계를 맺어주기

:::

이러한 제약 사항을 기반으로 Spring이 주는 다양한 이점들과 사용함으로 얻을 수 있는 객체지향원리에 대해 알아보려 한다.

## 의존성

의존성을 간단히 정리하면 변경에 의해 영향을 받는 것이다. 예시로 A가 B를 의존할 때 B의 변경으로 인해 B를 의존하고 있는 A가 변경될 우려가 있다는 것이다.

아래는 Spring을 사용하지 않고 작성한 지하철역에 대한 API 요청 처리를 위한 `Controller`의 일부이다.

```java
@RestController
@RequestMapping("/stations")
public class StationController {

    private final StationService stationService;

    public StationController() {
        this.stationService = new StationService();
    }

    @PostMapping
    public ResponseEntity<StationResponse> createStation(@RequestBody StationRequest stationRequest) {
        StationResponse stationResponse = stationService.save(stationRequest);
        return ResponseEntity.created(URI.create("/stations/" + stationResponse.getId())).body(stationResponse);
    }

    @GetMapping
    public ResponseEntity<List<StationResponse>> showStations() {
        List<StationResponse> stationResponses = stationService.findAll();
        return ResponseEntity.ok(stationResponses);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteStation(@PathVariable Long id) {
        stationService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

```

언뜻 보기에 동작하는데 큰 문제는 없어 보이지만 우리가 집중해야 할 것은 바로 `StationService`이다. Spring이 제공하는 `의존성 주입(DI)`를 사용할 수 없기 때문에 Controller 생성자를 통해 `직접 생성`하여 반영하고 있다.

```java
public class StationService {

    private final InMemoryStationDao inMemoryStationDao;

    public StationService() {
        this.inMemoryStationDao = new InMemoryStationDao();
    }

    public StationResponse save(StationRequest stationRequest) {
        Station newStation = inMemoryStationDao.save(new Station(stationRequest.getName()));
        return new StationResponse(newStation);
    }

    public List<StationResponse> findAll() {
        List<Station> stations = inMemoryStationDao.findAll();

        return stations.stream()
                .map(StationResponse::new)
                .collect(toList());
    }

    public void deleteById(Long id) {
        statinMemoryStationDaoionDao.deleteById(id);
    }
}
```

물론 Service가 사용하고 있는 Dao조차도 생성자를 통해 StationDao 인터페이스의 구현체인 InMemoryStationDao에 직접적으로 `의존`하고 있다.

```java
public class InMemoryStationDao implements StationDao {

    private static Long seq = 0L;
    private static Map<Long, Station> stations = new HashMap<>();

    public Station save(Station station) {
        Station persistStation = createNewObject(station);
        stations.put(station.getId(), persistStation);
        return persistStation;
    }

    public List<Station> findAll() {
        return new ArrayList<>(stations.values());
    }

    public void deleteById(Long id) {
        if (!stations.containsKey(id)) {
            throw new NoSuchElementException(id + "의 지하철역은 존재하지 않습니다.");
        }

        stations.remove(id);
    }

    private Station createNewObject(Station station) {
        Field field = ReflectionUtils.findField(Station.class, "id");
        field.setAccessible(true);
        ReflectionUtils.setField(field, station, ++seq);
        return station;
    }
}
```

지금 당장 로직을 처리하는 것은 큰 문제가 없을 것이다. 하지만 만약 Dao에서 사용하고 있는 DB의 종류가 바뀌어 변경해야 한다고 가정해보자.

## 정해진 의존성

현재 인메모리를 통해 Dao를 구성하고 있었다. 요구사항으로 MySql을 활용하여 데이터에 접근을 추가해야 한다고 가정하면 앞서 작성한 InMemoryStationDao를 MySql을 위한 추가적인 Dao를 작성하여 교체해야 한다. 그렇다면 현재 Dao를 의존하고 있는 Service는 어떻게 되는 것인가?

```java
public class StationService {

    private final InMemoryStationDao inMemoryStationDao;

    public StationService() {
        // 컴파일 시점에 정해진 의존성
        this.inMemoryStationDao = new InMemoryStationDao();
    }

    public StationResponse save(StationRequest stationRequest) {
        Station newStation = inMemoryStationDao.save(new Station(stationRequest.getName()));
        return new StationResponse(newStation);
    }
    ...
}
```

이전에 작성한 `inMemoryStationDao`의 경우 `InMemoryStationDao의 인스턴스`를 참조하고 있다. `new 키워드`를 통해 인스턴스를 생성하고 있기 때문에 컴파일 시점에 강한 의존성을 가지게 된다. 즉 이것은 변경에 매우 취약한 구조를 야기한다.

앞서 언급한 것처럼 추가된 요구사항으로 인해 Dao를 교체하기 위해서는 StationService를 아래와 같이 직접 수정하여 반영해야 한다.

```java
public class StationService {

    private final JdbcStationDao jdbcStationDao;

    public StationService() {
        // 직접 변경
        this.jdbcStationDao = new JdbcStationDao();
    }
    ...
}
```

단순히 내부 소스 코드를 고치는 행위로 쉽게 변경이 가능했다. 하지만 여기에는 큰 문제점이 있었는데 위와 같은 방식의 변경은 SOLID 원칙 중 `OCP`와 `DIP`를 모두 위반하는 것이다.

## OCP 위반

`OCP`는 `open/closed principle`의 준말로 확장에는 열려 있고 변경에는 닫혀있어야 한다는 것이다. 이러한 OCP는 인터페이스를 활용한 `다형성`을 통해 손쉽게 달성할 수 있다. 

```java
public class StationService {

    private final StationDao stationDao;

    public StationService() {
        // 그래도 여전히 직접 수정
        this.stationDao = new JdbcStationDao();
    }
    ...
}
```

하지만 아직도 StationService 내부 구현 코드를 수정해야 하는 것은 여전하다. 

## DIP 위반

`DIP`는 `Dependency inversion principle`의 준말로 구현 클래스에 의존하지 말고 인터페이스에 의존하라는 의미이다. 나는 OCP를 지키기 위해 다형성을 활용하여 참조 변수의 타입을 StationDao 인터페이스로 변경하였다. 하지만 그럼에도 불구하고 `new JdbcStationDao()`를 통해 여전히 구현체에 의존하고 있는 것을 볼 수 있다.


```java
public class StationService {

    // 인터페이스와 구현체를 동시에 의존
    private final StationDao stationDao;

    public StationService() {
        // 인터페이스와 구현체를 동시에 의존
        this.stationDao = new JdbcStationDao();
    }
    ...
}
```

::: tip 인터페이스에 의존해야 하는 이유

인터페이스는 일종의 `역할`에 가깝다. 우리는 특정 객체의 역할만 알면 된다. 객체가 역할을 수행하기 위한 세부 사항까지는 알 필요가 없다. 구현체들은 객체의 역할 수행의 세부 사항과 같다. 특정 객체가 역할에만 의존하고 있으면 손쉽게 구현체를 변경하며 유연하게 사용할 수 있게 된다.

:::

## 문제 해결

결국 이러한 구현체의 의존성을 제거하기 위해서는 아래와 같이 외부에서 주입 받는 형태를 사용해야 한다.

```java
public class StationService {

    private final StationDao stationDao;

    public StationService(StationDao stationDao) {
        this.stationDao = stationDao;
    }
    ...
}
```

생성자를 통한 주입을 진행하면 구현체에 의존하지 않고 적절히 객체를 생성할 수 있다. 이것은 생성자 주입을 통해 확장에는 열려 있고 변경에는 닫혀 있는 `OCP`를 만족하게 되었다. 또한 구현체에 의존하지 않고 인터페이스에 의존하고 있기 때문에 `DIP` 또한 만족한다. 하지만 한 가지 문제가 남아있다. `StationService`는 어디서 생성하며 `StationDao에 대한 구현체`는 어디서 `주입`되야 하는 것인가?

## 객체 생성의 책임

여기서 객체 생성을 위한 책임을 가진 객체를 생성한다. 

```java
public class AppConfig {

    public StationService stationService() {
        return new StationService(stationDao());
    }

    public StationDao stationDao() {
        return new JdbcStationDao();
    }
}
```

`AppConfig`는 전적으로 객체의 생성과 의존성에 대한 역할만을 가지고 있다. 해당 객체를 사용하는 `StationService`는 생성자를 통해서 실질적인 구현체가 주입되기 때문에 내부에서는 구현체의 존재를 전혀 알 필요가 없어진다. 여기서 주목해야 할 것은 바로 `주입`이다. Spring은 이러한 `의존성 주입(DI)`을 통해 객체의 생성과 의존성을 관리한다. 마치 AppConfig를 통해 외부에서 주입하는 형태와 비슷하기 때문에 이러한 명칭이 붙게 되었다.

기존에 직접 수정하여 구현체를 변경하던 것들이 AppConfig의 등장으로 외부에서 관리할 수 있게 되었다. 이렇게 제어를 위한 흐름이 외부에서 관리되는 것을 `제어의 역전(IoC)`라고 한다. AppConfig 처럼 객체를 생성하고 의존성을 관리하기 위한 객체를 `IoC 컨테이너` 혹은 `DI 컨테이너`라고 부른다. Spring에서는 이러한 것들을 간단한 애노테이션 설정을 통해 대부분 자동으로 관리해준다.

## Spring 전환

위 장황한 설명과 코드들은 Spring에서 Bean 등록을 위한 간단한 애노테이션 작성으로 달성할 수 있다.

```java
@Service
public class StationService {

    private final StationDao stationDao;

    public StationService(StationDao stationDao) {
        this.stationDao = stationDao;
    }
    ...
}
```

```java
@Repository
public class JdbcStationDao implements StationDao {
    ...
}
```

위와 같이 특정 애노테이션이 붙은 객체들을 `Spring 컨테이너`에 등록한다. 이렇게 등록된 객체들을 `Spring Bean`이라고 부른다. 등록된 Bean들은 `DI`를 통해 자동으로 주입되어 사용할 수 있다. 결국 구현 코드들은 구현체에 의존하지 않고 인터페이스에 의존하기 때문에 `OCP`와 `DIP`를 적절히 지킬 수 있으며 보다 더 객체지향에 가깝게 코드를 작성할 수 있게 되었다. 

## 정리

Spring은 상당 부분 위와 같은 과정들을 자동으로 설정해준다. 그렇기 때문에 이것을 사용하는 클라이언트는 객체 지향 설계에 더욱 집중할 수 있으며 마치 레고를 조립하듯 쉽게 부품을 교체하며 개발을 진행할 수 있다.

<TagLinks />
