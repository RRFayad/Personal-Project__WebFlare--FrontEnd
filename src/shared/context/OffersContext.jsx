/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';

import { DUMMY_OFFERS } from '../util/data';
import { formHookDataMapper } from '../util/validators-and-formatters';

const OffersContext = React.createContext({
  offersList: [],
  sendOffer: () => {},
  acceptOffer: () => {},
  denyOffer: () => {},
});

export function OffersContextProvider(props) {
  const offersList = DUMMY_OFFERS;

  const sendOffer = (data) => {
    const offerData = formHookDataMapper(data);
    return console.log(offerData);
  };
  const acceptOffer = (offer) => {
    return console.log(offer);
  };
  const denyOffer = (offer) => {
    return console.log(offer);
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
