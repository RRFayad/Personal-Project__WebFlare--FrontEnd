/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useEffect, useState } from 'react';

import { DUMMY_USERS } from '../util/data';
import { formHookDataMapper } from '../util/validators-and-formatters';

const AuthContext = React.createContext({
  isLoggedIn: false,
  loginHandler: (email, password) => {},
  logoutHandler: () => {},
  signUpHandler: () => {},
  updateProfileHandler: () => {},
  updatePasswordHandler: () => {},
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

  const loginHandler = (data) => {
    const loggedUserData = formHookDataMapper(data);
    // Hard Coded - Update after backend
    setIsLoggedIn(true);
    setUserData(DUMMY_USERS.find((user) => user.id === 'U0001'));
    localStorage.setItem('userId', 'U0001');
    return console.log(loggedUserData);
  };

  const logoutHandler = () => {
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setUserData(null);
    return console.log('User logged out!!');
  };

  const updateProfileHandler = (data) => {
    const profileData = formHookDataMapper(data);
    return console.log(profileData);
  };

  const updatePasswordHandler = (data) => {
    const profileData = formHookDataMapper(data);
    return console.log(profileData);
  };

  const signUpHandler = (data) => {
    const newUserData = formHookDataMapper(data);

    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
    setUserData(DUMMY_USERS.find((user) => user.id === 'U0001'));
    localStorage.setItem('userId', 'U0001');
    return console.log(newUserData);
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
        updatePasswordHandler,
        usersList,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
