/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useContext } from 'react';

import BusinessList from './BusinessList';
import DataContext from '../../../shared/context/BusinessContext';
import classes from './MainContent.module.css';

function MainContent() {
  const { businessesList, filterHandler } = useContext(DataContext);
  const [filterModalIsShown, setFilterModalIsShown] = useState(false);

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
        <button
          type="button"
          className={classes['main-content__filter-button']}
          onClick={() => setFilterModalIsShown((state) => !state)}
        >
          a
        </button>
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
