import { Outlet } from "react-router-dom";

import { Status } from "../features/util/Status";
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
