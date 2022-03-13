import { useEffect, useState } from 'react';
import axios from '../../../utils/axios';
import ReactPaginate from 'react-paginate';

import Header from '../../Organisms/Header/Header';
import Main from '../../Organisms/Main/Main';
import ItemsContainer from '../../Organisms/Container/ItemsContainer/ItemsContainer';
import TeamItem from '../../Molecules/Items/TeamItem/TeamItem';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 30;

  useEffect(() => {
    axios.get(`teams?sort=name&page=${pageCount}&per_page=${itemsPerPage}`).then(response => setTeams(response.data));
    setPageCount(pageCount + 1);
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = event => {
    setItemOffset(event.selected + 1);
  };

  console.log(teams);

  return <>
    <Header active="teams" />
    <Main>
      <ItemsContainer>
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
        nextLabel="suivant"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="précédent"
        renderOnZeroPageCount={null}
      />
    </Main>
  </>;
};

export default Teams;
