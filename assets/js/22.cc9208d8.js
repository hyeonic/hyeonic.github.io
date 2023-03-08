(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{384:function(s,t,a){s.exports=a.p+"assets/img/image-1.46b7920c.png"},385:function(s,t,a){s.exports=a.p+"assets/img/image-2.814dd7f0.png"},502:function(s,t,a){"use strict";a.r(t);var r=a(21),e=Object(r.a)({},(function(){var s=this,t=s.$createElement,r=s._self._c||t;return r("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[r("h1",{attrs:{id:"커버링-인덱스"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#커버링-인덱스"}},[s._v("#")]),s._v(" 커버링 인덱스")]),s._v(" "),r("blockquote",[r("p",[s._v("MySQL 8.0 이상, InnoDB 스토리지 엔진을 기준으로 작성되었다.")])]),s._v(" "),r("p",[s._v("인덱스를 사용하여 처리하는 쿼리 중 가장 큰 부하를 차지하는 부분은 어디일까? 바로 인덱스 검색에서 일치하는 키 값의 "),r("code",[s._v("레코드를 읽는 것")]),s._v("이다.")]),s._v(" "),r("p",[s._v("그림을 살펴보면 인덱스 검색에서 일치하는 키 값을 데이터 파일에서 읽을 때 비교적 느린 속도를 가진 디스크 I/O가 발생한다.")]),s._v(" "),r("p",[r("img",{attrs:{src:a(384),alt:""}})]),s._v(" "),r("p",[s._v("N개의 인덱스 검색 시 최악의 경우 N번의 디스크 I/O가 발생할 수 있다.")]),s._v(" "),r("p",[s._v("이것을 커버링 인덱스를 활용하여 개선할 수 있다. 커버링 인덱스는 데이터 파일을 읽지 않고 인덱스만 읽어 불필요한 디스크 I/O를 줄일 수 있다.")]),s._v(" "),r("p",[s._v("먼저 간단한 예제를 위한 crew 테이블이다. 데이터는 대략 "),r("code",[s._v("100만건")]),s._v("을 기준으로 한다.")]),s._v(" "),r("div",{staticClass:"language-sql extra-class"},[r("pre",{pre:!0,attrs:{class:"language-sql"}},[r("code",[r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("CREATE")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("TABLE")]),s._v(" crew "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("\n    id "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("INT")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("NOT")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("NULL")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("AUTO_INCREMENT")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    nickname "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("VARCHAR")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),r("span",{pre:!0,attrs:{class:"token number"}},[s._v("20")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("NOT")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("NULL")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    track "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("VARCHAR")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),r("span",{pre:!0,attrs:{class:"token number"}},[s._v("20")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("NOT")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("NULL")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("year")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("INT")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("NOT")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("NULL")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("CONSTRAINT")]),s._v(" pk_crew_id "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("PRIMARY")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("KEY")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("id"),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("  \n"),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])])]),r("ul",[r("li",[r("code",[s._v("id")]),s._v(": 고유 식별자")]),s._v(" "),r("li",[r("code",[s._v("nickname")]),s._v(": 닉네임")]),s._v(" "),r("li",[r("code",[s._v("track")]),s._v(": 진행 중인 track (e.g. FRONTEND, BACKEND 등)")]),s._v(" "),r("li",[r("code",[s._v("year")]),s._v(": 기수 (e.g. 1기, 2기 등)")])]),s._v(" "),r("h2",{attrs:{id:"인덱스-설정"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#인덱스-설정"}},[s._v("#")]),s._v(" 인덱스 설정")]),s._v(" "),r("p",[s._v("crew 테이블에서 닉네임이 "),r("code",[s._v("a ~ d")]),s._v(" 사이이며 "),r("code",[s._v("BACKEND")]),s._v(" 트랙을 진행 중인 크루를 조회한다고 가정한다. 쿼리로 표현하면 아래와 같다.")]),s._v(" "),r("div",{staticClass:"language-sql extra-class"},[r("pre",{pre:!0,attrs:{class:"language-sql"}},[r("code",[r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("SELECT")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" \n"),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("FROM")]),s._v(" crew \n"),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("WHERE")]),s._v(" nickname "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("BETWEEN")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[s._v("'a'")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("AND")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[s._v("'d'")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("AND")]),s._v(" track "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[s._v("'BACKEND'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("   \n")])])]),r("p",[s._v("위 쿼리에 인덱스를 적용하기 위해 "),r("code",[s._v("nickname")]),s._v("과 "),r("code",[s._v("track")]),s._v("으로 복합 인덱스를 설정한다.")]),s._v(" "),r("div",{staticClass:"language-sql extra-class"},[r("pre",{pre:!0,attrs:{class:"language-sql"}},[r("code",[r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ALTER")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("TABLE")]),s._v(" crew "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ADD")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("INDEX")]),s._v(" idx_crew_nickname_track "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("nickname"),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" track"),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("   \n")])])]),r("p",[s._v("이제 실행 계획을 살펴보자.")]),s._v(" "),r("div",{staticClass:"language-sql extra-class"},[r("pre",{pre:!0,attrs:{class:"language-sql"}},[r("code",[s._v("mysql"),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("EXPLAIN")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("SELECT")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("FROM")]),s._v(" crew "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("WHERE")]),s._v(" nickname "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("BETWEEN")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[s._v("'a'")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("AND")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[s._v("'d'")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("AND")]),s._v(" track "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[s._v("'BACKEND'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),r("span",{pre:!0,attrs:{class:"token comment"}},[s._v("----+-------------+-------+------------+------+-------------------------+------+---------+------+--------+----------+-------------+    ")]),s._v("\n"),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" id "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" select_type "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("table")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" partitions "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("type")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" possible_keys           "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("key")]),s._v("  "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" key_len "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" ref  "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("rows")]),s._v("   "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" filtered "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" Extra       "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("    \n"),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),r("span",{pre:!0,attrs:{class:"token comment"}},[s._v("----+-------------+-------+------------+------+-------------------------+------+---------+------+--------+----------+-------------+    ")]),s._v("\n"),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("  "),r("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("SIMPLE")]),s._v("      "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" crew  "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("NULL")]),s._v("       "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ALL")]),s._v("  "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" idx_crew_nickname_track "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("NULL")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("NULL")]),s._v("    "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("NULL")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token number"}},[s._v("997049")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("     "),r("span",{pre:!0,attrs:{class:"token number"}},[s._v("3.70")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("Using")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("where")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("    \n"),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),r("span",{pre:!0,attrs:{class:"token comment"}},[s._v("----+-------------+-------+------------+------+-------------------------+------+---------+------+--------+----------+-------------+    ")]),s._v("\n")])])]),r("p",[r("code",[s._v("*")]),s._v("를 활용하여 모든 칼럼을 조회할 경우 옵티마이저는 인덱스를 활용하여 레코드를 읽는 것 보다 데이터 파일을 바로 읽는 것이 더욱 빠르다고 판단하여 "),r("code",[s._v("풀 테이블 스캔(ALL)")]),s._v("을 진행한 것을 확인할 수 있다.")]),s._v(" "),r("blockquote",[r("p",[s._v("인덱스를 통해 레코드를 읽는 것 > 데이터 파일을 바로 읽는 것 (비용 측면)")])]),s._v(" "),r("h2",{attrs:{id:"커버링-인덱스-활용"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#커버링-인덱스-활용"}},[s._v("#")]),s._v(" 커버링 인덱스 활용")]),s._v(" "),r("p",[s._v("이제 "),r("code",[s._v("커버링 인덱스")]),s._v(" 활용을 위해 모든 칼럼을 조회("),r("code",[s._v("*")]),s._v(")하는 쿼리에서 "),r("code",[s._v("nickname")]),s._v("과 "),r("code",[s._v("track")]),s._v(" 칼럼을 활용하여 조회하는 방식으로 개선한다.")]),s._v(" "),r("div",{staticClass:"language-sql extra-class"},[r("pre",{pre:!0,attrs:{class:"language-sql"}},[r("code",[r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("SELECT")]),s._v(" nickname"),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" track \n"),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("FROM")]),s._v(" crew \n"),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("WHERE")]),s._v(" nickname "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("BETWEEN")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[s._v("'a'")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("AND")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[s._v("'d'")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("AND")]),s._v(" track "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[s._v("'BACKEND'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("   \n")])])]),r("p",[s._v("다시 실행 계획을 살펴보자.")]),s._v(" "),r("div",{staticClass:"language-sql extra-class"},[r("pre",{pre:!0,attrs:{class:"language-sql"}},[r("code",[s._v("mysql"),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("EXPLAIN")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("SELECT")]),s._v(" nickname"),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" track "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("FROM")]),s._v(" crew "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("WHERE")]),s._v(" nickname "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("BETWEEN")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[s._v("'a'")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("AND")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[s._v("'d'")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("AND")]),s._v(" track "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[s._v("'BACKEND'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),r("span",{pre:!0,attrs:{class:"token comment"}},[s._v("----+-------------+-------+------------+-------+-------------------------+-------------------------+---------+------+--------+----------+--------------------------+   ")]),s._v("\n"),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" id "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" select_type "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("table")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" partitions "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("type")]),s._v("  "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" possible_keys           "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("key")]),s._v("                     "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" key_len "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" ref  "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("rows")]),s._v("   "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" filtered "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" Extra                    "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   \n"),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),r("span",{pre:!0,attrs:{class:"token comment"}},[s._v("----+-------------+-------+------------+-------+-------------------------+-------------------------+---------+------+--------+----------+--------------------------+   ")]),s._v("\n"),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("  "),r("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("SIMPLE")]),s._v("      "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" crew  "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("NULL")]),s._v("       "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" range "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" idx_crew_nickname_track "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" idx_crew_nickname_track "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token number"}},[s._v("164")]),s._v("     "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("NULL")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token number"}},[s._v("368652")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("    "),r("span",{pre:!0,attrs:{class:"token number"}},[s._v("10.00")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("Using")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("where")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("Using")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("index")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   \n"),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),r("span",{pre:!0,attrs:{class:"token comment"}},[s._v("----+-------------+-------+------------+-------+-------------------------+-------------------------+---------+------+--------+----------+--------------------------+   ")]),s._v("\n")])])]),r("p",[r("code",[s._v("type")]),s._v("을 살펴보면 "),r("code",[s._v("Index Range Scan")]),s._v("이 발생한 것을 볼 수 있다. 또한 추가적으로 확인해야 할 부분이 있는데, "),r("code",[s._v("Extra")]),s._v(" 칼럼의 "),r("code",[s._v("Using index")]),s._v("이다. 커버링 인덱스를 타게 되면 "),r("code",[s._v("Extra")]),s._v(" 칼럼에 "),r("code",[s._v("Using index")]),s._v("가 표시되는 것을 확인할 수 있다.")]),s._v(" "),r("h2",{attrs:{id:"조회-속도-비교"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#조회-속도-비교"}},[s._v("#")]),s._v(" 조회  속도 비교")]),s._v(" "),r("p",[s._v("이제 "),r("code",[s._v("모든 칼럼을 조회하는 쿼리")]),s._v("와 "),r("code",[s._v("커버링 인덱스가 가능한 쿼리")]),s._v("의 조회 속도를 비교해보자. 테이블에는 100만건의 데이터가 있다.")]),s._v(" "),r("p",[s._v("먼저 모든 칼럼의 조회 속도이다.")]),s._v(" "),r("div",{staticClass:"language-sql extra-class"},[r("pre",{pre:!0,attrs:{class:"language-sql"}},[r("code",[r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("SELECT")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v("\n"),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("FROM")]),s._v(" crew \n"),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("WHERE")]),s._v(" nickname "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("BETWEEN")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[s._v("'a'")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("AND")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[s._v("'d'")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("AND")]),s._v(" track "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[s._v("'BACKEND'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("   \n\n"),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),r("span",{pre:!0,attrs:{class:"token comment"}},[s._v("----------+---------+")]),s._v("\n"),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" nickname "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" track   "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),r("span",{pre:!0,attrs:{class:"token comment"}},[s._v("----------+---------+")]),s._v("\n"),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" a0002ccc "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" BACKEND "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" a000319e "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" BACKEND "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" a00058f1 "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" BACKEND "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("      "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("     "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" cfffd6f4 "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" BACKEND "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" cfffdb4a "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" BACKEND "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" cffffbb2 "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" BACKEND "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),r("span",{pre:!0,attrs:{class:"token comment"}},[s._v("----------+---------+")]),s._v("\n"),r("span",{pre:!0,attrs:{class:"token number"}},[s._v("93617")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("rows")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("in")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("set")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),r("span",{pre:!0,attrs:{class:"token number"}},[s._v("3.04")]),s._v(" sec"),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])])]),r("p",[s._v("다음은 커버링 인덱스로 개선한 조회 쿼리이다.")]),s._v(" "),r("div",{staticClass:"language-sql extra-class"},[r("pre",{pre:!0,attrs:{class:"language-sql"}},[r("code",[r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("SELECT")]),s._v(" nickname"),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" track \n"),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("FROM")]),s._v(" crew \n"),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("WHERE")]),s._v(" nickname "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("BETWEEN")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[s._v("'a'")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("AND")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[s._v("'d'")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("AND")]),s._v(" track "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[s._v("'BACKEND'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("   \n\n"),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),r("span",{pre:!0,attrs:{class:"token comment"}},[s._v("----------+---------+")]),s._v("\n"),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" nickname "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" track   "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),r("span",{pre:!0,attrs:{class:"token comment"}},[s._v("----------+---------+")]),s._v("\n"),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" a0002ccc "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" BACKEND "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" a000319e "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" BACKEND "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" a00058f1 "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" BACKEND "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("      "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("     "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" cfffd6f4 "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" BACKEND "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" cfffdb4a "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" BACKEND "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" cffffbb2 "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" BACKEND "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),r("span",{pre:!0,attrs:{class:"token comment"}},[s._v("----------+---------+  ")]),s._v("\n"),r("span",{pre:!0,attrs:{class:"token number"}},[s._v("93617")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("rows")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("in")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("set")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),r("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.54")]),s._v(" sec"),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])])]),r("p",[r("code",[s._v("3.04 sec → 0.54 sec")]),s._v(" 로 조회 성능이 개선된 것을 확인할 수 있다. 100만건 보다 많은 데이터가 있다면 보다 더 유의미한 차이가 날 것이라 기대한다.")]),s._v(" "),r("h2",{attrs:{id:"커버링-인덱스의-숨겨진-비밀"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#커버링-인덱스의-숨겨진-비밀"}},[s._v("#")]),s._v(" 커버링 인덱스의 숨겨진 비밀")]),s._v(" "),r("p",[s._v("커버링 인덱스에는 한 가지 비밀이 더 숨겨져 있다. 만약 "),r("code",[s._v("프라이머리 키")]),s._v("인 "),r("code",[s._v("id")]),s._v("를 함께 조회하는 이 쿼리는 어떤 인덱스를 탈까?")]),s._v(" "),r("div",{staticClass:"language-sql extra-class"},[r("pre",{pre:!0,attrs:{class:"language-sql"}},[r("code",[r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("SELECT")]),s._v(" id"),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" nickname"),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" track \n"),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("FROM")]),s._v(" crew \n"),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("WHERE")]),s._v(" nickname "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("BETWEEN")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[s._v("'a'")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("AND")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[s._v("'d'")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("AND")]),s._v(" track "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[s._v("'BACKEND'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("   \n")])])]),r("p",[s._v("실행 계획을 살펴보자.")]),s._v(" "),r("div",{staticClass:"language-sql extra-class"},[r("pre",{pre:!0,attrs:{class:"language-sql"}},[r("code",[s._v("mysql"),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("EXPLAIN")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("SELECT")]),s._v(" id"),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" nickname"),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" track "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("FROM")]),s._v(" crew "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("WHERE")]),s._v(" nickname "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("BETWEEN")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[s._v("'a'")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("AND")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[s._v("'d'")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("AND")]),s._v(" track "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[s._v("'BACKEND'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),r("span",{pre:!0,attrs:{class:"token comment"}},[s._v("----+-------------+-------+------------+-------+-------------------------+-------------------------+---------+------+--------+----------+--------------------------+   ")]),s._v("\n"),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" id "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" select_type "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("table")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" partitions "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("type")]),s._v("  "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" possible_keys           "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("key")]),s._v("                     "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" key_len "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" ref  "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("rows")]),s._v("   "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" filtered "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" Extra                    "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   \n"),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),r("span",{pre:!0,attrs:{class:"token comment"}},[s._v("----+-------------+-------+------------+-------+-------------------------+-------------------------+---------+------+--------+----------+--------------------------+   ")]),s._v("\n"),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("  "),r("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("SIMPLE")]),s._v("      "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" crew  "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("NULL")]),s._v("       "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" range "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" idx_crew_nickname_track "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" idx_crew_nickname_track "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token number"}},[s._v("164")]),s._v("     "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("NULL")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token number"}},[s._v("368652")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("    "),r("span",{pre:!0,attrs:{class:"token number"}},[s._v("10.00")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("Using")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("where")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("Using")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("index")]),s._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("   \n"),r("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),r("span",{pre:!0,attrs:{class:"token comment"}},[s._v("----+-------------+-------+------------+-------+-------------------------+-------------------------+---------+------+--------+----------+--------------------------+   ")]),s._v("\n")])])]),r("p",[s._v("앞선 예시와 동일하게 커버링 인덱스를 타는 것을 확인할 수 있다. "),r("code",[s._v("프라이머리 키")]),s._v("는 "),r("code",[s._v("복합 인덱스")]),s._v("로 설정하지 않았는데 왜 같은 결과가 나올까?")]),s._v(" "),r("p",[s._v("그에 대한 해답은 "),r("code",[s._v("InnoDB")]),s._v("의 "),r("code",[s._v("세컨더리 인덱스")]),s._v("의 특수한 구조 덕분이다. 세컨더리 인덱스의 리프 노드는 실제 레코드의 주소를 가지고 있는 것이 아닌, 클러스터드 인덱스가 걸린 프라이머리 키를 주소로 가지고 있다.")]),s._v(" "),r("p",[r("img",{attrs:{src:a(385),alt:""}})]),s._v(" "),r("p",[s._v("그렇기 때문에 이 프라이머리 키를 포함한 조회 쿼리도 충분히 커버링 인덱스로 활용이 가능하다.")]),s._v(" "),r("h2",{attrs:{id:"references"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#references"}},[s._v("#")]),s._v(" References.")]),s._v(" "),r("p",[s._v("백은빈, 이성욱, 『Real MySQL 8.0』, 위키북스(2021), p476 ~ 479")]),s._v(" "),r("TagLinks")],1)}),[],!1,null,null,null);t.default=e.exports}}]);