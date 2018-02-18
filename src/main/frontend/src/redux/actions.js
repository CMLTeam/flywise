import {
    CURRENT_USER_LOAD_STARTED, CURRENT_USER_LOAD_SUCCESS, USER_LOAD_STARTED, USER_LOAD_SUCCESS, USERS_LOAD_STARTED,
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


