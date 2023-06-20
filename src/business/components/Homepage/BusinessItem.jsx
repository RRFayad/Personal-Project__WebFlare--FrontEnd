import React from 'react';

import classes from './BusinessItem.module.css';

function BusinessItem(props) {
  const {
    age,
    askingPrice,
    description,
    imageUrl,
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
    <li className={classes.details}>
      <div className={classes.details__container}>
        <div className={classes['details__image-container']}>
          <img src={imageUrl} alt={title} className={classes.details__image} />
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
              <dd>{props.formatCurrency(monthlyProfit)}</dd>
            </div>
            <div className={classes.details__item}>
              <dt>Asking Price</dt>
              <dd className={classes.details__price}>
                {props.formatCurrency(askingPrice)}
              </dd>
            </div>
          </dl>
          <p className={classes.details__description}>{description}</p>
        </div>
      </div>
      <button type="button">
        <a href={`/business/${id}`}>View Details</a>
      </button>
    </li>
  );
}

export default BusinessItem;
