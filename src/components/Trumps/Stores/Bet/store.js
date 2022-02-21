import { createContext, useContext, useReducer } from 'react';
import reducer from './reducer';

export const BetStore = createContext();

export const BetProvider = props => {
  const [bet, dispatch] = useReducer(reducer, {
    videogame: null
  });

  return <BetStore.Provider value={{ bet, dispatch }} {...props} />;
};

export const useBetStore = () => useContext(BetStore);
