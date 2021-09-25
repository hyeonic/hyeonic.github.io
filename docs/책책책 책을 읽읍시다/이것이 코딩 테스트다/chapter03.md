---
title: Chapter03 그리디
tags: ['이것이 코딩 테스트다', '그리디 알고리즘']
---

# CHAPTER 03 그리디

## 1. 당장 좋은 것만 선택하는 그리디
> 어떠한 문제가 있을 때 단순 무식하게, 탐욕적으로 문제를 푸는 알고리즘. 현재 상황에서 지금 당장 좋은 것만 고르는 방법

### 거스름돈 

```java
public class Example3_1 {

    public static void main(String[] args) {
        int n = 1260;
        int cnt = 0;
        int[] coinTypes = {500, 100, 50, 10};

        for (int coin : coinTypes) {
            cnt += n / coin;
            n %= coin;
        }

        System.out.println(cnt);
    }
}
```

위 코드를 살펴보면 화폐의 종류만큼 반복을 수행한다. 화폐의 종류가 k개 라면 위 코드의 시간 복잡도는 O(K)이다.
위 알고리즘의 시간 복잡도는 동전의 총 종류에만 영향을 받고, 거슬러 줘야 하는 금액의 크기와는 무관하다.

### 그리디 알고리즘의 정당성

그리디 알고리즘을 모든 알고리즘 문제에 적용할 수 있는 것은 아니다.
탐욕적으로 문제에 접근햇을 때 정확한 답을 찾을 수 있다는 보장이 있을 때는 매우 효과적이고 직관적이다.

동전 문제의 경우 큰 단위가 항상 작은 단위의 배수이기 때문에 그리디 알고리즘으로 해결이 가능하다.
대부분의 그리디 알고리즘 문제에서는 이처럼 문제 풀이를 위한 최소한의 아이디어를 떠올리고 이것이 정당한지 검토할 수 있어야 답 도출이 가능하다.

## 실전 문제

### 큰 수의 법칙 

 * 입력 값 중에 가장 큰 수와 두 번째로 큰 수만 필요하다. 
 * 연속적으로 더할 수 있는 횟수는 최대 K 번 이기 때문에 가장 큰수를 K 번 더하고 두 번째로 큰 수를 한 번 더하는 연산 반복.
 * int cnt = (m / (k + 1)) * k + (m % (k + 1));

```java
import java.util.Arrays;
import java.util.Scanner;

public class Practice3_2 {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int m = sc.nextInt();
        int k = sc.nextInt();
        int[] nums = new int[n];

        for (int i = 0; i < nums.length; i++) {
            nums[i] = sc.nextInt();
        }

        Arrays.sort(nums); // 입력 받은 수 정렬

        int first = nums[n - 1];
        int second = nums[n - 2];

        int count = (m / (k + 1)) * k;
        count += m % (k + 1);

        int result = 0;
        result += count * first;
        result += (m - count) * second;

        System.out.println(result);
    }
}
```

### 숫자 카드 게임 

 * 각 행마다 가장 작은 수를 찾은 뒤에 그 수 중에서 가장 큰 수

```java
import java.util.Scanner;

public class Practice3_3 {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int m = sc.nextInt();

        int result = 0;
        for (int i = 0; i < n; i++) {
            int min = Integer.MAX_VALUE;
            for (int j = 0; j < m; j++) {
                min = Math.min(min, sc.nextInt());
            }
            result = Math.max(min, result);
        }

        System.out.println(result);
    }
}
```

### 1이 될 때까지

```java
import java.util.Scanner;

public class Practice3_4 {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int k = sc.nextInt();

        int count = 0;
        while (n != 1) {
            if (n % k == 0) {
                n /= k;
            } else {
                n -= 1;
            }
            count++;
        }

        System.out.println(cnt);
    }
}
```

## References

나동빈, 『이것이 취업을 위한 코딩 테스트다』, 출판지-한빛미디어(2020), 86p ~ 102p.

<TagLinks />