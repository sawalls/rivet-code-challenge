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
import type { Profile, ProfileNoId } from "./profileUtils";

export function ProfileForm({
  handleSubmit,
  defaultValue,
  value,
  onChange,
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
          defaultValue={defaultValue?.[field.path]}
          value={value[field.path]}
          onChange={onChange}
          errorInfo={errorInfo}
        />
      ))}
      <Grid size={12} display="flex" justifyContent={"center"}>
        <Photo profile={defaultValue} size="20em" />
      </Grid>
      <FlexGrid size={12}>
        <Button type="submit" variant="contained" loading={isLoading}>
          Submit
        </Button>
      </FlexGrid>
    </Grid>
  );
}

const FlexGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  position: "relative",
}));

interface FieldSpec {
  path: keyof ProfileNoId;
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
  value: unknown;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorInfo?: FormErrorInfo | null;
}

const Input = ({
  fieldSpec: field,
  defaultValue,
  value,
  onChange,
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
        value={value}
        onChange={onChange}
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
  defaultValue?: Profile | undefined;
  value: Partial<ProfileNoId>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  errorInfo: FormErrorInfo | null;
}
