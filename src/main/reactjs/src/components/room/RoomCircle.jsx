import '../css/Room.css';
import {React,useState} from 'react';
import { Link,withRouter } from "react-router-dom";
import P from "../image/p.png"
import S from "../image/s.png"

function RoomCircle(props) {

    var roomtype;

    if(props.type==="프로젝트")
        roomtype="p"
    else roomtype="s"

    const imagestyle = {
             height:80,
             width:80,
             marginLeft:120
            };


    return (

        <label>
            <div id="circle">
            {
                props.type === "프로젝트"
                ? <img src={P} alt="p" style={imagestyle} />
                : <img src={S} alt="s" style={imagestyle} />
                }
                <Link to="/roomenter" style={{ textDecoration: 'none' }}>
                <h3>{props.title}</h3>
                </Link>
            </div>
        </label>


    );
}
export default withRouter(RoomCircle);
