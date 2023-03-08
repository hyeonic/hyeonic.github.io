(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{509:function(t,e,s){"use strict";s.r(e);var a=s(21),r=Object(a.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"git-flow"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#git-flow"}},[t._v("#")]),t._v(" Git-flow")]),t._v(" "),s("p",[t._v("git 브랜치 전략 중 하나이다. 이것은 어떠한 기능을 나타내는 것이 아니라 방법론이다. 각각의 프로젝트와 개발 환경에 따라서 알맞게 수정하여 사용해야 한다.")]),t._v(" "),s("p",[t._v("이 게시글은 git을 알고 사용해 본 경험이 있다는 것을 전제로 작성하였다. 또한 직접 프로젝트에 적용하고 연습하고 있기 때문에 정답이 될 수 없고, 지속적으로 개선할 예정이다.")]),t._v(" "),s("h2",{attrs:{id:"git-repository"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#git-repository"}},[t._v("#")]),t._v(" Git Repository")]),t._v(" "),s("p",[t._v("프로젝트에 적용하기 앞서 어떠한 형태로 Git repository가 구성되는지 살펴보았다.")]),t._v(" "),s("CenterImage",{attrs:{"image-src":"https://blog.kakaocdn.net/dn/dFxyJ2/btq1cag438G/EDqDtWymmPNmOsiiMn8DY0/img.png"}}),t._v(" "),s("h3",{attrs:{id:"upstream-remote-repository"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#upstream-remote-repository"}},[t._v("#")]),t._v(" Upstream Remote Repository")]),t._v(" "),s("p",[t._v("개발자가 공유하는 저장소로 최신 소스코드가 저장되어 있는 원격 저장소이다.")]),t._v(" "),s("h3",{attrs:{id:"적용하기"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#적용하기"}},[t._v("#")]),t._v(" 적용하기")]),t._v(" "),s("p",[t._v("이러한 Remote Repository 생성을 위하여 github에 New organization을 사용하였다.")]),t._v(" "),s("CenterImage",{attrs:{"image-src":"https://blog.kakaocdn.net/dn/HBZOO/btq091L6Upo/Y9Jj7UaaKOGVHx5Iv0MW5k/img.png"}}),t._v(" "),s("p",[t._v("다양한 기능을 제공하는 Team과 Enterprice는 월마다 일정 금액을 사용해야 한다. 하지만 간단한 프로젝트 진행을 위해 생성하였기 때문에 Free만 사용하여도 충분한 실습과 프로젝트를 진행할 수 있다.")]),t._v(" "),s("CenterImage",{attrs:{"image-src":"https://blog.kakaocdn.net/dn/21GLC/btq1dzgwljG/nqOUW4mgFZZfhYFS3W0qDk/img.png"}}),t._v(" "),s("p",[t._v("organization을 생성하게 되면 소속된 repository를 생성할 수 있다. 이것을 "),s("code",[t._v("Upstream Remote Repository")]),t._v("로 적용한다.")]),t._v(" "),s("h3",{attrs:{id:"a-s-b-s-c-s-origin-remote-repository"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#a-s-b-s-c-s-origin-remote-repository"}},[t._v("#")]),t._v(" A's, B's, C's Origin Remote Repository")]),t._v(" "),s("p",[s("code",[t._v("Upstream Repository")]),t._v("를 Fork한 원격 개인 저장소이다. Upstream Repository를 직접 clone하여 작업하는 것이 아니라 각각의 팀원들이 Fork를 하여 원격 저장소를 생성하고 그것을 clone하여 "),s("code",[t._v("Local Repository")]),t._v("를 생성하여 작업한다.")]),t._v(" "),s("p",[t._v("이렇게 두 개의 "),s("code",[t._v("remote repository")]),t._v("로 나눈 이유는 "),s("code",[t._v("Upstream repository")]),t._v("의 경우 팀원이 "),s("code",[t._v("공유")]),t._v("하고 있는 Repository이기 때문에 다양한 시도를 하기에 큰 위험 부담을 가지고 있다. 각자의 개인 repository에서 "),s("code",[t._v("작업을 시도")]),t._v("한 후 적절한 기능 merge 하기 위해 "),s("code",[t._v("Pull Request")]),t._v("를 요청한다.")]),t._v(" "),s("h3",{attrs:{id:"a-s-b-s-c-s-local-repository"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#a-s-b-s-c-s-local-repository"}},[t._v("#")]),t._v(" A's, B's, C's Local Repository")]),t._v(" "),s("p",[t._v("Origin Remote Repository를 clone한 "),s("code",[t._v("local repository")]),t._v("이다. 이곳에서 개발자는 실질적인 작업이 이루어진다. 우선 작업을 진행하기 위해서는 Upstream Remote Repository의 최신 코드를 "),s("code",[t._v("pull")]),t._v(" 해야 한다.")]),t._v(" "),s("h3",{attrs:{id:"운영-방식"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#운영-방식"}},[t._v("#")]),t._v(" 운영 방식")]),t._v(" "),s("p",[t._v("git-flow는 총 5가지의 브랜치를 사용하여 운영한다.")]),t._v(" "),s("ul",[s("li",[s("code",[t._v("main")]),t._v(": 제품으로 출시될 수 있는 브랜치")]),t._v(" "),s("li",[s("code",[t._v("develop")]),t._v(": 다음 출시 버전을 개발하는 브랜치")]),t._v(" "),s("li",[s("code",[t._v("feature")]),t._v(": 기능을 개발하는 브랜치")]),t._v(" "),s("li",[s("code",[t._v("release")]),t._v(": 이번 출시 버전을 준비하는 브랜치")]),t._v(" "),s("li",[s("code",[t._v("hotfix")]),t._v(": 출시 버전에서 발생한 버그를 수정하는 브랜치")])]),t._v(" "),s("CenterImage",{attrs:{"image-src":"https://blog.kakaocdn.net/dn/oROvr/btq1bgofh0l/TELkQVigKETALiJmAJ7Qp1/img.png"}}),t._v(" "),s("p",[s("code",[t._v("main")]),t._v("과 "),s("code",[t._v("develop")]),t._v(" 브랜치이다. 두 브랜치는 항시 운영되어야 하는 브랜치이다. "),s("code",[t._v("develop")]),t._v("는 개발을 위한 브랜치이고, "),s("code",[t._v("main")]),t._v("은 제품으로 출시될 수 있는 브랜치 이기 때문에 "),s("code",[t._v("항시 배포 가능한 상태")]),t._v("이어야 한다.")]),t._v(" "),s("p",[s("code",[t._v("main")]),t._v("과 "),s("code",[t._v("develop")]),t._v("는 "),s("code",[t._v("Upstream remote repository")]),t._v("에서 운영한다.")]),t._v(" "),s("CenterImage",{attrs:{"image-src":"https://blog.kakaocdn.net/dn/RFvE3/btq1at2Ko3L/7ETdh9t7aS9k85Ve2eUG60/img.png"}}),t._v(" "),s("p",[s("code",[t._v("feature")]),t._v(" 브랜치는 단위 기능을 개발하는 브랜치이다. 기능 개발이 완료되면 "),s("code",[t._v("develop")]),t._v(" 브랜치와 합쳐진다.")]),t._v(" "),s("p",[s("code",[t._v("develop")]),t._v("와 "),s("code",[t._v("merge")]),t._v(" 된다. 하지만 "),s("code",[t._v("develop")]),t._v("는 모든 팀원이 "),s("code",[t._v("공유")]),t._v("하는 브랜치이다. "),s("code",[t._v("feature")]),t._v("는 각자 맡아 작성한 코드들이 들어 있는 브랜치이다. "),s("code",[t._v("merge")]),t._v(" 작업 전에 팀원들 간의 지속적인 "),s("code",[t._v("코드 리뷰")]),t._v("가 필요하다.")]),t._v(" "),s("p",[t._v("그렇기 때문에 "),s("code",[t._v("Pull Request")]),t._v("를 사용하여 "),s("code",[t._v("merge")]),t._v(" 작업 전 리뷰어들에게 코드 리뷰를 받고 반영 사항을 수정하여 commit 후 merge 한다. 협업에서 가장 중요한 부분이라고 생각된다.")]),t._v(" "),s("CenterImage",{attrs:{"image-src":"https://blog.kakaocdn.net/dn/MI6gy/btq09Z1TnXW/76Jz51Sjqu7LSkN1tlr8k1/img.png"}}),t._v(" "),s("p",[s("code",[t._v("release")]),t._v(" 브랜치는 배포를 하기 전에 충분한 검증을 위해 생성하는 브랜치이다. 배포 가능한 상태가 되면 "),s("code",[t._v("main")]),t._v(" 브랜치로 "),s("code",[t._v("merge")]),t._v(" 작업을 거친다. 또한 "),s("code",[t._v("develop")]),t._v("에도 반영사항을 모두 "),s("code",[t._v("merge")]),t._v(" 시켜야 한다.")]),t._v(" "),s("CenterImage",{attrs:{"image-src":"https://blog.kakaocdn.net/dn/bHF4js/btq1bgofBKb/PDtnmRLyq7MqOJKxT6Rqe1/img.png"}}),t._v(" "),s("p",[s("code",[t._v("hotifx")]),t._v(" 브랜치는 배포 중 버그가 생겨 긴급하게 수정해야 하는 브랜치이다. 배포 이후에 이루어지는 브랜치이고, 반영 사항을 "),s("code",[t._v("main")]),t._v("과 "),s("code",[t._v("develop")]),t._v("에 모두 적용 시켜야 한다.")]),t._v(" "),s("p",[t._v("앞서 말했듯이 "),s("code",[t._v("main")]),t._v("과 "),s("code",[t._v("develop")]),t._v("는 항시 운영되는 브랜치이다. 이 둘을 제외한 나머지 브랜치 들은 제 역할이 마무리 되어 "),s("code",[t._v("merge")]),t._v(" 작업이 완료되면 브랜치를 삭제하여 정리한다.")]),t._v(" "),s("h2",{attrs:{id:"간단히-적용해보기"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#간단히-적용해보기"}},[t._v("#")]),t._v(" 간단히 적용해보기")]),t._v(" "),s("p",[s("code",[t._v("Upstream Remote Repository")]),t._v("를 기반으로 원격 개인 저장소에 Fork 해야 한다.")]),t._v(" "),s("CenterImage",{attrs:{"image-src":"https://blog.kakaocdn.net/dn/8hhw8/btq2gwYT6xg/yktYajybVuSkYjjEiNDsCK/img.png"}}),t._v(" "),s("p",[t._v("Organization에 생성한 repository에 Fork를 누르면 손쉽게 할 수 있다. Fork로 생성된 repository를 기반으로 "),s("code",[t._v("Local Repository")]),t._v("를 생성해야 한다.")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" clone https://github.com/"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("개인 github 이름"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("/"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("repository 이름"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(".git\n")])])]),s("p",[t._v("git clone을 사용하여 원격 저장소에 있는 repository를 손쉽게 clone할 수 있다.")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" remote -v\n\norigin  https://github.com/"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("github 사용자 이름"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("/"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("repository 이름"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(".git "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("fetch"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\norigin  https://github.com/"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("github 사용자 이름"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("/"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("repository 이름"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(".git "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("push"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("p",[t._v("clone 받은 local repository를 "),s("code",[t._v("git remote -v")]),t._v("로 확인해보면 원격 저장소가 등록되어 있는 것을 확인 할 수 있다. 매번 최신 코드를 pull 받기 위해서는 "),s("code",[t._v("Upstream을 등록")]),t._v("해야 한다.")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" remote "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" upstream https://github.com/"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("organization 이름"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("/"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("repository 이름"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(".git\n\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" remote -v\n\norigin  https://github.com/"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("github 사용자 이름"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("/"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("repository 이름"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(".git "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("fetch"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\norigin  https://github.com/"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("github 사용자 이름"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("/"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("repository 이름"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(".git "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("push"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nupstream        https://github.com/"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("organization 이름"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("/"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("repository 이름"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(".git\nupstream        https://github.com/"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("organization 이름"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("/"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("repository 이름"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(".git\n")])])]),s("p",[s("code",[t._v("git remote add upstream")]),t._v("을 통하여 upstream을 등록한다. 정상적으로 등록 된 것을 확인할 수 있다. 이제 작업할 때 마다 브랜치를 생성하고 최신 코드를 pull 받아야 한다.")]),t._v(" "),s("p",[t._v("우리 팀원은 각각 개발해야 하는 기능을 github issue에 등록한 후 등록 번호를 기반으로 브랜치를 생성하기로 하였다.")]),t._v(" "),s("p",[t._v("우선 간단한 예시를 위하여 이슈를 등록한다.")]),t._v(" "),s("CenterImage",{attrs:{"image-src":"https://user-images.githubusercontent.com/59357153/177022248-c9ae3b0e-8d20-45b0-a5c2-2681bfe8ad1d.png"}}),t._v(" "),s("p",[t._v("3번 번호가 부여된 이슈라고 가정한다. 해당 번호를 기반으로 "),s("code",[t._v("local respository")]),t._v("에서 feature 브랜치를 생성한다.")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" branch feature/3-init-setting\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" checkout feature/3-init-setting\n")])])]),s("p",[t._v("이제 Upstream에 있는 remote repository에서 최신 소스코드를 받아 와야 한다.")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" fetch upstream\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" rebase upstream/develop\n")])])]),s("p",[t._v("git pull을 사용하여 등록한 upstream develop에서 commit 기록을 병합한다. 이제 신나게 작업을 진행하고 자신의 원격 저장소인 "),s("code",[t._v("Origin remote repository")]),t._v("에 push한다.")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push origin feature/3-init-setting\n")])])]),s("p",[t._v("그렇게 github repository를 살펴보면 "),s("code",[t._v("변경을 감지")]),t._v("하고 pull request를 생성할 것인지에 대한 탭을 확인할 수 있다.")]),t._v(" "),s("CenterImage",{attrs:{"image-src":"https://user-images.githubusercontent.com/59357153/177022352-c9d49166-d6a5-4418-9193-38849399a781.png"}}),t._v(" "),s("p",[t._v("이제 fork한 개인 원격 저장소를 살펴보면 새롭게 작성한 브랜치를 감지하고 pull request 작성을 위한 버튼이 생성된다.")]),t._v(" "),s("CenterImage",{attrs:{"image-src":"https://user-images.githubusercontent.com/59357153/177022396-7f2b4f29-d717-4763-815d-c39688a10164.png"}}),t._v(" "),s("p",[s("code",[t._v("feature/3-init-setting")]),t._v(" 브랜치를 develop에 merge하기 위한 pull request를 진행하는 예시이다. 작성한 코드를 리뷰해줄 팀원들을 선택하고, commit한 코드의 내용을 간단히 요약하여 작성한다. 이제 생성한 PR을 기반으로 "),s("code",[t._v("코드리뷰")]),t._v("를 진행한다. 변경 사항이 적용되면 develop에 반영하기 위해 merge한다.")]),t._v(" "),s("h2",{attrs:{id:"고민-사항"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#고민-사항"}},[t._v("#")]),t._v(" 고민 사항")]),t._v(" "),s("p",[t._v("만약 작업 하던 중 다른 팀원이 Pull Request를 진행하였고, develop 브랜치가 최신화 되면 기존에 작업 하던 브랜치는 어떻게 해야 깔끔한 그래프를 유지할 수 있을까?")]),t._v(" "),s("p",{attrs:{align:"center"}},[s("img",{attrs:{src:"https://blog.kakaocdn.net/dn/Z3nNY/btq09x5At2x/d1V0EEek0n5fexyYk4AVHk/img.png"}})]),t._v(" "),s("p",[t._v("팀원 A와 팀원 B가 있다고 가정한다. 둘 다 develop의 같은 시점에 브랜치를 생성하여 작업을 진행하였다. 팀원 A의 기능 구현이 모두 끝난 후 pull request가 진행되고 develop에 성공적으로 merge 되었다. develop 브랜치와 팀원 B가 작업하던 시점과 달라진 것이다.")]),t._v(" "),s("p",[t._v("그렇기 때문에 merge 작업 시 높은 확률로 충돌이 일어날 것이다. 이러한 충돌을 해결하기 위해 local에서 merge 작업을 거치고 난 후 계속 작업을 이어 나가야 한다.")]),t._v(" "),s("CenterImage",{attrs:{"image-src":"https://blog.kakaocdn.net/dn/Dp8nE/btq1asQiCGS/tG03AIMvSbXkS00RT5PLC1/img.png"}}),t._v(" "),s("p",[t._v("매번 팀원들의 pull request가 있을 때마다 자신이 작업하던 branch를 develop 코드를 최신화 시키기 위해서는 처음 브랜치를 생성했을 때와 마찬가지로 간단히 git 명령어를 작성하면 된다.")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" fetch upstream\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" rebase upstream/dev\n")])])]),s("p",[t._v("각자 local repository에서 적절하게 "),s("code",[t._v("충돌을 해결")]),t._v("하여 최신 코드를 반영한다.")]),t._v(" "),s("p",[t._v("그 다음 -f를 사용하여 강제로 remote repository에 push 하여 그래프를 정리한다.")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push origin -f feature/"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("issue 번호"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("upstream repository의 그래프를 살펴보면 보기 좋게 정렬된 것을 확인할 수 있다!")]),t._v(" "),s("p",{attrs:{align:"center"}},[s("img",{attrs:{src:"https://blog.kakaocdn.net/dn/K8scB/btq21CYkwtq/uw2oEK1ukco1tjFUjTE5DK/img.png"}})]),t._v(" "),s("h2",{attrs:{id:"정리"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#정리"}},[t._v("#")]),t._v(" 정리")]),t._v(" "),s("p",[t._v("지금까지 간단힌 "),s("code",[t._v("git-flow")]),t._v("의 흐름에 대해 알아보았다. git-flow를 활용하면 부가적인 브랜치가 늘어나 관리에 대한 부담감을 느낄 수 있다. 하지만 upstream과 origin을 분리한 환경은 좀 더 도전적인 과제들을 적용하기에 매우 좋은 환경을 구성해준다. 또한 여러 사람이 팀 프로젝트를 진행하기 때문에 원할한 협업을 위해서는 코드 리뷰를 진행해야 한다. pull request를 활용하면 코드 리뷰를 지속적으로 진행할 수 있으며 다양한 사람들의 의견을 나눌 수 있다.")]),t._v(" "),s("h2",{attrs:{id:"references"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#references"}},[t._v("#")]),t._v(" References.")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://woowabros.github.io/experience/2017/10/30/baemin-mobile-git-branch-strategy.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("우린 Git-flow를 사용하고 있어요"),s("OutboundLink")],1),s("br"),t._v(" "),s("a",{attrs:{href:"https://velog.io/@trequartista/TIL-GIT-FLOW",target:"_blank",rel:"noopener noreferrer"}},[t._v("GIT-FLOW"),s("OutboundLink")],1),s("br"),t._v(" "),s("a",{attrs:{href:"https://jybaek.tistory.com/775",target:"_blank",rel:"noopener noreferrer"}},[t._v("fork repository 최신 버전으로 유지하기"),s("OutboundLink")],1)]),t._v(" "),s("TagLinks")],1)}),[],!1,null,null,null);e.default=r.exports}}]);