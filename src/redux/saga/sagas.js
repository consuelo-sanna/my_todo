/**
 * Qui devo inserire tutti generatori di funzione/saga che voglio usare come middleware
 */

import { takeEvery, call, put } from 'redux-saga/effects';

import {
    ADD_TODO,
    EDIT_TODO,
    MOD_TEXT,
    DEL_TODO,
    MARK_TODO,
    UPDATE_TEXT,
    GET_TODOS,
    GET_TODOS_SUCCESS,
    DEL_TODO_SUCCESS,
    ADD_TODO_SUCCESS,
    EDIT_TODO_SUCCESS,
    MARK_TODO_SUCCESS,
} from '../ActionTypes';

export const delay = ms => new Promise(res => setTimeout(res, ms));

const urlTodos = 'http://localhost:5000/api/todos';

// Our worker Saga: will perform the async mark task

//fetch get del server, ricevuta la risposta fa un dispatch per reducer redux
export function* getAll() {
    console.log('sono dentro getall');
    try {
        const response = yield call(fetch, urlTodos);
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
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json());
    console.log(JSON.stringify(response));

    yield put({ type: ADD_TODO_SUCCESS, payload: response });
}

export function* markAsync(action) {
    const elemento = yield fetch(urlTodos + '/' + action.payload);
    const body = yield call([elemento, elemento.json]);
    const marked = {
        testo: body.testo,
        completed: !body.completed,
    };
    const response = yield fetch(urlTodos + '/' + action.payload, {
        method: 'PUT',
        body: JSON.stringify(marked),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json());
    console.log(JSON.stringify(response));
    yield put({ type: MARK_TODO_SUCCESS, payload: action.payload });
}

export function* editAsync(action) {
    const response = yield fetch(urlTodos + '/' + action.payload.id, {
        method: 'PUT',
        body: JSON.stringify(action.payload),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json());
    console.log(JSON.stringify(response));
    yield put({ type: EDIT_TODO_SUCCESS, payload: action.payload });
}

export function* delAsync(action) {
    const response = yield fetch(urlTodos + '/' + action.payload, {
        method: 'DELETE',
    }).then(res => res.json());
    console.log(JSON.stringify(response));
    yield put({ type: DEL_TODO_SUCCESS, payload: action.payload });
}

export function* updateAsync() {
    yield call(delay, 200);
    console.log('sono dentro update async di saga');
}
export function* modAsync() {
    yield call(delay, 200);
    console.log('sono dentro mod async di saga');
}

export default function* rootSaga() {
    yield takeEvery(MARK_TODO, markAsync);
    yield takeEvery(ADD_TODO, addAsync);
    yield takeEvery(EDIT_TODO, editAsync);
    yield takeEvery(DEL_TODO, delAsync);
    yield takeEvery(UPDATE_TEXT, updateAsync);
    yield takeEvery(MOD_TEXT, modAsync);
    yield takeEvery(GET_TODOS, getAll);
}
