import axios from 'axios';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../../../Organisms/Header/Header';
import Main from '../../../Organisms/Main/Main';
import { useAuthenticationStore } from '../../../Trumps/Stores/Authentication/store';

const Register = () => {
  const { authentication } = useAuthenticationStore();

  useEffect(() => (async () => (await axios.get('http://localhost:3001/users'))?.data.slice(-1)[0].id + 1)(), []);

  return authentication.logged ? <Navigate to="/" /> : <>
    <Header active="register" />
    <Main>

    </Main>
  </>;
};

export default Register;
