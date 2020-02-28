import { call, put } from 'redux-saga/effects';

import {
    user_check_success,
    user_login_success,
    user_login_failed,
    user_registration_success,
    user_registration_failed,
    set_loading_true,
    set_loading_false,
} from '../ActionCreators';

import { baseUrl } from '../shared/baseUrl';
import { headersConfig } from '../shared/helper';

const urlAuth = baseUrl + '/api/auth';
const urlReg = baseUrl + '/api/users';
const urlAuthCheck = baseUrl + '/api/auth/user';

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
    })
        .then(res => {
            isSuccess = res.status === 200;
            return res.json();
        })
        .catch(e => console.log(e.message));
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
    })
        .then(res => {
            isSuccess = res.status === 200;
            return res.json();
        })
        .catch(e => console.log(e.message));
    if (isSuccess) {
        yield put(user_registration_success(response));
    } else {
        yield put(user_registration_failed(response));
    }
}

export function* checkToken() {
    yield put(set_loading_true());
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('jwtToken');
    try {
        const response = yield fetch(urlAuthCheck, {
            method: 'GET',
            headers: headersConfig().headers,
        });
        console.log(response);
        if (response.status !== 200) {
            yield put(set_loading_false());
            yield put(
                user_login_failed({
                    msg: 'server error, try again later',
                })
            );
        } else {
            const body = yield call([response, response.json]);
            if (body.email === user) {
                yield put(user_check_success({ ...body, token }));
                yield put(set_loading_false());
            }
        }
    } catch (e) {
        yield put(set_loading_false());
    }
}
