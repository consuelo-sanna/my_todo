import { call, put } from 'redux-saga/effects';

import {
    get_todos_success,
    del_todo_success,
    add_todo_success,
    edit_todo_success,
    mark_todo_success,
    set_loading_todos_true,
    set_loading_todos_false,
} from '../ActionCreators';

import { baseUrl } from '../shared/baseUrl';
import { headersConfig } from '../shared/helper';

import { sendNotification } from '../shared/mySocket';

import { addSchema, valida } from '../../validation/schemas';

const urlTodos = baseUrl + '/api/todos';

//fetch get del server, ricevuta la risposta fa un dispatch per reducer redux
// devi dare anche l user
export function* getByUser() {
    yield put(set_loading_todos_true());
    const user = localStorage.getItem('user');
    try {
        const response = yield fetch(urlTodos + '/' + user, {
            method: 'GET',
            headers: headersConfig().headers,
        });
        const body = yield call([response, response.json]);
        yield put(set_loading_todos_false());
        yield put(get_todos_success(body));
    } catch (e) {
        console.log(e);
    }
}

//assicurati con joi ? che i campi testo e user ESISTANO
export function* addAsync(action) {
    debugger;
    const testo = action.payload.testo;
    let data = new FormData();
    const user = localStorage.getItem('user');
    if (valida({ user, testo }, addSchema)) {
        if (action.payload.file) {
            data.append(
                'file',
                action.payload.file,
                action.payload.file.name
            );
        }

        data.append('testo', testo);
        data.append('user', user);
        console.log(data);
        const response = yield fetch(urlTodos, {
            method: 'POST',
            headers: headersConfig(true).headers,
            body: data,
        })
            .then(res => res.json())
            .catch(e => console.log(e.message));
        console.log(JSON.stringify(response));

        yield put(add_todo_success(response));
        sendNotification(user);
    } else {
        console.log('inserire tutti i campi');
    }
}

export function* markAsync(action) {
    const marked = {
        completed: !action.payload.completed,
    };
    const response = yield fetch(urlTodos + '/' + action.payload.id, {
        method: 'PUT',
        body: JSON.stringify(marked),
        headers: headersConfig().headers,
    })
        .then(res => res.json())
        .catch(e => console.log(e.message));
    console.log(JSON.stringify(response));
    yield put(mark_todo_success(action.payload.id));
}

export function* editAsync(action) {
    const response = yield fetch(urlTodos + '/' + action.payload.id, {
        method: 'PUT',
        body: JSON.stringify(action.payload),
        headers: headersConfig().headers,
    })
        .then(res => res.json())
        .catch(e => console.log(e.message));
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

export function* filedownload(action) {
    const path = action.payload.path.substring(7, 40);
    yield fetch(urlTodos + '/download' + path, {
        method: 'GET',
        headers: headersConfig().headers,
    }).then(response => {
        response
            .blob()
            .then(blob => {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = action.payload.nome;
                a.click();
            })
            .catch(e => console.log(e.message));
        //window.location.href = response.url;  Per aprire in un altra tab.. in questo caso mi da problemi di token e autenticazione
    });
}
