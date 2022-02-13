import { createContext, useReducer, useContext } from 'react';
import reducer from './reducer';

export const AuthenticationStore = createContext();

const initialValue = {
  id: null,
  email: null,
  name: null,
  coins: null,
  logged: false,
  error: null
};

export const AuthenticationProvider = props => {
  const [authentication, dispatch] = useReducer(reducer, initialValue);

  return <AuthenticationStore.Provider value={{ authentication, dispatch }} {...props} />;
};

export const useAuthenticationStore = () => useContext(AuthenticationStore);
