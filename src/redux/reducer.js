import {
    ADD_TODO,
    DEL_TODO,
    MOD_TEXT,
    EDIT_TODO,
    MARK_TODO,
    UPDATE_TEXT,
    GET_TODOS_SUCCESS,
} from './ActionTypes';

const initialState = {
    todos: [],
    editable: {
        id: 0,
        title: '',
    },
};

function todoApp(state = initialState, action) {
    switch (action.type) {
        case GET_TODOS_SUCCESS:
            console.log('sono entrato in get todos success');
            return {
                ...state,
                todos: action.payload,
            };
        /*    case ADD_TODO:
            return {
                ...state,
                todos: [action.payload, ...state.todos],
                editable: { id: 0, title: '' },
            };  */
        case EDIT_TODO:
            return {
                ...state,
                todos: [
                    ...state.todos.map(todo => {
                        if (todo.id === state.editable.id) {
                            todo.testo = state.editable.title;
                        }
                        return todo;
                    }),
                ],
                editable: { id: 0, title: '' },
            };
        /*   case DEL_TODO:
            return {
                ...state,
                todos: state.todos.filter(
                    todo => todo._id !== action.payload
                ),
            };*/
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
export default todoApp;
