import React from 'react';

import classes from './LoadingSpinner.module.css';

function LoadingSpinner(props) {
  return (
    <>
      {props.overlay && (
        <div className={`${props.overlay && classes.spinner__overlay}`}>
          <div className={classes.spinner} />
        </div>
      )}

      {!props.overlay && <div className={classes.spinner} />}
    </>
  );
}

export default LoadingSpinner;
