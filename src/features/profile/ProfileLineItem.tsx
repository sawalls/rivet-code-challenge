import { Box, Stack } from "@mui/material";
import { Profile } from "./profileUtils";
import { Link } from "react-router-dom";
import Photo from "./Photo";

type ProfileLineItemArgs = {
  profile: Profile;
};

const ProfileLineItem = ({ profile }: ProfileLineItemArgs) => {
  return (
    <Link to={`/profile/${profile.id}`}>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "4px",
          overflow: "hidden",
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, .1)",
          cursor: "pointer",
        }}
      >
        <Stack direction={"row"} spacing={1}>
          <Photo profile={profile} size="3.5em" />
          <Stack spacing={1} style={{ padding: ".5em" }}>
            <Box>
              <h3 style={{ margin: 0 }}>
                {profile.first_name} {profile.last_name}
              </h3>
            </Box>
            <Box>
              {profile.email} - {profile.phone}{" "}
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Link>
  );
};

export { ProfileLineItem };
