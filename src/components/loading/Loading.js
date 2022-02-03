import React from "react";
import './loading.css'

function Loading({ loadingArea, classContainer = "loadingContainer" }) {

    return (
        <div id={loadingArea} className={classContainer}>
            <p>Loading</p>
            <p>.</p>
            <p>.</p>
            <p>.</p>
        </div>
    );
}

export default Loading;