import React from "react";

function FinalResults({ icon, url }) {

    return (
        <a href={url}
           target="_blank"
           rel="noreferrer">
            <img className="icons" src={icon} alt="streaming service icon"/>
        </a>
    );
}

export default FinalResults;