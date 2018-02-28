import {
    CURRENT_USER_LOAD_STARTED,
    CURRENT_USER_LOAD_SUCCESS,
    ROUTE_CHANGED,
    SIGN_IN_FAILED,
    SIGN_IN_STARTED,
    SIGN_IN_SUCCESS,
    SIGN_OUT_STARTED,
    SIGN_OUT_SUCCESS,
    SIGN_UP_FAILED,
    SIGN_UP_STARTED,
    SIGN_UP_SUCCESS,
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

export const signInStarted = (username) => ({
    type: SIGN_IN_STARTED,
    username
});

export const signInSuccess = (currentUser) => ({
    type: SIGN_IN_SUCCESS,
    currentUser
});

export const signInFailed = (error) => ({
    type: SIGN_IN_FAILED,
    error
});

export const signUpStarted = (email) => ({
    type: SIGN_UP_STARTED,
    email
});

export const signUpSuccess = (currentUser) => ({
    type: SIGN_UP_SUCCESS,
    currentUser
});

export const signUpFailed = (error) => ({
    type: SIGN_UP_FAILED,
    error
});

export const signOutStarted = () => ({
    type: SIGN_OUT_STARTED,
});

export const signOutSuccess = () => ({
    type: SIGN_OUT_SUCCESS,
});

export const routeChanged = (location, action) => ({
    type: ROUTE_CHANGED,
    location,
    action,
});


