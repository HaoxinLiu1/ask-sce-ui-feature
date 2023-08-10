import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../../../src/pages/Home';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: any) => key }),
}));

test('renders Home page', () => {
  render(<Home />);
  const linkElement = screen.getByText(/home.title/i);
  expect(linkElement).toBeInTheDocument();
});
