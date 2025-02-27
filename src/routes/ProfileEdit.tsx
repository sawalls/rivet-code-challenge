import { ProfileCreateEdit } from "../features/profile/ProfileCreateEdit";
import {
  useEditProfileMutation,
  useGetProfileByIdQuery,
} from "../features/profile/profileApi";
import RTKQueryWrapper from "../features/util/RTKQueryWrapper";
import { useProfileIdParam } from "../features/util/hooks";

export const ProfileEdit = () => {
  const mutation = useEditProfileMutation();
  const id = useProfileIdParam();
  const queryResult = useGetProfileByIdQuery(id);
  const { isSuccess, data } = queryResult;

  return (
    <RTKQueryWrapper useQueryHookResult={queryResult} operation="get profile">
      {isSuccess && (
        <ProfileCreateEdit
          mutation={mutation}
          verb="edit"
          initialProfile={data}
          id={id}
        />
      )}
    </RTKQueryWrapper>
  );
};

export default ProfileEdit;
