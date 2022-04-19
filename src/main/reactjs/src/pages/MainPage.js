import React from 'react';
import Box from '@mui/material/Box';
import './css/mainPage.css'
import Header from '../components/HeaderComponent.jsx'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import RoomCircle from '../components/room/RoomCircle.jsx'
import RoomListComponent from '../components/room/RoomListComponent.jsx'
import ListRecruitComponent from '../components/ListRecruitComponent.jsx'

function MainPage() {
    return (
        <div className="mainPage">
            <div className="smallBox">
                <Header />
                <br/><br/><br/>
                <div>
                    <RoomListComponent />
                </div>
                <br/>
                <Link to="/recruit"><button className="btn btn-info">게시판</button></Link>
            </div>
        </div>
    );
}

export default MainPage;