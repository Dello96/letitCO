# 프로젝트 소개

### - 프로젝트 명 : 책 check ( 내가 읽은 책을 체크한다 )
- 소개
    - 한 줄 정리 :  나만의 독서 기록 사이트!
    - 내용 :


    1. 도서 검색 : 도서 API를 통해 책을 검색할 수 있다. 이를 통해 원하는 책을 찾고 상세 정보를 확인할 수 있다
    2. 독서 진행률 관리 : 사용자는 자신이 현재 읽고 있는 책의 진행률을 기록할 수 있다. 진행률을 통해 진행 성과를 시각적으로 파악하는 데 도움이 될 것이다.
    3. 읽은 책 목록 : 완독한 책을 목록에 추가할 수 있다
    4. 읽고 싶은 책 목록 : 북마크 버튼을 통해 사용자가 읽고 싶은 책을 목록에 추가할 수 있다
    5. 다 읽은 책 목록 : 사용자가 다 읽은 책은 별도의 목록에 저장한다. 

이 프로젝트는 독서를 즐기는 사람들을 위한 유용한 사이트로서, 개인의 독서 목표를 설정하고 추적하며 독서 커뮤니티와 소통하는 데 도움을 줄 것이다. 또한 도서 정보를 편리하게 검색하고 관리할 수 있는 기능을 제공하여 사용자들이 더 효율적으로 독서를 즐길 수 있을 것이다.

## 페이지 디자인
1. 메인화면(로그인X)
![스크린샷 2024-01-03 오전 11 36 30](https://github.com/Dello96/letitCO/assets/101166282/1d1fa259-1b19-47d8-a886-bf6f0e1ce875)

2. 메인화면(로그인O)
![스크린샷 2024-01-03 오전 11 57 25](https://github.com/Dello96/letitCO/assets/101166282/3a4dd324-271c-47d3-9094-236aacf75120)

3. 내 책장
![스크린샷 2024-01-03 오전 11 57 31](https://github.com/Dello96/letitCO/assets/101166282/057f5858-9a00-4153-b04b-8a078cf01c54)

4. 책 검색
![스크린샷 2024-01-03 오전 11 57 47](https://github.com/Dello96/letitCO/assets/101166282/c59a7223-766c-42f7-a063-aa378b00f0e7)

5. 북캘린더(독서계획)
![스크린샷 2024-01-03 오전 11 57 52](https://github.com/Dello96/letitCO/assets/101166282/1fe6426c-d5d2-4336-b3c4-fd17e0cc0062)


## 주요 기능

1. supabase를 활용한 로그인 / 로그아웃 및 유저상태 관리
2. 알라딘 API를 활용하여 검색한 책을 나만의 책장에 등록하고 책을 읽을 때 기록 및 저장기능
3. 읽고싶은 책, 읽고 있는 책, 다 읽은 책을 나누어서 등록 가능
4. 책을 검색하여 북마크 기능을 활용하여 읽고 싶은 책에 추가 가능
5. 각 책에 대한 DetailPage를 만들어 책의 정보를 알려줌

## 기술스택

- typescript
- Redux
- html / css
- react-query
- styled-components
- styled-reset
- uuid
- supabase

In the project directory, you can run: yarn start

## 사용한 외부 API 및 도구

- 알라딘 API(https://blog.aladin.co.kr/openapi/popup/6695306)
- Supabase
- 디자인 및 협업 도구: Figma, Notion

clone repository
https://github.com/Dello96/letitCO.git
Install npm dependencies
yarn install
yarn start

## 요구사항(상,중,하 각각 활용 가능한 것들 뽑아옴)

- 좋아요 또는 북마크 기능에 리액트쿼리 Optimistic Update 적용
- form 유효성검사에 react-hook-form 라이브러리 적용
- Supabase 적용
- react-query 로 서버 상태 관리하기
- 외부 API 적용

## 추가구현사항

- Supabase를 통해 오픈 소스 백엔드를 이용(데이터베이스, 인증, 스토리지 등 사용)
- useQuery
    1). query-key를 다양한 방법(2가지 이상)으로 활용하기 : 늘 쿼리키는 한 단어 정도로만 지정했었죠, 다양한 조합의 쿼리키를 사용해봅니다.
- 회원가입/로그인 기능 추가 : 기초적인 수준이라도 로그인한 유저만 특정 기능을 수행하게 하는 등 권한을 제어합니다.
