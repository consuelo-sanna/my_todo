import { ADD_TODO, DEL_TODO } from './ActionTypes';

const initialState = {
    todos: [],
    editable: {},
};

function todoApp(state = initialState, action) {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                todos: [action.payload, ...state.todos],
            };
        case DEL_TODO:
            return {
                ...state,
                todos: state.todos.filter(
                    todo => todo.id !== action.payload
                ),
            };
        case MARK_TODO:
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if (todo.id === action.payload) {
                        todo.completed = !todo.completed;
                    }
                }),
            };
        case EDIT_TODO:
            return { ...state };
        default:
            return state;
    }
}
