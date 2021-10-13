---
title: Database Transaction
tags: ['database', 'transaction']
---

# Database Transaction

## 트랜잭션이란?

트랜잭션은 데이터베이스 상태를 변환시키는 하나의 논리적 기능 수행 단위이다. 한 번에 수행되어야 하는 일련의 연산이기 때문에 논리적인 작업을 모두 완벽하게 처리하거나 처리하지 못할 경우에는 원 상태로 복구해서 작업의 일부만 적용되는 현상이 발생하지 않게 만들어준다.

작업의 단위는 질의어 한 문장이 아니다. 작업의 단위는 사용자가 정하는 기준에 따라 달라질 수 있다.

## 트랜잭션의 특성

트랜잭션은 ACID라고 하는 4 가지 특성을 만족해야 한다.

### Atomicity 원자성
트랜잭션 수행 중간에 어떠한 문제가 발생한다면 트랜잭션에 해당하는 어떠한 작업 내용도 수행되어서는 안된다. 트랜잭션은 모두 반영되거나 아니면 전혀 반영되지 않아야 한다.

### Consistency 일관성
트랜잭션이 실행을 성공적으로 완료하면 일관성 있는 데이터베이스 상태로 유지해야 한다. 만약 무결성 제약을 위반하는 데이터가 있다면 트랜잭션은 중단된다.

### Isolation 고립성
트랜잭션 수행 시 다른 트랜잭션의 연산 작업이 끼어들지 못하도록 보장해야 한다. 어떤 연산도 중간 단계의 데이터를 볼 수 없고 개입할 수 없다.

### Durability 지속성
성공적으로 수행된 트랜잭션은 데이터베이스에 영원히 반영되어야 한다. 시스템에 문제가 발생하거나 종료되더라도 데이터베이스에 반영된 값은 유지되어야 한다.

## 트랜잭션의 상태

<p align=center>
    <img src=https://user-images.githubusercontent.com/59357153/137119130-7df668ef-8684-49f3-9b71-07592c6b3740.png>
</p>

### Active
트랜잭션의 활동 상태이다. 트랜잭션이 실행중인 상태를 말한다.

### Partially Commited
마지막 연산이 실행된 직후의 상태이다. 연산은 모두 처리했지만 데이터베이스에 반영되지 않은 상태이다.

### Commited
트랜잭션이 성공적으로 완료되여 Commit한 상태이다.

### Faild
장애가 발생하여 트랜잭션이 중단된 상태이다. 더 이상 정상적으로 진행할 수 없는 상태이다.

### Aborted
수행에 실패하여 Rollback 연산을 실행한 상태이다. 트랜잭션이 취소되고 트랜잭션 실행 이전 데이터로 돌아간 상태이다.

## 트랜잭션 사용 시 주의할 점
트랜잭션은 꼭 필요한 최소의 코드에만 적용하는 것이 좋다. 일반적으로 데이터베이스의 커넥션의 개수는 제한적이다. 이러한 트랜잭션이 커넥션을 소유하는 시간이 길어지면 여유 커넥션의 개수는 줄어들기 때문에 각 단위 프로그램은 커넥션 차지를 위해 기다려야 하는 상황이 발생할 수 있다.

## Reference

[Transaction](https://github.com/JaeYeopHan/Interview_Question_for_Beginner/tree/master/Database)<br>
[Database Transaction](https://tecoble.techcourse.co.kr/post/2021-07-11-database-transaction/)<br>
[ACID](https://ko.wikipedia.org/wiki/ACID)

<TagLinks />