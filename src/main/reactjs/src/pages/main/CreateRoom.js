import React from 'react';

function CreateRoom({ room_name, room_type, onChange, onCreate }) {
    return (
        <div>
            <h2>방만들기</h2>
            <input
                name="room_name"
                placeholder="방이름"
                onChange={onChange}
                value={room_name}
            />
            <input
                type="radio"
                name="room_type"
                placeholder="방타입"
                onChange={onChange}
                value="프로젝트"
            />프로젝트
            <input
                type="radio"
                name="room_type"
                placeholder="방타입"
                onChange={onChange}
                value="스터디"
            />스터디
            <button onClick={onCreate}>등록</button>
        </div>
    );
}

export default CreateRoom;