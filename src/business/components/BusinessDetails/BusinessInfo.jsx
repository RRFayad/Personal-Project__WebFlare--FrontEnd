import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import DataContext from '../../../shared/context/DummyDataContext';
import classes from './BusinessInfo.module.css';

function BusinessInfo() {
  const { bid } = useParams();
  const { businessesList, usersList, formatCurrency } = useContext(DataContext);

  const business = businessesList.find((item) => item.id === bid);

  return (
    <main className={classes.content}>
      <div className={classes.content__container}>
        <div className={`${classes['content__info-container--top']}`}>
          <img src={business.imageUrl} alt={business.title} />
          <h1 className={classes.content__title}>{business.title}</h1>
          <p className={classes.content__description}>{business.description}</p>
        </div>
        <div className={classes['content__info-container--bottom']}>
          <hr />
          <dl className={classes.content__KPIs}>
            <div className={classes.content__KPI}>
              <dt>Type</dt>
              <dd>{business.type}</dd>
            </div>
            <div className={classes.content__KPI}>
              <dt>Monthly Profit</dt>
              <dd>{formatCurrency(business.monthlyProfit)}</dd>
            </div>
            <div className={classes.content__KPI}>
              <dt>Monthly Revenue</dt>
              <dd>{formatCurrency(business.monthlyRevenue)}</dd>
            </div>
            <div className={classes['content__KPI--optional']}>
              <dt>Profit Margin</dt>
              <dd>
                {(business.monthlyProfit / business.monthlyRevenue) * 100}%
              </dd>
            </div>
          </dl>
          <hr />
          <div className={classes.content__buttons}>
            <button
              type="button"
              className={`${classes['content__button--cta']}`}
            >
              Offer Details
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default BusinessInfo;
