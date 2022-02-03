import React, {useContext} from "react";
import {LanguageContext} from "../../context/LanguageContext";
import './inputfield.css'


function InputField({labelClassName="formLabel", fieldID, children, inputType = "text", register, inputClassName = "inputFields", inputName, inputValidation, inputPlaceHolder, errors, fieldContainer }) {

    const lang = useContext(LanguageContext)

    return(
        <div className={fieldContainer}>
            <label className={labelClassName} htmlFor={fieldID}>
                {children}
            </label>
            <input
                type={inputType}
                id={fieldID}
                className={inputClassName}
                {...register(inputName, inputValidation)}
                placeholder={lang[inputPlaceHolder]}
            />
            {errors[inputName] && <p className="errors">{errors[inputName].message}</p>}
        </div>
    );
}

export default InputField;