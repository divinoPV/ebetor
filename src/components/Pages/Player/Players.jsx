import { useEffect, useState } from 'react';
import axios from '../../../utils/axios';

import Header from '../../Organisms/Header/Header';

const Players = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => (async () => setPlayers((await axios.get('players?page=1&per_page=50'))?.data))(), []);

  return <>
    <Header active="players" />
  </>;
};

export default Players;
