import React from 'react';
import Room from '../components/Room'
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Header from '../components/HeaderComponent'
import RoomCircle from '../components/room/RoomCircle.jsx'
import RoomListComponent from '../components/RoomListComponent.jsx'
function MainPage() {
    return (
        <>
            <Header />
            <br/><br/>
            <Box sx={{ bgcolor: '#cfe8fc', height: '30vh' }}>
                <div>
                    <RoomListComponent />
                </div>

            </Box>



        </>

    );
}

export default MainPage;