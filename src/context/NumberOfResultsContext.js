import React, { createContext, useState } from "react";

export const NumberOfResultsContext = createContext({});

function NumberOfResultsContextProvider({ children }) {

    const [numberofResults, setNumberofResults] = useState(0);
    const [page, setPage] = useState(1);

    // results next and previous pages
    const increasePage = () => {
        setPage(prevPage => prevPage + 1);
    };
    const decreasePage = () => {
        setPage(prevPage => prevPage - 1);
    };

    const value = {
        page,
        numberofResults,
        setNumberofResults,
        increasePage,
        decreasePage
    }

    return (
        <NumberOfResultsContext.Provider value={value}>
            {children}
        </NumberOfResultsContext.Provider>
    );
}

export default NumberOfResultsContextProvider;