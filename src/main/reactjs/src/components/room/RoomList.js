import React,{ Component } from 'react';
import RoomService from '../../service/RoomService';

class RoomList extends Component {
    constructor(props) {
        super(props)
    // # 1.
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
                    <div>
                        <h2 className="text-center">Room List</h2>
                        <div className ="row">
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
                        </div>
                        </div>
                );
            }
        }

export default RoomList;