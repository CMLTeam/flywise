import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class User extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
    };
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
