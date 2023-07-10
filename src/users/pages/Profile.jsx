import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Navbar from '../../shared/navigation/Navbar';
import Footer from '../../shared/navigation/Footer';

import DataContext from '../../shared/context/BusinessContext';
import AuthContext from '../../shared/context/AuthContext';
import UserCard from '../components/UserCard';
import BusinessItemCard from '../../business/components/Homepage/BusinessItemCard';
import BusinessList from '../../business/components/Homepage/BusinessList';

import classes from './Profile.module.css';

function Profile() {
  const history = useHistory();
  const { allBusinesses } = useContext(DataContext);
  const { userData } = useContext(AuthContext);

  const usersBusiness = allBusinesses.find(
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
