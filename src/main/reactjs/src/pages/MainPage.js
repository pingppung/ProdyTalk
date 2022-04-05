import React from 'react';
import Box from '@mui/material/Box';
import './css/mainPage.css'
import Header from '../components/HeaderComponent.jsx'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import RoomCircle from '../components/room/RoomCircle.jsx'
import RoomListComponent from '../components/room/RoomListComponent.jsx'
function MainPage() {
    return (
        <div className="mainPage">
            <div className="smallBox">
                <Header />
                <br/><br/><br/>
                <div>
                    <RoomListComponent />
                </div>
            </Box>
            <div>
                <Link to="/chat"><button>chatting</button></Link>
                /
                <Link to="/calendar"><button>calendar</button></Link>
            </div>
        </div>
    );
}

export default MainPage;