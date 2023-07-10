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

  console.log(offer);
  console.log(business);
  console.log(sender);

  const {
    age,
    askingPrice,
    description,
    id,
    imageUrl,
    monthlyProfit,
    monthlyRevenue,
    niche,
    ownerId,
    title,
    type,
  } = business;

  return (
    // <p>aa</p>
    <div className={classes.card}>
      <header className={classes.card__header}>
        <h2>{title}</h2>
        {props.onClick && (
          <button type="button" onClick={props.onClick}>
            &times;
          </button>
        )}
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
            <p className={classes.card__description}>{sender.description}</p>
            <div className={classes.card__price}>
              <h4>Asking Price:</h4>
              <p>{formatCurrency(askingPrice)}</p>
            </div>
          </div>
        </div>
      </main>
      <hr />
      <footer className={classes.card__footer}>
        <button type="button" className={classes.card__button}>
          Make Offer
        </button>
        <button
          type="button"
          className={`${classes.card__button} ${classes['card__button--cta']}`}
        >
          Buy it now for {formatCurrency(askingPrice)}
        </button>
      </footer>
    </div>
  );
}

export default OfferCard;
