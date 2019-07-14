// history
import { createBrowserHistory } from 'history'

export default createBrowserHistory({
    /* pass a configuration object here if needed */
    forceRefresh: false // URL을 변경한 상태에서 리로드
})
