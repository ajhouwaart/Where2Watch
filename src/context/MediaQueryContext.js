import React, {createContext, useEffect, useState} from "react";
import {useMediaQuery} from 'react-responsive';

export const MediaQueryContext = createContext({});

function MediaQueryContextProvider({children}) {

    //////////////////////
    // MEDIA QUERIES -----
    //////////////////////

    // checks for max-width and orientation
    const islessthen768px = useMediaQuery({query: '(max-width: 768px)'});
    const isPortrait = useMediaQuery({query: '(orientation: portrait)'});

    // main variable for desktop or mobile layout
    const [isMobile, setIsMobile] = useState(false);

    // set the main variable for desktop or mobile layout
    useEffect(() => {

        if ((islessthen768px === true) || (isPortrait === true)) {
            setIsMobile(true);
        }
        if ((islessthen768px !== true) || (isPortrait !== true)) {
            setIsMobile(false);
        }
    }, [islessthen768px, isPortrait]);


    // setting css variables based on screen-size
    useEffect(() => {

        const globalStyle = document.documentElement.style;

        if (isMobile) {

            globalStyle.setProperty('--alignitemscentertostart', 'flex-start');
            globalStyle.setProperty('--heightTrailerbox', '30rem');
            globalStyle.setProperty('--scaleEmbeddedVideo', '.5');
            globalStyle.setProperty('--alignItemsFromStartToCenter', 'center');
            globalStyle.setProperty('--alignItemsFromEndToCenter', 'center');
            globalStyle.setProperty('--justify-content-start-evenly', 'space-evenly');

            globalStyle.setProperty('--menustrokes-left-8rem-0', '0');
            globalStyle.setProperty('--menu-items-width-56rem-100vw', '100vw');
            globalStyle.setProperty('--border-radius-themes-menu', '0 0 2rem 2rem');
            globalStyle.setProperty('--flexdirectionrowtocolumn', 'column');
            globalStyle.setProperty('--flexdirectioncolumntorow', 'row');
            globalStyle.setProperty('--width-menu-8rem-100', '100vw');
            globalStyle.setProperty('--padding-menu', '1rem');

        } else {

            globalStyle.setProperty('--alignitemscentertostart', 'center');
            globalStyle.setProperty('--heightTrailerbox', '47.5rem');
            globalStyle.setProperty('--scaleEmbeddedVideo', '.83');
            globalStyle.setProperty('--alignItemsFromStartToCenter', 'flex-start');
            globalStyle.setProperty('--alignItemsFromEndToCenter', 'flex-end');
            globalStyle.setProperty('--justify-content-start-evenly', 'flex-start');

            globalStyle.setProperty('--menustrokes-left-8rem-0', '8rem');
            globalStyle.setProperty('--menu-items-width-56rem-100vw', '56rem');
            globalStyle.setProperty('--border-radius-themes-menu', '0 0 2rem 0');
            globalStyle.setProperty('--flexdirectionrowtocolumn', 'row');
            globalStyle.setProperty('--flexdirectioncolumntorow', 'column');
            globalStyle.setProperty('--width-menu-8rem-100', '8rem');
            globalStyle.setProperty('--padding-menu', '0 0 1.4rem 0');

        }

    }, [isMobile]);

    //////////////////////
    // ----- MEDIA QUERIES
    //////////////////////

    const value = {
        isMobile
    }

    return (
        <MediaQueryContext.Provider value={value}>
            {children}
        </MediaQueryContext.Provider>
    )
}

export default MediaQueryContextProvider;