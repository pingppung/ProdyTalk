import React,{ useState, useEffect } from 'react';
import RoomService from '../../service/RoomService';
import RoomCircle from './RoomCircle.jsx';
import RoomCreate from './RoomCreate.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import '../css/Room.css';

function RoomListComponent() {

    const [rooms,setRooms]=useState([])
    const [loading,setLoading]=useState(false)
    const [state,setState]=useState(false)

    useEffect(() => {
        RoomService.getRooms().then((res) => {
            setRooms(res.data);
            setLoading(true)
        })

    },[state]);

    return (
        <div style={{ display: 'flex', flexDirection: 'row'}}>
            <div id="room">
                <RoomCreate />
            </div>
            { loading === true
            ? rooms.map(room =>
                <RoomCircle title={room.room_name} type={room.room_type} id={room.room_id}/>)
            : <CircularProgress />

            }
        </div>

    )

}

export default RoomListComponent;