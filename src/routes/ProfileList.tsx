import { useGetProfilesQuery } from "../features/profile/profileApi";
import ProfileListComponent from "../features/profile/ProfileList";
import RTKQueryWrapper from "../features/util/RTKQueryWrapper";

const ProfileList = () => {
  const result = useGetProfilesQuery();

  return (
    <RTKQueryWrapper useQueryHookResult={result} operation="get profiles">
      {result.isSuccess && <ProfileListComponent profiles={result.data} />}
    </RTKQueryWrapper>
  );
};

export default ProfileList;
