import axios from 'axios';
import { sha256 } from 'js-sha256';
import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { Navigate } from 'react-router-dom';
import * as Yup from 'yup';

import FormControl from '../../Trumps/FormControl';
import Header from '../../Organisms/Header/Header';
import ButtonForm from '../../Atoms/Button/ButtonForm/ButtonForm';
import { loginFail, loginSuccess } from '../../Trumps/Stores/Authentication/actions';
import { useAuthenticationStore } from '../../Trumps/Stores/Authentication/store';

const Login = () => {
  const { authentication, dispatch } = useAuthenticationStore();

  const [user, setUser] = useState({ email: '', password: '' });

  const [users, setUsers] = useState([]);

  const initialValues = { email: '', password: '' };

  const validationSchema = Yup.object({
    email: Yup
      .string()
      .email('Le format de l\'email est invalide')
      .required('Vous devez saisir une adresse email'),
    password: Yup.string().required('Vous devez saisir votre mot de passe')
  });

  useEffect(() => (async () => setUsers((await axios.get('http://localhost:3001/users'))?.data))(), []);

  return authentication.logged ? <Navigate to="/" /> : <>
    <Header active="login" />
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={e => e.preventDefault ||
        dispatch(users.filter(u => u.email === user.email && u.password === user.password).length > 0
          ? loginSuccess(Object.fromEntries(Object.entries(users[0]).filter(e => e[0] !== 'password')))
          : loginFail('Identifiants incorrect !')
        )
      }
    >
      {formik => <Form>
        <FormControl onInput={e => setUser({ ...user, email: e.target.value })}
                     control="input"
                     type="email"
                     label="Email"
                     name="email"
        />
        <FormControl onInput={e => setUser({ ...user, password: sha256(e.target.value) })}
                     control="input"
                     type="password"
                     label="Password"
                     name="password"
        />
        <ButtonForm type="submit" disabled={!formik.isValid}>Envoyer</ButtonForm>
      </Form>}
    </Formik>
  </>;
};

export default Login;
