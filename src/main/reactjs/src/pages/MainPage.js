import React from 'react';
import Box from '@mui/material/Box';
import Header from '../components/HeaderComponent.jsx'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import RoomCircle from '../components/room/RoomCircle.jsx'
import RoomListComponent from '../components/room/RoomListComponent.jsx'
function MainPage() {
    return (
        <div>
            <Header />
            <br/><br/>
            <Box sx={{ bgcolor: '#cfe8fc', height: '30vh' }}>
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