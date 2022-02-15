import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { logout } from '../../../Trumps/Stores/Authentication/actions';
import { useAuthenticationStore } from '../../../Trumps/Stores/Authentication/store';

const Logout = () => {
  const { authentication, dispatch } = useAuthenticationStore();

  useEffect(() => {
    localStorage.getItem('session') && localStorage.removeItem('session');
    authentication.logged && dispatch(logout());
  }, []);

  return <Navigate to="/" />;
};

export default Logout;
