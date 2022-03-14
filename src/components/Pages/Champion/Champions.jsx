import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import axios from '../../../utils/axios';

import ChampionItem from '../../Molecules/Items/ChampionItem/ChampionItem';
import ItemsContainer from '../../Organisms/Container/ItemsContainer/ItemsContainer';
import Header from '../../Organisms/Header/Header';
import Main from '../../Organisms/Main/Main';
import styles from './Champions.module.scss';

import { useBetStore } from '../../Trumps/Stores/Bet/store';

const Champions = () => {
  const [pageCount, setPageCount] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [champions, setChampions] = useState([]);

  const { bet } = useBetStore();

  const itemsPerPage = 9;

  useEffect(() => {
    if (bet.videogame.slug === 'ow') {
      axios.get(`ow/heroes?sort=name&page=${~~(itemOffset / itemsPerPage) + 1}&per_page=${itemsPerPage}`).then(response => {
        const nbElements = response.headers['x-total'];
        setTotalItems(nbElements);
        setChampions(response.data);
        setPageCount(~~(nbElements / itemsPerPage));
      });
    } else if (bet.videogame.slug === 'dota-2') {
      axios.get(`dota2/heroes?sort=name&page=${~~(itemOffset / itemsPerPage) + 1}&per_page=${itemsPerPage}`).then(response => {
        const nbElements = response.headers['x-total'];
        setTotalItems(nbElements);
        setChampions(response.data);
        setPageCount(~~(nbElements / itemsPerPage));
      });
    } else if (bet.videogame.slug === 'valorant') {
      axios.get(`valorant/agents?sort=name&page=${~~(itemOffset / itemsPerPage) + 1}&per_page=${itemsPerPage}`).then(response => {
        const nbElements = response.headers['x-total'];
        setTotalItems(nbElements);
        setChampions(response.data);
        setPageCount(~~(nbElements / itemsPerPage));
      });
    } else {
      axios.get(`lol/champions?sort=name&page=${~~(itemOffset / itemsPerPage) + 1}&per_page=${itemsPerPage}`).then(response => {
        const nbElements = response.headers['x-total'];
        setTotalItems(nbElements);
        setChampions(response.data);
        setPageCount(~~(nbElements / itemsPerPage));
      });
    }
  }, [itemOffset, itemsPerPage, bet]);

  console.log(bet.videogame.slug);

  return <>
    <Header active="champions" />
    <Main>
      {(bet.videogame.slug !== 'league-of-legends' && bet.videogame.slug !== 'ow' && bet.videogame.slug !== 'dota-2' && bet.videogame.slug !== 'valorant') &&
        <strong className={`${styles['Champions__message']}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S224 177.7 224 160C224 142.3 238.3 128 256 128zM296 384h-80C202.8 384 192 373.3 192 360s10.75-24 24-24h16v-64H224c-13.25 0-24-10.75-24-24S210.8 224 224 224h32c13.25 0 24 10.75 24 24v88h16c13.25 0 24 10.75 24 24S309.3 384 296 384z" />
          </svg>
          Vous ne pouvez rechercher que les champions de league of legends ou les hereos de dota 2, overwatch ou les agents de valorant...
        </strong>
      }
      <ItemsContainer>
        {champions.length !== 0 && champions.map(champion =>
          <ChampionItem key={champion.id} champion={champion} game={(bet.videogame.slug !== 'league-of-legends' && bet.videogame.slug !== 'ow' && bet.videogame.slug !== 'dota-2' && bet.videogame.slug !== 'valorant') ? 'league-of-legends' : bet.videogame.slug} />
        )}
      </ItemsContainer>
      <ReactPaginate
        breakLabel="..."
        nextLabel="suivant >"
        onPageChange={e => setItemOffset((e.selected * itemsPerPage) % totalItems)}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< précédent"
        renderOnZeroPageCount={null}
        className="o-paginator"
      />
    </Main>
  </>;
};

export default Champions;
