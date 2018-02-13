import React, { Component } from 'react';
import {API_ROOT} from './api-cfg';

export default class UserEditScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: props.match.params.id
        };
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    async componentDidMount() {
        const res = await fetch(`${API_ROOT}/user/${this.state.userId}`);
        const json = await res.json();
        this.setState({user: json})
    }

    handleOnChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            user: {
                ...this.state.user,
                [name]: value
            }
        });
    }

    render() {
        return this.state.user ? (
            <div>
                <h3>Edit User</h3>
                <div><b>Id: </b> {this.state.user.id}</div>
                <div><b>Firstname: </b> 
                    <input type="text" name={'firstName'} value={this.state.user.firstName} onChange={this.handleOnChange}/></div>
                <div><b>Lastname: </b>
                    <input type="text" name={'lastName'} value={this.state.user.lastName} onChange={this.handleOnChange}/></div>
                <div><b>Email: </b>
                    <input type="text" name={'email'} value={this.state.user.email} onChange={this.handleOnChange}/></div>
                <div><b>Phone: </b>
                    <input type="text" name={'phone'} value={this.state.user.phone} onChange={this.handleOnChange}/></div>
            </div>
        ) : (
            <div>Loading...</div>
        );
    }
};