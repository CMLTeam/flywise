import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
// import {unregister} from './registerServiceWorker';
import reducer from './redux/reducer';
import {createStore} from "redux";
import {Provider} from 'react-redux'
import {createMuiTheme, MuiThemeProvider} from 'material-ui/styles';

const store = createStore(reducer);
const theme = createMuiTheme();

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <App/>
        </Provider>
    </MuiThemeProvider>, document.getElementById('root'));

// registerServiceWorker();
// unregister(); // TODO disabling for now till we understand wtf

// console.info(process.env.REACT_APP_QQQ);
