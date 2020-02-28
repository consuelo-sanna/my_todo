import React, { Component } from 'react';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';
import RedBox from 'redbox-react';

export const createProvider = (reducer, saga) => {
    const sagaMiddleware = createSagaMiddleware();
    const middleware = compose(
        applyMiddleware(sagaMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__
            ? window.devToolsExtension()
            : x => x
    );

    class AppProvider extends Component {
        constructor(props) {
            super(props);
            this.showError = this.showError.bind(this);
            this.state = { error: null };

            const catchingReducer = (state, action) => {
                try {
                    return reducer(state, action);
                } catch (e) {
                    console.error(e);
                    this.showError(e);
                    return state;
                }
            };

            this.store = createStore(reducer, middleware);
            // .toPromise() is for redux-saga@1.0.0-beta.2, it has much nicer error stack
            const sagaTask = sagaMiddleware.run(saga).toPromise();
            sagaTask.catch(this.showError);
        }

        componentDidCatch(error) {
            console.log('iawdawdwa');
            this.showError(error);
        }

        showError(error) {
            /*
             * This can be called even before component mounted, since there can be error in the first round of
             * reducer when creating store. And we definitely dont want to create store as late as in componentDidMount.
             * Hence, this small "helper" to simplify architecture. Which is no big deal,
             * its used only for critical error state when app cannot continue anyway.
             */
            if (this.updater.isMounted(this)) {
                this.setState({ error });
            } else {
                this.state = { error }; //fatto per interrompere l applicazione
            }
        }

        render() {
            console.log(this.store);
            if (this.state.error) {
                if (process.env.NODE_ENV === 'development') {
                    return <RedBox error={this.state.error} />;
                }
                return 'your production error message or component';
            }
            return <Provider {...this.props} store={this.store} />;
        }
    }

    return AppProvider;
};
