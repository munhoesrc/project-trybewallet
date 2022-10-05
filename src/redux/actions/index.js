// Coloque aqui suas actions
import {
  SUBMIT_LOGIN,
  ADD_COINS,
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
  SAVE_EXPENSE_EDIT,
} from './actionTypes';

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

export const removeExpense = (e) => ({
  type: REMOVE_EXPENSE,
  payload: e.id,
});

export const editExpense = (id) => ({
  type: EDIT_EXPENSE,
  payload: true,
  id,
});

export const saveExpenseEdit = (obj) => ({
  type: SAVE_EXPENSE_EDIT,
  obj,
});
