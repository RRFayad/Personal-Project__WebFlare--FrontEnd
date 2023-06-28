/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useEffect, useState } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  loginHandler: (email, password) => {},
  logoutHandler: () => {},
  signUpHandler: () => {},
  userId: '',
});

export function AuthContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    localStorage.getItem('isLoggedIn')
      ? setIsLoggedIn(true)
      : setIsLoggedIn(false);
    setUserId(localStorage.getItem('userId') || null);
  });

  const loginHandler = (email, password) => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    setUserId('0001'); // Hard Coded - Update after backend
    localStorage.setItem('userId', '0001'); // Hard Coded - Update after backend
    return console.log('User logged in!!');
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setUserId(null);
    return console.log('User logged out!!');
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
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
