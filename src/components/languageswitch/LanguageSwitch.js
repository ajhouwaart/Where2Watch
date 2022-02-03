import React, {useContext} from 'react';
import {LanguageContext} from "../../context/LanguageContext";

function LanguageSwitch({menu}) {

    const { handleLanguagesSwitch } = useContext(LanguageContext)

    return (
        <div className={menu ? "languageSwitchAfter" : "languageSwitchBefore"}>
            <span className="languageSwitchTop">language</span>
            <label className="switch">
                <input type="checkbox"
                       onChange={handleLanguagesSwitch}
                />
                <span className="slider round"/>
            </label>
        </div>
    );
}

export default LanguageSwitch;