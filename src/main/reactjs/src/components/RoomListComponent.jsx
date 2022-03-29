import React,{ Component } from 'react';
import RoomService from '../service/RoomService';

class RoomListComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rooms: []
        }
    }
    componentDidMount(){
        RoomService.getRooms().then((res) => {
            this.setState({rooms: res.data});
        });
    }

    render() {
        return (
            <table className="roomlist">
                <thead>
                    <tr>
                        <th>방 번호</th>
                        <th>방 이름 </th>
                        <th>방 유형 </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.rooms.map(
                            room =>
                                <tr key = {room.room_number}>
                                    <td> {room.room_number} </td>
                                    <td> {room.room_name} </td>
                                    <td> {room.room_type} </td>
                                    </tr>
                        )
                    }
                </tbody>
            </table>
        );
    }
}

export default RoomListComponent;