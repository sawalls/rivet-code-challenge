import { useGetProfileByIdQuery } from "../features/profile/profileApi";
import RTKQueryWrapper from "../features/util/RTKQueryWrapper";
import { useProfileIdParam } from "../features/util/hooks";
import { Profile as ProfileComponent } from "../features/profile/Profile";

function Profile() {
  const id = useProfileIdParam();
  const profileResult = useGetProfileByIdQuery(id);
  const { data, isSuccess } = profileResult;

  return (
    <RTKQueryWrapper useQueryHookResult={profileResult} operation="get profile">
      {isSuccess && <ProfileComponent profile={data} />}
    </RTKQueryWrapper>
  );
}

export default Profile;
