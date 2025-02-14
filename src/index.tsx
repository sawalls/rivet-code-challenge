import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  RouterProvider,
} from "react-router-dom";

import './index.css';
import { createRouter } from './routes/index'
import store, {useAppDispatch} from './store';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Special RouterProvider that can use thunks and dispatch
function AppRouterProvider() {
  const appDispatch = useAppDispatch();
  const router = createRouter(appDispatch);

  return <RouterProvider router={router} />
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouterProvider />
    </Provider>
  </React.StrictMode>
);