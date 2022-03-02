import React from 'react';
import './Header.css';
import Logo from "./Logo.png";
import { Link } from "react-router-dom";

function Header() {
    return (
        <div>
            <h2>Project&Study Talk Web</h2>
            <img src={Logo} />
            <Link to="/signup"><button>sign up</button></Link>
            <button>login</button>
        </div>
    );
}

export default Header;