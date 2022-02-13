import { useEffect, useState } from 'react';
import axios from '../../../utils/axios';
import dayjs from 'dayjs';

import Header from '../../Organisms/Header/Header';
import Main from '../../Organisms/Main/Main';

const Lives = () => {
  const [lives, setLives] = useState([]);

  useEffect(() => {
    (async () => setLives((await axios.get('lives?page=1&per_page=50'))?.data))();
  }, []);

  const getDate = date => dayjs(date).format('hh:mm A');

  console.log(lives);

  return <>
    <Header active="lives" />
    <Main>
      {lives && lives.map(live => (
        <div key={live.match.id}>
          <span>{live.match.videogame.name}</span>
          <div>
            <strong>{live.match.name}</strong>
            <span> - {live.match.status === 'running' ? 'En cours' : `Débute à ${getDate(live.event.begin_at)}`}</span>
          </div>
          <span>En direct : </span><a href={live.match.official_stream_url}>{live.match.official_stream_url}</a>
        </div>
      ))}
    </Main>
  </>;
};

export default Lives;
