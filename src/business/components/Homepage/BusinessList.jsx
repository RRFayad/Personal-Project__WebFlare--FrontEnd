import React from 'react';

import BusinessItemCard from './BusinessItemCard';
import classes from './BusinessList.module.css';

function BusinessList(props) {
  const { businessesList } = props;

  return (
    <ul className={`${classes['business-list']}`}>
      {businessesList.map((item) => (
        <BusinessItemCard business={item} key={item.id} />
      ))}
    </ul>
  );
}

export default BusinessList;
