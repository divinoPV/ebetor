import { useEffect, useState } from 'react';
import axios from '../../../utils/axios';

import Header from '../../Organisms/Header/Header';
import Main from '../../Organisms/Main/Main';

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    (async _ => setTournaments((await axios.get('tournaments?sort=&page=1&per_page=50'))?.data))();
  }, []);

  console.log(tournaments);

  return <>
    <Header active="tournaments" />
    <Main>
      {tournaments.map(tournament => (
        <div key={tournament.id}>
          <strong>{tournament.name}</strong>
        </div>
      ))}
    </Main>
  </>;
};

export default Tournaments;
