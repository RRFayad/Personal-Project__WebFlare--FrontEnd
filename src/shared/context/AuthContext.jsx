/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useEffect, useState } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  loginHandler: (email, password) => {},
  logoutHandler: () => {},
  signUpHandler: () => {},
});

export function AuthContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    localStorage.getItem('isLoggedIn')
      ? setIsLoggedIn(true)
      : setIsLoggedIn(false);
  });

  const loginHandler = (email, password) => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
    return console.log('User logged in!!');
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
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
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
