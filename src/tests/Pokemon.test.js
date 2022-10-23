import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

it('Test if a card with the infos of a pokemon is rendered', () => {
  const { history } = renderWithRouter(<App />);
  const details = screen.getByRole('link', { name: /more details/i });
  const { href } = details;

  expect(details).toBeDefined();

  expect(href).toBeDefined();

  userEvent.click(details);
  const pokeName = screen.getByTestId('pokemon-name');

  expect(pokeName).toHaveTextContent(/pikachu/i);

  const pokeType = screen.getByTestId('pokemon-type');

  expect(pokeType).toHaveTextContent(/electric/i);

  const pokeWeigth = screen.getByTestId('pokemon-weight');

  expect(pokeWeigth).toHaveTextContent(/average weight: 6.0 kg/i);

  const pokeImage = screen.getByAltText(/pikachu sprite/i);
  const { src } = pokeImage;
  const url = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

  expect(pokeImage).toBeDefined();

  expect(src).toBe(url);

  const { pathname } = history.location;

  expect(pathname).toBe('/pokemons/25');

  const favButton = screen.queryByLabelText(/pokémon favoritado?/i);

  expect(favButton).toBeDefined();

  userEvent.click(favButton);

  const favorite = screen.queryByAltText(/pikachu is marked as favorite/i);

  expect(favorite).toBeDefined();

  expect(favorite).toHaveAttribute('src', '/star-icon.svg');
});
