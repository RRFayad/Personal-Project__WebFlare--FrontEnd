import { useContext } from 'react';

import DataContext from '../../../shared/context/DummyDataContext';
import BusinessItem from './BusinessItem';
import classes from './BusinessList.module.css';

function BusinessList() {
  const { businessesList, usersList, formatCurrency } = useContext(DataContext);

  return (
    <ul className={`${classes['business-list']}`}>
      {businessesList.length > 0 ? (
        businessesList.map((item) => (
          <BusinessItem
            business={item}
            key={item.id}
            formatCurrency={formatCurrency}
          />
        ))
      ) : (
        <h1>No Business Found!</h1>
      )}
    </ul>
  );
}

export default BusinessList;
