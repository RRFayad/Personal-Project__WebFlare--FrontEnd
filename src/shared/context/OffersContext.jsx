/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, useCallback, useEffect } from 'react';

import { DUMMY_OFFERS } from '../util/data';
import { formHookDataMapper } from '../util/validators-and-formatters';

const OffersContext = React.createContext({
  offersList: [],
  sendOffer: () => {},
  acceptOffer: () => {},
  denyOffer: () => {},
});

export function OffersContextProvider(props) {
  // const offersList = DUMMY_OFFERS;
  const [offersList, setOffersList] = useState([]);

  const url = {
    offersDB: `https://webflare-523f0-default-rtdb.firebaseio.com/offers`,
  };

  const fetchOffers = useCallback(async () => {
    const response = await fetch(`${url.offersDB}.json`);
    const fetchedData = (await response.json()) || {};
    if (response.ok) {
      return setOffersList(Object.values(fetchedData));
      // return setAllBusinesses(DUMMY_BUSINESSES);
    }
    return alert(response.message);
  }, []);

  useEffect(() => {
    fetchOffers();
  }, []);

  const sendOffer = async (data, senderId, businessId) => {
    // const offerData = formHookDataMapper(data);

    const offerData = {
      ...formHookDataMapper(data),
      id: new Date().getTime().toString(),
      sender: senderId,
      businessId,
      status: 'active',
    };

    const response = await fetch(`${url.offersDB}/${offerData.id}.json`, {
      method: 'PUT',
      body: JSON.stringify(offerData),
    });

    if (response.ok) {
      fetchOffers();
      return console.log('Offer Sent Successfully');
    }

    return alert(response.message);
  };

  const acceptOffer = (offer) => {
    return console.log(offer);
  };
  const denyOffer = async (offer) => {
    const response = await fetch(`${url.offersDB}/${offer.id}.json`, {
      method: 'DELETE',
    });
    if (response.ok) {
      setOffersList((prevState) => {
        return prevState.filter((item) => item.id !== offer.id);
      });
      // await fetchOffers();
      return console.log('Offer Denied Successfully');
    }
    return alert('aaa');
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
