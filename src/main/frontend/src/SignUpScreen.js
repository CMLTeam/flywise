import React, {Component} from 'react';
import {api} from './api';
import {signInStarted, signInSuccess, signUpFailed, signUpStarted, signUpSuccess} from "./redux/actions";
import {connect} from "react-redux";
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

class SignUpScreen extends Component {
    state = {};

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    doSignUp = async (event) => {
        this.props.doSignUpCall({
            email: this.state.email,
            password: this.state.password
        });
    };

    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <Typography variant="display1" align={'center'}>
                    Sign Up
                </Typography>
                <Typography variant="subheading" align={'center'} color={'error'}>
                    {this.props.error}
                </Typography>
                <Grid container>
                    <Grid item xs={12}>
                        <TextField
                            name={'email'}
                            label={'Email *'}
                            value={this.state.email || ""}
                            onChange={this.handleChange}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type={'password'}
                            name={'password'}
                            label={'Password *'}
                            value={this.state.password || ""}
                            onChange={this.handleChange}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type={'password'}
                            name={'password2'}
                            label={'Password (confirm) *'}
                            value={this.state.password2 || ""}
                            onChange={this.handleChange}/>
                    </Grid>
                </Grid>
                <br/>
                <Button variant={'raised'} color={'primary'} onClick={this.doSignUp}>Sign Up</Button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.currentUser,
    error: state.error,
});
const mapDispatchToProps = dispatch => ({
    doSignUpCall: async (data) => {
        dispatch(signUpStarted(data.email));
        try {
            let json = await api.POST('signup', data);
            dispatch(signUpSuccess(json));
        } catch (e) {
            dispatch(signUpFailed(e.message));
        }
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);