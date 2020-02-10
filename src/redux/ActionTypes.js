/* Dove elenchi le action */

//intercettate da saga
export const ADD_TODO = 'ADD_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const DEL_TODO = 'DEL_TODO';
export const MARK_TODO = 'MARK_TODO';
export const UPDATE_TEXT = 'UPDATE_TEXT';
export const MOD_TEXT = 'MOD_TEXT';

//intercettate da reducer todos
export const GET_TODOS = 'GET_TODOS';
export const GET_TODOS_SUCCESS = 'GET_TODOS_SUCCESS';
export const DEL_TODO_SUCCESS = 'DEL_TODO_SUCCESS';
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
export const EDIT_TODO_SUCCESS = 'EDIT_TODO_SUCCESS';
export const MARK_TODO_SUCCESS = 'MARK_TODO_SUCCESS';

//per autenticazione
export const USER_LOGIN_ATTEMPT = 'USER_LOGIN';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';
export const USER_LOGOUT = 'USER_LOGOUT';
