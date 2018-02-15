import {USERS_LOAD_STARTED, USERS_LOAD_SUCCESS} from "./actionTypes";
import {combineReducers} from "redux";

const initialState = {
    currentUser: null,
    userInEdit: null,
    users: []
};

export function users(state = initialState.users, action) {
    switch (action.type) {
        case USERS_LOAD_STARTED:
            return state;
        case USERS_LOAD_SUCCESS:
            return action.users;
        default:
            return state;
    }
}

const reducer = combineReducers({
    users
});

export default reducer;