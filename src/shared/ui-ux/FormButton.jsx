import React from 'react';

import classes from './FormButton.module.css';

function FormButton(props) {
  return (
    <button
      type="button"
      className={`${classes.button} ${
        props.caution && classes['button--caution']
      } `}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default FormButton;
