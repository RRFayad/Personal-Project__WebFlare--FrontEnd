import React, { useRef, useContext } from 'react';

import DataContext from '../../../shared/context/BusinessContext';
import AuthContext from '../../../shared/context/AuthContext';
import classes from './Sidebar.module.css';

function SideBar() {
  const { businessTypesOptions, filterHandler, businessesList } =
    useContext(DataContext);
  const { userData } = useContext(AuthContext);

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

  return (
    <aside className={classes.sidebar}>
      <p>
        1 - {businessesList.length} of {businessesList.length} results
      </p>

      <div className={classes.sidebar__items}>
        <label
          htmlFor="user-filter"
          key="user-filter"
          className={classes['sidebar__user-filter']}
        >
          <input
            type="checkbox"
            id="user-filter"
            name="user-filter"
            onChange={(event) => {
              // console.log(event.target.checked ? userData.id : null);
              filterHandler({
                type: 'SET_USER_FILTER',
                payload: {
                  id: event.target.checked ? userData.id : null,
                },
              });
            }}
          />
          Hide My Assets
        </label>
        <div className={classes.sidebar__checkboxes}>
          {businessTypesOptions.map((item) => (
            <label htmlFor={item} key={item}>
              <input
                type="checkbox"
                id={item}
                name={item}
                onChange={(event) => {
                  filterHandler({
                    type: 'SET_TYPE_FILTER',
                    payload: {
                      filter: item,
                      filterNewState: event.target.checked,
                    },
                  });
                }}
              />
              {item}
            </label>
          ))}
        </div>
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
