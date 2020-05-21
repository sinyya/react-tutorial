/**
 *  react-async 로 요청 상태 관리
 *  공통 로직 정의
 */
import axios from 'axios';

const api = {
    async request(url, config) {
        try{
            const res = await axios({ url, ...config});
            console.log(res);
            return res.data;
        }catch(e){
            // todo 공통 에러 처리 시 여기에 작성
            console.log(e);
        }
    }
};

export default api;




