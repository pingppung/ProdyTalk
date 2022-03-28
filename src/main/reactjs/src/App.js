import React from 'react';
import './App.css';
import Header from './components/HeaderComponent'
import Main from './pages/MainPage'
import LoginComponent from './components/LoginComponent'
import SignupComponent from './components/SignupComponent'
import Openvidu from './components/VideoRoomComponent'

//import Signup from './pages/SignupPage'
//import Login from './pages/LoginPage'
import Chat from './pages/ChatPage'


import { Route } from "react-router-dom";

function App() {
  return (
        <div>

           <Route exact path="/" component={Main} />
           <Route exact path="/signup" component={SignupComponent} />
           <Route exact path="/login" component={LoginComponent} />

           <Route exact path="/video" component={Openvidu} />

            <Route exact path="/chat" component={Chat} />
        </div>

    );
}

export default App;