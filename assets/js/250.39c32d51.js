(window.webpackJsonp=window.webpackJsonp||[]).push([[250],{726:function(t,s,a){"use strict";a.r(s);var e=a(21),n=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"chapter02-객체지향"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#chapter02-객체지향"}},[t._v("#")]),t._v(" chapter02 객체지향")]),t._v(" "),a("CenterImage",{attrs:{"image-src":"https://user-images.githubusercontent.com/59357153/152970395-a31c8134-fc89-449f-b4dc-441e03df929c.png"}}),t._v(" "),a("h2",{attrs:{id:"목표"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#목표"}},[t._v("#")]),t._v(" 목표")]),t._v(" "),a("p",[t._v("개발자가 반드시 정복해야 할 객체 지향과 디자인 패턴 스터디를 진행하며 공부한 내용을 정리한다.")]),t._v(" "),a("h2",{attrs:{id:"_1-시작은-절차-지향"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-시작은-절차-지향"}},[t._v("#")]),t._v(" 1. 시작은 절차 지향")]),t._v(" "),a("p",[t._v("초기의 프로그래밍은 절차 지향적 프로그래밍 방식을 활용했다. 절차 지향 프로그래밍은 소프트웨어를 구성하는 데이터와 데이터를 조작하는 코드를 별도로 분리한 "),a("code",[t._v("함수")]),t._v(" 혹은 "),a("code",[t._v("프로시저")]),t._v("의 형태로 만들어 작성하고 있다.")]),t._v(" "),a("p",[t._v("이것을 그림으로 표현하면 아래와 같다.")]),t._v(" "),a("CenterImage",{attrs:{"image-src":"https://user-images.githubusercontent.com/59357153/155884475-33a84525-c6e7-4511-8c55-ae0fa6ea46d6.png"}}),t._v(" "),a("p",[t._v("이러한 절차 지향은 결국 "),a("code",[t._v("데이터가 중심")]),t._v("이 되어 구성된다. 또한 여러 "),a("code",[t._v("프로시저")]),t._v("에서 데이터를 공유하여 사용하고 있다. 마치 "),a("code",[t._v("데이터")]),t._v("와 "),a("code",[t._v("프로시저")]),t._v("가 풀어지지 않는 "),a("code",[t._v("강한 결합으로 연결")]),t._v("되어 있는 형태처럼 보인다.")]),t._v(" "),a("p",[t._v("만약 수정된 요구사항으로 인해 데이터 4의 타입을 변경한다고 가정한다. 해당 데이터를 사용하고 있는 "),a("code",[t._v("프로시저 4, 5, 6번")]),t._v("을 "),a("code",[t._v("연쇄적으로 점검")]),t._v("해야 한다. 현재는 간단한 그림으로 표현하여 작아 보이지만 프로그램의 규모가 커질 수록 이러한 문제는 "),a("code",[t._v("더 큰 파급력")]),t._v("을 가져오고 해당 데이터를 서로 다른 의미로 사용할 가능성이 높아진다.")]),t._v(" "),a("CenterImage",{attrs:{"image-src":"https://user-images.githubusercontent.com/59357153/155884495-c3e83b0c-509f-4d4a-b55d-6d27b6f4f03f.png"}}),t._v(" "),a("p",[t._v("결국 절차 지향은 변화하는 요구사항에 유연하게 대처할 수 없기 때문에 코드 수정을 어렵게 만든다. 어려운 코드 수정은 많은 개발 비용을 동반한다.")]),t._v(" "),a("h2",{attrs:{id:"_2-객체-지향의-등장"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-객체-지향의-등장"}},[t._v("#")]),t._v(" 2. 객체 지향의 등장")]),t._v(" "),a("p",[t._v("이러한 절차 지향의 단점을 극복하기 위해 객체를 지향하는 개발 방법론인 객체 지향이 등장한다.")]),t._v(" "),a("p",[t._v("객체 지향은 객체가 중심이 되어 객체 간의 협력을 통해 프로그램을 구성한다. 객체 지향은 객체 별로 "),a("code",[t._v("데이터를 나타내는 속성")]),t._v("과 "),a("code",[t._v("프로시저를 나타내는 행위")]),t._v("로 구성되어 있는데, 각각의 객체는 "),a("code",[t._v("자신의 책임")]),t._v("에 맞게 "),a("code",[t._v("데이터와 행위")]),t._v("를 정의해야 한다. 이러한 방법은 절차 지향에 비해 언제 변경 될지 모르는 요구사항을 반영하기 위해 "),a("code",[t._v("복잡한 설계와 구조를 동반")]),t._v("한다.")]),t._v(" "),a("CenterImage",{attrs:{"image-src":"https://user-images.githubusercontent.com/59357153/155884522-2c453e24-7e38-43ad-a414-22111e4d059f.png"}}),t._v(" "),a("p",[t._v("객체 지향 구조는 아주 큰 장점을 가지고 있다.")]),t._v(" "),a("p",[t._v("만약 객체 3의 데이터의 타입이 변경 되었다고 가정한다. 이러한 변화는 객체 3 내부에서만 영향을 끼치도록 구성해야 하기 때문에 다른 객체에게 변화의 책임을 나누지 않는다. 즉 "),a("code",[t._v("잘 설계된 객체")]),t._v("는 변화에 대응하기 쉽기 때문에 "),a("code",[t._v("큰 유연함을 제공")]),t._v("하고 있다.")]),t._v(" "),a("h2",{attrs:{id:"_3-객체는-책임을-가진다"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-객체는-책임을-가진다"}},[t._v("#")]),t._v(" 3. 객체는 책임을 가진다.")]),t._v(" "),a("p",[t._v("객체 지향은 기능을 제공하는 여러 객체 들이 모여 하나의 프로그램을 구성한다. 각각의 객체는 책임을 가지고 있다. 이러한 책임은 필요한 기능 목록을 정리한 뒤 적절히 부여해야 한다. 한 가지 주의해야 할 점은 "),a("code",[t._v("객체가 갖는 책임의 크기가 작을 수록 좋다")]),t._v("는 것이다.")]),t._v(" "),a("p",[t._v("아래는 이전 자동차 미션을 해결하기 위해 객체에게 책임을 부여한 뒤 그에 따른 크기를 비교한 것이다.")]),t._v(" "),a("CenterImage",{attrs:{"image-src":"https://user-images.githubusercontent.com/59357153/155884540-08361abd-c2ae-4b48-b7df-77428b6de4ee.png"}}),t._v(" "),a("p",[t._v("만약 모든 책임이 "),a("code",[t._v("Application")]),t._v("에 있다면 많은 정보인 "),a("code",[t._v("데이터를 공유해서 사용")]),t._v("하기 때문에 절차 지향에 가까워 진다. 하지만 각각의 객체에게 "),a("code",[t._v("적절히 책임을 분담한 뒤 메시지를 통해 협력")]),t._v("을 이루면 기능의 세부 내용이 변경될 때 "),a("code",[t._v("변경해야 하는 부분을 책임을 가진 한 곳으로 집중")]),t._v("할 수 있다.")]),t._v(" "),a("p",[t._v("정리하면 앞서 언급한 것 처럼 "),a("code",[t._v("책임의 크기가 작을 수록 변경에 대한 유연함을 얻을 수 있다.")]),t._v(" 이에 대한 자세한 예제는 후에 진행되는 "),a("code",[t._v("단일 책임 원칙(SRP)")]),t._v("에서 확인할 수 있다.")]),t._v(" "),a("h2",{attrs:{id:"_4-객체간의-의사소통"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-객체간의-의사소통"}},[t._v("#")]),t._v(" 4. 객체간의 의사소통")]),t._v(" "),a("p",[t._v("객체는 "),a("code",[t._v("메시지 전송")]),t._v("을 통해 의사소통한다. 객체는 제공된 인터페이스의 오퍼레이션을 호출하는 것을 "),a("code",[t._v("메시지 전송")]),t._v("이라고 표현한다.")]),t._v(" "),a("p",[t._v("아래 Car의 move 메서드는 이동 전략에게 이동 여부를 물어보기 위해 메시지를 전송하고 있다.")]),t._v(" "),a("div",{staticClass:"language-java extra-class"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Car")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("final")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("MovingStretagy")]),t._v(" movingStretagy"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("move")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// movingStretagy가 참조하는 객체에게 메시지 전송")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("movingStretagy"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("isMovable")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            position"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h2",{attrs:{id:"_5-객체는-협력을-통해-의존성을-가진다"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-객체는-협력을-통해-의존성을-가진다"}},[t._v("#")]),t._v(" 5. 객체는 협력을 통해 의존성을 가진다.")]),t._v(" "),a("p",[t._v("각각의 객체는 "),a("code",[t._v("다른 객체를 생성")]),t._v("하거나 "),a("code",[t._v("메서드를 호출(메시지 요청)")]),t._v("하여 "),a("code",[t._v("협력")]),t._v("을 이룬다. 이러한 협력은 "),a("code",[t._v("객체 간의 의존성")]),t._v("을 가졌다고 표현한다.")]),t._v(" "),a("p",[t._v("아래 그림을 살펴보면 RacingCarController는 Domain에 해당하는 Cars와 Count에게 메시지를 요청하기 때문에 "),a("code",[t._v("RacingCarController")]),t._v("가 "),a("code",[t._v("Cars와 Count에 의존")]),t._v("한다고 표현할 수 있다.")]),t._v(" "),a("CenterImage",{attrs:{"image-src":"https://user-images.githubusercontent.com/59357153/155884568-eada3028-2746-4c38-9716-26cbdc5f4294.png"}}),t._v(" "),a("p",[t._v("이러한 의존성은 "),a("code",[t._v("의존하는 객체가 변하면 본인도 함께 변경될 가능성이 있다")]),t._v("는 것을 내포한다.")]),t._v(" "),a("p",[t._v("의존성은 꼬리에 꼬리를 문 것처럼 "),a("code",[t._v("전파되는 특성")]),t._v("이 있다. 아래와 같이 "),a("code",[t._v("독립된 Car를 나타내는 Car의 변경")]),t._v("은 의존하고 있는 "),a("code",[t._v("Cars와 RacingCarController에 영향")]),t._v("을 끼칠 가능성이 있다.")]),t._v(" "),a("CenterImage",{attrs:{"image-src":"https://user-images.githubusercontent.com/59357153/155884604-c0eb0e5e-fc05-49e4-9e8e-d08da3a06898.png"}}),t._v(" "),a("p",[t._v("특히 이러한 의존이 순환해서 발생할 경우 "),a("code",[t._v("순환 의존")]),t._v("이 발생한다. 결국 변경에 대한 파급력이 "),a("code",[t._v("나비효과")]),t._v(" 처럼 자신에게 돌아올 수 있다.")]),t._v(" "),a("p",[t._v("한 예시로 MVC 패턴 중 "),a("code",[t._v("Domain에서 출력과 관련된 메시지를 View에게 전송")]),t._v("과 동시에 "),a("code",[t._v("View에서 Domain 내부의 비즈니스 로직 실행을 위해 메시지를 전송")]),t._v("할 경우 서로 순환 참조하게 되어 "),a("code",[t._v("변경에 매우 취약한 구조")]),t._v("가 된다. 이러한 순환 의존이 발생하지 않도록 하는 원칙 중 하나로 "),a("code",[t._v("의존 역전 원칙(DIP)")]),t._v("이 있다. 이에 대한 내용은 후에 진행되는 발표에서 확인할 수 있을 것이다.")]),t._v(" "),a("CenterImage",{attrs:{"image-src":"https://user-images.githubusercontent.com/59357153/155884617-27fa516d-e4f4-4885-8ba7-cf96075cc6c2.png"}}),t._v(" "),a("p",[t._v("의존을 정리하면 아래와 같다.")]),t._v(" "),a("ul",[a("li",[t._v("내가 변경되면 "),a("code",[t._v("나에게 의존하고 있는 코드에 영향")]),t._v("을 준다.")]),t._v(" "),a("li",[t._v("나의 요구가 변경되면 "),a("code",[t._v("내가 의존하고 있는 타입에 영향")]),t._v("을 준다.")])]),t._v(" "),a("h2",{attrs:{id:"_6-캡슐화"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_6-캡슐화"}},[t._v("#")]),t._v(" 6. 캡슐화")]),t._v(" "),a("p",[t._v("객체 지향의 가장 큰 장점은 한 곳의 구현 변경이 다른 곳에 변경을 가하지 않도록 해준다. 객체 지향은 캡슐화를 통해 한 곳의 변화가 다른 곳에 미치는 영향을 최소화 할 수 있다.")]),t._v(" "),a("p",[t._v("캡슐화는 객체가 내부적으로 기능을 어떻게 구현 했는지 감추는 것이다.")]),t._v(" "),a("div",{staticClass:"language-java extra-class"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Car")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" position"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n\t\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getName")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t\t\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n\t\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setName")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t\t\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n\t\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getPosition")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t\t\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("position"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n\t\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setPosition")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" position"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t\t\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("position "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" position"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("위 코드는 언뜻보면 "),a("code",[t._v("private")]),t._v("으로 객체의 속성을 숨기는 것 처럼 보이지만 "),a("code",[t._v("getter/setter")]),t._v("로 인해 모든 정보를 오픈한 상태이다. 즉 캡슐화가 전혀 이루어지고 있지 않다.")]),t._v(" "),a("p",[t._v("객체를 캡슐화 시키기 위해서는 내부 기능이 어떻게 동작 되는지 숨겨야 한다. 예를들어 Car의 위치를 비교한다고 가정한다. 이것을 이루기 위해서는 "),a("code",[t._v("getPostion()")]),t._v("을 활용하여 객체 외부에서 비교하기 보다 "),a("code",[t._v("Car 객체에게 같은 위치인지 물어보는 것")]),t._v("이 바람직하다.")]),t._v(" "),a("div",{staticClass:"language-java extra-class"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Car")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" position"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n\t\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("\n\n\t\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("boolean")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("isSame")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" position"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t\t\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("position "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" position"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h3",{attrs:{id:"_6-1-캡슐화를-위한-두-가지-규칙"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_6-1-캡슐화를-위한-두-가지-규칙"}},[t._v("#")]),t._v(" 6.1 캡슐화를 위한 두 가지 규칙")]),t._v(" "),a("p",[t._v("이러한 캡슐화를 이루기 위해 도움이 되는 두 개의 규칙이 존재한다.")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("Tell, Don’t Ask")]),t._v(": 데이터를 물어보지 않고 기능을 실행해 달라고 말하라.")]),t._v(" "),a("li",[a("code",[t._v("데미테르의 법칙(디미터 법칙 Law of Demeter)")]),t._v(":\n"),a("ul",[a("li",[t._v("메서드에서 생성한 객체의 메서드만 호출한다.")]),t._v(" "),a("li",[t._v("파라미터로 받은 객체의 메서드만 호출한다.")]),t._v(" "),a("li",[t._v("필드로 참조하는 객체의 메서드만 호출한다.")])])])]),t._v(" "),a("p",[t._v("위와 같은 규칙을 잘 지키면 데이터 중심이 아닌 "),a("code",[t._v("기능 중심의 코드")]),t._v("를 작성하도록 유도하기 때문에 기능 구현의 캡슐화를 향상 시켜 준다.")]),t._v(" "),a("h2",{attrs:{id:"_7-객체-지향-설계-과정"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_7-객체-지향-설계-과정"}},[t._v("#")]),t._v(" 7. 객체 지향 설계 과정")]),t._v(" "),a("ol",[a("li",[t._v("제공해야 할 기능을 찾고 또는 세분화한다. 그 기능을 알맞은 객체에게 할당한다.\n"),a("ul",[a("li",[t._v("기능을 구현하는데 필요한 데이터를 객체에 추가한다. 객체에 데이터를 먼저 추가하고 그 데이터를 이용하는 기능을 넣을 수 있다.")]),t._v(" "),a("li",[t._v("기능은 최대한 캡슐화해서 구현한다.")])])]),t._v(" "),a("li",[t._v("객체 간에 어떻게 메시지를 주고받을 지 결정한다.")]),t._v(" "),a("li",[t._v("과정1과 과정2를 개발하는 동안 지속적으로 반복한다.")])]),t._v(" "),a("p",[t._v("이것은 우리가 미션을 해결할 때 필요한 요구사항을 정리하는 것부터가 객체 지향을 설계하는 기본이 된다. 아래는  실제 미션을 진행할 때 작성한 예시이다.")]),t._v(" "),a("CenterImage",{attrs:{"image-src":"https://user-images.githubusercontent.com/59357153/155884640-36365807-c5d0-4735-a170-82d9b98e5b2e.png"}}),t._v(" "),a("p",[t._v("객체 설계는 한 번에 완성되지 않고 구현을 진행해가며 점진적으로 완성된다. 그렇기 때문에 가장 핵심이 되는 것은 변경에 유연한 구조를 갖도록 노력해야 한다. 캡슐화도 유연함을 제공해주는 기법 중 하나이다.")]),t._v(" "),a("h2",{attrs:{id:"references"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#references"}},[t._v("#")]),t._v(" References")]),t._v(" "),a("p",[t._v("최범균 지음, 『개발자가 반드시 정복해야 할 객체지향과 디자인 패턴』, 인투북스(2014), p29-57.")]),t._v(" "),a("TagLinks")],1)}),[],!1,null,null,null);s.default=n.exports}}]);