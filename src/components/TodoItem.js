import React from 'react';

function TodoItem(props) {
    const { _id, testo } = props.todo;
    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    onChange={() => props.markComplete(_id)}
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
                    onClick={() => props.modItem(_id, testo)}
                >
                    {' '}
                    M{' '}
                </button>
                <button
                    style={{ color: 'red' }}
                    onClick={() => props.delItem(_id)}
                >
                    {' '}
                    X{' '}
                </button>
            </label>
        </div>
    );
}

export default TodoItem;
