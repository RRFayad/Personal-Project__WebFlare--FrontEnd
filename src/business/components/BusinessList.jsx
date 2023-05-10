import { useContext } from 'react';

import DataContext from '../../shared/context/DummyDataContext';
import Card from '../../shared/ui/Card';
import classes from './BusinessList.module.css';

function BusinessList() {
  const ctx = useContext(DataContext);
  console.log(ctx.businessesList[0]);

  return (
    <main className={classes.content}>
      <Card business={ctx.businessesList[0]} />
    </main>
  );
}

export default BusinessList;
