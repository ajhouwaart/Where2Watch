import React from "react";

function ThemeButton({ themeButtonId, themeButtonOnClick, children }) {

    return (
        <button type="button"
                id={themeButtonId}
                className="themebuttons"
                onClick={themeButtonOnClick}
        >{children}</button>
    );
}

export default ThemeButton;