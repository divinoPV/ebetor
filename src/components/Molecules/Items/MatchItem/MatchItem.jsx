import axios from 'axios';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useAuthenticationStore } from '../../../Trumps/Stores/Authentication/store';
import { addBet } from '../../../Trumps/Stores/Bet/actions';
import { useBetStore } from '../../../Trumps/Stores/Bet/store';
import styles from './MatchItem.module.scss';

const MatchItem = ({ match, className, ...rest }) => {
  const [coins, setCoins] = useState(10);

  const { authentication } = useAuthenticationStore();

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

  const getDate = date => dayjs(date).format('DD/MM hh:mm A');

  const sendBet = object => {
    console.log((async () => (await axios.get(`http://localhost:3001/users/${authentication.id}`))?.data)());

    // axios.post(`http://localhost:3001/users/${authentication.id}/`, object);
    // axios.post('http://localhost:3001/bets/', object);
  };

  const toBet = (team = false) => {
    (authentication.coins === 0 || authentication.coins < coins)
      ? alert('Tricher c\'est mal :@')
      : sendBet({ match: match.id, team, coins, status: 'waiting_result' })
    ;
  };

  const handleChange = e => {
    let { value, min, max } = e.target;
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));

    setCoins(value);
  };

  return <div className={`${styles['MatchItem']} ${className}`} {...rest}>
    <div className={`${styles['MatchItem__leading']}`}>
      <span>{match.name} {status !== 'canceled' && '- ' + getDate(match.begin_at)}</span>
      <span className={`${styles['MatchItem__status']}`}>{getStatus(status)}</span>
    </div>
    {authentication.logged && status === 'not_started' && <div className={`${styles['MatchItem__bet']}`}>
      <strong className={`${styles['MatchItem__bet__title']}`}>Parier</strong>
      <div>
        <input disabled={authentication.coins === 0}
               max={authentication.coins}
               min="10"
               onChange={handleChange}
               style={{ width: `calc(${coins.toString().length}ch + 2ch)` }}
               type="number"
               value={coins}
        />
      </div>
      <div className={`${styles['MatchItem__bet__buttons']}`}>
        <button disabled={authentication.coins === 0} onClick={() => toBet(opponent1.id)}>{opponent1.name}</button>
        <button disabled={authentication.coins === 0} onClick={() => toBet()}>Ex æquo</button>
        <button disabled={authentication.coins === 0} onClick={() => toBet(opponent2.id)}>{opponent2.name}</button>
      </div>
    </div>}
  </div>;
};

export default MatchItem;
