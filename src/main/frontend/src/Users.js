import React, { Component } from 'react';
import { API_ROOT } from './api-cfg';
import User from "./User";

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        fetch(`${API_ROOT}testjs`).then(res => {
            return res.json()
        }).then(json => {
            this.setState({users: json})
        })
    }
    
    render() {
        return (
            <div className="users">
                <h2>Users</h2>
                {this.state.users.map(u =>
                    <User key={u.id}
                          id={u.id}
                          firstName={u.firstName}
                          lastName={u.lastName} />
                )}
            </div>
        );
    }
}

export default Users;
