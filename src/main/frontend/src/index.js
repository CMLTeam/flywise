import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { unregister } from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
// console.info(process.env.REACT_APP_QQQ)
// registerServiceWorker();
unregister(); // TODO disabling for now till we understand wtf 
