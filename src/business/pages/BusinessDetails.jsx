import React from 'react';

import Navbar from '../../shared/navigation/Navbar';
import Footer from '../../shared/navigation/Footer';
import BusinessInfo from '../components/BusinessDetails/BusinessInfo';
import Offer from '../components/BusinessDetails/Offer';
import UserInfo from '../components/BusinessDetails/UserInfo';

import classes from './BusinessDetails.module.css';

function BusinessDetails() {
  return (
    <>
      <Navbar />
      <div className={classes.content}>
        <BusinessInfo />
        <aside className={classes.content__sidebar}>
          <Offer />
          <UserInfo />
        </aside>
      </div>
      <Footer />
    </>
  );
}

export default BusinessDetails;
