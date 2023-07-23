/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useCallback, useEffect, useReducer, useState } from 'react';

import { filtersInitializer, filtersReducer } from './business-filters-reducer';
import { businessTypesOptions, nichesOptions } from '../util/parameters';
import { DUMMY_BUSINESSES } from '../util/data';
import { formHookDataMapper } from '../util/validators-and-formatters';

const BusinessContext = React.createContext({
  // business parameters
  businessTypesOptions: [],
  nichesOptions: [],

  // business data
  allBusinesses: [],
  homePageBusinessesList: [],
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
    businessesDB: `https://webflare-523f0-default-rtdb.firebaseio.com/businesses`,
  };

  const fetchBusinesses = useCallback(async () => {
    const response = await fetch(`${url.businessesDB}.json`);
    const fetchedData = (await response.json()) || [];
    if (response.ok) {
      return setAllBusinesses(Object.values(fetchedData));
      // return setAllBusinesses(DUMMY_BUSINESSES);
    }
    return alert(response.message);
  }, []);

  useEffect(() => {
    fetchBusinesses();
  }, []);

  // Filters Logic
  useEffect(() => {
    let businesses = [];

    setHomePageBusinessesList(() => {
      // business type filter logic
      if (filters.typeFilter.length === 0) {
        businesses = allBusinesses;
      }
      if (filters.typeFilter.length > 0) {
        businesses = allBusinesses.filter((business) =>
          filters.typeFilter.includes(business.type)
        );
      }
      // business search filter logic
      if (filters.searchFilter !== '') {
        businesses = businesses.filter(
          (business) =>
            business.title
              .trim()
              .toLowerCase()
              .includes(filters.searchFilter) ||
            business.description
              .trim()
              .toLowerCase()
              .includes(filters.searchFilter) ||
            business.type.trim().toLowerCase().includes(filters.searchFilter)
        );
      }
      // business price filter logic
      if (filters.priceFilter.min > 0 || filters.priceFilter.max < Infinity) {
        businesses = businesses.filter(
          (business) =>
            business.askingPrice >= filters.priceFilter.min &&
            business.askingPrice <= filters.priceFilter.max
        );
      }
      // business profit filter logic
      if (filters.profitFilter.min > 0 || filters.profitFilter.max < Infinity) {
        businesses = businesses.filter(
          (business) =>
            business.monthlyProfit >= filters.profitFilter.min &&
            business.monthlyProfit <= filters.profitFilter.max
        );
      }
      // user filter logic
      if (filters.userFilter.id) {
        businesses = businesses.filter(
          (business) => business.ownerId !== filters.userFilter.id
        );
      }
      return businesses;
    });
  }, [allBusinesses, filters]);

  const putBusinessData = async (businessData) => {
    return fetch(`${url.businessesDB}/${businessData.id}.json`, {
      method: 'PUT',
      body: JSON.stringify(businessData),
    });
  };

  const addNewBusiness = async (data, ownerId) => {
    let businessData = formHookDataMapper(data);
    businessData = {
      ...businessData,
      id: new Date().getTime().toString(),
      ownerId,
    };
    const response = await putBusinessData(businessData);

    if (response.ok) {
      fetchBusinesses();
      return console.log('Business Added Successfully');
    }

    return alert(response.message);
  };

  const updateBusiness = async (data, ownerId, businessId) => {
    const businessData = {
      ...formHookDataMapper(data),
      ownerId,
      id: businessId,
    };

    const response = await putBusinessData(businessData);
    if (response.ok) {
      fetchBusinesses();
      return console.log('Business Updated Successfully');
    }

    return alert(response.message);
  };
  const deleteBusiness = async (data) => {
    const response = await fetch(`${url.businessesDB}/${data.id}.json`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchBusinesses();
      return console.log('Business Deleted Successfully');
    }

    return alert(response.message);
  };

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
        updateBusiness,
        filterHandler: dispatch,
        deleteBusiness,
      }}
    >
      {props.children}
    </BusinessContext.Provider>
  );
}

export default BusinessContext;
