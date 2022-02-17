/* Actions */
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAIL = 'REGISTRATION_FAIL';
export const LOGOUT = 'LOGOUT';

/* Actions creators */
export const loginSuccess = ({ id, name, email, coins }) => ({ type: LOGIN_SUCCESS, id, name, email, coins });
export const loginFail = error => ({ type: LOGIN_FAIL, error });
export const registrationSuccess = ({ id, name, email, password }) => ({ type: REGISTRATION_SUCCESS, id, name, email, password });
export const registrationFail = error => ({ type: REGISTRATION_FAIL, error });
export const logout = () => ({ type: LOGOUT });

export const actions = { LOGIN_SUCCESS, LOGIN_FAIL, REGISTRATION_SUCCESS, REGISTRATION_FAIL, LOGOUT };
export const creators = { loginSuccess, loginFail, registrationSuccess, registrationFail, logout };

export default actions;
