import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class User extends Component {
    render() {
        return (
            <div className="user">
                <Link to={`/user/${this.props.id}`}>#{this.props.id}</Link>
                {' '}{this.props.firstName} {this.props.lastName}
            </div>
        );
    }
}

export default User;
