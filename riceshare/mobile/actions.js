import axios from 'axios';

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
	return {
		type: UPDATE_USER_PROFILE,
		data: data
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
		dispatch(requestLogin())
		return axios.post('http://192.168.1.104:8000/api/v1/users/login', {
	      username: username,
	      password: password
	    })
	    .then(function (response) {
	      dispatch(userProfile(response.data))
	      dispatch(receiveLogin(response.data.id))
	    })
	    .catch(function (error) {
	      dispatch(loginError(error));
	    });
	}
}












