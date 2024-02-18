import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


import './index.css';
import Profile from './routes/profile';
import Root from './routes/root';
import store from './store';
import { fetchProfiles } from './features/profile/profileSlice';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />
  },
  {
    path: "/profile/:id",
    element: <Profile />
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchProfiles());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);