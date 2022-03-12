import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { loginSuccess } from '../../../Trumps/Stores/Authentication/actions';

import { useAuthenticationStore } from '../../../Trumps/Stores/Authentication/store';
import styles from './MatchItem.module.scss';

const MatchItem = ({ match, className, ...rest }) => {
  const [coins, setCoins] = useState(10);
  const [user, setUser] = useState({});
  const [alreadyBet, setAlreadyBet] = useState(false);

  const { authentication, dispatch } = useAuthenticationStore();

  useEffect(() => authentication?.id !== null && (async () => setUser((await axios.get(`http://localhost:3001/users/${authentication.id}`))?.data))(), []);
  useEffect(() => axios.get('http://localhost:3001/bets/').then(r => r.data.find(e => e.user === authentication.id && e.match === match.id && setAlreadyBet(e))), []);

  const status = match.status;
  const opponent1 = match.opponents[0].opponent;
  const opponent2 = match.opponents[1].opponent;

  const getStatus = status => ({
    'canceled': 'Annulé',
    'finished': 'Fini',
    'not_started': 'Pas commencé',
    'postponed': 'Reporté',
    'running': 'En cours'
  }[status]);

  const toBet = (team = false) => {
    (authentication.coins === 0 || authentication.coins < coins)
      ? alert('Tricher c\'est mal :@')
      : (axios.get('http://localhost:3001/bets/').then(response => {
        !alreadyBet
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
      }))
    ;
  };

  const handleChange = e => {
    let { value, min, max } = e.target;
    setCoins(Math.max(Number(min), Math.min(Number(max), Number(value))));
  };

  return <div className={`${styles['MatchItem']} ${className}`} {...rest}>
    <div className={`${styles['MatchItem__leading']}`}>
      <span>{match.name} {status !== 'canceled' && '- ' + dayjs(match.begin_at).format('DD/MM hh:mm A')}</span>
      <span className={`${styles['MatchItem__status']}`}>{getStatus(status)}</span>
    </div>
    {authentication.logged && status === 'not_started' && <div className={`${styles['MatchItem__bet']}`}>
      <strong className={`${styles['MatchItem__bet__title']}`}>Parier</strong>
      <div>
        {!alreadyBet
          ? <input disabled={authentication.coins === 0}
                   max={authentication.coins}
                   min="10"
                   onChange={handleChange}
                   style={{ width: `calc(${coins.toString().length}ch + 2ch)` }}
                   type="number"
                   value={coins}
          />
          : <span>Vous avez déjà parier pour {alreadyBet.team === opponent1.id ? opponent1.name : opponent2.name}</span>
        }
      </div>
      <div className={`${styles['MatchItem__bet__buttons']}`}>
        <button disabled={authentication.coins === 0 || alreadyBet}
                onClick={() => toBet(opponent1.id)}>{opponent1.name}</button>
        <button disabled={authentication.coins === 0 || alreadyBet} onClick={() => toBet()}>Ex æquo</button>
        <button disabled={authentication.coins === 0 || alreadyBet} onClick={() => toBet(opponent2.id)}>{opponent2.name}</button>
      </div>
    </div>}
  </div>;
};

export default MatchItem;
