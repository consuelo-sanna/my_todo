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
    get_todos,
} from './redux/ActionCreators';
import { store } from './redux/store';
import { connect } from 'react-redux';

import { getTodos, getEditable } from './redux/selectors/index';

class App extends Component {
    componentDidMount() {
        store.dispatch(get_todos());
    }

    editTodo = () => {
        store.dispatch(edit_todo());
    };

    addTodo = () => {
        store.dispatch(
            add_todo(
                this.props.editable.title,
                this.props.todos.length + 1
            )
        );
    };

    modItem = (id, testo) => {
        store.dispatch(mod_text(testo, id));
    };

    updateText = (testo, id) => {
        store.dispatch(update_text(testo, id));
    };

    markComplete = id => {
        store.dispatch(mark_todo(id));
    };

    delItem = id => {
        debugger;
        store.dispatch(del_todo(id));
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
})(App);
