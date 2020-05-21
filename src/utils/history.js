/**
 *  히스토리 모듈
 *  컴포넌트 이외 파일에서 히스토리 사용이 필요한 경우 이 파일을 import하여 사용한다.
 */
import { createBrowserHistory } from 'history'

export default createBrowserHistory({
    /* pass a configuration object here if needed */
    forceRefresh: false // URL을 변경한 상태에서 리로드
})
