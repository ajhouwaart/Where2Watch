import React, {useState, useEffect, useContext} from 'react';
import {LanguageContext} from "../../context/LanguageContext";
import './results.css';
import axios from "axios";
import Loading from "../loading/Loading";
import {UserDataContext} from "../../context/UserDataContext";
import Results from "./Results";
import {NumberOfResultsContext} from "../../context/NumberOfResultsContext";


function FirstAPIResults({searchValue, searchBox, handleMenuButton}) {

    // contexts
    const lang = useContext(LanguageContext);
    const userData = useContext(UserDataContext);
    const {setNumberofResults, page} = useContext(NumberOfResultsContext);

    // States for results
    const [imdbResults, setImdbResults] = useState([]);
    const [noResults, setNoResults] = useState('');
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState(false);

    //////////////////////
    // First API     -----
    //////////////////////

    useEffect(() => {

        async function fetchDataImdb() {

            toggleLoading(true);
            setError(false);

            if (searchValue !== '') {
                try {
                    const result = await axios.get('https://movie-database-imdb-alternative.p.rapidapi.com/',
                        {
                            params: {s: `${searchValue}`, r: 'json', page: `${page}`},
                            headers: {
                                'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com',
                                'x-rapidapi-key': process.env.REACT_APP_API_KEY1
                            }
                        });

                    // remove duplicates to not get any duplicate key errors in the map method.
                    setImdbResults(Array.from(result.data.Search.reduce((map, obj) => map.set(obj.imdbID, obj), new Map()).values()));

                    // set the number of results
                    setNumberofResults(result.data);

                    if (result.data.Response === "False") {
                        setNoResults(lang.langNoResults);
                    }
                    if (result.data.Response === "True") {
                        setNoResults('');
                    }
                } catch (e) {
                    console.error(e);
                    setError(true);
                }
                toggleLoading(false);
            }
        }

        fetchDataImdb()
    }, [searchValue, page]);

    //////////////////////
    // -----     First API
    //////////////////////

    return (
        <section id={searchBox} className="searchBox">
            {loading && <Loading loadingArea="loading3"/>}
            {error && <p className="errorMessage1-without-bg">{lang.errorMessage}</p>}
            <p className="noResults">{noResults}</p>
            {imdbResults && imdbResults.map((result1) => {
                return result1.Type !== 'game' &&
                    <Results
                        img={result1.Poster}
                        title={result1.Title}
                        releaseYear={result1.Year}
                        key={result1.imdbID}
                        isLoggedIn={userData.isLoggedIn}
                        id={result1.imdbID}
                        loading={loading}
                        handleMenuButton={handleMenuButton}
                    />
            })}
        </section>
    );
}

export default FirstAPIResults;