import React from 'react';
import './App.css';
import Header from './components/HeaderComponent'
import Main from './pages/MainPage'
import Login from './components/LoginComponent'
import Signup from './components/SignupComponent'
//import Login from './pages/LoginPage'
import Openvidu from './components/VideoRoomComponent'


import ResultSignup from './pages/ResultSignup'
import ResultLogin from './pages/ResultLogin'

import { Route } from "react-router-dom";

function App() {
  return (
        <div>

           <Route exact path="/" component={Main} />
           <Route exact path="/signup" component={Signup} />
           <Route exact path="/login" component={Login} />

           <Route exact path="/video" component={Openvidu} />

            <Route exact path="/signup/result" component={ResultSignup} />
            <Route exact path="/login/result" component={ResultLogin} />
        </div>
    );
}

export default App;