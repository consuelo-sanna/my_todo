//qui metto il router che scegliera tra login o app

import React, { Component } from 'react';
import NavBar from './components/NavBar';
import Login from './components/Login';
import MainTodo from './components/MainTodo';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <div className="App">
                <NavBar />
                <header className="App-header">
                    <Switch>
                        <Route exact path="/auth" component={Login} />
                        <Route path="/" component={MainTodo} />
                        <Redirect to="/" />
                    </Switch>
                </header>
            </div>
        );
    }
}

export default App;
