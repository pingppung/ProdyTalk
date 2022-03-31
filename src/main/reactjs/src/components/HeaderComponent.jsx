import React, { Component } from 'react';
import './css/Header.css';
import Logo from "./image/Logo.png";
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

        const imagestyle = {
         margin:400,
         height:200,
         width:200
        };

        const isLoggedIn = this.state.isLoggedIn;
        let username;
        if (isLoggedIn) {
          username = <div className="username">{this.state.id}</div>
        } else {
          username = <div className="btn">
                        <Link to="/signup"><Button>sign up</Button></Link>
                        /
                        <Link to="/login"><Button>login</Button></Link>
                     </div>
        }
        return (
                <header>
                    <h3>Project&Study Talk Web</h3>
                    <Link to="/"><img src={Logo} alt="logo" style={imagestyle}/></Link>
                    <div className="user">
                        {username}
                        <Link to="/chat"><Button>chatting</Button></Link>
                        /
                        <Link to="/calendar"><Button>calendar</Button></Link>
                        /
                        <Link to="/calendar"><Button>calendar</Button></Link>
                    </div>

                </header>
        );
    }
}

export default withRouter(HeaderComponent);