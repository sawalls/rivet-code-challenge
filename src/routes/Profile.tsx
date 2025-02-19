import { Link } from "react-router-dom";
import { useGetProfileByIdQuery } from "../features/profile/profileApi";
import RTKQueryWrapper from "../features/util/RTKQueryWrapper";
import { useProfileIdParam } from "../features/util/hooks";

function Profile() {
  const id = useProfileIdParam();
  const profileResult = useGetProfileByIdQuery(id);
  // TODO: flesh this out a bit more. Error / loading states, etc.
  return <RTKQueryWrapper useQueryHookResult={profileResult} operation="get profile">
    <ProfileWrapped profile={profileResult.data} />
  </RTKQueryWrapper>;
}

// TODO: add typing here when it's added on to profileAPI
function ProfileWrapped({profile}: {profile: any}) {
  const {
    id, first_name, last_name, phone, email, address, city, state, zip, photo, notes,
  } = profile;

  return (
    <div>
      <h2>
        {first_name} {last_name}
      </h2>
      <p>
        <Link to={`/profile/${id}/edit`}>Edit this profile</Link>
      </p>
      <img src={photo} alt="This profile's avatar" />
      <p>{address}</p>
      <p>
        {city} {state} {zip}
      </p>
      <p>
        Contact: {phone} {email}
      </p>
      <p>Notes: {notes}</p>
    </div>
  );
}

export default Profile;
