/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useEffect, useReducer, useState } from 'react';

import {
  businessTypesOptions,
  nichesOptions,
  DUMMY_BUSINESSES,
  DUMMY_USERS,
} from '../util/data';

const DataContext = React.createContext({
  businessesList: [],
  usersList: [],
  businessTypesOptions: [],
  nichesOptions: [],
});

const filtersReducer = (state, action) => {
  if (action.type === 'TYPE_FILTER') {
    // payload: {filter, filterNewState}
    return action.payload.filterNewState
      ? { ...state, typeFilter: [...state.typeFilter, action.payload.filter] }
      : {
          ...state,
          typeFilter: [...state.typeFilter].filter(
            (typeFilter) => typeFilter !== action.payload.filter
          ),
        };
  }
  if (action.type === 'SEARCH_FILTER') {
    // payload: {value}
    return {
      ...state,
      searchFilter: action.payload.value.toLowerCase().trim(),
    };
  }
  if (action.type === 'PRICE_FILTER') {
    // payload: {minValue, maxValue}
  }
  if (action.type === 'PROFIT_FILTER') {
    // payload: {minValue, maxValue}
  }
  return state;
};

export function DataContextProvider(props) {
  const allBusinesses = DUMMY_BUSINESSES;
  const usersList = DUMMY_USERS;

  const filtersInitializer = {
    typeFilter: [],
    searchFilter: '',
    priceFilter: {
      min: 0,
      max: Infinity,
    },
    profitFilter: {
      min: 0,
      max: Infinity,
    },
  };

  const [filters, dispatch] = useReducer(filtersReducer, filtersInitializer);

  const [businessesList, setBusinessesList] = useState(allBusinesses);

  // const filterStateHandler = (filter, newState) => {
  //   setBusinessTypeFilters((state) => {
  //     return newState
  //       ? [...state, filter]
  //       : [...state].filter((typeFilter) => typeFilter !== filter);
  //   });
  // };

  useEffect(() => {
    let businesses = [];
    console.log(allBusinesses);
    setBusinessesList(() => {
      // business type logic
      if (filters.typeFilter.length === 0) {
        businesses = allBusinesses;
      }
      if (filters.typeFilter.length > 0) {
        businesses = allBusinesses.filter((business) =>
          filters.typeFilter.includes(business.type)
        );
      }
      // business search logic
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
              .includes(filters.searchFilter)
        );
      }
      // business price logic
      // business profit logic
      return businesses;
    });
  }, [filters]);

  return (
    <DataContext.Provider
      value={{
        businessesList,
        usersList,
        businessTypesOptions,
        nichesOptions,
        filterHandler: dispatch,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}

export default DataContext;
