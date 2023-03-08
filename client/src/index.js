// eslint-disable-next-line @typescript-eslint/no-non-null-assertion

import React from 'react';
import App from './App.jsx';
import CreateAccount from './routes/CreateAccount.jsx';
import Home, { eventLoader } from './routes/Home.jsx';
import Error from './components/Error.js';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
  },
  {
    path: 'createaccount',
    element: <CreateAccount />,
  },
  {
    path: 'home',
    element: <Home />,
    loader: eventLoader,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
