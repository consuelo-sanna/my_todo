import React, {Component} from 'react';

class AddItem extends Component {

    //questo stato deve essere passato dal padre che me lo passa inizialmente vuoto e lo riempie modItem. cosi riesco a riempire sempre la box senza fare molte modifiche
    //state = props.daModificare
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
                    name="nuovotext"
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