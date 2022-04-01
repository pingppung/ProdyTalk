import '../css/Room.css';
import React from 'react';
import { Link,withRouter } from "react-router-dom";

function RoomCircle(props) {
    console.log(props);
    return (
    <Link to={`/roomenter/${props.data.room_id}`} >
        <label>
            <div id="circle">
                <h3>{props.data.room_name}</h3>
            </div>
        </label>
    </Link>

    );
}
export default withRouter(RoomCircle);
