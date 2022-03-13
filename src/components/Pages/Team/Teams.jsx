import { useEffect, useState } from 'react';
import axios from '../../../utils/axios';
import ReactPaginate from 'react-paginate';

import Header from '../../Organisms/Header/Header';
import Main from '../../Organisms/Main/Main';
import ItemsContainer from '../../Organisms/Container/ItemsContainer/ItemsContainer';
import TeamItem from '../../Molecules/Items/TeamItem/TeamItem';
import { useBetStore } from '../../Trumps/Stores/Bet/store';
import styles from './Teams.module.scss';

const Teams = () => {
  const [teams, setTeams] = useState([]);
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
    axios.get(`${slugGame}/teams?sort=name&page=${~~(itemOffset / itemsPerPage) + 1}&per_page=${itemsPerPage}`).then(response => {
      const nbElements = response.headers['x-total'];
      setTotalItems(nbElements);
      setTeams(response.data);
      setPageCount(~~(nbElements / itemsPerPage));
    });
  }, [itemOffset, itemsPerPage, bet]);

  return <>
    <Header active="teams" />
    <Main>
      <ItemsContainer className={`${styles['Teams__itemsContainer']}`}>
        {teams && teams.map(team =>
          <TeamItem key={team.id}
                    alt={`Logo de la team ${team.name}`}
                    team={team}
                    src={team.image_url}
          />
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

export default Teams;
