import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BsCashCoin } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';

class Header extends Component {
  despesasTotais = () => {
    const { expenses } = this.props;
    const soma = expenses.reduce((acc, cur) => {
      const moeda = cur.currency;
      const cambio = cur.exchangeRates[moeda].ask;
      const emBRL = Number(cambio) * Number(cur.value);
      return acc + Number(emBRL);
    }, 0.00);
    return Number(soma).toFixed(2);
  };

  render() {
    const { email } = this.props;
    const total = this.despesasTotais();
    const cambio = 'BRL';

    return (
      <header>
        <h2>
          <BsCashCoin fontSize="30" />
          {' '}
          Bem-Vindo a sua
          <span className="title-wallet"> TrybeWallet</span>
        </h2>
        <div>
          <p data-testid="email-field">
            <CgProfile fontSize="25" />
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
