import React from 'react';

import OfferCard from './OfferCard';

import classes from './OffersList.module.css';

function OffersList(props) {
  return (
    <ul className={classes['offers-list']}>
      {props.offers.map((offer) => (
        <OfferCard offer={offer} key={offer.id} />
      ))}
    </ul>
  );
}

export default OffersList;
