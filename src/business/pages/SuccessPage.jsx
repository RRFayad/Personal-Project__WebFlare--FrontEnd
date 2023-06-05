import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import classes from './SucessPage.module.css';

function SuccessPage() {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => history.replace('/'), 3000);
  }, []);
  return (
    <main className={classes.container}>
      <div className={classes.card}>
        <div className={classes.circle}>
          <i className={classes.checkmark}>✓</i>
        </div>
        <h1>Success</h1>
        <p>
          Offer sent sucessfully!
          <br /> The owner will be in touch soon!
        </p>
      </div>
    </main>
  );
}

export default SuccessPage;
