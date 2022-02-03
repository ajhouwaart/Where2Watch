import React, {useContext, useLayoutEffect, useRef, useState} from 'react';
import {LanguageContext} from "../../context/LanguageContext";
import {UserDataContext} from "../../context/UserDataContext";
import {MediaQueryContext} from "../../context/MediaQueryContext";
import ThemeButton from "./ThemeButton";
import ThemeSlider from "./ThemeSlider";
import './themes.css';
import {Link} from "react-router-dom";
import {doc, setDoc} from "firebase/firestore";
import {db} from "../../firebase";


function Themes() {

    const {
        isLoggedIn,
        setCurrentThemeValues,
        setSavedThemeValues,
        savedThemeValues,
        currentUser
    } = useContext(UserDataContext);

    const lang = useContext(LanguageContext);

    const {isMobile} = useContext(MediaQueryContext);

    const themes = document.documentElement.style;

    const [loading, toggleLoading] = useState(false);
    const [saveSucces, toggleSaveSucces] = useState(false);

    // state for black&white
    const [bwState, setBwState] = useState("themePresetsButtonContainer");

    const hueSlider = useRef();
    const satSlider = useRef();
    const briSlider = useRef();
    const txtSlider = useRef();

    // layoutEffect to set the default values of sliders BEFORE page-render when logged in
    useLayoutEffect(() => {

        if (isLoggedIn) {

            hueSlider.current.defaultValue = `${savedThemeValues[0]}`;
            satSlider.current.defaultValue = `${savedThemeValues[1]}`;
            briSlider.current.defaultValue = `${savedThemeValues[2]}`;
            txtSlider.current.defaultValue = `${savedThemeValues[3]}`;

        }

    }, [isLoggedIn, savedThemeValues]);


    // Theme handlers

    // presets
    const themeblue = () => {
        switchTheme(200, 60, 50, 90, 90, 95, "themePresetsButtonContainer");
    };
    const themered = () => {
        switchTheme(360, 60, 45, 90, 90, 95, "themePresetsButtonContainer");
    };
    const themegreen = () => {
        switchTheme(107, 50, 50, 90, 90, 95, "themePresetsButtonContainer");
    };
    const themepurple = () => {
        switchTheme(260, 50, 50, 90, 60, 95, "themePresetsButtonContainer");
    };
    const themeyellow = () => {
        switchTheme(53, 80, 50, 10, 60, 10, "themePresetsButtonContainer");
    };
    const themeorange = () => {
        switchTheme(30, 90, 50, 90, 90, 95, "themePresetsButtonContainer");
    };
    const themepink = () => {
        switchTheme(360, 100, 80, 10, 100, 10, "themePresetsButtonContainer");
    };
    const themeaqua = () => {
        switchTheme(155, 50, 60, 10, 100, 10, "themePresetsButtonContainer");
    };
    const themebwd = () => {
        switchTheme(0, 0, 25, 90, 40, 95, "themePresetsButtonContainerBW");
    };
    const themebwl = () => {
        switchTheme(0, 0, 75, 10, 100, 10, "themePresetsButtonContainerBW");
    };
    // random numbers to get all 3 hsl values and the background brightness
    const themerandom = () => {
        const randomhue = Math.floor(Math.random() * 360);
        const randomsat = Math.floor(Math.random() * 100);
        const randombri = Math.floor(Math.random() * 100);
        const randombgbri = Math.floor(Math.random() * 100);

        switchTheme(randomhue, randomsat, randombri, 90, randombgbri, 95, "themePresetsButtonContainer");
    };

    // general theme switch function
    const switchTheme = (hue, sat, bri, txt, bgBri, icoBri, bwState) => {

        setBwState(bwState)

        themes.setProperty('--mainColorHue', hue);
        themes.setProperty('--mainColorSat', `${sat}%`);
        themes.setProperty('--mainColorBri', `${bri}%`);
        themes.setProperty('--textColor', `var(--mainColorHue) 5% ${txt}%`);
        themes.setProperty('--backgroundBrightness', `${bgBri}%`);
        themes.setProperty('--iconBrightness', `${icoBri}%`);

        if (isLoggedIn) {

            hueSlider.current.value = hue;
            satSlider.current.value = sat;
            briSlider.current.value = bri;
            txtSlider.current.value = txt;

            saveCurrentThemeValues();

        }
    }

    const saveCurrentThemeValues = () => {
        setCurrentThemeValues(
            [
                hueSlider.current.value,
                satSlider.current.value,
                briSlider.current.value,
                txtSlider.current.value,
            ]);
    }

    // slider handlers
    const themeHueSlider = (e) => {
        themes.setProperty('--mainColorHue', `${e.target.value}`);
        saveCurrentThemeValues();
    }
    const themeSatSlider = (e) => {
        themes.setProperty('--mainColorSat', `${e.target.value}%`);
        saveCurrentThemeValues();
    }
    const themeBriSlider = (e) => {
        themes.setProperty('--mainColorBri', `${e.target.value}%`);
        themes.setProperty('--backgroundBrightness', `${e.target.value}%`);
        saveCurrentThemeValues();
    }
    const themeTxtSlider = (e) => {
        themes.setProperty('--textColor', `var(--mainColorHue) 5% ${e.target.value}%`);
        themes.setProperty('--iconBrightness', `${e.target.value}%`);
        saveCurrentThemeValues();
    }

    // Save theme to firestore
    const handleSaveCurrentTheme = async () => {

        setSavedThemeValues(
            [
                hueSlider.current.value,
                satSlider.current.value,
                briSlider.current.value,
                txtSlider.current.value
            ]);

        toggleLoading(true);

        try {
            await setDoc(doc(db, "userInfo", currentUser.email), {
                theme: [
                    hueSlider.current.value,
                    satSlider.current.value,
                    briSlider.current.value,
                    txtSlider.current.value
                ]
            }, {merge: true});
        } catch (error) {
            console.log(error.message);
        }
        toggleLoading(false);
        toggleSaveSucces(true);
        setTimeout(() => {
            toggleSaveSucces(false);
        },2000);
    };

    return (
        <div id="topMenuStroke"
             style={isMobile ? {top: "100%"} : {top: "0"}}
        >
            <p className="themetext">{lang.themespresets}</p>
            <div className={bwState}>
                <ThemeButton themeButtonId="themeblue" themeButtonOnClick={themeblue}/>
                <ThemeButton themeButtonId="themered" themeButtonOnClick={themered}/>
                <ThemeButton themeButtonId="themegreen" themeButtonOnClick={themegreen}/>
                <ThemeButton themeButtonId="themepurple" themeButtonOnClick={themepurple}/>
                <ThemeButton themeButtonId="themeyellow" themeButtonOnClick={themeyellow}/>
                <ThemeButton themeButtonId="themeorange" themeButtonOnClick={themeorange}/>
                <ThemeButton themeButtonId="themepink" themeButtonOnClick={themepink}/>
                <ThemeButton themeButtonId="themeaqua" themeButtonOnClick={themeaqua}/>
                <ThemeButton themeButtonId="themebwd" themeButtonOnClick={themebwd}/>
                <ThemeButton themeButtonId="themebwl" themeButtonOnClick={themebwl}/>
                {isLoggedIn &&
                <ThemeButton themeButtonId="themerandom" themeButtonOnClick={themerandom}>?</ThemeButton>
                }
            </div>
            {isLoggedIn ?
                <div className="themeBottomContainer">
                    <div className="themeBottomContainer-sliders">
                        <label className="theme-text-sliders-container">
                            hue:
                            <ThemeSlider themeSliderID="hueSlider"
                                         themeSliderREF={hueSlider}
                                         themeSliderAria="hue-slider"
                                         themeSliderMax="360"
                                         themeSliderOnChange={themeHueSlider}
                            />
                        </label>
                        <label className="theme-text-sliders-container">
                            {lang.themessaturation}:
                            <ThemeSlider themeSliderID="satSlider"
                                         themeSliderREF={satSlider}
                                         themeSliderAria="saturation-slider"
                                         themeSliderOnChange={themeSatSlider}
                            />
                        </label>
                        <label className="theme-text-sliders-container">
                            {lang.themeslightness}:
                            <ThemeSlider themeSliderID="briSlider"
                                         themeSliderREF={briSlider}
                                         themeSliderAria="lightness-slider"
                                         themeSliderOnChange={themeBriSlider}
                            />
                        </label>
                        <label className="theme-text-sliders-container">
                            {lang.themestextcolor}:
                            <ThemeSlider themeSliderID="txtSlider"
                                         themeSliderREF={txtSlider}
                                         themeSliderAria="text-slider"
                                         themeSliderOnChange={themeTxtSlider}
                            />
                        </label>

                    </div>
                    <div id="btn-save-theme" className="far fa-save" disabled={loading} onClick={handleSaveCurrentTheme}>
                        <h5>{lang.save}</h5>
                        {loading ? <p>Loading</p> : saveSucces ? <p id="saveSucces">&#128077;</p> : <p>{lang.themesSaveMessage}</p>}
                    </div>
                </div>
                :
                <p id="themeslogin" className="themetext">
                    <Link className="link-to-login" to={lang.routePathLogin}>Log-in</Link>
                    {lang.themeslogin}</p>
            }
        </div>
    );
}

export default Themes;