import React, {useContext} from 'react';
import './loggedIn.css'
import CountryButton from "./CountryButton";
import {LanguageContext} from "../../context/LanguageContext";
import {CountrySearchContext} from "../../context/CountrySearchContext";
import {MediaQueryContext} from "../../context/MediaQueryContext";


function LoggedIn() {

    const lang = useContext(LanguageContext);

    const {isMobile} = useContext(MediaQueryContext);

    const countrySearch = useContext(CountrySearchContext);

    return (
        <div className="loggedInContainer">
            <div className="loggedinTop"
                 style={isMobile ? {flexDirection: "column"} : {flexDirection: "row"}}
            >
                <h2 className="pro">Pro-mode</h2>
                <div className="otherCountryContainer">
                    <p>{lang.searchCountry}</p>
                    <CountryButton idBtn="nlBtn" clickHandler={countrySearch.searchNL}/>
                    <CountryButton idBtn="gbBtn" clickHandler={countrySearch.searchGB}/>
                    <CountryButton idBtn="usBtn" clickHandler={countrySearch.searchUS}/>
                    <CountryButton idBtn="deBtn" clickHandler={countrySearch.searchDE}/>
                    <CountryButton idBtn="caBtn" clickHandler={countrySearch.searchCA}/>
                    <CountryButton idBtn="esBtn" clickHandler={countrySearch.searchES}/>
                    <CountryButton idBtn="frBtn" clickHandler={countrySearch.searchFR}/>
                </div>
            </div>
        </div>
    );
}

export default LoggedIn;