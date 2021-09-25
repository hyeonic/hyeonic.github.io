---
title: Chapter04 구현
tags: ['이것이 코딩 테스트다', '구현']
---

# CHAPTER 04 구현

## 1. 아이디어를 코드로 바꾸는 기술

### 피지컬로 승부하기
> 구현이란? '머릿속에 있는 알고리즘을 소스코드로 바꾸는 과정' 이다.
> 문제에 대한 정확한 풀이 방법과 우리가 원하는 프로그래밍 언어로 정확히 구현해냈을 때 비로소 정답 처리를 받을 수 있다.

해당 chapter는 완전 탐색, 시뮬레이션 유형을 모두 '구현' 유형으로 묶어서 다루고 있다.
 * 완전 탐색: 모든 경우의 수를 주저 없이 다 계산하는 해결 방법
 * 시뮬레이션: 문제에서 제시한 알고리즘을 한 단계씩 차례대로 직접 수행

### 구현 시 고려해야 할 메모리 제약 사항

1. C/C++와 자바에서 정수형 종류에 따른 범위

|정수형 종류|자료형의 크기|자료형의 범위 |
|---|---|---|
|int|4바이트|-2,147,483,648 ~ 2,147,438,647|
|long long|8바이트|-9,223,372,036,854,775,808 ~ 9,223,372,036,854,775,807|
|BigInteger (클래스)|가변적|제한 없음|

### 채점 환경

보통 코딩 테스트 환경에서는 다음과 같은 채점 시스템의 시간 제한 밑 메모리 제한 정보가 적혀 있다.
 * 시간 제한: 1초
 * 메모리 제한: 128MB

알고리즘 문제를 풀 때 시간 제한과 데이터의 개수를 먼저 확인한 뒤에 
이 문제를 어느 정도의 시간 복잡도의 알고리즘으로 작성해야 풀 수 있을 것인지 예측할 수 있어야 한다.

### 구현 문제에 접근하는 방법

보통 구현 유형의 문제는 사소한 입력 조건 등을 문제에서 명시해주며 문제의 길이가 꽤 긴 편이다. 고차원적인 사고력을 요구하는 문제는 나오지 않는 편이라
문법에 익숙하다면 오히려 쉽게 풀 수 있다.

### 상하좌우 

```java
import java.util.Scanner;

public class Example4_1 {

    static int n;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        n = sc.nextInt();
        int[] dx = {0, 0, -1, 1};
        int[] dy = {-1, 1, 0, 0};
        String[] moveTypes = {"L", "R", "U", "D"};
        sc.nextLine();
        String[] words = sc.nextLine().split(" ");
        int x = 1;
        int y = 1;

        for (String word : words) {
            for (int j = 0; j < 4; j++) {
                if (moveTypes[j].equals(word)) {
                    if (isLocation(dx[j] + x, dy[j] + y)) {
                        x += dx[j];
                        y += dy[j];
                    }
                }
            }
        }
        System.out.println(x + " " + y);
    }

    private static boolean isLocation(int x, int y) {
        if (x > 0 && x <= n && y > 0 && y <= n) return true;
        else return false;
    }
}
```

### 시각

 * 완전 탐색
 * 경우의 수를 모두 검사
 * 완전 탐색의 경우 비효율적인 시간 복잡도를 가지고 있다. 데이터의 개수가 큰 경우 정상적으로 동작하지 않을 수 있다. 확인해야 할 전체 데이터의 개수가 100만 개 이하일 때 완전 팜색을 사용하면 적절하다.
 * 위 문제의 경우 모든 경우의 수는 24 x 60 x 60 으로 86,400 가지이기 때문에 완전 탐색이 가능하다.

```java
import java.util.Scanner;

public class Example4_2 {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int h = sc.nextInt();

        int cnt = 0;
        for (int i = 0; i <= h; i++) {
            for (int j = 0; j < 60; j++) {
                for (int k = 0; k < 60; k++) {
                    String time = String.valueOf(i) + String.valueOf(j) + String.valueOf(k);
                    if (time.contains("3")) {
                        cnt++;
                    }
                }
            }
        }
        System.out.println(cnt);
    }
}

```

## 실전

### 왕실의 나이트

 * 나이트는 이동할 때 L자 형태로만 이동 가능하다.
 * 즉 갈 수 있는 스텝이 정해져있다.
 * 수평으로 두 칸 이동한 뒤 수직으로 한 칸 이동, 수직으로 두 칸 이동한 뒤 수평으로 한 칸 이동으로 총 8가지의 경우가 나온다.
 * 문자를 좌표로 바꾸기 위한 초반부를 잘 알아두자.

```java
import java.util.Scanner;

public class Practice4_3 {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        String inputData = sc.nextLine();
        int row = inputData.charAt(1) - '0';
        int col = inputData.charAt(0) - 'a' + 1;

        System.out.println("row: " + row + " col: " + col);

        int[] dx = {-2, -1, 1, 2, 2, 1, -1, -2};
        int[] dy = {-1, -2, -2, -1, 1, 2, 2, 1};

        int result = 0;
        for (int i = 0; i < 8; i++) {
            int nextRow = row + dx[i];
            int nextCol = col + dy[i];
            if (isLocation(nextRow, nextCol)) {
                result += 1;
            }
        }

        System.out.println(result);
    }

    private static boolean isLocation(int row, int col) {
        if (row >= 1 && row <= 8 && col >= 1 && col <= 8) {
            return true;
        } else {
            return false;
        }
    }
}
```

### 게임 개발 

```java
import java.util.Scanner;

public class Practice4_4 {

    public static int n, m, x, y, d;
    public static int[][] map; // 전체 맵 정보
    public static boolean[][] visited; //방문한 위치를 저장하기 위한 맵
    public static int[] dx = {-1, 0, 1, 0}; // 북 동 남 서 방향
    public static int[] dy = {0, 1, 0, -1}; // 북 동 남 서 방향

    private static void turnLeft() {
        d -= 1;
        if (d == -1) d = 3;
    }

    private static boolean isLocation(int x, int y) {
        if (map[x][y] == 0 && !visited[x][y]) return true;
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        n = sc.nextInt();
        m = sc.nextInt();
        map = new int[n][m];
        visited = new boolean[n][m];

        x = sc.nextInt(); // 현재 캐릭터의 좌표 x
        y = sc.nextInt(); // 현재 캐릭터의 좌표 y
        d = sc.nextInt(); // 현재 방향
        visited[x][y] = true; // 현재 좌표 방문 처리

        // 전체 맵 정보 입력
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                map[i][j] = sc.nextInt();
            }
            sc.nextLine();
        }

        int cnt = 1;
        int turnCnt = 0;
        while (true) {
            turnLeft();
            int nextX = x + dx[d];
            int nextY = y + dy[d];
            if (isLocation(nextX, nextY)) { // 회전 이후 정면에 가보지 않은 칸이 존재한다면 이동
                visited[nextX][nextY] = true;
                x = nextX;
                y = nextY;
                cnt++;
                turnCnt = 0;
                continue;
            } else {
                turnCnt++;
            }

            if (turnCnt == 4) {
                nextX = x - dx[d];
                nextY = y - dy[d];
                if (map[nextX][nextY] == 0) {
                    x = nextX;
                    y = nextY;
                } else break;
                turnCnt = 0;
            }
        }

        System.out.println(cnt);
    }
}
```

## References

나동빈, 『이것이 취업을 위한 코딩 테스트다』, 출판지-한빛미디어(2020), 103p ~ 121p.

<TagLinks />