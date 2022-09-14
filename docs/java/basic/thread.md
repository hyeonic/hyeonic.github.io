---
title: Java Thread
tags: ['우아한테크코스', 'java', 'thread', 'runnable']
date: 2022-09-14 09:00:00
feed:
  enable: true
---

# Java Thread

자바에서 스레드란, 프로그램에서 실행되는 스레드를 말한다. JVM을 사용하면 응용 프로그램에서 여러 실행 스레드를 동시에 실행할 수 있다.

모든 스레드에는 우선 순위가 존재한다. 우선 순위가 높은 스레드는 우선 순위가 낮은 스레드보다 우선 실행된다. 각 스레드는 데몬으로 표시될 수도 있고 표시되지 않을 수도 있다. 
일부 스레드에서 실행되는 코드가 새 스레드 객체를 만들 때, 새 스레드는 처음에 생성 스레드의 우선 순위와 동일하게 설정되며, 생성 스레드가 데몬인 경우에만 데몬 스레드가 된다.

> **자바의 데몬 스레드**
> 
> 자바에서 데몬 스레드는 garbage collection과 같은 작업을 수행하기 위해 백그라운드에서 실행되는 우선 순위가 낮은 스레드이다. 자바에서 데몬 스레드는 유저 스레드에 서비스를 제공하는 서비스 공급자 스레드이디고 하다. 데몬 스레드의 수명은 사용자 스레드의 자비에 따라 달라진다. 모든 유저 스레드가 종료하면 JVM은 자동으로 이 스레드를 종료 시킨다. 간단히 정리하면 데몬 스레드는 백그라운드 지원 작업을 위해 사용자 스레드에 서비스를 제공하다고 할 수 있다. 데몬 스레드는 아래와 같이 생성이 가능하다.
> ```java
> thread.setDaemon(true);
> thread.start();
> ```

JVM이 시작되면 일반적으로 하나의 `non-daemon` 스레드 (일반적으로 지정된 클래스의 `main 메서드`를 호출)가 있다. 
JVM은 다음 중 하나가 발생할 때 까지 계속 스레드를 실행한다.

 * `Runtime` 클래스의 `exit()` 메서드가 호출되었으며 security manager가 종료 작업이 수행되도록 허용한다.
 * `run()` 메서드를 반환하거나 `run()` 메서드로 넘어 전파되는 예외를 발생시킴으로써 데몬 스레드가 아닌 모든 스레드가 종료된다.

## Thread

새로운 실행 스레드를 만드는 방법은 두 가지가 있다. 하나는 클래스를 `Thread`의 하위 클래스로 선언하는 것이다.
이 하위 클래스는 클래스 스레드의 `run()` 메서드를 `override` 해야 한다. 그 다음 하위 클래스의 인스턴스를 할당하고 시작할 수 있다.

```java
class ThreadTest {
    
    @Test
    void testExtendedThread() throws InterruptedException {
        Thread thread = new ExtendedThread("hello thread");

        thread.start();

        thread.join();
    }

    private static final class ExtendedThread extends Thread {

        private String message;

        public ExtendedThread(final String message) {
            this.message = message;
        }

        @Override
        public void run() {
            log.info(message);
        }
    }    
}
```

 * `new ExtendedThread("hello thread")`: Thread 클래스로 상속하고 스레드 객체를 생성한다.
 * `thread.start()`: 생성한 스레드 객체를 실행한다. Thread 객체의 `run()` 메서드가 실행된다.
 * `thread.join()`: 스레드 작업이 완료될 때 까지 기다린다.

```shell
11:28:47.963 [Thread-0] INFO concurrency.stage0.ThreadTest - hello thread
```

## Runnable

스레드를 만드는 또 다른 방법은 `Runnable` 인터페이스를 구현하는 클래스를 선언하는 것이다. 그 다음 해당 클래스는 `run()` 메서드를 구현한다. 
그 다음 클래스의 인스턴스를 할당하고 스레드를 만들 때 인수로 전달한 뒤 시작할 수 있다.

```java
class ThreadTest {

    @Test
    void testRunnableThread() throws InterruptedException {
        Thread thread = new Thread(new RunnableThread("hello thread"));

        thread.start();

        thread.join();
    }
    
    private static final class RunnableThread implements Runnable {

        private String message;

        public RunnableThread(final String message) {
            this.message = message;
        }

        @Override
        public void run() {
            log.info(message);
        }
    }
}
```

 * `new Thread(new RunnableThread("hello thread"))`: `Runnable` 인터페이스의 구현체를 만들고 Thread 클래스를 활용하여 스레드 객체를 생성한다.

## References.

[Daemon Thread in Java](https://www.geeksforgeeks.org/daemon-thread-java/)<br>
[jwp-hands-on repository](https://github.com/woowacourse/jwp-hands-on)

<TagLinks />
