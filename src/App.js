import React, { Component } from 'react';
import './App.css';

import TodoContainer from './components/TodoContainer';
import AddEditItem from './components/AddEditItem';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                {
                    id: 1,
                    testo: 'mangiare',
                    completed: false,
                },
                {
                    id: 2,
                    testo: 'bere',
                    completed: false,
                },
                {
                    id: 3,
                    testo: 'studiare',
                    completed: false,
                },
            ],
            editable: {
                id: 0,
                title: '',
            },
        };
    }

    markComplete = id =>
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
            todos: [...this.state.todos.filter(todo => todo.id !== id)],
        });
    };



    modItem = id => {
        console.log('son dentro la modifica');
        const daModificare = this.state.todos.find(todo => todo.id === id);
        /*this.setState({
            editable: { id: daModificare.id, title: daModificare.testo },
        }); */
        this.setState( (prevState) => ({
          editable : { 
            ...prevState.editable,
            title: daModificare.testo,
          id: daModificare.id}
        }));
    };

    addTodo = () => {
        this.setState({
            todos: [
                ...this.state.todos,
                { id: this.state.length + 1, testo: this.state.editable.title, completed: false },
            ],
        });
        this.setState({ editable: { id: 0, title: '' } });
    };

    editTodo = () => { debugger
      console.log("dentro edit todo ");
      console.log(this.state.editable.id);
        this.setState({
            todos: [
                ...this.state.todos.map(todo => {
                    if (todo.id === this.state.editable.id) {
                      console.log("trovato id da modificare");
                        todo.testo = this.state.editable.title;
                    }
                    return todo;
                }),
            ],
        });
        this.setState({ editable: { id: 0, title: '' } });
    };

    updateText = (title) => { 
      this.setState( (prevState) => ({
        editable : { 
          ...prevState.editable,
          title: title }
      }));
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <p>To Do App</p>
                    <AddEditItem
                        addTodo={this.addTodo}
                        editTodo={this.editTodo}
                        editable={this.state.editable}
                        updateText = {this.updateText}
                    />
                    <div>
                        <TodoContainer
                            todo={this.state.todos}
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

export default App;
