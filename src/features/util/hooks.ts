import { useParams } from "react-router-dom";
import { posIntSchema } from "../profile/schema";

export const useProfileIdParam = () => {
  const { id } = useParams<{ id: string }>();
  const profileId = parseInt(posIntSchema.validateSync(id));
  return profileId;
};

export const useUnsafeProfileIdParam = () => {
  // Try your darnedest to parse it but don't throw an error if you can't
  const { id } = useParams<{ id: string }>();
  try {
    const profileId = parseInt(posIntSchema.validateSync(id));
    return profileId;
  } catch (e) {
    return null;
  }
};
