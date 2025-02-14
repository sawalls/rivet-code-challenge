import { createBrowserRouter, redirect } from "react-router-dom";
import Root from "./Root";
import ProfileList from "./ProfileList";
import Profile from "./Profile";
import ProfileCreate from "./ProfileCreate";
import ProfileEdit from "./ProfileEdit";
import { updateProfile } from "../features/profile/profileSlice";

// TODO: typing here
export const createRouter = (appDispatch: any) => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [{
        path: "/",
        index: true,
        element: <ProfileList />,
      },{
        path: "/profile/:id",
        element: <Profile />,
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
      },
    ],
    },
  ]);

  return router;
};