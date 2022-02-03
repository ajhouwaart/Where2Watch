import React, {useContext} from "react";
import './nextpreviousbuttons.css'
import {LanguageContext} from "../../context/LanguageContext";
import {NumberOfResultsContext} from "../../context/NumberOfResultsContext";

function NextPreviousButtons() {

    const { page, numberofResults, decreasePage, increasePage } = useContext(NumberOfResultsContext)

    const lang = useContext(LanguageContext);

    return (
        <div className="noOfResultsContainer">
            {page > 1 &&
            <button type="button"
                    className="countButtonMin"
                    onClick={decreasePage}
            >&#8249;&#8249;  {lang.langPrevious}
            </button>}
            {page <= (numberofResults.totalResults / 10) && numberofResults.totalResults > 10 &&
            <button type="button"
                    className="countButtonPlus"
                    onClick={increasePage}
            >{lang.langNext} &#8250;&#8250;
            </button>}
        </div>
    );
}

export default NextPreviousButtons;