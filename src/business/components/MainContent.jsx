import React from 'react';

import BusinessList from './BusinessList';
import classes from './MainContent.module.css';

function MainContent() {
  return (
    <main className={`${classes['main-content']}`}>
      <div className={`${classes['main-content__search-container']}`}>
        <input type="search" placeholder="Search..." name />
      </div>
      <BusinessList />
    </main>
  );
}

export default MainContent;
