/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

import { formHookDataMapper } from '../util/validators-and-formatters';

const OffersContext = React.createContext({
  fetchOffer: () => {},
  fetchUserOffers: () => {},
  sendOffer: () => {},
  acceptOffer: () => {},
  denyOffer: () => {},
});

export function OffersContextProvider(props) {
  const fetchOffer = async (offerId) => {
    let response;
    try {
      response = await axios.get(`http://localhost:5000/api/offers/${offerId}`);
    } catch (error) {
      console.log(`Error fetching offer: ${error.response.data.message}`);
    }

    return response.data.offer;
  };

  const fetchUserOffers = async (userId) => {
    let response;
    try {
      response = await axios.get(
        `http://localhost:5000/api/offers/user/${userId}`
      );
    } catch (error) {
      console.log(`Error fetching offer: ${error.response.data.message}`);
    }
    return response.data.offers;
  };

  const sendOffer = async (data, token, businessId) => {
    const offerData = {
      ...formHookDataMapper(data),
      businessId,
    };

    let response;
    try {
      response = await axios.post(
        `http://localhost:5000/api/offers/`,
        offerData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Offer Created Successfully');
    } catch (error) {
      alert(`Error creating offer: ${error.response.data.message}`);
    }
    return response.data.offer;
  };

  const acceptOffer = async (offerId, token) => {
    let response;
    try {
      response = await axios.patch(
        `http://localhost:5000/api/offers/${offerId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(`Error Updateing Offer: ${error.response.data.message}`);
    }
    return response.data.offer;
  };
  const denyOffer = async (offerId, token) => {
    let response;
    try {
      response = await axios.delete(
        `http://localhost:5000/api/offers/${offerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Offer Denied (and Deleted) Successfully');
    } catch (error) {
      console.log(`Error Updateing Offer: ${error.response.data.message}`);
    }
    return response.data.message;
  };

  return (
    <OffersContext.Provider
      value={{
        fetchOffer,
        fetchUserOffers,
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
