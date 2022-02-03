import React, {createContext, useContext, useState} from "react";
import {MediaQueryContext} from "./MediaQueryContext";

export const LanguageContext = createContext({});

function LanguageContextProvider({ children }) {

    const [language, toggleLanguage] = useState(false);

    const {isMobile} = useContext(MediaQueryContext);

    let lang = {};

    const handleLanguagesSwitch = () => {
        toggleLanguage(!language);
        document.documentElement.style.setProperty("--border-radius-menu", "0 0 2rem 2rem");

        if (!isMobile) {
            document.documentElement.style.setProperty("--border-radius-searchbutton", "0 3rem 3rem 0");
        }
    };

    // english
    if (language === true) {
        lang = {
            themesLang: "themes",
            themespresets: "presets:",
            themesrandom: "random:",
            themestextcolor: "text color",
            themessaturation: "saturation",
            themeslightness: "lightness",
            themeslogin: "to fully customize themes or to get a random color.",
            themesSaveMessage: "this theme wil be active whenever you log in",
            about: "about",
            termsLang: "terms",
            termsAndConditionsLang: "terms & conditions",
            whyLoginLang: "why Log-in?",
            byLoginLang: "By Logging-in you can see on wich streaming-service your search is available.",
            forExampleLang: "Also, you can search by country if you are behind a VPN.",
            learnMoreLang: "learn more about VPN's",
            logout: "log out",
            userNameLang: "Username:",
            passWordLang: "Password:",
            loginErrorMail: "E-mail is incorrect",
            commentPlchldr: "any comments?...",
            pwErrorLang: "Password is incorrect",
            pwPlcLang: "fill in your password",
            newUserLang: "new user ? - Register",
            errorLogin: "e-mail and/or password are incorrect",
            errorTwoCharacters: "use more than 2 characters please",
            error6Characters: "use more than 6 characters please",
            errorweirdcharacters: "password must contain at least: 1 lowercase letter, 1 uppercase letter,1 number and 1 special symbol",
            loginEmailPlchldr: "fill in your e-mail",
            errorEmailOlbi: "e-mail is obligated",
            errorEmailwrong: "in an e-mail adress has to be a @ and you can't use comma's",
            emailPlchldr: "type your e-mail here...",
            usrName: "Username:",
            errorUserNameIsObligated: "username is obligated",
            nuUsernamePlchldr: "pick a username",
            nuPW: "Password:",
            nuPWRepeat: "Repeat password:",
            errorPwOlbi: "password is obligated",
            pwPlchldr: "pick a password...",
            pwNoMatch: "Passwords do not match",
            registerSucces: "Succesfully registered!",
            registerFailed: "e-mail already in use",
            typewhatyouarelookingfor: "type what you are looking for",
            availableOn: "Available on:",
            nofurtherinfo: "This movie/show is not available in the selected country, try to search from another country",
            newsletter: "register for newsletter",
            termsCheck1: "I agree with the ",
            termsCheck2: "terms & conditions",
            account: "welcome back ",
            accountQuote: "random movie-quote: ",
            change: "change",
            clickArrows: "click the arrows to change avatar type.",
            clickHere: "here",
            typeSomething: "or type something yourself",
            pickRandom: "to pick a random avatar",
            save: "save",
            cancel: "cancel",
            searchCountry: "search from which country ?   : ",
            langSearch: "en",
            langNoResults: "There are no results for this title, did u check the spelling?",
            langSeeMoreInfo: "see more info",
            langTrailer: "watch trailer",
            langRuntime: "runtime",
            langW2W: `log in to check "where 2 watch"`,
            noImage: "Sadly there is no image available...",
            langNumberOfResults1: "there are ",
            langNumberOfResults2: " results.",
            langPrevious: "previous",
            langNext: "next",
            errorMessage: "something went wrong, check spelling and try again please",
            selectLabel: "How did you find us?",
            selectStudent: "A student gave me this",
            selectOption1: "see above 😅",
            selectOption2: "see 2 above...",
            selectOther: "other",
            selectOtherPlchldr: "are you sure?...🤣",
            goodMorning: "Good morning ",
            goodAfternoon: "Good afternoon ",
            goodEvening: "Good evening ",
            goodNight: "Good night ",
            routePathThemes: '/themes',
            routePathAbout: '/about',
            routePathTerms: '/terms-and-conditions',
            routePathWhy: '/why-log-in',
            routePathLogin: '/log-in',
            routePathNewUsr: '/new-user',
            routePathAccount: '/my-account',
            handleLanguagesSwitch: handleLanguagesSwitch,
            wichLanguage: language
        };
    }

    // dutch
    if (language === false) {
        lang = {
            themesLang: "thema's",
            themespresets: "voor-instellingen:",
            themesrandom: "willekeurig:",
            themestextcolor: "tekst kleur",
            themessaturation: "verzadiging",
            themeslightness: "lichtheid",
            themeslogin: "om de volledige controle te krijgen over het thema. Ook kun je voor een willekeurige kleur kiezen.",
            themesSaveMessage: "dit thema wordt actief zodra je inlogt",
            about: "info",
            termsLang: "alg.vrwdn",
            termsAndConditionsLang: "algemene voorwaarden",
            whyLoginLang: "waarom inloggen?",
            byLoginLang: "Door in te loggen kun je zien bij welke streaming-dienst(en) je zoekopdracht te zien is.",
            forExampleLang: "Ook kun je vanuit een ander land zoeken als je een VPN gebruikt.",
            learnMoreLang: "Leer meer over VPN's",
            logout: "log uit",
            userNameLang: "Gebruikersnaam:",
            passWordLang: "Wachtwoord:",
            loginErrorMail: "E-mail is incorrect",
            commentPlchldr: "enige opmerkingen?...",
            pwErrorLang: "wachtwoord is incorrect",
            pwPlcLang: "vul je wachtwoord in",
            newUserLang: "nieuw ? - Registreer",
            errorLogin: "e-mail en/of wachtwoord zijn onjuist",
            errorTwoCharacters: "gebruik meer dan 2 characters alstublieft",
            error6Characters: "gebruik meer dan 6 characters alstublieft",
            errorweirdcharacters: "wachtwoord moet minimaal bestaan uit: 1 kleine letter, 1 hoofdletter, 1 cijfer en 1 speciaal symbool",
            loginEmailPlchldr: "vul je e-mailadres in",
            errorEmailOlbi: "e-mail is verplicht",
            errorEmailwrong: "in een E-mail adres moet een @ staan en mag géén komma's bevatten",
            emailPlchldr: "type hier je e-mail...",
            usrName: "Gebruikersnaam:",
            errorUserNameIsObligated: "gebruikersnaam is verplicht",
            nuUsernamePlchldr: "kies een gebruikersnaam...",
            nuPW: "Wachtwoord:",
            nuPWRepeat: "Herhaal wachtwoord:",
            errorPwOlbi: "wachtwoord is verplicht",
            pwPlchldr: "kies een wachtwoord...",
            pwNoMatch: "wachtwoorden komen niet overeen",
            registerSucces: "Registratie succesvol!",
            registerFailed: "e-mail bestaat al",
            typewhatyouarelookingfor: "type wat je wilt zoeken",
            availableOn: "Te zien op:",
            nofurtherinfo: "Helaas is deze film/serie niet te zien in het gekozen land, probeer het vanuit een ander land",
            newsletter: "ontvang onze nieuwsbrief",
            termsCheck1: "Ik ga akkoord met de ",
            termsCheck2: "algemene voorwaarden",
            account: "welkom terug ",
            accountQuote: "willekeurige film-quote: ",
            change: "verander",
            clickArrows: "click de pijlen om avatar type te veranderen.",
            clickHere: "hier",
            typeSomething: "of type zelf iets",
            pickRandom: "om een avatar te kiezen",
            save: "sla op",
            cancel: "terug",
            searchCountry: "zoeken vanuit welk land ?   : ",
            langSearch: "nl",
            langNoResults: "Er zijn helaas geen resultaten gevonden voor deze titel, heeft u de spelling gecheckt?",
            langSeeMoreInfo: "meer info",
            langTrailer: "bekijk trailer",
            langRuntime: "speeltijd",
            langW2W: "log in om te zien waar dit te zien is",
            noImage: "Helaas er is geen afbeelding beschikbaar...",
            langNumberOfResults1: "er zijn ",
            langNumberOfResults2: " resultaten.",
            langPrevious: "vorige",
            langNext: "volgende",
            errorMessage: "Er ging iets mis, check de spelling en probeer opnieuw aub",
            selectLabel: "Hoe ben je hier terecht gekomen?",
            selectStudent: "Een student gaf me dit",
            selectOption1: "zie boven 😅",
            selectOption2: "zie 2 boven...",
            selectOther: "anders",
            selectOtherPlchldr: "zeker weten?...🤣",
            goodMorning: "Goedemorgen  ",
            goodAfternoon: "Goedemiddag ",
            goodEvening: "Goedenavond ",
            goodNight: "Goedenacht ",
            routePathThemes: '/themas',
            routePathAbout: '/info',
            routePathTerms: '/algemene-voorwaarden',
            routePathWhy: '/waarom-inloggen',
            routePathLogin: '/inloggen',
            routePathNewUsr: '/nieuwe-gebruiker',
            routePathAccount: '/mijn-account',
            handleLanguagesSwitch: handleLanguagesSwitch,
            wichLanguage: language
        };
    }

    return (
        <LanguageContext.Provider value={lang}>
            {children}
        </LanguageContext.Provider>
    );
}

export default LanguageContextProvider;