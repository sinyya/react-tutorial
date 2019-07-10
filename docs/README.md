# React CSS 연동

### 1. 프로젝트 생성 및 라이브러리 설치
```
$ npx create-react-app react-router-tutorial
```
```
$ npm install react-router-dom
$ npm install cross-env --dev
```

<br/>

### 2. 프로젝트 초기화 및 구조 설정
- src/assets : 이미지 등 프로젝트에서 쓰이는 어셋
- src/components : 컴포넌트
- src/pages : 페이지
- src/history : 외부에서 react history에 접근하기 위한 히스토리 모듈
- src/lib : api 연동 라이브러리
- src/utils : 유틸리티

<br/>

### 3. NODE_ENV 설정
package.json
```
"scripts": {
    "start": "cross-env NODE_PATH=src react-scripts start",
    "build": "cross-env NODE_PATH=src react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
```

<br/>

### 4. 기존 프로젝트에 사용하던 라이브러리 설치
```
// x2js (xml to json)
$ npm install x2js
// jquery
$ npm install jquery --save
```

<br/>

### 5. api 모듈에서 react history를 사용하기 위해 history 모듈 추가 
```
// history
$ npm install history
```
history
```
// history
import { createBrowserHistory } from 'history'

export default createBrowserHistory({
    /* pass a configuration object here if needed */
    forceRefresh: false // URL을 변경한 상태에서 리로드 여부
})
```
