import React,{useState} from 'react';
import {useEffect} from 'react';
import Box from '@mui/material/Box';
import './css/mainPage.css'
import Header from '../components/HeaderComponent.jsx'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import {Button} from '@material-ui/core';
import RoomCircle from '../components/room/RoomCircle.jsx'
import RoomListComponent from '../components/room/RoomListComponent.jsx'
import axios from 'axios';

function MainPage() {
    const [input,setInput] = useState("")

    const onChangeLink = (e) => {
        setInput(e.target.value)
    }

    const onLink = () => {
        axios.get(input, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
        window.alert("방 참여완료!")
    }

    useEffect(() => {

    })

    return (
        <div className="mainPage">
            <div className="smallBox">
            <Header />
                <div id="putLink">
                    <input type="text" onChange={onChangeLink} />
                    <Button variant="contained" color="primary" onClick={onLink}>참여</Button>
                </div>
                <br/><br/><br/>
                <div>
                    <RoomListComponent />
                </div>
            </div>
        </div>
    );
}

export default MainPage;