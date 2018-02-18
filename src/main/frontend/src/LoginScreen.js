import React, {Component} from 'react';
import {api} from './api';
import {loginStarted, loginSuccess} from "./redux/actions";
import {connect} from "react-redux";

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
        this.props.doLoginCall({
            login: this.state.login,
            password: this.state.password
        });
    };
    render() {
        return (
            <div>
                <h2>Login</h2>
                <div>
                    <div>
                        Login: <input type={'text'} name={'login'}
                                      value={this.state.login||""} onChange={this.handleOnChange}/>
                    </div>
                    <div>
                        Password: <input type={'password'} name={'password'}
                                         value={this.state.password||""} onChange={this.handleOnChange}/>
                    </div>
                    <button type={'button'} onClick={this.doLogin}>Login</button>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    }
};
const mapDispatchToProps = dispatch => {
    return {
        doLoginCall: async (loginData) => {
            dispatch(loginStarted(loginData));
            let json = await api.POST('login', loginData);
            dispatch(loginSuccess(json));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);