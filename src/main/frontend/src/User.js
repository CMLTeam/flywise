import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class User extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
    };

    canEdit = () => (
        this.props.id === this.props.currentUser.id || this.props.currentUser.role === 'ROLE_ADMIN'
    );

    render() {
        return (
            <div className="user">
                #{this.props.id}
                {' '}{this.props.username} {this.props.firstName} {this.props.lastName} {this.props.role}
                {' '}<Link to={`/user/${this.props.id}`}>View</Link>
                {' '}
                {
                    this.canEdit() && <Link to={`/user/${this.props.id}/edit`}>Edit</Link>
                }
            </div>
        );
    }
}

export default User;
