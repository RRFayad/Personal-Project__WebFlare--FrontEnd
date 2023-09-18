import React, { useContext } from 'react';

import Navbar from '../../shared/navigation/Navbar';
import Footer from '../../shared/navigation/Footer';

import DataContext from '../../shared/context/BusinessContext';
import NewAuthContext from '../../shared/context/NewAuthContext';
import UserCard from '../components/UserCard';
import BusinessList from '../../business/components/Homepage/BusinessList';

import classes from './Profile.module.css';

function Profile() {
  const { allBusinesses } = useContext(DataContext);
  const { userData } = useContext(NewAuthContext);

  const usersBusiness = allBusinesses.filter(
    (item) => item.ownerId === userData.id
  );

  return (
    <>
      <Navbar />
      <main className={classes.main}>
        <h1 className={classes['user-info__title']}>Personal Info:</h1>
        <UserCard />
        <hr />
        {usersBusiness.length === 0 && (
          <h1 className={classes['businesses-list__title']}>
            No Business Found!
          </h1>
        )}
        {usersBusiness.length > 0 && (
          <>
            <h1 className={classes['businesses-list__title']}>
              Your Businesses:
            </h1>
            <BusinessList businessesList={usersBusiness} />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Profile;
