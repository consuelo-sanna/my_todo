import {
    DEL_TODO_SUCCESS,
    MOD_TEXT,
    EDIT_TODO_SUCCESS,
    MARK_TODO_SUCCESS,
    UPDATE_TEXT,
    GET_TODOS_SUCCESS,
    ADD_TODO_SUCCESS,
} from '../ActionTypes';

import { sendNotification } from '../shared/mySocket';

const initialState = {
    todos: [],
    editable: {
        id: 0,
        title: '',
    },
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_TODOS_SUCCESS:
            return {
                ...state,
                todos: action.payload,
            };
        case ADD_TODO_SUCCESS:
            sendNotification(action.payload.user);
            return {
                ...state,
                todos: [action.payload, ...state.todos],
                editable: { id: 0, title: '' },
            };
        case EDIT_TODO_SUCCESS:
            return {
                ...state,
                todos: [
                    ...state.todos.map(todo => {
                        if (todo._id === state.editable.id) {
                            todo.testo = state.editable.title;
                        }
                        return todo;
                    }),
                ],
                editable: { id: 0, title: '' },
            };
        case DEL_TODO_SUCCESS:
            return {
                ...state,
                todos: state.todos.filter(
                    todo => todo._id !== action.payload
                ),
            };
        case MARK_TODO_SUCCESS:
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if (todo._id === action.payload) {
                        todo.completed = !todo.completed;
                    }
                    return todo;
                }),
            };
        case MOD_TEXT:
            return {
                ...state,
                editable: {
                    id: action.payload.id,
                    title: action.payload.testo,
                },
            };
        case UPDATE_TEXT:
            return {
                ...state,
                editable: {
                    id: action.payload.id,
                    title: action.payload.testo,
                },
            };
        default:
            return state;
    }
}
