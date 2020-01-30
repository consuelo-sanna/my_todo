import {
    ADD_TODO,
    DEL_TODO,
    EDIT_TODO,
    MARK_TODO,
} from './ActionTypes';

const initialState = {
    todos: [
        {
            id: 1,
            testo: 'mangiare',
            completed: false,
        },
        {
            id: 2,
            testo: 'bere',
            completed: false,
        },
        {
            id: 3,
            testo: 'studiare',
            completed: false,
        },
    ],
    editable: {
        id: 0,
        title: '',
    },
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
                    return todo;
                }),
            };
        case EDIT_TODO:
            return { ...state };
        default:
            return state;
    }
}
export default todoApp;
