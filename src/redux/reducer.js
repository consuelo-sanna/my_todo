import {
    DEL_TODO_SUCCESS,
    MOD_TEXT,
    EDIT_TODO_SUCCESS,
    MARK_TODO_SUCCESS,
    UPDATE_TEXT,
    GET_TODOS_SUCCESS,
    ADD_TODO_SUCCESS,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILED,
    USER_LOGOUT,
    USER_REGISTRATION_SUCCESS,
    USER_REGISTRATION_FAILED,
} from './ActionTypes';

const initialState = {
    todos: [],
    editable: {
        id: 0,
        title: '',
    },
    user: null, //avra email e token
    isAuthenticated: false,
    msg: [],
};

/** user login success e registration success fanno la stessa cosa.. identica */
function todoApp(state = initialState, action) {
    switch (action.type) {
        case GET_TODOS_SUCCESS:
            console.log('sono entrato in get todos success');
            return {
                ...state,
                todos: action.payload,
            };
        case ADD_TODO_SUCCESS:
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
        case USER_LOGIN_SUCCESS:
            localStorage.setItem('jwtToken', action.payload.token);
            return {
                ...state,
                user: {
                    id: action.payload.user.id,
                    email: action.payload.user.email,
                    token: action.payload.token,
                },
                isAuthenticated: true,
            };
        case USER_LOGIN_FAILED:
            return {
                ...state,
                msg: [action.payload.msg, ...state.msg],

                isAuthenticated: false,
            };
        case USER_LOGOUT:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
            };
        case USER_REGISTRATION_SUCCESS:
            localStorage.setItem('jwtToken', action.payload.token);
            return {
                ...state,
                user: {
                    id: action.payload.user.id,
                    email: action.payload.user.email,
                    token: action.payload.token,
                },
                isAuthenticated: true,
            };
        case USER_REGISTRATION_FAILED:
            return {
                ...state,
                msg: [action.payload.msg, ...state.msg],

                isAuthenticated: false,
            };
        default:
            return state;
    }
}
export default todoApp;
