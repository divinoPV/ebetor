import { createContext, useContext, useEffect, useReducer } from 'react';
import { setVideogame } from './actions';
import reducer from './reducer';

export const BetStore = createContext();

export const BetProvider = props => {
  const [bet, dispatch] = useReducer(reducer, {
    videogame: null
  });

  useEffect(() => bet.videogame && localStorage.getItem('videogame') !== bet.videogame && localStorage.setItem('videogame', JSON.stringify(bet.videogame)), [bet]);

  useEffect(() => localStorage.getItem('videogame') && dispatch(setVideogame({videogame: JSON.parse(localStorage.getItem('videogame'))})), []);

  return <BetStore.Provider value={{ bet, dispatch }} {...props} />;
};

export const useBetStore = () => useContext(BetStore);
