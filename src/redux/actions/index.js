// Coloque aqui suas actions
import { SUBMIT_LOGIN, ADD_COINS, ADD_EXPENSE } from './actionTypes';

export const submitLogin = (payload) => ({
  type: SUBMIT_LOGIN,
  payload,
});

export const addCoins = (coins) => ({
  type: ADD_COINS,
  payload: Object.keys(coins).filter((element) => element !== 'USDT'),
});

export const addExpense = (expense, cambio) => ({
  type: ADD_EXPENSE,
  payload: {
    ...expense,
    exchangeRates: cambio,
  },
});

export function fetchAPICoins() {
  return async (dispatch) => {
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    const data = await fetch(endpoint);
    const response = await data.json();
    dispatch(addCoins(response));
  };
}

export function fetchAPIExpense(expense) {
  return async (dispatch) => {
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    const data = await fetch(endpoint);
    const response = await data.json();
    dispatch(addExpense(expense, response));
  };
}
