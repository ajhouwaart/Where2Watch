import React, {useContext} from "react";
import './login.css';
import {Link} from "react-router-dom";
import {useForm} from 'react-hook-form';
import {LanguageContext} from "../../context/LanguageContext";
import {UserDataContext} from "../../context/UserDataContext";
import InputField from "../../components/inputfield/InputField";
import {MediaQueryContext} from "../../context/MediaQueryContext";


function Login() {

    const lang = useContext(LanguageContext);
    const userData = useContext(UserDataContext);
    const {isMobile} = useContext(MediaQueryContext);

    const {handleSubmit, formState: {errors}, register} = useForm({mode: 'onBlur'});


    return (
        <form className="loginScreen"
              onSubmit={handleSubmit(userData.onLoginSubmit)}
              style={isMobile ? {top: "100%", borderRadius: "0 0 2rem 2rem"} : {top: "0", borderRadius: "0 0 2rem 0"}}
        >
            <div className="loginscreenContainer">
                <InputField fieldID="emailField"
                            inputType="email"
                            register={register}
                            inputName="email"
                            inputValidation=""
                            inputPlaceHolder="loginEmailPlchldr"
                            errors={errors}
                            fieldContainer="fieldContainerLeft"
                >E-mail:</InputField>
                <InputField fieldID="password"
                            labelValue="passWordLang"
                            register={register}
                            inputName="password"
                            inputValidation=""
                            inputType="password"
                            inputPlaceHolder="pwPlcLang"
                            errors={errors}
                            fieldContainer="fieldContainerRight"
                >{lang.passWordLang}</InputField>
            </div>
            {userData.error && <p className="errorlogin">{lang.errorLogin}</p>}
            <div className="loginscreenContainerbutton">
                <button disabled={userData.loading} type="submit" className="submitLoginButton">log-in</button>
                <Link to={lang.routePathNewUsr} className="registerButton">{lang.newUserLang}</Link>
            </div>
        </form>
    );
}

export default Login;