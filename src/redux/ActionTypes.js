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
export const USER_REGISTRATION_ATTEMPT = 'USER_REGISTRATION_ATTEMPT';
export const USER_REGISTRATION_SUCCESS = 'USER_REGISTRATION_SUCCESS';
export const USER_REGISTRATION_FAILED = 'USER_REGISTRATION_FAILED';

//per mantenere la sessione
export const USER_CHECK_TOKEN = 'USER_CHECK_TOKEN';
export const USER_CHECK_SUCCESS = 'USER_CHECK_SUCCESS';

//per pulire i messaggi
export const CLEAR_MSG = 'CLEAR_MSG';
export const NOTIFY_ADDED_TODO = 'NOTIFY_ADDED_TODO';
export const SET_MSG = 'SET_MSG';

//loading
export const SET_LOADING_TRUE = 'SET_LOADING_TRUE';
export const SET_LOADING_FALSE = 'SET_LOADING_FALSE';
export const SET_LOADING_TODOS_TRUE = 'SET_LOADING_TODOS_TRUE';
export const SET_LOADING_TODOS_FALSE = 'SET_LOADING_TODOS_FALSE';

//statistics
export const STATISTICS_GET = 'STATISTICS_GET';
export const STATISTICS_GET_SUCCESS = 'STATISTICS_GET_SUCCESS';

//file
export const FILE_DOWNLOAD = 'FILE_DOWNLOAD';
