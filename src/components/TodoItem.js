import React from 'react';

function TodoItem(props) {
    const { id, testo } = props.todo;
    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    onChange={() => props.markComplete(id)}
                />
                <input
                    style={{
                        textDecoration: props.todo.completed
                            ? 'line-through'
                            : 'none',
                    }}
                    type="text"
                    readOnly
                    value={testo}
                />
                <button
                    style={{ color: 'blue' }}
                    onClick={() => props.modItem(id, testo)}
                >
                    {' '}
                    M{' '}
                </button>
                <button
                    style={{ color: 'red' }}
                    onClick={() => props.delItem(id)}
                >
                    {' '}
                    X{' '}
                </button>
            </label>
        </div>
    );
}

export default TodoItem;
