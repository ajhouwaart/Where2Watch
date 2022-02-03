import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import LanguageContextProvider from "./context/LanguageContext";
import UserDataContextProvider from "./context/UserDataContext";
import CountrySearchContextProvider from "./context/CountrySearchContext";
import MediaQueryContextProvider from "./context/MediaQueryContext";
import NumberOfResultsContextProvider from "./context/NumberOfResultsContext";


ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <MediaQueryContextProvider>
                <LanguageContextProvider>
                    <UserDataContextProvider>
                        <CountrySearchContextProvider>
                            <NumberOfResultsContextProvider>
                                <App/>
                            </NumberOfResultsContextProvider>
                        </CountrySearchContextProvider>
                    </UserDataContextProvider>
                </LanguageContextProvider>
            </MediaQueryContextProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

