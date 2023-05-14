import { useContext } from 'react';

import DataContext from '../../shared/context/DummyDataContext';
import BusinessItem from './BusinessItem';
import classes from './BusinessList.module.css';

function BusinessList() {
  const ctx = useContext(DataContext);

  return (
    <main className={classes.content}>
      <input type="search" placeholder="Search..." />
      <ul>
        {ctx.businessesList.length > 0 ? (
          ctx.businessesList.map((item) => (
            <BusinessItem business={item} key={item.id} />
          ))
        ) : (
          <p>'aaa'</p>
        )}
      </ul>
    </main>
  );
}

export default BusinessList;
