/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useCallback, useEffect, useState } from 'react';

import axios from 'axios';

import { formHookDataMapper } from '../util/validators-and-formatters';

const AuthContext = React.createContext({
  isLoggedIn: false,
  signUpHandler: () => {},
  loginHandler: () => {},
  logoutHandler: () => {},
  getUserData: () => {},
  updateProfileHandler: () => {},
  updatePasswordHandler: () => {},
  userData: {},
  serverDomain: undefined,
  tokenValue: null,
});

export function AuthContextProvider(props) {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(undefined);

  const url = {
    domain: 'http://localhost:5000',
    signUp: `http://localhost:5000/api/users/signup`,
    login: `http://localhost:5000/api/users/login`,
    userData: `http://localhost:5000/api/users`, // /:uid
    updatePassword: `http://localhost:5000/api/users/update-password`, // /:uid
  };

  const signUpHandler = async (formUserData) => {
    const newUserData = formHookDataMapper(formUserData);
    const formFields = Object.keys(newUserData);

    const formData = new FormData();
    formFields.forEach((fieldName) => {
      formData.append(fieldName, newUserData[fieldName]);
    });

    try {
      const response = await axios.post(url.signUp, formData);
      setUserData(response.data.user);
      setToken(response.data.token);
      localStorage.setItem(
        'userData',
        JSON.stringify({
          token: response.data.token,
          userId: response.data.user.id,
        })
      );
    } catch (error) {
      alert(`Error creating user: ${error.response.data.message}`);
    }
  };
  const updateProfileHandler = async (data) => {
    const profileData = formHookDataMapper(data);
    const formFields = Object.keys(profileData);

    const formData = new FormData();
    formFields.forEach((fieldName) => {
      formData.append(fieldName, profileData[fieldName]);
    });

    try {
      const response = await axios.patch(
        `${url.userData}/${userData.id}`,
        formData
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

  const loginHandler = async (formUserData) => {
    const toBeLoggedUserData = formHookDataMapper(formUserData);

    try {
      const response = await axios.post(url.login, toBeLoggedUserData);
      console.log(response.data.token.value);
      setToken(response.data.token);
      setUserData(response.data.user);
      localStorage.setItem(
        'userData',
        JSON.stringify({
          token: response.data.token,
          userId: response.data.user.id,
        })
      );
    } catch (error) {
      alert(`Error fetching user: ${error.response.data.message}`);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem('userData');
    setToken(null);
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
        setToken(localUserData.token);
        // console.log(fetchedUserData);
        setUserData(fetchedUserData);
      }
    };
    getLoggedUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signUpHandler,
        loginHandler,
        logoutHandler,
        getUserData,
        updateProfileHandler,
        updatePasswordHandler,
        userData,
        isLoggedIn: !!token,
        serverDomain: url.domain,
        tokenValue: token ? token.value : null,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
