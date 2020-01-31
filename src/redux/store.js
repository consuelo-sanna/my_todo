import { createStore, applyMiddleware } from 'redux';
import todoApp from './reducer';
import createSagaMiddleware from 'redux-saga';
import mySaga from './saga/sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    todoApp,
    applyMiddleware(sagaMiddleware)
);

//run the saga
// sagaMiddleware.wun(mySaga);
