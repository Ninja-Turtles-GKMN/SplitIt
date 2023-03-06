// eslint-disable-next-line @typescript-eslint/no-non-null-assertion

import React from 'react';
import App from './App.jsx';
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import ReactDOM from 'react-dom/client';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello world!</div>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

//{
/* <React.StrictMode> */
//}
//   {/* </React.StrictMode> */}
