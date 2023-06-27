/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import ReactDOM from 'react-dom';

import classes from './Backdrop.module.css';

function Backdrop(props) {
  return ReactDOM.createPortal(
    <div className={classes.backdrop} onClick={props.onClick} />,
    document.querySelector('#backdrop')
  );
}

export default Backdrop;
