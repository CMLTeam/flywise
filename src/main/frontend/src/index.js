import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import {unregister} from './registerServiceWorker';
import {API_ROOT} from './api-cfg';

ReactDOM.render(<App />, document.getElementById('root'));

// registerServiceWorker();
unregister(); // TODO disabling for now till we understand wtf

// console.info(process.env.REACT_APP_QQQ);
console.info(`API_ROOT: ${API_ROOT}`);
