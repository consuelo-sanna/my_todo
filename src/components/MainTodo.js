import React, { Component } from 'react';

import TodoContainer from './TodoContainer';
import AddEditItem from './AddEditItem';

import {
    add_todo,
    edit_todo,
    mod_text,
    del_todo,
    mark_todo,
    update_text,
    get_todos,
    file_download,
} from '../redux/ActionCreators';
import { connect } from 'react-redux';

import {
    getTodos,
    getEditable,
    getIsLoadingTodos,
} from '../redux/selectors/index';
import { Card } from '@material-ui/core';
import LoadingIndicator from './LoadingIndicator';

class MainTodo extends Component {
    componentDidMount() {
        this.props.get_todos();
    }

    editTodo = () => {
        this.props.editTodo(
            this.props.editable.title,
            this.props.editable.id
        );
    };

    addTodo = file => {
        this.props.addTodo(this.props.editable.title, file);
    };

    modItem = (id, testo) => {
        this.props.modItem(testo, id);
    };

    updateText = (testo, id) => {
        this.props.updateText(testo, id);
    };

    markComplete = (id, completed) => {
        this.props.markComplete(id, completed);
    };

    delItem = id => {
        this.props.delItem(id);
    };

    handleDownloadFile = (nome, path) => {
        //console.log('devo gestire download');
        this.props.file_download(nome, path);
    };

    render() {
        return (
            <div>
                <header>
                    {this.props.isLoadingTodos ? (
                        <LoadingIndicator />
                    ) : (
                        <Card color="inherit">
                            <AddEditItem
                                editable={this.props.editable}
                                addTodo={this.addTodo}
                                editTodo={this.editTodo}
                                updateText={this.updateText}
                            />
                            <div>
                                <TodoContainer
                                    todo={this.props.todos}
                                    markComplete={this.markComplete}
                                    modItem={this.modItem}
                                    delItem={this.delItem}
                                    download={this.handleDownloadFile}
                                />
                            </div>
                        </Card>
                    )}
                </header>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    todos: getTodos(state),
    editable: getEditable(state),
    isLoadingTodos: getIsLoadingTodos(state),
});

const mapDispatchToProps = dispatch => ({
    get_todos: () => dispatch(get_todos()),
    addTodo: (testo, file) => dispatch(add_todo(testo, file)),
    modItem: (testo, id) => dispatch(mod_text(testo, id)),
    editTodo: (title, id) => dispatch(edit_todo(title, id)),
    delItem: id => dispatch(del_todo(id)),
    markComplete: (id, completed) =>
        dispatch(mark_todo(id, completed)),
    updateText: (testo, id) => dispatch(update_text(testo, id)),
    file_download: (nome, path) =>
        dispatch(file_download(nome, path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainTodo);
