import React, { useRef, useState} from 'react';
import { useHistory } from "react-router-dom";
import './css/Room.css';
import CreateRoom from "./CreateRoom"
import RoomListComponent from './RoomListComponent'
import RoomService from '../service/RoomService'

function Room() {
    const [visible, setVisible] = useState(false);
    let history = useHistory();
    const [inputs, setInputs] = useState({
        room_name: '',
        room_type: '',
    });

    const { room_name, room_type } = inputs;

    const onChange = e => {
        const { name, value } = e.target;

        setInputs({
            ...inputs,
            [name]: value,
        });
        console.log(inputs.room_name);
        console.log(inputs.room_type);
    };

    const [rooms, setRooms] = useState([
    ]);

    const nextId = useRef(4);

    const onSubmit = () => {
        let room = {
            room_name: inputs.room_name,
            room_type: inputs.room_type
        };
        setRooms(rooms.concat(room));
        RoomService.createRoom(room).then(res => {
            //history.push('/');
            window.location.reload();
        });

        setInputs({
            room_name: '',
            room_type: '',
        });
        setVisible(!visible);
     }

    return (
        <div>
            <button onClick={() => {setVisible(!visible);}}>+</button>
            <RoomListComponent />
            {visible &&
            <CreateRoom
                room_name={room_name}
                room_type={room_type}
                onChange={onChange}
                onSubmit={onSubmit}
            />}
            {}
        </div>
    );
}

export default Room;