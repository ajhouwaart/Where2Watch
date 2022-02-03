import React, {useContext} from 'react';
import './succesScreen.css';
import {LanguageContext} from "../../context/LanguageContext";
import emoji from "../../assets/PngItem_5072816.png"

function SuccesScreen() {

    const lang = useContext(LanguageContext);

    return (
        <div className="succesScreen">
            <img className="emoji" src={emoji} alt=""/>
            <h1>{lang.registerSucces}</h1>
        </div>
    )
}

export default SuccesScreen;