import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor, act } from '@testing-library/react';
import App from '../../src/App';
import AuthContext, { authContextType } from '../../src/context/AuthContext';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: any) => key }),
}));

beforeEach(() => {
  fetch.resetMocks();
});

test('renders App', async () => {
  const userName: authContextType = {
    user: {
      name: 'mock',
      email: 'mock@sce.com',
      roles: ['Mobile_Admin'],
    },
  };
  fetch.mockImplementationOnce(() =>
    Promise.resolve({ json: () => Promise.resolve(userName.user) }),
  );

  await act(() =>
    render(
      <BrowserRouter>
        <AuthContext.Provider value={userName}>
          <App />
        </AuthContext.Provider>
      </BrowserRouter>,
    ),
  );
  await waitFor(() =>
    expect(screen.getByText(/navigation.greet/i)).toBeInTheDocument(),
  );
});
