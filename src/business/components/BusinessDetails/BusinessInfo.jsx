import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import DataContext from '../../../shared/context/DummyDataContext';
import classes from './BusinessInfo.module.css';

function BusinessInfo() {
  const { bid } = useParams();
  const ctx = useContext(DataContext);

  const business = ctx.businessesList.find((item) => item.id === bid);
  console.log(business);

  return (
    <main className={classes.content}>
      <img src={business.imageUrl} alt={business.title} />
    </main>
  );
}

export default BusinessInfo;
