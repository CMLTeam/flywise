import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {api} from "./api";
import {currentUserLoadStarted, currentUserLoadSuccess, logoutStarted, logoutSuccess} from "./redux/actions";
import Button from 'material-ui/Button';

class LoginBlock extends Component {
    async componentDidMount() {
        await this.props.loadCurrentUser();
    }

    handleLogout = (event) => {
        event.preventDefault();
        this.props.doLogoutCall();
    };

    render() {
        return (
            this.props.currentUser.id ?
                <span>
                    Welcome, <b>{this.props.currentUser.username}</b>
                    <Button onClick={this.handleLogout} color={'inherit'}>Sign Out</Button>
                </span>
                :
                <span>
                <Button component={Link} to={'/signin'} color={'inherit'}>Sign In</Button>
                <Button component={Link} to={'/signup'} color={'inherit'}>Sign Up</Button>
                </span>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    }
};
const mapDispatchToProps = dispatch => {
    return {
        loadCurrentUser: async () => {
            dispatch(currentUserLoadStarted());
            let json = await api.GET('currentUser');
            dispatch(currentUserLoadSuccess(json));
        },
        doLogoutCall: async () => {
            dispatch(logoutStarted());
            let json = await api.POST('logout');
            dispatch(logoutSuccess(json));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginBlock);