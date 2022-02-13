import { useEffect, useState } from 'react';
import axios from '../../../utils/axios';

import Header from '../../Organisms/Header/Header';
import Main from '../../Organisms/Main/Main';

const Teams = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    (async () => setTeams((await axios.get('teams?page=1&per_page=50'))?.data))();
  }, []);

  return <>
    <Header active="teams" />
    <Main></Main>
  </>;
};

export default Teams;
