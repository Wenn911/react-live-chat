import React, { useState } from 'react';
import { authContext } from './index.js';

function AuthProvider({ children }) {
  const userToken = localStorage.getItem('token');
  const [loggedIn, setLoggedIn] = useState(!!userToken);

  const getToken = () => localStorage.getItem('token');

  const getAuthorizationHeader = () => {
    const token = localStorage.getItem('token');

    if (token) {
      return { Authorization: `Bearer ${token}` };
    }

    return {};
  };

  const logIn = ({ token, username }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setLoggedIn(false);
  };

  return (
    <authContext.Provider value={{
      loggedIn, logIn, logOut, getAuthorizationHeader, getToken
    }}>
      {children}
    </authContext.Provider>
  );
}

export default AuthProvider;
