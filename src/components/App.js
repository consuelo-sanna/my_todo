//qui metto il router che scegliera tra login o app

import React, { Component } from 'react';
import NavBar from './NavBar';
import Login from './Login';
import MainTodo from './MainTodo';
import '../App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getIsAuthenticated } from '../redux/selectors/index';

const SecretRoute = ({ component: Component, ...rest }) => (
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

class App extends Component {
    render() {
        return (
            <div className="App">
                <NavBar />
                <header className="App-header">
                    <Switch>
                        <Route exact path="/auth" component={Login} />
                        <SecretRoute
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

//connetti le eventuali cose che dispatchi.. (forse nulla)
export default connect(mapStateToProps, {})(App);
