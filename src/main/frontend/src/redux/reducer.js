import {combineReducers} from "redux";
import {
    CURRENT_USER_LOAD_STARTED,
    CURRENT_USER_LOAD_SUCCESS,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    ROUTE_CHANGED,
    USER_LOAD_STARTED,
    USER_LOAD_SUCCESS,
    USERS_LOAD_STARTED,
    USERS_LOAD_SUCCESS
} from "./actionTypes";

const initialState = {
    currentUser: {},
    selectedUser: null, // view/edit
    users: [],
    error: null,
};

const users = (state = initialState.users, action) => {
    switch (action.type) {
        case USERS_LOAD_STARTED:
            return state;
        case USERS_LOAD_SUCCESS:
            return action.users;
        default:
            return state;
    }
};

const selectedUser = (state = initialState.selectedUser, action) => {
    switch (action.type) {
        case USER_LOAD_STARTED:
            return initialState.selectedUser;
        case USER_LOAD_SUCCESS:
            return action.user;
        default:
            return state;
    }
};

const currentUser = (state = initialState.currentUser, action) => {
    switch (action.type) {
        case CURRENT_USER_LOAD_STARTED:
        case LOGOUT_SUCCESS:
            return initialState.currentUser;
        case CURRENT_USER_LOAD_SUCCESS:
        case LOGIN_SUCCESS:
            return action.currentUser;
        default:
            return state;
    }
};

const error = (state = initialState.error, action) => {
    switch (action.type) {
        case LOGIN_FAILED:
            return action.error;
        case ROUTE_CHANGED:
            return initialState.error;
        default:
            return state;
    }
};

const reducer = combineReducers({
    users,
    selectedUser,
    currentUser,
    error,
});

export default reducer;