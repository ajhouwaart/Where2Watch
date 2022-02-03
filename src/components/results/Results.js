import React, {useState, useEffect, useContext} from 'react';
import {LanguageContext} from "../../context/LanguageContext";
import FinalResults from "./FinalResults";
import Trailer from "./Trailer";
import './results.css';
import axios from "axios";
import Loading from "../loading/Loading";
import {Link} from "react-router-dom";
import {CountrySearchContext} from "../../context/CountrySearchContext";


function Results({img, releaseYear, title, isLoggedIn, id, handleMenuButton}) {

    const lang = useContext(LanguageContext);

    const countrySearch = useContext(CountrySearchContext);


    // states for all the different API result parts
    const [moreImdbResults, setMoreImdbResults] = useState({});
    const [idImdb, setIdImdb] = useState('');
    const [finalResults, setFinalResults] = useState([]);
    const [changeButton, setChangeButton] = useState('');
    const [changeResultbox, setChangeResultbox] = useState('');
    const [trailerUrl, setTrailerUrl] = useState('');
    const [trailerBox, setTrailerBox] = useState('');
    const [popTrailer, togglePoptrailer] = useState(false);
    const [imdbUrl, setImdbUrl] = useState('');
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState(false);
    const [loading2, toggleLoading2] = useState(false);
    const [error2, setError2] = useState(false);
    const [noFurtherInfo, setNoFurtherInfo] = useState(false);

    //////////////////////
    // Second API     -----
    //////////////////////
    useEffect(() => {
        if (imdbUrl) {

            async function fetchMoreDataImdb() {

                toggleLoading(true);
                setError(false);

                try {
                    const result = await axios.get(imdbUrl);
                    setMoreImdbResults(result.data);
                    setIdImdb(result.data.id);
                    setTrailerUrl(result.data.trailer.linkEmbed);
                } catch (e) {
                    console.error(e);
                    setError(true);
                }
                toggleLoading(false);
            }

            fetchMoreDataImdb();
        }
    }, [imdbUrl]);

    //////////////////////
    // -----     Second API
    //////////////////////

    //////////////////////
    // Third API     -----
    //////////////////////
    useEffect(() => {
        if ((idImdb) && (isLoggedIn)) {

            async function fetchDataFinal() {

                toggleLoading2(true);
                setError2(false);

                try {
                    const result = await axios.get('https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup',
                        {
                            params: {source_id: `${idImdb}`, source: 'imdb', country: `${countrySearch.countrySearch}`},
                            headers: {
                                'x-rapidapi-host': 'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com',
                                'x-rapidapi-key': process.env.REACT_APP_API_KEY1
                            }
                        });
                    if (Object.keys(result.data.collection).length === 0 && result.data.collection.constructor === Object) {
                        setNoFurtherInfo(true)
                    } else {
                        setFinalResults(result.data.collection.locations);
                        setNoFurtherInfo(false)
                    }
                } catch (e) {
                    console.error(e);
                    setError2(true);
                }
                toggleLoading2(false);
            }

            fetchDataFinal();
        }
    }, [idImdb, countrySearch.countrySearch, isLoggedIn]);

    //////////////////////
    // -----     Third API
    //////////////////////

    // handle 2nd API-fetch
    const handleIdFetch = () => {
        setImdbUrl(`https://imdb-api.com/${lang.langSearch}/API/Title/${process.env.REACT_APP_API_KEY2}/${id}/Trailer,`);
        setChangeButton("changeButton");
        setChangeResultbox("changeResultbox");
    };

    const handleTrailer = () => {
        setTrailerBox("trailerBox");
        togglePoptrailer(true);
    };

    return (
        <>
            <div id={changeResultbox} className="resultBox">
                <h3 className="title">{title}</h3>
                {img === "N/A" && <div className="noimg">{lang.noImage}&#128517;</div>}
                {img !== "N/A" && <img className="pic" src={img} alt={title}/>}
                <p className="year">Release:<br/>{releaseYear}</p>
                <button id={changeButton} className="logintosee" type="button" onClick={handleIdFetch}>
                    {lang.langSeeMoreInfo}
                </button>
                {imdbUrl &&
                <>
                    {loading && <Loading
                        loadingArea="loading1"/>}
                    {error && <p className="errorMessage1">{lang.errorMessage}</p>}
                    <div className="description">- {moreImdbResults.tagline} -</div>
                    <div className="runtime">{lang.langRuntime}: {moreImdbResults.runtimeStr}</div>
                    <div className="imdbRating">Imdb-Rating: {moreImdbResults.imDbRating}</div>
                    <div className="metaRating">Metacritic-Rating: {moreImdbResults.metacriticRating}</div>
                    {trailerUrl !== null &&
                    <button className="watchTrailer" type="button" onClick={handleTrailer}>
                        {lang.langTrailer}
                    </button>
                    }
                    <div className="availableContainer">
                        <p>{lang.availableOn}</p>
                        {loading2 && <Loading
                            loadingArea="loading2"/>}
                        {error2 && <p className="errorMessage2">{lang.errorMessage}</p>}
                        <div className="availableInfoContainer">
                            {!isLoggedIn &&
                            <Link to={lang.routePathLogin}>
                                <button className="logintosee2" type="button" onClick={handleMenuButton}>
                                    {lang.langW2W}
                                </button>
                            </Link>
                            }
                            {!noFurtherInfo &&
                            isLoggedIn && finalResults.map((result2) => {
                                return <FinalResults key={result2.id}
                                                     icon={result2.icon}
                                                     url={result2.url}
                                />
                            })}
                            {noFurtherInfo && <p className="no-further-info">{lang.nofurtherinfo}</p>}
                        </div>
                    </div>
                </>
                }
            </div>
            {popTrailer &&
            <Trailer trailer={trailerUrl}
                     title={title}
                     trailerBox={trailerBox}
            />
            }
        </>
    );
}

export default Results;