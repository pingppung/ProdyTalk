import React from 'react';
import './App.css';
import Header from './components/Header'
import Main from './pages/main/Main'
import Signup from './pages/signup/Signup'
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <>
           <Header />
           <Route exact path="/" component={Main} />
           <Route exact path="/signup" component={Signup} />
    </>
  );
}

export default App;