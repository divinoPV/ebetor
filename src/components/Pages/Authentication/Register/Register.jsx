import axios from 'axios';
import { sha256 } from 'js-sha256';
import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { Navigate } from 'react-router-dom';
import * as Yup from 'yup';
import ButtonForm from '../../../Atoms/Buttons/Form/ButtonForm';

import Header from '../../../Organisms/Header/Header';
import Main from '../../../Organisms/Main/Main';
import FormControl from '../../../Trumps/FormControl';
import { registrationFail, registrationSuccess } from '../../../Trumps/Stores/Authentication/actions';
import { useAuthenticationStore } from '../../../Trumps/Stores/Authentication/store';

const Register = () => {
  const { authentication, dispatch } = useAuthenticationStore();

  const [user, setUser] = useState({ name: '', email: '', password: '' });

  const [users, setUsers] = useState([]);

  const [autoIncrement, setAutoIncrement] = useState(0);

  const initialValues = { name: '', email: '', password: '' };

  const validationSchema = Yup.object({
    name: Yup
      .string()
      .required('Vous devez saisir un nom'),
    email: Yup
      .string()
      .email('Le format de l\'email est invalide')
      .required('Vous devez saisir une adresse email'),
    password: Yup.string().required('Vous devez saisir votre mot de passe')
  });

  useEffect(() => (async () => setUsers((await axios.get('http://localhost:3001/users'))?.data))(), []);

  useEffect(() => (async () => setAutoIncrement((await axios.get('http://localhost:3001/users'))?.data.slice(-1)[0].id + 1))(), []);

  return authentication.logged ? <Navigate to="/" /> : <>
    <Header active="register" />
    <Main>
      {authentication.error && <strong>{authentication.error}</strong>}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={e => e.preventDefault ||
          dispatch(!users.filter(u => u.email === user.email).length > 0
            ? registrationSuccess({ id: autoIncrement, ...user })
            : registrationFail('Cette adresse email est déjà utilisée !')
          )
        }
      >
        {formik => <Form>
          <FormControl onInput={e => setUser({ ...user, name: e.target.value })}
                       control="input"
                       type="text"
                       label="Name"
                       name="name"
          />
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
    </Main>
  </>;
};

export default Register;
