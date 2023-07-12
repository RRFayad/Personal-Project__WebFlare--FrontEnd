/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useEffect, useState } from 'react';

import { DUMMY_USERS } from '../util/data';

const AuthContext = React.createContext({
  isLoggedIn: false,
  loginHandler: (email, password) => {},
  logoutHandler: () => {},
  signUpHandler: () => {},
  updateProfileHandler: () => {},
  userData: {},
  usersList: [],
});

export function AuthContextProvider(props) {
  const usersList = DUMMY_USERS;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    localStorage.getItem('userId') ? setIsLoggedIn(true) : setIsLoggedIn(false);
    setUserData(
      DUMMY_USERS.find((user) => user.id === localStorage.getItem('userId')) ||
        null
    );
  });

  const loginHandler = (email, password) => {
    // Hard Coded - Update after backend
    setIsLoggedIn(true);
    setUserData(DUMMY_USERS.find((user) => user.id === 'U0001'));
    localStorage.setItem('userId', 'U0001');
    return console.log('User logged in!!');
  };

  const logoutHandler = () => {
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setUserData(null);
    return console.log('User logged out!!');
  };

  const updateProfileHandler = () => {
    return console.log('Profile Updated!!');
  };

  const signUpHandler = (
    name,
    imageUrl,
    linkedinUrl,
    country,
    email,
    password,
    description
  ) => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
    setUserData(DUMMY_USERS.find((user) => user.id === 'U0001'));
    localStorage.setItem('userId', 'U0001');
    return console.log('User signed up!!');
  };

  return (
    <AuthContext.Provider
      value={{
        loginHandler,
        logoutHandler,
        signUpHandler,
        isLoggedIn,
        userData,
        updateProfileHandler,
        usersList,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
