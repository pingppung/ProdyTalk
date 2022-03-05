import React from 'react';
import './App.css';
import Header from './components/Header'
import Main from './pages/main/Main'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Result from './pages/signup/Result'
import LoginTest from './pages/login/Test'
import { Route } from "react-router-dom";

function App() {

  return (
    <>
           <Header />
           <Route exact path="/" component={Main} />
           <Route exact path="/login" component={Login} />
           <Route exact path="/signup" component={Signup} />
           <Route exact path="/signup/result" component={Result} />
           <Route exact path="/login/test" component={LoginTest} />
    </>
  );
}

export default App;