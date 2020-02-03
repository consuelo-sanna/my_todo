/* Dove CREI le azioni, scrivi una funzione che restituisce un azione (questo le rende portable e easy to test) */

import {
    ADD_TODO,
    EDIT_TODO,
    MOD_TEXT,
    DEL_TODO,
    MARK_TODO,
    UPDATE_TEXT,
    ASYNC_MARK_TODO,
    ASYNC_ADD_TODO,
    ASYNC_EDIT_TODO,
    ASYNC_MOD_TEXT,
    ASYNC_DEL_TODO,
    ASYNC_UPDATE_TEXT,
} from './ActionTypes';

export const add_todo = (testo, id) => ({
    type: ADD_TODO,
    payload: { testo, id, completed: false },
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

export const async_mark_todo = id => ({
    type: ASYNC_MARK_TODO,
    payload: id,
});

export const async_add_todo = () => ({
    type: ASYNC_ADD_TODO,
});

export const async_edit_todo = () => ({
    type: ASYNC_EDIT_TODO,
});

export const async_del_todo = () => ({
    type: ASYNC_DEL_TODO,
});

export const async_update_todo = () => ({
    type: ASYNC_UPDATE_TEXT,
});

export const async_mod_todo = () => ({
    type: ASYNC_MOD_TEXT,
});
