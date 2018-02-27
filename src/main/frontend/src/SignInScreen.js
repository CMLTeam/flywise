import React, {Component} from 'react';
import {api} from './api';
import {loginFailed, loginStarted, loginSuccess} from "./redux/actions";
import {connect} from "react-redux";
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

class SignInScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };
    doSignIn = async (event) => {
        this.props.doLoginCall({
            username: this.state.username,
            password: this.state.password
        });
    };

    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <Typography variant="display1" align={'center'}>
                    Sign In
                </Typography>
                <Typography variant="subheading" align={'center'} color={'error'}>
                    {this.props.error}
                </Typography>
                <Grid container>
                    <Grid item xs={12}>
                        <TextField
                            name={'username'}
                            label={'Email'}
                            value={this.state.username || ""}
                            onChange={this.handleChange}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type={'password'}
                            name={'password'}
                            label={'Password'}
                            value={this.state.password || ""}
                            onChange={this.handleChange}/>
                    </Grid>
                </Grid>
                <br/>
                <Button variant={'raised'} color={'primary'} onClick={this.doSignIn}>Sign In</Button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.currentUser,
    error: state.error
});
const mapDispatchToProps = dispatch => ({
    doLoginCall: async (loginData) => {
        dispatch(loginStarted(loginData));
        try {
            let json = await api.POST('login', loginData);
            dispatch(loginSuccess(json));
        } catch (e) {
            dispatch(loginFailed(e.message));
        }
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);