---
title: "4주차 과제: 제어문"
# excerpt: "GitHub Blog 서비스인 github.io 블로그 시작하기로 했다."

categories:
  - Java
  - Live-study
tags:
  - java
  - livestudy
  - 선택문
  - 반복문
  - JUnit5
  - LinkedList
  - stack
  - queue
last_modified_at: 2020-11-26 23:00:00 +0900
---

## 목표

자바가 제공하는 제어문을 학습하세요.

---

## 학습할 것

 - 1. 선택문
 - 2. 반복문
 - 과제 0. JUnit 5 학습하세요.
 - 과제 1. live-study 대시 보드를 만드는 코드를 작성하세요.
 - 과제 2. LinkedList를 구현하세요.
 - 과제 3. Stack을 구현하세요.
 - 과제 4. 앞서 만든 ListNode를 사용해서 Stack을 구현하세요.
 - (optional) 과제 5. Queue를 구현하세요.

---

### 제어문 이란?

&nbsp; Java의 인터프리터는 위에서 아래로, 오른쪽에서 왼쪽으로 코드를 해석한다. 그런 흐름을 변경할 수 있는 것이 제어문이다.



### 1. 선택문

Java에서는 if-else와 switch로 제공된다.

#### 1.1 if-else

```java
if (조건) {
    // ...
}
```
```java
if (조건) {
    // ...
} else {
    // ...
}
```
실행되는 코드가 한 줄이면
```java
if (조건)
    // ...
```
```java
if (조건)
    // ...
else 
    // ...
```

&nbsp; 해당 조건이 true이면 중괄호 안에 코드를 실행하고 조건문을 벗어난다. false이면 해당 조건을 무시하거나 else가 있다면 처리한다.

#### 1.2 if-else if
```java
if (조건) {
    // ...
} else if (조건) {
    // ...
} else if (조건) {
    // ...
} else {
    // ...
}
```
&nbsp; 위에서 부터 조건문을 실행하고 true이면 해당 코드를 실행하고 조건문을 벗어난다. if-else if의 경우, 위에서 부터 조건을 확인하기 때문에 뒤에 조건에 걸리길 원하지만 초기의 조건문에 걸릴 수 있기 때문에 조건에 배치 순서에 유의해서 작성해야 한다.

#### 1.3 switch 
```java
switch(수식) {
    case value1:
        // ...
        break;
    case value2:
        // ...
        break;
    ..
    ..
    default:
        // 모든 case에 해당하는 값이 없거나 break가 걸리지 않았을 때
}
```

&nbsp; 위에서 부터 수식에 결과 값을 case마다 비교한다. 일치하면 해당 case에 코드를 실행한다. break가 있다면 조건문을 벗어난다. 하지만 break가 없다면 밑에 case와 또다시 비교한다. 

참고 : [https://raccoonjy.tistory.com/10](https://raccoonjy.tistory.com/10)

---

### 2. 반복문

#### 2.1 while

```java
while (조건) {
    // ...
}
```

&nbsp; 조건이 true이면 해당 loop를 계속 반복한다. loop를 실행하던 도중 break를 만나거나 조건이 false가 되면 즉시 loop를 탈출한다. loop를 멈출 수 있는 flag가 없다면 무한루프에 빠질 수 있다.

#### 2.2 do-while

```java
do {
    // ...
} while (조건);
```
&nbsp; 일반적인 while문과 상당부분 유사하지만 do-while문은 적어도 한번의 loop를 실행한다. 초기 조건을 비교하기 전에 처리해야 될 코드가 있을 때 혹은 무조건 한번 이상 실행시켜야 할 경우 유용하게 사용된다.

#### 2.3 for
```java
for (초기식; 조건; 증감) {
    // ...
}
```
&nbsp; 초기의 값을 선언하여 해당 값이 조건에 충족되는 동안 loop를 반복한다. for은 loop의 횟수가 정해져 있을 때 유용하게 사용될 수 있다. 

#### 2.4 for each

&nbsp; for each는 java 5 부터 추가되었다. for each라는 키워드가 있는것은 아니다. 기존 for문을 살짝 수정하면 바로 적용할 수 있다.

```java
for (타입 값 : iterate) {
    // ...
}
```

&nbsp; iterate 객체에서 하나씩 순차적으로 값에 대입되어 loop를 수행한다. list나 map등의 모든 항목들을 탐색할 때 매우 직관적이고 유용하게 사용할 수 있다. 하지만 기존의 for문 자체에서 횟수를 제어할 수는 없다.

참고 : [https://raccoonjy.tistory.com/10](https://raccoonjy.tistory.com/10)
참고 : [https://wikidocs.net/264](https://wikidocs.net/264)

---

### 기타 제어문

&nbsp; 제어문, 즉 선택문과 반복문은 중첩하여 사용할 수 있다. 중첩된 제어문들을 탈출하거나 지속하기 위해서는 break와 continue가 필요하다.

 - break : 반복문을 즉시 탈출한다.
 - continue : 반복문의 이하 코드를 실행하지 않고 다음 loop로 건너뛴다.

---

### [더 알아보기] java에서 이중루프를 빠져나가고 싶다면?

&nbsp; 일반적인 break는 하나의 loop만을 빠져나갈 수 있다. 중첩된 loop를 빠져나가고 싶다면 for문 위에 label를 명시해 두면 된다. 해당 label이 명시된 break를 만난다면 중첩된 반복문을 모두 빠져나온다.

```java
loop: 
for (...) {
    for (...) {
        if (...) {
            break loop;
        }
    }
}
```

---

### 과제 0. JUnit 5 학습하세요.

__&#8251; JUnit4에 대하여 잘 알지 못하기 때문에 JUnit5 위주로 작성하였다. &#8251;__

&nbsp; Spring Boot 2.2.x는 JUnit4가 아닌 JUnit5를 기본으로 제공한다. JUnit5 Java Test framework는 3가지의 컴포넌트로 구성되어 있다.

 - JUnit Platform: JUnit Platform은 JVM에서 테스트 프레임워크를 시작하기 위한 기초적인 역할을 수행한다. 추가적으로 테스트 개발을 위한 API를 제공한다.

 - JUnit Jupiter: JUnit5에서 테스트 및 Extension을 작성하기 위한 TestEngine을 제공한다.

 - JUnit Vintage: 하위 호환성을 위한 TestEngine이다. JUnit4, JUnit3를 실행할 수 있다.

&nbsp; JUnit5를 사용하기 위해서는 JDK 8 버전 이상을 사용해야 한다.

#### life cycle

&nbsp; Junit5에는 다양한 어노테이션을 활용하여 life cycle를 사용한다.

 - @BeforeAll: 모든 테스트 실행 전 최초에 한번 실행한다.
 - @BeforeEach: 각각의 테스트를 실행하기 전에 실행한다.
 - @Test: 테스트를 실행한다.
 - @AfterEach: 각각의 테스트를 종료한 후 실행한다.
 - @AfterAll: 모든 테스트 종류 후 마지막에 실행한다.
 - @Disabled: 테스트를 수행하지 않는다.
 - @DisplayName: 테스트의 이름을 설정한다. 

__표준 테스트 클래스__
```java
class StandardTests {

    @BeforeAll
    static void initAll() {
    }

    @BeforeEach
    void init() {
    }

    @Test
    void succeedingTest() {
    }

    @Test
    void failingTest() {
        fail("a failing test");
    }

    @Test
    @Disabled("for demonstration purposes")
    void skippedTest() {
        // not executed
    }

    @Test
    void abortedTest() {
        assumeTrue("abc".contains("Z"));
        fail("test should have been aborted");
    }

    @AfterEach
    void tearDown() {
    }

    @AfterAll
    static void tearDownAll() {
    }

} 
```
참고 : [https://junit.org/junit5/docs/current/user-guide/#overview-what-is-junit-5](https://junit.org/junit5/docs/current/user-guide/#overview-what-is-junit-5)

__displayName__

```java
@DisplayName("A special test case")
class DisplayNameDemo {

    @Test
    @DisplayName("Custom test name containing spaces")
    void testWithDisplayNameContainingSpaces() {
    }

    @Test
    @DisplayName("╯°□°）╯")
    void testWithDisplayNameContainingSpecialCharacters() {
    }

    @Test
    @DisplayName("😱")
    void testWithDisplayNameContainingEmoji() {
    }

}
```
&nbsp; @displayName은 문자열 뿐만아니라 공백, 특수 문자, 이모지 등을 사용하여 선언할 수 있다.

참고 : [https://junit.org/junit5/docs/current/user-guide/#overview-what-is-junit-5](https://junit.org/junit5/docs/current/user-guide/#overview-what-is-junit-5)

#### Assertions

&nbsp; JUnit4가 가지고 있는 많은 assertion 메소드와 함께 제공되고, Java 8 람다식과 함께 사용하기에 적합한 몇 가지가 추가되었다. 모든 JUnit Jupiter Assertions 클래스는 static 메소드이다.

```java
class AssertionsDemo {

    private final Calculator calculator = new Calculator();

    private final Person person = new Person("Jane", "Doe");

    @Test
    void standardAssertions() {
        assertEquals(2, calculator.add(1, 1));
        assertEquals(4, calculator.multiply(2, 2),
                "The optional failure message is now the last parameter");
        assertTrue('a' < 'b', () -> "Assertion messages can be lazily evaluated -- "
                + "to avoid constructing complex messages unnecessarily.");
    }

    @Test
    void groupedAssertions() {
        // In a grouped assertion all assertions are executed, and all
        // failures will be reported together.
        assertAll("person",
            () -> assertEquals("Jane", person.getFirstName()),
            () -> assertEquals("Doe", person.getLastName())
        );
    }

    @Test
    void dependentAssertions() {
        // Within a code block, if an assertion fails the
        // subsequent code in the same block will be skipped.
        assertAll("properties",
            () -> {
                String firstName = person.getFirstName();
                assertNotNull(firstName);

                // Executed only if the previous assertion is valid.
                assertAll("first name",
                    () -> assertTrue(firstName.startsWith("J")),
                    () -> assertTrue(firstName.endsWith("e"))
                );
            },
            () -> {
                // Grouped assertion, so processed independently
                // of results of first name assertions.
                String lastName = person.getLastName();
                assertNotNull(lastName);

                // Executed only if the previous assertion is valid.
                assertAll("last name",
                    () -> assertTrue(lastName.startsWith("D")),
                    () -> assertTrue(lastName.endsWith("e"))
                );
            }
        );
    }

    @Test
    void exceptionTesting() {
        Exception exception = assertThrows(ArithmeticException.class, () ->
            calculator.divide(1, 0));
        assertEquals("/ by zero", exception.getMessage());
    }

    @Test
    void timeoutNotExceeded() {
        // The following assertion succeeds.
        assertTimeout(ofMinutes(2), () -> {
            // Perform task that takes less than 2 minutes.
        });
    }

    @Test
    void timeoutNotExceededWithResult() {
        // The following assertion succeeds, and returns the supplied object.
        String actualResult = assertTimeout(ofMinutes(2), () -> {
            return "a result";
        });
        assertEquals("a result", actualResult);
    }

    @Test
    void timeoutNotExceededWithMethod() {
        // The following assertion invokes a method reference and returns an object.
        String actualGreeting = assertTimeout(ofMinutes(2), AssertionsDemo::greeting);
        assertEquals("Hello, World!", actualGreeting);
    }

    @Test
    void timeoutExceeded() {
        // The following assertion fails with an error message similar to:
        // execution exceeded timeout of 10 ms by 91 ms
        assertTimeout(ofMillis(10), () -> {
            // Simulate task that takes more than 10 ms.
            Thread.sleep(100);
        });
    }

    @Test
    void timeoutExceededWithPreemptiveTermination() {
        // The following assertion fails with an error message similar to:
        // execution timed out after 10 ms
        assertTimeoutPreemptively(ofMillis(10), () -> {
            // Simulate task that takes more than 10 ms.
            new CountDownLatch(1).await();
        });
    }

    private static String greeting() {
        return "Hello, World!";
    }

}
```

&nbsp; 좀 더 공부한 뒤 새로운 프로젝트에 적용하고 따로 게시글을 작성할 예정이다.

참고 : [https://junit.org/junit5/docs/current/user-guide/#overview-what-is-junit-5](https://junit.org/junit5/docs/current/user-guide/#overview-what-is-junit-5)

---

### 과제 1. live-study 대시 보드를 만드는 코드를 작성하세요.

 - 깃헙 이슈 1번부터 18번까지 댓글을 순회하며 댓글을 남긴 사용자를 체크 할 것.
 - 참여율을 계산하세요. 총 18회에 중에 몇 %를 참여했는지 소숫점 두자리가지 보여줄 것.
 - Github 자바 라이브러리를 사용하면 편리합니다.
 - 깃헙 API를 익명으로 호출하는데 제한이 있기 때문에 본인의 깃헙 프로젝트에 이슈를 만들고 테스트를 하시면 더 자주 테스트할 수 있습니다.

```java
import org.kohsuke.github.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Homework01 {

    public static void main(String[] args) throws IOException {

        String myToken = "발급 받은 token";
        GitHub gitHub = new GitHubBuilder().withOAuthToken(myToken).build();
        GHRepository repository = gitHub.getRepository("hyeonic/live-study").getSource();

        Map<String, Integer> participantMap = new HashMap<String, Integer>();

        GHIssue issue;
        PagedIterable<GHIssueComment> comments;
        for (int i = 1; i < 19; i++) {
            issue = repository.getIssue(i);
            comments = issue.listComments();
            for (GHIssueComment comment : comments) {
                String participant = comment.getUser().getName();
                if (participant != null) {
                    if (participantMap.containsKey(participant)) {
                        participantMap.put(participant, participantMap.get(participant) + 1);
                    } else {
                        participantMap.put(participant, 1);
                    }
                }
            }
        }

        for (String user : participantMap.keySet()) {
            System.out.println("참여자: " + user);
            System.out.printf("참여율: %.2f%% \n\n", ((float)participantMap.get(user) * 100 / 18));
        }

    }
}
```

---

### 과제 2. LinkedList를 구현하세요.

 - LinkedList에 대해 공부하세요.
 - 정수를 저장하는 ListNode 클래스를 구현하세요.
 - ListNode add(ListNode head, ListNode nodeToAdd, int position)를 구현하세요.
 - ListNode remove(ListNode head, int positionToRemove)를 구현하세요.
 - boolean contains(ListNode head, ListNode nodeTocheck)를 구현하세요.

```java
public class Homework02 {

    static class ListNode {
        private int value;
        private ListNode next;

        public ListNode(int value) {
            this.value = value;
            next = null;
        }
    }

    static class LinkedList {
        public ListNode add(ListNode head, ListNode nodeToAdd, int position) {

            ListNode tempNode = head;

            if (head == null) return nodeToAdd;
            if (position == 0) {
                ListNode add = nodeToAdd;
                nodeToAdd.next = tempNode;
                return nodeToAdd;
            }

            for (int i = 0; i < position - 1; i++) {
                tempNode = tempNode.next;
            }

            nodeToAdd.next = tempNode.next;
            tempNode.next = nodeToAdd;

            return head;
        }

        public ListNode remove(ListNode head, int positionToRemove) {

            ListNode tempNode = head;

            for (int i = 0; i < positionToRemove - 1; i++) {
                tempNode = tempNode.next;
            }

            tempNode.next = tempNode.next.next;

            return head;
        }

        public boolean contains(ListNode head, ListNode nodeToCheck) {

            ListNode tempNode = head;

            while (tempNode != null) {
                if (tempNode.value == nodeToCheck.value) {
                    return true;
                }
                tempNode = tempNode.next;
            }

            return false;
        }

        public void print(ListNode head) {

            ListNode tempNode= head;

            while (tempNode != null) {
                System.out.print(tempNode.value + " -> ");
                tempNode = tempNode.next;
            }
            System.out.println("null");
        }
    }

    public static void main(String[] args) {

        LinkedList numbers = new LinkedList();
        ListNode head = null;

        for (int i = 0; i < 10; i++) {
            head = numbers.add(head, new ListNode(i), i);
        }

        System.out.println("contain 1? " + numbers.contains(head, new ListNode(1)));
        System.out.println("contain 2? " + numbers.contains(head, new ListNode(2)));

        numbers.print(head);

        System.out.println("remove index 1");
        System.out.println("remove index 1");
        numbers.remove(head, 1);
        numbers.remove(head, 1);

        System.out.println("contain 1? " + numbers.contains(head, new ListNode(1)));
        System.out.println("contain 2? " + numbers.contains(head, new ListNode(2)));

        numbers.print(head);

    }

}

```

---

### 과제 3. Stack을 구현하세요.

 - int 배열을 사용해서 정수를 저장하는 Stack을 구현하세요.
 - void push(int data)를 구현하세요.
 - int pop()을 구현하세요.

```java
public class Homework03 {

    static class Stack {
        private int[] stack;
        private int size;
        private int index;

        public Stack(int size) {
            stack = new int[size];
            this.size = size;
            index = 0;
        }

        public void push(int data) {
            if (indexValidation(index, "push")) {
                stack[index] = data;
                ++index;
            } else {
                System.out.println("stack이 가득 찼습니다.");
            }
        }

        public int pop() {
            if (indexValidation(index, "pop")) {
                int result = stack[index - 1];
                stack[index - 1] = 0;
                --index;
                return result;
            } else {
                System.out.println("stack이 비어있습니다.");
                return 0;
            }
        }

        public void print() {
            for (int i = size - 1; i >= 0; i--) {
                System.out.println(i + " : " + stack[i]);
            }
        }

        private boolean indexValidation(int index, String method) {
            if (index == this.size - 1 && method.equals("push")) {
                return false;
            } else if (index == 0 && method.equals("pop")) {
                return false;
            }

            return true;
        }
    }

    public static void main(String[] args) {
        int size = 7;
        Stack arrStack = new Stack(size);
        arrStack.push(1);
        arrStack.push(2);
        arrStack.push(3);
        arrStack.print();

        System.out.println();

        arrStack.push(4);
        arrStack.push(5);
        arrStack.print();

        System.out.println();

        System.out.println("pop : " + arrStack.pop());
        System.out.println("pop : " + arrStack.pop());
        arrStack.print();
    }
} 
```

---

### 과제 4. 앞서 만든 ListNode를 사용해서 Stack을 구현하세요.

 - ListNode head를 가지고 있는 ListNodeStack 클래스를 구현하세요.
 - void push(int data)를 구현하세요.
 - int pop()을 구현하세요.

```java
public class Homework04 {

    static class ListNode {

        private int value;
        private ListNode next;

        public ListNode(int value) {
            this.value = value;
            next = null;
        }
    }

    static class LinkedStack {
        ListNode head;

        public LinkedStack() {
            head = null;
        }

        public void push(int data) {

            ListNode temp = head;
            ListNode addNode = new ListNode(data);

            if (temp == null) {
                head = addNode;
                return;
            }

            while (temp.next != null) {
                temp = temp.next;
            }

            temp.next = addNode;
        }

        public int pop() {

            ListNode temp = head;

            while (temp.next.next != null) {
                temp = temp.next;
            }

            ListNode result = temp.next;
            temp.next = null;

            return result.value;
        }

        public void print() {

            ListNode tempNode = head;

            while (tempNode != null) {
                System.out.print(tempNode.value + " -> ");
                tempNode = tempNode.next;
            }
            System.out.println("null");
        }
    }

    public static void main(String[] args) {
        LinkedStack numbers = new LinkedStack();

        for (int i = 0; i < 10; i++) {
            numbers.push(i);
        }

        numbers.print();
        System.out.println("pop 1 " + numbers.pop());
        System.out.println("pop 2 " + numbers.pop());

        numbers.print();
    }
}
```

---

### 과제 5. Queue를 구현하세요.

 - 배열을 사용해서 한번
 - ListNode를 사용해서 한번.

```java
public class Homework05 {

    public static class ArrayQueue {
        private int[] queue;
        private int size;
        private int index;

        public ArrayQueue(int size) {
            queue = new int[size];
            this.size = size;
            index = 0;
        }

        public void push(int data) {
            if (indexValidation(index, "push")) {
                queue[index] = data;
                ++index;
            } else {
                System.out.println("queue가 가득 찼습니다.");
            }
        }

        public int peek() {
            if (indexValidation(index, "peek")) {
                int result = queue[0];
                for (int i = 1; i < size; i++) {
                    queue[i - 1] = queue[i];
                }
                queue[index] = 0;
                --index;
                return result;
            } else {
                System.out.println("queue가 비어있습니다.");
                return 0;
            }
        }

        private boolean indexValidation(int index, String method) {
            if (index == this.size - 1 && method.equals("push")) {
                return false;
            } else if (index == 0 && method.equals("peek")) {
                return false;
            }

            return true;
        }

    }

    public static class ListNode {

        private int value;
        private ListNode next;

        public ListNode(int value) {
            this.value = value;
            next = null;
        }
    }

    public static class LinkedQueue {
        ListNode head;

        public LinkedQueue() {
            head = null;
        }

        public void push(int data) {
            ListNode temp = head;
            ListNode addNode = new ListNode(data);

            if (temp == null) {
                head = addNode;
                return;
            }

            while (temp.next != null) {
                temp = temp.next;
            }

            temp.next = addNode;
        }

        public int peek() {

            ListNode temp = head;
            ListNode result = temp;
            head = temp.next;

            return result.value;
        }

        public void print() {

            ListNode tempNode = head;

            while (tempNode != null) {
                System.out.print(tempNode.value + " -> ");
                tempNode = tempNode.next;
            }
            System.out.println("null");
        }
    }

}
```

```java
import org.junit.Test;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.*;

public class Homework05Test {

    @Test
    @DisplayName("array queue 에 5개의 data 를 추가하는 테스트")
    public void addArrayQueue() {

        // Given
        Homework05.ArrayQueue arrayQueue = new Homework05.ArrayQueue(10);

        // When
        for (int i = 0; i < 5; i++) {
            arrayQueue.push(i);
        }

        // Then
        assertEquals(0, arrayQueue.peek());
        assertEquals(1, arrayQueue.peek());
        assertEquals(2, arrayQueue.peek());
        assertEquals(3, arrayQueue.peek());
        assertEquals(4, arrayQueue.peek());
    }

    @Test
    @DisplayName("Linked queue 에 5개의 data 를 추가하는 테스트")
    public void addLinkedListQueue() {

        // Given
        Homework05.LinkedQueue linkedQueue = new Homework05.LinkedQueue();

        // When
        for (int i = 0; i < 5; i++) {
            linkedQueue.push(i);
        }

        // Than
        assertEquals(0, linkedQueue.peek());
        assertEquals(1, linkedQueue.peek());
        assertEquals(2, linkedQueue.peek());
        assertEquals(3, linkedQueue.peek());
        assertEquals(4, linkedQueue.peek());
    }
}
```

### 아쉬운 점
 
&nbsp; 학교 시험 기간과 병행하여 작성하다 보니 상당 부분 부족한 점이 많았다. 종강 이후 4주차까지 다시 한 번 복습하며 나의 지식으로 만들어야 겠다. 테스트 코드 관련 게시글과 과제에 대한 세부 사항을 만들어 게시할 예정이다.