/**
 * Qui devo inserire tutti generatori di funzione/saga che voglio usare come middleware
 */

import { all, put, takeEvery } from 'redux-saga/effects';

function* helloSaga() {
    console.log('Hello Sagas!');
}

const delay = ms => new Promise(res => setTimeout(res, ms));
// Our worker Saga: will perform the async increment task
function* markAsync() {
    yield delay(3000);
    yield put({ type: 'MARK_TODO' });
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
function* watchMarkAsync() {
    yield takeEvery('ASYNC_MARK_TODO', markAsync);
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([helloSaga(), watchMarkAsync()]);
}
