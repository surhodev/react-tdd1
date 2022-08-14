import { render, queryByAttribute } from '@testing-library/react';
import App from './App';

it('renders learn react link', () => {
  const view = render(<App />);
  
  const getById = queryByAttribute.bind(null, 'id')

  const mainContainer = getById(view.container, 'App')
  expect(mainContainer).toBeInTheDocument()
});
