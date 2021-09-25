---
title: Chapter05 DFS/BFS
tags: ['이것이 코딩 테스트다', 'DFS', 'BFS', '깊이 우선 탐색', '너비 우선 탐색']
---

# CHAPTER05 DFS/BFS

## 1. 꼭 필요한 자료구조 기초

> 탐색<sup>Search</sup>이란 많은 양의 데이터 중에서 원하는 데이터를 찾는 과정이다.

> 자료구조<sup>Data Structure</sup>란 데이터를 표현하고 관리하고 처리하기 위한 구조이다.

오버플로<sup>Overflow</sup>는 특정한 자료구조가 수용할 수 있는 데이터의 크기를 이미 가득 찬 상태에서 삽입 연산을 수행할 때 발생한다.

언더플로<sup>Underflow</sup>는 특정한 자료구조에 데이터가 전혀 들어 있지 않은 상태에서 삭제 연산을 수행할 때 발생한다.

### 스택

선입후출<sup>First in Last Out</sup> 구조 또는 후입 선출<sup>Last In First Out</sup> 구조라고 한다.

 * Java에서 제공하는 Stack 클래스 사용

```java
import java.util.Stack;

public class Example5_1 {

    public static void main(String[] args) {
        Stack<Integer> stack = new Stack<>();

        stack.push(5);
        stack.push(2);
        stack.push(3);
        stack.push(7);
        stack.pop();
        stack.push(1);
        stack.push(4);
        stack.pop();

        // 최하단 원소부터 출력
        for (Integer integer : stack) {
            System.out.print(integer + " ");
        }

        System.out.println();

        // 최상단 원소부터 출력
        while (!stack.isEmpty()) {
            System.out.print(stack.peek() + " ");
            stack.pop();
        }
    }
}
```

### 큐

선입선출<sup>First in First Out</sup> 구조라고 한다.

 * Java에서 제공하는 Queue 클래스 사용
 * Deque 인터페이스를 활용하면 Stack과 Queue로 모두 사용 가능

```java
import java.util.Deque;
import java.util.LinkedList;
import java.util.Queue;

public class Example5_2 {

    public static void main(String[] args) {
        Queue<Integer> queue = new LinkedList<>();

        // 삽입(5) - 삽입(2) - 삽입(3) - 삽입(7) - 삭제() - 삽입(1) - 삽입(4) - 삭제()
        queue.offer(5);
        queue.offer(2);
        queue.offer(3);
        queue.offer(7);
        queue.poll();
        queue.offer(1);
        queue.offer(4);
        queue.poll();

        queue.forEach(integer -> System.out.print(integer + " "));
        System.out.println();

        while (!queue.isEmpty()) {
            System.out.print(queue.poll() + " ");
        }
        System.out.println();

        Deque<Integer> deque = new LinkedList<>();

        // 삽입(5) - 삽입(2) - 삽입(3) - 삽입(7) - 삭제() - 삽입(1) - 삽입(4) - 삭제()
        deque.offerLast(5);
        deque.offerLast(2);
        deque.offerLast(3);
        deque.offerLast(7);
        deque.pollFirst();
        deque.offerLast(1);
        deque.offerLast(4);
        deque.pollFirst();

        deque.forEach(integer -> System.out.print(integer + " "));

        System.out.println();

        while (!deque.isEmpty()) {
            System.out.print(deque.poll() + " ");
        }
        System.out.println();

    }
}
```
### 재귀 함수

> 재귀 함수<sup>Recursive Function</sup>란 자기 자신을 다시 호출하는 함수를 의미한다.

 * 작성한 문자열을 무한히 출력
 * 어느 정도 출력이 진행되면 오류 메시지를 출력하고 멈춤

```java
public class Example5_3 {

    public static void recursiveFunction() {
        System.out.println("재귀 함수를 호출합니다.");
        recursiveFunction();
    }

    public static void main(String[] args) {
        recursiveFunction();
    }
}
```

 * 해당 메소드의 무한 호출을 막기 위해 종료 조건을 명시
 * 재귀 함수는 내부적으로 스택 자료구조의 형태를 가지고 있다.

```java
public class Example5_4 {

    public static void recursiveFunction(int i) {
        // 100번째 호출을 했을 때 종료되도록 종료 조건 명시
        if (i == 100) return;
        System.out.println(i + "번째 재귀 함수에서 " + (i + 1) + "번째 재귀함수를 호출합니다.");
        recursiveFunction(i + 1);
        System.out.println(i + "번째 재귀 함수를 종료합니다.");
    }

    public static void main(String[] args) {
        recursiveFunction(1);
    }
}
```


 * 반복적으로 구현한 n!
 * 재귀적으로 구현한 n!

2가지 방식의 실행 결과는 동일하다. 반복문 대신 재귀 함수를 사용했을 때 얻는 이점은 코드가 더 간결해진다.
수학의 점화식을 그대로 소스코드로 옮겼기 때문이다.

```java
public class Example5_5 {

    // 반복적으로 구현한 n!
    public static int factorialIterative(int n) {
        int result = 1;
        // 1부터 n까지의 수를 차례대로 곱하기
        for (int i = 1; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    // 재귀적으로 구현한 n!
    public static int factorialRecursive(int n) {
        // n이 1 이하인 경우 1을 반환
        if (n <= 1) return 1;
        // n! = n * (n - 1)!를 그대로 코드로 작성하기
        return n * factorialRecursive(n - 1);
    }

    public static void main(String[] args) {
        // 각각의 방식으로 구현한 n! 출력(n = 5)
        System.out.println("반복적으로 구현:" + factorialIterative(5));
        System.out.println("재귀적으로 구현:" + factorialRecursive(5));
    }
}
```

## 2. 탐색 알고리즘 DFS/BFS
> DFS는 Depth-First Search. 깊이 우선 탐색이라고도 부르며, 그래프에서 깊은 부분을 우선적으로 탐색하는 알고리즘이다.

그래프<sup>Graph</sup>는 노드<sup>Node</sup>와 간선<sup>Edge</sup>로 표현되며 노드를 정점<sup>Vertex</sup>라고도 말한다.
그래프 탐색은 하나의 노드를 시작으로 다수의 노드를 방문하는 것을 말한다. 두 노드가 간선으로 연결되어 있으면 '두 노드는 인접하다<sup>Adjacent</sup>'
라고 표현한다.

 * 인접 행렬 (Adjacency Matrix): 2차원 배열로 그래프의 연결 관계를 표현하는 방식
 * 인접 리스트 (Adjacency List): 리스트로 그래프의 연결 관계를 표현하는 방식

### 인접 행렬 방식

 * 2차원 배열에 각 노드가 연결된 형태를 기록하는 방식

```java
public class Example5_6 {

    public static final int INF = Integer.MAX_VALUE;

    // 2차원 리스트를 이용해 인접 행렬 표현
    public static int[][] graph = {
            {0, 7, 5},
            {7, 0, INF},
            {5, INF, 0}
    };

    public static void main(String[] args) {
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                System.out.print(graph[i][j] + " ");
            }
            System.out.println();
        }
    }
}
```

## 인접 리스트 방식 

 * '연결 리스트' 라는 자료구조를 이용
 * java에 LinkedList 사용

```java
import java.util.LinkedList;

public class Example5_7 {

    // 행(Row)이 3개인 인접 리스트 표현
    public static LinkedList<LinkedList<Node>> graph = new LinkedList<>();

    public static void main(String[] args) {
        // 그래프 초기화
        for (int i = 0; i < 3; i++) {
            graph.add(new LinkedList<>());
        }

        // 노드 0에 연결된 노드 정보 저장 (노드, 거리)
        graph.get(0).add(new Node(1, 7));
        graph.get(0).add(new Node(2, 5));

        // 노드 1에 연결된 노드 정보 저장 (노드, 거리)
        graph.get(1).add(new Node(0, 7));

        // 노드 2에 연결된 노드 정보 저장 (노드, 거리)
        graph.get(2).add(new Node(0, 5));

        // 그래프 출력
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < graph.get(j).size(); j++) {
                graph.get(i).get(j).show();
            }
            System.out.println();
        }
    }
}

class Node {

    private int index;
    private int distance;

    public Node(int index, int distance) {
        this.index = index;
        this.distance = distance;
    }

    public void show() {
        System.out.print("(" + this.index + "," + this.distance + ") ");
    }
}
```

### 두 방식의 차이

메모리 측면에서는 인접 행렬 방식은 모든 관계를 저장하기 때문에 노드 개수가 많을 수록 메모리가 불필요하게 낭비된다.
하지만 인접리스트 방식은 연결된 정보만 저장하기 때문에 메모리를 효율적으로 사용할 수 있다.

속도 측면에서 인접 리스트 방식은 인접 행렬 방식에 비해 특정한 두 노드가 연결되어 있는지에 대한 정보를 얻는 속도가 느리다.

||DFS|BFS|
|---|---|---|
|동작 원리|스택|큐|
|구현 방법|재귀 함수 이용|큐 자료구조 이용|

## DFS
DFS는 깊이 우선 탐색 알고리즘이다. DFS는 특정한 경로를 탐색하다가 특정한 상황에서 최대한 깊숙이 들어가서 노드를 방문한 후, 
다시 돌아가 다른 경로로 탐색하는 알고리즘이다.

 1. 탐색 시작 노드를 스택에 삽입하고 방문 처리를 한다.
 2. 스택의 최상단 노드에 방문하지 않은 인접 노드가 있으면 그 인접 노드를 스택에 넣고 방문 처리를 한다. 방문하지 않은 인접 노드가 없으면 스택에서 최상단 노드를 꺼낸다.
 3. 2번의 과정을 더 이상 수행할 수 없을 때 까지 반복한다.

### DFS 예제

```java
import java.util.LinkedList;

public class Example5_8 {

    public static boolean[] visited = new boolean[9];
    public static LinkedList<LinkedList<Integer>> graph = new LinkedList<>();

    // DFS 함수 정의
    public static void dfs(int x) {
        // 현재 노드를 방문 처리
        visited[x] = true;
        System.out.print(x + " ");
        // 현재 노드와 연결된 다른 노드를 재귀적으로 방문
        for (int i = 0; i < graph.get(x).size(); i++) {
            int y = graph.get(x).get(i);
            if (!visited[y]) {
                dfs(y);
            }
        }
    }

    public static void main(String[] args) {
        // 그래프 초기화
        for (int i = 0; i < 9; i++) {
            graph.add(new LinkedList<>());
        }

        // 노드 1에 연결된 노드 정보 저장
        graph.get(1).add(2);
        graph.get(1).add(3);
        graph.get(1).add(8);

        // 노드 2에 연결된 노드 정보 저장
        graph.get(2).add(1);
        graph.get(2).add(7);

        // 노드 3에 연결된 노드 정보 저장
        graph.get(3).add(1);
        graph.get(3).add(4);
        graph.get(3).add(5);

        // 노드 4에 연결된 노드 정보 저장
        graph.get(4).add(3);
        graph.get(4).add(5);

        // 노드 5에 연결된 노드 정보 저장
        graph.get(5).add(3);
        graph.get(5).add(4);

        // 노드 6에 연결된 노드 정보 저장
        graph.get(6).add(7);

        // 노드 7에 연결된 노드 정보 저장
        graph.get(7).add(2);
        graph.get(7).add(6);
        graph.get(7).add(8);

        // 노드 8에 연결된 노드 정보 저장
        graph.get(8).add(1);
        graph.get(8).add(7);

        dfs(1);
    }
}
```

## BFS
BFS는 너브 우선 탐색이라는 의미를 가진다. 가까운 노드부터 탐색하는 알고리즘이다. BFS 구현은 선입선출 방식은 큐 자료구조를 이용한다.

 1. 탐색 시작 노드를 큐에 삽입하고 방문 처리한다.
 2. 큐에서 노드를 꺼내 해당 노드의 인접 노드 중에서 방문하지 않은 노드를 모두 큐에 삽입하고 방문 처리한다.
 3. 2번의 과정을 더 이상 수행할 수 없을 때 까지 반복한다.

### BFS 예제

```java
import java.util.LinkedList;
import java.util.Queue;

public class Example5_9 {

    public static boolean[] visited = new boolean[9];
    public static LinkedList<LinkedList<Integer>> graph = new LinkedList<>();

    // BFS 함수 정의
    public static void bfs(int start) {
        Queue<Integer> queue = new LinkedList<>();
        queue.offer(start);
        // 현재 노드를 방문 처리
        visited[start] = true;
        // 큐가 빌 때까지 반복
        while(!queue.isEmpty()) {
            // 큐에서 하나의 원소를 뽑아 출력
            int x = queue.poll();
            System.out.print(x + " ");
            // 해당 원소와 연결된, 아직 방문하지 않은 원소들을 큐에 삽입
            for(int i = 0; i < graph.get(x).size(); i++) {
                int y = graph.get(x).get(i);
                if(!visited[y]) {
                    queue.offer(y);
                    visited[y] = true;
                }
            }
        }
    }

    public static void main(String[] args) {
        // 그래프 초기화
        for (int i = 0; i < 9; i++) {
            graph.add(new LinkedList<>());
        }

        // 노드 1에 연결된 노드 정보 저장
        graph.get(1).add(2);
        graph.get(1).add(3);
        graph.get(1).add(8);

        // 노드 2에 연결된 노드 정보 저장
        graph.get(2).add(1);
        graph.get(2).add(7);

        // 노드 3에 연결된 노드 정보 저장
        graph.get(3).add(1);
        graph.get(3).add(4);
        graph.get(3).add(5);

        // 노드 4에 연결된 노드 정보 저장
        graph.get(4).add(3);
        graph.get(4).add(5);

        // 노드 5에 연결된 노드 정보 저장
        graph.get(5).add(3);
        graph.get(5).add(4);

        // 노드 6에 연결된 노드 정보 저장
        graph.get(6).add(7);

        // 노드 7에 연결된 노드 정보 저장
        graph.get(7).add(2);
        graph.get(7).add(6);
        graph.get(7).add(8);

        // 노드 8에 연결된 노드 정보 저장
        graph.get(8).add(1);
        graph.get(8).add(7);

        bfs(1);
    }
}
```

*코딩 테스트에서는 보통 재귀 함수로 구현한 DFS보다 BFS구현이 조금 더 빠르게 동작한다.*

## 실전 문제

### 음료수 얼려 먹기 

 * DFS로 풀이
 * BFS로도 충분히 풀이 가능할 것으로 보인다.

```java
import java.util.Scanner;

public class Practice5_10 {

    public static int n, m;
    public static int[][] graph;

    private static boolean dfs(int x, int y) {
        // 주어진 범위를 벗어나는 경우에는 즉시 종료
        if (x <= -1 || x >= n || y <= -1 || y >= m) {
            return false;
        }

        // 현재 노드를 아직 방문하지 않았다면
        if (graph[x][y] == 0) {
            // 해당 노드 방문 처리
            graph[x][y] = 1;
            // 상, 하, 좌, 우의 위치들도 모두 재귀적으로 호출
            dfs(x - 1, y);
            dfs(x, y - 1);
            dfs(x + 1, y);
            dfs(x, y + 1);
            return true;
        }
        return false;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        n = scanner.nextInt();
        m = scanner.nextInt();
        scanner.nextLine(); // 버퍼 지우기

        graph = new int[n][m];

        for (int i = 0; i < n; i++) {
            String str = scanner.nextLine();
            for (int j = 0; j < m; j++) {
                graph[i][j] = str.charAt(j) - '0';
            }
        }

        int result = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                // 현재 위치에서 DFS 수행
                if (dfs(i, j)) {
                    result += 1;
                }
            }
        }

        System.out.println(result);
    }
}
```

### 미로 찾기 

 * BFS로 풀이

```java
import java.util.LinkedList;
import java.util.Queue;
import java.util.Scanner;

public class Practice5_11 {

    private static int n, m;
    private static int[][] graph;

    // 이동할 네 가지 방향 정의 (상, 하, 좌, 우)
    public static int[] dx = {-1, 1, 0, 0};
    public static int[] dy = {0, 0, -1, 1};

    private static class Node {
        private int x;
        private int y;

        public Node(int x, int y) {
            this.x = x;
            this.y = y;
        }

        public int getX() {
            return this.x;
        }

        public int getY() {
            return this.y;
        }
    }

    private static int bfs(int x, int y) {
        // 큐(Queue) 구현을 위해 queue 라이브러리 사용
        Queue<Node> queue = new LinkedList<>();
        queue.offer(new Node(x, y));
        // 큐가 빌 때 까지 반복
        while (!queue.isEmpty()) {
            Node node = queue.poll();
            x = node.getX();
            y = node.getY();
            // 현재 위치에서 4 가지 방향으로의 위치 확인
            for (int i = 0; i < 4; i++) {
                int nx = x + dx[i];
                int ny = y + dy[i];
                // 미로 찾기 공간을 벗어난 경우 무시
                if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
                // 벽인 경우 무시
                if (graph[nx][ny] == 0) continue;
                // 해당 노드를 처음 방문하는 경우에만 최단 거리 기록
                if (graph[nx][ny] == 1) {
                    graph[nx][ny] = graph[x][y] + 1;
                    queue.offer(new Node(nx, ny));
                }
            }
        }
        // 가장 오른쪽 아래까지의 최단 거리 반환
        return graph[n - 1][m - 1];
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // N, M을 공백을 기준으로 구분하여 입력 받기
        n = scanner.nextInt();
        m = scanner.nextInt();
        scanner.nextLine(); // 버퍼 지우기

        graph = new int[n][m];

        // 2차원 리스트의 맵 정보 입력 받기
        for (int i = 0; i < n; i++) {
            String str = scanner.nextLine();
            for (int j = 0; j < m; j++) {
                graph[i][j] = str.charAt(j) - '0';
            }
        }

        // BFS를 수행한 결과 출력
        System.out.println(bfs(0, 0));

        System.out.println();
        for (int[] ints : graph) {
            for (int anInt : ints) {
                System.out.print(anInt + "\t");
            }
            System.out.println();
        }
        System.out.println();
    }
}
```

## References

나동빈, 『이것이 취업을 위한 코딩 테스트다』, 출판지-한빛미디어(2020), 122p ~ 154p.

<TagLinks />