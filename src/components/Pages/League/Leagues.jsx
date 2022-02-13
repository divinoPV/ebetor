import { useEffect, useState } from 'react';
import axios from '../../../utils/axios';

import Header from '../../Organisms/Header/Header';
import Main from '../../Organisms/Main/Main';

const Leagues = () => {
  const [leagues, setLeagues] = useState([]);

  useEffect(() => (async () => setLeagues((await axios.get('leagues?sort=&page=1&per_page=50'))?.data))(), []);

  return <>
    <Header active="leagues" />
    <Main>
      {leagues.map(league => (
        <div key={league.id}>
          <strong>{league.name}</strong>
          <img src={league.image_url} alt={`Logo de la league ${league.name}`} />
        </div>
      ))}
    </Main>
  </>;
};

export default Leagues;
