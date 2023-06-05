import React, { useState, useRef, useEffect } from 'react';

import classes from './FormInput.module.css';

function FormInput(props) {
  const {
    labelValue, // What I want to show in the label
    HTMLElement, // Which HTML tag I want to return
    content, // Content's value (inside the tag)
    validation, // Validation method
    type, // input type
    options, // array of options (for <select> <option>)
    placeholder, // input's placeholder
    name, // will be the name & id of each input
    errorMessage, // the message to be shown if it's not valid
    onValidationChange, // Created to pass the validity 1 level up
    formatter,
  } = props;

  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const inputRef = useRef(null);

  let element;
  const controlClass = !isValid && isTouched ? 'invalid' : null;

  // Without the useEffect it would pass the 'delayed' state (as useEffect will work when componentDidUpdate, and without it, before the component update)
  useEffect(
    () => onValidationChange && onValidationChange(isValid, name),
    [isValid]
  );

  const changeHandler = () => {
    setIsValid(() => (validation ? validation(inputRef.current.value) : true));
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
