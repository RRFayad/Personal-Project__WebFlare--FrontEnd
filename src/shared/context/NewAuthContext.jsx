/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useCallback, useEffect, useState } from 'react';

import axios from 'axios';

import { formHookDataMapper } from '../util/validators-and-formatters';

const NewAuthContext = React.createContext({
  isLoggedIn: false,
  signUpHandler: () => {},
});

export function NewAuthContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(undefined);

  const url = {
    signUp: `http://localhost:5000/api/users/signup`,
    login: `http://localhost:5000/api/users/login`,
  };

  const signUpHandler = async (formUserData) => {
    const newUserData = formHookDataMapper(formUserData);

    try {
      const response = await axios.post(url.signUp, newUserData);
      console.log('User created:', response.data);
      setIsLoggedIn(true);
      setUserData(response.data);
      localStorage.setItem(
        'userData',
        JSON.stringify({ isLoggedIn: true, userId: response.data.id })
      );
    } catch (error) {
      console.log('Error creating user:', error);
    }
  };

  return (
    <NewAuthContext.Provider value={{ signUpHandler }}>
      {props.children}
    </NewAuthContext.Provider>
  );
}

export default NewAuthContext;
