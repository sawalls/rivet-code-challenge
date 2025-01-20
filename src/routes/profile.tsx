import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { currentProfile } from "../features/profile/profileSlice";

function Profile () {
    const profile = useSelector(currentProfile);
    if (!profile) {
        // TODO make this return an error page
        return <h1>No selected profile found</h1>;
    }

    console.log('routed_profile_id', profile ? profile.id : 'none'); 
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