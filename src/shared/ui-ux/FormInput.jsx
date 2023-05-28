import React, { useState } from 'react';

// onBlur, onFocus, onChange

function FormInput(props) {
  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  let element;

  const {
    labelValue,
    HTMLElement,
    content,
    validation,
    type,
    options,
    placeholder,
    name,
  } = props;

  if (HTMLElement === 'input') {
    element = (
      <label htmlFor={name}>
        {labelValue}
        <input type={type} name={name} id={name} />
      </label>
    );
  }

  if (HTMLElement === 'select') {
    element = (
      <label htmlFor={name}>
        {labelValue}
        <select name={name} id={name}>
          {options.map((item) => (
            <option key={item} value="">
              {item}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (HTMLElement === 'textarea') {
    element = (
      <label htmlFor={name}>
        {labelValue}
        <textarea
          name={name}
          id={name}
          cols={props.cols || 30}
          rows={props.rows || 10}
        />
      </label>
    );
  }

  return element;
}

export default FormInput;
