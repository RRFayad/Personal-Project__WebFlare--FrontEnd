import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import classes from './SucessPage.module.css';

function SuccessPage(props) {
  const successEvent = useParams();
  const history = useHistory();

  const [message, setMessage] = useState('');

  useEffect(() => {
    setTimeout(() => history.push('/'), 5000);
    if (successEvent.event === 'offer-sent') {
      setMessage('Offer sent sucessfully! The owner will be in touch soon!');
    }
    if (successEvent.event === 'purchase') {
      setMessage(
        'Congratulations on your new acquisition! Our team will get in touch soon!'
      );
    }
  }, []);
  return (
    <main className={classes.container}>
      <div className={classes.card}>
        <div className={classes.circle}>
          <i className={classes.checkmark}>✓</i>
        </div>
        <h1>Success</h1>
        <p>{message}</p>
      </div>
    </main>
  );
}

export default SuccessPage;
