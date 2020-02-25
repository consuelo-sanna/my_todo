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
import { store } from '../redux/store';
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
        store.dispatch(get_todos());
    }

    editTodo = () => {
        store.dispatch(
            edit_todo(
                this.props.editable.title,
                this.props.editable.id
            )
        );
    };

    addTodo = file => {
        store.dispatch(add_todo(this.props.editable.title, file));
    };

    modItem = (id, testo) => {
        store.dispatch(mod_text(testo, id));
    };

    updateText = (testo, id) => {
        store.dispatch(update_text(testo, id));
    };

    markComplete = (id, completed) => {
        store.dispatch(mark_todo(id, completed));
    };

    delItem = id => {
        store.dispatch(del_todo(id));
    };

    handleDownloadFile = (nome, path) => {
        //console.log('devo gestire download');
        store.dispatch(file_download(nome, path));
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

export default connect(mapStateToProps, {
    add_todo,
    mod_text,
    edit_todo,
    del_todo,
    mark_todo,
    update_text,
    file_download,
})(MainTodo);
