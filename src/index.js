import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './App';
import * as serviceWorker from './serviceWorker';

// lib
import csApi from './lib/api/csApi'

const App = {};
App.api = App.api || {};
App.api.csApi = csApi

window.App = App
window.appVersion = "v0.0.1"

ReactDOM.render(<Root />, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
