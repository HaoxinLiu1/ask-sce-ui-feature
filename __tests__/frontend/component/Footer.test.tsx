import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../../../src/components/Footer';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: any) => key }),
}));

test('renders Footer', () => {
  render(<Footer />);
  const linkElement = screen.getByText(/Edison International/i);
  expect(linkElement).toBeInTheDocument();
});
