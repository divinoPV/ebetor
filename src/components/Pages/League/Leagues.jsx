import { useEffect, useState } from 'react';
import axios from '../../../utils/axios';

import { useBetStore } from '../../Trumps/Stores/Bet/store';

import Header from '../../Organisms/Header/Header';
import Main from '../../Organisms/Main/Main';
import ItemsContainer from '../../Organisms/Container/ItemsContainer/ItemsContainer';
import LeagueItem from '../../Molecules/Items/LeagueItem/LeagueItem';

const Leagues = () => {
  const [leagues, setLeagues] = useState([]);

  const { bet } = useBetStore();

  useEffect(() => bet.videogame
    ? setLeagues(bet.videogame.leagues)
    : (async () => setLeagues((await axios.get(`/leagues?sort=name&page=1&per_page=100`))?.data))()
  , [bet]);

  return <>
    <Header active="leagues" />
    <Main>
      <ItemsContainer>
        {leagues.map(league => (
          <LeagueItem key={league.id} alt={`Logo de la league ${league.name}`} name={league.name} id={league.id} src={league.image_url} />
        ))}
      </ItemsContainer>
    </Main>
  </>;
};

export default Leagues;
