import React, { useContext } from 'react';

import DataContext from '../../../shared/context/DataContext';
import classes from './Sidebar.module.css';

function SideBar() {
  const { businessTypesOptions, filterHandler } = useContext(DataContext);
  return (
    <aside className={classes.sidebar}>
      <p>1-10 of 20 results</p>

      <div className={classes.sidebar__items}>
        <div className={classes.sidebar__checkboxes}>
          {businessTypesOptions.map((item) => (
            <label htmlFor={item} key={item}>
              <input
                type="checkbox"
                id={item}
                name={item}
                onChange={(event) => {
                  filterHandler({
                    type: 'TYPE_FILTER',
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
              <input type="number" id="min-price" placeholder="Min" />
            </label>
            -
            <label htmlFor="max-price">
              <input type="number" id="max-price" placeholder="Max" />
            </label>
          </div>
        </div>
        <div className={`${classes['profit-filter']}`}>
          <p>Monthly Profit</p>
          <div className={`${classes['profit-filter__container']}`}>
            <label htmlFor="min-profit">
              <input type="number" id="min-profit" placeholder="Min" />
            </label>
            -
            <label htmlFor="max-profit">
              <input type="number" id="max-profit" placeholder="Max" />
            </label>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
