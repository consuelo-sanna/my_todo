import React, {Component} from 'react';

class AddItem extends Component {

    
        state = {
            title : ''
        }
    

    onChange = (e) => this.setState({[e.target.name] : e.target.value});

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addTodo(this.state.title);
        this.setState({title:''});
    }

    render(){
        return(
            <form onSubmit={this.onSubmit}>
                <input
                    type="text"
                    name="title"
                    value={this.state.title}
                    onChange={this.onChange}
                />
                <input
                    type="submit"
                    value="submit"
                    className="btn"
                    
                />
            </form>
        )
    }

}

export default AddItem;