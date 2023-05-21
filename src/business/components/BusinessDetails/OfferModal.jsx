import React, { useContext } from 'react';

import DataContext from '../../../shared/context/DummyDataContext';
import classes from './OfferModal.module.css';

function OfferModal(props) {
  const { businessesList, usersList, formatCurrency } = useContext(DataContext);

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
  } = props.business;

  const owner = usersList.find((user) => user.id === ownerId);
  let ownersBusiness = 0;

  businessesList.forEach((business) => {
    if (business.ownerId === ownerId) {
      ownersBusiness += 1;
    }
  });
  console.log(owner);

  return (
    <div className={classes.modal}>
      <header className={classes.modal__header}>
        <h2>{title}</h2>
      </header>
      <main className={classes.modal__content}>
        <div className={classes['modal__user-info']}>
          <img src={owner.imageUrl} alt={owner.name} />
          <div className={classes.modal__container}>
            <dl className={classes.modal__items}>
              <div className={classes.modal__item}>
                <dt>Owner:</dt>
                <dd>{owner.name}</dd>
              </div>
              <div className={classes.modal__item}>
                <dt>Linkedin:</dt>
                <dd>
                  <a href={owner.linkedinUrl}>{owner.linkedinUrl}</a>
                </dd>
              </div>
              <div className={classes.modal__item}>
                <dt>Country:</dt>
                <dd>{owner.country}</dd>
              </div>
              <div className={classes.modal__item}>
                <dt>Active Businesses:</dt>
                <dd>{ownersBusiness}</dd>
              </div>
            </dl>
            <p className={classes.modal__description}>{owner.description}</p>
          </div>
        </div>
        <div className={classes['modal__business-info']}>Business</div>
      </main>
      <footer className={classes.modal__footer}>
        <button type="button">Make Offer Now</button>
        <button type="button">Close</button>
      </footer>
    </div>
  );
}

export default OfferModal;
