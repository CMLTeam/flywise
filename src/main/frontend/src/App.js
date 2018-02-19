import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import './App.css';
import Home from "./Home";
import Users from "./Users";
import UserViewScreen from "./UserViewScreen";
import UserEditScreen from "./UserEditScreen";
import LoginScreen from "./LoginScreen";
import LoginBlock from "./LoginBlock";
import {connect} from "react-redux";
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import PropTypes from "prop-types";

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};
class App extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };
    render() {
        const { classes } = this.props;

        return (
            <Router>
                <div>
                    {/*<h2>FlyWise</h2>
                    <ul>
                        <li><Link to={'/'}>Home</Link></li>
                        <li><LoginBlock /></li>
                        <li><Link to={'/users'}>Users</Link></li>
                    </ul>
                    <hr/>*/}

                    <div className={classes.root}>
                        <AppBar position="static">
                            <Toolbar>
                                <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                                    <MenuIcon />
                                </IconButton>
                                <Typography variant="title" color="inherit" className={classes.flex}>
                                    <Link to={'/'} style={ {color:'#fff', textDecoration:'none'} }>FlyWise</Link>
                                </Typography>
                                <LoginBlock />
                            </Toolbar>
                        </AppBar>
                    </div>

                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/login' component={LoginScreen}/>
                        <Route exact path='/users' component={Users}/>
                        <Route exact path='/user/:id(\d+)' component={UserViewScreen}/>
                        <Route exact path='/user/:id(\d+)/edit' component={UserEditScreen}/>
                        <Route exact path='/user/add' component={UserEditScreen}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}
const mapStateToProps = state => {
    return {
    }
};
export default withStyles(styles)(connect(mapStateToProps)(App));
