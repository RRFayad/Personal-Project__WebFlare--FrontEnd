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

// const businessesListReducer = (state, action) => {
//   if (action.type === 'TYPE_FILTER') {
//     return;
//   }
//   if (action.type === 'SEARCH_FILTER') {
//     ///
//   }
//   if (action.type === 'PRICE_FILTER') {
//     ///
//   }
//   if (action.type === 'PROFIT_FILTER') {
//     ///
//   }
// };

export function DataContextProvider(props) {
  const allBusinesses = DUMMY_BUSINESSES;
  const usersList = DUMMY_USERS;

  const [businessesList, setBusinessesList] = useState(allBusinesses);
  const [businessTypeFilters, setBusinessTypeFilters] = useState(
    businessTypesOptions.map((type) => {
      return { [type]: false };
    })
  );

  const filterStateHandler = (filter, newState) => {
    setBusinessTypeFilters((state) =>
      state.map((item) => {
        return Object.keys(item).toString() === filter
          ? { [filter]: newState }
          : item;
      })
    );
  };

  useEffect(() => {
    const filters = businessTypeFilters.filter((item) => {
      return Object.values(item)[0];
    });

    console.log(filters);
  }, [businessTypeFilters]);

  return (
    <DataContext.Provider
      value={{
        businessesList,
        usersList,
        businessTypesOptions,
        nichesOptions,
        filterStateHandler,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}

export default DataContext;
