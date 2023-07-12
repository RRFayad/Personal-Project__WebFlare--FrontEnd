import React, { useContext } from 'react';

import BusinessContext from '../../shared/context/BusinessContext';
import AuthContext from '../../shared/context/AuthContext';
import { formatCurrency } from '../../shared/util/validators-and-formatters';

import classes from './OfferCard.module.css';

function OfferCard(props) {
  const { offer } = props;

  const userId = useContext(AuthContext).userData.id;

  const business = useContext(BusinessContext).allBusinesses.find(
    (b) => b.id === offer.businessId
  );

  const senderId = offer.sender;

  const offerSender = useContext(AuthContext).usersList.find(
    (user) => user.id === senderId
  );

  const offerReceiver = useContext(AuthContext).usersList.find(
    (user) => user.id === business.ownerId
  );

  const stakeholder = userId === offerSender.id ? offerReceiver : offerSender;

  // console.log(stakeholder);

  // console.log('offer: ', offer);
  // console.log('business: ', business);
  // console.log('sender: ', sender);

  // console.log(senderId);

  return (
    // <p>aa</p>
    <li className={classes.card} key={offer.id}>
      <header className={classes.card__header}>
        <h2>{business.title}</h2>
      </header>
      <main className={classes.card__content}>
        <div className={classes['card__user-info']}>
          <img src={stakeholder.imageUrl} alt={stakeholder.name} />
          <div className={classes.card__container}>
            <dl className={classes.card__items}>
              <div className={classes.card__item}>
                <dt>{userId !== senderId ? 'Sender:' : 'Sent to:'}</dt>
                <dd>{stakeholder.name}</dd>
              </div>
              <div className={classes.card__item}>
                <dt>Linkedin:</dt>
                <dd>
                  <a
                    href={stakeholder.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {stakeholder.linkedinUrl}
                  </a>
                </dd>
              </div>
              <div className={classes.card__item}>
                <dt>Country:</dt>
                <dd>{stakeholder.country}</dd>
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
        {userId !== senderId && (
          <>
            <button type="button" className={classes.card__button}>
              Deny Offer
            </button>
            <button
              type="button"
              className={`${classes.card__button} ${classes['card__button--cta']}`}
            >
              Accept Offer
            </button>
          </>
        )}

        {userId === senderId && (
          <button
            type="button"
            className={`${classes.card__button} ${classes['card__button--cta']}`}
          >
            View Business Details
          </button>
        )}
      </footer>
    </li>
  );
}

export default OfferCard;
