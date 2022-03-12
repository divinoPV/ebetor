import React, { useCallback, useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import axios from '../../../utils/axios';

import Logo from '../../Atoms/Images/Logo/Logo';
import Navbar from '../../Molecules/Navbar/Navbar';
import Title from '../../Atoms/Titles/Title';
import FormControl from '../../Trumps/FormControl';
import { useAuthenticationStore } from '../../Trumps/Stores/Authentication/store';
import { setVideogame } from '../../Trumps/Stores/Bet/actions';
import { useBetStore } from '../../Trumps/Stores/Bet/store';

const Header = ({ active }) => {
    const { authentication } = useAuthenticationStore();

    const { bet, dispatch } = useBetStore();

    const [videogames, setVideogames] = useState([]);

    useEffect(() => (async () => setVideogames((await axios.get('videogames?page=1&per_page=50'))?.data))(), []);

    return <header>
      <div>
        <Logo url="/medias/favicon_io/favicon.ico" alt="Logo du site Ebetor" />
        <Title text="Ebetor" />
      </div>
      {authentication.logged && <div>
        <span>{authentication.name} | </span>
        <span>{authentication.coins} coins</span>
      </div>}
      {videogames &&
        <Formik
          initialValues={{ videogame: '' }}
          onSubmit={e => e.preventDefault}
        >
          {formik => <Form>
            <FormControl control="select"
                         label="Jeux"
                         name="videogame"
                         onChange={e => dispatch(setVideogame({ videogame: videogames.find(v => v.slug === e.target.value) || null }))}
                         value={bet.videogame?.slug || ''}
                         options={videogames}
            />
          </Form>}
        </Formik>
      }
      <Navbar active={active} />
    </header>;
  }
;

export default Header;
