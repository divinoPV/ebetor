import { createContext, useReducer, useContext, useEffect } from 'react';
import { loginSuccess } from './actions';
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

  useEffect(() => !localStorage.getItem('session') &&
      authentication.logged && localStorage.setItem('session', JSON.stringify(authentication)),
    [authentication]
  );

  useEffect(() => localStorage.getItem('session') && dispatch(loginSuccess(JSON.parse(localStorage.getItem('session')))), []);

  return <AuthenticationStore.Provider value={{ authentication, dispatch }} {...props} />;
};

export const useAuthenticationStore = () => useContext(AuthenticationStore);
