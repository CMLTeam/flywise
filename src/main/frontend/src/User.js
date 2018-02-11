import React, { Component } from 'react';

class User extends Component {
    render() {
        return (
            <div className="user">#{this.props.id} {this.props.firstName} {this.props.lastName}</div>
        );
    }
}

export default User;
