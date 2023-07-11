import React, { useContext } from 'react';

import BusinessContext from '../../shared/context/BusinessContext';
import AuthContext from '../../shared/context/AuthContext';
import { formatCurrency } from '../../shared/util/validators-and-formatters';

import classes from './OfferCard.module.css';

function OfferCard(props) {
  const { offer } = props;
  const senderId = offer.sender;

  const sender = useContext(AuthContext).usersList.find(
    (user) => user.id === senderId
  );

  const business = useContext(BusinessContext).allBusinesses.find(
    (b) => b.id === offer.businessId
  );

  console.log('offer: ', offer);
  console.log('business: ', business);
  console.log('sender: ', sender);

  return (
    // <p>aa</p>
    <li className={classes.card}>
      <header className={classes.card__header}>
        <h2>{business.title}</h2>
      </header>
      <main className={classes.card__content}>
        <div className={classes['card__user-info']}>
          <img src={sender.imageUrl} alt={sender.name} />
          <div className={classes.card__container}>
            <dl className={classes.card__items}>
              <div className={classes.card__item}>
                <dt>Sender:</dt>
                <dd>{sender.name}</dd>
              </div>
              <div className={classes.card__item}>
                <dt>Linkedin:</dt>
                <dd>
                  <a href={sender.linkedinUrl}>{sender.linkedinUrl}</a>
                </dd>
              </div>
              <div className={classes.card__item}>
                <dt>Country:</dt>
                <dd>{sender.country}</dd>
              </div>
            </dl>
            <p className={classes.card__description}>{offer.message}</p>
            <div className={classes.card__price}>
              <h4>Offered Price:</h4>
              <p className={classes['card__price--original-value']}>
                {formatCurrency(business.askingPrice)}
              </p>
              <p className={classes['card__price--offered-value']}>
                {formatCurrency(offer.offerValue)}
              </p>
            </div>
          </div>
        </div>
      </main>
      <hr />
      <footer className={classes.card__footer}>
        <button type="button" className={classes.card__button}>
          Deny Offer
        </button>
        <button
          type="button"
          className={`${classes.card__button} ${classes['card__button--cta']}`}
        >
          Accept Offer
        </button>
      </footer>
    </li>
  );
}

export default OfferCard;
