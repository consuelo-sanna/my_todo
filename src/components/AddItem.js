import React, {Component} from 'react';

class AddItem extends Component {

    //questo stato deve essere passato dal padre che me lo passa inizialmente vuoto e lo riempie modItem. cosi riesco a riempire sempre la box senza fare molte modifiche
    //state = props.daModificare
        state = {
            title : '',
            id: 0,
            modificaUser: false
        }
    
    componentDidUpdate(props){ 

        if(!this.state.modificaUser && this.state.title !== this.props.editTodo.title){
            this.setState({
                title : this.props.editTodo.title,
                id : this.props.editTodo.id
            }, function () {
                console.log(this.state.title);
            });
        }
    }
        

    
        


    onChange = (e) => { 
        this.setState({[e.target.name] : e.target.value, modificaUser:true} );
        
    }

    onSubmit = (e) => { 
        e.preventDefault();
        this.props.addTodo(this.state.title, this.state.id);
        this.setState({title:'', modificaUser:false});
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