import React, { Component } from 'react';
import {api} from './api';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    handleOnChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };
    doLogin = async (event) => {
        let res = await api.POST('login', {
            login: this.state.login,
            password: this.state.password
        });
        console.info(111,res)
    };
    render() {
        return (
            <div>
                <h2>Login</h2>
                <div>
                    <div>
                        Login: <input type={'text'} name={'login'} value={this.state.login}  onChange={this.handleOnChange}/>
                    </div>
                    <div>
                        Password: <input type={'password'} name={'password'} value={this.state.password}  onChange={this.handleOnChange}/>
                    </div>
                    <button type={'button'} onClick={this.doLogin}>Login</button>
                </div>
            </div>
        );
    }
}
export default LoginScreen;