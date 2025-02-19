import { useEditProfileMutation, useGetProfileByIdQuery } from "../features/profile/profileApi";
import RTKQueryWrapper from '../features/util/RTKQueryWrapper';
import { useProfileIdParam } from '../features/util/hooks';
import { ProfileCreateEdit } from '../features/profile/ProfileCreateEdit';

export const ProfileEdit = () => {
  const mutation = useEditProfileMutation();
  const id = useProfileIdParam();
  const result = useGetProfileByIdQuery(id);

  return <RTKQueryWrapper useQueryHookResult={result} operation="get profile">
    <ProfileCreateEdit mutation={mutation} verb="edit" initialProfile={result.data} id={id} />
  </RTKQueryWrapper>;
}

export default ProfileEdit;