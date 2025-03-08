import {
  Button,
  FormHelperText,
  FormLabel,
  OutlinedInput,
  styled,
  TextField,
} from "@mui/material";
import Grid, { GridSize } from "@mui/material/Grid2";
import { ResponsiveStyleValue } from "@mui/system";
import Photo from "./Photo";
import type { ProfileFormErrorInfo } from "./ProfileCreateEdit";
import type { Profile } from "./profileUtils";

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
  size = { xs: 12, md: 6 },
}: {
  path: keyof Profile;
  label: string;
  placeholder: string;
  initialProfile?: Profile;
  required?: boolean;
  type?: string;
  errorInfo?: ProfileFormErrorInfo | null;
  size?: ResponsiveStyleValue<GridSize> | undefined;
}) => {
  let helperText = "";
  if (errorInfo?.path === path) {
    helperText = errorInfo.message;
  }
  return (
    <FlexGrid size={size}>
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

const inputFields = [
  {
    path: "first_name" as const,
    label: "First Name",
    placeholder: "First Name",
    required: true,
  },
  {
    path: "last_name" as const,
    label: "Last Name",
    placeholder: "Last Name",
    required: true,
  },
  {
    path: "address" as const,
    label: "Address",
    placeholder: "221B Replace Me",
    required: true,
  },
  {
    path: "city" as const,
    label: "City",
    placeholder: "Faketown",
    required: true,
  },
  { path: "state" as const, label: "State", placeholder: "ZZ", required: true },
  { path: "zip" as const, label: "Zip", placeholder: "11111", required: true },
  {
    path: "phone" as const,
    label: "Phone",
    placeholder: "(555) 555-0199",
    required: true,
    type: "tel",
  },
  {
    path: "email" as const,
    label: "Email",
    placeholder: "replace_this@fictitious.example",
    required: true,
    type: "email",
  },
];

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
      {inputFields.map((field) => (
        <ProfileInput
          key={field.path}
          path={field.path}
          label={field.label}
          placeholder={field.placeholder}
          initialProfile={initialProfile}
          required={field.required}
          type={field.type}
          errorInfo={errorInfo}
        />
      ))}
      <FlexGrid size={12}>
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
      <Grid size={12} display="flex" justifyContent={"center"}>
        <Photo profile={initialProfile} size="20em" />
      </Grid>
      <ProfileInput
        path="photo"
        label="Photo URL"
        placeholder="fakeurl.fictitious.example/photo.jpg"
        initialProfile={initialProfile}
        type="url"
        errorInfo={errorInfo}
        size={12}
      />
      <FlexGrid size={12}>
        <Button type="submit" variant="contained" loading={isLoading}>
          Submit
        </Button>
      </FlexGrid>
    </Grid>
  );
}
