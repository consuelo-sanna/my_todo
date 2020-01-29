import React, { Component } from 'react';

class AddEditItem extends Component {
    
    

   /* componentDidUpdate(props) {
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
    }  */

    onChange = e => {
        //this.setState({ [e.target.name]: e.target.value, modificaUser: true });
        this.props.updateText(e.target.value);
    };

    onSubmit = e => { 
        e.preventDefault();
        if(this.props.editable.id === 0 )
            this.props.addTodo();
        else
        this.props.editTodo();
        
        this.setState({ title: '', modificaUser: false });
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
