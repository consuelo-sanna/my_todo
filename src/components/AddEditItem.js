import React, { Component } from 'react';

class AddEditItem extends Component {
    onChange = e => {
        this.props.updateText(e.target.value, this.props.editable.id);
        //onChange={() => props.markComplete(id)}
    };

    onSubmit = e => {
        e.preventDefault();
        if (this.props.editable.id === 0) this.props.add_todo();
        else this.props.editTodo();

        //this.setState({ title: '', modificaUser: false });
    };

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input
                    type="text"
                    name="title"
                    value={this.props.editable.title}
                    onChange={this.onChange}
                />
                <input type="submit" value="submit" className="btn" />
            </form>
        );
    }
}

export default AddEditItem;
