import { Box, Stack } from "@mui/material";
import { Link } from "react-router-dom";

import { ProfileLineItem } from "../features/profile/ProfileLineItem";
import { useGetProfilesQuery } from "../features/profile/profileApi";

const ProfileList = () => {
  const profilesResult = useGetProfilesQuery();

  let innerElement;
  if (profilesResult.isSuccess) {
    // TODO: validation here
    const profiles = profilesResult.data;
    innerElement =
      profiles.length > 0 &&
      profiles.map((profile) => (
        <Link to={`/profile/${profile.id}`} key={profile.id}>
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
              overflow: "hidden",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, .1)",
              cursor: "pointer",
            }}
            key={profile.id}
          >
            <ProfileLineItem profile={profile} />
          </Box>
        </Link>
      ));
  } else if (profilesResult.isLoading) {
    innerElement = "Trying to load profile list...";
  } else if (profilesResult.isError) {
    const error = profilesResult.error;
    if ("status" in error) {
      const errMsg = "error" in error ? error.error : error.data;
      innerElement = `ERROR fetching profile list: ${error.status} ${errMsg}`;
    } else {
      innerElement = `ERROR fetching profile list: ${error.message}`;
    }
  }

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
      {innerElement}
    </Stack>
  );
};

export default ProfileList;
