/* Actions */
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const REGISTRATION = 'REGISTRATION';
export const LOGOUT = 'LOGOUT';

/* Actions creators */
export const loginSuccess = ({ id, name, email, coins }) => ({ type: LOGIN_SUCCESS, id, name, email, coins });
export const loginFail = error => ({ type: LOGIN_FAIL, error });
export const registration = ({ id, name, email, password }) => ({ type: REGISTRATION, id, name, email, password });
export const logout = () => ({ type: LOGOUT });

export const actions = { LOGIN_SUCCESS, LOGIN_FAIL, REGISTRATION, LOGOUT };
export const creators = { loginSuccess, loginFail, registration, logout };

export default actions;
