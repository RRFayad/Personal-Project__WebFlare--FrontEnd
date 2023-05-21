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
      <BusinessInfo className={classes.content__business} />
      <Footer />
    </>
  );
}

export default BusinessDetails;
