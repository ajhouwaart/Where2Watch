import React, {useContext} from "react";
import {Link, Route, Routes} from "react-router-dom";
import LanguageSwitch from "../languageswitch/LanguageSwitch";
import Themes from "../../pages/themes/Themes";
import About from "../../pages/about/About";
import Terms from "../../pages/terms/Terms";
import Login from "../../pages/login/Login";
import NewUser from "../../pages/newUser/NewUser";
import SuccesScreen from "../../pages/succesScreen/SuccesScreen";
import MyAccount from "../../pages/MyAccount/MyAccount";
import {LanguageContext} from "../../context/LanguageContext";
import {UserDataContext} from "../../context/UserDataContext";
import {MediaQueryContext} from "../../context/MediaQueryContext";


export default function PrimaryNavigation({changeBothBorderRadius, changeMenuBorderRadius}) {

    // Contexts
    const lang = useContext(LanguageContext);
    const {isLoggedIn, menu, handleLogout} = useContext(UserDataContext);
    const {isMobile} = useContext(MediaQueryContext);

    return(
        <nav
            className={menu ? "menuAfter" : "menuBefore"}
            style={isMobile ? {} : {height: "24rem"}}
        >
            <Link to={lang.routePathThemes}
                  className={menu ? "menuItemButtonsAfter" : "menuItemButtonsBefore"}
                  onClick={changeBothBorderRadius}
            >
                {lang.themesLang}
            </Link>
            <Link to={lang.routePathAbout}
                  className={menu ? "menuItemButtonsAfter" : "menuItemButtonsBefore"}
                  onClick={changeMenuBorderRadius}
            >
                {lang.about}
            </Link>
            <Link to={lang.routePathTerms}
                  className={menu ? "menuItemButtonsAfter" : "menuItemButtonsBefore"}
                  onClick={changeMenuBorderRadius}
            >
                {lang.termsLang}
            </Link>
            {isLoggedIn &&
            <Link to={lang.routePathAccount}
                  className={menu ? "menuItemButtonsAfter" : "menuItemButtonsBefore"}
                  onClick={changeBothBorderRadius}
            >
                account
            </Link>
            }
            <LanguageSwitch handleLanguagesSwitch={lang.handleLanguagesSwitch}
                            menu={menu}
            />
            {!isLoggedIn &&
            <Link to={lang.routePathLogin}
                  className={menu ? "loginButton" : "loginButtonBefore"}
                  onClick={changeBothBorderRadius}
                  aria-label="Log in"
            >
                <i className="fas fa-sign-in-alt"/>
                <p>log in</p>
            </Link>
            }
            {isLoggedIn &&
            <Link to='/'
                  className={menu ? "logoutButton" : "logoutButtonBefore"}
                  onClick={handleLogout}
                  aria-label="Log out"
            >
                <i className="fas fa-sign-out-alt"/>
                <p>{lang.logout}</p>
            </Link>
            }
            <Routes>
                <Route path='/'
                       element={<></>}
                />
                <Route path={lang.routePathThemes}
                       element={<Themes/>}
                />
                <Route path={lang.routePathAbout}
                       element={<About/>}
                />
                <Route path={lang.routePathTerms}
                       element={<Terms/>}
                />
                <Route path={lang.routePathLogin}
                       element={<Login/>}
                />
                <Route path={lang.routePathNewUsr}
                       element={<NewUser/>}
                />
                <Route path='/succes'
                       element={<SuccesScreen changeBothBorderRadius={changeBothBorderRadius}/>}
                />
                {isLoggedIn &&
                <Route path={lang.routePathAccount}
                       element={<MyAccount/>}
                />
                }
            </Routes>
        </nav>
    );
};