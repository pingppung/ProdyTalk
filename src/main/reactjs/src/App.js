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
//import Chat2 from './components/ChatComponent'

import Calendar from './pages/Calendar'

import ResultSignup from './pages/ResultSignup'
import ResultLogin from './pages/ResultLogin'

import { Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
        <div>

           <Route exact path="/" component={Main} />
           <Route exact path="/signup" component={SignupComponent} />
           <Route exact path="/login" component={LoginComponent} />
           <Route exact path="/video" component={Openvidu} />
           <Route exact path="/chat" component={Chat} />
           <Route exact path="/calendar" component={Calendar} />
        </div>

    );
}

export default App;