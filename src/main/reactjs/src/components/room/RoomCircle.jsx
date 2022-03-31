import '../css/Room.css';
import React from 'react';
import { Link,withRouter } from "react-router-dom";

function RoomCircle(props) {

    return (
    <Link to="/roomenter">
        <label>
            <div id="circle">
                <h3>{props.title}</h3>
            </div>
        </label>
    </Link>

    );
}
export default withRouter(RoomCircle);
