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

export const mark_todo = id => ({
    type: MARK_TODO,
    payload: id,
});

export const update_text = (testo, id) => ({
    type: UPDATE_TEXT,
    payload: { testo, id },
});

export const edit_todo = () => ({
    type: EDIT_TODO,
    payload: {},
});

export const get_todos = () => ({
    type: GET_TODOS,
});

export const get_todos_success = () => ({
    type: GET_TODOS_SUCCESS,
    payload: [],
});
