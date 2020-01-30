/* Dove CREI le azioni, scrivi una funzione che restituisce un azione (questo le rende portable e easy to test) */

import {
    ADD_TODO,
    EDIT_TODO,
    DEL_TODO,
    MARK_TODO,
    UPDATE_TEXT,
} from './ActionTypes';

export const add_todo = (testo, id) => ({
    type: ADD_TODO,
    payload: { testo, id, completed: false },
});

export const del_todo = id => ({
    type: DEL_TODO,
    payload: id,
});

export const edit_todo = (testo, id) => ({
    type: EDIT_TODO,
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
