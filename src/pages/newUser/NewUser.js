import React, {useContext, useRef} from "react";
import './newUser.css';
import {Link} from "react-router-dom";
import {useForm} from 'react-hook-form';
import {LanguageContext} from "../../context/LanguageContext";
import InputField from "../../components/inputfield/InputField";
import Loading from "../../components/loading/Loading";
import {UserDataContext} from "../../context/UserDataContext";
import {MediaQueryContext} from "../../context/MediaQueryContext";


function NewUser() {

    const lang = useContext(LanguageContext);
    const userData = useContext(UserDataContext);
    const {isMobile} = useContext(MediaQueryContext);

    const {handleSubmit, formState: {errors}, register, watch} = useForm({mode: 'onBlur'});

    // watch referrer
    const selectedReferrer = watch("foundThrough");

    // check if terms & conditions is being checked
    const termschecked = errors.termsandCo?.type;


    // to check if passwords are the same
    const passwordcheck = useRef();
    passwordcheck.current = watch("newUserPassword", "");

    return (
        <form
            className="outerNewUserBox"
            onSubmit={handleSubmit(userData.onNewUserSubmit)}
            style={isMobile ? {overflowY: "scroll"} : {}}
        >
            <div className="nwUsrBox">
                <InputField fieldID="nuUserName"
                            register={register}
                            inputName="nuUserName"
                            inputValidation={{
                                required: lang.errorUserNameIsObligated,
                                minLength: {
                                    value: 2,
                                    message: lang.errorTwoCharacters,
                                }
                            }}
                            inputPlaceHolder="nuUsernamePlchldr"
                            errors={errors}
                            fieldContainer="fieldContainerLeft"
                >{lang.usrName}</InputField>
                <InputField fieldID="email"
                            register={register}
                            inputName="mailadress"
                            inputValidation={{
                                required: lang.errorEmailOlbi,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: lang.errorEmailwrong,
                                }
                            }}
                            inputPlaceHolder="emailPlchldr"
                            errors={errors}
                            inputType="email"
                            fieldContainer="fieldContainerRight"
                >E-mail:</InputField>
            </div>
            <div className="nwUsrBox">
                <InputField fieldID="nuPassword"
                            register={register}
                            inputType="password"
                            inputName="newUserPassword"
                            inputValidation={{
                                required: lang.errorPwOlbi,
                                minLength: {
                                    value: 6,
                                    message: lang.error6Characters,
                                },
                                pattern: {
                                    value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                                    message: lang.errorweirdcharacters,
                                }
                            }}
                            inputPlaceHolder="pwPlchldr"
                            errors={errors}
                            fieldContainer="fieldContainerLeft"
                >{lang.nuPW}</InputField>
                <InputField fieldID="nuPasswordR"
                            register={register}
                            inputType="password"
                            inputName="newUserPasswordR"
                            inputValidation={{
                                required: lang.nuPWRepeat,
                                validate: value =>
                                    value === passwordcheck.current || lang.pwNoMatch
                            }}
                            inputPlaceHolder="nuPWRepeat"
                            errors={errors}
                            fieldContainer="fieldContainerRight"
                >{lang.nuPWRepeat}</InputField>
            </div>
            <div className="nwUsrBox">
                <div className="fieldContainerLeft">
                     <textarea id="comments"
                               rows="3"
                               cols="40"
                               {...register("comments")}
                               placeholder={lang.commentPlchldr}
                     />
                </div>
                <div className="referrer-container">
                    <label className="labelFound" htmlFor="referrer">
                        {lang.selectLabel}</label>
                    <select id="referrer"
                            {...register("foundThrough")}
                    >
                        <option value="---">---</option>
                        <option value="student">{lang.selectStudent}</option>
                        <option value="option1">{lang.selectOption1}</option>
                        <option value="option2">{lang.selectOption2}</option>
                        <option value="other">{lang.selectOther}</option>
                    </select>

                    <input type="text"
                           className="inputFields other-referrer"
                           {...register("foundThroughOther")}
                           style={selectedReferrer !== "other" ? {height: "0", transform: "scale(0)"} : {
                               height: "3rem",
                               transform: "scale(1)"
                           }}
                           placeholder={lang.selectOtherPlchldr}
                    />
                </div>
            </div>
            {userData.error && <p className="errorRegisterFailed">{lang.registerFailed}</p>}
            {userData.loading && <Loading loadingArea="loadingnewuser"/>}
            <div className="nwUsrBox">
                <div className="checkboxContainer">
                    <label className="newsLetterLabel" htmlFor="newsletter">
                        <input
                            type="checkbox"
                            className="checkbox"
                            id="newsletter"
                            {...register("nwsLtr"
                            )}
                        />
                        <span className="checkmark"/>
                        <div>{lang.newsletter}</div>
                    </label>
                    <label className="termsConditionsLabel" htmlFor="termsConditions">
                        <input
                            type="checkbox"
                            className="checkbox"
                            id="termsConditions"
                            {...register("termsandCo", {
                                required: true,
                            })}
                        />
                        <span className="checkmark"/>
                        {termschecked === "required" ?
                            <div className="errortermsandCo">{lang.termsCheck1}<Link className="ErrorRemoveTD"
                                                                                     to={lang.routePathTerms}>{lang.termsCheck2}</Link>
                            </div>
                            : <div>{lang.termsCheck1}<Link className="removeTD"
                                                           to={lang.routePathTerms}>{lang.termsCheck2}</Link></div>
                        }
                    </label>
                </div>
                <div className="register-buttons-container">
                    <button className="registerSubmitBtn" type="submit" disabled={userData.loading}
                            onClick={userData.resetBorderRadius}/>
                    <Link to='/'
                          className="newUserBackButton"
                          onClick={userData.resetBorderRadius}
                    />
                </div>
            </div>
        </form>
    );

}

export default NewUser;