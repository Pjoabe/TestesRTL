import { screen, render } from '@testing-library/react';
import { NotFound } from '../pages';

describe('test the not found Component', () => {
  it('test if the Component contains a heading level 2 with the text: "page requested not found"', () => {
    render(<NotFound />);

    const notFoundH2 = screen.getByRole('heading', { name: /Page requested not found/i, level: 2 });

    expect(notFoundH2).toBeDefined();
  });

  it('test if the Component displays the correct image', () => {
    render(<NotFound />);

    const image = screen.queryByAltText(/Pikachu crying because the page requested was not found/i);
    const imageUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const { src } = image;

    expect(image).toBeDefined();

    expect(src).toBe(imageUrl);
  });
});
