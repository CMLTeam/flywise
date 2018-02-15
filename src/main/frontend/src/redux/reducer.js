import {USER_LOAD_STARTED, USER_LOAD_SUCCESS, USERS_LOAD_STARTED, USERS_LOAD_SUCCESS} from "./actionTypes";
import {combineReducers} from "redux";

const initialState = {
    currentUser: null,
    selectedUser: null, // view/edit
    users: []
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

const reducer = combineReducers({
    users,
    selectedUser,
});

export default reducer;