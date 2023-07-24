import React, { useContext } from 'react';
import ReactDOM from 'react-dom';

import { useHistory } from 'react-router-dom/cjs/react-router-dom';

import DataContext from '../../../shared/context/BusinessContext';
import AuthContext from '../../../shared/context/AuthContext';
import { formatCurrency } from '../../../shared/util/validators-and-formatters';

import classes from './OfferModal.module.css';

function OfferCard(props) {
  const { isLoggedIn, userData, usersList } = useContext(AuthContext);

  const { businessesList } = useContext(DataContext);
  const history = useHistory();

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
    // Create relation in DB to refacor this logic
    if (business.ownerId === ownerId) {
      ownersBusiness += 1;
    }
  });

  return ReactDOM.createPortal(
    <div className={classes.modal}>
      <header className={classes.modal__header}>
        <h2>{title}</h2>
        {props.onClick && (
          <button type="button" onClick={props.onClick}>
            &times;
          </button>
        )}
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
                  <a href={owner.linkedinUrl} target="_blank" rel="noreferrer">
                    {owner.linkedinUrl}
                  </a>
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
            <div className={classes.modal__price}>
              <h4>Asking Price:</h4>
              <p>{formatCurrency(askingPrice)}</p>
            </div>
          </div>
        </div>
      </main>
      <hr />
      <footer className={classes.modal__footer}>
        {(!isLoggedIn || userData.id !== ownerId) && (
          <>
            <button
              type="button"
              className={classes.modal__button}
              onClick={() => {
                isLoggedIn
                  ? history.push(`${history.location.pathname}/create-offer`)
                  : history.push('/auth');
              }}
            >
              Make Offer
            </button>
            <button
              type="button"
              className={`${classes.modal__button} ${classes['modal__button--cta']}`}
              onClick={() => history.push(`/success/purchase`)}
            >
              Buy it now for {formatCurrency(askingPrice)}
            </button>
          </>
        )}
        {isLoggedIn && userData.id === ownerId && (
          <button
            type="button"
            className={`${classes.modal__button} ${classes['modal__button--cta']}`}
            onClick={() =>
              history.push(
                `/users/${userData.id}/edit-business/${props.business.id}`
              )
            }
          >
            EDIT BUSINESS INFO
          </button>
        )}
      </footer>
    </div>,
    document.querySelector('#modal')
  );
}

export default OfferCard;
