import React, {Component} from 'react';
import {api} from './api';
import {connect} from 'react-redux';
import {userLoadStarted, userLoadSuccess} from "./redux/actions";
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import {FormControl, FormControlLabel,} from 'material-ui/Form';
import {InputLabel} from 'material-ui/Input';
import {MenuItem} from 'material-ui/Menu';
import Select from 'material-ui/Select';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    menu: {
        width: 200,
    },
});

class UserEditScreen extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.userId = props.match.params.id;
        this.state = {};
    }

    isEdit() {
        return this.userId;
    }

    async componentDidMount() {
        if (this.isEdit()) {
            this.props.dispatch(userLoadStarted(this.userId));
            const json = await api.GET(`user/${this.userId}`);
            this.props.dispatch(userLoadSuccess(json));
            this.setState({user: this.props.user});
        } else {
            this.setState({user: {enabled: true, deleted: false}})
        }
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            user: {
                ...this.state.user,
                [name]: value
            }
        });
    };

    handleSave = async (event) => {
        const user = this.state.user;
        try {
            const json = await api.POST('user', user);
            this.props.history.push(`/user/${json.id}`)
        } catch (e) {
            // TODO
            alert(e.message)
        }
    };

    handleDelete = async (event) => {
        try {
            const json = await api.DELETE(`user/${this.userId}`);
            this.props.history.push(`/users`)
        } catch (e) {
            // TODO
            alert(e.message)
        }
    };
    handleCancel = async (event) => {
        this.props.history.push(`/users`)
    };

    render() {
        const {classes} = this.props;

        return this.state.user ? (
            <div>
                {
                    this.isEdit()
                        ? <div>
                            <h3>Edit User</h3>
                            <div><b>Id: </b> {this.userId}</div>
                        </div>
                        : <h3>Add User</h3>
                }
                <form className={classes.container} noValidate autoComplete="off">
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField
                                id={'username'}
                                name={'username'}
                                label={'Username'}
                                className={classes.textField}
                                value={this.state.user.username || ''}
                                onChange={this.handleChange}
                                margin="normal"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        id={'enabled'}
                                        name={'enabled'}
                                        checked={this.state.user.enabled || false}
                                        onChange={this.handleChange}/>
                                }
                                label={'Enabled'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id={'password'}
                                name={'password'}
                                type={'password'}
                                label={'Password'}
                                className={classes.textField}
                                value={this.state.user.password || ''}
                                onChange={this.handleChange}
                                margin="normal"
                            />
                            <TextField
                                id={'password2'}
                                name={'password2'}
                                type={'password'}
                                label={'Password (repeat)'}
                                className={classes.textField}
                                value={this.state.user.password2 || ''}
                                onChange={this.handleChange}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="role">Role</InputLabel>
                                <Select
                                    value={this.state.user.role || ''}
                                    onChange={this.handleChange}
                                    inputProps={{
                                        name: 'role',
                                        id: 'role',
                                    }}>
                                    <MenuItem value=""><em>choose</em></MenuItem>
                                    <MenuItem value={'ROLE_USER'}>ROLE_USER</MenuItem>
                                    <MenuItem value={'ROLE_ADMIN'}>ROLE_ADMIN</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id={'firstName'}
                                name={'firstName'}
                                label={'First name'}
                                className={classes.textField}
                                value={this.state.user.firstName || ''}
                                onChange={this.handleChange}
                                margin="normal"
                            />
                            <TextField
                                id={'lastName'}
                                name={'lastName'}
                                label={'Last name'}
                                className={classes.textField}
                                value={this.state.user.lastName || ''}
                                onChange={this.handleChange}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id={'email'}
                                name={'email'}
                                label={'Email'}
                                className={classes.textField}
                                value={this.state.user.email || ''}
                                onChange={this.handleChange}
                                margin="normal"
                            />
                            <TextField
                                id={'phone'}
                                name={'phone'}
                                label={'Phone'}
                                className={classes.textField}
                                value={this.state.user.phone || ''}
                                onChange={this.handleChange}
                                margin="normal"
                            />
                        </Grid>
                    </Grid>
                    <Button variant={'raised'} color={'primary'} onClick={this.handleSave}>Save</Button>
                    {
                        this.isEdit() && <Button variant={'raised'} color={'secondary'} onClick={this.handleDelete}>Delete</Button>
                    }
                    <Button variant={'raised'} onClick={this.handleCancel}>Cancel</Button>
                </form>
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

export default withStyles(styles)(connect(mapStateToProps)(UserEditScreen));

