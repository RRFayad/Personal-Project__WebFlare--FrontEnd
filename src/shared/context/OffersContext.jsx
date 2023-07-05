/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';

import { DUMMY_OFFERS } from '../util/data';

const OffersContext = React.createContext({
  offersList: [],
  sendOffer: () => {},
  acceptOffer: () => {},
  denyOffer: () => {},
});

export function OffersContextProvider(props) {
  const offersList = DUMMY_OFFERS;

  const sendOffer = () => {
    return console.log('Offer Sent!');
  };
  const acceptOffer = () => {
    return console.log('Offer Accepted!');
  };
  const denyOffer = () => {
    return console.log('Offer Rejected!');
  };

  return (
    <OffersContext.Provider
      value={{
        offersList,
        sendOffer,
        acceptOffer,
        denyOffer,
      }}
    >
      {props.children}
    </OffersContext.Provider>
  );
}

export default OffersContext;
