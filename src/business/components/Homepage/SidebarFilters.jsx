import React, { useContext, useEffect } from 'react';

import NewAuthContext from '../../../shared/context/AuthContext';
import BusinessContext from '../../../shared/context/BusinessContext';
import classes from './SidebarFilters.module.css';

function SidebarFilters() {
  const { userData, isLoggedIn } = useContext(NewAuthContext);
  const { businessTypesOptions, filterHandler } = useContext(BusinessContext);

  useEffect(
    () =>
      filterHandler({
        type: 'CLEAR_FILTER',
      }),
    []
  );

  return (
    <>
      {isLoggedIn && (
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
      )}
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
    </>
  );
}

export default SidebarFilters;
