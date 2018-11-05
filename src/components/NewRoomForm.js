import React,{Component} from 'react';

class NewRoomForm extends Component{

    constructor(){
        super();
        this.state={
            roomName:''
        };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.createRoom(this.state.roomName);
        this.setState({
            roomName:''
        })
    }
    handleChange(e){
        this.setState({
            roomName:e.target.value
        })
    }

    render(){
        return (
            <div className="new-room-form">
                <form onSubmit={this.handleSubmit}>
                    <input 
                        value={this.state.roomName}
                        onChange={this.handleChange} 
                        placeholder="Create a room" required
                        type="text"/>
                </form>
            </div>

        )
    }
}

export default NewRoomForm;