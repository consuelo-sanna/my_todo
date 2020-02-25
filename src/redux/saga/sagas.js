/**
 * Qui devo inserire tutti generatori di funzione/saga che voglio usare come middleware
 */

import { takeEvery } from 'redux-saga/effects';
import {
    markAsync,
    addAsync,
    editAsync,
    delAsync,
    getByUser,
    filedownload,
} from './todos_saga';
import {
    attemptLogin,
    attemptRegistration,
    checkToken,
} from './user_saga';

import { getStatistics } from './statistics_saga';

import {
    ADD_TODO,
    EDIT_TODO,
    DEL_TODO,
    MARK_TODO,
    GET_TODOS,
    USER_LOGIN_ATTEMPT,
    USER_REGISTRATION_ATTEMPT,
    USER_CHECK_TOKEN,
    STATISTICS_GET,
    FILE_DOWNLOAD,
} from '../ActionTypes';

export default function* rootSaga() {
    yield takeEvery(MARK_TODO, markAsync);
    yield takeEvery(ADD_TODO, addAsync);
    yield takeEvery(EDIT_TODO, editAsync);
    yield takeEvery(DEL_TODO, delAsync);
    yield takeEvery(GET_TODOS, getByUser);
    yield takeEvery(USER_LOGIN_ATTEMPT, attemptLogin);
    yield takeEvery(USER_REGISTRATION_ATTEMPT, attemptRegistration);
    yield takeEvery(USER_CHECK_TOKEN, checkToken);
    yield takeEvery(STATISTICS_GET, getStatistics);
    yield takeEvery(FILE_DOWNLOAD, filedownload);
}
