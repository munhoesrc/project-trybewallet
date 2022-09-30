// Coloque aqui suas actions
import { SUBMIT_LOGIN } from './actionTypes';

const submitLogin = (payload) => ({
  type: SUBMIT_LOGIN,
  payload,
});

export default submitLogin;
