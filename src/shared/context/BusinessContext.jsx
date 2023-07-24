/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useCallback, useEffect, useReducer, useState } from 'react';

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
    setHomePageBusinessesList(() =>
      homePageFiltersHandler(allBusinesses, filters)
    );
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
