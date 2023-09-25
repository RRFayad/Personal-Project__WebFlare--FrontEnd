import React from 'react';

import OfferCard from './OfferCard';

import classes from './OffersList.module.css';

function OffersList(props) {
  return (
    <ul className={classes['offers-list']}>
      {props.offers.map((offer) => (
        <OfferCard
          offer={offer}
          key={offer.id}
          updateOffersHandler={props.updateOffersHandler}
        />
      ))}
    </ul>
  );
}

export default OffersList;
