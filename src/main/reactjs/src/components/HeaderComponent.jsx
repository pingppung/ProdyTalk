import React, { Component } from 'react';
import './css/Header.css';
import Logo from "./image/LogoWhite.png";
import {Button} from '@material-ui/core';
import { Link,withRouter } from "react-router-dom";
import User from "./image/UserIcon.png";
import UserService from '../service/UserService'

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'로그인',
            isLoggedIn: false
        }
    }
    componentDidMount() {
        UserService.getUserName().then(res => {
            console.log(res.data.id);
            this.setState({
                id: res.data.id,
                isLoggedIn: true
            });
        });
    }

    render(){

        var isLogin=false
        const imagestyle = {
         height:200,
         width:180
        };

        const onLogout = () => {

        }

        const isLoggedIn = this.state.isLoggedIn;
        let username;

        return (
            <div className="body">
                <div className="mainlogo">
                    <Link to="/main"><img src={Logo} alt="logo" style={imagestyle}/></Link>
                </div>
            </div>
        );
    }
}

export default withRouter(HeaderComponent);