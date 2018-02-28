import {combineReducers} from "redux";
import {
    CURRENT_USER_LOAD_STARTED,
    CURRENT_USER_LOAD_SUCCESS,
    ROUTE_CHANGED,
    SIGN_IN_FAILED,
    SIGN_IN_SUCCESS,
    SIGN_OUT_SUCCESS,
    SIGN_UP_FAILED,
    SIGN_UP_SUCCESS,
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
        case SIGN_OUT_SUCCESS:
            return initialState.currentUser;
        case CURRENT_USER_LOAD_SUCCESS:
        case SIGN_IN_SUCCESS:
        case SIGN_UP_SUCCESS:
            return action.currentUser;
        default:
            return state;
    }
};

const error = (state = initialState.error, action) => {
    switch (action.type) {
        case SIGN_IN_FAILED:
            return 'Invalid email or password';
        case SIGN_UP_FAILED:
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