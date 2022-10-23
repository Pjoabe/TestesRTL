import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Test the Pokedex Component', () => {
  it('Test if the component contains a level 2 heading with the text: "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const h2Title = screen.getByRole('heading', { name: /Encountered pokémons/i, level: 2 });

    expect(h2Title).toBeDefined();
  });

  it('Test if the component displays the next pokemon when the "next pokemon" button is clicked', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });

    expect(nextButton).toBeDefined();

    userEvent.click(nextButton);
    const charmander = screen.queryByText(/Charmander/i);

    expect(charmander).toBeDefined();
  });

  it('Test the length and type;', () => {
    renderWithRouter(<App />);
    const allButtons = screen.getAllByTestId('pokemon-type-button');
    // console.log(allButtons[1]);
    userEvent.click(allButtons[1]);
    const pokemonType = screen.queryAllByText(/Fire/i);
    // console.log(pokemonType.length);
    expect(pokemonType).toHaveLength(2);

    const buttons = screen.getByRole('button', { name: 'All' });

    expect(buttons).toBeDefined();

    userEvent.click(buttons);
    const afterClick = screen.queryAllByText(/Fire/i);

    expect(afterClick).toHaveLength(1);
  });

  it('test if the filter buttons exists', () => {
    renderWithRouter(<App />);
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    expect(filterButtons).toHaveLength(7);
  });
  it('test if the component have a button that reset the filters', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/');
    });

    const pikachu = screen.getByTestId('pokemon-name');

    expect(pikachu).toHaveTextContent(/Pikachu/i);
  });
});
