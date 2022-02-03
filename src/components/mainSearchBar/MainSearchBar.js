import React, {useContext, useRef} from 'react';
import './mainSearchBar.css';
import {Link} from "react-router-dom";
import {LanguageContext} from "../../context/LanguageContext";
import reel from '../../assets/movie-reel.png';


function MainSearchBar({handleMenuButton, setSearchBox, setSearchHandler, menu, children}) {

    const lang = useContext(LanguageContext);

    // main searchbar variable
    const searchBar = useRef();

    // send the query data to the first API on click
    const onSearchSubmit = () => {
        if (searchBar.current.value !== '') {
            setSearchHandler(searchBar.current.value);
            setSearchBox("searchBoxAfter");
        }
    };
    // send the query data to the first API on enter
    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            setSearchHandler(e.target.value);
            setSearchBox("searchBoxAfter");
        }
    };


    return (
        <div className="topBarContainer"
        >
            <Link to='/' className={menu ? "menuButton menuButton-return" : "menuButton"}
                  onClick={handleMenuButton}
                  aria-label="menu"
            >
                <div id={menu ? "menuicon" : "menuiconAfter"} className="menuicon"/>
                <div id={menu ? "menuicon2" : "menuicon2After"} className="menuicon"/>
                <div id={menu ? "menuicon3" : "menuicon3After"} className="menuicon"/>
            </Link>
            <input
                type="text"
                className="inputSearch"
                ref={searchBar}
                onKeyDown={handleEnter}
                placeholder={lang.typewhatyouarelookingfor}
            />
            <button
                type="button"
                className={menu ? "searchButton searchButton-return" : "searchButton"}
                onClick={onSearchSubmit}
                aria-label="search"
            >
                <img src={reel} alt=''/>
            </button>
            {children}
        </div>
    );
}

export default MainSearchBar;