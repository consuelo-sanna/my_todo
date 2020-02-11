import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga/sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);

//run the saga
sagaMiddleware.run(rootSaga);
