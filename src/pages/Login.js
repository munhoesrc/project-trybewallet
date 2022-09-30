import React from 'react';
import { connect } from 'react-redux';
import { func, shape } from 'prop-types';
import submitLogin from '../redux/actions';

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
      <div>
        <form>
          <input
            type="email"
            name="email"
            value={ email }
            data-testid="email-input"
            onChange={ handleChange }
          />
          <input
            type="password"
            name="password"
            value={ password }
            data-testid="password-input"
            onChange={ handleChange }
          />
          <button
            type="submit"
            disabled={ isDisabled }
            onClick={ (e) => handleLoginandgotoWallet(e, state) }
          >
            Entrar
          </button>
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
