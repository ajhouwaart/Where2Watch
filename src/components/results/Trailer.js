import React from "react";


function Trailer({ title, trailerBox, trailer }) {

    return (
        <div id={trailerBox} className="embedresize">
            <iframe
                className="video"
                title={title}
                src={trailer}
                allowFullScreen={true} frameBorder="no" scrolling="no"
            />
        </div>
    );
}

export default Trailer;