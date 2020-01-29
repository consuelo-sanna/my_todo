import React, { Component } from 'react';

class AddItem extends Component {
    
    state = {
        title: '',
        id: 0,
        modificaUser: false,
    };

    componentDidUpdate(props) {
        if (
            !this.state.modificaUser &&
            this.state.title !== this.props.editable.title
        ) {
            this.setState(
                {
                    title: this.props.editable.title,
                    id: this.props.editable.id,
                },
                function() {
                    console.log(this.state.title);
                }
            );
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value, modificaUser: true });
    };

    onSubmit = e => {
        e.preventDefault();
        this.props.addTodo(this.state.title, this.state.id);
        this.setState({ title: '', modificaUser: false });
    };

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input
                    type="text"
                    name="title"
                    value={this.state.title}
                    onChange={this.onChange}
                />
                <input type="submit" value="submit" className="btn" />
            </form>
        );
    }
}

export default AddItem;
