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
  isLoading: false,
  fetchBusiness: () => {},
  fetchOwnerData: () => {},
  getBusinessesByUserId: () => {},
  addNewBusiness: () => {},
  updateBusiness: () => {},
  deleteBusiness: () => {},
  serverDomain: undefined,
});

export function BusinessContextProvider(props) {
  const [isLoading, setIsLoading] = useState(false); // Created this only to show that I am loading in the HomePage
  const [allBusinesses, setAllBusinesses] = useState([]);

  const [filters, dispatch] = useReducer(filtersReducer, filtersInitializer);
  const [homePageBusinessesList, setHomePageBusinessesList] =
    useState(allBusinesses);

  const url = {
    domain: 'http://localhost:5000',
    businesses: `http://localhost:5000/api/businesses/`,
    businessesByUser: `http://localhost:5000/api/businesses/user/`, // :uid
    ownerData: `http://localhost:5000/api/users/business/`, //  :bid
  };

  // Filters Logic (Front End Only)
  useEffect(() => {
    setHomePageBusinessesList(() =>
      homePageFiltersHandler(allBusinesses, filters)
    );
    // console.log(allBusinesses);
  }, [allBusinesses, filters]);

  const fetchBusinesses = async () => {
    setIsLoading(true);
    let response;
    try {
      response = await axios.get(`${url.businesses}`);
      setAllBusinesses(response.data.businesses);
      setIsLoading(false);
    } catch (error) {
      alert(`Error creating user: ${error.response.data.message}`);
      setIsLoading(false);
    }
    return response.data.businesses;
  };

  const addNewBusiness = async (data, ownerId) => {
    const newBusinessData = { ...formHookDataMapper(data), ownerId };
    const formFields = Object.keys(newBusinessData);

    const formData = new FormData();
    formFields.forEach((fieldName) => {
      formData.append(fieldName, newBusinessData[fieldName]);
    });

    let response;
    try {
      response = await axios.post(url.businesses, formData);
      console.log('Business Created Successfully:', response.data.business);
    } catch (error) {
      alert(`Error fetching business: ${error.response.data.message}`);
    }

    await fetchBusinesses();
    return response.data.business;
  };

  const fetchBusiness = async (businessId) => {
    let response;
    try {
      response = await axios.get(`${url.businesses}${businessId}`);
    } catch (error) {
      console.log(`Error creating user: ${error.response.data.message}`);
    }

    return response.data.business;
  };

  const fetchOwnerData = async (businessId) => {
    let response;
    try {
      response = await axios.get(`${url.ownerData}${businessId}`);
    } catch (error) {
      console.log(`Error fetching user: ${error.response.data.message}`);
    }
    return response.data.user;
  };

  const getBusinessesByUserId = async (userId) => {
    let response;
    try {
      response = await axios.get(`${url.businessesByUser}${userId}`);
    } catch (error) {
      console.log(`Error fetching user: ${error.response.data.message}`);
    }
    return response.data.businesses;
  };

  const updateBusiness = async (data, businessId) => {
    const businessData = {
      ...formHookDataMapper(data),
    };

    const formFields = Object.keys(businessData);

    const formData = new FormData();
    formFields.forEach((fieldName) => {
      formData.append(fieldName, businessData[fieldName]);
    });

    let response;
    try {
      response = await axios.patch(
        `http://localhost:5000/api/businesses/${businessId}`,
        formData
      );
      console.log('Business updated:', response.data);
    } catch (error) {
      alert(`Error updating user: ${error.response.data.message}`);
    }
    await fetchBusinesses();
    return response.data.business;
  };

  const deleteBusiness = async (businessId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/businesses/${businessId}`
      );
      console.log('Business Deleted Successfully!');
    } catch (error) {
      alert(`Error updating user: ${error.response.data.message}`);
    }
    await fetchBusinesses();
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
        isLoading,
        addNewBusiness,
        fetchBusiness,
        fetchOwnerData,
        getBusinessesByUserId,
        updateBusiness,
        filterHandler: dispatch,
        deleteBusiness,
        serverDomain: url.domain,
      }}
    >
      {props.children}
    </BusinessContext.Provider>
  );
}

export default BusinessContext;
