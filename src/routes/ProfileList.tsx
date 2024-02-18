import { Box, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";

import { ProfileLineItem } from "../features/profile/ProfileLineItem";
import { profileList, setActiveProfile } from "../features/profile/profileSlice";

const ProfileList = () => {
  const profiles = useSelector(profileList);
  const dispatch = useDispatch();

  return (
    <Stack spacing={1} sx={{textAlign: 'left'}}>
      { profiles.length > 0 && profiles.map((profile)=>(
        <Link to={`/profile/${profile.id}`} onClick={()=>dispatch(setActiveProfile(profile.id))}>
          {/* TODO: switch this from an onClick so that it happens w/ forward and backward in browser */}
          <Box sx={{ backgroundColor: 'white', 
                    borderRadius: '4px', 
                    overflow: 'hidden', 
                    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, .1)',
                    cursor: 'pointer'
                    }} 
              key={profile.id} >
            <ProfileLineItem profile={profile} />
          </Box>
        </Link>
      ))}
    </Stack>
  )
}

// TODO: figure out how to integrate react-router Loader with profileList slice

export default ProfileList;