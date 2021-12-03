---
title: git rebase
tags: ['git', 'rebase']
---

# git rebase

`우아한테크코스 프리코스` 진행 중 소스 코드가 수정되어 `upstream`에서 소스코드를 받아 병합해야 하는 상황이 생겼다.

`rebase`는 말 그대로 `베이스`를 재배치하는 것이다. 새롭게 베이스를 다시 정의함으로써 깔끔한 `커밋 히스토리`를 정리할 수 있다.

`upstream repository`에서 `fork`를 받아 `remote repository`에서 `local`로 `clone`했다고 가정한다.

```bash
$ git remote -v
origin  https://github.com/hyeonic/java-racingcar-precourse.git (fetch)
origin  https://github.com/hyeonic/java-racingcar-precourse.git (push)
upstream        https://github.com/woowacourse/java-racingcar-precourse.git (fetch)
upstream        https://github.com/woowacourse/java-racingcar-precourse.git (push)
```

## 1. 등록된 upstream repository에서 최신 소스코드를 받아온다.
```bash
$ git fetch upstream
$ git rebase upstream/main
```

위 같이 git 명령어를 실행하면 커밋 히스토리가 새롭게 재배치되어 소스코드가 병합된다. 

## 2. remote repository에 push

잘 정돈된 브랜치를 `push`한다. 하지만 `remote repository`와 서로 다른 커밋 히스토리를 가지고 있기 때문에 `-f`를 활용하여 강제로 반영한다.

```bash
$ git push origin hyeonic -f
```

<TagLinks />