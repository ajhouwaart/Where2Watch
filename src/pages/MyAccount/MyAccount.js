import React, {useContext, useEffect, useState} from 'react';
import './myAccount.css';
import {LanguageContext} from "../../context/LanguageContext";
import {UserDataContext} from "../../context/UserDataContext";
import movieQuotes from "movie-quotes";
import {doc, setDoc} from "firebase/firestore";
import {db} from "../../firebase";
import {MediaQueryContext} from "../../context/MediaQueryContext";
import axios from "axios";

function MyAccount() {

    // contexts
    const lang = useContext(LanguageContext);
    const userData = useContext(UserDataContext);
    const {isMobile} = useContext(MediaQueryContext);

    const [loading, toggleLoading] = useState(false);

    const [saveSucces, toggleSaveSucces] = useState(false);

    const [quote, setQuote] = useState([]);

    const [greeting, setGreeting] = useState("");

    const [avatar, setAvatar] = useState(``);

    const [changeAvatar, toggleChangeAvatar] = useState(false);

    const [generateAvatarType, setGenerateAvatarType] = useState(0);

    const [randomizer, setRandomizer] = useState(Math.random());

    const avatarVariations = [
        "identicon",
        "bottts",
        "pixel-art-neutral",
        "adventurer-neutral",
        "big-smile",
        "personas",
        "miniavs"
    ]

    // getting avatar from API
    const generateDiceBearAvatar = (sprites, seed) =>
        `https://avatars.dicebear.com/api/${sprites}/${seed}.svg`;

    // setting avatar from saved avatar
    useEffect(() => {
        if (userData.extraUserData.avatar !== undefined) {
            setAvatar(userData.extraUserData.avatar[0])
            setGenerateAvatarType(userData.extraUserData.avatar[1])
            setRandomizer(userData.extraUserData.avatar[2])
        }
    }, [userData.extraUserData.avatar])

    // generate greeting based on time of day
    useEffect(() => {
        const date = new Date();
        const hours = date.getHours()
        let greet = ""
        if (((hours >= 6)) && (hours < 12)) {
            greet = lang.goodMorning;
        }
        if ((hours >= 12) && (hours < 18)) {
            greet = lang.goodAfternoon;
        }
        if ((hours >= 18) && (hours < 24)) {
            greet = lang.goodEvening;
        }
        if ((hours >= 0) && (hours < 6)) {
            greet = lang.goodNight;
        }
        setGreeting(greet)

    }, []);

    // change border-radius of container to match height and/or mobile layout
    useEffect(() => {
        if ((!isMobile) && (!changeAvatar)) {
            document.documentElement.style.setProperty('--border-radius-account-menu', '0 0 2rem 0');
        }
        if ((isMobile) || (changeAvatar)) {
            document.documentElement.style.setProperty('--border-radius-account-menu', '0 0 2rem 2rem');
        }
    }, [isMobile, changeAvatar]);

    // open/close avatar changer
    const changeAvatarMenu = () => {
        toggleChangeAvatar(!changeAvatar);
    };

    // set next avatar variant
    const setAvatarVariantNext = () => {
        let count = generateAvatarType;

        if (count < (avatarVariations.length - 1)) {
            count = count + 1;
        } else {
            count = 0;
        }

        setGenerateAvatarType(count)
        setAvatar(generateDiceBearAvatar(avatarVariations[count], randomizer))
    }

    // set previous avatar variant
    const setAvatarVariantPrev = () => {
        let count = generateAvatarType;

        if (count > 0) {
            count = count - 1;
        } else {
            count = 3;
        }

        setGenerateAvatarType(count)
        setAvatar(generateDiceBearAvatar(avatarVariations[count], randomizer))
    }

    // randomize avatar
    const randomizeAvatar = () => {
        let random = Math.random();
        setRandomizer(random)
        setAvatar(generateDiceBearAvatar(avatarVariations[generateAvatarType], random))
    }

    // go back without saving
    const cancelAvatar = () => {
        setAvatar(userData.extraUserData.avatar[0]);
        toggleChangeAvatar(false);
    }

    // save avatar to firestore
    const saveAvatar = async () => {

        toggleLoading(true);

        try {
            await setDoc(doc(db, "userInfo", userData.currentUser.email), {
                avatar: [avatar, generateAvatarType, randomizer]
            }, {merge: true});
        } catch (error) {
            console.log(error.message);
        }
        toggleLoading(false);
        toggleSaveSucces(true);
        setTimeout(() => {
            toggleSaveSucces(false);
            toggleChangeAvatar(false);
        }, 1200);

    }


    // generate random quote
    useEffect(() => {

        const moviequote = movieQuotes.all;
        const randomNumber = Math.floor(Math.random() * 100);
        setQuote(moviequote[randomNumber].split(`"`));

    }, [userData.currentUser.email]);

    return (
        <div
            className="accountScreen"
            style={isMobile ? {top: "100%"} : {top: "0"}}
        >
            <div className="accountScreen-top-container">
                <p>{greeting}</p>

                <div id={changeAvatar ? "avatar-container-widen" : ""} className="avatar-container">
                    <img
                        src={avatar}
                        width="100"
                        alt="avatar"
                    />
                    <div className="change-avatar-btn-container">
                        <button id={changeAvatar ? "change-avatar-btn-fade" : ""}
                                className="change-avatar-btn"
                                onClick={changeAvatarMenu}

                        >
                            {lang.change}
                        </button>
                    </div>
                    <div
                        id={changeAvatar ? "change-avatar-container-fade" : ""}
                        className="change-avatar-container">
                        <button id="change-variant-btn-left" type="button"
                                onClick={setAvatarVariantPrev}>&#10151;</button>
                        <button id="change-variant-btn-right" type="button"
                                onClick={setAvatarVariantNext}>&#10151;</button>
                        <p>{lang.clickArrows}</p>
                        <div>
                            <p>Click&nbsp;</p>
                            <button type="button" onClick={randomizeAvatar}>{lang.clickHere}</button>
                        </div>
                        <input
                            type="text"
                            id="input-avatar"
                            className="inputFields"
                            placeholder={lang.typeSomething}
                            onChange={(e) => {
                                setAvatar(generateDiceBearAvatar(avatarVariations[generateAvatarType], e.target.value))
                            }}
                        />
                        <p>{lang.pickRandom}</p>
                        <div className="change-avatar-save-cancel-container">
                            <button type="button" disabled={loading} onClick={saveAvatar}>{saveSucces ? <span>&#128077;</span> : lang.save}</button>
                            <button type="button" onClick={cancelAvatar}>{lang.cancel}</button>
                        </div>
                    </div>
                </div>
                <h2>{userData.extraUserData.userName}</h2>
            </div>
            <p>"{quote[1]}"<br/>-{quote[2]} -</p>
        </div>
    );
}

export default MyAccount;