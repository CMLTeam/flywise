import React, {Component} from 'react';
import PropTypes from "prop-types";
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import './App.css';
import Home from "./Home";
import UsersScreen from "./UsersScreen";
import UserViewScreen from "./UserViewScreen";
import UserEditScreen from "./UserEditScreen";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";
import LoginBlock from "./LoginBlock";
import {connect} from "react-redux";
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import BottomNavigation, {BottomNavigationAction} from 'material-ui/BottomNavigation';
import HomeIcon from 'material-ui-icons/Home';
import UsersIcon from 'material-ui-icons/People';
import Reboot from 'material-ui/Reboot';
import RouterListener from "./RouterListener";

const styles = {
    root: {
        flexGrow: 1,
        // width: 500,
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
    state = {
        value: 0,
    };
    handleChange = (event, value) => {
        this.setState({value});
    };

    render() {
        const {classes} = this.props;
        const {value} = this.state;

        return (
            <Router>
                <div>
                    <Reboot/>
                    <RouterListener/>
                    <div className={classes.root}>
                        <AppBar position="static">
                            <Toolbar>
                                <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                                    <MenuIcon/>
                                </IconButton>
                                <Typography variant="title" color="inherit" className={classes.flex}>
                                    <Link to={'/'} style={{color: '#fff', textDecoration: 'none'}}>FlyWise</Link>
                                </Typography>
                                <LoginBlock/>
                            </Toolbar>
                        </AppBar>
                    </div>

                    <div style={{padding: 15}}>
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <Route exact path='/signin' component={SignInScreen}/>
                            <Route exact path='/signup' component={SignUpScreen}/>
                            <Route exact path='/users' component={UsersScreen}/>
                            <Route exact path='/user/:id(\d+)' component={UserViewScreen}/>
                            <Route exact path='/user/:id(\d+)/edit' component={UserEditScreen}/>
                            <Route exact path='/user/add' component={UserEditScreen}/>
                        </Switch>
                    </div>
                    <div style={{height:56}}> </div>

                    <BottomNavigation
                        value={value}
                        onChange={this.handleChange}
                        showLabels
                        className={classes.root}
                        style={{position: "fixed", bottom:0, width:'100%'}}
                    >
                        <BottomNavigationAction label="Home" icon={<HomeIcon/>} component={Link} to={'/'}/>
                        <BottomNavigationAction label="Users" icon={<UsersIcon/>} component={Link} to={'/users'}/>
                    </BottomNavigation>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = state => ({});
export default withStyles(styles)(connect(mapStateToProps)(App));
