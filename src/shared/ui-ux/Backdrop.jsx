/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import classes from './Backdrop.module.css';

function Backdrop(props) {
  return <div className={classes.backdrop} onClick={props.onClick} />;
}

export default Backdrop;
