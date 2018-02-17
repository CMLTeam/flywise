import React, {Component} from 'react';
import {api} from './api';
import {connect} from 'react-redux';
import {userLoadStarted, userLoadSuccess} from "./redux/actions";

class UserEditScreen extends Component {
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
            this.setState({user: {enabled:true}})
        }
    }

    handleOnChange = (event) => {
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
        } catch(e) {
            // TODO
            alert('Error: ' + e)
        }
    };

    render() {
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
                <div><b>Username: </b>
                    <input type="text" name={'username'}
                           value={this.state.user.username||''}
                           onChange={this.handleOnChange}/></div>
                <div><b>Enabled: </b>
                    <input type="checkbox" name={'enabled'}
                           checked={this.state.user.enabled||false}
                           onChange={this.handleOnChange}/></div>
                <div><b>Password: </b>
                    <input type="text" name={'password'}
                           value={this.state.user.password||''}
                           onChange={this.handleOnChange}/></div>
                <div><b>Password (repeat): </b>
                    <input type="text" name={'password2'}
                           value={this.state.user.password2||''}
                           onChange={this.handleOnChange}/></div>
                <div><b>Role: </b>
                    <select name={'role'}
                           value={this.state.user.role||''}
                            onChange={this.handleOnChange}>
                        <option value={''}>--select--</option>
                        <option value={'ROLE_USER'}>ROLE_USER</option>
                        <option value={'ROLE_ADMIN'}>ROLE_ADMIN</option>
                    </select>
                </div>
                <div><b>Firstname: </b>
                    <input type="text" name={'firstName'}
                           value={this.state.user.firstName||''}
                           onChange={this.handleOnChange}/></div>
                <div><b>Lastname: </b>
                    <input type="text" name={'lastName'}
                           value={this.state.user.lastName||''}
                           onChange={this.handleOnChange}/></div>
                <div><b>Email: </b>
                    <input type="text" name={'email'}
                           value={this.state.user.email||''}
                           onChange={this.handleOnChange}/>
                </div>
                <div><b>Phone: </b>
                    <input type="text" name={'phone'}
                           value={this.state.user.phone||''}
                           onChange={this.handleOnChange}/>
                </div>
                <button type={'button'} onClick={this.handleSave}>Save</button>
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

export default UserEditScreen = connect(mapStateToProps)(UserEditScreen);

