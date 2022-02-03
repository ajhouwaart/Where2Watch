import React from "react";

function CountryButton({ idBtn, clickHandler }) {

    return(
        <button type="button" id={idBtn} className="countryButton" onClick={clickHandler}/>
    );
}
export default CountryButton;