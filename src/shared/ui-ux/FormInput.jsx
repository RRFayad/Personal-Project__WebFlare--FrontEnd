import React, { useState, useRef } from 'react';

import classes from './FormInput.module.css';

function FormInput(props) {
  const {
    labelValue, // What I want to show in the label
    HTMLElement, // Which HTML tag I want to return
    content, // The value of the tag
    validation, // Validation method
    type, // input type
    options, // array of options (for <select> <option>)
    placeholder, // placeholder of the input
    name, // will name & id of each input
    errorMessage, // the message to be shown if it's not valid
    onChange, // Created to pass the validity 1 level up
  } = props;

  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const inputRef = useRef(null);

  let element;
  const controlClass = !isValid && isTouched ? 'invalid' : null;

  const changeHandler = () => {
    setIsValid(() => (validation ? validation(inputRef.current.value) : true));
    return onChange && onChange(isValid, name);
  };

  if (HTMLElement === 'input') {
    element = (
      <>
        <label className={classes.label} htmlFor={name}>
          {labelValue}
          <input
            type={type}
            name={name}
            id={name}
            onFocus={() => setIsTouched(false)}
            onBlur={() => setIsTouched(true)}
            onChange={changeHandler}
            ref={inputRef}
            className={`${classes.input} ${classes[controlClass]}`}
            // autoComplete="off" // needed this to solve a bug in the autoComplete vs onChange in the URL
          />
        </label>
        {!isValid && isTouched && (
          <p className={classes['error-message']}>{errorMessage}</p>
        )}
      </>
    );
  }

  if (HTMLElement === 'select') {
    element = (
      <label htmlFor={name} className={classes.label}>
        {labelValue}
        <select name={name} id={name} className={classes.select}>
          {options.map((item) => (
            <option key={item} value="" className={classes.option}>
              {item}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (HTMLElement === 'textarea') {
    element = (
      <>
        <label htmlFor={name} className={classes.label}>
          {labelValue}
          <textarea
            name={name}
            id={name}
            cols={props.cols || 30}
            rows={props.rows || 10}
            onFocus={() => setIsTouched(false)}
            onBlur={() => setIsTouched(true)}
            onChange={changeHandler}
            ref={inputRef}
            className={`${classes.textarea} ${classes[controlClass]}`}
          />
        </label>
        {!isValid && isTouched && (
          <p className={classes['error-message']}>{errorMessage}</p>
        )}
      </>
    );
  }

  return <>{element}</>;
}

export default FormInput;