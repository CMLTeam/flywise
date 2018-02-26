import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {api} from './api';
import {usersLoadStarted, usersLoadSuccess} from "./redux/actions";
import {Link} from "react-router-dom";
import {withStyles} from "material-ui/styles/index";
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui-icons/Edit';
import VisibilityIcon from 'material-ui-icons/Visibility';

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
                <Typography variant="display1" align={'center'}>
                    Users
                </Typography>
                {
                    this.props.currentUser.role === 'ROLE_ADMIN' &&
                    <Button variant="raised" size={'small'} color="primary" component={Link} to={`/user/add`}>Add</Button>
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
                                        <IconButton className={classes.button} color={'default'} aria-label="View"
                                                    component={Link}
                                                    to={`/user/${u.id}`}>
                                            <VisibilityIcon />
                                        </IconButton>
                                        {
                                            this.canEdit(u) && <IconButton className={classes.button} color={'default'} aria-label="Edit"
                                                                          component={Link}
                                                                          to={`/user/${u.id}/edit`}>
                                                <EditIcon />
                                            </IconButton>
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
