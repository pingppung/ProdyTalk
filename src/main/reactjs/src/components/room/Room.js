import React, { useRef, useState } from 'react';
import './Room.css';
import CreateRoom from "./CreateRoom"
import SimpleList from './SimpleList';

function Room() {
    const [visible, setVisible] = useState(false);

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
    };

    const [rooms, setRooms] = useState([
    ]);

    const nextId = useRef(4);

    const onCreate = () => {
        const room = {
            id: nextId.current,
            room_name,
            room_type,
        };

        setRooms(rooms.concat(room));

        setInputs({
            room_name: '',
            room_type: '',
        });

        nextId.current += 1;

        setVisible(!visible);
    };

    const onRemove = id => {
        setRooms(rooms.filter(room => room.id !== id));
    };

    return (
        <body>
            <button onClick={() => {setVisible(!visible);}}>+</button>
            {visible &&
            <CreateRoom
                room_name={room_name}
                room_type={room_type}
                onChange={onChange}
                onCreate={onCreate}
            />}
            {}
            <SimpleList rooms={rooms} onRemove={onRemove} />
        </body>
    );
}

export default Room;