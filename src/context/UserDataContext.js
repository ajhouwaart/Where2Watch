import React, {createContext, useContext, useEffect, useState} from 'react';
import {useNavigate, useLocation} from "react-router-dom";
import {LanguageContext} from "./LanguageContext";
import Loading from "../components/loading/Loading";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import {auth, db} from "../firebase";
import {
    doc,
    setDoc,
    onSnapshot
} from "firebase/firestore";
import {MediaQueryContext} from "./MediaQueryContext";


export const UserDataContext = createContext({});

function UserDataContextProvider({children}) {

    const lang = useContext(LanguageContext);

    const {isMobile} = useContext(MediaQueryContext);

    let location = useLocation();

    const navigate = useNavigate();

    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [loginLoading, toggleLoginLoading] = useState(false);

    // Menu
    const [menu, toggleMenu] = useState(false);

    // saved theme values
    const [savedThemeValues, setSavedThemeValues] = useState([200, 60, 50, 90]);

    // current theme values
    const [currentThemeValues, setCurrentThemeValues] = useState([savedThemeValues[0], savedThemeValues[1], savedThemeValues[2], savedThemeValues[3]]);

    // is user logged in?
    const [isLoggedIn, toggleIsLoggedIn] = useState(false);

    // current user Authentication data
    const [currentUser, setCurrentUser] = useState();

    // extra user data, like theme and avatar
    const [extraUserData, setExtraUserData] = useState({});

    // checking for user on load
    onAuthStateChanged(auth, user => {
        if (user) {
            setCurrentUser(user);
            toggleIsLoggedIn(true);
        }
    });

    // Register new user to firebase Auth
    const onNewUserSubmit = async (data) => {

        toggleError(false);
        toggleLoading(true);

        try {
            await createUserWithEmailAndPassword(
                auth,
                data.mailadress,
                data.newUserPassword
            ).then(() => postUserInfo(data));
        } catch (error) {
            console.log(error.message);
            toggleError(true);
        }
        toggleLoading(false);
    };

    // Register new user extra data to Firestore
    const postUserInfo = async (newUser) => {

        toggleError(false);
        toggleLoading(true);

        try {

            await setDoc(doc(db, "userInfo", newUser.mailadress), {
                email: newUser.mailadress,
                userName: newUser.nuUserName,
                foundThrough: newUser.foundThrough,
                foundThroughOther: newUser.foundThroughOther,
                newsletter: newUser.nwsLtr,
                comments: newUser.comments,
                theme: savedThemeValues,
                avatar: [`https://avatars.dicebear.com/api/bottts/${Math.random()}.svg`, 1, Math.random()]
            });
            navigate('/succes');
            document.documentElement.style.setProperty("--border-radius-searchbutton", "0 3rem 0 0");
        } catch (error) {
            console.log(error.message);
            toggleError(true);
        }
        toggleLoading(false);
    };

    // Login user
    const onLoginSubmit = async (data) => {

        toggleError(false);
        toggleLoginLoading(true);

        try {
            await signInWithEmailAndPassword(
                auth,
                data.email,
                data.password
            ).then((userCredentials) => {
                setCurrentUser(userCredentials.user);
                toggleIsLoggedIn(true);
            });

        } catch (error) {
            console.log(error.message);
            toggleError(true);
        }
        toggleLoginLoading(false);
    };

    // get user info from Firestore
    useEffect(() => {

        if (currentUser !== undefined) {

            const getUserData = async () => {

                let email = currentUser.email
                toggleError(false);
                toggleLoginLoading(true);

                try {

                    await onSnapshot(doc(db, "userInfo", email), (doc) => {
                        setExtraUserData(doc.data());

                        // setting all the saved theme values
                        changeStyleVars('--mainColorHue', doc.data().theme[0]);
                        changeStyleVars('--mainColorSat', `${doc.data().theme[1]}%`);
                        changeStyleVars('--mainColorBri', `${doc.data().theme[2]}%`);
                        changeStyleVars('--textColor', `var(--mainColorHue) 5% ${doc.data().theme[3]}%`);
                        changeStyleVars('--backgroundBrightness', `${doc.data().theme[2]}%`);
                        changeStyleVars('--iconBrightness', `${doc.data().theme[3]}%`);
                        setSavedThemeValues(doc.data().theme)
                    });
                    setTimeout(() => {
                        toggleMenu(true);
                        document.documentElement.style.setProperty("--border-radius-menu", isMobile ? "0" : "0 0 0 2rem");
                        document.documentElement.style.setProperty("--border-radius-searchbutton", "0 3rem 0 0");
                        if (location.pathname === lang.routePathNewUsr) {
                            setTimeout(() => {
                                navigate(lang.routePathAccount);
                            }, 3000);
                        }
                        if (location.pathname !== lang.routePathNewUsr) {
                            navigate(lang.routePathAccount);
                        }
                    }, 1000);
                } catch (error) {
                    console.log(error.message);
                    toggleError(true);
                }
                toggleLoginLoading(false);
            };
            getUserData();
        }
    }, [currentUser]);

    // log out user
    const handleLogout = async () => {
        await signOut(auth);
        toggleIsLoggedIn(false);
        setCurrentUser();
        setExtraUserData({});
        resetBorderRadius();
    };

    // reset border radius of searchbar and menu
    const resetBorderRadius = () => {
        changeStyleVars("--border-radius-menu", "0 0 2rem 2rem");
        changeStyleVars("--border-radius-searchbutton", "0 3rem 3rem 0");
    }


    function changeStyleVars(cssVariable, values) {
        document.documentElement.style.setProperty(cssVariable, values);
    }


    const userData = {
        isLoggedIn,
        loading,
        error,
        onNewUserSubmit,
        resetBorderRadius,
        onLoginSubmit,
        handleLogout,
        extraUserData,
        currentUser,
        setCurrentThemeValues,
        setSavedThemeValues,
        savedThemeValues,
        currentThemeValues,
        menu,
        toggleMenu
    }


    return (
        <UserDataContext.Provider value={userData}>
            {!loginLoading ? children : <Loading loadingArea="firstLoad" classContainer=""/>}
        </UserDataContext.Provider>
    );
}

export default UserDataContextProvider;