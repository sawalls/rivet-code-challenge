import { useCreateProfileMutation } from "../features/profile/profileApi";
import { ProfileCreateEdit } from "../features/profile/ProfileCreateEdit";

export const ProfileCreate = () => {
  const [createProfile, result] = useCreateProfileMutation();
  const handleSubmit = async (profile: any) => {
    await createProfile(profile);
  };
  return (
    <ProfileCreateEdit
      handleSubmitForm={handleSubmit}
      result={result}
      verb="create"
    />
  );
};

export default ProfileCreate;
