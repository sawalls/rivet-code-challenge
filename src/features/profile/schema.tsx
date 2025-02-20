import { string, object, ObjectSchema } from "yup";
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
      /\d*\d*\d*\d*\d*\d*\d*\d*\d*\d/,
      "phone number must at least include 10 digits"
    )
    .max(255),
  email: string().required().max(255),
  address: string()
    .required()
    .matches(/\d/, "address must contain a number")
    .max(255),
  city: string().required().max(255),
  state: string().required().max(255),
  zip: string()
    .required()
    .matches(/\d*\d*\d*\d*\d/, "ZIP codes must include at least 5 digits")
    .max(255),
  photo: string().required().max(255),
  notes: string().required().max(4294967295),
});
