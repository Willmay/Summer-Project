import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export const REQUEST_USER_PROFILE = 'REQUEST_USER_PROFILE';
export const RECEIVE_USER_PROFILE = 'RECEIVE_USER_PROFILE';

export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const REQUEST_LOGOUT = 'REQUEST_LOGOUT';
export const RECEIVE_LOGOUT = 'RECEIVE_LOGOUT';

export const REQUEST_SIGNUP = 'REQUEST_SIGNUP';
export const RECEIVE_SIGNUP = 'RECEIVE_SIGNUP';

function requestLogin() {
    return {
        type: REQUEST_LOGIN
    }
}

function userProfile(data) {
    console.log('user: ', data.id);
    return {
        type: UPDATE_USER_PROFILE,
        id: data.id,
        data: data
    }
}

function requestUserProfile() {
    return {
        type: REQUEST_USER_PROFILE,
    }
}

function receiveUserProfile(data) {
    return {
        type: RECEIVE_USER_PROFILE,
        id: data.id,
        data: data,
    }
}

function receiveLogin(id) {
    return {
        type: RECEIVE_LOGIN,
        id: id,
        receivedAt: Date.now()
    }
}

function loginError(error) {
    return {
        type: LOGIN_ERROR,
        error: error
    }
}

export function login(username, password) {
    return dispatch => {
        dispatch(requestLogin());
        return axios.post('http://localhost:8000/api/v1/users/login', {
            username: username,
            password: password
        })
            .then(function (response) {
                dispatch(userProfile(response.data));
                dispatch(receiveLogin(response.data.id))
            })
            .catch(function (error) {
                dispatch(loginError(error));
            });
    }
}

export function updateUserProfile(id, username, name, photo, location, home, introduction, isEditPhoto) {
    let updateInfo = new FormData();

    updateInfo.append('username', username);
    updateInfo.append('name', name);
    if (isEditPhoto) {
        updateInfo.append('photo', photo);
    }
    updateInfo.append('location', location);
    updateInfo.append('home', home);
    updateInfo.append('short_description', introduction);

    return dispatch => {
        dispatch(requestUserProfile());
        return axios.put('/api/v1/users/' + id + '/', updateInfo, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then(function (response) {
            dispatch(receiveUserProfile(response.data));
        }).catch(function (error) {
            console.log(error);
        });
    }
}
