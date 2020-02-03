/**
 * Qui devo inserire tutti generatori di funzione/saga che voglio usare come middleware
 */

import { all, put, takeEvery, call } from 'redux-saga/effects';

function* helloSaga() {
    console.log('Hello Sagas!');
}

export const delay = ms => new Promise(res => setTimeout(res, ms));
// Our worker Saga: will perform the async mark task
export function* markAsync(action) {
    console.log('sono dentro mark async di saga');
    console.log(action);
    yield call(delay, 3000);
    yield put({ type: 'MARK_TODO', payload: action.payload });
}

export function* addAsync(action) {
    console.log('sono dentro add async di saga');
    console.log(action);
    yield call(delay, 3000);
    yield put({ type: 'ADD_TODO', payload: action.payload });
}

// Our watcher Saga: spawn a new markAsync task on each MARK_ASYNC
function* watchAsync() {
    console.log('sono dentro async mark di saga');
    yield takeEvery('ASYNC_MARK_TODO', markAsync);
    yield takeEvery('ASYNC_ADD_TODO', addAsync);
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([helloSaga(), watchAsync()]);
}
