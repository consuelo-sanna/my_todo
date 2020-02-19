/* Dove CREI le azioni, scrivi una funzione che restituisce un azione (questo le rende portable e easy to test) */

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
    USER_LOGIN_ATTEMPT,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILED,
    USER_LOGOUT,
    USER_REGISTRATION_ATTEMPT,
    USER_REGISTRATION_SUCCESS,
    USER_REGISTRATION_FAILED,
    USER_CHECK_TOKEN,
    USER_CHECK_SUCCESS,
    CLEAR_MSG,
    SET_LOADING_TRUE,
    SET_LOADING_FALSE,
} from './ActionTypes';

export const add_todo = testo => ({
    type: ADD_TODO,
    payload: testo,
});

export const del_todo = id => ({
    type: DEL_TODO,
    payload: id,
});

export const mod_text = (testo, id) => ({
    type: MOD_TEXT,
    payload: { testo, id, completed: false },
});

export const mark_todo = (id, completed) => ({
    type: MARK_TODO,
    payload: { id, completed },
});

export const update_text = (testo, id) => ({
    type: UPDATE_TEXT,
    payload: { testo, id },
});

export const edit_todo = (testo, id) => ({
    type: EDIT_TODO,
    payload: { testo, id },
});

export const get_todos = () => ({
    type: GET_TODOS,
});

export const get_todos_success = response => ({
    type: GET_TODOS_SUCCESS,
    payload: response,
});

export const del_todo_success = id => ({
    type: DEL_TODO_SUCCESS,
    payload: id,
});

export const add_todo_success = response => ({
    type: ADD_TODO_SUCCESS,
    payload: response,
});

export const edit_todo_success = response => ({
    type: EDIT_TODO_SUCCESS,
    payload: response,
});

export const mark_todo_success = id => ({
    type: MARK_TODO_SUCCESS,
    payload: id,
});

//start User functions
export const user_login_attempt = (email, password) => ({
    type: USER_LOGIN_ATTEMPT,
    payload: { email, password },
});

export const user_login_success = response => ({
    type: USER_LOGIN_SUCCESS,
    payload: response,
});

export const user_login_failed = response => ({
    type: USER_LOGIN_FAILED,
    payload: response,
});

export const user_logout = () => ({
    type: USER_LOGOUT,
});

export const user_registration_attempt = (
    name,
    lastname,
    email,
    password
) => ({
    type: USER_REGISTRATION_ATTEMPT,
    payload: { name, lastname, email, password },
});

export const user_registration_success = response => ({
    type: USER_REGISTRATION_SUCCESS,
    payload: response,
});

export const user_registration_failed = response => ({
    type: USER_REGISTRATION_FAILED,
    payload: response,
});

//session user
export const user_check_token = token => ({
    type: USER_CHECK_TOKEN,
    payload: token,
});

export const user_check_success = response => ({
    type: USER_CHECK_SUCCESS,
    payload: response,
});

//messaggi
export const clear_msg = () => ({
    type: CLEAR_MSG,
});

//loading
export const set_loading_true = () => ({
    type: SET_LOADING_TRUE,
});

export const set_loading_false = () => ({
    type: SET_LOADING_FALSE,
});
