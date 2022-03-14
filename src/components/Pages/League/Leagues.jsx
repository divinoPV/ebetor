import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import axios from '../../../utils/axios';

import { useBetStore } from '../../Trumps/Stores/Bet/store';

import Header from '../../Organisms/Header/Header';
import Main from '../../Organisms/Main/Main';
import ItemsContainer from '../../Organisms/Container/ItemsContainer/ItemsContainer';
import LeagueItem from '../../Molecules/Items/LeagueItem/LeagueItem';

const Leagues = () => {
  const [leagues, setLeagues] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const { bet } = useBetStore();

  const itemsPerPage = 30;

  useEffect(() => {
    const slugGame = (() => {
      if (bet.videogame) {
        switch (bet.videogame.slug) {
          case 'lol-wild-rift':
            return 'lol-wild-rift';
          case 'league-of-legends':
            return 'lol';
          default:
            return bet.videogame.slug.split('').map(v => v === '-' ? '' : v).join('');
        }
      }

      return '';
    })();

    axios.get(`${slugGame}/leagues?sort=name&page=${~~(itemOffset / itemsPerPage) + 1}&per_page=${itemsPerPage}`).then(response => {
      const nbElements = response.headers['x-total'];
      setTotalItems(nbElements);
      setLeagues(response.data);
      setPageCount(~~(nbElements / itemsPerPage));
    });
  }, [itemOffset, itemsPerPage, bet]);

  return <>
    <Header active="leagues" />
    <Main>
      <ItemsContainer>
        {leagues.map(league => (
          <LeagueItem key={league.id} alt={`Logo de la league ${league.name}`} name={league.name} id={league.id}
                      src={league.image_url} />
        ))}
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

export default Leagues;
