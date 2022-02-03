import React, {useContext} from 'react';
import './logo.css'
import {MediaQueryContext} from "../../context/MediaQueryContext";

function Logo() {

    const {isMobile} = useContext(MediaQueryContext);

    return (
        <div
            className="logoBox"
            style={isMobile ? {fontSize: "2rem", height: "3rem"} : {fontSize: "5rem", height: "8rem"}}
        >
            <p id="logoW" className="logo">W</p>
            <p id="logoH" className="logo">h</p>
            <p id="logoE" className="logo">e</p>
            <p id="logoR" className="logo">r</p>
            <p id="logoE2" className="logo">e</p>
            <p id="logo2" className="logo">2</p>
            <p id="logoW2" className="logo">W</p>
            <p id="logoA" className="logo">a</p>
            <p id="logoT" className="logo">t</p>
            <p id="logoC" className="logo">c</p>
            <p id="logoH" className="logo">h</p>
        </div>
    )
}

export default Logo;