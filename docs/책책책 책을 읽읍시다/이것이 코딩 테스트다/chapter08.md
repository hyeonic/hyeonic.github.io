---
title: Chapter08 다이나믹 프로그래밍
tags: ['이것이 코딩 테스트다', '다이나믹 프로그래밍']
---

# CHAPTER 08 다이나믹 프로그래밍

## 중복되는 연산을 줄이자

컴퓨터는 연산 속도에 한계가 있고, 메모리 공간을 사용할 수 있는 데이터의 개수도 한정적이라는 점이 많은 제약을 발생시킨다.
어떤 문제는 메모리 공간을 약간 더 사용하면 연산 속도를 비약적으로 증가시킬 수 있다. 
대표적인 방법이 바로 `다이나믹 프로그래밍`<sup>Dynamic Programing</sup>이다.

프로그래밍에서는 이러한 수열을 `배열`이나 `리스트`로 표현할 수 있다. 

수학적 점화식을 프로그래밍으로 표현
```java
public class Example8_1 {

    private static int fibonacci(int x) {
        if (x == 1 || x == 2) {
            return 1;
        }

        return fibonacci(x - 1) + fibonacci(x - 2);
    }

    public static void main(String[] args) {
        System.out.println(fibonacci(4));
    }
}
```

피보나치 수열을 위와 같이 재귀로 구현하면 심각한 문제가 생긴다. f(n) 함수에서 n이 커질수록 수행 시간이 기하급수적으로 늘어난다. 
피보나치 수열의 시간 복잡도는 대략 `O(2<sup>N</sup>)` 의 지수 시간이 소요된다.

이러한 문제는 `다이나믹 프로그래밍`을 사용하여 효율적으로 해결 가능하다. 하지만 다음 조건이 만족해야 한다.

1. `큰 문제`를 `작은 문제`로 나눌 수 있다.
2. `작은 문제`에서 구한 `정답`은 그것을 포함하는 `큰 문제`에서도 `동일`하다.

위에서 재귀로 구현한 피보나치 수열을 `메모이제이션`<sup>Memoization</sup> 기법으로 해결

> 메모이제이션 이란? <br>
> 다이나믹 프로그래밍을 구현하는 방법 중 한 종류로, 한 번 구한 결과를 메모리 공간에 메모해두고 같은 식을 다시  호출하면 메모한 결과를 그대로 가져오는 기법이다.
> 값을 저장하는 방법이므로 캐싱<sup>Caching</sup> 이라고도 한다.

```java
public class Example8_2 {

    // 한 번 계산된 결과를 메모이제이션하기 위한 배열 초기화
    static long[] dp = new long[100];

    // 피보나치 함수 재귀로 구현 (탑다운 다이나믹 프로그래밍)
    private static long fibonacci(int x) {

        // 종료 조건(1 혹은 2일 때 1을 반환)
        if (x == 1 || x == 2) {
            return 1;
        }

        // 이미 계산한 적이 있는 문제라면 그대로 반환
        if (dp[x] != 0) {
            return dp[x];
        }

        // 아직 계산하지 않은 문제라면 점화식에 따라서 피보나치 결과 반환
        dp[x] = fibonacci(x - 1) + fibonacci(x - 2);
        return dp[x];
    }

    public static void main(String[] args) {
        System.out.println(fibonacci(50));
    }
}
```

큰 문제를 작게 나누는 부분에서 `분할 정복`과 유사한 부분이 있다. 하지만 다이나믹 프로그래밍은 문제들이 서로 `영향`을 미치고 있다는 차이점이 있다.

다이나믹 프로그래밍에서 피보나치 수열의 시간 복잡도는 `O(N)`이다. 한 번 구한 결과는 다시 구해지지 않기 때문이다.
아래 코드는 실제로 호출되는 메소드를 출력한 코드이다.

```java
public class Example8_3 {

    static long[] dp = new long[100];

    private static long fibonacci(int x) {

        System.out.print("f(" + x + ") ");
        if (x == 1 || x == 2) {
            return 1;
        }

        if (dp[x] != 0) {
            return dp[x];
        }

        dp[x] = fibonacci(x - 1) + fibonacci(x - 2);
        return dp[x];
    }

    public static void main(String[] args) {
        fibonacci(6);
    }
}
```

```
f(6) f(5) f(4) f(3) f(2) f(1) f(2) f(3) f(4)
```

이처럼 재귀 함수를 이용하여 다이나믹 프로그래밍 소스코드를 작성하는 방법을, 
큰 문제를 해결하기 위해 작은 문제를 호출한다고 하여 `탑다운`<sup>Top-Down</sup> 방식이라고 말한다.

반면 단순히 반복문을 이용하여 소스코드를 작성하는 경우 작은 문제부터 차근차근 답을 도출한다고 하여 `바텀업`<sup>Bottom-Up</sup> 방식이라고 한다.

```java
import java.math.BigInteger;

public class Example8_4 {

    public static void main(String[] args) {

        // 앞서 계산된 결과를 저장하기 위한 DP 테이블 초기화
        BigInteger[] dp = new BigInteger[100];

        // 첫 번째 피보나치 수와 두 번째 피보나치 수는 1
        dp[1] = BigInteger.valueOf(1);
        dp[2] = BigInteger.valueOf(1);

        // 피보나치 함수 반복문으로 구현 (바텀업 다이나믹 프로그래밍)
        for (int i = 3; i < 100; i++) {
            dp[i] = dp[i - 1].add(dp[i - 2]);
        }

        System.out.println(dp[99]);
    }
}
```

`탑다운(메모이제이션)` 방식은 `'하향식'` 이라고도 하며, `바텁업` 방식은 `'상향식'` 이라고도 한다.
`다이나믹 프로그래밍`의 `전형적인 형태`는 `바텀업 방식`이다.

`바텀업 방식`에서 사용되는 결과 저장용 리스트는 `'DP 테이블'` 이라고 부르며, `메모이제이션`은 `탑다운 방식`에 국한되어 사용되는 표현이다.

`다이나믹 프로그래밍`과 `메모이제이션`의 개념을 혼용해서 사용하는 경우도 있는데, 
엄밀히 말하면 `메모이제이션`은 이전에 계산된 `결과`를 `일시적`으로 `기록`해 놓는 넓은 개념을 의미하므로 다이나믹 프로그래밍과는 `별도`의 `개념`이다.

## 실전 문제

### 1로 만들기 

```java
import java.util.Scanner;

public class Practice8_5 {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int n = scanner.nextInt();
        // 앞서 계산된 결과를 저장하기 위한 DP 테이블 초기화
        int[] dp = new int[n + 1];

        for (int i = 2; i <= n; i++) {
            // 현재의 수에서 1을 빼는 경우
            dp[i] = dp[i - 1] + 1;

            if (i % 2 == 0) { // 현재의 수가 2로 나누어 떨어지는 경우
                dp[i] = Math.min(dp[i], dp[i / 2] + 1);
            } else if (i % 3 == 0) { // 현재의 수가 3으로 나누어 떨어지는 경우
                dp[i] = Math.min(dp[i], dp[i / 3] + 1);
            } else if (i % 5 == 0) { // 현재의 수가 5로 나누어 떨어지는 경우
                dp[i] = Math.min(dp[i], dp[i / 5] + 1);
            }
        }

        System.out.println(dp[n]);
    }
}
```

### 개미 천사 

```java
import java.util.Scanner;

public class Practice8_6 {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int n = scanner.nextInt();
        int[] foods = new int[n];
        for (int i = 0; i < n; i++) {
            foods[i] = scanner.nextInt();
        }

        int[] dp = new int[100];
        dp[0] = foods[0];
        dp[1] = Math.max(foods[0], foods[1]);
        for (int i = 2; i < n; i++) {
            dp[i] = Math.max(dp[i - 1], dp[i - 2] + foods[i]);
        }

        System.out.println(dp[n - 1]);
    }
}
```

### 바닥 공사 

```java
import java.util.Scanner;

public class Practice8_7 {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int n = scanner.nextInt();
        // 앞서 계산된 결과를 저장하기 위한 DP 테이블 초기화
        int[] dp = new int[n + 1];

        // 다이나믹 프로그래밍 진행 (바텀업)
        dp[1] = 1;
        dp[2] = 3;
        for (int i = 3; i <= n; i++) {
            dp[i] = (dp[i - 1] + (dp[i - 2] * 2)) % 796796;
        }

        System.out.println(dp[n]);
    }
}
```

### 효율적인 화폐 구성 

```java
import java.util.Arrays;
import java.util.Scanner;

public class Practice8_8 {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int n = scanner.nextInt(); // 화폐의 종류
        int m = scanner.nextInt(); // 가치의 합

        int[] coins = new int[n];
        for (int i = 0; i < n; i++) {
            coins[i] = scanner.nextInt();
        }

        int[] dp = new int[m + 1];
        Arrays.fill(dp, Integer.MAX_VALUE);

        dp[0] = 0;
        for (int i = 0; i < n; i++) {
            for (int j = coins[i]; j <= m; j++) {
                if (dp[j - coins[i]] != Integer.MAX_VALUE) {
                    dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1);
                }
            }
        }

        if (dp[m] == Integer.MAX_VALUE) {
            System.out.println("-1");
        } else {
            System.out.println(dp[m]);
        }
    }
}
```

## References

나동빈, 『이것이 취업을 위한 코딩 테스트다』, 출판지-한빛미디어(2020), 206p ~ 228p.