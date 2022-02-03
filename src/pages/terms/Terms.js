import React, {useContext} from "react";
import './terms.css';
import {LanguageContext} from "../../context/LanguageContext";
import TermsEN from "./TermsEN";
import TermsNL from "./TermsNL";
import {MediaQueryContext} from "../../context/MediaQueryContext";

function Terms() {

    const lang = useContext(LanguageContext);

    const {isMobile} = useContext(MediaQueryContext)

    return (
        <div
            className="menuStroke"
            style={isMobile ? {top: "100%", borderRadius: "0"} : {top: "6rem", borderRadius: "0 2rem 0 0"}}
        >
            <span id="termsTop">{lang.termsAndConditionsLang}
            </span>
            <div id="termsBox">
                {lang.wichLanguage ? <TermsEN/> : <TermsNL/>}
            </div>
        </div>
    );
}

export default Terms;