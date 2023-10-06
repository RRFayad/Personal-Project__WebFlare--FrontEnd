import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

import AuthContext from '../../../shared/context/AuthContext';
import BusinessContext from '../../../shared/context/BusinessContext';
import { formatCurrency } from '../../../shared/util/validators-and-formatters';
import Backdrop from '../../../shared/ui-ux/Backdrop';
import ConfirmModal from '../../../users/components/ConfirmModal';
import classes from './BusinessItemCard.module.css';

function BusinessItemCard(props) {
  const [deleteModalIsShown, setDeleteModalIsShown] = useState(false);
  const history = useHistory();
  const path = history.location.pathname;

  const { serverDomain } = useContext(BusinessContext);
  const { userData } = useContext(AuthContext);

  const {
    age,
    askingPrice,
    description,
    image,
    monthlyProfit,
    monthlyRevenue,
    niche,
    owner,
    title,
    type,
    id,
  } = props.business;

  const ageContent =
    Number(age) === 1
      ? `${age} year`
      : `${age > 1 ? `${age} years` : '>1 year'}`;

  return (
    <>
      {deleteModalIsShown && (
        <>
          <Backdrop onClick={() => setDeleteModalIsShown(false)} />
          <ConfirmModal
            business={props.business}
            onClick={() => setDeleteModalIsShown(false)}
          />
        </>
      )}
      <li className={classes.details}>
        <div className={classes.details__container}>
          <div className={classes['details__image-container']}>
            <img
              src={`${serverDomain}/${image}`}
              alt={title}
              className={classes.details__image}
            />
          </div>
          <div className={`${classes.details__info}`}>
            <h2 className={classes.details__title}>{props.business.title}</h2>
            <dl className={classes.details__items}>
              <div className={`${classes.details__item}`}>
                <dt>Type</dt>
                <dd>{type}</dd>
              </div>
              <div className={classes.details__item}>
                <dt>Niche</dt>
                <dd>{niche}</dd>
              </div>
              <div
                className={`${classes.details__item} ${classes['details__item--optional']}`}
              >
                <dt>Age</dt>
                <dd>{ageContent}</dd>
              </div>
              <div
                className={`${classes.details__item} ${classes['details__item--optional']}`}
              >
                <dt>Monthly Net Profit</dt>
                <dd>{formatCurrency(monthlyProfit)}</dd>
              </div>
              <div className={classes.details__item}>
                <dt>Asking Price</dt>
                <dd className={classes.details__price}>
                  {formatCurrency(askingPrice)}
                </dd>
              </div>
            </dl>
            <p className={classes.details__description}>{description}</p>
          </div>
        </div>
        {path.slice(-8) === '/profile' ? (
          <>
            <button
              className={`${classes['details__button--delete']} ${classes.details__button}`}
              type="button"
              onClick={() => setDeleteModalIsShown(true)}
            >
              Delete Business
            </button>
            <button
              className={classes.details__button}
              type="button"
              onClick={() =>
                history.push(`/users/${userData.id}/edit-business/${id}`)
              }
            >
              Edit Business
            </button>
          </>
        ) : (
          <button
            className={classes.details__button}
            type="button"
            onClick={() => history.push(`/business/${id}`)}
          >
            View Details
          </button>
        )}
      </li>
    </>
  );
}

export default BusinessItemCard;
