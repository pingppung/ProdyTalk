import React,{ useState, useEffect } from 'react';
import RoomService from '../service/RoomService';
import RoomCircle from './room/RoomCircle.jsx';

function RoomListComponent() {

    const [rooms,setRooms]=useState([]);

    useEffect(() => {
        RoomService.getRooms().then((res) => {
            setRooms(res.data);
        })

    },[setRooms]);


    return (
        <div style={{ display: 'flex', flexDirection: 'row'}}>
            {rooms.map(room =>

                <RoomCircle title={room.room_name} />

                )
            }
        </div>

    );

}

export default RoomListComponent;