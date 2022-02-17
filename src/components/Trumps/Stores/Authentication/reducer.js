import actions from './actions';

const reducer = (state, action) => ({
  [actions.LOGIN_SUCCESS]: {
    id: action.id,
    name: action.name,
    email: action.email,
    coins: action.coins,
    logged: true
  },
  [actions.LOGIN_FAIL]: {
    logged: false,
    error: action.error
  },
  [actions.REGISTRATION_SUCCESS]: {
    // id: await (async () => (await axios.get('http://localhost:3001/users'))?.data.slice(-1)[0].id + 1)(),
    id: action.id,
    name: action.name,
    email: action.email,
    password: action.password,
    coins: 0,
    logged: true,
    registration: true
  },
  [actions.REGISTRATION_FAIL]: {
    logged: false,
    error: action.error
  },
  [actions.LOGOUT]: {
    logged: false
  },
  '': state
}[action.type]);

export default reducer;
