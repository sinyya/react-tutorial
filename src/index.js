import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from './store/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

/**
 * component tree 변경 시 앱을 다시 빌드하고 변경된 코드를 실행중인 앱으로 교체하기 위해
 * render 함수를 작성하여 사용한다.
 */
const render = () => {
    const App = require('./App').default;
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );
}

render();

if(process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./App', render);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
