import { Stack, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { ProfileLineItem } from "./ProfileLineItem";
import type { Profile } from "./profileUtils";

export default function ProfileListWrapped({
  profiles,
}: {
  profiles: Profile[] | undefined;
}) {
  const lineItems =
    profiles &&
    profiles.length > 0 &&
    profiles.map((p) => <ProfileLineItem key={p.id} profile={p} />);

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
      {lineItems}
    </Stack>
  );
}
