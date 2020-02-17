import {
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILED,
    USER_LOGOUT,
    USER_REGISTRATION_SUCCESS,
    USER_REGISTRATION_FAILED,
    USER_CHECK_SUCCESS,
    CLEAR_MSG,
} from '../ActionTypes';

import socketIOClient from 'socket.io-client';
import { baseUrl } from '../shared/baseUrl';

const initialState = {
    user: null, //avra email e token
    isAuthenticated: false,
    msg: [],
};

export const socket = socketIOClient(baseUrl + '/loggedIn'); //mi connetto al socket

export default function(state = initialState, action) {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            localStorage.setItem('jwtToken', action.payload.token);
            localStorage.setItem('user', action.payload.user.email);
            socket.emit('user login');
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
            return {
                ...state,
                user: {
                    id: action.payload.id,
                    email: action.payload.email,
                    token: action.payload.token,
                },
                isAuthenticated: true,
            };
        case CLEAR_MSG:
            return {
                ...state,
                msg: [],
            };
        default:
            return state;
    }
}
