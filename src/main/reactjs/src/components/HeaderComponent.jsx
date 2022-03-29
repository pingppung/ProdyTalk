import React, { Component } from 'react';
import './css/Header.css';
import Logo from "./image/Logo.png";
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
        const isLoggedIn = this.state.isLoggedIn;
        let username;
        if (isLoggedIn) {
          username = <div className="username">{this.state.id}</div>
        } else {
          username = <div className="btn">
                        <Link to="/signup"><button>sign up</button></Link>
                        /
                        <Link to="/login"><button>login</button></Link>
                     </div>
        }
        return (
                <header>
                    <h3>Project&Study Talk Web</h3>
                    <Link to="/"><img src={Logo} alt="logo"/></Link>
                    <div className="user">
                        {username}
                        <Link to="/chat"><button>chatting</button></Link>
                        /
                        <Link to="/calendar"><button>calendar</button></Link>
                    </div>

                </header>
        );
    }
}

export default withRouter(HeaderComponent);