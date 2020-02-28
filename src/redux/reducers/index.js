/*  Reducers è una cartella per mettere tutto insieme
 *  prende i reducer e li collega combinandoli. dato che usi un selettore quel nome todos ti serve perche
 *  sta dentro lo stato ora
 */

import { combineReducers } from 'redux';
import todosReducer from './todosReducer';
import userReducer from './userReducer';
import notificheReducer from './notificheReducer';
import statisticsReducer from './statisticsReducer';
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
    user: userReducer,
    todos: todosReducer,
    notifiche: notificheReducer,
    statistics: statisticsReducer,
    error: errorReducer,
});

export default rootReducer;
