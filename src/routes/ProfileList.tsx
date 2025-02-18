import { Box, Stack } from "@mui/material";
import { Link } from "react-router-dom";

import { ProfileLineItem } from "../features/profile/ProfileLineItem";
import { useGetProfilesQuery } from "../features/profile/profileApi";
import RTKQueryError from "../features/util/RTKQueryError";

const ProfileList = () => {
  const profilesResult = useGetProfilesQuery();

  let innerElement: React.ReactNode;
  if (profilesResult.isSuccess) {
    // TODO: validation here
    const profiles = profilesResult.data;
    innerElement =
      profiles.length > 0 &&
      profiles.map((p) => <ProfileLineItem key={p.id} profile={p} />);
  } else if (profilesResult.isLoading) {
    innerElement = "Trying to load profile list...";
  } else if (profilesResult.isError) {
    innerElement = <RTKQueryError error={profilesResult.error} operation='get profile list'/>;
  }
  return <ProfileListWrapper>{innerElement}</ProfileListWrapper>;
};

function ProfileListWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Stack spacing={1} sx={{ textAlign: "left" }}>
      <Link to={"/profile/create"}>
        <Box sx={{ boxSizing: "border-box" }}>
          <Box
            sx={{
              border: "1px solid gray",
              backgroundColor: "white",
              padding: ".5em",
              height: "1em",
              borderRadius: "4px",
              cursor: "pointer",
              lineHeight: "1.2em",
            }}
          >
            Create new profile: ➕
          </Box>
        </Box>
      </Link>
      {children}
    </Stack>);
}

export default ProfileList;
