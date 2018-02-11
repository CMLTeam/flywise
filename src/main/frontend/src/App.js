import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Home from "./Home";
import Users from "./Users";

class App extends Component {
  render() {
      return (
          <Router>
              <div>
                  <h2>Welcome to React Router Tutorial</h2>
                  <ul>
                      <li><Link to={'/'}>Home</Link></li>
                      <li><Link to={'/users'}>Users</Link></li>
                  </ul>
                  <hr />

                  <Switch>
                      <Route exact path='/' component={Home} />
                      <Route exact path='/users' component={Users} />
                  </Switch>
              </div>
          </Router>
      );
  }
}

export default App;
