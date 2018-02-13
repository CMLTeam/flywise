import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class User extends Component {
    render() {
        return (
            <div className="user">
                #{this.props.id}
                {' '}{this.props.firstName} {this.props.lastName}
                {' '}<Link to={`/user/${this.props.id}`}>View</Link>
                {' '}<Link to={`/user/${this.props.id}/edit`}>Edit</Link>
            </div>
        );
    }
}

export default User;
