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
    {authentication.logged && status === 'not_started' && match.opponents.length !== 0 &&
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
    {match.opponents.length === 0 && <span>Malheuresement vous ne pouvez pas parier sur ce match faute du manque d'informations sur les participants... (BLAME pandascore.co)</span>}
  </div>;
};

export default MatchItem;
