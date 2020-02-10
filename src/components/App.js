//qui metto il router che scegliera tra login o app

import React, { Component } from 'react';
import NavBar from './NavBar';
import Login from './Login';
import MainTodo from './MainTodo';
import Registration from './Registration';
import '../App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getIsAuthenticated } from '../redux/selectors/index';
import { user_check_token } from '../redux/ActionCreators';

/** Voglio andare alla home ma non sono autenticato */
const AuthRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            rest.isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect to="/auth" />
            )
        }
    />
);

/** Mi sono autenticato, quindi mi manda alla home */
const AuthRouteOk = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            rest.isAuthenticated ? (
                <Redirect to="/" />
            ) : (
                <Component {...props} />
            )
        }
    />
);

class App extends Component {
    /** Prende isAuthenticated e controlla se lo è. se NON lo è controlla se c'è un token nel localstore
     *  se c'è un token lo manda al server per vedere se è valido (attraverso GET api/auth/user), se è valido ->autentica
     *  se non è valido rimanda al Login
     */

    componentDidMount() {
        console.log('autenticazione: ' + this.props.isAuthenticated);
        const token = localStorage.getItem('jwtToken');
        if (!this.props.isAuthenticated && token) {
            this.props.check_token(token);
        }
    }

    render() {
        return (
            <div className="App">
                <NavBar />
                <header className="App-header">
                    <Switch>
                        <AuthRouteOk
                            path="/reg"
                            component={Registration}
                            isAuthenticated={
                                this.props.isAuthenticated
                            }
                        />
                        <AuthRouteOk
                            exact
                            path="/auth"
                            component={Login}
                            isAuthenticated={
                                this.props.isAuthenticated
                            }
                        />
                        <AuthRoute
                            path="/"
                            component={MainTodo}
                            isAuthenticated={
                                this.props.isAuthenticated
                            }
                        />

                        <Redirect to="/" />
                    </Switch>
                </header>
            </div>
        );
    }
}

//componentDID -> controlla e se non esiste history push login
//componentUpdate -> controlla e se esiste history push to main

const mapStateToProps = state => ({
    isAuthenticated: getIsAuthenticated(state),
});

const mapDispatchToProps = dispatch => ({
    check_token: token => dispatch(user_check_token(token)),
});

//connetti le eventuali cose che dispatchi.. (forse nulla)
export default connect(mapStateToProps, mapDispatchToProps)(App);
