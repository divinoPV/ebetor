import { useEffect, useState } from 'react';
import axios from '../../../utils/axios';

import Header from '../../Organisms/Header/Header';
import Main from '../../Organisms/Main/Main';

const Series = () => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    (async () => setSeries((await axios.get('series?page=1&per_page=50'))?.data))();
  }, []);

  return <>
    <Header active="series" />
    <Main></Main>
  </>;
};

export default Series;
