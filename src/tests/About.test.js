import { screen, render } from '@testing-library/react';
import { About } from '../pages';

describe('Test the about component', () => {
  it('test if the page contains informations about the pokedex', () => {
    render(<About />);

    const pageTitle = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });
    const paragraph1 = screen.queryByText(/ simulates a Pokédex/i);
    const paragraph2 = screen.queryByText(/filter Pokémons/i);

    expect(pageTitle).toBeDefined();

    expect(paragraph1).toBeDefined();

    expect(paragraph2).toBeDefined();
  });

  it('test if the page contains a level 2 header with a text:"about pokédex"', () => {
    render(<About />);

    const title = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });

    expect(title).toBeDefined();
  });

  it('test if the page contains two paragraphs talking about the pokedex', () => {
    render(<About />);

    const paragraph1 = screen.getByText(/encyclopedia containing /i);
    const paragraph2 = screen.getByText(/more details/i);

    expect(paragraph1).toBeDefined();

    expect(paragraph2).toBeDefined();
  });

  it('test if the page contains a pokedex image', () => {
    render(<About />);

    const image = screen.getByRole('img');

    const imageUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(image).toBeDefined();
    const { src } = image;
    expect(src).toBe(imageUrl);
  });
});
