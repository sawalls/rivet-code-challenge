import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { currentProfile, setActiveProfile, } from "../features/profile/profileSlice";

function Profile () {
    const current = useSelector(currentProfile);
    const dispatch = useDispatch();
    const {id: routed_profile_id} = useParams();

    console.log('routed_profile_id', routed_profile_id);
    //dispatch(setActiveProfile(routed_profile_id));

    return (
        <div>
            <h1>Profile {current?.id ? current.id : 'none'}</h1>
        </div>
    );
}

export default Profile;