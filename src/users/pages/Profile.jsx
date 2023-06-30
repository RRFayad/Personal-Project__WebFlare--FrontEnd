import React, { useContext } from 'react';

import Navbar from '../../shared/navigation/Navbar';
import Footer from '../../shared/navigation/Footer';

import DataContext from '../../shared/context/DataContext';
import AuthContext from '../../shared/context/AuthContext';
import BusinessItemCard from '../../business/components/Homepage/BusinessItemCard';

import classes from './Profile.module.css';

function Profile() {
  const { businessesList } = useContext(DataContext);
  const { userData } = useContext(AuthContext);

  console.log(businessesList);

  return (
    <>
      <Navbar />

      <main className={classes.main}>
        <h1 className={classes['user-info__title']}>Personal Info:</h1>
        <div className={classes['user-info__container']}>
          <div className={classes['user-info__details']}>
            <img src={userData.imageUrl} alt={userData.name} />
            <div className={classes.container}>
              <dl className={classes.items}>
                <div className={classes.item}>
                  <dt>Name:</dt>
                  <dd>{userData.name}</dd>
                </div>
                <div className={classes.item}>
                  <dt>Linkedin:</dt>
                  <dd>
                    <a href={userData.linkedinUrl}>{userData.linkedinUrl}</a>
                  </dd>
                </div>
                <div className={classes.item}>
                  <dt>Country:</dt>
                  <dd>{userData.country}</dd>
                </div>
              </dl>
              <p className={classes.description}>{userData.description}</p>
            </div>
          </div>
        </div>
        <hr />
        {businessesList.length === 0 ? (
          <h1 className={classes['business-list']}>No Business Found!</h1>
        ) : (
          businessesList.length > 0 && (
            <>
              <h1 className={classes['businesses-list__title']}>
                Your Businesses:
              </h1>
              <ul className={`${classes['business-list']}`}>
                {businessesList
                  .filter((item) => item.ownerId === userData.id)
                  .map((item) => (
                    <BusinessItemCard business={item} key={item.id} />
                  ))}
              </ul>
            </>
          )
        )}
      </main>
      <Footer />
    </>
  );
}

export default Profile;
