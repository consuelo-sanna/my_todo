/**
 * Qui devo inserire tutti generatori di funzione/saga che voglio usare come middleware
 */

import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

export function* helloSaga() {
    console.log('Hello Sagas!');
}
