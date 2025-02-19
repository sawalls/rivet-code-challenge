import {
  useEditProfileMutation,
  useGetProfileByIdQuery,
} from "../features/profile/profileApi";
import RTKQueryWrapper from "../features/util/RTKQueryWrapper";
import { useProfileIdParam } from "../features/util/hooks";
import { ProfileCreateEdit } from "../features/profile/ProfileCreateEdit";

export const ProfileEdit = () => {
  const [editProfile, mutationResult] = useEditProfileMutation();
  const id = useProfileIdParam();
  const queryResult = useGetProfileByIdQuery(id);

  const handleSubmitForm = async (profile: any) => {
    await editProfile({ id, profile });
  };

  return (
    <RTKQueryWrapper useQueryHookResult={queryResult} operation="get profile">
      <ProfileCreateEdit
        handleSubmitForm={handleSubmitForm}
        result={mutationResult}
        verb="edit"
        initialProfile={queryResult.data}
      />
    </RTKQueryWrapper>
  );
};

export default ProfileEdit;
