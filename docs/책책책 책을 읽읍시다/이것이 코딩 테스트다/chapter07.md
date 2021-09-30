---
title: Chapter07 이진 탐색
tags: ['이것이 코딩 테스트다', '이진 탐색']
---

# CHAPTER 07 이진 탐색

## 1. 범위를 반씩 좁혀가는 탐색

### 순차탐색 Sequential Search
> 리스트 안에 잇는 특정한 데이터를 찾기 위해 앞에서부터 데이터를 하나씩 차례대로 확인하는 방법

순차 탐색은 데이터 정렬 여부와 상관없이 가장 앞에 있는 원소부터 하나씩 확인해야 한다. 
데이터의 개수가 N개 일 때 최대 N번의 비교 연산이 필요하므로 최악의 경우 시간 복잡도는 **O(N)** 이다.

```java
import java.util.Scanner;

public class Example7_1 {

    // 순차 탐색 소스코드 구현
    public static int sequentialSearch(int n, String target, String[] array) {
        // 각 원소를 하나씩 확인하며
        for (int i = 0; i < n; i++) {
            System.out.println(array[i]);
            if (array[i].equals(target)) {
                // 현재의 원소가 찾고자 하는 원소와 동일한 경우
                return i + 1; // 현재의 위치 반환 (인덱스는 0부터 시작하므로 1 더하기)
            }
        }

        return -1; // 원소를 찾지 못한 경우 -1 반환
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("생성할 원소 개수를 입력한 다음 한 칸 띄고 찾을 문자열을 입력하세요.");
        // 원소의 개수
        int n = scanner.nextInt();
        // 찾고자 하는 문자열
        String target = scanner.next();

        System.out.println("앞서 적은 원소 개수만큼 문자열을 입력하세요. 구분은 띄어쓰기 한 칸으로 합니다.");
        String[] array = new String[n];
        for (int i = 0; i < n; i++) {
            array[i] = scanner.next();
        }

        // 순차 탐색 수행 결과 출력
        System.out.println(sequentialSearch(n, target, array));
    }
}
```

### 이진 탐색 Binary Search : 반으로 쪼개면서 탐색
> 배열 내부의 데이터가 정렬되어 있으면, 탐색 범위를 좁혀가며 데이터를 탐색한다.

이진 탐색의 위치를 나타내는 변수 3개 시작점, 끝점, 중간점이 필요하다. 
찾으려는 데이터와 중간점 위치에 있는 데이터를 반복 비교하여 데이터를 검색한다.

이진 탐색은 한 번 확인할 때마다 확인하는 원소의 개수가 절반씩 줄어들기 때문에 시간 복잡도가 **O(logN)** 이다.
이진 탐색을 구현하는 방법은 1. 재귀 함수와 단순 반복문을 이용하는 방법이다.

### 재귀 함수 
```java
import java.util.Scanner;

public class Example7_2 {

    // 이진 탐색 소스코드 구현(재귀 함수)
    private static int binarySearch(int[] array, int target, int start, int end) {
        if (start > end) {
            return -1;
        }

        int mid = (start + end) / 2;

        // 찾은 경우 중간 인덱스 반환
        if (array[mid] == target) {
            return mid;
        } else if (array[mid] > target) {
            // 중간점의 값보다 찾고자 하는 값이 작은 경우 왼쪽 확인
            return binarySearch(array, target, start, mid - 1);
        } else {
            // 중간점의 값보다 찾고자 하는 값이 큰 경우 오른쪽 확인
            return binarySearch(array, target, mid + 1, end);
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 원소의 개수(n)와 찾고자 하는 값(target)을 입력받기
        int n = scanner.nextInt();
        int target = scanner.nextInt();

        // 전체 원소 입력받기
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = scanner.nextInt();
        }

        // 이진 탐색 수행 결과 출력
        int result = binarySearch(arr, target, 0, n - 1);
        if (result == -1) {
            System.out.println("원소가 존재하지 않습니다.");
        } else {
            System.out.println(result + 1);
        }
    }
}
```

### 단순 반복문 

```java
import java.util.Scanner;

public class Example7_3 {

    // 이진 탐색 소스코드 구현(반복문)
    private static int binarySearch(int[] array, int target, int start, int end) {
        while (start <= end) {
            int mid = (start + end) / 2;

            // 찾은 경우 중간 인덱스 반환
            if (array[mid] == target) {
                return mid;
            } else if (array[mid] > target) {
                // 중간점의 값보다 찾고자 하는 값이 작은 경우 왼쪽 확인
                end = mid - 1;
            } else {
                // 중간점의 값보다 찾고자 하는 값이 큰 경우 오른쪽 확인
                start = mid + 1;
            }
        }

        return -1;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 원소의 개수(n)와 찾고자 하는 값(target)을 입력받기
        int n = scanner.nextInt();
        int target = scanner.nextInt();

        // 전체 원소 입력받기
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = scanner.nextInt();
        }

        // 이진 탐색 수행 결과 출력
        int result = binarySearch(arr, target, 0, n - 1);
        if (result == -1) {
            System.out.println("원소가 존재하지 않습니다.");
        } else {
            System.out.println(result + 1);
        }
    }
}
```

코딩 테스트의 이진 탐색 문제는 탐색 범위가 큰 상황에서의 탐색을 가정하는 문제가 많다. 
따라서 탐색 범위가 2,000만을 넘어가면 이진 탐색과 같이 **O(logN)** 의 속도를 내야 하는 알고리즘을 떠올려야 문제를 풀 수 있는 경우가 많다.

#### 코딩 테스트에서의 이진 탐색

이진 탐색의 소스코드를 구현하는 것은 상당히 어려운 작업이 될 수 있다. 여러 차례 코드를 입력하며 자연스럽게 암기하는 것이 좋다.

```java
public class Example7_2 {

    // 이진 탐색 소스코드 구현(재귀 함수)
    private static int binarySearch(int[] array, int target, int start, int end) {
        if (start > end) {
            return -1;
        }
        
        int mid = (start + end) / 2;

        // 찾은 경우 중간 인덱스 반환
        if (array[mid] == target) {
            return mid;
        } else if (array[mid] > target) {
            // 중간점의 값보다 찾고자 하는 값이 작은 경우 왼쪽 확인
            return binarySearch(array, target, start, mid - 1);
        } else {
            // 중간점의 값보다 찾고자 하는 값이 큰 경우 오른쪽 확인
            return binarySearch(array, target, mid + 1, end);
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 원소의 개수(n)와 찾고자 하는 값(target)을 입력받기
        int n = scanner.nextInt();
        int target = scanner.nextInt();

        // 전체 원소 입력받기
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = scanner.nextInt();
        }

        // 이진 탐색 수행 결과 출력
        int result = binarySearch(arr, target, 0, n - 1);
        if (result == -1) {
            System.out.println("원소가 존재하지 않습니다.");
        } else {
            System.out.println(result + 1);
        }
    }
}
```

```java
public class Example7_3 {

    // 이진 탐색 소스코드 구현(반복문)
    private static int binarySearch(int[] array, int target, int start, int end) {
        while (start <= end) {
            int mid = (start + end) / 2;

            // 찾은 경우 중간 인덱스 반환
            if (array[mid] == target) {
                return mid;
            } else if (array[mid] > target) {
                // 중간점의 값보다 찾고자 하는 값이 작은 경우 왼쪽 확인
                end = mid - 1;
            } else {
                // 중간점의 값보다 찾고자 하는 값이 큰 경우 오른쪽 확인
                start = mid + 1;
            }
        }

        return -1;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 원소의 개수(n)와 찾고자 하는 값(target)을 입력받기
        int n = scanner.nextInt();
        int target = scanner.nextInt();

        // 전체 원소 입력받기
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = scanner.nextInt();
        }

        // 이진 탐색 수행 결과 출력
        int result = binarySearch(arr, target, 0, n - 1);
        if (result == -1) {
            System.out.println("원소가 존재하지 않습니다.");
        } else {
            System.out.println(result + 1);
        }
    }
}
```

이진 탐색 문제는 탐색 범위가 큰 상황에서의 탐색을 가정하는 문제가 많다. 탐색 범위가 `2,000만`을 넘어가면 이진 탐색으로 문제를 접근해보길 권장한다. 
처리해야 할 데이터의 개수나 값이 `1,000만` 단위 이상으로 넘어가면 이진 탐색과 같이 `O(logN)`의 속도를 내야 하는 알고리즘을 떠올려야 문제를 풀 수 있는 경우가 많다.

### 트리 자료구조

이진 탐색은 전제 조건이 데이터 정렬이다.
데이터베이스는 내부적으로 대용량 데이터 처리에 적합한 트리 자료구조를 이용하여 항상 데이터가 정렬되어 있다.
따라서 데이터베이스에서의 탐색은 이진 탐색과는 조금 다르지만, 이진 탐색과 유사항 방법을 이용해 탐색을 항상 빠르게 수행하도록 설계되어 있어서 데이터 많아도 탐색하는 속도가 빠르다.

**트리 자료구조의 특징**

* 트리는 부모 노드와 자식 노드의 관계로 표현한다.
* 트리의 최상단 노드를 루트 노드라고 한다.
* 트리의 최하단 노드를 단말 노드라고 한다.
* 트리에서 일부를 떼어내도 트리 구조이며 이를 서브 트리라 한다.
* 트리는 파일 시스템과 같이 계층적으로 정렬된 데이터를 다루기에 적합하다.

---

### 이진 탐색 트리

이진 탐색 트리란 이진 탐색이 동작할 수 있도록 고안된 효율적인 탐색이 가능한 자료구조이다.

**이진 탐색 트리의 특징**

 * 부모 노드보다 왼쪽 자식 노드가 작다.
 * 부모 노드보다 오른쪽 자식 노드가 크다.

---

## 실전 문제

### 부품 찾기 

```java
import java.util.Arrays;
import java.util.Scanner;

public class Practice7_5 {

    static int[] numbers;

    private static boolean binarySearch(int target, int start, int end) {
        if (start > end) {
            return false;
        }

        int mid = (start + end) / 2;

        if (numbers[mid] == target) {
            return true;
        } else if (numbers[mid] > target) {
            return binarySearch(target, start, mid - 1);
        } else {
            return binarySearch(target, mid + 1, end);
        }
    }

    private static boolean binarySearchV2(int target, int start, int end) {
        while (start <= end) {
            int mid = (start + end) / 2;

            if (numbers[mid] == target) {
                return true;
            } else if (numbers[mid] > target) {
                end = mid - 1;
            } else {
                start = mid + 1;
            }
        }

        return false;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int n = scanner.nextInt();

        numbers = new int[n];
        for (int i = 0; i < n; i++) {
            numbers[i] = scanner.nextInt();
        }

        Arrays.sort(numbers);

        int m = scanner.nextInt();
        for (int i = 0; i < m; i++) {
            if (binarySearch(scanner.nextInt(), 0, n - 1)) {
                System.out.print("yes ");
            } else {
                System.out.print("no ");
            }
        }
    }
}
```

### 부품 찾기 계수 정렬 풀이 

```java
import java.util.Scanner;

public class Practice7_6 {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int n = scanner.nextInt();
        boolean[] numbers = new boolean[1_000_001];
        for (int i = 0; i < n; i++) {
            int number = scanner.nextInt();
            numbers[number] = true;
        }

        int m = scanner.nextInt();
        for (int i = 0; i < m; i++) {
            if (numbers[scanner.nextInt()]) {
                System.out.print("yes ");
            } else {
                System.out.print("no ");
            }
        }
    }
}
```

### 부품 찾기 집합 풀이

```java
import java.util.HashSet;
import java.util.Scanner;
import java.util.Set;

public class Practice7_7 {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int n = scanner.nextInt();
        Set<Integer> set = new HashSet<>();
        for (int i = 0; i < n; i++) {
            set.add(scanner.nextInt());
        }

        System.out.println(set);

        int m = scanner.nextInt();
        for (int i = 0; i < m; i++) {
            if (set.contains(scanner.nextInt())) {
                System.out.print("yes ");
            } else {
                System.out.print("no ");
            }
        }
    }
}
```

### 떡볶이 떡 만들기

 * 파라메트릭 서치 유형: 최적화 문제를 결정 문제로 바꾸어 해결하는 기법. '원하는 조건을 만족하는 가장 알맞은 값을 찾는 문제'

```java
import java.util.Scanner;

public class Practice7_8 {

    static int n, m;
    static int[] heights;

    private static int binarySearch(int start, int end) {
        int result = 0;
        while (start <= end) {
            long total = 0;
            int mid = (start + end) / 2;
            for (int i = 0; i < n; i++) {
                if (heights[i] > mid) {
                    total += heights[i] - mid;
                }
            }

            if (total < m) {
                end = mid - 1;
            } else {
                result = mid;
                start = mid + 1;
            }
        }

        return result;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        n = scanner.nextInt();
        m = scanner.nextInt();

        heights = new int[n];
        for (int i = 0; i < n; i++) {
            heights[i] = scanner.nextInt();
        }

        System.out.println(binarySearch(0, (int) 1e9));
    }
}
```

## References

나동빈, 『이것이 취업을 위한 코딩 테스트다』, 출판지-한빛미디어(2020), 186p ~ 205p.