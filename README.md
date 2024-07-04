# Micro Measurable Admin Website README

![micro_measurable_admin_cover](https://github.com/likelion-project-README/README/assets/82192923/ad4716ce-9889-4ce7-aba7-f67de8587199)
[참고 영상](https://www.youtube.com/watch?v=nm_seyMrYFw&feature=youtu.be)

<br>

## 1. 프로젝트 소개

- 한동대학교 전산전자공학부 2024-1 캡스톤 디자인2 프로젝트로 구현한 대기환경 모니터링 시스템, Micro Measurable 관리자 웹사이트입니다.
- 설치된 대기환경모니터링 시스템을 전반적으로 관리하기 위해, 측정값, 에러, 배터리, 관리자 정보 등을 다룹니다.
- 구글 로그인을 통해, 오직 허용된 관리자만 접급할 수 있습니다.
- 에러 데이터 발생 시, 특정 메일로 알림이 갑니다.(Firebase Functions를 이용해 별도로 구현)

<br>

## 2. 팀원 구성

<div align="center">
    <img src="https://github.com/LeeShinwon/micro_measurable_admin/assets/82192923/4cad8f46-f0ab-4b80-b201-ae5295c43353" width=700>
</div>

<div align="center">
<h4> 소프트웨어 </h4>
    김예인, 이신원, 최은총, 한상화
<h4> 하드웨어 팀 </h4>
    이수현, 이찬영, 이찬휘, 유현도
</div>

<br>

## 3. 시스템 구조
[](https://github.com/LeeShinwon/micro_measurable_admin/blob/main/structure.png)

## 4. 개발 환경

- Front : React, VITE, MUI
- Back-end : NODE.JS, FIREBASE
- 버전 및 이슈관리 : Github, Github Issues, Github Project
- 협업 툴 : Notion, Github, Google Drive
- 서비스 배포 환경 : AWS EC2
- 디자인 : [Figma](https://www.figma.com/design/aiXTcvZdEUs0Ji5YNyiMwH/%EC%BA%A1%EC%8A%A4%ED%86%A42-%EC%9B%B9?node-id=260%3A78&t=ZfmlI2ikT0HOWtn7-1)
<br>

## 5. 기술 스택

### React
- 컴포넌트화를 통해 추후 유지보수와 재사용성을 고려했습니다.
- 중복되어 사용되는 부분이 많아 컴포넌트화를 통해 리소스 절약이 가능했습니다.
    
### Zustand

- 최상위 컴포넌트를 만들어 props로 정보를 내려주는 방식의 경우 불필요한 props 전달이 발생합니다. 따라서, 필요한 컴포넌트 내부에서만 상태 값을 가져다 사용하기 위해 상태 관리 라이브러리를 사용하기로 했습니다.

### React Query

- 실시간으로 데이터를 측정하고, 반영해야 하는 대기모니터링시스템의 특성을 반영하여, 데이터를 원활히 가져오고 관리할 수 있게 하기 위해 사용하였습니다.
- 30분에 한번씩 자동으로 데이터를 읽어오도록 하기 위해 useQuery를 사용하였고, 그 이외의 요청에는 useMutation을 사용하였습니다.
- post, get, put, delete 시에 서버로부터 받은 데이터를 pending, success, error 상황에 맞게 적절히 관리하였습니다.

### eslint, prettier

- 정해진 규칙에 따라 자동적으로 코드 스타일을 정리해 코드의 일관성을 유지하고자 했습니다.
- 코드 품질 관리는 eslint에, 코드 포맷팅은 prettier에 일임해 사용했습니다.
- 협업 시 매번 컨벤션을 신경 쓸 필요 없이 빠르게 개발하는 데에 목적을 두었습니다.


<br>

## 6. 프로젝트 구조

```
├── README.md
├── .eslintrc.js
├── .gitignore
├── .prettierrc.json
├── package-lock.json
├── package.json
│
├── public
│    └── index.html
└── src
     ├── App.jsx
     ├── index.jsx
     ├── api
     │     └── mandarinAPI.js
     ├── asset
     │     ├── fonts
     │     ├── css_sprites.png
     │     ├── logo-404.svg
     │     └── logo-home.svg
     │          .
     │          .
     │          .
     ├── atoms
     │     ├── LoginData.js
     │     └── LoginState.js
     ├── common
     │     ├── alert
     │     │     ├── Alert.jsx
     │     │     └── Alert.Style.jsx
     │     ├── button
     │     ├── comment
     │     ├── inputBox
     │     ├── post
     │     ├── postModal
     │     ├── product
     │     ├── tabMenu
     │     ├── topBanner
     │     └── userBanner
     ├── pages
     │     ├── addProduct
     │     │     ├── AddProduct.jsx
     │     │     └── AddProduct.Style.jsx
     │     ├── chatList
     │     ├── chatRoom
     │     ├── emailLogin
     │     ├── followerList
     │     ├── followingList
     │     ├── home
     │     ├── join
     │     ├── page404
     │     ├── postDetail
     │     ├── postEdit
     │     ├── postUpload
     │     ├── productEdit
     │     ├── profile
     │     ├── profileEdit
     │     ├── profileSetting
     │     ├── search
     │     ├── snsLogin
     │     └── splash
     ├── routes
     │     ├── privateRoutes.jsx
     │     └── privateRoutesRev.jsx  
     └── styles
           └── Globalstyled.jsx
```
