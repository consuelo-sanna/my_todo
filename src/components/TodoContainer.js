import React from 'react';
import TodoItem from './TodoItem';

function TodoContainer(props) {
    return props.todo.map(todo => (
        <TodoItem
            key={todo._id}
            todo={todo}
            markComplete={props.markComplete}
            modItem={props.modItem}
            delItem={props.delItem}
        />
    ));
}

export default TodoContainer;
