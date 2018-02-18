import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {api} from "./api";
import {currentUserLoadStarted, currentUserLoadSuccess} from "./redux/actions";

class LoginBlock extends Component {
    async componentDidMount() {
        await this.props.loadCurrentUser();
    }

    handleLogout = () => {

    };

    render() {
        return (
            this.props.currentUser.id ?
                <span>
                    Welcome, <b>{this.props.currentUser.username}</b> <a onClick={this.handleLogout}>Logout</a>
                </span>
                :
                <Link to={'/login'}>Login</Link>
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
        }
    }
};
export default LoginBlock = connect(mapStateToProps, mapDispatchToProps)(LoginBlock);