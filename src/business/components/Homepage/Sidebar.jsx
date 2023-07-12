import React, { useRef, useContext, useEffect } from 'react';

import AuthContext from '../../../shared/context/AuthContext';
import BusinessContext from '../../../shared/context/BusinessContext';
import SidebarFilters from './SidebarFilters';

import classes from './Sidebar.module.css';

function SideBar() {
  const { businessTypesOptions, filterHandler, businessesList } =
    useContext(BusinessContext);
  const { userData, isLoggedIn } = useContext(AuthContext);

  const minPriceRef = useRef(0);
  const maxPriceRef = useRef(Infinity);
  const minProfitRef = useRef(0);
  const maxProfitRef = useRef(Infinity);

  const filterValueChangeHandler = (event) => {
    if (event.target.id === 'min-price' || event.target.id === 'max-price') {
      filterHandler({
        type: 'SET_PRICE_FILTER',
        payload: {
          minValue: Number(minPriceRef.current.value),
          maxValue: Number(maxPriceRef.current.value || Infinity),
        },
      });
    }
    if (event.target.id === 'min-profit' || event.target.id === 'max-profit') {
      filterHandler({
        type: 'SET_PROFIT_FILTER',
        payload: {
          minValue: Number(minProfitRef.current.value),
          maxValue: Number(maxProfitRef.current.value || Infinity),
        },
      });
    }
  };

  useEffect(
    () =>
      filterHandler({
        type: 'CLEAR_FILTER',
      }),
    []
  );

  return (
    <aside className={classes.sidebar}>
      <p>
        1 - {businessesList.length} of {businessesList.length} results
      </p>

      <div className={classes.sidebar__items}>
        <SidebarFilters />
        <div className={`${classes['price-filter']}`}>
          <p>Asking Price</p>
          <div className={`${classes['price-filter__container']}`}>
            <label htmlFor="min-price">
              <input
                type="number"
                id="min-price"
                placeholder="Min"
                ref={minPriceRef}
                onChange={filterValueChangeHandler}
              />
            </label>
            -
            <label htmlFor="max-price">
              <input
                type="number"
                id="max-price"
                placeholder="Max"
                ref={maxPriceRef}
                onChange={filterValueChangeHandler}
              />
            </label>
          </div>
        </div>
        <div className={`${classes['profit-filter']}`}>
          <p>Monthly Profit</p>
          <div className={`${classes['profit-filter__container']}`}>
            <label htmlFor="min-profit">
              <input
                type="number"
                id="min-profit"
                placeholder="Min"
                ref={minProfitRef}
                onChange={filterValueChangeHandler}
              />
            </label>
            -
            <label htmlFor="max-profit">
              <input
                type="number"
                id="max-profit"
                placeholder="Max"
                ref={maxProfitRef}
                onChange={filterValueChangeHandler}
              />
            </label>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
