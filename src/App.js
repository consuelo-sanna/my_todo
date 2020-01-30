import React, { Component } from 'react';
import './App.css';

import TodoContainer from './components/TodoContainer';
import AddEditItem from './components/AddEditItem';

import {
    add_todo,
    edit_todo,
    del_todo,
    mark_todo,
    get_todos,
} from './redux/ActionCreators';
import { store } from './redux/store';
import { connect } from 'react-redux';

import { getTodos } from './redux/selectors/index';

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

    updateText = title => {
        this.setState(prevState => ({
            editable: {
                ...prevState.editable,
                title: title,
            },
        }));
    };
*/

    /*   markComplete = id =>
        this.setState({
            todos: this.state.todos.map(todo => {
                console.log('son dentro map checked');
                console.log(id);
                if (todo.id === id) {
                    todo.completed = !todo.completed;
                    console.log('son dentro l if');
                    console.log(todo.completed);
                }
                return todo;
            }),
        });

    delItem = id => {
        console.log('son dentro l eliminazione');
        console.log(id);
        this.setState({
            todos: [
                ...this.state.todos.filter(todo => todo.id !== id),
            ],
        });
    };

    modItem = id => {
        console.log('son dentro la modifica');
        const daModificare = this.state.todos.find(
            todo => todo.id === id
        );
        /*this.setState({
            editable: { id: daModificare.id, title: daModificare.testo },
        }); 
        
        
        
        Da inserire dopo div p

<AddEditItem
                        addTodo={this.addTodo}
                        editTodo={this.editTodo}
                        editable={this.props.editable}
                        updateText={this.updateText}
                    />
        
        
        
        */

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <p>To Do App</p>

                    <div>
                        <TodoContainer
                            todo={this.props.todos}
                            //markComplete={this.markComplete}
                            //modItem={this.modItem}
                            //delItem={this.delItem}
                        />
                    </div>
                </header>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    todos: getTodos(state), //state.todos
});

export default connect(mapStateToProps, {
    add_todo,
    edit_todo,
    del_todo,
    mark_todo,
    get_todos,
})(App);
