import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPICoins, fetchAPIExpense } from '../redux/actions/getAPI';

class WalletForm extends React.Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { fetchCoins } = this.props;
    fetchCoins();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const { value, description, currency, method, tag } = this.state;
    const { addExpenseTotal, idNumber } = this.props;

    const response = {
      id: idNumber,
      value,
      currency,
      method,
      description,
      tag,
    };

    addExpenseTotal(response);

    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;

    return (
      // <div>WalletForm</div>
      <div className="main-wallet">
        <div className="input-despesa">
          <label htmlFor="despesa">
            Valor:
            <input
              className="cx-input"
              type="text"
              value={ value }
              name="value"
              data-testid="value-input"
              onChange={ (event) => {
                this.handleChange(event);
              } }
            />
          </label>
          <label htmlFor="descricao">
            Descrição:
            <input
              className="cx-input"
              type="text"
              value={ description }
              name="description"
              data-testid="description-input"
              onChange={ (event) => { this.handleChange(event); } }
            />
          </label>
          <label htmlFor="moeda">
            Moeda:
            <select
              className="cx-input"
              value={ currency }
              name="currency"
              data-testid="currency-input"
              onChange={ (event) => { this.handleChange(event); } }
            >
              {
                currencies.map((element, index) => (
                  <option key={ index }>
                    {element}
                  </option>))
              }
            </select>
          </label>
          <label htmlFor="pagamento">
            Pagamento:
            <select
              className="cx-input"
              value={ method }
              name="method"
              data-testid="method-input"
              onChange={ (event) => { this.handleChange(event); } }
            >
              <option> Dinheiro </option>
              <option> Cartão de crédito </option>
              <option> Cartão de débito </option>
            </select>
          </label>
          <label htmlFor="categoria">
            Categoria:
            <select
              className="cx-input"
              value={ tag }
              name="tag"
              data-testid="tag-input"
              onChange={ (event) => { this.handleChange(event); } }
            >
              <option> Alimentação </option>
              <option> Lazer </option>
              <option> Trabalho </option>
              <option> Transporte </option>
              <option> Saúde </option>
            </select>
          </label>
          <button
            className="btn-add-despesa"
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  idNumber: wallet.expenses.length,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCoins: () => dispatch(fetchAPICoins()),
  addExpenseTotal: (expense) => dispatch(fetchAPIExpense(expense)),
});

WalletForm.propTypes = {
  currencies: PropTypes.instanceOf(Array).isRequired,
  fetchCoins: PropTypes.func.isRequired,
  addExpenseTotal: PropTypes.func.isRequired,
  idNumber: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
