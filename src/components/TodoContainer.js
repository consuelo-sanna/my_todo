import React from 'react';
import TodoItem from './TodoItem';

import Grid from '@material-ui/core/Grid';

import Divider from '@material-ui/core/Divider';

function TodoContainer(props) {
    return (
        <div>
            <Grid container spacing={5} style={{ padding: 24 }}>
                <div>
                    {props.todo.map(todo => (
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            lg={12}
                            xl={12}
                            key={todo._id}
                        >
                            <TodoItem
                                key={todo._id}
                                todo={todo}
                                markComplete={props.markComplete}
                                modItem={props.modItem}
                                delItem={props.delItem}
                                download={props.download}
                            />
                            <Divider />
                        </Grid>
                    ))}
                </div>
            </Grid>
        </div>
    );
}

export default TodoContainer;
