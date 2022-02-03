import React, {useState, useContext, useEffect} from 'react';
import {UserDataContext} from "./context/UserDataContext";
import {MediaQueryContext} from "./context/MediaQueryContext";
import {NumberOfResultsContext} from "./context/NumberOfResultsContext";
import MainSearchBar from "./components/mainSearchBar/MainSearchBar";
import Logo from './components/logo/Logo';
import LoggedIn from './components/loggedIn/LoggedIn';
import FirstAPIResults from "./components/results/FirstAPIResults";
import NextPreviousButtons from "./components/nextpreviousbuttons/NextPreviousButtons";
import PrimaryNavigation from "./components/primaryNavigation/PrimaryNavigation";
import './App.css';
import './stylesheets/keyframes.css';
import './stylesheets/menu.css';
import './components/languageswitch/languageswitch.css';


function App() {

    // Contexts
    const userData = useContext(UserDataContext);
    const {isMobile} = useContext(MediaQueryContext);
    const {numberofResults} = useContext(NumberOfResultsContext);

    // Setting state of the main-search-results box
    const [searchBox, setSearchBox] = useState("searchBoxBefore");

    // main search value
    const [searchValue, setSearchValue] = useState("");

    // menu handler
    const handleMenuButton = () => {
        userData.toggleMenu(!userData.menu);
    };

    // menu handler from results
    const handleMenuButtonFromResults = () => {
        userData.toggleMenu(true);
        changeBothBorderRadius()
    }

    // border radius changers for menu-items
    useEffect(() => {

        if (userData.menu) {
            changesBorderRadius("--border-radius-menubutton", "3rem 0 0 0");
        }
        if (isMobile) {
            changesBorderRadius("--border-radius-searchbutton", "0 3rem 0 0")
        }
        if (!userData.menu) {
            resetBorderRadius();
        }

    }, [userData.menu, isMobile]);

    // border radius changers for menu-items
    const changeBothBorderRadius = () => {
        changesBorderRadius("--border-radius-menu", isMobile ? "0" : "0 0 0 2rem");
        changesBorderRadius("--border-radius-searchbutton", "0 3rem 0 0");
    };

    const changeMenuBorderRadius = () => {
        changesBorderRadius("--border-radius-menu", isMobile ? "0" : "0 0 0 2rem");
        changesBorderRadius("--border-radius-searchbutton", isMobile ? "0 3rem 0 0" : "0 3rem 3rem 0");
    };

    const resetBorderRadius = () => {
        changesBorderRadius("--border-radius-menu", "0 0 2rem 2rem");
        changesBorderRadius("--border-radius-searchbutton", "0 3rem 3rem 0");
        changesBorderRadius("--border-radius-menubutton", "3rem 0 0 3rem");
    };

    const changesBorderRadius = (cssVariable, values) => {
        document.documentElement.style.setProperty(cssVariable, values);
    };

    return (
        <div className="App">
            <Logo/>
            <div className="outsideContainer"
                 style={isMobile ? {paddingTop: "3rem"} : {paddingTop: "8rem"}}
            >
                {userData.isLoggedIn && <LoggedIn/>}
                <MainSearchBar setSearchHandler={setSearchValue}
                               handleMenuButton={handleMenuButton}
                               menu={userData.menu}
                               setSearchBox={setSearchBox}
                >
                    {numberofResults.totalResults > 10 &&
                    <NextPreviousButtons/>}
                    <PrimaryNavigation
                        changeBothBorderRadius={changeBothBorderRadius}
                        changeMenuBorderRadius={changeMenuBorderRadius}
                    />
                </MainSearchBar>
                <FirstAPIResults searchBox={searchBox}
                                 searchValue={searchValue}
                                 handleMenuButton={handleMenuButtonFromResults}
                />
            </div>
            <footer>copyright &copy; 2022 Alexander Houwaart</footer>
        </div>
    );
}

export default App;