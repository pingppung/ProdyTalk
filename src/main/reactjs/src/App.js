import React from 'react';
import './App.css';
import Header from './components/Header'
import Room from './pages/main/Room'
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import ResultSignup from './pages/signup/ResultSignup'
import ResultLogin from './pages/login/ResultLogin'
import { Route } from "react-router-dom";

function App() {
  return (
    <>
           <Header />
           <Route exact path="/" component={Room} />
           <Route exact path="/signup" component={Signup} />
           <Route exact path="/login" component={Login} />
           <Route exact path="/signup/result" component={ResultSignup} />
           <Route exact path="/login/test" component={ResultLogin} />
    </>
  );
}

export default App;