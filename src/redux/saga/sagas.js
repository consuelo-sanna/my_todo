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
// Our worker Saga: will perform the async mark task
export function* markAsync(action) {
    console.log('sono dentro mark async di saga');
    console.log(action);
    yield call(delay, 200);
}

export function* addAsync() {
    yield call(delay, 200);
    console.log('sono dentro add async di saga');
}

export function* editAsync() {
    yield call(delay, 200);
    console.log('sono dentro edit async di saga');
}

export function* delAsync() {
    yield call(delay, 200);
    console.log('sono dentro delete async di saga');
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
