import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Admin from '../../../src/pages/Admin';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: any) => key }),
}));

test('renders Admin Page', () => {
  render(<Admin />);
  const linkElement = screen.getByText(/admin.title/i);
  expect(linkElement).toBeInTheDocument();
});
