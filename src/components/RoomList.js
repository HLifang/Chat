import React,{ Component } from 'react';
import OnLineUsers from './OnLineUsers';

class RoomList extends Component {
    render(){
        const orderedRooms = [...this.props.rooms].sort((a,b)=>a.id - b.id);
        return (
            <div className="rooms-list">
                <h3>Your rooms:</h3>
                <ul>
                    {orderedRooms.map(room=>{
                        const active = this.props.roomId === room.id?"active":"";
    
                        return (
                            <li key={room.id} className={"room "+active}>
                                <span onClick={()=>this.props.subscribeToRoom(room.id)}>{room.name}</span>
                                {!!active &&
                                    <OnLineUsers userIds={this.props.userIds}></OnLineUsers>
                                }
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default RoomList;