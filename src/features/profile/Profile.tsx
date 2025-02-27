import { Box, Button, Stack, Typography } from "@mui/material";
import Photo from "./Photo";
import "./Profile.css";
import { Profile as ProfileType } from "./profileUtils";

export function Profile({ profile }: { profile: ProfileType }) {
  const {
    id,
    first_name,
    last_name,
    phone,
    email,
    address,
    city,
    state,
    zip,
    notes,
  } = profile;

  return (
    <Stack
      spacing={1}
      sx={{
        justifyContent: "center",
        padding: "1em",
      }}
    >
      <Typography variant="h2" component="h2" sx={{ textAlign: "center" }}>
        {first_name} {last_name}
      </Typography>
      <Photo profile={profile} size={"20em"} />
      <Button variant="contained" color="primary" href={`/profile/${id}/edit`}>
        Edit this profile
      </Button>
      <Box
        sx={{
          padding: "1em",
          borderRadius: "4px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <dl className="profile-details">
          <dt>Address</dt>
          <dd>
            <p>{address}</p>
            <p>
              {city} {state} {zip}
            </p>
          </dd>
          <dt>Phone</dt>
          <dd>{phone}</dd>
          <dt>Email</dt>
          <dd>{email}</dd>
          <dt>Notes</dt>
          <dd>{notes}</dd>
        </dl>
      </Box>
    </Stack>
  );
}
