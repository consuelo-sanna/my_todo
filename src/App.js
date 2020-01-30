import React, { Component } from 'react';
import './App.css';

import TodoContainer from './components/TodoContainer';
import AddEditItem from './components/AddEditItem';

import {
    add_todo,
    edit_todo,
    del_todo,
    mark_todo,
    update_text,
} from './redux/ActionCreators';
import { store } from './redux/store';
import { connect } from 'react-redux';

import { getTodos, getEditable } from './redux/selectors/index';

import {
    ADD_TODO,
    EDIT_TODO,
    DEL_TODO,
    MARK_TODO,
} from './redux/ActionTypes';

class App extends Component {
    /*constructor(props) {
        super(props);
    } 
        this.setState(prevState => ({
            editable: {
                ...prevState.editable,
                title: daModificare.testo,
                id: daModificare.id,
            },
        }));
    };

    addTodo = () => {
        this.setState({
            todos: [
                ...this.state.todos,
                {
                    id: this.state.todos.length + 1,
                    testo: this.state.editable.title,
                    completed: false,
                },
            ],
        });
        this.setState({ editable: { id: 0, title: '' } });
    };

    editTodo = () => {
        console.log('dentro edit todo ');
        console.log(this.state.editable.id);
        this.setState({
            todos: [
                ...this.state.todos.map(todo => {
                    if (todo.id === this.state.editable.id) {
                        console.log('trovato id da modificare');
                        todo.testo = this.state.editable.title;
                    }
                    return todo;
                }),
            ],
        });
        this.setState({ editable: { id: 0, title: '' } });
    };

    modItem = (id,testo) => {
        console.log('son dentro la modifica');
        const daModificare = this.state.todos.find(
            todo => todo.id === id
        );
        this.setState({
            editable: {
                id: daModificare.id,
                title: daModificare.testo,
            },
        });
    };
*/

    modItem = (id, testo) => {
        store.dispatch(edit_todo(testo, id));
    };

    updateText = (testo, id) => {
        debugger;
        store.dispatch(update_text(testo, id));
        const stato = this.props.editable;
    };

    markComplete = id => {
        store.dispatch(mark_todo(id));
    };

    delItem = id => {
        store.dispatch(del_todo(id));
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <p>To Do App</p>
                    <AddEditItem
                        addTodo={this.addTodo}
                        editTodo={this.editTodo}
                        editable={this.props.editable}
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
    todos: getTodos(state), //state.todos
    editable: getEditable(state),
});

export default connect(mapStateToProps, {
    add_todo,
    edit_todo,
    del_todo,
    mark_todo,
    update_text,
})(App);
