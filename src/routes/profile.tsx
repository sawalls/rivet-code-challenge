import { useSelector, useDispatch } from "react-redux";

import { currentProfile } from "../features/profile/profileSlice";

function Profile () {
    const profile = useSelector(currentProfile);
    if (!profile) {
        // TODO make this return an error page
        return <h1>No selected profile found</h1>;
    }

    console.log('routed_profile_id', profile ? profile.id : 'none'); 
    const { first_name, last_name, phone, email, address, city, state, zip, photo, notes } = profile;

    // TODO add a button to edit the profile
    return (
        <div>
            <h2>{first_name} {last_name}</h2>
            <img src={photo}/>
            <p>{address}</p>
            <p>{city} {state} {zip}</p>
            <p>Contact: {phone} {email}</p>
            <p>{notes}</p>
        </div>
    );
}

export default Profile;