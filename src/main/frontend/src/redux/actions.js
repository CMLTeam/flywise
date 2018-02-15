import {USERS_LOAD_STARTED, USERS_LOAD_SUCCESS} from "./actionTypes";

export const userLoadStarted = () => ({
    type: USERS_LOAD_STARTED
});

export const userLoadSuccess = (users) => ({
    type: USERS_LOAD_SUCCESS,
    users
});
