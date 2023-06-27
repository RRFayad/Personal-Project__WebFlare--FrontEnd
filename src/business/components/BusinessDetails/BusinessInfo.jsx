import React, { useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import { useParams } from 'react-router-dom';

import DataContext from '../../../shared/context/DataContext';
import Backdrop from '../../../shared/ui-ux/Backdrop';
import OfferModal from './OfferModal';
import { formatCurrency } from '../../../shared/util/validators-and-formatters';

import classes from './BusinessInfo.module.css';

function BusinessInfo() {
  const { bid } = useParams();
  const { businessesList, usersList } = useContext(DataContext);

  const [modalIsShown, setModalIsShown] = useState(false);

  const toggleModalHandler = () => setModalIsShown((prevState) => !prevState);

  const business = businessesList.find((item) => item.id === bid);

  return (
    <>
      {modalIsShown && <Backdrop onClick={toggleModalHandler} />}
      {modalIsShown && (
        <OfferModal business={business} onClick={toggleModalHandler} />
      )}
      <main className={classes.content}>
        <div className={classes.content__container}>
          <div className={`${classes['content__info-container--top']}`}>
            <img src={business.imageUrl} alt={business.title} />
            <h1 className={classes.content__title}>{business.title}</h1>
            <p className={classes.content__description}>
              {business.description}
            </p>
          </div>
          <div className={classes['content__info-container--bottom']}>
            <hr />
            <dl className={classes.content__KPIs}>
              <div className={classes['content__KPIs--top']}>
                <div className={classes.content__KPI}>
                  <dt>Type</dt>
                  <dd>{business.type}</dd>
                </div>
                <div className={classes.content__KPI}>
                  <dt>Niche</dt>
                  <dd>{business.niche}</dd>
                </div>
                <div className={classes.content__KPI}>
                  <dt>Age</dt>
                  <dd>
                    {Number(business.age) === 1
                      ? `${business.age} year`
                      : `${
                          business.age > 1 ? `${business.age} years` : '>1 year'
                        }`}
                  </dd>
                </div>
              </div>
              <div className={classes['content__KPIs--bottom']}>
                <div className={classes.content__KPI}>
                  <dt>Monthly Profit</dt>
                  <dd>{formatCurrency(business.monthlyProfit)}</dd>
                </div>
                <div className={classes.content__KPI}>
                  <dt>Monthly Revenue</dt>
                  <dd>{formatCurrency(business.monthlyRevenue)}</dd>
                </div>
                <div className={classes['content__KPI--bottom']}>
                  <div className={classes.content__KPI}>
                    <dt>Profit Margin</dt>
                    <dd>
                      {(business.monthlyProfit / business.monthlyRevenue) * 100}
                      %
                    </dd>
                  </div>
                </div>
              </div>
            </dl>
            <hr />
            <div className={classes.content__buttons}>
              <button
                type="button"
                className={`${classes['content__button--cta']}`}
                onClick={toggleModalHandler}
              >
                Offer Details
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default BusinessInfo;
