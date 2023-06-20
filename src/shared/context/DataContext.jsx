/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useReducer, useState } from 'react';

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

const businessesListReducer = (state, action) => {
  if (action.type === 'TYPE_FILTER') {
    return;
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
};

export function DataContextProvider(props) {
  const businessesList = DUMMY_BUSINESSES;
  const users = DUMMY_USERS;

  return (
    <DataContext.Provider
      value={{
        businessesList,
        users,
        businessTypesOptions,
        nichesOptions,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}

export default DataContext;
