import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  const queries = render(<Router history={ history }>{component}</Router>);
  return ({
    ...queries, history,
  });
};
export default renderWithRouter;
