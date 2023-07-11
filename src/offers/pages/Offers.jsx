import React, { useContext, useEffect, useState } from 'react';

import Navbar from '../../shared/navigation/Navbar';
import Footer from '../../shared/navigation/Footer';

import AuthContext from '../../shared/context/AuthContext';
import BusinessContext from '../../shared/context/BusinessContext';
import OffersContext from '../../shared/context/OffersContext';
import OfferCard from '../components/OfferCard';

import classes from './Offers.module.css';

function Offers() {
  const { userData } = useContext(AuthContext);
  const { offersList } = useContext(OffersContext);
  const usersBusinesses = useContext(BusinessContext).allBusinesses.filter(
    (item) => item.ownerId === userData.id
  );

  const sentOffers = offersList.filter((item) => item.sender === userData.id);

  const receivedOffers = offersList.filter(
    (offer) => usersBusinesses.findIndex((b) => offer.businessId === b.id) > -1
  );

  const [filter, setFilter] = useState('All Offers');
  const [filteredOffers, setFilteredOffers] = useState(receivedOffers);

  const changeFilterHandler = (filterText) => {
    if (filterText === 'Received Offers') {
      setFilteredOffers(receivedOffers);
    }
    if (filterText === 'Sent Offers') {
      setFilteredOffers(sentOffers);
    }
  };

  return (
    <>
      <Navbar />
      <header className={classes.header}>
        <h1 className={classes.header__title}>{filter}</h1>
        <label htmlFor="filter" className={classes.header__label}>
          Show:
          <select
            name="filter"
            id="filter"
            className={classes.header__select}
            onChange={(e) => {
              changeFilterHandler(
                e.target.options[e.target.options.selectedIndex].textContent
              );
              setFilter(
                e.target.options[e.target.options.selectedIndex].textContent
              );
            }}
          >
            <option>Received Offers</option>
            <option>Sent Offers</option>
          </select>
        </label>
      </header>
      <hr />
      <main className={classes.main}>
        {filteredOffers.length === 0 && (
          <h1 className={classes['main--no-list']}>There Are No Offers Yet!</h1>
        )}
        {filteredOffers.length > 0 && <OfferCard offer={filteredOffers[0]} />}
      </main>
      <Footer />
    </>
  );
}

export default Offers;
