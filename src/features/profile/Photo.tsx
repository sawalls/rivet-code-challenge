import { Avatar, Typography } from "@mui/material";
import { ResponsiveStyleValue } from "@mui/system";
import { Profile } from "./profileUtils";

type PhotoProps = {
  profile: Profile | undefined;
  size: ResponsiveStyleValue<string | number>;
};

// This bit pulled from the MUI Avatar usage
function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    // schala custom change: the default was too low contrast sometimes ---
    const darkenedValue = Math.floor(value * 0.75);
    color += `00${darkenedValue.toString(16)}`.slice(-2);
    // ---
  }
  /* eslint-enable no-bitwise */

  return color;
}

export default function Photo({ profile, size }: PhotoProps) {
  const { first_name, last_name, photo } = profile || {
    first_name: "",
    last_name: "",
    photo: "",
  };
  return (
    <Avatar
      alt={`${first_name} ${last_name}`}
      src={photo}
      sx={{
        width: size,
        height: size,
        bgcolor: stringToColor(`${first_name} ${last_name}`),
      }}
      variant="square"
    >
      {profile && (
        <Typography
          sx={{
            fontSize: "2em",
          }}
        >{`${first_name[0]}${last_name[0]}`}</Typography>
      )}
    </Avatar>
  );
}
