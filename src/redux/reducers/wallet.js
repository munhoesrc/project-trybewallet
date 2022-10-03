// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_COINS } from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_COINS:
    return {
      ...state,
      currencies: action.payload,
    };
  default:
    return state;
  }
}

export default wallet;
