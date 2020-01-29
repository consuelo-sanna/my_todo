import React from 'react';


function TodoItem(props) {

  const {id,testo} = props.todo;
  return (
        <div> 
          <label>
            <input type='checkbox' 
                onChange = {props.markComplete.bind(this,id)}
            />
            <input style = {{textDecoration: props.todo.completed ? 'line-through' : 'none'}}
                type='text'  
                readOnly
               value = {testo}
               
             />
            <button style={{color:'blue'}} onClick = {props.modItem.bind(this,id) } > M </button>
            <button style={{color:'red'}} onClick = {props.delItem.bind(this,id) } > X </button>
          </label>
        </div>
  );
}

export default TodoItem;
