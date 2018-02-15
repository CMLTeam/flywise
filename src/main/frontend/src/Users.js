import React, {Component} from 'react';
import { connect } from 'react-redux';
import {api} from './api';
import User from "./User";
import {userLoadStarted, userLoadSuccess} from "./redux/actions";

class Users extends Component {
    async componentDidMount() {
        this.props.dispatch(userLoadStarted());
        const json = await api.GET('user');
        this.props.dispatch(userLoadSuccess(json));
    }
    
    render() {
        return (
            <div className="users">
                <h2>Users</h2>
                {this.props.users.map(u =>
                    <User key={u.id}
                          id={u.id}
                          firstName={u.firstName}
                          lastName={u.lastName} />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.users
    }
};

export default Users = connect(mapStateToProps)(Users);
