import React from 'react';


function TodoItem(props) {

  

  
  const {id,testo} = props.todo;
  return (
        <div> 
          <p>
            <input type='checkbox' 
                onChange = {props.markComplete.bind(this,id)}
            />
            <input style = {{textDecoration: props.todo.completed ? 'line-through' : 'none'}}
                type='text'  
                
               defaultValue = {testo}
               //onChange={(e) => this.setState({[e.target.name] : e.target.value})}
               
             />
            <button style={{color:'red'}}> X </button>
            
          </p>
            
        </div>

  );
}

export default TodoItem;
