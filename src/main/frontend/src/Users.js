import React, {Component} from 'react';
import { connect } from 'react-redux';
import {api} from './api';
import User from "./User";
import {usersLoadStarted, usersLoadSuccess} from "./redux/actions";
import {Link} from "react-router-dom";

class Users extends Component {
    async componentDidMount() {
        this.props.dispatch(usersLoadStarted());
        const json = await api.GET('user');
        this.props.dispatch(usersLoadSuccess(json));
    }
    
    render() {
        return (
            <div className="users">
                <h2>Users</h2>
                {this.props.users.map(u =>
                    <User key={u.id}
                          currentUser={this.props.currentUser}
                          {...u}
                    />
                )}
                {
                    this.props.currentUser.role === 'ROLE_ADMIN' && <Link to={`/user/add`}>Add</Link>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.users,
        currentUser: state.currentUser
    }
};

export default Users = connect(mapStateToProps)(Users);
