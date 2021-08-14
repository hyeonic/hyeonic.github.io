# mac에서 실행중인 포트를 죽이는 방법

로컬 서버에서 스프링 부트를 활용하여 작업 중에 비정상적으로 종료되어 8080 포트를 점유하는 경우가 생기게 되었다.

## PID 조회하기

우선 포트 번호를 활용항 PID(Process ID)를 조회한다.

```
$ sudo lsof -i :8080
```

`:`뒤에 원하는 포트 번호를 입력하면 해당 포트에 실행 중인 프로세스의 정보가 출력된다.

```
COMMAND   PID    USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
java    29620 hyeonic   82u  IPv6 0x3669400aa808a88d      0t0  TCP *:http-alt (LISTEN)
```

없다면 아무것도 출력되지 않을 것이다.

참고로 lsof는 List Open Files의 준말이다.

## 프로세스 종료하기

이제 획득한 PID를 활용하여 프로세스를 종료 시킨다.

```
$ sudo kill -9 29620
```

다시 조회하면 아무것도 출력하지 않는다!