import { Box } from "@mui/material";
import { useGetProfilesQuery } from "./profileApi";
import { Profile } from "./profileUtils";

const Status = () => {
  // TODO: add currently selected profile.
  const profilesResult = useGetProfilesQuery();

  let innerElement;
  if (profilesResult.isSuccess) {
    const profiles = profilesResult.data as Profile[];
    innerElement = `Loaded ${profiles.length} profile(s).`;
  } else {
    innerElement = "Loading profiles...";
  }

  return (
    <Box sx={{ fontSize: "12px", color: "#888", marginTop: "1em" }}>
      {innerElement}
    </Box>
  );
};

export { Status };
