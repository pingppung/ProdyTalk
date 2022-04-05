import React,{ useState, useEffect } from 'react';
import RoomService from '../../service/RoomService';
import RoomCircle from './RoomCircle.jsx';
import RoomCreate from './RoomCreate.jsx';

import '../css/Room.css';

function RoomListComponent() {

    const [rooms,setRooms]=useState([]);

    useEffect(() => {
        RoomService.getRooms().then((res) => {
            console.log(res);
            setRooms(res.data);
        })

    },[setRooms]);


    return (
        <div style={{ display: 'flex', flexDirection: 'row'}}>
            <div id="room">
                <RoomCreate />
            </div>
            {rooms.map(room =>
                <RoomCircle data={room} />
            )}

        </div>

    );

}

export default RoomListComponent;