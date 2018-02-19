import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
// import {unregister} from './registerServiceWorker';
import reducer from './redux/reducer';
import {createStore} from "redux";
import {Provider} from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const store = createStore(reducer);

ReactDOM.render(
    <MuiThemeProvider>
        <Provider store={store}>
            <App/>
        </Provider>
    </MuiThemeProvider>, document.getElementById('root'));

// registerServiceWorker();
// unregister(); // TODO disabling for now till we understand wtf

// console.info(process.env.REACT_APP_QQQ);
