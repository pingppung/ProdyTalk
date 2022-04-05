import React from 'react';
import './App.css';
import Header from './components/HeaderComponent'
import FirstPage from './pages/FirstPage'
import Main from './pages/MainPage'
import LoginComponent from './components/LoginComponent'
import SignupComponent from './components/SignupComponent'
import RoomEnter from './pages/RoomEnter'
import Openvidu from './components/stream/VideoRoomComponent'
import Chat from './pages/ChatPage'
import Calendar from './pages/Calendar'

import { Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
        <div>

           <Route exact path="/" component={FirstPage} />
           <Route exact path="/main" component={Main} />
           <Route exact path="/signup" component={SignupComponent} />
           <Route exact path="/login" component={LoginComponent} />

           <Route exact path="/roomenter/:roomid" component={RoomEnter} />
           <Route exact path="/video" component={Openvidu} />
           <Route exact path="/chat" component={Chat} />
           <Route exact path="/calendar" component={Calendar} />

        </div>

    );
}

export default App;