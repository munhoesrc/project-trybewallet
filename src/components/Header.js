import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  despesasTotais = () => {
    const { expenses } = this.props;
    if (expenses.length > 0) {
      const soma = expenses.reduce((acc, cur) => {
        const moeda = cur.currency;
        const cambio = cur.exchangeRates[moeda].ask;
        const emBRL = Number(cambio) * Number(cur.value);
        return acc + Number(emBRL);
      }, 0);
      return Number(soma).toFixed(2);
    }
    return 0;
  };

  render() {
    const { email, expenses } = this.props;
    console.log(expenses);
    const total = this.despesasTotais();
    const cambio = 'BRL';

    return (
      // <div>Header</div>
      <div className="main-wallet">

        <header>
          <h2>
            Bem-Vindo a sua
            <span className="title-wallet"> TrybeWallet</span>
          </h2>
          <div>
            <p data-testid="email-field">
              Email:
              {' '}
              {email}
            </p>
          </div>
          <div>
            <p data-testid="total-field">
              {total}
            </p>
            <p data-testid="header-currency-field">
              {cambio}
            </p>
          </div>
        </header>

        {/*         <div className="input-despesa">
          <label htmlFor="value">
            Valor:
            <input type="number" name="value" />
          </label>
          <label htmlFor="coin">
            Moeda:
            <select name="coin">
              <option value="usd">USD</option>
            </select>
          </label>
          <label htmlFor="payment">
            Método de pagamento:
            <select name="payment">
              <option value="dinheiro">Dinheiro</option>
              <option value="cartao de credito">Cartão de crédito</option>
              <option value="cartao de debito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select name="tag">
              <option value="alimentacao">Alimentação</option>
              <option value="saude">Saúde</option>
              <option value="lazer">Lazer</option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição:
            <input type="text" name="description" />
          </label>
          <button className="btn-add-despesa" type="submit">Adicionar despesa</button>
        </div> */}

      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(Header);
