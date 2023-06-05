/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';

const AuthContext = React.createContext({
  login: () => {},
  logout: () => {},
});

export function AuthContextProvider(props) {
  const login = () => {};
  const logout = () => {};

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
