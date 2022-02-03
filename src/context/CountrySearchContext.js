import React, { createContext, useState } from "react";

export const CountrySearchContext = createContext({});

function CountrySearchContextProvider({ children }) {

    // set the country from where to search from, default is NL
    const [countrySearch, setCountrySearch] = useState("nl");

    // Search by country handlers
    const searchNL = () => {
        setCountrySearch("nl");
    };
    const searchGB = () => {
        setCountrySearch("uk");
    };
    const searchUS = () => {
        setCountrySearch("us");
    };
    const searchDE = () => {
        setCountrySearch("de");
    };
    const searchCA = () => {
        setCountrySearch("ca");
    };
    const searchES = () => {
        setCountrySearch("es");
    };
    const searchFR = () => {
        setCountrySearch("fr");
    };

    const value = {
        countrySearch,
        searchNL,
        searchGB,
        searchUS,
        searchDE,
        searchCA,
        searchES,
        searchFR,
    }

    return (
        <CountrySearchContext.Provider value={value}>
            {children}
        </CountrySearchContext.Provider>
    );
}

export default CountrySearchContextProvider;
