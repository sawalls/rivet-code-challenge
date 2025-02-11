import { Box, Stack } from "@mui/material";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";

import { ProfileLineItem } from "../features/profile/ProfileLineItem";
import { profileList, status, error } from "../features/profile/profileSlice";

const ProfileList = () => {
  const profiles = useSelector(profileList);
  const profileListStatus = useSelector(status);
  const profileListError = useSelector(error);

  let innerElement;
  if (profileListStatus === 'fulfilled') {
    innerElement = profiles.length > 0 && profiles.map((profile)=>(
      <Link to={`/profile/${profile.id}`} key={profile.id}>
        <Box sx={{ backgroundColor: 'white', 
                  borderRadius: '4px', 
                  overflow: 'hidden', 
                  boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, .1)',
                  cursor: 'pointer'
                  }} 
            key={profile.id} >
          <ProfileLineItem profile={profile}/>
        </Box>
      </Link>
    ));
  } else if (profileListStatus === 'pending') {
    innerElement = 'Trying to fetch profile list...';
  } else if (profileListStatus === 'rejected') {
    innerElement = `ERROR fetching profile list: ${profileListError}`;
  }

  return (
    <Stack spacing={1} sx={{textAlign: 'left'}}>
      <Link to={"/profile/create"}>
        <Box sx={{   boxSizing: 'border-box', }}>
          <Box sx={{ border: '1px solid gray',
                    backgroundColor: 'white', 
                    padding: '.5em', 
                    height: '1em', 
                    borderRadius: '4px',
                    cursor: 'pointer',
                    lineHeight: '1.2em',
                    }}>
            Create new profile: ➕
          </Box>
        </Box>
      </Link>
      { innerElement }
    </Stack>
  )
}

export default ProfileList;