import React, { useState, useRef, useEffect } from 'react';

import classes from './FormInput.module.css';

function FormInput(props) {
  const {
    labelValue, // What I want to show in the label
    HTMLElement, // Which HTML tag I want to return
    validation, // Validation method
    type, // input type
    options, // array of options (for <select> <option>)
    placeholder, // input's placeholder
    name, // will be the name & id of each input
    errorMessage, // the message to be shown if it's not valid
    onInputChange, // Created to pass the validity and data 1 level up
    defaultValue,
  } = props;

  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const inputRef = useRef(null);

  let element;
  const controlClass = !isValid && isTouched ? 'invalid' : null;

  useEffect(() => {
    // For editing forms, they will start with their validity as true
    if (defaultValue) {
      setIsValid(true);
    }
  }, []);

  // This useEffect exists for passing the updated validity state (as useEffect will work when componentDidUpdate, and without it, before the component update)
  useEffect(() => {
    const value =
      type === 'number'
        ? Number(inputRef.current.value)
        : inputRef.current.value;
    onInputChange(name, isValid, value);
  }, [isValid]);

  const changeHandler = (e) => {
    const value = type === 'number' ? Number(e.target.value) : e.target.value;
    setIsValid(() => (validation ? validation(inputRef.current.value) : true));
    onInputChange(name, isValid, value);
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
            placeholder={placeholder}
            defaultValue={defaultValue}
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
      <>
        <label htmlFor={name} className={classes.label}>
          {labelValue}
          <select
            name={name}
            id={name}
            className={`${classes.select} ${classes[controlClass]}`}
            ref={inputRef}
            onFocus={() => setIsTouched(false)}
            onBlur={() => setIsTouched(true)}
            onChange={changeHandler}
            defaultValue={defaultValue}
          >
            <option hidden>Select an option</option>
            {options.map((item) => (
              <option key={item} className={classes.option}>
                {item}
              </option>
            ))}
          </select>
        </label>
        {!isValid && isTouched && (
          <p className={classes['error-message']}>{errorMessage}</p>
        )}
      </>
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
            defaultValue={defaultValue}
            placeholder={placeholder}
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
