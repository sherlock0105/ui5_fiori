# SAPUI5 / Fiori 학습 모음

SAPUI5 화면 개발과 CDS·Gateway 서비스 연동을 학습하며 작성한 실습 및 프로젝트 앱 모음입니다.

## 구성

| 경로 | 내용 |
| --- | --- |
| `code1_cl5_01-main/` | 기초 실습, 계산기, 테이블, 라우팅, 차트 등 |
| `code1_cl5_cds/` | CDS 연동 및 검색 관련 실습 |
| `code1_cl5_gw/` | Gateway 연동, 바인딩, CRUD, 분할 화면 실습 |
| `code1_cl5_project/` | 프로젝트 실습 |
| `code1_cl5_test/` | 테스트·과제 앱 |
| `code1_cl5_tomato/` | 추가 그리드 실습 |
| `cl5_e3_codemetic/` | 재무·환율·거래처 관련 앱 |

각 앱의 `package.json`과 `webapp/`을 기준으로 살펴보세요. 저장소 전체가 하나의 실행 앱으로 구성되어 있지는 않습니다.

## 로컬 실행 예시

```bash
cd cl5_e3_codemetic/financial01
npm install
npm run start-mock
```

Node.js와 npm이 필요합니다. 위 앱의 모의 서비스 실행 명령이며, 다른 앱은 각 `package.json`의 실행 명령을 확인하세요. 실제 데이터 연결에는 앱별 SAP 서비스 설정과 접근 권한이 필요합니다.

## 관련 자료

- [Masterpack FI 프로젝트](https://github.com/sherlock0105/masterpack-project-fi)
- [SAP 포트폴리오](https://sherlock0105.github.io/)
