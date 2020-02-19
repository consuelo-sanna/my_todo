import {
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILED,
    USER_LOGOUT,
    USER_REGISTRATION_SUCCESS,
    USER_REGISTRATION_FAILED,
    USER_CHECK_SUCCESS,
    CLEAR_MSG,
    NOTIFY,
    SET_LOADING_TRUE,
    SET_LOADING_FALSE,
} from '../ActionTypes';

import { logMeIn } from '../shared/mySocket';

const initialState = {
    user: {}, //avra email e token
    isAuthenticated: false,
    isLoading: true,
    msg: [],
    notifica: 0,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            localStorage.setItem('jwtToken', action.payload.token);
            localStorage.setItem('user', action.payload.user.email);
            logMeIn();
            //socketIOClient.connect(`${baseUrl}/loggedIn`).on(); //simulazione chiamata di un metodo
            //socket.emit('user login');
            return {
                ...state,
                user: {
                    id: action.payload.user.id,
                    email: action.payload.user.email,
                    role: action.payload.user.role,
                    name: action.payload.user.name,
                    token: action.payload.token,
                },
                isAuthenticated: true,
            };
        case USER_LOGIN_FAILED:
            return {
                ...state,
                msg: [action.payload.msg],
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
            localStorage.setItem('user', action.payload.user.email);
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
                msg: [action.payload.msg],

                isAuthenticated: false,
            };
        case USER_CHECK_SUCCESS:
            logMeIn();
            return {
                ...state,
                user: {
                    id: action.payload.id,
                    email: action.payload.email,
                    token: action.payload.token,
                    name: action.payload.name,
                    role: action.payload.role,
                },
                isAuthenticated: true,
            };
        case CLEAR_MSG:
            return {
                ...state,
                msg: [],
            };
        case NOTIFY:
            return {
                notifica: 1,
            };
        case SET_LOADING_TRUE:
            return {
                ...state,
                isLoading: true,
            };
        case SET_LOADING_FALSE:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}
