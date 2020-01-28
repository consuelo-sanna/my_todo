import React from 'react';
import './App.css';
import TodoItem from './components/TodoItem';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          To Do App 
        </p>
        <div><TodoItem /></div>
      </header>
      
      
    </div>
  );
}

export default App;
