/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useEffect, useState } from 'react';

import { DUMMY_USERS } from '../util/data';
import { formHookDataMapper } from '../util/validators-and-formatters';

const AuthContext = React.createContext({
  isLoggedIn: false,
  loginHandler: (email, password) => {},
  logoutHandler: () => {},
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
    usersDB: `https://webflare-523f0-default-rtdb.firebaseio.com/users`,
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    userId ? setIsLoggedIn(true) : setIsLoggedIn(false);
    userId && setUserData(DUMMY_USERS.find((user) => user.id === 'U0001'));
  });

  const logoutHandler = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('idToken');
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

  const postUserData = async (data) => {
    await fetch(`${url.usersDB}.json`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  const getUserData = async (userId) => {
    console.log(userId);
    const response = await fetch(
      `${url.usersDB}/${'-N_fb0ZwxX_DjKaQYnF1'}/country.json`
    );
    if (response.ok) {
      console.log(response);
    }
  };

  const loginHandler = async (userHasAccount, formData) => {
    const newUserData = formHookDataMapper(formData);
    const URL = userHasAccount ? url.login : url.signUp;

    const response = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify({
        email: newUserData.email,
        password: newUserData.password,
        returnSecureToken: true,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    delete newUserData.password;

    if (response.ok) {
      const fetchedData = await response.json();
      if (userHasAccount) {
        getUserData(fetchedData.localId);
        fetchedData.localId &&
          setUserData({ ...newUserData, id: fetchedData.localId });
      }
      if (!userHasAccount) {
        await postUserData('POST', newUserData);
        fetchedData.localId &&
          // Create logic here to fetch user data
          setUserData({ ...newUserData, id: fetchedData.localId });
      }

      fetchedData.idToken && setIdToken(fetchedData.idToken);
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', JSON.stringify(true));
      localStorage.setItem('userId', JSON.stringify(fetchedData.localId));
      localStorage.setItem('idToken', JSON.stringify(fetchedData.idToken));
      console.log(
        `User ${userHasAccount ? 'Logged In' : 'Signed Up'} Successfully!`
      );
    }

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.error.message
        ? errorData.error.message
        : 'Authentication Failed';
      alert(errorMessage);
    }
    return response;
  };

  return (
    <AuthContext.Provider
      value={{
        loginHandler,
        logoutHandler,
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
