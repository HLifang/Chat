import React,{Component} from 'react';

class OnLineUsers extends Component{
    render(){
        const {userIds} = this.props;
        return (
            <ol className="users-list">
                {userIds.map((userId,index)=>(
                    <li key={index}>{userId}</li>
                ))}
            </ol>
        )
    }
}

export default OnLineUsers;