import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import NewAuthContext from '../../shared/context/AuthContext';
import classes from './UserCard.module.css';

function UserCard() {
  const history = useHistory();
  const { userData, serverDomain } = useContext(NewAuthContext);

  return (
    <div className={classes['user-info__card']}>
      <div className={classes['user-info__details']}>
        <div className={classes['user-info__image-container']}>
          <img src={`${serverDomain}/${userData.image}`} alt={userData.name} />
        </div>
        <div className={classes['user-info__info-container']}>
          <dl className={classes.items}>
            <div className={classes.item}>
              <dt>Name:</dt>
              <dd>{userData.name}</dd>
            </div>
            <div className={classes.item}>
              <dt>Profile:</dt>
              <dd>
                <a href={userData.profileUrl} target="_blank" rel="noreferrer">
                  {userData.profileUrl}
                </a>
              </dd>
            </div>
            <div className={classes.item}>
              <dt>Country:</dt>
              <dd>{userData.country}</dd>
            </div>
          </dl>
          <p className={classes.description}>{userData.description}</p>
          <div className={classes['user-info__button-container']}>
            <button
              type="button"
              className={classes['user-info__button']}
              onClick={() => history.push(`/users/${userData.id}/edit-profile`)}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserCard;
