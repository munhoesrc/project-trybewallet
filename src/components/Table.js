import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense } from '../redux/actions';

class Table extends Component {
  cambio = (ask) => {
    const cambio = Number(ask);
    return Number(cambio).toFixed(2);
  };

  valor = (value, ask) => {
    const emReal = Number(value) * Number(ask);
    return Number(emReal).toFixed(2);
  };

  render() {
    const { expenses, remove } = this.props;
    return (
      // <div>Table</div>
      <div>
        <table>
          <thead>
            <tr>
              <th> Descrição | </th>
              <th> Tag | </th>
              <th> Método de pagamento | </th>
              <th> Valor | </th>
              <th> Moeda | </th>
              <th> Câmbio utilizado | </th>
              <th> Valor convertido | </th>
              <th> Moeda de conversão | </th>
              <th> Editar/Excluir </th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((e) => (
                <tr key={ e.id }>
                  <td>{e.description}</td>
                  <td>{e.tag}</td>
                  <td>{e.method}</td>
                  <td>{Number(e.value).toFixed(2)}</td>
                  <td>{e.exchangeRates[e.currency].name}</td>
                  <td>{this.cambio(e.exchangeRates[e.currency].ask)}</td>
                  <td>{this.valor(e.value, e.exchangeRates[e.currency].ask)}</td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => remove(e) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  remove: (expense) => dispatch(removeExpense(expense)),
});

Table.propTypes = {
  expenses: PropTypes.instanceOf(Array).isRequired,
  remove: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
