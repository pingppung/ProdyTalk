import React,{ useState, useEffect } from 'react';
import RoomService from '../../service/RoomService';
import RoomCircle from './RoomCircle.jsx';
import RoomCreate from './RoomCreate.jsx';

import '../css/Room.css';

function RoomListComponent() {

    const [rooms,setRooms]=useState([]);

    useEffect(() => {
        RoomService.getRooms().then((res) => {
            setRooms(res.data);
        })

    },[setRooms]);


    return (
        <div style={{ display: 'flex', flexDirection: 'row'}}>
            <div id="room">
                <RoomCreate />
            </div>
            {rooms.map(room =>

                <RoomCircle title={room.room_name} type={room.room_type} id={room.room_id}/>

                )
            }

        </div>

    );

}

export default RoomListComponent;