import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import { Status } from "../features/profile/Status";
import AppFrame from "../features/util/AppFrame";

function Root() {
  return (
    <AppFrame>
      <Box
        sx={{
          width: "32em",
          boxSizing: "border-box",
          padding: ".5em",
          margin: "0 auto",
          maxWidth: "100%",
        }}
      >
        <Outlet />
      </Box>
      <Status />
    </AppFrame>
  );
}

export default Root;
