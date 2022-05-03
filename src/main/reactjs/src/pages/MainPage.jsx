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
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HomeIcon from '@mui/icons-material/Home';
import base64 from 'base-64';
import axios from 'axios';

function MainPage({history}) {
    const [input,setInput] = useState("")

    const onChangeLink = (e) => {
        setInput(e.target.value)
    }

    const onLink = () => {
        axios.get(base64.decode(input), {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
        window.alert("방 참여완료!")
        window.location.reload();
    }

    useEffect(() => {
        return history.listen((location) => {
            if(history.action === "POP"){
                history.push("/")
            }
        })

    },[window.history])


    return (
        <div className="mainPage">
            <div className="smallBox">
            <Header />
                <div id="putLink">
                    <input type="text" onChange={onChangeLink} />
                    <Button variant="contained" color="primary" onClick={onLink}>참여</Button>
                </div>
                <br/><br/><br/>
            </div>

                <div>
                    <RoomListComponent />
                </div>
                <br />
                <div className="menu">
                    <Link to="/recruit" style={{ textDecoration: 'none', color:'black' }} >
                        <div className="recruit">
                            <PeopleAltIcon fontSize="large" /><br />
                            모집게시판
                        </div>
                    </Link>
                    <Link to="/mypage" style={{ textDecoration: 'none', color:'black' }}>
                        <div className="mypage">
                            <HomeIcon fontSize="large" /><br />
                            마이페이지
                        </div>
                    </Link>
                </div>
        </div>
    );
}

export default MainPage;