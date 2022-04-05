import React from 'react';
import Box from '@mui/material/Box';
import './css/mainPage.css'
import Header from '../components/HeaderComponent.jsx'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

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
            </div>
        </div>
    );
}

export default MainPage;