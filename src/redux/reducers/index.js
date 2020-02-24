/*  Reducers è una cartella per mettere tutto insieme
 *  prende i reducer e li collega combinandoli. dato che usi un selettore quel nome todos ti serve perche
 *  sta dentro lo stato ora
 */

import { combineReducers } from 'redux';
import todosReducer from './todosReducer';
import userReducer from './userReducer';
import notificheReducer from './notificheReducer';
import statisticsReducer from './statisticsReducer';

export default combineReducers({
    todos: todosReducer,
    user: userReducer,
    notifiche: notificheReducer,
    statistics: statisticsReducer,
});
