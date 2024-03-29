import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

import './index.css';
import Root from './routes/Root';
import Profile from './routes/Profile';
import { createProfile, updateProfile, fetchProfile, fetchProfiles } from './features/profile/profileSlice';
import ProfileList from './routes/ProfileList';
import ProfileEdit from './routes/ProfileEdit';
import ProfileCreate from './routes/ProfileCreate';
import store, {useAppDispatch} from './store';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Special RouterProvider that can use thunks and dispatch
function AppRouterProvider() {
  const appDispatch = useAppDispatch();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [{
        path: "/",
        index: true,
        element: <ProfileList />,
        loader: async () => {
          appDispatch(fetchProfiles());
          return null;
        },
      },{
        path: "/profile/:id",
        element: <Profile />,
        loader: async ({ params }) => {
          appDispatch(fetchProfile(parseInt(params.id ? params.id : '')));
          return null;
        },
      },
      {
        path: "/profile/:id/edit",
        element: <ProfileEdit />,
        // TODO have a loader here
        action: async ({ request, params }) => {
          const formData = await request.formData();
          const { id } = params;

          console.log('form data', formData);
          const profile = Object.fromEntries(formData.entries());
          console.log('objectized form data', profile);
          console.log('params', params);

          // TODO get rid of return null. Also redirect to the new profile
          console.log(appDispatch(updateProfile({id: id, profile: profile})));
          return redirect(`/profile/${id}`);
        },
      },
      {
        path: "/profile/create",
        element: <ProfileCreate />,
        action: async ({ request }) => {
          const formData = await request.formData();
          console.log('form data', formData);
          const profile = Object.fromEntries(formData.entries());
          console.log('objectized form data', profile);
          // TODO redirect to the new profile instead of the index
          console.log(appDispatch(createProfile(profile)));
          return redirect("/");
        },
      },
    ],
    },
  ]);

  return <RouterProvider router={router} />
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouterProvider />
    </Provider>
  </React.StrictMode>
);