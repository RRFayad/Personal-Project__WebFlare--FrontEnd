/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useCallback, useEffect, useState } from 'react';

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
  const [usersList, setUsersList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(undefined);
  const [idToken, setIdToken] = useState(null);

  const url = {
    signUp: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
    login: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
    changePassword: `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
    usersDB: `https://webflare-523f0-default-rtdb.firebaseio.com/users`,
  };

  const getUserData = useCallback(async (userId) => {
    const response = await fetch(`${url.usersDB}/${userId}.json`);
    const fetchedData = (await response.json()) || {};
    if (response.ok) {
      return setUserData({ ...fetchedData });
    }
    return alert(response.message);
  }, []);

  const fetchUsers = useCallback(async () => {
    const response = await fetch(`${url.usersDB}.json`);
    const fetchedData = (await response.json()) || {};
    if (response.ok) {
      return setUsersList(Object.values(fetchedData));
      // return setAllBusinesses(DUMMY_BUSINESSES);
    }
    return alert(response.message);
  }, []);

  useEffect(() => {
    const localUserData = JSON.parse(localStorage.getItem('userData'));
    // console.log(localUserData);
    if (localUserData) {
      // setUserData(DUMMY_USERS.find((user) => user.id === 'U0001'));
      getUserData(localUserData.userId);
      setIsLoggedIn(localUserData.isLoggedIn);
      setIdToken(localUserData.idToken);
    }
    fetchUsers();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('userData');
    setIdToken(null);
    setIsLoggedIn(false);
    setUserData(null);
    return console.log('User logged out!!');
  };

  const putUserData = async (newUserData, userId) => {
    const response = await fetch(`${url.usersDB}/${userId}.json`, {
      method: 'PUT',
      body: JSON.stringify({ ...newUserData, id: userId }),
    });
    const userFetchedData = await response.json();
    setUserData(userFetchedData);
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
      setIdToken(fetchedData.idToken);
      setIsLoggedIn(true);

      if (userHasAccount) {
        const loggedUserData = await getUserData(fetchedData.localId);
      }

      if (!userHasAccount) {
        await putUserData(newUserData, fetchedData.localId);
      }

      localStorage.setItem(
        'userData',
        JSON.stringify({
          isLoggedIn: true,
          userId: fetchedData.localId,
          idToken: fetchedData.idToken,
        })
      );

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

  const updateProfileHandler = async (data) => {
    const profileData = formHookDataMapper(data);
    await putUserData(profileData, userData.id);
    getUserData(userData.id);
  };

  const updatePasswordHandler = async (data) => {
    const profileData = formHookDataMapper(data);

    const response = await fetch(url.changePassword, {
      method: 'POST',
      body: JSON.stringify({
        idToken,
        password: profileData.newPassword,
        returnSecureToken: true,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const fetchedData = await response.json();
      setIdToken(fetchedData.idToken);

      localStorage.setItem(
        'userData',
        JSON.stringify({
          isLoggedIn: true,
          userId: fetchedData.localId,
          idToken: fetchedData.idToken,
        })
      );

      return console.log('Password Updated Successfully!');
    }

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.error.message
        ? errorData.error.message
        : 'Authentication Failed';
      alert(errorMessage);
    }
    return console.log('Failed to Update Password!');
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
