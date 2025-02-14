import { Link, useParams } from "react-router-dom";
import { useGetProfileByIdQuery } from "../features/profile/profileApi";

function Profile () {
    const { id: profileId } = useParams();
    const profileResult = useGetProfileByIdQuery(profileId);
    // TODO: flesh this out a bit more
    const profile = profileResult.isSuccess ? profileResult.data : null;

    if (!profile) {
        // TODO make this return an error page
        return <h1>No selected profile found</h1>;
    }

    const { first_name, last_name, phone, email, address, city, state, zip, photo, notes } = profile;

    return (
        <div>
            <h2>{first_name} {last_name}</h2>
            <p><Link to={`/profile/${profile.id}/edit`}>Edit this profile</Link></p>
            <img src={photo} alt="This profile's avatar"/>
            <p>{address}</p>
            <p>{city} {state} {zip}</p>
            <p>Contact: {phone} {email}</p>
            <p>Notes: {notes}</p>
        </div>
    );
}

export default Profile;