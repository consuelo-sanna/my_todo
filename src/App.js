import React, { Component } from 'react';
import './App.css';
import TodoItem from './components/TodoItem';
import TodoContainer from './components/TodoContainer';

class App extends Component {

  state = {
    todos : []
  }



  render(){
  return (
    <div className="App">
      <header className="App-header">
        <p>
          To Do App 
        </p>
        <div><TodoContainer /></div>
      </header>
      
      
    </div>
  );
}
}

export default App;
