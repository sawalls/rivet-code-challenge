import { useParams } from "react-router-dom";
import { posIntSchema } from "../profile/schema";

export const useProfileIdParam = () => {
  const { id } = useParams<{ id: string }>();
  const profileId = parseInt(posIntSchema.validateSync(id));
  return profileId;
};
