import { useCreateProfileMutation } from "../features/profile/profileApi";
import { ProfileCreateEdit } from "../features/profile/ProfileCreateEdit";

export const ProfileCreate = () => {
  return <ProfileCreateEdit mutation={useCreateProfileMutation()} verb="create" />;
};

export default ProfileCreate;