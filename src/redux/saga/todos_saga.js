import { call, put } from 'redux-saga/effects';

import {
    get_todos_success,
    del_todo_success,
    add_todo_success,
    edit_todo_success,
    mark_todo_success,
} from '../ActionCreators';

import { baseUrl } from '../../shared/baseUrl';
import { headersConfig } from '../../shared/helper';

const urlTodos = baseUrl + '/api/todos';

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
