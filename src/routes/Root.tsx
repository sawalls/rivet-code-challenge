import { Outlet } from "react-router-dom";

import { Status } from "../features/profile/Status";
import AppFrame from "../features/util/AppFrame";

function Root() {
  return (
    <AppFrame>
      <Outlet />
      <Status />
    </AppFrame>
  );
}

export default Root;
