import React, {Component} from 'react';
import {API_ROOT} from './api-cfg';
import {Link} from 'react-router-dom';

export default class UserViewScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: props.match.params.id
        }
    }

    async componentDidMount() {
        const res = await fetch(`${API_ROOT}/user/${this.state.userId}`);
        const json = await res.json();
        this.setState({user: json})
    }

    render() {
        return this.state.user ? (
            <div>
                <h3>User</h3>
                <div><b>Id: </b> {this.state.user.id}</div>
                <div><b>Firstname: </b> {this.state.user.firstName}</div>
                <div><b>Lastname: </b> {this.state.user.lastName}</div>
                <div><b>Email: </b> {this.state.user.email}</div>
                <div><b>Phone: </b> {this.state.user.phone}</div>
                <Link to={`/user/${this.state.userId}/edit`}>Edit</Link>
            </div>
        ) : (
            <div>Loading...</div>
        );
    }
};