import { call, put } from 'redux-saga/effects';

import { statistics_get_success } from '../ActionCreators';

import { baseUrl } from '../shared/baseUrl';
import { headersConfig } from '../shared/helper';

const urlTodosStatistics = baseUrl + '/api/statistics/';

//fetch get del server, ricevuta la risposta fa un dispatch per reducer redux
// devi dare anche l user
export function* getStatistics() {
    //yield put(set_loading_todos_true());

    try {
        const response = yield fetch(urlTodosStatistics, {
            method: 'GET',
            headers: headersConfig().headers,
        });
        const body = yield call([response, response.json]);
        console.log(body);
        yield put(statistics_get_success(body));
    } catch (e) {
        console.log(e);
    }
}
