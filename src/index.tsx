import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './lib/i18n/config';
//import './styles/index.scss';
import App from './App';
import TelemetryProvider from './lib/Analytics/TelemetryProvider';
import history from './lib/Navigation/history';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <Suspense fallback="...">
    <React.StrictMode>
      <BrowserRouter>
        <TelemetryProvider history={history}>
          <App />
        </TelemetryProvider>
      </BrowserRouter>
    </React.StrictMode>
  </Suspense>,
);
