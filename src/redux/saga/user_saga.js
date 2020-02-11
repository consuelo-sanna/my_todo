import { call, put } from 'redux-saga/effects';

import {
    user_check_success,
    user_login_success,
    user_login_failed,
    user_registration_success,
    user_registration_failed,
} from '../ActionCreators';

const urlAuth = 'http://localhost:5000/api/auth';
const urlReg = 'http://localhost:5000/api/users';
const urlAuthCheck = 'http://localhost:5000/api/auth/user';

export const headersConfig = () => {
    // Get token from local storage
    const token = localStorage.getItem('jwtToken');
    //Headers
    const config = {
        headers: {
            'Content-type': 'application/json',
        },
    };
    // if token, add to headers
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
};

export function* attemptLogin(action) {
    let isSuccess = null;
    const userData = {
        email: action.payload.email,
        password: action.payload.password,
    };
    const response = yield fetch(urlAuth, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => {
        isSuccess = res.status === 200;
        return res.json();
    });
    if (isSuccess) {
        yield put(user_login_success(response));
    } else {
        yield put(user_login_failed(response));
    }
}

// ancora non inserisce nome e cognome
export function* attemptRegistration(action) {
    var isSuccess = null;
    const userData = {
        name: action.payload.name,
        lastname: action.payload.lastname,
        email: action.payload.email,
        password: action.payload.password,
    };
    const response = yield fetch(urlReg, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => {
        isSuccess = res.status === 200;
        return res.json();
    });
    if (isSuccess) {
        yield put(user_registration_success(response));
    } else {
        yield put(user_registration_failed(response));
    }
}

export function* checkToken() {
    console.log('sono dentro check Token');
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('jwtToken');
    try {
        const response = yield fetch(urlAuthCheck, {
            method: 'GET',
            headers: headersConfig().headers,
        });
        const body = yield call([response, response.json]);
        console.log(body); // array con i miei todos
        if (body.email === user) {
            yield put(user_check_success({ ...body, token }));
        }
    } catch (e) {
        console.log(e);
    }
}
