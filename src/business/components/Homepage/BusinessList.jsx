import { useContext } from 'react';

import DataContext from '../../../shared/context/DummyDataContext';
import BusinessItem from './BusinessItem';
import classes from './BusinessList.module.css';

function BusinessList() {
  const ctx = useContext(DataContext);

  return (
    <ul className={`${classes['business-list']}`}>
      {ctx.businessesList.length > 0 ? (
        ctx.businessesList.map((item) => (
          <BusinessItem business={item} key={item.id} />
        ))
      ) : (
        <h1>No Business Found!</h1>
      )}
    </ul>
  );
}

export default BusinessList;
