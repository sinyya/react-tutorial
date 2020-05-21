import { configureStore } from '@reduxjs/toolkit';
import rootReducer from "./reducer";

const store = configureStore({
  reducer: rootReducer
});

/**
 * 루트 리듀서를 핫 리로드하는 것을 포함하여 스토어 인스턴스를 만든다.
 * module.hot API를 사용하여 재컴파일 될 때마다 루트 리듀서 함수의 새 버전을 가져와서 대신 사용하도록 한다.
 */
if(process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./reducer', ()=>{
    const newRootReducer = require('./reducer').default;
    store.replaceReducer(newRootReducer);
  })
}

export default store;
