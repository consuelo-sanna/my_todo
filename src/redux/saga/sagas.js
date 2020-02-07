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
    GET_TODOS_SUCCESS,
    DEL_TODO_SUCCESS,
    ADD_TODO_SUCCESS,
    EDIT_TODO_SUCCESS,
    MARK_TODO_SUCCESS,
    USER_LOGIN_ATTEMPT,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILED,
} from '../ActionTypes';

export const delay = ms => new Promise(res => setTimeout(res, ms));

const urlTodos = 'http://localhost:5000/api/todos';
const urlAuth = 'http://localhost:5000/api/auth';

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
export function* getAll() {
    console.log('sono dentro getall');
    try {
        const response = yield fetch(urlTodos, {
            method: 'GET',
            headers: headersConfig().headers,
        });
        const body = yield call([response, response.json]);
        console.log(body); // array con i miei todos
        yield put({ type: GET_TODOS_SUCCESS, payload: body });
    } catch (e) {
        console.log(e);
    }
}

export function* addAsync(action) {
    const newTodo = { testo: action.payload };
    const response = yield fetch(urlTodos, {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: headersConfig().headers,
    }).then(res => res.json());
    console.log(JSON.stringify(response));

    yield put({ type: ADD_TODO_SUCCESS, payload: response });
}

export function* markAsync(action) {
    const elemento = yield fetch(urlTodos + '/' + action.payload, {
        method: 'GET',
        headers: headersConfig().headers,
    });
    const body = yield call([elemento, elemento.json]);
    const marked = {
        testo: body.testo,
        completed: !body.completed,
    };
    const response = yield fetch(urlTodos + '/' + action.payload, {
        method: 'PUT',
        body: JSON.stringify(marked),
        headers: headersConfig().headers,
    }).then(res => res.json());
    console.log(JSON.stringify(response));
    yield put({ type: MARK_TODO_SUCCESS, payload: action.payload });
}

export function* editAsync(action) {
    const response = yield fetch(urlTodos + '/' + action.payload.id, {
        method: 'PUT',
        body: JSON.stringify(action.payload),
        headers: headersConfig().headers,
    }).then(res => res.json());
    console.log(JSON.stringify(response));
    yield put({ type: EDIT_TODO_SUCCESS, payload: action.payload });
}

export function* delAsync(action) {
    const response = yield fetch(urlTodos + '/' + action.payload, {
        method: 'DELETE',
        headers: headersConfig().headers,
    }).then(res => res.json());
    console.log(JSON.stringify(response));
    yield put({ type: DEL_TODO_SUCCESS, payload: action.payload });
}

// saga controlla se l'utente esiste e in quel caso fa dispatch login_success
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
        yield put({ type: USER_LOGIN_SUCCESS, payload: response });
    } else {
        yield put({ type: USER_LOGIN_FAILED, payload: response });
    }
}

export default function* rootSaga() {
    yield takeEvery(MARK_TODO, markAsync);
    yield takeEvery(ADD_TODO, addAsync);
    yield takeEvery(EDIT_TODO, editAsync);
    yield takeEvery(DEL_TODO, delAsync);
    yield takeEvery(GET_TODOS, getAll);
    yield takeEvery(USER_LOGIN_ATTEMPT, attemptLogin);
}
