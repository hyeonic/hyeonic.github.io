---
title: System.lineSeparator()
tags: ['우아한테크코스']
date: 2022-03-17 16:00:00
feed:
  enable: true
---

# System.lineSeparator()

## 개행문자

개행문자(new line)이란, 줄바꿈을 나타내는 제어문자이다. 이러한 개행 문자는 운영체제 별로 다르게 표현된다.

 * `윈도우`: CRLF (\r\n)
 * `맥`: CR (\r)
 * `유닉스`: LF (\n)

## System.lineSeparator()

Java에는 운영체제 별 개행문자에 대응하기 위해 필요한 메서드를 제공하고 있다. 그것은 바로 `System.lineSeparator()`이다.

::: tip lineSeparator

Returns the system-dependent line separator string. It always returns the same value - the initial value of the system property line.separator.
On UNIX systems, it returns "\n"; on Microsoft Windows systems it returns "\r\n".

시스템에 의존하는 행 구분 문자열을 반환한다. 항상 동일한 값을 반환한다. Unix 시스템에서는 `\n`을 반환하고 Windows 시스템에서는 `\r\n`을 반환한다.

:::

## System.out.println()

출력을 진행할 때 개행을 포함하기 위해서는 `System.out.println()`을 활용해야 한다. 해당 메서드는 개행을 어떤식으로 진행하는지 알아보기 위해 내부 구조를 확인하였다.

```java
public class PrintStream extends FilterOutputStream
    implements Appendable, Closeable
{
    ...
    public void println(String x) {
        synchronized (this) {
            print(x);
            newLine();
        }
    }
    ...
}
```

개행을 의미하는 `newLine()` 메서드를 확인할 수 있었다.

```java
public class PrintStream extends FilterOutputStream
    implements Appendable, Closeable
{
    ...
    private void newLine() {
        try {
            synchronized (this) {
                ensureOpen();
                textOut.newLine(); // 실제 개행이 이루어지는 부분
                textOut.flushBuffer();
                charOut.flushBuffer();
                if (autoFlush)
                    out.flush();
            }
        }
        catch (InterruptedIOException x) {
            Thread.currentThread().interrupt();
        }
        catch (IOException x) {
            trouble = true;
        }
    }
    ...
}
```

`textOut.newLine()`가 실제 개행이 이루어지는 부분이다.

```java
public class BufferedWriter extends Writer {
    ...
    public void newLine() throws IOException {
        write(System.lineSeparator());
    }
    ...
}
```

실제 `System.lineSeparator()`를 통해 개행 문자가 `write` 되고 있다.

## 정리

앞서 언급한 것 처럼 운영체제 별로 개행문자가 다르다. 하드 코딩으로 개행문자를 작성하기 보다 Java에서 제공하는 개행문자를 사용하여 반영하는 편이 낫다.

<TagLinks />