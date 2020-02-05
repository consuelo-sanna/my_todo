import React, { Component, memo } from 'react';
import { TextField, Paper, Button, Grid } from '@material-ui/core';

class AddEditItem extends Component {
    onChange = e => {
        this.props.updateText(e.target.value, this.props.editable.id);
    };

    onSubmit = e => {
        e.preventDefault();
        if (this.props.editable.id === 0) {
            this.props.addTodo();
        } else this.props.editTodo();
    };

    render() {
        return (
            <Paper style={{ margin: 16, padding: 16 }}>
                <Grid container>
                    <Grid
                        xs={10}
                        md={11}
                        item
                        style={{ paddingRight: 18 }}
                    >
                        <TextField
                            placeholder="Add Todo here"
                            value={this.props.editable.title}
                            onChange={this.onChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid xs={2} md={1} item>
                        <Button
                            fullWidth
                            color="secondary"
                            variant="contained"
                            onClick={this.onSubmit}
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default AddEditItem;
