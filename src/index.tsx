import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css';
import Root from './routes/Root';
import Profile from './routes/Profile';
import ProfileList from './routes/ProfileList';
import store from './store';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [{
      path: "/",
      index: true,
      element: <ProfileList />
    },{
      path: "/profile/:id",
      element: <Profile />
    }],
  },

]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);