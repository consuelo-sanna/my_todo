import React, { Component } from 'react';
import './App.css';

import TodoContainer from './components/TodoContainer';
import AddItem from './components/AddItem';

class App extends Component {

  constructor (props){
    super(props);
     this.state = {
      todos : [
        {
          id: 1,
          testo: "mangiare",
          completed: false
        },
        {
          id: 2,
          testo: "bere",
          completed: false
        },
        {
          id: 3,
          testo: "studiare",
          completed: false
        }
      ],
      editable : {
        id : 0,
        title : '',
      }
      
    }
  }

  markComplete = (id) => this.setState({
    todos: this.state.todos.map( todo => {
        console.log("son dentro map checked");
        console.log(id);
      if(todo.id === id){
        todo.completed = ! todo.completed;
        console.log("son dentro l if");
        console.log(todo.completed);
      }
      return todo;
      })
  }) 

  delItem = (id) => { 
    console.log("son dentro l eliminazione");
    console.log(id);
    this.setState( {todos: [...this.state.todos.filter(todo => todo.id !== id)  ]} ); 
  } ;


  /* dopo aver recuperato daModificare devi passarlo come props a AddEditTodo */

  modItem = (id) => { 
    console.log("son dentro la modifica");
    const daModificare = this.state.todos.find(todo => todo.id === id);
    this.setState( {editable : {id: daModificare.id, title: daModificare.testo }} );  //sicuramente c'è un modo piu intelligente, trovalo
    var prova = this.state.editable;
  };
  


  addTodo = (title,id) => { 
    if(this.state.editable.id === 0){
      this.setState( {todos: [...this.state.todos, {id: this.state.length + 1, testo: title, completed: false }]} ) ;
    } else {
      this.setState({ todos: [...this.state.todos.map( todo => {
        if(todo.id === id){
          todo.testo = title;
        }
        return todo;
        
      })]}); 

      

      //const nuovoStato = this.state.todos;
    }
    const stato = this.state; //per debug
    this.setState({editable :  {id: 0, title: '' }  });
    const stato2 = stato; //per debug
  };


  render(){ 
  return (
    <div className="App">
      <header className="App-header">
        <p>
          To Do App 
        </p>
        <AddItem 
            addTodo = {this.addTodo} 
            editTodo = {this.state.editable} 
        />
        <div>
          <TodoContainer 
              todo = {this.state.todos} 
              markComplete = {this.markComplete} 
              modItem = {this.modItem}
              delItem = {this.delItem}
          />
        </div>
      </header>
      
      
    </div>
  );
}
}

export default App;
