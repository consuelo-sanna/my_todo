import React from 'react';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Link from '@material-ui/core/Link';

import { Paper, Button, Grid, Checkbox } from '@material-ui/core';

function TodoItem(props) {
    const { _id, testo, FileName, FileSystemPath } = props.todo;
    return (
        <div>
            {props.todo ? (
                <Paper style={{ margin: 2, padding: 12 }}>
                    <Grid container justify="space-between">
                        <Checkbox
                            onChange={() =>
                                props.markComplete(
                                    _id,
                                    props.todo.completed
                                )
                            }
                            value="primary"
                            inputProps={{
                                'aria-label': 'primary checkbox',
                            }}
                        />
                        <CardContent>
                            <Typography
                                align="center"
                                variant="inherit"
                                component="h5"
                                style={{
                                    textDecoration: props.todo
                                        .completed
                                        ? 'line-through'
                                        : 'none',
                                }}
                            >
                                {testo}
                            </Typography>
                            {FileName ? (
                                <Link
                                    component="button"
                                    variant="body2"
                                    onClick={() => {
                                        props.download(
                                            FileName,
                                            FileSystemPath
                                        );
                                    }}
                                >
                                    {FileName}
                                </Link>
                            ) : null}
                        </CardContent>
                        <CardActions>
                            <Button
                                size="small"
                                color="primary"
                                onClick={() =>
                                    props.modItem(_id, testo)
                                }
                            >
                                M
                            </Button>
                            <Button
                                size="small"
                                color="secondary"
                                onClick={() => props.delItem(_id)}
                            >
                                X
                            </Button>
                        </CardActions>
                    </Grid>
                </Paper>
            ) : null}
        </div>
    );
}

export default TodoItem;
