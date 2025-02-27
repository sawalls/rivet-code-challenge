import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../features/util/ErrorPage";
import Profile from "./Profile";
import { ProfileCreate } from "./ProfileCreate";
import { ProfileEdit } from "./ProfileEdit";
import ProfileList from "./ProfileList";
import Root from "./Root";

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
