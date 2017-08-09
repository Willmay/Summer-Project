import {combineReducers} from 'redux';
// import expect from 'expect';
import {
    REQUEST_LOGIN,
    RECEIVE_LOGIN,
    LOGIN_ERROR,
    UPDATE_USER_PROFILE,
    REQUEST_USER_PROFILE,
    RECEIVE_USER_PROFILE
} from './actions';

function updateUserProfile(state = {}, action) {
    return Object.assign({}, state,
        action.data
    );
}

/*
 expect(
 updateUserProfile({}, {
 type: UPDATE_USER_PROFILE,
 username: 'json.username',
 name: 'json.name',
 photo: 'json.photo',
 location: 'json.location',
 background: 'json.background',
 home: 'json.home',
 short_description: 'json.short_description',
 saved_users: 'json.saved_users',
 id: -1
 })
 ).toEqual({
 username: 'json.username',
 name: 'json.name',
 photo: 'json.photo',
 location: 'json.location',
 background: 'json.background',
 home: 'json.home',
 short_description: 'json.short_description',
 saved_users: 'json.saved_users',
 id: -1
 });
 */

function updateUsers(state = {}, action) {
    return Object.assign({}, state, {
        [action.id]: updateUserProfile(state[action.id], action)
    });
}

function updateEntities(state = {
    isFetching: false,
}, action) {
    switch (action.type) {
        case UPDATE_USER_PROFILE:
            return Object.assign({}, state, {
                users: updateUsers(state.users, action)
            });
        case REQUEST_USER_PROFILE:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case RECEIVE_USER_PROFILE:
            return Object.assign({}, state, {
                isFetching: false,
                users: updateUsers(state.users, action)
            });
        default:
            return state;
    }
}

function login(state = {
    isFetching: false,
    id: null,
    error: null,
    lastUpdated: null
}, action) {
    switch (action.type) {
        case REQUEST_LOGIN:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_LOGIN:
            return Object.assign({}, state, {
                isFetching: false,
                id: action.id,
                lastUpdated: action.receivedAt
            });
        case LOGIN_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    mainUser: login,
    entities: updateEntities
});

//console.log('Tests passed!');

export default rootReducer;
