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
    // payloads: {filter, filterNewState}
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
    ///
  }
  if (action.type === 'PRICE_FILTER') {
    ///
  }
  if (action.type === 'PROFIT_FILTER') {
    ///
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
    setBusinessesList((state) => {
      // business type logic
      if (filters.typeFilter.length === 0) {
        return allBusinesses;
      }
      return allBusinesses.filter((business) =>
        filters.typeFilter.includes(business.type)
      );
      // business search logic
      // business price logic
      // business profit logic
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
