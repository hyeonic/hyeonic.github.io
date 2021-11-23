---
title: Stream AutoCloseable
tags: ['Java', 'Stream']
---

# Stream AutoCloseable

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/142959008-b2abd60b-1dca-4277-ad4c-f805188648fa.png>
</p>

Java 8에 도입된 Stream은 `AutoCloseable`을 상속받는다. 즉 Java 7에서 추가된 `try-with-resources` 적용이 가능하다.

그렇다면 언제 명시적으로 해당 리소스를 닫아야 하는지 궁금하여 찾아보게 되었다.

## Collections, Arrays, and Generators

대부분 Java Collections, Arrays, Generators를 통해서 Stream 인슨턴스를 생성한다. 

```java
List<Integer> numbers = Arrays.asList(1, 2, 1, 3, 3, 2, 4);
numbers.stream()
        .filter(i -> i % 2 == 0)
        .distinct()
        .forEach(System.out::println);
```

```java
int[] numbers = {2, 3, 5, 7, 11, 13};
System.out.println(Arrays.stream(numbers).sum());
```

```java
IntStream.iterate(0, n -> n < 100, n -> n + 4)
        .forEach(System.out::println);
```

이러한 종류의 스트림을 처리할 때 명시적으로 닫지 않아도 된다. 스트림과 관련된 리소스들은 메모리이기 때문에 GC가 자동으로 처리한다.

## IO 리소스

하지만 일부 스트림은 파일이나 소켓과 같은 IO 리소스를 지원 받는다. `Files.lines()`가 그 예시이다.

```java
public final class Files {
    private Files() { }
    ...
    public static Stream<String> lines(Path path, Charset cs) throws IOException {
        if (path.getFileSystem() == FileSystems.getDefault() &&
            FileChannelLinesSpliterator.SUPPORTED_CHARSET_NAMES.contains(cs.name())) {
            FileChannel fc = FileChannel.open(path, StandardOpenOption.READ);

            Stream<String> fcls = createFileChannelLinesStream(fc, cs);
            if (fcls != null) {
                return fcls;
            }
            fc.close();
        }

        return createBufferedReaderLinesStream(Files.newBufferedReader(path, cs));
    }
    ...
}
```

`Files.Line()` 메서드는 `FileChannel` 인스턴스를 연 다음 스트림이 닫힐 때 함께 닫힌다. 만약 스트림이 닫히지 않으면 이러한 `FileChannel`은 열린 상태를 유지하고 `리소스의 누수`가 생기게 된다. 이러한 리소스 누수를 막기 위해 `try-with-resources`를 사용하는 것이 바람직하다.

```java
long uniqueWords = 0;
// 스트림은 자동을 자동으로 해제할 수 있는 AutoCloseable 이므로 try-finally가 필요없다.
try (Stream<String> lines = Files.lines(Paths.get("data.txt"), Charset.defaultCharset())) {
    // 고유 단어 수 계산
    uniqueWords = lines.flatMap(line -> Arrays.stream(line.split(" ")))
            .distinct() // 중복 제거
            .count(); // 단어 스트림 생성
            
} catch (IOException e) {
    // 파일을 열다가 예외가 발생하면 처리한다.
}
```

## References

[Should We Close a Java Stream?](https://www.baeldung.com/java-stream-close)

<TagLinks />