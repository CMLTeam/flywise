import React, { Component } from 'react';

class LoginScreen extends Component {
    render() {
        return (
            <div>
                <h2>Login</h2>
                <div>
                    <div>
                        Login: <input type={'text'} />
                    </div>
                    <div>
                        Password: <input type={'password'}/>
                    </div>
                    <button type={'button'}>Login</button>
                </div>
            </div>
        );
    }
}
export default LoginScreen;