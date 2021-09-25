---
title: Chapter10 그래프 이론
tags: ['이것이 코딩 테스트다', '그래프 이론']
---

# CHAPTER 10 그래프 이론

## 다양한 그래프 알고리즘

### 이미 배운 내용을 훑어보자

5장 'DFS/BFS', 9장 '최단 경로' 에서 다룬 내용은 모두 그래프 알고리즘의 한 종류이다.

크루스칼 알고리즘<sup>Kruskal Algorithms</sup>은 그리디 알고리즘으로 분류되며, 
위상 정렬 알고리즘<sup>Topology Algorithms</sup>은 앞서 배운 큐 자료구조 혹은 스택 자료구조를 활용해야 구현할 수 있다.

**다른 장에 비해 비중은 낮지만 꼼꼼히 준비하기 위해서는 잘 숙지해야 한다.**

> 그래프<sup>Graph</sup>란?
> 
> 노드와 노드 사이에 연결된 간선의 정보를 가지고 있는 자료구조를 의미한다.

서로 다른 개체가 연결되어 있다는 것은 그래프 알고리즘을 활용하여 문제를 해결할 확률이 높다.
예를 들면 '여러 개의 도시가 연결되어 있다.' 같은 내용이 나오면 의심해볼 여지가 있다.

그래프 자료구조 중 트리 자료구조는 다양한 알고리즘에서 사용되기 때문에 기억해두어야 한다.
다익스트라 최단 경로 알고리즘에서 우선순위 큐가 사용되는데, 구현을 위해서 힙을 이용하고 있다. 힙은 트라 자료구조에 속한다.

#### 그래프와 트리의 차이

| |그래프|트리|
|---|---|---|
|방향성|방향 그래프 혹은 무방향 그래프|방향 그래프|
|순환성|순환 및 비순환|비순환|
|루트 노드 존재 여부|루트 노드가 없음|루트 노드가 존재|
|노드간 관계성|부모와 자식 관계 없음|부모와 자식 관계|
|모델의 종류|네트워크 모델|계층 모델|

#### 그래프 구현 방법
1. 인접 행렬(Adjacency Matrix): 2차원 배열을 사용하는 방식. O(_V<sup>2</sup>_) 만큼의 메모리 공간 필요. 특정 노드의 간선 조회 시간은 O(_1_)
2. 인접 리스트(Adjacency List): 리스트를 사용하는 방식. O(_E_) 만큼의 메모리 공간 필요. 특정 노드의 간선 조회 시간은 O(_V_)

_어떤 문제를 만나든 메모리와 시간을 염두에 두고 알고리즘을 선택해야 한다._
1. 노드의 개수가 적다면 플로이드 워셜 알고리즘
2. 노드와 간선의 개수가 모두 많으면 우선순위 큐를 이용하는 다익스트라 알고리즘

### 서로소 집합

수학에서 **서로소 집합<sup>Disjoint Sets</sup>** 이란 공통 원소가 없는 두 집합을 의미한다.
서로소 집합 자료구조란 `서로소 부분 집합들로 나누어진 원소들의 데이터를 처리하기 위한 자료구조`라고 할 수 있다.

서로소 집합 자료구조는 `union`과 `find` 2개의 연산으로 조작할 수 있다.
union 연산은 2개의 원소가 포함된 집합을 하나의 집합으로 합치는 연산이다.
find 연산은 특정 원소가 속한 집합이 어떤 집합인지 알려주는 연산이다.
이러한 특성 때문에 서로소 집합 자료구조는 `union-find 자료구조`라고 불리기도 한다.

#### 서로소 집합 자료구조

```java
public class Example10_1 {

    // 노드의 개수 (V)와 간선(Union 연산)의 개수(E)
    // 노드의 개수는 최대 100,000개라고 가정
    private static int v, e;
    private static int[] parent = new int[100_001]; // 부모 테이블 초기화

    // 특정 원소가 속한 집합을 찾기
    private static int findParent(int x) {

        // 루트 노드가 아니라면, 루트 노드를 찾을 때 까지 재귀적으로 호출
        if (x == parent[x]) {
            return x;
        }

        return findParent(parent[x]);
    }

    // 두 원소가 속한 집합을 합치기
    private static void unionParent(int a, int b) {
        a = findParent(a);
        b = findParent(b);

        if (a < b) {
            parent[b] = a;
        } else {
            parent[a] = b;
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        v = scanner.nextInt();
        e = scanner.nextInt();

        // 부모 테이블상에서, 부모를 자기 자신으로 초기화
        for (int i = 1; i <= v; i++) {
            parent[i] = i;
        }

        // Union 연산을 각각 수행
        for (int i =0; i < e; i++) {
            int a = scanner.nextInt();
            int b = scanner.nextInt();
            unionParent(a, b);
        }

        // 각 원소가 속한 집합 출력하기
        System.out.print("각 원소가 속한 집합: ");
        for (int i = 1; i <= v; i++) {
            System.out.print(findParent(i) + " ");
        }
        System.out.println();

        // 부모 테이블 내용 출력하기
        System.out.print("부모 테이블: ");
        for (int i = 1; i <= v; i++) {
            System.out.print(parent[i] + " ");
        }
        System.out.println();
    }
}
```

하지만 위 코드는 find 메소드가 비효율적으로 동작한다. 
최악의 경우 find 메소드는 모든 노드를 다 확인하기 때문에 시간 복잡도가 O(_V_)가 된다.

결과적으로 위 코드의 알고리즘을 그대로 이용하게 되면 노드의 개수가 V 개이고 
find 혹은 union 연산의 개수가 M개 일 때, 전체 시간 복잡도는 O(_VM_)이 되어 비효율적이다.

이러한 find 메소드는 경로 압축<sup>Path Compression</sup> 기법을 적용하면 시간 복잡도를 개선할 수 있다.

```java
    // 특정 원소가 속한 집합을 찾기
    private static int findParent(int x) {

        // 루트 노드가 아니라면, 루트 노드를 찾을 때 까지 재귀적으로 호출
        if (x == parent[x]) {
            return x;
        }

        return findParent(parent[x]);
    }
    
    // 경로 압축 기법 사용

    // 특정 원소가 속한 집합을 찾기
    private static int findParent(int x) {

        // 루트 노드가 아니라면, 루트 노드를 찾을 때 까지 재귀적으로 호출
        if (x == parent[x]) {
            return x;
        }

        return parent[x] = findParent(parent[x]);
    }
```

```java
public class Example10_3 {

    // 노드의 개수 (V)와 간선(Union 연산)의 개수(E)
    // 노드의 개수는 최대 100,000개라고 가정
    private static int v, e;
    private static int[] parent = new int[100_001]; // 부모 테이블 초기화

    // 특정 원소가 속한 집합을 찾기
    private static int findParent(int x) {

        // 루트 노드가 아니라면, 루트 노드를 찾을 때 까지 재귀적으로 호출
        if (x == parent[x]) {
            return x;
        }

        return parent[x] = findParent(parent[x]);
    }

    // 두 원소가 속한 집합을 합치기
    private static void unionParent(int a, int b) {
        a = findParent(a);
        b = findParent(b);

        if (a < b) {
            parent[b] = a;
        } else {
            parent[a] = b;
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        v = scanner.nextInt();
        e = scanner.nextInt();

        // 부모 테이블상에서, 부모를 자기 자신으로 초기화
        for (int i = 1; i <= v; i++) {
            parent[i] = i;
        }

        // Union 연산을 각각 수행
        for (int i =0; i < e; i++) {
            int a = scanner.nextInt();
            int b = scanner.nextInt();
            unionParent(a, b);
        }

        // 각 원소가 속한 집합 출력하기
        System.out.print("각 원소가 속한 집합: ");
        for (int i = 1; i <= v; i++) {
            System.out.print(findParent(i) + " ");
        }
        System.out.println();

        // 부모 테이블 내용 출력하기
        System.out.print("부모 테이블: ");
        for (int i = 1; i <= v; i++) {
            System.out.print(parent[i] + " ");
        }
        System.out.println();
    }
}
```

경로 압축 기법을 이용하게 되면 루트 노드에 더욱 빠르게 접근할 수 있기 때문에 시간 복잡도가 개선된다.

#### 서로소 집합을 활용한 사이클 판별

서로소 집합은 무방향 그래프 내에서의 사이클을 판별할 때 사용할 수 있다. (방향 그래프의 경우 DFS로 판별 가능하다.)

사이클 판별 알고리즘은 그래프에 포함되어 있는 간선의 개수가 E개 일 때 모든 간선을 하나씩 확인하며,
매 간선에 대하여 union 및 find 메소드를 호출하는 방식으로 동작한다.

1. 각 간선을 확인하며 두 노드의 루트 노드를 확인한다.
   1. 루트 노드가 서로 다르다면 두 노드에 대하여 union 연산을 수행한다.
   2. 루트 노드가 서로 같다면 사이클(Cycle)이 발생한 것이다.
2. 그래프에 포함되어 있는 모든 간선에 대하여 1번 과정을 반복한다.

이 알고리즘은 간선에 방향성이 없는 무방향 그래프에서만 적용이 가능하다.

```java
public class Example10_4 {

    // 노드의 개수(V)와 간선(Union 연산)의 개수(E)
    private static int v, e;
    private static int[] parent = new int[100_001]; // 부모 테이블 초기화하기

    // 특정 원소가 속한 집합을 차기
    private static int findParent(int x) {

        // 루트 노드가 아니라면, 루트 노드를 찾을 때 까지 재귀적으로 호출
        if (x == parent[x]) {
            return x;
        }

        return parent[x] = findParent(parent[x]);
    }

    // 두 원소가 속한 집합을 합치기
    private static void unionParent(int a, int b) {
        a = findParent(a);
        b = findParent(b);

        if (a < b) {
            parent[b] = a;
        } else {
            parent[a] = b;
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        v = scanner.nextInt();
        e = scanner.nextInt();

        // 부모 테이블상에서, 부모를 자기 자신으로 초기화
        for (int i = 1; i <= v; i++) {
            parent[i] = i;
        }

        boolean cycle = false; // 사이클 발생 여부

        for (int i = 0; i < e; i++) {
            int a = scanner.nextInt();
            int b = scanner.nextInt();

            // 사이클이 발생한 경우 종료
            if (findParent(a) == findParent(b)) {
                cycle = true;
                break;
            // 사이클이 발생하지 않았다면 합집합(Union) 연산 수행
            } else {
                unionParent(a, b);
            }
        }

        if (cycle) {
            System.out.println("사이클이 발생했습니다.");
        } else {
            System.out.println("사이클이 발생하지 않았습니다.");
        }
    }
}
```

### 신장 트리

신장 트리<sup>Spanning Tree</sup>란 `하나의 그래프가 있을 때 모든 노드를 포함하면서 사이클이 존재하지 않는 부분 그래프`이다.

#### 크루스칼 알고리즘

신장 트리 중에서 최소 비용으로 만들 수 있는 신장 트리를 찾는 알고리즘을 '최소 신장 트리 알고리즘' 이라고 한다.
대표적인 최소 신장 트리 알고리즘으로는 크루스칼 알고리즘<sup>Kruskal Algorithm</sup>이 있다.

##### 크루스칼 알고리즘 특징
* 가장 적은 비용으로 모든 노드를 연결할 수 있다. 
* 그리디 알고리즘으로 분류된다. 
* 먼저 모든 간선에 대하여 정렬을 수행한 뒤에 가장 거리가 짧은 간선부터 집합에 포함시킨다. 
* 이때 사이클을 발생 시킬 수 있는 간선의 경우, 집합에 포함시키지 않는다.

1. 간선 데이터를 비용에 따라 오름차순으로 정렬한다.
2. 간선을 하나씩 확인하며 현재의 간선이 사이클을 발생시키는지 확인한다.
   1. 사이클이 발생하지 않는 경우 최소 신장 트리에 포함시킨다.
   2. 사이클이 발생하는 경우 최소 신장 트리에 포함시키지 않는다.
3. 모든 간선에 대하여 2번의 과정을 반복한다.

최소 신장 트리는 일종의 트리 자료구조이므로, 최종적으로 신장 트리에 포함되는 간선의 개수가 '노드의 개수 - 1'과 같다.

```java
public class Example10_5 {

    // 노드의 개수(V)와 간선(Union 연산)의 개수(E)
    // 노드의 개수는 최대 100,000개 라고 가정
    private static int v, e;
    private static int[] parent = new int[100_001]; // 부모 테이블 초기화하기

    // 모든 간선을 담을 리스트와, 최종 비용을 담을 변수
    private static List<Edge> edges = new ArrayList<>();
    private static int result = 0;

    private static class Edge {
        private int distance;
        private int nodeA;
        private int nodeB;

        public Edge(int distance, int nodeA, int nodeB) {
            this.distance = distance;
            this.nodeA = nodeA;
            this.nodeB = nodeB;
        }

        public int getDistance() {
            return distance;
        }

        public int getNodeA() {
            return nodeA;
        }

        public int getNodeB() {
            return nodeB;
        }
    }

    // 특정 원소가 속한 집합을 찾기
    private static int findParent(int x) {

        // 루트 노드가 아니라면, 루트 노드를 찾을 때까지 재귀적으로 호출
        if (x == parent[x]) {
            return x;
        }

        return parent[x] = findParent(parent[x]);
    }

    // 두 원소가 속한 집합을 합치기
    private static void unionParent(int a, int b) {
        a = findParent(a);
        b = findParent(b);

        if (a < b) {
            parent[b] = a;
        } else {
            parent[a] = b;
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        v = scanner.nextInt();
        e = scanner.nextInt();

        // 부모 테이블 상에서, 부모를 자기 자신으로 초기화
        for (int i = 1; i <= v; i++) {
            parent[i] = i;
        }

        // 모든 간선에 대한 정보를 입력 받기
        for (int i = 0; i < e; i++) {
            int a = scanner.nextInt();
            int b = scanner.nextInt();
            int cost = scanner.nextInt();

            edges.add(new Edge(cost, a, b));
        }

        // 간선을 비용 오름차순으로 정렬
        Collections.sort(edges, (o1, o2) -> {
            if (o1.getDistance() < o2.getDistance()) {
                return -1;
            }
            return 1;
        });

        // 간선을 하나씩 확인하며
        for (Edge edge : edges) {
            int cost = edge.getDistance();
            int a = edge.getNodeA();
            int b = edge.getNodeB();

            // 사이클이 발생하지 않는 경우에만 집합에 포함
            if (findParent(a) != findParent(b)) {
                unionParent(a, b);
                result += cost;
            }
        }

        System.out.println(result);
    }
}
```

크루스칼 알고리즘은 간선의 개수가 E개 일 때, O(_ElogE_)의 시간 복잡도를 가진다. 
시간이 가장 오래걸리는 부분은 간선을 정렬하는 작업이며, E개의 데이터를 정렬했을 때의 시간 복잡도는 O(_ElogE_)를 나타낸다.
크루스칼 내부에서 사용되는 서로소 집합 알고리즘은 정렬 시간 보다 작게 작용하기 때문에 무시된다.

#### 위상 정렬

**위상 정렬<sup>Topology Sort</sup>** 은 정렬 알고리즘의 일종이다. 
위상 정렬은 순서가정해져 있는 일련의 작업을 차례대로 수행해야 할 때 사용할 수 있는 알고리즘이다.

`위상 정렬은 방향 그래프의 모든 노드를 방향성에 거스르지 않도록 순서대로 나열한 것이다.`
1. 진입차수가 0인 노드를 큐에 넣는다.
2. 큐가 빌 때 까지 다음의 과정을 반복한다.
   1. 큐에서 원소를 꺼내 해당 노드에서 출발하는 간선을 그래프에서 제거한다.
   2. 새롭게 진입차수가 0이 된 노드를 큐에 넣는다.

모든 원소를 방문하기 전에 큐가 비어버리면 사이클이 발생한 것이다.
사이클이 존재하는 경우 사이클에 포함되어 있는 원소 중에서 어떠한 원소도 큐에 들어가지 못하기 때문이다.
기본적으로 위상 정렬 문제에서는 사이클이 발생하지 않는다고 명시하는 경우가 더 많다. 

위상 정렬의 답안은 `여러 가지가 될 수 있다`는 점이 특징이다.

```java
public class Example10_6 {

    // 노드의 개수 (V)와 간선의 개수 (E)
    // 노드의 개수는 최대 100,000개라고 가정
    private static int v, e;
    // 모든 노드에 대한 진입차수는 0으로 초기화
    private static int[] indegree = new int[100_001];
    // 각 노드에 연결된 간선 정보를 담기 위한 연결 리스트 초기회
    private static List<List<Integer>> graph = new ArrayList<>();

    // 위상 정렬 메소드
    private static void topologySort() {
        List<Integer> result = new ArrayList<>(); // 알고리즘 수행 결과를 담을 리스트
        Queue<Integer> queue = new LinkedList<>();

        // 처음 시작할 때는 진입차수가 0인 노드를 큐에 삽입
        for (int i = 1; i <= v; i++) {
            if (indegree[i] == 0) {
                queue.offer(i);
            }
        }

        // 큐가 빌 때까지 반복
        while (!queue.isEmpty()) {
            // 큐에서 원소 꺼내기
            int now = queue.poll();
            result.add(now);
            // 해당 원소와 연결된 노드들의 진입차수에서 1 빼기
            for (int i = 0; i < graph.get(now).size(); i++) {
                indegree[graph.get(now).get(i)] -= 1;
                // 새롭게 진입차수가 0이 되는 노드를 큐에 삽입
                if (indegree[graph.get(now).get(i)] == 0) {
                    queue.offer(graph.get(now).get(i));
                }
            }
        }

        // 위상 정렬을 수행한 결과 출력
        for (int i = 0; i < result.size(); i++) {
            System.out.print(result.get(i) + " ");
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        v = scanner.nextInt();
        e = scanner.nextInt();

        // 그래프 초기화
        for (int i = 0; i <= v; i++) {
            graph.add(new ArrayList<>());
        }

        // 방향 그래프의 모든 간선 정보를 입력 받기
        for (int i = 0; i < e; i++) {
            int a = scanner.nextInt();
            int b = scanner.nextInt();
            graph.get(a).add(b); // 정점 A에서 B로 이동 가능
            // 진입 차수를 1 증가
            indegree[b]++;
        }

        topologySort();
    }
}
```

## References

나동빈, 『이것이 취업을 위한 코딩 테스트다』, 출판지-한빛미디어(2020), 266p ~ 305p.