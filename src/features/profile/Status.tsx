import { Box } from "@mui/material";
import { useGetProfilesQuery } from "./profileApi";
import { useUnsafeProfileIdParam } from "../util/hooks";

const Status = () => {
  const profilesResult = useGetProfilesQuery();
  const selectedId = useUnsafeProfileIdParam();

  let innerElement;
  if (profilesResult.isSuccess) {
    const profiles = profilesResult.data;
    innerElement = `Loaded ${profiles.length} profile(s).`;
    if (selectedId) {
      innerElement += ` Selected profile: ${selectedId}`;
    }
  }
  if (profilesResult.isError) {
    innerElement = ""; // The error handlers will show a better error. Just get out of the way.
  } else {
    innerElement = "Loading profiles...";
  }

  return <Box sx={{ fontSize: "12px", color: "#888" }}>{innerElement}</Box>;
};

export { Status };
