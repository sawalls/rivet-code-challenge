import { useGetProfileByIdQuery } from "../features/profile/profileApi";
import RTKQueryWrapper from "../features/util/RTKQueryWrapper";
import { useProfileIdParam } from "../features/util/hooks";
import { Profile as ProfileComponent } from "../features/profile/Profile";

function Profile() {
  const id = useProfileIdParam();
  const profileResult = useGetProfileByIdQuery(id);
  // TODO: flesh this out a bit more. Error / loading states, etc.
  return (
    <RTKQueryWrapper useQueryHookResult={profileResult} operation="get profile">
      {profileResult.isSuccess && (
        <ProfileComponent profile={profileResult.data} />
      )}
    </RTKQueryWrapper>
  );
}

export default Profile;
