import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { loginSuccess } from '../../../Trumps/Stores/Authentication/actions';

import { useAuthenticationStore } from '../../../Trumps/Stores/Authentication/store';
import styles from './MatchItem.module.scss';

const MatchItem = ({ match, matches, className, ...rest }) => {
  const [coins, setCoins] = useState(10);
  const [user, setUser] = useState({});
  const [alreadyBet, setAlreadyBet] = useState(false);
  const [bets, setBets] = useState([]);
  const [nbBets, setNbBets] = useState(0);

  const { authentication, dispatch } = useAuthenticationStore();

  useEffect(() => authentication?.id !== null && (async () => setUser((await axios.get(`http://localhost:3001/users/${authentication.id}`))?.data))(), [authentication]);
  useEffect(() => authentication?.id !== null && (async () => setBets((await axios.get('http://localhost:3001/bets/'))?.data))(), [authentication]);
  useEffect(() => axios.get('http://localhost:3001/bets/').then(r => r.data.find(e => e.user === authentication.id && e.match === match.id && setAlreadyBet(e))), [authentication]);
  useEffect(() => {
    const newBets = bets.filter(e => e.match === match.id);
    setNbBets(newBets.length);
    newBets.map(e => {
      if (e.status === 'waiting_result') {
        const currentMatch = matches.find(em => em.id === e.match);
        switch (currentMatch.status) {
          case 'finished':
            let result = 'lose';
            if (currentMatch.winner_id === e.team) {
              result = 'win';
              axios.put(`http://localhost:3001/users/${authentication.id}/`, { ...user, coins: (e.coins * 2) });
            }
            axios.put(`http://localhost:3001/bets/${e.id}/`, { ...e, status: result });
            break;
          case 'canceled':
            axios.put(`http://localhost:3001/bets/${e.id}/`, { ...e, status: 'canceled' });
            axios.put(`http://localhost:3001/users/${authentication.id}/`, { ...user, coins: (user.coins + coins) });
            break;
        }
      }
    });
  }, [bets]);

  const status = match.status;
  const opponent1 = match.opponents[0]?.opponent;
  const opponent2 = match.opponents[1]?.opponent;

  const getStatus = status => ({
    'canceled': 'Annulé',
    'finished': 'Terminé',
    'not_started': 'Commence bientôt',
    'postponed': 'Reporté',
    'running': 'En cours'
  }[status]);

  const toBet = (team) => {
    (authentication.coins === 0 || authentication.coins < coins)
      ? alert('Tricher c\'est mal :@')
      : !alreadyBet
        ? axios.put(`http://localhost:3001/users/${authentication.id}/`, { ...user, coins: (user.coins - coins) }) &&
        axios.post('http://localhost:3001/bets/', {
          user: user.id,
          match: match.id,
          team,
          coins,
          status: 'waiting_result'
        }) &&
        dispatch(loginSuccess({ ...user, coins: (user.coins - coins) }))
        : alert('Vous avez déjà parier sur ce match !')
    ;
  };

  const handleChange = e => {
    let { value, min, max } = e.target;
    setCoins(Math.max(Number(min), Math.min(Number(max), Number(value))));
  };

  return <div className={`${styles['MatchItem']} ${className ?? ''}`} {...rest}>
    <div className={`${styles['MatchItem__leading']}`}>
      <span
        className={`${styles['MatchItem__leading__title']}`}>{match.name} {status !== 'canceled' && '- ' + dayjs(match.begin_at).format('\l\e DD/MM \à hh:mm A')}</span>
      <span className={`${styles['MatchItem__leading__status']}`}>{getStatus(status)}</span>
    </div>
    {authentication.logged && (status === 'not_started') && match.opponents.length !== 0 &&
      <div className={`${styles['MatchItem__bet']}`}>
        <div className={`${styles['MatchItem__bet__titleContainer']}`}>
          <strong className={`${styles['MatchItem__bet__title']}`}>Prêt à devenir millionnaire ou à tout perdre
            ?</strong>
          <span>{nbBets !== 0 ? 'Déjà ' + nbBets + ' pari' + (nbBets > 1 ? 's' : '') : 'Aucun pari pour le moment'}</span>
        </div>
        <div className={`${styles['MatchItem__bet__action']}`}>
          {!alreadyBet
            ? <div className={`${styles['MatchItem__bet__action__input']}`}>
              {authentication.coins === 0
                ? <span>Vous ne possédez pas assez de jetons ! :'(</span>
                : <span>Choisissez le nombre de coins à parier :</span>
              }
              <input disabled={authentication.coins === 0}
                     max={authentication.coins}
                     min="10"
                     onChange={handleChange}
                     style={{ width: `calc(${coins.toString().length}ch + 2ch)` }}
                     type="number"
                     value={coins}
              />
            </div>
            : <span>
            Vous avez déjà parier pour {alreadyBet.team === opponent1.id ? opponent1.name : opponent2.name}. <br />
            Malheuresement il est impossible de changer son pari eheh ! Croisez les doigts pour qu'il passe :P
          </span>
          }
          <div className={`${styles['MatchItem__bet__action__buttons']}`}>
            {!alreadyBet && <span>Parier pour :</span>}
            <button disabled={authentication.coins === 0 || alreadyBet}
                    onClick={() => toBet(opponent1?.id)}
            >
              {opponent1?.name}
            </button>
            <button disabled={authentication.coins === 0 || alreadyBet}
                    onClick={() => toBet(opponent2?.id)}
            >
              {opponent2?.name}
            </button>
          </div>
        </div>
      </div>
    }
    {status === 'running' && match.live_embed_url &&
      <iframe
        allowFullScreen={true}
        className={`${styles['MatchItem__live']}`}
        height="400px"
        src={`${match.live_embed_url}&parent=localhost&autoplay=false&muted=true`}
        width="100%"
      >
      </iframe>
    }
    {match.opponents.length === 0 &&
      <span className={`${styles['MatchItem__cantBet']}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0zM256 352C290.9 352 323.2 367.8 348.3 394.9C354.3 401.4 364.4 401.7 370.9 395.7C377.4 389.7 377.7 379.6 371.7 373.1C341.6 340.5 301 320 256 320C247.2 320 240 327.2 240 336C240 344.8 247.2 352 256 352H256zM208 369C208 349 179.6 308.6 166.4 291.3C163.2 286.9 156.8 286.9 153.6 291.3C140.6 308.6 112 349 112 369C112 395 133.5 416 160 416C186.5 416 208 395 208 369H208zM303.6 208C303.6 225.7 317.1 240 335.6 240C353.3 240 367.6 225.7 367.6 208C367.6 190.3 353.3 176 335.6 176C317.1 176 303.6 190.3 303.6 208zM207.6 208C207.6 190.3 193.3 176 175.6 176C157.1 176 143.6 190.3 143.6 208C143.6 225.7 157.1 240 175.6 240C193.3 240 207.6 225.7 207.6 208z"/></svg>
        Malheuresement vous ne pouvez pas parier sur ce match faute du manque d'informations sur les participants... (BLAME pandascore.co)
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M119.4 44.1C142.7 40.22 166.2 42.2 187.1 49.43L237.8 126.9L162.3 202.3C160.8 203.9 159.1 205.1 160 208.2C160 210.3 160.1 212.4 162.6 213.9L274.6 317.9C277.5 320.6 281.1 320.7 285.1 318.2C288.2 315.6 288.9 311.2 286.8 307.8L226.4 209.7L317.1 134.1C319.7 131.1 320.7 128.5 319.5 125.3L296.8 61.74C325.4 45.03 359.2 38.53 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.09V44.1z"/></svg>
      </span>
    }
  </div>;
};

export default MatchItem;
