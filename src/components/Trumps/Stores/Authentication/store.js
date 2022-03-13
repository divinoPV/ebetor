import axios from 'axios';
import { createContext, useReducer, useContext, useEffect, useState } from 'react';
import { loginSuccess } from './actions';
import reducer from './reducer';

export const AuthenticationStore = createContext();

export const AuthenticationProvider = props => {
  const [authentication, dispatch] = useReducer(reducer, {
    id: null,
    email: null,
    name: null,
    coins: null,
    logged: false,
    logout: false,
    registration: false,
    error: null
  });

  useEffect(() => {
    authentication.registration && axios.post(
      'http://localhost:3001/users/',
      Object.fromEntries(Object.entries(authentication).filter(e => !['logged', 'registration'].includes(e[0])))
    );

    authentication.logged && localStorage.setItem('session', JSON.stringify(authentication));
    localStorage.getItem('session') && authentication.logout && localStorage.removeItem('session');
  }, [authentication]);

  useEffect(() => localStorage.getItem('session') && dispatch(loginSuccess(JSON.parse(localStorage.getItem('session')))), []);

  return <AuthenticationStore.Provider value={{ authentication, dispatch }} {...props} />;
};

export const useAuthenticationStore = () => useContext(AuthenticationStore);
