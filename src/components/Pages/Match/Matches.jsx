import { useEffect, useState } from 'react';
import axios from '../../../utils/axios';
import MatchItem from '../../Molecules/Items/MatchItem/MatchItem';
import ItemsContainer from '../../Organisms/Container/ItemsContainer/ItemsContainer';

import Header from '../../Organisms/Header/Header';
import Main from '../../Organisms/Main/Main';
import { useBetStore } from '../../Trumps/Stores/Bet/store';
import styles from './Matches.module.scss';

const Matches = () => {
  const queryParams = new URLSearchParams(window.location.search);

  const [matches, setMatches] = useState([]);
  const [videogames, setGames] = useState([]);
  const [message, setMessage] = useState(false);

  const { bet } = useBetStore();

  const matchesFiler = async (m, fromBet = false) => {
    let newMatches = [];

    if (queryParams.get('league')) {
      newMatches = m.filter(e => e.league_id === parseInt(queryParams.get('league')));
      newMatches.length === 0 && setMessage('Aucun matches trouver pour la league sélectionné');
    }

    if (bet.videogame) {
      newMatches = m.filter(e => e.videogame.id === bet.videogame.id);
      fromBet && newMatches.length === 0 && setMessage(`Aucun matches trouver pour le jeu vidéo ${bet.videogame.name}`);
    }

    newMatches.length !== 0 ? setMessage(false) || setMatches(newMatches) : setMatches(m);
  };

  const url = 'matches?sort=name&page=1&per_page=50';

  useEffect(() => (async () => matchesFiler((await axios.get(url))?.data))(), []);
  useEffect(() => (async () => matchesFiler((await axios.get(url))?.data, true))(), [bet]);

  useEffect(() => {
    let newGames = [];
    matches && matches.map(match => !newGames.find(videogame => match.videogame.name === videogame.name) && newGames.push(match.videogame));
    setGames(newGames);
  }, [matches]);

  return <>
    <Header active="matches" />
    <Main>
      {message && <strong>{message}</strong>}
      {videogames.map(videogame => (
        <div className={`${styles['Matches__videogame']}`} key={videogame.id}>
          <span className={`${styles['Matches__videogame__title']}`}>{videogame.name}</span>
          <ItemsContainer>
            {matches.filter(match => videogame.name === match.videogame.name).map(match => (
              <MatchItem key={match.id} match={match} matches={matches} />
            ))}
          </ItemsContainer>
        </div>
      ))}
    </Main>
  </>;
};

export default Matches;
