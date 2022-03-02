import React from 'react';
import './Header.css';
import Logo from "./Logo.png";
import { Link } from "react-router-dom";

function Header() {
    return (
        <>
            <div>Project&Study Talk Web</div>
            <img src={Logo} />
            <Link to="/signup"><button>sign up</button></Link>
            <button>login</button>
        </>
    );
}

export default Header;