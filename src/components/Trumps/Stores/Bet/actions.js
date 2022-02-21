/** Actions */
export const SET_VIDEOGAME = 'SET_VIDEOGAME';

/** Actions creators */
export const setVideogame = ({ videogame }) => ({ type: SET_VIDEOGAME, videogame });

export const actions = { SET_VIDEOGAME };
export const creators = { setVideogame };

export default actions;
