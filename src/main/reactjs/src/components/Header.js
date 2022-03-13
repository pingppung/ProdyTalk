import React from 'react';
import './css/Header.css';
import Logo from "./image/Logo.png";
import { Link } from "react-router-dom";
import User from "./image/UserIcon.png";

function Header() {
    return (
            <header>
                <h3>Project&Study Talk Web</h3>
                <Link to="/"><img src={Logo} alt="logo"/></Link>
                <div className="user">
                    <div className="username">로그인하세요</div>
                    <Link to="/login"><img src={User} alt="user"/></Link>
                </div>

            </header>
    );
}

export default Header;