/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext } from 'react';

import BusinessList from './BusinessList';
import DataContext from '../../../shared/context/BusinessContext';
import classes from './MainContent.module.css';

function MainContent() {
  const { businessesList, filterHandler } = useContext(DataContext);

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
      {businessesList.length === 0 ? (
        <h1 className={classes['business-list--no-items']}>
          No Business Found!
        </h1>
      ) : (
        businessesList.length > 0 && (
          <BusinessList businessesList={businessesList} />
        )
      )}
    </main>
  );
}

export default MainContent;
