import React, { Component } from 'react';
import './App.css';

import TodoContainer from './components/TodoContainer';
import AddEditItem from './components/AddEditItem';

import {
    add_todo,
    edit_todo,
    mod_text,
    del_todo,
    mark_todo,
    update_text,
    async_mark_todo,
    async_add_todo,
    async_edit_todo,
    async_del_todo,
    async_mod_todo,
    async_update_todo,
} from './redux/ActionCreators';
import { store } from './redux/store';
import { connect } from 'react-redux';

import { getTodos, getEditable } from './redux/selectors/index';

class App extends Component {
    editTodo = () => {
        store.dispatch(async_edit_todo());
        store.dispatch(edit_todo());
    };

    addTodo = () => {
        store.dispatch(async_add_todo());
        store.dispatch(
            add_todo(
                this.props.editable.title,
                this.props.todos.length + 1
            )
        );
    };

    modItem = (id, testo) => {
        store.dispatch(async_mod_todo());
        store.dispatch(mod_text(testo, id));
    };

    updateText = (testo, id) => {
        store.dispatch(async_update_todo());
        store.dispatch(update_text(testo, id));
    };

    markComplete = id => {
        store.dispatch(mark_todo(id));
    };

    delItem = id => {
        store.dispatch(async_del_todo());
        store.dispatch(del_todo(id));
    };

    markAsync = id => {
        store.dispatch(async_mark_todo(id));
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <p>To Do App</p>
                    <AddEditItem
                        editable={this.props.editable}
                        addTodo={this.addTodo}
                        editTodo={this.editTodo}
                        updateText={this.updateText}
                    />
                    <div>
                        <TodoContainer
                            todo={this.props.todos}
                            markComplete={this.markComplete}
                            modItem={this.modItem}
                            delItem={this.delItem}
                            markAsync={this.markAsync}
                        />
                    </div>
                </header>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    todos: getTodos(state),
    editable: getEditable(state),
});

export default connect(mapStateToProps, {
    add_todo,
    mod_text,
    edit_todo,
    del_todo,
    mark_todo,
    update_text,
    async_mark_todo,
    async_add_todo,
    async_edit_todo,
    async_del_todo,
    async_mod_todo,
    async_update_todo,
})(App);
