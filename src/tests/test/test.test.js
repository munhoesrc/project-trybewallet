import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from '../helpers/renderWith';
import App from '../../App';

describe('Testando a aplicação TrybeWallet:', () => {
  it('Verificado a página de Login', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailCorrect = 'cerveja@test.com';
    const passwordCorrect = '123456';

    const buttonEntrar = screen.getByRole('button', { name: /entrar/i });
    const inputPassword = screen.getByTestId('password-input');
    const inputEmail = screen.getByTestId('email-input');

    expect(buttonEntrar).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();

    userEvent.type(inputEmail, emailCorrect);
    userEvent.type(inputPassword, passwordCorrect);
    userEvent.click(buttonEntrar);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/carteira');
  });

  it('Verificando a página wallet, inputs e botão', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const { location: { pathname } } = history;

    expect(pathname).toBe('/carteira');

    const emailUser = screen.getByTestId('email-field');
    const valorDespesa = screen.getByTestId('total-field');
    const moeda = screen.getByTestId('header-currency-field');
    const despesa = screen.getByTestId('value-input');
    const descricao = screen.getByTestId('description-input');
    const currency = screen.getByTestId('currency-input');
    const inputAdicionar = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    expect(emailUser).toBeInTheDocument();
    expect(valorDespesa).toBeInTheDocument();
    expect(moeda).toBeInTheDocument();
    expect(despesa).toBeInTheDocument();
    expect(descricao).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(inputAdicionar).toBeInTheDocument();

    userEvent.type(despesa, '20');
    userEvent.type(descricao, 'Comprei cerveja');
    userEvent.click(inputAdicionar);
  });
});
