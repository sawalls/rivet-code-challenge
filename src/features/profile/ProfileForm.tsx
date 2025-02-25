import {
  Button,
  FormHelperText,
  FormLabel,
  OutlinedInput,
  styled,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import type { Profile } from "./profileUtils";
import type { ProfileFormErrorInfo } from "./ProfileCreateEdit";
import Photo from "./Photo";

const FlexGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  position: "relative",
}));

const ProfileInput = ({
  path,
  label,
  placeholder,
  initialProfile,
  required = false,
  type = "text",
  errorInfo = null,
}: {
  path: keyof Profile;
  label: string;
  placeholder: string;
  initialProfile?: Profile;
  required?: boolean;
  type?: string;
  errorInfo?: ProfileFormErrorInfo | null;
}) => {
  let helperText = "";
  if (errorInfo?.path === path) {
    helperText = errorInfo.message;
  }
  return (
    <FlexGrid size={{ xs: 12, md: 6 }}>
      <FormLabel htmlFor={path} required={required}>
        {label}
      </FormLabel>
      <OutlinedInput
        id={path}
        name={path}
        placeholder={placeholder}
        size="small"
        defaultValue={initialProfile?.[path]}
        required={required}
        type={type}
        error={!!helperText}
      />
      <FormHelperText
        error={!!helperText}
        style={{
          position: "absolute",
          top: "100%",
          left: 0,
          zIndex: 1,
        }}
      >
        {helperText}
      </FormHelperText>
    </FlexGrid>
  );
};

interface ProfileFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  initialProfile?: Profile | undefined;
  isLoading: boolean;
  errorInfo: ProfileFormErrorInfo | null;
}

export function ProfileForm({
  handleSubmit,
  initialProfile,
  isLoading,
  errorInfo,
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
      <ProfileInput
        path="first_name"
        label="First Name"
        placeholder="First Name"
        initialProfile={initialProfile}
        required
        errorInfo={errorInfo}
      />
      <ProfileInput
        path="last_name"
        label="Last Name"
        placeholder="Last Name"
        initialProfile={initialProfile}
        required
        errorInfo={errorInfo}
      />
      <ProfileInput
        path="address"
        label="Address"
        placeholder="221B Replace Me"
        initialProfile={initialProfile}
        required
        errorInfo={errorInfo}
      />
      <ProfileInput
        path="city"
        label="City"
        placeholder="Faketown"
        initialProfile={initialProfile}
        required
        errorInfo={errorInfo}
      />
      <ProfileInput
        path="state"
        label="State"
        placeholder="ZZ"
        initialProfile={initialProfile}
        required
        errorInfo={errorInfo}
      />
      <ProfileInput
        path="zip"
        label="Zip"
        placeholder="11111"
        initialProfile={initialProfile}
        required
        errorInfo={errorInfo}
      />
      <ProfileInput
        path="phone"
        label="Phone"
        placeholder="(555) 555-0199"
        initialProfile={initialProfile}
        required
        type="tel"
        errorInfo={errorInfo}
      />
      <ProfileInput
        path="email"
        label="Email"
        placeholder="replace_this@fictitious.example"
        initialProfile={initialProfile}
        required
        type="email"
        errorInfo={errorInfo}
      />
      <Grid size={4}>
        <Photo profile={initialProfile} size="3.5em" />
      </Grid>
      <Grid size={8}>
        <ProfileInput
          path="photo"
          label="Photo URL"
          placeholder="fakeurl.fictitious.example/photo.jpg"
          initialProfile={initialProfile}
          type="url"
          errorInfo={errorInfo}
        />
      </Grid>
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
