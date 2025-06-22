# 도서 관리 어플리케이션 프론트엔드

이 프로젝트는 도서 관리 애플리케이션의 프론트엔드를 구현합니다. 책 목록 조회, 상세 정보 확인, 수정 등의 기능을 제공합니다.

## 🚀 기술 스택

* **프레임워크:** Next.js 15.3.4 (App Router)
* **언어:** TypeScript
* **스타일링:** Material UI
* **상태 관리:** React Query 
* **HTTP 클라이언트:** Axios

## ✨ 주요 기능

* **책 목록 페이지:**
    * 페이지네이션
    * 제목 및 저자 기반 검색
* **책 상세 정보 페이지:**
    * 책 정보 조회
    * 책 정보 수정
* **책 추가 기능:**
    * 새로운 책 추가 

## ⚙️ 설정 및 실행 방법

### 1. 전제 조건

* Node.js (18.x)
* Yarn
* **백엔드 API 서버가 실행 중이어야 합니다.** (기본적으로 `http://localhost:8080` 또는 배포된 서버 주소)

### 2. 환경 변수 설정

* 프로젝트 루트에 .env.local (로컬 개발용) 과 .env.production (배포용) 파일을 생성하고 다음 내용을 추가합니다.

* `.env.local` 파일 내용

    ```NEXT_PUBLIC_API_URL="http://localhost:8080"```

* `.env.production` 파일 내용

    ```NEXT_PUBLIC_API_URL="http://ec2-3-39-187-242.ap-northeast-2.compute.amazonaws.com"```


### 3. 실행

* yarn install
* 로컬 : yarn dev
* 운영 : yarn build; yarn start