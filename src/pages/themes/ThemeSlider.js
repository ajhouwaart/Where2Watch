import React from "react";

function ThemeSlider({ themeSliderID, themeSliderREF, themeSliderAria, themeSliderMax = "100", themeSliderOnChange }) {

    return (
        <input
            id={themeSliderID}
            ref={themeSliderREF}
            className="themeSlider"
            type="range"
            aria-label={themeSliderAria}
            step="1"
            min="0"
            max={themeSliderMax}
            onChange={themeSliderOnChange}
        />
    );
}

export default ThemeSlider;