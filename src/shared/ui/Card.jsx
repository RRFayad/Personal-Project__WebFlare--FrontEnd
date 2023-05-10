import React from 'react';

import classes from './Card.module.css';

function Card(props) {
  return (
    <div className={classes.details}>
      <h2 className={classes.details__title}>{props.business.title}</h2>
      <div>
        <img
          src={props.business.imageUrl}
          alt={props.business.title}
          className={classes.details__image}
        />
        <dl className={classes.details__items}>
          <div className={classes.details__item}>
            <dt>Type</dt>
            <dd>{props.business.type}</dd>
          </div>
          <div className={classes.details__item}>
            <dt>Niche</dt>
            <dd>{props.business.niche}</dd>
          </div>
          <div className={classes.details__item}>
            <dt>Age</dt>
            <dd>{props.business.age}</dd>
          </div>
          <div className={classes.details__item}>
            <dt>Monthly Net Profit</dt>
            <dd>{props.business.monthlyProfit}</dd>
          </div>
          <div className={`${classes['details__item--price']}`}>
            <dt>Asking Price</dt>
            <dd>{props.business.askingPrice}</dd>
          </div>
        </dl>
      </div>
      <p>{props.business.description}</p>
      <button type="button">View Details</button>
    </div>
  );
}

export default Card;
