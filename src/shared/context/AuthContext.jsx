/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useEffect, useState } from 'react';

import { DUMMY_USERS } from '../util/data';

const AuthContext = React.createContext({
  isLoggedIn: false,
  loginHandler: (email, password) => {},
  logoutHandler: () => {},
  signUpHandler: () => {},
  updateProfileHandler: () => {},
  userId: '',
  userData: {},
});

export function AuthContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
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
    setUserData(DUMMY_USERS.find((user) => user.id === '0001'));
    localStorage.setItem('userId', '0001');
    return console.log('User logged in!!');
  };

  const logoutHandler = () => {
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setUserId(null);
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
    return console.log('User signed up!!');
  };

  return (
    <AuthContext.Provider
      value={{
        loginHandler,
        logoutHandler,
        signUpHandler,
        isLoggedIn,
        userId,
        userData,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
