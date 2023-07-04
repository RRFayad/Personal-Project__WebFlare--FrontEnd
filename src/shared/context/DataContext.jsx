/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useEffect, useReducer, useState } from 'react';

import {
  businessTypesOptions,
  nichesOptions,
  DUMMY_BUSINESSES,
  DUMMY_USERS,
  DUMMY_OFFERS,
} from '../util/data';

const DataContext = React.createContext({
  allBusinesses: [],
  businessesList: [],
  addNewBusiness: () => {},
  updateBusiness: () => {},
  businessTypesOptions: [],
  nichesOptions: [],
  usersList: [],
  offersList: [],
});

const filtersReducer = (state, action) => {
  if (action.type === 'SET_TYPE_FILTER') {
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
  if (action.type === 'SET_SEARCH_FILTER') {
    // payload: {value}
    return {
      ...state,
      searchFilter: action.payload.value.toLowerCase().trim(),
    };
  }
  if (action.type === 'SET_PRICE_FILTER') {
    // payload: {minValue, maxValue}
    return {
      ...state,
      priceFilter: {
        min: action.payload.minValue,
        max: action.payload.maxValue,
      },
    };
  }
  if (action.type === 'SET_PROFIT_FILTER') {
    // payload: {minValue, maxValue}
    return {
      ...state,
      profitFilter: {
        min: action.payload.minValue,
        max: action.payload.maxValue,
      },
    };
  }
  if (action.type === 'SET_USER_FILTER') {
    // payload: {id}
    return {
      ...state,
      userFilter: { id: action.payload.id },
    };
  }
  return state;
};

export function DataContextProvider(props) {
  const allBusinesses = DUMMY_BUSINESSES;
  const usersList = DUMMY_USERS;
  const offersList = DUMMY_OFFERS;

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
    userFilter: {
      id: null,
    },
  };

  const [filters, dispatch] = useReducer(filtersReducer, filtersInitializer);

  const [businessesList, setBusinessesList] = useState(allBusinesses);

  // Filters Logic
  useEffect(() => {
    let businesses = [];

    setBusinessesList(() => {
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
  }, [filters]);

  const addNewBusiness = () => {
    return console.log('New Business Created!');
  };
  const updateBusiness = () => {
    return console.log('Business Info Updated!');
  };

  return (
    <DataContext.Provider
      value={{
        allBusinesses,
        businessesList,
        addNewBusiness,
        updateBusiness,
        businessTypesOptions,
        nichesOptions,
        filterHandler: dispatch,
        usersList,
        offersList,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}

export default DataContext;
