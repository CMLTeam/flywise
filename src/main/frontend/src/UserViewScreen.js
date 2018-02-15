import React, {Component} from 'react';
import {api} from './api';
import {Link} from 'react-router-dom';
import {userLoadStarted, userLoadSuccess} from "./redux/actions";
import { connect } from 'react-redux';

class UserViewScreen extends Component {
    constructor(props) {
        super(props);
        this.userId = props.match.params.id;
    }

    async componentDidMount() {
        this.props.dispatch(userLoadStarted(this.userId));
        const json = await api.GET(`user/${this.userId}`);
        this.props.dispatch(userLoadSuccess(json));
    }

    render() {
        return this.props.user ? (
            <div>
                <h3>User</h3>
                <div><b>Id: </b> {this.userId}</div>
                <div><b>Firstname: </b> {this.props.user.firstName}</div>
                <div><b>Lastname: </b> {this.props.user.lastName}</div>
                <div><b>Email: </b> {this.props.user.email}</div>
                <div><b>Phone: </b> {this.props.user.phone}</div>
                <Link to={`/user/${this.userId}/edit`}>Edit</Link>
            </div>
        ) : (
            <div>Loading...</div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.selectedUser
    }
};

export default UserViewScreen = connect(mapStateToProps)(UserViewScreen);