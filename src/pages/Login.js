import React from 'react';
import { connect } from 'react-redux';
import { func, shape } from 'prop-types';
import { submitLogin } from '../redux/actions';
import WalletAnimate from '../img/Wallet-amico.png';

const PASSWORD_MIN_LENGTH = 6;
class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, this.verificaEmaileSenha);
  };

  verificaEmaileSenha = () => {
    const { email, password } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const verifyEmail = regex.test(email);
    const verifyPassword = password.length >= PASSWORD_MIN_LENGTH;
    const btnState = verifyEmail && verifyPassword;
    this.setState({ isDisabled: !(btnState) });
  };

  handleLoginandgotoWallet = (e, state) => {
    e.preventDefault();
    const { history, getLoginInfo } = this.props;
    getLoginInfo(state);
    // const { email } = this.state;
    // dispatch(submitLogin(email));
    history.push('/carteira');
  };

  render() {
    const { handleChange, handleLoginandgotoWallet, state } = this;
    const { email, password, isDisabled } = state;
    return (
      <div className="main-login">
        <div className="left-login">
          <h1>Bem-vindo a TrybeWallet</h1>
          <h1>O fim da complexidade</h1>
          <img src={ WalletAnimate } className="login-image" alt="carteira animação" />
        </div>
        <form className="right-login">
          <div className="card-login">
            <h1>LOGIN</h1>
            <div className="textfield">
              <span>Usuário</span>
              <br />
              <input
                type="email"
                name="email"
                placeholder="Usuário"
                value={ email }
                data-testid="email-input"
                onChange={ handleChange }
              />
            </div>
            <div className="textfield">
              <span>Senha</span>
              <br />
              <input
                type="password"
                name="password"
                placeholder="Senha"
                value={ password }
                data-testid="password-input"
                onChange={ handleChange }
              />
            </div>
            <button
              className="btn-login"
              type="submit"
              disabled={ isDisabled }
              onClick={ (e) => handleLoginandgotoWallet(e, state) }
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  getLoginInfo: func,
  history: shape({
    push: func,
  }),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  getLoginInfo: (state) => dispatch(submitLogin(state)),
});

export default connect(null, mapDispatchToProps)(Login);
