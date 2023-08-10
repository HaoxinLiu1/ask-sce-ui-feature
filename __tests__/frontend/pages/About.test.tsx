import * as React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../../../src/pages/About';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: any) => key }),
}));

test('renders About Page', () => {
  render(<About />);
  const hElement = screen.getByText(/about.title/i);
  expect(hElement).toBeInTheDocument();
});
