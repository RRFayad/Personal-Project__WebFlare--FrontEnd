/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useContext } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

import BusinessList from './BusinessList';
import BusinessContext from '../../../shared/context/BusinessContext';
import classes from './MainContent.module.css';
import FilterModal from './FilterModal';
import Backdrop from '../../../shared/ui-ux/Backdrop';
import LoadingSpinner from '../../../shared/ui-ux/LoadingSpinner';

function MainContent() {
  const { businessesList, filterHandler, isLoading } =
    useContext(BusinessContext);
  const [filterModalIsShown, setFilterModalIsShown] = useState(false);

  return (
    <>
      {filterModalIsShown && (
        <>
          <FilterModal
            onClick={() => setFilterModalIsShown((state) => !state)}
          />
          <Backdrop onClick={() => setFilterModalIsShown((state) => !state)} />
        </>
      )}
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
            <FontAwesomeIcon icon={faFilter} />
          </button>
        </div>
        {isLoading && <LoadingSpinner overlay />}
        {!isLoading && businessesList.length === 0 ? (
          <h1 className={classes['business-list--no-items']}>
            No Business Found!
          </h1>
        ) : (
          businessesList.length > 0 && (
            <BusinessList businessesList={businessesList} />
          )
        )}
      </main>
    </>
  );
}

export default MainContent;
