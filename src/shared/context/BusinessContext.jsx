/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import axios from 'axios';

import {
  filtersInitializer,
  filtersReducer,
  homePageFiltersHandler,
} from './business-filters-reducer';
import { businessTypesOptions, nichesOptions } from '../util/parameters';
import { formHookDataMapper } from '../util/validators-and-formatters';

const BusinessContext = React.createContext({
  // business parameters
  businessTypesOptions: [],
  nichesOptions: [],

  // business data
  allBusinesses: [],
  homePageBusinessesList: [],
  fetchBusiness: () => {},
  addNewBusiness: () => {},
  updateBusiness: () => {},
  deleteBusiness: () => {},
});

export function BusinessContextProvider(props) {
  const [allBusinesses, setAllBusinesses] = useState([]);
  const [filters, dispatch] = useReducer(filtersReducer, filtersInitializer);
  const [homePageBusinessesList, setHomePageBusinessesList] =
    useState(allBusinesses);

  const url = {
    businesses: `http://localhost:5000/api/businesses/`,
    businessesByUser: `http://localhost:5000/api/user/`, // :uid
  };

  // Filters Logic (Front End Only)
  useEffect(() => {
    setHomePageBusinessesList(() =>
      homePageFiltersHandler(allBusinesses, filters)
    );
  }, [allBusinesses, filters]);

  const addNewBusiness = async (data, ownerId) => {
    const newBusinessData = formHookDataMapper(data);

    try {
      const response = await axios.post(url.businesses, newBusinessData);
      console.log('Business Created Successfully:', response.data.business);
    } catch (error) {
      alert(`Error fetching business: ${error.response.data.message}`);
    }
  };

  const fetchBusinesses = async () => {
    let response;
    try {
      response = await axios.get(`${url.businesses}`);
      setAllBusinesses(response.data.businesses);
    } catch (error) {
      alert(`Error creating user: ${error.response.data.message}`);
    }
    return response.data;
  };

  const fetchBusiness = async (businessId) => {
    let response;
    try {
      response = await axios.get(`${url.businesses}/${businessId}`);
    } catch (error) {
      return `Error creating user: ${error.response.data.message}`;
    }
    return response.data.business;
  };

  const updateBusiness = async (data, businessId) => {
    const businessData = {
      ...formHookDataMapper(data),
    };

    try {
      const response = await axios.patch(
        `${url.businesses}/${businessId}`,
        businessData
      );
      console.log('Business updated:', response.data);
    } catch (error) {
      alert(`Error updating user: ${error.response.data.message}`);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  return (
    <BusinessContext.Provider
      value={{
        // business parameters
        businessTypesOptions,
        nichesOptions,

        // business data
        allBusinesses,
        businessesList: homePageBusinessesList,
        addNewBusiness,
        fetchBusiness,
        updateBusiness,
        filterHandler: dispatch,
        // deleteBusiness,
      }}
    >
      {props.children}
    </BusinessContext.Provider>
  );
}

export default BusinessContext;
