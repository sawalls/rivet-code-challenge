import {
  Button,
  FormHelperText,
  FormLabel,
  OutlinedInput,
  styled,
} from "@mui/material";
import Grid, { GridSize } from "@mui/material/Grid2";
import { ResponsiveStyleValue } from "@mui/system";
import Photo from "./Photo";
import type { FormErrorInfo } from "./ProfileCreateEdit";
import type { Profile } from "./profileUtils";

const FlexGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  position: "relative",
}));

interface FieldSpec {
  path: keyof Profile;
  label: string;
  placeholder: string;
  required?: boolean;
  type?: string;
  size?: ResponsiveStyleValue<GridSize> | undefined;
  rows?: number;
}

interface InputProps {
  fieldSpec: FieldSpec;
  defaultValue: unknown;
  errorInfo?: FormErrorInfo | null;
}

const Input = ({
  fieldSpec: field,
  defaultValue,
  errorInfo = null,
}: InputProps) => {
  const {
    path,
    label,
    placeholder,
    required = false,
    type = "text",
    size = { xs: 12, md: 6 },
    rows = 1,
  } = field;
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
        defaultValue={defaultValue}
        required={required}
        type={type}
        error={!!helperText}
        multiline={rows > 1}
        rows={rows}
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

const inputFields: FieldSpec[] = [
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
  {
    path: "notes" as const,
    label: "Notes",
    placeholder: "Your freeform notes go here",
    required: false,
    type: "text",
    rows: 4,
    size: 12,
  },
  {
    path: "photo" as const,
    label: "Photo URL",
    placeholder: "fakeurl.fictitious.example/photo.jpg",
    required: false,
    type: "url",
    size: 12,
  },
];

interface FormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  initialProfile?: Profile | undefined;
  isLoading: boolean;
  errorInfo: FormErrorInfo | null;
}

export function Form({
  handleSubmit,
  initialProfile,
  isLoading,
  errorInfo,
}: Readonly<FormProps>) {
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
        <Input
          key={field.path}
          fieldSpec={field}
          defaultValue={initialProfile?.[field.path]}
          errorInfo={errorInfo}
        />
      ))}
      <Grid size={12} display="flex" justifyContent={"center"}>
        <Photo profile={initialProfile} size="20em" />
      </Grid>
      <FlexGrid size={12}>
        <Button type="submit" variant="contained" loading={isLoading}>
          Submit
        </Button>
      </FlexGrid>
    </Grid>
  );
}
