import React, { Component } from 'react';
import './css/Header.css';
import Logo from "./image/Logo.png";
import { Link } from "react-router-dom";
import User from "./image/UserIcon.png";
import UserService from '../service/UserService'

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'로그인을 하세요'
        }
    }
    componentDidMount() {
        UserService.getUserName().then(res => {
            console.log("id is "+res.data)
            this.setState({
                id: res.data
            });
        });
    }
    render(){
        return (
                <header>
                    <h3>Project&Study Talk Web</h3>
                    <Link to="/"><img src={Logo} alt="logo"/></Link>
                    <div className="user">
                        <div className="username">{this.state.id}</div>
                        <Link to="/login"><img src={User} alt="user"/></Link>
                    </div>

                </header>
        );
    }
}

export default HeaderComponent;