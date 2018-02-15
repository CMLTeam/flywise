import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Home from "./Home";
import Users from "./Users";
import UserViewScreen from "./UserViewScreen";
import UserEditScreen from "./UserEditScreen";
import LoginScreen from "./LoginScreen";

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <h2>FlyWise</h2>
                    <ul>
                        <li><Link to={'/'}>Home</Link></li>
                        <li><Link to={'/login'}>Login</Link></li>
                        <li><Link to={'/users'}>Users</Link></li>
                    </ul>
                    <hr/>

                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/login' component={LoginScreen}/>
                        <Route exact path='/users' component={Users}/>
                        <Route exact path='/user/:id' component={UserViewScreen}/>
                        <Route exact path='/user/:id/edit' component={UserEditScreen}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
