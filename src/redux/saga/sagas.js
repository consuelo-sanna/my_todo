/**
 * Qui devo inserire tutti generatori di funzione/saga che voglio usare come middleware
 */

import { takeEvery, call } from 'redux-saga/effects';

import {
    ADD_TODO,
    EDIT_TODO,
    MOD_TEXT,
    DEL_TODO,
    MARK_TODO,
    UPDATE_TEXT,
} from '../ActionTypes';

export const delay = ms => new Promise(res => setTimeout(res, ms));

const urlTodos = 'http://localhost:5000/api/todos';

// Our worker Saga: will perform the async mark task
export function* markAsync() {
    const response = yield fetch(urlTodos).then(res => res.json());
    console.log(JSON.stringify(response));
}

export function* addAsync() {
    const response = yield fetch(urlTodos, {
        method: 'POST',
    }).then(res => res.json());
    console.log(JSON.stringify(response));
}

export function* editAsync(action) {
    const response = yield fetch(urlTodos + '/1', {
        method: 'PUT',
    }).then(res => res.json());
    console.log(JSON.stringify(response));
}

export function* delAsync(action) {
    const response = yield fetch(urlTodos + '/' + action.payload, {
        method: 'DELETE',
    }).then(res => res.json());
    console.log(JSON.stringify(response));
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
}
