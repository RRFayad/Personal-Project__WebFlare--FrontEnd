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
  const [idToken, setIdToken] = useState(null);

  const url = {
    signUp: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
    login: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
    changePassword: `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
  };

  useEffect(() => {
    localStorage.getItem('userId') ? setIsLoggedIn(true) : setIsLoggedIn(false);
    setUserData(DUMMY_USERS.find((user) => user.id === 'U0001'));
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

  const signUpHandler = async (formData) => {
    const newUserData = formHookDataMapper(formData);

    const response = await fetch(url.signUp, {
      method: 'POST',
      body: JSON.stringify({
        email: newUserData.email,
        password: newUserData.password,
        returnSecureToken: true,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      const fetchedData = await response.json();
      console.log(fetchedData);
      fetchedData.localId &&
        setUserData({ ...newUserData, id: fetchedData.localId });
      fetchedData.idToken && setIdToken(fetchedData.idToken);
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', JSON.stringify(true));
      localStorage.setItem('userId', JSON.stringify(fetchedData.localId));
      localStorage.setItem('idToken', JSON.stringify(fetchedData.idToken));
      console.log('User Signed Up Successfully!');
    }
    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.error.message
        ? errorData.error.message
        : 'Authentication Failed';
      alert(errorMessage);
    }
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
