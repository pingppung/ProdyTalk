import React from 'react';

function Room({ room, onRemove }) {
    return (
        <div>
            <b>{room.room_name}</b> <span>({room.room_type})</span>
            <button onClick={() => onRemove(room.id)}>삭제</button>
        </div>
    );
}

function SimpleList({ rooms, onRemove }) {
    return (
        <div>
            {rooms.map(room => (
                <Room room={room} key={room.id} onRemove={onRemove} />
            ))}
        </div>
    );
}

export default SimpleList;