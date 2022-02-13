import actions from './actions';

const reducer = (state, action) => ({
  [actions.LOGIN_SUCCESS]: {
    id: action.id,
    name: action.name,
    email: action.email,
    coins: action.coins,
    logged: true,
    error: null
  },
  [actions.LOGIN_FAIL]: {
    id: null,
    name: null,
    email: null,
    coins: null,
    logged: false,
    error: action.error
  },
  [actions.LOGOUT]: {
    id: null,
    name: null,
    email: null,
    coins: null,
    logged: false,
    error: null
  },
  '': state
}[action.type]);

export default reducer;