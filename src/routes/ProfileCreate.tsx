import { useCreateProfileMutation } from "../features/profile/profileApi";
import { ProfileCreateEdit } from "../features/profile/ProfileCreateEdit";

export const ProfileCreate = () => {
  const mutation = useCreateProfileMutation();

  return <ProfileCreateEdit mutation={mutation} verb="create" />;
};

export default ProfileCreate;
