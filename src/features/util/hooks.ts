import { useParams } from "react-router-dom";
import { string } from "yup";

export const useProfileIdParam = () => {
  const { id } = useParams<{ id: string }>();
  const schema = string()
    .required()
    .matches(
      /^[1-9][0-9]*$/,
      "profile id must be a positive integer with no leading zeros",
    );
  const profileId = parseInt(schema.validateSync(id));
  return profileId;
};
