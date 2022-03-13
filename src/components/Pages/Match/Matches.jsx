import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import axios from '../../../utils/axios';
import { Formik, Form } from 'formik';

import { useAuthenticationStore } from '../../Trumps/Stores/Authentication/store';
import { useBetStore } from '../../Trumps/Stores/Bet/store';

import MatchItem from '../../Molecules/Items/MatchItem/MatchItem';
import ItemsContainer from '../../Organisms/Container/ItemsContainer/ItemsContainer';
import Header from '../../Organisms/Header/Header';
import Main from '../../Organisms/Main/Main';
import FormControl from '../../Trumps/FormControl';
import styles from './Matches.module.scss';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [videogames, setVideogames] = useState([]);
  const [message, setMessage] = useState(false);
  const [status, setStatus] = useState('');
  const [pageCount, setPageCount] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const { bet } = useBetStore();
  const { authentication } = useAuthenticationStore();

  const itemsPerPage = 30;

  const url = 'matches?sort=name&page=1&per_page=50';

  useEffect(() => (async () => {
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

    const statusSearch = status.length !== 0 ? `&search[status]=${status}` : '';

    axios.get(`${slugGame}/matches?sort=name&page=${~~(itemOffset / itemsPerPage) + 1}&per_page=${itemsPerPage}${statusSearch}`).then(response => {
      let nbElements = 0;

      console.log(response.data.length);
      if (response.data.length === 0) {
        setMessage(`Aucun matches trouver pour le jeu vidéo ${bet.videogame.name}.`);
        axios.get('matches?sort=name&page=1&per_page=50').then(r => {
          nbElements = r.headers['x-total'];
          setMatches(r.data);
        });
      } else {
        setMessage(false);
        nbElements = response.headers['x-total'];
        setMatches(response.data);
      }

      setTotalItems(nbElements);
      setPageCount(~~(nbElements / itemsPerPage));
    });
  })(), [itemOffset, itemsPerPage, bet, status]);

  useEffect(() => {
    let newVideogames = [];
    matches && matches.forEach(match => !newVideogames.find(videogame => match.videogame.name === videogame.name) && newVideogames.push(match.videogame));
    setVideogames(newVideogames);
  }, [matches]);

  return <>
    <Header active="matches" />
    <Main>
      {(!authentication.logged || message) &&
        <div className={`${styles['Matches__leading']}`}>
          {!authentication.logged &&
            <strong className={`${styles['Matches__leading__notLogged']}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z" />
              </svg>
              Vous devez-etre connecté pour accèder aux paris
            </strong>
          }
          {message &&
            <strong className={`${styles['Matches__leading__message']}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S224 177.7 224 160C224 142.3 238.3 128 256 128zM296 384h-80C202.8 384 192 373.3 192 360s10.75-24 24-24h16v-64H224c-13.25 0-24-10.75-24-24S210.8 224 224 224h32c13.25 0 24 10.75 24 24v88h16c13.25 0 24 10.75 24 24S309.3 384 296 384z" />
              </svg>
              {message} Les matches de tous les jeux sont affichés.
            </strong>}
        </div>
      }
      <Formik
        initialValues={{ status: 'all' }}
        onSubmit={e => e.preventDefault}
      >
        {formik => <Form>
          <FormControl labelClassName={`${styles['Matches__form__select']}`}
                       control="select"
                       label="Statut :"
                       name="status"
                       onChange={e => setStatus(e.target.value)}
                       value={status || ''}
                       options={[
                         { id: 1, 'slug': 'canceled', 'name': 'Annulé' },
                         { id: 2, 'slug': 'finished', 'name': 'Terminé' },
                         { id: 3, 'slug': 'not_started', 'name': 'Commence bientôt' },
                         { id: 4, 'slug': 'postponed', 'name': 'Reporté' },
                         { id: 5, 'slug': 'running', 'name': 'En cours' }
                       ]}
          />
        </Form>}
      </Formik>
      {videogames.length === 0 &&
        <span className={`${styles['Matches__matchesNotFound']}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S224 177.7 224 160C224 142.3 238.3 128 256 128zM296 384h-80C202.8 384 192 373.3 192 360s10.75-24 24-24h16v-64H224c-13.25 0-24-10.75-24-24S210.8 224 224 224h32c13.25 0 24 10.75 24 24v88h16c13.25 0 24 10.75 24 24S309.3 384 296 384z" />
          </svg>
          Aucun matches trouver avec votre recherche... Veuillez réessayer avec des paramètres plus pertinents !
        </span>
      }
      {videogames && videogames.map(videogame =>
        <div className={`${styles['Matches__videogame']}`} key={videogame.id}>
          <span className={`${styles['Matches__videogame__title']}`}>{videogame.name}</span>
          <ItemsContainer className={`${styles['Matches__itemsContainer']}`}>
            {matches.filter(match => videogame.name === match.videogame.name).map(match => (
              <MatchItem key={match.id} match={match} matches={matches} />
            ))}
          </ItemsContainer>
        </div>
      )}
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

export default Matches;
