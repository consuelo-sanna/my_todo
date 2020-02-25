import React, { Component } from 'react';
import { TextField, Paper, Button, Grid } from '@material-ui/core';
import UploadButton from './section/UploadButton';

class AddEditItem extends Component {
    state = {
        file: null,
    };

    onChange = e => {
        this.props.updateText(e.target.value, this.props.editable.id);
    };

    onSubmit = e => {
        e.preventDefault();
        if (this.props.editable.id === 0) {
            this.props.addTodo(
                this.state.file ? this.state.file : null
            );
        } else this.props.editTodo();
    };

    handleFile = file => {
        console.log(file.name);
        this.setState({ file: file });
    };

    render() {
        return (
            <Paper style={{ margin: 16, padding: 16 }}>
                <Grid container justify="space-between">
                    <Grid
                        xs={8}
                        md={9}
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
                    <Grid xs={3} md={2} item>
                        <Button
                            fullWidth
                            color="secondary"
                            variant="contained"
                            onClick={this.onSubmit}
                        >
                            Add
                        </Button>
                    </Grid>
                    <Grid xs={1} item>
                        <UploadButton file={this.handleFile} />
                    </Grid>
                    <Grid item>
                        <Paper>
                            {this.state.file
                                ? this.state.file.name
                                : null}
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default AddEditItem;
