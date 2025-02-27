import { object, ObjectSchema, string } from "yup";
import { ProfileNoId } from "./profileUtils";

export const posIntSchema = string()
  .required()
  .matches(
    /^[1-9][0-9]*$/,
    "profile id must be a positive integer with no leading zeros"
  );

export const profileNoIdSchema: ObjectSchema<ProfileNoId> = object({
  first_name: string().required().max(255),
  last_name: string().required().max(255),
  phone: string()
    .required()
    .matches(
      /\d.*\d.*\d.*\d.*\d.*\d.*\d.*\d.*\d.*\d/,
      "Phone number must at least include 10 digits"
    )
    .max(255),
  email: string().required().max(255),
  address: string()
    .required()
    .matches(/\d/, "Address must contain a number")
    .max(255),
  city: string().required().max(255),
  state: string()
    .optional()
    .test(
      "len",
      "State must be exactly 2 characters (or absent)",
      (val) => !val || val.length === 2
    ),
  zip: string()
    .required()
    .matches(/\d.*\d.*\d.*\d.*\d/, "ZIP codes must include at least 5 digits")
    .max(255),
  photo: string().max(255),
  notes: string().max(4294967295),
});
