import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { setActiveProfile, currentProfile} from "../features/profile/profileSlice";

function Profile () {
    const profile = useSelector(currentProfile);
    // TODO move the dispatch into a react-router loader somehow
    //const {id: routed_profile_id} = useParams();

    console.log('routed_profile_id', profile ? profile.id : 'none'); 

    return (
        <div>
            <h1>Profile {profile ? profile.id : 'none'}</h1>
        </div>
    );
}

export default Profile;