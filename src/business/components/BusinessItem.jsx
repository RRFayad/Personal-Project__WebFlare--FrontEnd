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
  } = props.business;

  const ageContent =
    Number(age) === 1
      ? `${age} year`
      : `${age > 1 ? `${age} years` : '>1 year'}`;

  const typeContent = type.charAt(0).toUpperCase() + type.slice(1);
  const nicheContent = niche.charAt(0).toUpperCase() + niche.slice(1);

  return (
    <li className={classes.details}>
      <h2 className={classes.details__title}>{props.business.title}</h2>
      <div className={classes.details__container}>
        <img src={imageUrl} alt={title} className={classes.details__image} />
        <div className={`${classes.details__info}`}>
          <dl className={classes.details__items}>
            <div className={`${classes.details__item}`}>
              <dt>Type</dt>
              <dd>{typeContent}</dd>
            </div>
            <div className={classes.details__item}>
              <dt>Niche</dt>
              <dd>{nicheContent}</dd>
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
              <dd>$ {monthlyProfit}</dd>
            </div>
            <div className={classes.details__item}>
              <dt>Asking Price</dt>
              <dd className={classes.details__price}>$ {askingPrice}</dd>
            </div>
          </dl>
          <p className={classes.details__description}>{description}</p>
        </div>
      </div>
      <button type="button">View Details</button>
    </li>
  );
}

export default BusinessItem;
