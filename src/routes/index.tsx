import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import ProfileList from "./ProfileList";
import Profile from "./Profile";
import { ProfileCreate, ProfileEdit } from "./ProfileCreateEdit";
import ErrorPage from "../features/util/ErrorPage";

export const createRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          index: true,
          element: <ProfileList />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/profile/:id/edit",
          element: <ProfileEdit />,
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
