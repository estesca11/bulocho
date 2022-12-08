# Excel Automation

JS based web app generating Excel files from OpenAPI  

## Features

- 목표 ➡️ 건축물의 정보 획득 및 문서 작성, DB 입력의 자동화

### Front

- 주소 입력 → 법정동코드로 변환, 특이사항
- 카카오맵 API를 통해서 주소 검색 및 법정동코드 획득
    
    [https://postcode.map.daum.net/guide](https://postcode.map.daum.net/guide)
    
- 법정동코드와 특이사항을 백엔드로 전송

### Back

법정동코드 → OpenAPI 요청 → 토지/건축물대장 정보 획득 

API에서 받아올 정보

- 새주소
- 용도지역
- 지역구분
- 면적
- 사용승인일
- EV 여부
- if 다층/다가구 → 층별, 호별 면적

문서 작성

- 특이사항 수기입력
- 줄바꿈되어 물건파일에 입력되게

물건파일에 저장

### Stack

---

- JavaScript
- NodeJS
- PyPinkSign : 파이썬 기반 공인인증서 라이브러리
    
    [https://github.com/bandoche/PyPinkSign](https://github.com/bandoche/PyPinkSign)
    

### Implementation

---

- 카카오맵 API는 브라우저 환경에서 실행되어야 함
- 엑셀파일을 생성하기 위한 라이브러리는 Nodejs 환경에서 실행됨
- script src 태그를 이용해서 브라우저에서 엑셀파일을 export
- 카카오 API는 data 객체의로 정보를 반환함
- data.buildingCode : 시군구 법정동 번지의 정보 포함

### How to request

---

1. Ajax
    
    XMLHttpRequest / Jquery를 이용해서 통신
    
2. axios
    
    Nodejs의 라이브러리여서 개발중인 클라이언트에는 적합하지 않음..
    
3. fetch
    
    ES6부터 Vanilla JS에 내장된 라이브러리
    
    구버전(IE11)의 브라우저에서는 지원X
    
    JSON 형식만 지원함.
    

fetch로 JSON 형식의 건축물대장 데이터를 받는것에 성공함

>>> 받아온 데이터를 파싱해서 사용자 친화적으로 보여주기

### How to process data?

---

- 공공데이터포털에서 응답받은 JSON에서 가변적으로 존재하는 요소들을 확인
- JSON을 파싱해서 필요한 데이터를 선택적으로 추출
- 데이터의 유무에 따른 동적 UI 구현

- Data List


구현방법

1. HTML element를 동적으로 조절 ?
2. 프론트엔드 프레임워크 사용 e.g. react
3.