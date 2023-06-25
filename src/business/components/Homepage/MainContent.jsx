/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext } from 'react';

import BusinessList from './BusinessList';
import DataContext from '../../../shared/context/DataContext';
import classes from './MainContent.module.css';

function MainContent() {
  const { filterHandler } = useContext(DataContext);
  return (
    <main className={`${classes['main-content']}`}>
      <div className={`${classes['main-content__search-container']}`}>
        <input
          type="search"
          placeholder="Search..."
          name="search"
          onChange={(event) => {
            filterHandler({
              type: 'SET_SEARCH_FILTER',
              payload: { value: event.target.value },
            });
          }}
        />
      </div>
      <BusinessList />
    </main>
  );
}

export default MainContent;
