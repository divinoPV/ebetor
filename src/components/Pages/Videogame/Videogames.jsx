import { useEffect, useState } from 'react';
import axios from '../../../utils/axios';

import Header from '../../Organisms/Header/Header';
import Main from '../../Organisms/Main/Main';

const Videogames = () => {
  const [videogames, setGames] = useState([]);

  useEffect(() => {
    (async () => setGames((await axios.get('videogames?page=1&per_page=50'))?.data))();
  }, []);

  return <>
    <Header active='videogames' />
    <Main>
      {videogames.map(videogame => (
        <div key={videogame.id}>
          <strong>{videogame.name}</strong>
        </div>
      ))}
    </Main>
  </>;
};

export default Videogames;
