import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Test the App component ', () => {
  it('test the navigation links', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });
    const favoriteLink = screen.getByRole('link', { name: /favorite/i });

    expect(homeLink).toBeDefined();

    expect(aboutLink).toBeDefined();

    expect(favoriteLink).toBeDefined();
  });

  it('test if the home component is rendered', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });

    userEvent.click(homeLink);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/');
  });

  it('test if the about component is rendered correctly', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);

    const aboutText = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });

    expect(aboutText).toBeDefined();

    const { location: { pathname } } = history;

    expect(pathname).toBe('/about');
  });

  it('test if the favorite pokemons component is rendered correctly', () => {
    const { history } = renderWithRouter(<App />);

    const linkToFavorite = screen.getByRole('link', { name: /favorite/i });
    userEvent.click(linkToFavorite);

    const favoriteText = screen.getByRole('heading', { name: /favorite pokémons/i, level: 2 });

    expect(favoriteText).toBeDefined();

    const { location: { pathname } } = history;

    expect(pathname).toBe('/favorites');
  });

  it('test if the not found component is rendered corrrectly', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      // https://reactjs.org/docs/test-utils.html#act
      history.push('/braddockEhBrabo');
    });

    const notfound = screen.getByRole('heading', { name: /page requested/i, level: 2 });

    expect(notfound).toBeDefined();

    const { location: { pathname } } = history;

    expect(pathname).toBe('/braddockEhBrabo');
  });
});
