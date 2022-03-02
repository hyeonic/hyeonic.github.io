---
title: HashMap
tags: ['java', 'HashMap', 'TODO']
---

# HashMap

**OpenJdk azul-11을 기반으로 작성하였습니다. 오개념이나 잘못된 부분이 있으면 dev.hyeonic@gmail.com로 많은 피드백 부탁드립니다!**

## 해시 테이블 자료구조

`해시 테이블`은 `연관배열(association array)` 구조를 이용하여 `key`에 `value`를 저장하기 위한 `자료구조`이다. 

`해시 테이블`은 `key`, `해시 함수(hash function)`, `hash`, `value`, `bucket`으로 이루어져 있다. `key`는 `고유한 값`이며 해시 함수의 인자로 사용한다. 

::: tip 연관배열 구조
`key 1개`와 `value 1개`가 `1:1`로 연관되어 있는 자료구조이다. key 값을 이용하면 value를 알 수 있다.
:::

`해시 테이블`은 `해시 함수`를 사용하여 `key`를 `hash`값으로 변환하고, 이 `hash`값을 `index` 혹은 주소로 삼아 `value`와 함께 저장한다. 

이러한 구조로 인하여 `value`를 `저장`한 뒤 `저장/삭제/조회`를 위해 `key`값을 활용하여 해시 함수를 1번만 수행하면 되므로 평균 시간 복잡도는 `O(1)`이다.

### 해시 함수

`해시 함수`는 `key`값을 입력 받아 `해시 테이블 상의 주소(hash)`를 `반환`한다. 서로 다른 `key`로 인하여 같은 `hash`를 가리키게 되는 경우 `해시 충돌(hash collision)`이 발생한다. 

::: tip hash
해시 함수가 반환한 결과물이다. `bucket`에 `value`와 매칭되어 저장된다.
:::

`해시 함수`를 만드는 대표적인 방법으로는 `Division Method`와 `Multiplication Method`가 존재한다.

### bucket

`value`가 저장되는 공간이다. `배열`로 표현된다.

## HashMap과 HashTable

`HashMap`은 `Java Collections Framework`에 속하는 구현체 클래스이다. 이러한 `Java Collections Framework`는 `Java 2`에서 정식으로 선보였다.

`HashTable`은 `JDK 1.0`부터 있던 `Java의 API`이다. `HashMap`은 `Java 2`에 처음 선보인 `Java Collections Framework에 속한 API`이다. 두 클래스모두 `Map 인터페이스`를 `구현`하고 있기 때문에 제공하는 `기능`을 동일하다.

`HashMap`과 `HashTable`은 정리하면 `key`에 대한 `hash`값을 사용하여 `value`를 `저장`하고 `조회`하며, `key-value 쌍`의 개수에 따라 `동적`으로 크기가 증가하는 `연관배열`이다.

### HashMap과 HashTable의 차이점

 * `HashMap`은 `보조해시`를 사용한다. `보조 해시`를 사용하지 않는 `HashTable`에 비하여 `해시 충돌(hash collision)`이 덜 발생한다.
 * `HashMap`은 `Thread Safe`하지 않지만 `HashTable`은 `Thread Safe`하다.
 * `HashMap`은 `null` `key`를 허용한다. `HashTable`은 허용하지 않는다.
 * `HashMap`은 현재까지도 지속적으로 개선되고 있다.

`Vector`나 `HashTable` 같이 기존에 존재하던 컬렉션 클래스들은 `호환성`을 위해 남겨두었지만 `가능한 사용하지 않는 것`이 바람직하다.

## 해시 분포와 해시 충돌

동일하지 않은 어떤 객체 X와 Y가 있을 때, `X.equals(Y)`가 `false`일 때` X.hashCode() != Y.hashCode()`가 같지 않다면, 이때 사용하는 해시 함수는 `완전한 해시 함수(Perfect Hash Fuction)`이다.

`Boolean`이나 `Integer`, `Long`, `Double`과 같은 Number 객체는 객체가 나타내려는 값을 해시값으로 사용할 수 있기 때문에 `완전한 해시 함수 대상`으로 삼을 수 있다. 하지만 그 밖에 `String`이나` POJO(Plain Old Java Object)`에 대해서는 완전한 해시 함수를 제작하는 것은 힘든 점이 많다.

 1. HashMap은 보통 각 객체의 `hashCode()` 메서드가 반환하는 값을 사용하는데 자료형은 `int`이다. `32bit` 정수형으로 완전한 자료 해시 함수를 만들 수 없다. 생성 가능한 객체의 수가 2<sup>32</sup> 보다 많을 수 있다.

```java
public class Object {
    ...
    public native int hashCode();
    ...
}
```

 2. `O(1)`을 가능하게 하려면 원소가 2<sup>32</sup>인 배열을 모든 HashMap이 가지고 있어야 한다. 이것은 상당한 메모리 낭비이다.

따라서 HashMap을 포함만 많은 해시 함수를 사용하는 associative array 구현체에는 `메모리 절약`을 위해 실제 해시 함수의 표현 정수 범위보다 작은 `M개의 원소`가 있는 배열을 사용한다. 객체에 대한 해시 코드의 나머지 값을 해시 bucket의 `index` 값으로 사용한다.

```java
int index = x.hashCode() % M;
```

위와 같은 방식을 사용하면 서로 다른 해시 코드를 가지는 서로 다른 객체가 1/M의 확률로 같은 해시 bucket을 사용하게 된다. 이것은 `해시 충돌`을 야기한다. 

::: tip POJO
본래 자바의 장점을 살리는 '오래된' 방식의 '순수한' 자바객체.

진정한 POJO란 객체지향적인 원리에 충실하면서, 환경과 기술에 종속되지 않고 필요에 따라 재활용될 수 있는 방식으로 설계된 오브젝트를 말한다. [토비의 스프링]
:::

## 해시 충돌 회피

해시 충돌을 `회피`하여 `key-value`를 적절히 저장하기 위한 방식으로는 대표적으로 `Open Addressing` 방식과` Separate Channing` 방식이 존재한다.

### 1. Open Addressing
value를 삽입하려는 bucket이 이미 사용 중인 경우 추가 메모리를 사용하지 않고 `비어 있는 bucket 공간을 활용`한다. 비어 있는 bucket 공간을 찾기 위한 방법으로는 `Linear Probing`과 `Quadratic Probing`, `Double Hasing Probing` 등이 존재한다.

### 2. Separate Channing
value를 삽입하려는 bucket이 이미 사용 중인 경우 `추가 메모리를 사용`하여 같은 index에 `링크드 리스트`를 활용하여 value를 연결하여 관리한다. 각 배열의 인자는 index가 같은 bucket의 head가 된다. 해시 테이블의 확장이 필요없고 구현이 간단하다.

## Java의 HashMap 해시 충돌 회피

Java의 HashMap은 `Separate Channing`을 활용하여 해시 충돌을 회피한다. 사용하는 이유는 아래와 같다.

1. 삭제처리가 효율적이다. `Open Addressing`의 경우 데이터 삭제를 위해 해시 충돌로 인해 바뀐 index 값을 찾기 위한 `추가적인 시간`이 소요되기 때문이다.
2. 데이터가 많을수록 `Separate Channing`이 빠르다. Open Addressing의 경우 `bucket에 밀도`가 높아질수록 `해시 충돌 발생 가능성`이 더욱 커진다. `Separate Channing`의 경우 해시 충돌이 잘 발생하지 않도록 `조정`만 할 수 있다면 최악의 상황을 모면할 수 있다.

실제 데이터 삽입을 위해 put 메서드의 구현을 살펴보면 Node를 활용하여 `링크드 리스트`와 `트리`를 사용하고 있다.

```java
public class HashMap<K,V> extends AbstractMap<K,V>
    implements Map<K,V>, Cloneable, Serializable {
    ...
    public V put(K key, V value) {
        return putVal(hash(key), key, value, false, true);
    }

    final V putVal(int hash, K key, V value, boolean onlyIfAbsent,
                   boolean evict) {
        Node<K,V>[] tab; Node<K,V> p; int n, i;
        if ((tab = table) == null || (n = tab.length) == 0) // (1)
            n = (tab = resize()).length;
        if ((p = tab[i = (n - 1) & hash]) == null)  // (2)
            tab[i] = newNode(hash, key, value, null);
        else { // (3)
            Node<K,V> e; K k;
            if (p.hash == hash &&
                ((k = p.key) == key || (key != null && key.equals(k)))) // (4)
                e = p;
            else if (p instanceof TreeNode) // (5)
                e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
            else {  // (6)
                for (int binCount = 0; ; ++binCount) {
                    if ((e = p.next) == null) {
                        p.next = newNode(hash, key, value, null);
                        if (binCount >= TREEIFY_THRESHOLD - 1) // -1 for 1st
                            treeifyBin(tab, hash);
                        break;
                    }
                    if (e.hash == hash && // (7)
                        ((k = e.key) == key || (key != null && key.equals(k)))) 
                        break;
                    p = e;
                }
            }
            if (e != null) { // existing mapping for key
                V oldValue = e.value;
                if (!onlyIfAbsent || oldValue == null)
                    e.value = value;
                afterNodeAccess(e);
                return oldValue;
            }
        }
        ++modCount;
        if (++size > threshold)
            resize();
        afterNodeInsertion(evict);
        return null;
    }            
    ...
}
```

(1) map에 최초의 값을 넣는 경우이다.<br>
(2) 해당 index에 처음 들어가는 value인 경우이다. 해당 bucket에 Node를 추가한다.<br>
(3) 해당 index의 bucket이 null이 아닌 경우이다.<br>
(4) 해시가 같고 값도 같은 경우이다.<br>
(5) 해당 노드가 TreeNode인지 확인한다.<br>
(6) TreeNode가 아닌 경우(Linked List)이기 때문에 해당 bucket의 노드들을 순회한다.<br>
(7) 해시가 같고 값도 같은지 확인한다. (6) ~ (7) 과정을 반복한다.<br>

여기서 핵심은 `링크드 리스트`와 `트리`이다. 데이터의 개수가 `일정 이상`일 때에는 링크드 리스트를 사용하는 것 보다 트리를 사용하는 것이 `성능상 이점`이 있다.

링크드 리스트와 트리를 결정하는 기준은 bucket에 할당된 `key-value 쌍의 개수`이다. HashMap에서는 해당 기준을 상수 형태로 제공한다.
```java
public class HashMap<K,V> extends AbstractMap<K,V>
    implements Map<K,V>, Cloneable, Serializable {
        
    ...
    static final int TREEIFY_THRESHOLD = 8;
    static final int UNTREEIFY_THRESHOLD = 6;
    ...
}
```

bucket의 key-value 쌍이 8개면 트리로 변한다. 해당 bucket의 value를 삭제하여 6개가 되면 다시 링크드 리스트로 변경한다. 데이터가 적을 때에는 트리와 링크드 리스트의 수행 시간 차이는 크게 의미 없다. 또한 트리는 링크드 리스트보다 많은 메모리를 사용한다.

6과 8로 2 이상의 차이를 둔 이유는 만약 차이가 1이라면 특정 key-value가 `반복되어 삽입/삭제`되는 경우 불필요한 `트리 <-> 링크드 리스트` 변경이 일어나기 때문이다. 

## TODO

 * bucket 동적 확장에 대해 이해한다.
 * 보조 해시 함수에 대해 이해한다.

## References

[Java HashMap은 어떻게 동작하는가?](https://d2.naver.com/helloworld/831311)<br>
[HashMap은 어떻게 동작할까? + 자바 8에서의 변화](https://woodcock.tistory.com/24)<br>

<TagLinks />