import { useContext } from 'react';

import DataContext from '../../shared/context/DummyDataContext';
import Card from '../../shared/ui/Card';
import classes from './BusinessList.module.css';

function BusinessList() {
  const ctx = useContext(DataContext);
  console.log(ctx.businessesList[0]);

  return (
    <main className={classes.content}>
      <input type="search" placeholder="Search..." />
      {ctx.businessesList.length > 0 ? (
        ctx.businessesList.map((item) => <Card business={item} />)
      ) : (
        <p>'aaa'</p>
      )}
    </main>
  );
}

export default BusinessList;
