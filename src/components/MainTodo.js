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
} from '../redux/ActionCreators';
import { store } from '../redux/store';
import { connect } from 'react-redux';

import { getTodos, getEditable } from '../redux/selectors/index';
import { Card } from '@material-ui/core';

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

    addTodo = () => {
        store.dispatch(add_todo(this.props.editable.title));
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

    render() {
        return (
            <div>
                <header>
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
                            />
                        </div>
                    </Card>
                </header>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    todos: getTodos(state),
    editable: getEditable(state),
});

export default connect(mapStateToProps, {
    add_todo,
    mod_text,
    edit_todo,
    del_todo,
    mark_todo,
    update_text,
})(MainTodo);
