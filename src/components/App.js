//qui metto il router che scegliera tra login o app

import React, { Component } from 'react';
import NavBar from './NavBar';
import Authentication from './Authentication';
import MainTodo from './MainTodo';
import Dashboard from './Dashboard';
import '../App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    getIsAuthenticated,
    getUser,
    getIsLoading,
} from '../redux/selectors/index';
import {
    user_check_token,
    set_loading_false,
} from '../redux/ActionCreators';

/** Voglio andare alla home ma non sono autenticato */
const AuthRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            rest.isLoading ? (
                console.log('still Loading')
            ) : rest.isAuthenticated ? (
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
            rest.isLoading ? (
                console.log('Loading 2')
            ) : rest.isAuthenticated ? (
                <Redirect to="/" />
            ) : (
                <Component {...props} />
            )
        }
    />
);

const DashboardRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            rest.isLoading ? (
                console.log('Loading')
            ) : rest.isAdmin ? (
                <Component {...props} />
            ) : (
                <Redirect to="/" />
            )
        }
    />
);

class App extends Component {
    componentDidMount() {
        const token = localStorage.getItem('jwtToken');
        if (!this.props.isAuthenticated && token) {
            this.props.check_token(token);
        } else {
            this.props.set_loading_false();
        }
    }

    render() {
        return (
            <div className="App">
                <NavBar />
                <header className="App-header">
                    <Switch>
                        <DashboardRoute
                            exact
                            path="/dashboard"
                            component={Dashboard}
                            isAdmin={
                                this.props.user &&
                                this.props.user.role === 'admin'
                                    ? true
                                    : false
                            }
                            isLoading={this.props.isLoading}
                        />
                        <AuthRouteOk
                            exact
                            path="/auth"
                            component={Authentication}
                            isAuthenticated={
                                this.props.isAuthenticated
                            }
                            isLoading={this.props.isLoading}
                        />
                        <AuthRoute
                            exact
                            path="/"
                            component={MainTodo}
                            isAuthenticated={
                                this.props.isAuthenticated
                            }
                            isLoading={this.props.isLoading}
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
    user: getUser(state), //dovendo aggiungere getUser, posso direttamente controllare l'autenticazione ora
    isLoading: getIsLoading(state),
});

const mapDispatchToProps = dispatch => ({
    check_token: token => dispatch(user_check_token(token)),
    set_loading_false: () => dispatch(set_loading_false()),
});

//connetti le eventuali cose che dispatchi.. (forse nulla)
export default connect(mapStateToProps, mapDispatchToProps)(App);
