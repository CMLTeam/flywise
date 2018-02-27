import {
    CURRENT_USER_LOAD_STARTED,
    CURRENT_USER_LOAD_SUCCESS,
    LOGIN_FAILED,
    LOGIN_STARTED,
    LOGIN_SUCCESS,
    LOGOUT_STARTED,
    LOGOUT_SUCCESS,
    ROUTE_CHANGED,
    USER_LOAD_STARTED,
    USER_LOAD_SUCCESS,
    USERS_LOAD_STARTED,
    USERS_LOAD_SUCCESS
} from "./actionTypes";

export const usersLoadStarted = () => ({
    type: USERS_LOAD_STARTED
});

export const usersLoadSuccess = (users) => ({
    type: USERS_LOAD_SUCCESS,
    users
});

export const userLoadStarted = (id) => ({
    type: USER_LOAD_STARTED,
    id
});

export const userLoadSuccess = (user) => ({
    type: USER_LOAD_SUCCESS,
    user
});

export const currentUserLoadStarted = () => ({
    type: CURRENT_USER_LOAD_STARTED
});

export const currentUserLoadSuccess = (currentUser) => ({
    type: CURRENT_USER_LOAD_SUCCESS,
    currentUser
});

export const loginStarted = (loginData) => ({
    type: LOGIN_STARTED,
    loginData
});

export const loginSuccess = (currentUser) => ({
    type: LOGIN_SUCCESS,
    currentUser
});

export const loginFailed = (error) => ({
    type: LOGIN_FAILED,
    error
});

export const logoutStarted = () => ({
    type: LOGOUT_STARTED,
});

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
});

export const routeChanged = (location, action) => ({
    type: ROUTE_CHANGED,
    location,
    action,
});


