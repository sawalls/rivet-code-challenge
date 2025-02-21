import {
  Button,
  FormLabel,
  OutlinedInput,
  Stack,
  styled,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Form } from "react-router-dom";
import type { Profile } from "./profileUtils";
import type { ProfileVerb } from "./ProfileCreateEdit";

interface ProfileFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  verb: ProfileVerb;
  initialProfile?: Profile | undefined;
  isLoading: boolean;
}

const FlexGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export function ProfileForm({
  handleSubmit,
  verb,
  initialProfile,
  isLoading,
}: Readonly<ProfileFormProps>) {
  return (
    <Grid
      component="form"
      container
      spacing={3}
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
      <FlexGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="first-name" required>
          First name
        </FormLabel>
        <OutlinedInput
          id="first-name"
          name="first_name"
          placeholder="First Name"
          size="small"
          defaultValue={initialProfile?.first_name}
          required
        />
      </FlexGrid>
      <FlexGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="last-name" required>
          Last name
        </FormLabel>
        <OutlinedInput
          id="last-name"
          name="last_name"
          placeholder="Last Name"
          size="small"
          defaultValue={initialProfile?.last_name}
          required
        />
      </FlexGrid>
      <FlexGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="address" required>
          Address
        </FormLabel>
        <OutlinedInput
          id="address"
          name="address"
          placeholder="221B Replace Me"
          size="small"
          defaultValue={initialProfile?.address}
          required
        />
      </FlexGrid>
      <FlexGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="city" required>
          City
        </FormLabel>
        <OutlinedInput
          id="city"
          name="city"
          type="city"
          placeholder="Faketown"
          size="small"
          defaultValue={initialProfile?.city}
          required
        />
      </FlexGrid>
      <FlexGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="state" required>
          State
        </FormLabel>
        <OutlinedInput
          id="state"
          name="state"
          type="state"
          placeholder="ZZ"
          size="small"
          defaultValue={initialProfile?.state}
          required
        />
      </FlexGrid>
      <FlexGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="zip" required>
          Zip
        </FormLabel>
        <OutlinedInput
          id="zip"
          name="zip"
          type="zip"
          placeholder="11111"
          size="small"
          defaultValue={initialProfile?.zip}
          required
        />
      </FlexGrid>
      <FlexGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="phone" required>
          Phone
        </FormLabel>
        <OutlinedInput
          id="phone"
          name="phone"
          type="phone"
          placeholder="(555) 555-0199"
          size="small"
          defaultValue={initialProfile?.phone}
          required
        />
      </FlexGrid>
      <FlexGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="email" required>
          Email
        </FormLabel>
        <OutlinedInput
          id="email"
          name="email"
          type="email"
          placeholder="replace_this@fictitious.example"
          size="small"
          defaultValue={initialProfile?.email}
          required
        />
      </FlexGrid>
      <FlexGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="photo">Photo</FormLabel>
        <OutlinedInput
          id="photo"
          name="photo"
          type="photo"
          placeholder="fakeurl.fictitious.example/photo.jpg"
          size="small"
          defaultValue={initialProfile?.photo}
        />
      </FlexGrid>
      <FlexGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="notes">Notes</FormLabel>
        <TextField
          id="notes"
          name="notes"
          placeholder="Your freeform notes go here"
          multiline
          rows={4}
          defaultValue={initialProfile?.notes}
        />
      </FlexGrid>
      <FlexGrid size={{ xs: 12 }}>
        <Button type="submit" variant="contained" loading={isLoading}>
          Submit
        </Button>
      </FlexGrid>
    </Grid>
  );
}
