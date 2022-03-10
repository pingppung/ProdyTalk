import React from 'react';
import './Header.css';
import Logo from "./Logo.png";
import { Link } from "react-router-dom";

function Header() {
    return (
            <header>
                <h3>Project&Study Talk Web</h3>
                <Link to="/"><img src={Logo} alt="logo"/></Link>
                <div className="btn">
                    <Link to="/signup"><button>sign up</button></Link>
                    /
                    <Link to="/login"><button>login</button></Link>
                    /
                    <Link to="/join"><button>chatting</button></Link>
                </div>
            </header>
    );
}

export default Header;