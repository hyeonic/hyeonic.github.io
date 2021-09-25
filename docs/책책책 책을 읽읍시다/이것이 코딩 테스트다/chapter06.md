---
title: Chapter06 정렬
tags: ['이것이 코딩 테스트다', '정렬']
---

# CHAPTER06 정렬

## 1. 기준에 따라 데이터를 정렬

### 정렬 알고리즘 개요

> **정렬<sup>Sorting</sup>** 이란 데이터를 특정한 기주에 따라 순서대로 나열하는 것이다.

### 선택 정렬

> 데이터가 무작위로 여러 개 있을 때, 이중에서 가장 작은 데이터를 선택해 만 앞에 있는 데이터와 바꾸고, 
> 그 다음 작은 데이터를 선택하여 앞에서 두 번째 데이터와 바꾸는 과정을 반복한다. 
> 매번 가장 작은 것을 선택한다는 의미에서 **선택 정렬<sup>Selection Sorting</sup>** 알고리즘이라고 한다.

```java
public class Example6_1 {

    public static void main(String[] args) {
        int[] array = {7, 5, 9, 0, 3, 1, 6, 2, 4, 8};

        for (int i = 0; i < array.length; i++) {
            int minIndex = i;
            for (int j = i; j < array.length; j++) {
                if (array[minIndex] > array[j]) {
                    minIndex = j;
                }
            }
            /* swap */
            int temp = array[i];
            array[i] = array[minIndex];
            array[minIndex] = temp;
        }

        Arrays.stream(array).forEach(s -> System.out.print(s + " "));
    }
}
```

가장 작은 데이터를 앞으로 보내는 과정을 n - 1 번 반복하여 정렬을 진행한다. 
swap을 통하여 가장 작은 원소와 위치를 바꿔주며 정렬을 진행한다.

#### 선택 정렬의 시간 복잡도

선택 정렬은 n - 1 번 만큼 가장 작은 수를 찾아서 맨 앞으로 보내야 한다. 
또한 매번 가장 작은 수를 찾기 위해서 비교 연산이 필요하다.

연산횟수는 n + (n - 1) + (n - 2) + (n - 3) + ... + 2 로 (n<sup>2</sup> + n) / 2를 의미한다.
빅오 표기법으로는 O(n<sup>2</sup>)로 표현할 수 있다.

### 삽입 정렬

> **삽입 정렬<sup>Insertion Sort</sup>** 은 특정한 데이터를 적절한 위치에 '삽입'하여 정렬한다.
> 삽입 정렬은 특정한 데이터가 적절한 위치에 들어가기 이전에, 그 앞까지의 데이터는 이미 정렬되어 있다고 가정한다. 
> 정렬되어 있는 데이터 리스트에 적절한 위치를 찾은 뒤에, 그 위치에 삽입된다는 특징이 있다.

삽입 정렬은 정렬이 이루어진 원소는 항상 오름차순을 유지한다.

```java
public class Example6_3 {

    public static void main(String[] args) {
        int[] array = {7, 5, 9, 0, 3, 1, 6, 2, 4, 8};

        for (int i = 1; i < array.length; i++) {
            // 인덱스 i부터 1까지 감소하며 반복하는 문법
            for (int j = i; j > 0; j--) {
                // 한 칸씩 왼쪽으로 이동
                if (array[j] < array[j - 1]) {
                    // 스와프(Swap)
                    int temp = array[j];
                    array[j] = array[j - 1];
                    array[j - 1] = temp;
                } else {
                    // 자기보다 작은 데이터를 만나면 그 위치에서 멈춤
                    break;
                }
            }
        }

        Arrays.stream(array).forEach(s -> System.out.print(s + " "));
    }
}
```

#### 삽입 정렬의 시간 복잡도

삽입 졍렬의 시간 복잡도는 반복문이 2번 중첩되어 사용되기 때문에 O(N<sup>2</sup>)이다.
하지만 삽입 정렬은 현재 리스트가 거의 정렬되어 있다면 매우 빠르게 동작한다. 최선의 경우 O(N)의 시간 복잡도를 가진다.

### 퀵 정렬

> 퀵 정렬은 기준을 설정한 다음 큰 수와 작은 수를 교환한 후 리스트를 반으로 나누는 방식으로 동작한다.

퀵 정렬에서는 피벗이 사용된다. 큰 숫자와 작은 숫자를 교환할 때, 교환하기 위한 '기준'을 바로 피벗이라고 표현한다.

피벗을 설정하고 리스트를 분할하는 방법은 여러가지가 있다. 대표적으로는 호어 분할 방식으로 리스트에서 첫 번째 데이터를 피벗으로 정하는 것이다.

```java
public class Example6_4 {

    private static void quickSort(int[] array, int start, int end) {
        if (start >= end) return; // 원소가 1개인 경우 종료
        int pivot = start; // 피벗은 첫 번째 원소
        int left = start + 1;
        int right = end;
        while (left <= right) {
            // 피벗보다 큰 데이터를 찾을 때 까지 반복
            while (left <= end && array[left] <= array[pivot]) left++;
            // 피벗보다 작은 데이터를 찾을 때 까지 반복
            while (right > start && array[right] >= array[pivot]) right--;
            // 엇갈렸다면 작은 데이터와 피벗을 교체
            if (left > right) {
                int temp = array[pivot];
                array[pivot] = array[right];
                array[right] = temp;
            } else { // 엇갈리지 않았다면 작은 데이터와 큰 데이터를 교체
                int temp = array[left];
                array[left] = array[right];
                array[right] = temp;
            }
        }
        // 분할 이후 왼쪽 부분과 오른쪽 부분에서 각각 정렬 수행
        quickSort(array, start, right - 1);
        quickSort(array, right + 1, end);
    }

    public static void main(String[] args) {
        int[] array = {7, 5, 9, 0, 3, 1, 6, 2, 4, 8};

        quickSort(array, 0, array.length - 1);

        Arrays.stream(array).sorted().forEach(s -> System.out.print(s + " "));
    }
}
```

#### 퀵 정렬의 시간 복잡도

퀵 정렬의 평균 시간 복잡도는 O(NlogN)이다. 하지만 최악의 경우 시간 복잡도는 O(N<sup>2</sup>)이다. 
데이터가 무작위로 입력되는 경우 퀵 졍렬은 빠르게 동작한다. 
하지만 위 치럼 가장 왼쪽 데이터를 피벗으로 삼을 때, '이미 데이터가 정렬되어 있는 경우'에는 매우 느리게 동작한다.

### 계수 정렬

> **계수 정렬<sup>Count Sort</sup>** 는 특정한 조건이 부합할 때만 사용할 수 있지만 매우 빠른 정렬 알고리즘이다.
> 데이터의 개수가 N, 데이터 중 최대값이 K 일 때, 계수 정렬은 최악의 경우에도 수행 시간 O(N + K)를 보장한다.
> 하지만 계수 정렬은 '데이터의 크기 범위가 제한되어 정수 형태로 표현할 수 있을 때'만 사용할 수 있다.

계수 정렬은 일반적으로 별도의 리스트를 선언하고 그 안에 정렬에 대한 정보를 담는다는 특징이 있다.

```java
public class Example6_6 {

    public static void main(String[] args) {
        int[] array = {7, 5, 9, 0, 3, 1, 6, 2, 9, 1, 4, 8, 0, 5, 2};

        int[] count = new int[10]; // 0 ~ 9 모든 범위를 포함하는 배열 선언 (모든 값은 0으로 초기화)

        for (int i = 0; i < array.length; i++) {
            count[array[i]]++; // 각 데이터에 해당하는 인덱스의 값 증가
        }

        for (int i = 0; i < count.length; i++) { // 배열에 기록된 정보 확인
            for (int j = 0; j < count[i]; j++) {
                System.out.print(i + " ");
            }
        }
        System.out.println();
    }
}
```

#### 계수 정렬의 시간 복잡도

모든 데이터가 양의 정수인 상황에서 데이터의 개수를 N, 데이터 중 최대값의 크기를 K라고 할 때, 계수 정렬의 시간 복잡도는 O(N + K)이다.
계수 정렬은 데이터의 크기가 한정되어 있고, 데이터의 크기가 많이 중복되어 있을수록 유리하며 항상 사용할 수 없다. 
하지만 조건만 만족한다면 계수 정렬은 정렬해야 하는 데이터의 개수가 매우 많을 때에도 효과적으로 사용이 가능하다.
공간 복잡도 또한 O(N + K)이다.

### 정렬 라이브러리의 시간 복잡도

정렬 라이브러리는 항상 최악의 경우에도 시간 복잡도 O(NlogN)을 보장한다. 
코딩 테스트에서 정렬 알고리즘이 사용되는 경우를 일반적으로 3가지 문제 유형으로 나타낼 수 있다.

1. 정렬 라이브러리로 풀 수 있는 문제: 
   단순히 정렬 기법을 알고 있는지 물어보는 문제로 기본 정렬 라이브러리의 사용 방법을 숙지하고 있으면 어렵지 않게 풀 수 있다.
2. 정렬 알고리즘의 원리에 대해서 물어보는 문제: 
   선택 정렬, 삽입 정렬, 퀵 정렬 등의 원리를 알고 있어야 문제를 풀 수 있다.
3. 더 빠른 정렬이 필요한 문제: 
   퀵 정렬 기반의 정렬 기법으로는 풀 수 없으며 계수 정렬 등의 다른 정렬 알고리즘을 이용하거나 문제에서 기존에 알려진 알고리즘의 구조적인 개선을 거쳐야 풀 수 있다.

## 실전 문제

### 위에서 아래로

 * Java 기본 정렬 라이브러리 사용
 * 내림차순 정렬

```java
import java.util.Arrays;
import java.util.Collections;
import java.util.Scanner;

public class Practice6_10 {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int n = scanner.nextInt();

        Integer[] numbers = new Integer[n];
        for (int i = 0; i < n; i++) {
            numbers[i] = scanner.nextInt();
        }

        Arrays.stream(numbers)
                .sorted(Collections.reverseOrder())
                .forEach(value -> System.out.print(value + " "));
    }
}
```

### 성적이 낮은 순서로 학생 출력하기

 * List에서 제공하는 sort 메소드 사용.
 * Comparator 구현체 전달하여 정렬

```java
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Practice6_11 {

    static class Student {
        private String name;
        private int score;

        public Student(String name, int score) {
            this.name = name;
            this.score = score;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public int getScore() {
            return score;
        }

        public void setScore(int score) {
            this.score = score;
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int n = scanner.nextInt();

        List<Student> students = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            String name = scanner.next();
            int score = scanner.nextInt();
            students.add(new Student(name, score));
        }

        students.sort((x, y) -> {
            if (x.score < y.score) {
                return -1;
            }
            return 1;
        });

        students.forEach(value -> System.out.print(value.getName() + " "));
    }
}
```

### 두 배열의 원소 교체 

 * A 배열의 가장 작은 원소를 골라 B 배열에서 가장 큰 원소와 교체

```java
import java.util.Arrays;
import java.util.Comparator;
import java.util.Scanner;

public class Practice6_12 {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int n = scanner.nextInt();
        int k = scanner.nextInt();

        Integer[] a = new Integer[n];
        for (int i = 0; i < n; i++) {
            a[i] = scanner.nextInt();
        }

        Integer[] b = new Integer[n];
        for (int i = 0; i < n; i++) {
            b[i] = scanner.nextInt();
        }

        // 배열 A는 오름차순 정렬
        Arrays.sort(a);
        // 배열 B는 내림차순 정렬
        Arrays.sort(b, Comparator.reverseOrder());

        for (int i = 0; i < k; i++) {
            if (a[i] < b[i]) {
                int temp = a[i];
                a[i] = b[i];
                b[i] = temp;
            } else {
                break;
            }
        }

        // 배열 A의 모든 원소의 합 출력
        int sum = Arrays.stream(a)
                .mapToInt(value -> Integer.valueOf(value))
                .sum();

        System.out.println(sum);
    }
}
```

## References

나동빈, 『이것이 취업을 위한 코딩 테스트다』, 출판지-한빛미디어(2020), 155p ~ 184p.

<TagLinks />