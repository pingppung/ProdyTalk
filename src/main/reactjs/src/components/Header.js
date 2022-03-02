import React from 'react';
import './Header.css';
import Logo from "./Logo.png";

function Header() {
    return (
        <>
            <div>Project&Study Talk Web</div>
            <img src={Logo} />
        </>
//        <button onClick={() => console.log("sign up")}>sign up</button>
//        <div>/</div>
//        <button onClick={() => console.log("login")}>login</button>
    );
}

export default Header;