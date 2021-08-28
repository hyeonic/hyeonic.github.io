## Spring Security + JWT

Spring boot + Security + JWT를 활용하여 회원가입/로그인 로직 및 권한 체크 기능을 구현하였다. 추가적인 기능은 구현하지 않고 오로지 user 도메인을 활용하여 회원가입과 로그인, 토큰 발급을 진행한다.

(Spring Boot JWT Tutorial)[https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8-jwt/dashboard]

전반적인 로직과 코드는 위 강의를 참고하였고, 필요에 따라 수정하여 재반영 하였다.

---

## Spring Security

Spring 기반의 애플리케이션의 보안(인증과 권한, 인가 등)을 담당하는 스프링 하위 프레임워크. Spring Security는 '인증'과 '권한'에 대한 부분을 Filter의 흐름에 따라 처리한다. Filter이기 때문에 Dispatcher Servclet으로 가기 전에 적용 된다.

<!-- 기존에 작성한 간단정리 링크 -->

Spring Security는 별다른 설정이 없으면 세션 기반 인증으로 동작한다. 해당 예제에서는 JWT를 활용하여 인증과 인가를 진행한다.

---

## 프로젝트 생성

**build.gradle**

```groovy
plugins {
    id 'org.springframework.boot' version '2.5.3'
    id 'io.spring.dependency-management' version '1.0.11.RELEASE'
    id 'java'
}

group = 'me.hyeonic'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '11'

configurations {
    compileOnly {
        extendsFrom annotationProcessor
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'org.springframework.boot:spring-boot-starter-security'
    implementation 'org.springframework.boot:spring-boot-starter-validation'
    implementation 'org.springframework.boot:spring-boot-starter-web'
    compileOnly 'org.projectlombok:lombok'
    runtimeOnly 'com.h2database:h2'
    annotationProcessor 'org.projectlombok:lombok'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
    testImplementation 'org.springframework.security:spring-security-test'

    implementation group: 'io.jsonwebtoken', name: 'jjwt-api', version: '0.11.2'
    runtimeOnly group: 'io.jsonwebtoken', name: 'jjwt-impl', version: '0.11.2'
    runtimeOnly group: 'io.jsonwebtoken', name: 'jjwt-jackson', version: '0.11.2'
}

test {
    useJUnitPlatform()
}
```

**application.yml**

```yml
spring:
  profiles:
    active: local

    group:
      local:
        - db
        - jwt

logging:
  level:
    me.hyeonic: DEBUG
```

각 역할에 맞춰 설정을 분리하였다.

**application-db.yml**
```yml
spring:
  h2:
    console:
      enabled: true

  datasource:
    hikari:
      jdbc-url: jdbc:h2:mem:testdb;MODE=MYSQL
      username: sa

  jpa:
    hibernate:
      ddl-auto: create
    properties:
      hibernate:
        show_sql: false
        format_sql: true
        dialect: org.hibernate.dialect.MySQL57Dialect
        storage_engine: innodb

    defer-datasource-initialization: true
```

DB에 대한 설정을 모아두었다. Spring boot 2.5.x 버전 이후 부터는 프로젝트 실행 시 data.sql로 데이터를 초기화 시키기 위해서는 `spring.jpa.defer-datasource-initialization=true`로 설정해주어야 한다.

**application-jwt.yml**
```yml
jwt:
  header: Authorization
  secret: bWUtaHllb25pYy1teS1wbGktbWUtaHllb25pYy1teS1wbGktbWUtaHllb25pYy1teS1wbGktbWUtaHllb25pYy1teS1wbGk=
  token-validity-in-seconds: 1800
```

JWT에 대한 설정을 모아두었다. 후에 `@Value`를 통하여 주입받아 해당 값들을 사용할 예정이다.

* `header`:
* `secret`: jwt를 암호화할 때 사용하는 시크릿 키로 사용된다.
* `token-validity-in-seconds`: token의 유효 시간을 기재한다. 1800초는 30분을 의미한다.

각각의 설정 파일을 분리한 이유는 `jwt.secret`같은 경우 JWT를 생성하는데 매우 중요한 정보이기 때문에 해당 정보가 public하게 노출되면 안된다. 후에 `.gitignore`로 해당 파일을 공유하지 않고 프로젝트를 웹 서버에 배포할 때 외부에서 주입하여 정보 유출을 막을 수 있다.

---

## User

유저 엔티티이다. 유저가 로그인을 진행할 때 사용하는 id인 email과 password, 이름을 나타내는 name, 마지막으로 권한을 나타내는 role로 구성되어 있다.


**user.java**

```java
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(unique = true)
    private String email;

    private String password;

    private String name;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Builder
    public User(String email, String password, String name, Role role) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.role = role;
    }
}
```

**Role.java**

```java
public enum Role {

    ROLE_USER,
    ROLE_ADMIN
}
```

다음은 User를 DB 데이터에 접근할 수 있도록 repository를 구성한다. Spring Data JPA의 JpaRepository를 상속받아 간단하게 구현하였다.

**UserRepository.java**

```java
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
}
```

email 정보를 활용하여 조회하는 메소드만 추가로 기재하였다.

User의 주요 로직이 담기는 UserService이다.

**UserService.java**

```java
@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public UserMainResponseDto signup(UserSaveRequestDto requestDto) {
        if (userRepository.findByEmail(requestDto.getEmail()).orElse(null) != null) {
            throw new RuntimeException("이미 가입된 유저입니다.");
        }

        User user = User.builder()
                .email(requestDto.getEmail())
                .password(passwordEncoder.encode(requestDto.getPassword()))
                .name(requestDto.getName())
                .role(Role.ROLE_USER)
                .build();

        userRepository.save(user);

        return new UserMainResponseDto(user);
    }

    public UserMainResponseDto findById(Long id) {
        return userRepository.findById(id)
                .map(user -> new UserMainResponseDto(user))
                .orElseThrow(() -> new RuntimeException("존재하지 않는 user 입니다. id=" + id));
    }

    public UserMainResponseDto findUserInfo() {
        String email = SecurityUtil.getCurrentEmail().orElseThrow(() ->
                new RuntimeException("Security Context에 인증 정보가 없습니다."));

        return userRepository.findByEmail(email)
                .map(user -> new UserMainResponseDto(user))
                .orElseThrow(() -> new RuntimeException("존재하지 않는 user 입니다. email=" + email));
    }
}
```

* `signup`: login 시도한 email과 password가 담긴 `UserSaveRequestDto`를 매개변수로 받는다. 전달받은 email을 조회하여 가입되지 않은 유저이면 해당 정보를 기반으로 가입을 진행한다.
* `findById`: 전달받은 user id를 활용하여 조회한다. 조회되는 user가 없다면 예외를 던진다.
* `findUserInfo`: 후에 작성할 `SecurityUtil.getCurrentUserId()`에서 `SecurityContext`안에 담긴 user id 정보를 가져온다. 해당 id를 기반으로 조회하여 반환한다. 여기서 `user id`는 위에서 작성한 `User Entity의 id`에 해당한다.

**UserApiController.java**

```java
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserApiController {

    private final UserService userService;

    @PostMapping("signup")
    public ResponseEntity<? extends BasicResponse> signup(@Valid @RequestBody UserSaveRequestDto requestDto) {
        return ResponseEntity.ok(new CommonResponse<>(userService.signup(requestDto)));
    }

    @GetMapping("users/info")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<? extends BasicResponse> getMyInfo() {
        return ResponseEntity.ok(new CommonResponse<>(userService.findUserInfo()));
    }

    @GetMapping("/users/{userId}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<? extends BasicResponse> getUserInfo(@PathVariable Long userId) {
        return ResponseEntity.ok(new CommonResponse<>(userService.findById(userId)));
    }
}
```
UserService를 주입받아 사용하는 UserController이다. 회원가입과 user에 대한 정보 요청은 해당 Controller 에서 담당한다.

* `signup`: 입력받은 requestDto를 검증하여 service에 전달한다.
* `getMyInfo`: `@PreAuthorize`을 사용하여 Role이 `ROLE_USER`, `ROLE_ADMIN`인 user만 허용한다.
* `getUserInfo`: 위와 동일하다. 하지만 오직 `ROLE_ADMIN`만 허용한다.

---

## JWT 설정

**TokenProvider.java**

```java
@Slf4j
@Component
public class TokenProvider implements InitializingBean {

    private static final String AUTHORITIES_KEY = "auth";

    private final String secret;
    private final long tokenValidityInMilliseconds;

    private Key key;

    public TokenProvider(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.token-validity-in-seconds}") long tokenValidityInSeconds) {
        this.secret = secret;
        this.tokenValidityInMilliseconds = tokenValidityInSeconds * 1000;
    }


    // 빈이 생성이 되고 의존성 주입이 되고 난 후에 주입받은 secret 값을 Base64 Decode 해서 key 변수에 할당
    @Override
    public void afterPropertiesSet() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    // Authentication 객체의 권한정보를 이용해서 토큰을 생성하는 createToken 메소드 추가
    public String createToken(Authentication authentication) {
        // 권한들
        String authorities = authentication.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        long now = (new Date()).getTime();
        Date validity = new Date(now + this.tokenValidityInMilliseconds);

        return Jwts.builder()
                .setSubject(authentication.getName())
                .claim(AUTHORITIES_KEY, authorities)
                .signWith(key, SignatureAlgorithm.HS512)
                .setExpiration(validity)
                .compact();
    }

    // token에 담겨있는 정보를 이용해 Authentication 객체를 리턴하는 메소드 생성
    public Authentication getAuthentication(String token) {
        // token을 활용하여 Claims 생성
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        List<SimpleGrantedAuthority> authorities = Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        // claims과 authorities 정보를 활용해 User (org.springframework.security.core.userdetails.User) 객체 생성
        User principal = new User(claims.getSubject(), "", authorities);

        // Authentication 객체를 리턴
        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

    // 토큰의 유효성 검증을 수행하는 validateToken 메소드 추가
    public boolean validateToken(String token) {
        try {
            // 토큰을 파싱해보고 발생하는 exception들을 캐치, 문제가 생기면 false, 정상이면 true를 return
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
            log.info("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            log.info("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            log.info("JWT 토큰이 잘못되었습니다.");
        }
        return false;
    }
}
```

* `@Component`: 스프링 빈으로 등록한다.
* `TokenProvider(@Value("${jwt.secret}") String secret, ... )`: `application-jwt.yml`에 명시한 정보를 주입받아 생성하는 생성자이다.
* `void afterPropertiesSet()`: `InitializingBean`을 구현하여 overrie하였다. 빈이 생성이 되고 의존성 주입이 되고 난 후에 주입받은 secret 값을 Base64 Decode 해서 key 변수에 할당하기 위해 사용하였다.
* `String createToken(Authentication authentication)`: `Authentication` 객체의 권한정보를 이용해서 토큰을 생성하여 반환해준다. 단순히 AccessToken만 반환한다.
* `Authentication getAuthentication(String token)`: token에 담겨있는 정보를 이용해 `Authentication` 객체를 반환한다.
* `boolean validateToken(String token)`: 유효한 token인지 검증하는 메소드이다.

**JwtFilter.java**

```java
@Slf4j
@Component
@RequiredArgsConstructor
public class JwtFilter implements Filter {

    public static final String AUTHORIZATION_HEADER = "Authorization";

    private final TokenProvider tokenProvider;

    // 실제 필터링 로직은 doFilter 내부에 작성 jwt 토큰의 인증 정보를 SecurityContext에 저장하는 역할
    @Override
    public void doFilter(ServletRequest request,
                         ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {

        HttpServletRequest httpServletRequest = (HttpServletRequest) request;

        // request에서 jwt 토큰 정보 추출
        String jwt = resolveToken(httpServletRequest);
        String requestURI = httpServletRequest.getRequestURI();

        // token 유효성 검증에 통과하면
        if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
            Authentication authentication = tokenProvider.getAuthentication(jwt); // 정상 토큰이면 SecurityContext 저장
            SecurityContextHolder.getContext().setAuthentication(authentication);
            log.debug("Security Context에 '{}' 인증 정보를 저장했습니다, uri: {}", authentication.getName(), requestURI);
        } else {
            log.debug("유효한 JWT 토큰이 없습니다, uri: {}", requestURI);
        }

        chain.doFilter(request, response);
    }

    // request header에서 토큰 정보를 꺼내오는 메소드
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}

```

`Filter` 인터페이스를 구현한 `JwtFilter`이다. 

* `void doFilter(...)`: `HttpServletRequest`에서 `JWT` 정보를 추출하여 앞서 생성한 검증 메소드를 통해 검증한다. 통과하면 `SecurityContext`에 해당 정보를 가진 `Autentication` 객체를 저장한다.
* `String resolveToken(...)`: `request header`에서 토큰 정보를 꺼내온다.

**JwtsSecurityConfig.java**

```java
// JwtFilter를 SecurityConfig에 적용할 때 사용할 JwtSecurityConfig
@Component
@RequiredArgsConstructor
public class JwtSecurityConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {

    private final JwtFilter jwtFilter;

    // JwtFilter를 Security로직에 필터를 등록
    @Override
    public void configure(HttpSecurity http) {
        // Security 로직에 필터를 등록
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
```

`SecurityConfigurer<DefualtSecurityFilterChain, HttpSecurity>` 인터페이스를 구현한 `JwtSecurityConfig`이다. `JwtFilter`를 Security 로직에 등록한다.

`Spring Security`는 각각 역할에 맞는 필터들이 체인 형태로 구성되어 순서에 맞게 실행된다. 특정한 필터를 생성하여 등록하기 위해서는 `addFilterBefore`을 활용하여 사용한다.

**JwtAuthenticationEntryPoint.java**

```java
// 유효한 자격증명을 제공하지 않고 접근하려 할 때 401 Unauthorized 에러를 리턴
@Slf4j
@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException) throws IOException {

        // 유효한 자격증명을 제공하지 않고 접근하려 할 때 401
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
    }
}
```

유효한 자격증명을 제공하지 않고 접근하려 할 때 `401` 상태 코드를 전달한다.

**JwtAccessDeniedHandler.java**

```java
// 필요한 권한이 존재하지 않는 경우 403 Forbidden 에러를 리턴
@Component
public class JwtAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request,
                       HttpServletResponse response,
                       AccessDeniedException accessDeniedException) throws IOException {

        // 필요한 권한이 없이 접근하려 할 때 403
        response.sendError(HttpServletResponse.SC_FORBIDDEN);
    }
}
```

필요한 권한이 없이 접근하려 할 때 `403` 상태 코드를 전달한다.

---

## Security 설정

**SecurityConfig.java**

```java
@EnableWebSecurity // 웹 보안 활성화
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    private final JwtSecurityConfig jwtSecurityConfig;

    // password encoder
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(WebSecurity web) {
        web
                .ignoring()
                .antMatchers(
                        "/h2-console/**",
                        "/favicon.ico"
                );
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                // token을 사용하는 방식이기 때문에 csrf를 disable
                .csrf().disable()

                // Exception을 핸들링할 때 직접 만든 클래스를 추가
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)

                // enable h2-console
                .and()
                .headers()
                .frameOptions()
                .sameOrigin()

                // 세션을 사용하지 않기 때문에 STATELESS로 설정
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                .and()
                .authorizeRequests() // HttpServletRequest를 사용하는 요청들에 대한 접근제한을 설정
                .antMatchers("/api/authenticate").permitAll()
                .antMatchers("/api/signup").permitAll()

                .anyRequest().authenticated() // 나머지는 인증 필요

                // JwtSecurityConfig 클래스 적용
                .and()
                .apply(jwtSecurityConfig);
    }
}
```

`WebSecurityConfigurerAdapter` 인터페이스를 구현한 구현체이다. Spring Security에 필요한 설정들을 적절히 추가한다.

* `@EnableWebSecurity`: 웹 보안을 활성화 한다.
* `@EnableGlobalMethodSecurity`: @PreAuthorize, @PostAuthorize 애노테이션을 사용하기 위해 추가
* `passwordEncoder`: password encoder

**SecurityUtil.java**

```java
@Slf4j
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class SecurityUtil {

    public static Optional<String> getCurrentEmail() {
        // Security Context에 Authentication 객체가 저장되는 시점은
        // JwtFilter의 doFilter메소드에서 Request가 들어올 때 SecurityContext에 Authentication 객체를 저장해서 사용
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null) {
            log.debug("Security Context에 인증 정보가 없습니다.");
            return Optional.empty();
        }

        String username = null;
        if (authentication.getPrincipal() instanceof UserDetails) {
            UserDetails springSecurityUser = (UserDetails) authentication.getPrincipal();
            username = springSecurityUser.getUsername();
        } else if (authentication.getPrincipal() instanceof String) {
            username = (String) authentication.getPrincipal();
        }

        return Optional.ofNullable(username);
    }
}
```

`SecurityContext`에 `Authentication` 객체가 저장되는 시점은 `JwtFilter`의 `doFilter`메소드가 실행될 때이다. `SecurityContext`에서 `Authentication` 객체를 get 한다.

그렇게 얻은 `authentication` 객체가 정상적인 값이 들어 있다면 username을 꺼내와 반환한다. 

---

## 사용자 인증

이제 위 설정을 기반으로 사용자 인증 처리 후 token 발급 과정이다.

**AuthController.java**

```java
@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("authenticate")
    public ResponseEntity<TokenResponseDto> authorize(@Valid @RequestBody UserLoginDto loginDto) {

        TokenResponseDto tokenResponseDto = authService.login(loginDto);

        // 1. Response Header에 token 값을 넣어준다.
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + tokenResponseDto.getToken());

        // 2. Response Body에 token 값을 넣어준다.
        return new ResponseEntity<>(tokenResponseDto, httpHeaders, HttpStatus.OK);
    }
}
```

사용자가 로그인을 시도하면 `/api/authenticate`로 user login 정보와 함께 요청된다. 실질적인 login 처리는 `AuthService`에서 이루어진다.

**AuthService.java**

```java
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AuthService {

    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    public TokenResponseDto login(UserLoginDto loginDto) {

        // username, password를 파라미터로 받고 이를 이용해 UsernamePasswordAuthenticationToken을 생성
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());

        // authenticationToken을 이용해서 Authenticaiton 객체를 생성하려고 authenticate 메소드가 실행될 때
        // CustomUserDetailsService에서 override한 loadUserByUsername 메소드가 실행된다.
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // authentication 을 기준으로 jwt token 생성
        String jwt = tokenProvider.createToken(authentication);

        return new TokenResponseDto(jwt);
    }
}
```

사용자가 입력한 login 정보를 기반으로 `UsernamePasswordAuthenticationToken` 객체를 생성한다. 아직 인증이 완료되지 않은 객체이기 때문에 `authenticationManagerBuilder`를 활용하여 `AuthenticationManager`의 구현체인 `ProviderManger`의 `authenticate` 메소드를 실행하여 검증 후 Authenication 객체를 받는다.

해당 정보를 기준으로 JWT를 생성하여 반환해준다.

**CustomUserDetailsService.java**

```java
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    // DB에서 유저정보를 가져온다.
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username)
                .map(user -> createUserDetails(user))
                .orElseThrow(() -> new UsernameNotFoundException(username + " 존재하지 않는 username 입니다."));
    }

    // DB에서 조회한 user 정보를 기반으로 UserDetails의 구현체인
    // User (org.springframework.security.core.userdetails.User) 를 생성하여 return 한다.
    private UserDetails createUserDetails(User user) {
        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(user.getRole().toString());

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                Collections.singleton(grantedAuthority)
        );
    }
}
```

`UserDetailsService` 인터페이스를 구현한 클래스이다. 위에서 언급한 `authticate`메소드가 실행될 때 `loadUserByUsername`을 통하여 DB정보를 가져온 후 사용자의 PW가 일치하는지 검증한다. `UserDetails` 객체를 반환하기 위해 `createUserDetails` 메소드에서 `User entity`의 정보를 기반으로 `org.springframework.security.core.userdetails.User`를 `생성`하여 반환한다.
