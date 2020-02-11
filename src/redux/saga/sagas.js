/**
 * Qui devo inserire tutti generatori di funzione/saga che voglio usare come middleware
 */

import { takeEvery, call, put } from 'redux-saga/effects';

import {
    ADD_TODO,
    EDIT_TODO,
    DEL_TODO,
    MARK_TODO,
    GET_TODOS,
    USER_LOGIN_ATTEMPT,
    USER_REGISTRATION_ATTEMPT,
    USER_CHECK_TOKEN,
} from '../ActionTypes';

import {
    user_check_success,
    get_todos_success,
    del_todo_success,
    add_todo_success,
    edit_todo_success,
    mark_todo_success,
    user_login_success,
    user_login_failed,
    user_registration_success,
    user_registration_failed,
} from '../ActionCreators';

export const delay = ms => new Promise(res => setTimeout(res, ms));

const urlTodos = 'http://localhost:5000/api/todos';
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

//fetch get del server, ricevuta la risposta fa un dispatch per reducer redux
// devi dare anche l user
export function* getByUser() {
    const user = localStorage.getItem('user');
    try {
        const response = yield fetch(urlTodos + '/' + user, {
            method: 'GET',
            headers: headersConfig().headers,
        });
        const body = yield call([response, response.json]);
        yield put(get_todos_success(body));
    } catch (e) {
        console.log(e);
    }
}

export function* addAsync(action) {
    const user = localStorage.getItem('user');
    const newTodo = { testo: action.payload, user: user };
    const response = yield fetch(urlTodos, {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: headersConfig().headers,
    }).then(res => res.json());
    console.log(JSON.stringify(response));

    yield put(add_todo_success(response));
}

export function* markAsync(action) {
    const marked = {
        completed: !action.payload.completed,
    };
    const response = yield fetch(urlTodos + '/' + action.payload.id, {
        method: 'PUT',
        body: JSON.stringify(marked),
        headers: headersConfig().headers,
    }).then(res => res.json());
    console.log(JSON.stringify(response));
    yield put(mark_todo_success(action.payload.id));
}

export function* editAsync(action) {
    const response = yield fetch(urlTodos + '/' + action.payload.id, {
        method: 'PUT',
        body: JSON.stringify(action.payload),
        headers: headersConfig().headers,
    }).then(res => res.json());
    console.log(JSON.stringify(response));
    yield put(edit_todo_success(action.payload));
}

export function* delAsync(action) {
    const response = yield fetch(urlTodos + '/' + action.payload, {
        method: 'DELETE',
        headers: headersConfig().headers,
    }).then(res => res.json());
    console.log(JSON.stringify(response));
    yield put(del_todo_success(action.payload));
}

export function* attemptLogin(action) {
    var isSuccess = null;
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

export default function* rootSaga() {
    yield takeEvery(MARK_TODO, markAsync);
    yield takeEvery(ADD_TODO, addAsync);
    yield takeEvery(EDIT_TODO, editAsync);
    yield takeEvery(DEL_TODO, delAsync);
    yield takeEvery(GET_TODOS, getByUser);
    yield takeEvery(USER_LOGIN_ATTEMPT, attemptLogin);
    yield takeEvery(USER_REGISTRATION_ATTEMPT, attemptRegistration);
    yield takeEvery(USER_CHECK_TOKEN, checkToken);
}
