import { useEffect, useState } from 'react';
import axios from '../../../utils/axios';

import Header from '../../Organisms/Header/Header';
import Main from '../../Organisms/Main/Main';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [videogames, setGames] = useState([]);

  useEffect(() => {
    (async () => setMatches((await axios.get('matches?page=1&per_page=50'))?.data))();
  }, []);

  useEffect(() => {
    let newGames = [];
    matches && matches.map(match => !newGames.find(videogame => match.videogame.name === videogame.name) && newGames.push(match.videogame));
    setGames(newGames);
  }, [matches]);

  return <>
    <Header active="matches" />
    <Main>
      {videogames.map(videogame => (
        <div key={videogame.id}>
          <span>{videogame.name}</span>
          {matches.filter(match => videogame.name === match.videogame.name).map(match => (
            <div key={match.id}>
              <span>{match.name}</span>
            </div>
          ))}
          <br />
        </div>
      ))}
    </Main>
  </>;
};

export default Matches;
