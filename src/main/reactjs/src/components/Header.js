import React from 'react';
import './Header.css';
import Logo from "./Logo.png";
import { Link } from "react-router-dom";

function Header() {
    return (
            <header>
                <h3>Project&Study Talk Web</h3>
                <img src={Logo} />
                <div>
                    <Link to="/signup"><button>sign up</button></Link>
                    <a>/</a>
                    <button>login</button>
                <img src={Logo} alt="logo"/>
                <div className="btn">
                    <Link to="/signup"><button>sign up</button></Link>
                    /
                    <Link to="/login"><button>login</button></Link>
                </div>
            </header>
    );
}

export default Header;