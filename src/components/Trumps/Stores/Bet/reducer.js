import actions from './actions';

const reducer = (state, action) => ({
  [actions.SET_VIDEOGAME]: {
    videogame: action.videogame
  },
  '': state
}[action.type]);

export default reducer;
