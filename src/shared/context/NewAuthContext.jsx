/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useCallback, useEffect, useState } from 'react';

import axios from 'axios';

import { formHookDataMapper } from '../util/validators-and-formatters';

const NewAuthContext = React.createContext({
  isLoggedIn: false,
  signUpHandler: () => {},
  loginHandler: () => {},
  logoutHandler: () => {},
  getUserData: () => {},
  updateProfileHandler: () => {},
  updatePasswordHandler: () => {},
  userData: {},
});

export function NewAuthContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(undefined);

  const url = {
    signUp: `http://localhost:5000/api/users/signup`,
    login: `http://localhost:5000/api/users/login`,
    userData: `http://localhost:5000/api/users`, // /:uid
    updatePassword: `http://localhost:5000/api/users/update-password`, // /:uid
  };

  const signUpHandler = async (formUserData) => {
    const newUserData = formHookDataMapper(formUserData);

    try {
      const response = await axios.post(url.signUp, newUserData);
      setIsLoggedIn(true);
      setUserData(response.data.user);
      localStorage.setItem(
        'userData',
        JSON.stringify({ isLoggedIn: true, userId: response.data.user.id })
      );
    } catch (error) {
      alert(`Error creating user: ${error.response.data.message}`);
    }
  };

  const loginHandler = async (formUserData) => {
    const toBeLoggedUserData = formHookDataMapper(formUserData);

    try {
      const response = await axios.post(url.login, toBeLoggedUserData);
      setIsLoggedIn(true);
      setUserData(response.data.user);
      localStorage.setItem(
        'userData',
        JSON.stringify({ isLoggedIn: true, userId: response.data.user.id })
      );
    } catch (error) {
      alert(`Error fetching user: ${error.response.data.message}`);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    setUserData(null);
    return console.log('User logged out!!');
  };

  const getUserData = async (userId) => {
    let response;
    try {
      response = await axios.get(`${url.userData}/${userId}`);
    } catch (error) {
      alert(`Error creating user: ${error.response.data.message}`);
    }
    return response.data.user;
  };

  const updateProfileHandler = async (data) => {
    const profileData = formHookDataMapper(data);

    try {
      const response = await axios.patch(
        `${url.userData}/${userData.id}`,
        profileData
      );
      console.log('User updated:', response);
      setUserData(response.data.user);
      localStorage.setItem(
        'userData',
        JSON.stringify({ isLoggedIn: true, userId: response.data.user.id })
      );
    } catch (error) {
      alert(`Error updating user: ${error.response.data.message}`);
    }
  };

  const updatePasswordHandler = async (data) => {
    const profileData = formHookDataMapper(data);

    try {
      const response = await axios.patch(
        `${url.updatePassword}/${userData.id}`,
        profileData
      );
      console.log('Password updated:', response.data.message);
    } catch (error) {
      alert(`Error updating user: ${error.response.data.message}`);
    }
  };

  useEffect(() => {
    const getLoggedUserData = async () => {
      const localUserData = JSON.parse(localStorage.getItem('userData'));
      if (localUserData) {
        const fetchedUserData = await getUserData(localUserData.userId);
        setIsLoggedIn(localUserData.isLoggedIn);
        console.log(fetchedUserData);
        setUserData(fetchedUserData);
      }
    };
    getLoggedUserData();
  }, []);

  return (
    <NewAuthContext.Provider
      value={{
        signUpHandler,
        loginHandler,
        logoutHandler,
        getUserData,
        updateProfileHandler,
        updatePasswordHandler,
        userData,
        isLoggedIn,
      }}
    >
      {props.children}
    </NewAuthContext.Provider>
  );
}

export default NewAuthContext;
