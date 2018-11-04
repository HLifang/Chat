import React,{Component} from 'react';

class SendMessageForm extends Component{
    constructor(){
        super();
        this.state={
            message:''
        };
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleChange(e){
        this.setState({
            message:e.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault();
    }
    render(){
        return (
            <form className="send-message-form"
                onSubmit={this.handleSubmit}>
                <input 
                    onChange={this.handleChange} 
                    value={this.state.message}
                    placeholder="Send Message Form" 
                    type="text"/>
            </form>
        )
    }
}

export default SendMessageForm;