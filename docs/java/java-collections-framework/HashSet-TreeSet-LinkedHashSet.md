---
title: HashSet, TreeSet, LinkedHashSet
tags: ['java', 'HashSet', 'TreeSet', 'LinkedHashSet']
---

# HashSet, TreeSet, LinkedHashSet

## Set 이란

Java 컬렉션 프레임워크 중 하나인 Set은 `순서가 없는 데이터의 집합`이다. 또한 데이터의 중복을 허용하지 않는다.

Set 인터페이스를 구현한 클래스로는 대표적으로 `HashSet`, `TreeSet`, `LinkedHashSet`이 존재한다. 

## HashSet

HashMap을 활용하여 구현하였다. 데이터를 중복 저장할 수 없고 순서를 보장하지 않는다. 데이터의 중복 저장을 막기 위해서는 `equals`와 `hashCode`를 오버라이딩 해야 한다.

## TreeSet

이진 탐색 트리의 형태로 데이터를 저장한다. 데이터 추가 및 삭제에는 많은 시간이 걸리지만 트리의 특성상 검색과 정렬이 빠르게 진행된다. 

## LinkedHashSet

HashSet 클래스를 상속하였다. 추가적으로 데이터의 삽입된 순서대로 관리한다.

<TagLinks />