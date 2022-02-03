import React, {useContext} from "react";
import './about.css';
import {LanguageContext} from "../../context/LanguageContext";
import {Link} from "react-router-dom";
import {MediaQueryContext} from "../../context/MediaQueryContext";
import {UserDataContext} from "../../context/UserDataContext";


function About() {

    const lang = useContext(LanguageContext);

    const {isMobile} = useContext(MediaQueryContext);

    const {isLoggedIn, extraUserData} = useContext(UserDataContext);

    return (
        <div
            className="menuStroke"
            style={isMobile ? {top: "100%", borderRadius: "0"} : {top: "3rem", borderRadius: "0 2rem 0 0"}}
        >
            <span id="aboutTop">{lang.about}</span>
            {lang.wichLanguage
                ?
                <div className="about-box">
                    <h1>Welcome {isLoggedIn ? extraUserData.userName : ""}</h1>
                    <p>This app is made to make it easy for you to search a movie or show and see on which streaming-service
                        it's available.
                        {isLoggedIn ? "" : <span> For that last part you de need to be <Link className="about-links" to={lang.routePathLogin}>logged in</Link>.</span>}
                    </p>
                    <h3>To get started</h3>
                    <p>Click on the large searchbar on top en type the movie or show you want to search. Next press the film-reel
                        to the right of the searchbar or press enter to search.</p>
                    <p>You now get a list of everything to do with your search. You can now indicate for which item you wish to see more information.
                        For example you can watch the trailer or see "where to watch".</p>
                    <p>Is something not available in your country and are you behind a&nbsp;
                        <a className="about-links" href="https://vpnoverview.com/vpn-information/" target="_blank" rel="noreferrer">VPN
                        </a>? Then it's very easy to pick another country from which to search from. You can do this al the way at the top when you're logged in.</p>
                    <p>When you are logged in you can also pick a <Link className="about-links" to={lang.routePathThemes}>theme</Link>
                        &nbsp;and an avatar and save it to your&nbsp;
                        {isLoggedIn
                            ?
                            <Link className="about-links" to={lang.routePathAccount}>account</Link>
                            :
                            "account"}.</p>
                    <h2>Contact</h2>
                    <p><a className="about-links" href="mailto:sanderhouwaart@hotmail.com?subject=Mail from W2W&body=Dear Alexander from W2W,"
                          target="_blank"
                          rel="noreferrer">E-mail</a> me</p>
                </div>
                :
                <div className="about-box">
                    <h1>Welkom {isLoggedIn ? extraUserData.userName : ""}</h1>
                    <p>Deze app is gemaakt om het je makkelijk te maken om een film of serie te zoeken en vervolgens
                        te kunnen zien op welke streamingdiensten hij te zien is.
                        {isLoggedIn ? "" : <span> Voor dit laatste dien je wel <Link className="about-links" to={lang.routePathLogin}>in te loggen</Link>.</span>}
                    </p>
                    <h3>Om te beginnen</h3>
                    <p>Klik op de grote zoekbalk bovenin en type de film of serie die je wilt zoeken en klik op de film-rol rechts van de
                    zoekbalk of druk op enter om te zoeken.</p>
                    <p>Je krijgt nu een lijst van alles dat met jouw zoekopdracht te maken heeft. Je kunt nu per item aangeven of je
                    er meer info over te zien wilt hebben, zodat je vervolgens bijvoorbeeld trailers kan kijken en
                    dus kan checken waar het te zien is.</p>
                    <p>Mocht het niet in je land te zien zijn en zit je achter een&nbsp;
                        <a className="about-links" href="https://vpnoverview.com/vpn-information/" target="_blank" rel="noreferrer">VPN
                    </a>? dan kan je erg makkelijk kiezen voor een
                    ander land van waaruit te zoeken. Dit doe je helemaal bovenin wanneer je in gelogd bent.</p>
                    <p>Ook kun je wanneer je ingelogd bent een <Link className="about-links" to={lang.routePathThemes}>thema</Link>
                        &nbsp;en avatar kiezen en die vervolgens in je&nbsp;
                        {isLoggedIn
                            ?
                            <Link className="about-links" to={lang.routePathAccount}>account</Link>
                            :
                            "account"} opslaan.</p>
                    <h2>Contact</h2>
                    <p><a className="about-links" href="mailto:sanderhouwaart@hotmail.com?subject=Mail from W2W&body=Beste Alexander van W2W,"
                          target="_blank"
                          rel="noreferrer">
                        E-mail</a> mij</p>
                </div>
            }
        </div>
    );
}

export default About;