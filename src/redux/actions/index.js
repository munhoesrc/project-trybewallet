// Coloque aqui suas actions
import { SUBMIT_LOGIN, ADD_COINS } from './actionTypes';

export const submitLogin = (payload) => ({
  type: SUBMIT_LOGIN,
  payload,
});

export const addCoins = (coins) => ({
  type: ADD_COINS,
  payload: Object.keys(coins).filter((element) => element !== 'USDT'),
});

export function fetchAPI() {
  return async (dispatch) => {
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    const data = await fetch(endpoint);
    const response = await data.json();
    dispatch(addCoins(response));
  };
}
