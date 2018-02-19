import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {api} from './api';
import {usersLoadStarted, usersLoadSuccess} from "./redux/actions";
import {Link} from "react-router-dom";
import {withStyles} from "material-ui/styles/index";
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

class UsersScreen extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    async componentDidMount() {
        this.props.dispatch(usersLoadStarted());
        const json = await api.GET('user');
        this.props.dispatch(usersLoadSuccess(json));
    }

    canEdit = (u) => (
        u.id === this.props.currentUser.id || this.props.currentUser.role === 'ROLE_ADMIN'
    );

    render() {
        const { classes } = this.props;

        return (
            <div className="users">
                <h2>Users</h2>
                {
                    this.props.currentUser.role === 'ROLE_ADMIN' && <Link to={`/user/add`}>Add</Link>
                }
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Full name</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.users.map(u => {
                            return (
                                <TableRow key={u.id}>
                                    <TableCell>{u.id}</TableCell>
                                    <TableCell>{u.username}</TableCell>
                                    <TableCell>{u.firstName} {u.lastName}</TableCell>
                                    <TableCell>{u.role}</TableCell>
                                    <TableCell>
                                        <Link to={`/user/${u.id}`}>View</Link>
                                        {' '}
                                        {
                                            this.canEdit(u) && <Link to={`/user/${u.id}/edit`}>Edit</Link>
                                        }
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.users,
        currentUser: state.currentUser
    }
};

export default UsersScreen = withStyles(styles)(connect(mapStateToProps)(UsersScreen));
