import { useContext } from 'react';

import DataContext from '../../../shared/context/BusinessContext';
import BusinessItemCard from './BusinessItemCard';
import classes from './BusinessList.module.css';

function BusinessList() {
  const { businessesList } = useContext(DataContext);

  return (
    <>
      {businessesList.length === 0 ? (
        <h1 className={classes['business-list--no-items']}>
          No Business Found!
        </h1>
      ) : (
        businessesList.length > 0 && (
          <ul className={`${classes['business-list']}`}>
            {businessesList.map((item) => (
              <BusinessItemCard business={item} key={item.id} />
            ))}
          </ul>
        )
      )}
    </>
  );
}

export default BusinessList;
