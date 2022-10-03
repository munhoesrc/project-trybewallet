import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  state = {
    despesas: 0,
  };

  render() {
    const { despesas } = this.state;
    const { email } = this.props;
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
              Despesa Total: R$
              {' '}
              {despesas}
              {' '}
              <span data-testid="header-currency-field">BRL</span>
            </p>
          </div>
        </header>

        <div className="input-despesa">
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
        </div>

      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
