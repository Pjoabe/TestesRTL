import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../pages';
import App from '../App';

describe('test the favoritePokemons', () => {
  it('test if it displays the message "No favorite pokemon found" in case of no favs', () => {
    const { pokemons } = render(<FavoritePokemons />);

    expect(pokemons).toBe(undefined);

    const notFav = screen.queryByText(/No favorite pokemon found/i);

    expect(notFav).toBeInTheDocument();
  });

  it('test if all fav pokemon cards are displayed', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more/i });
    userEvent.click(detailsLink);

    const favCheckbox = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    userEvent.click(favCheckbox);

    act(() => {
      history.push('/favorites');
    });

    const { location: { pathname } } = history;
    const favoriteText = screen.getByRole('heading', { name: /favorite pokémons/i, level: 2 });
    const pokeName = screen.queryByText(/pikachu/i);
    const pokeType = screen.queryByText(/electric/i);
    const pokeWeight = screen.queryByText(/Average weight: 6.0 kg/i);
    const pokeImg = screen.queryByAltText('Pikachu sprite');
    const { src } = pokeImg;
    const imgUrl = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

    expect(pathname).toBe('/favorites');

    expect(favoriteText).toBeDefined();

    expect(pokeName).toBeDefined();

    expect(pokeType).toBeDefined();

    expect(pokeWeight).toBeDefined();

    expect(pokeImg).toBeDefined();

    expect(src).toBe(imgUrl);
  });
});
