import { Box, Stack } from "@mui/material";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";

import { ProfileLineItem } from "../features/profile/ProfileLineItem";
import { profileList, fetchProfile } from "../features/profile/profileSlice";
import { useAppDispatch } from "../store";

const ProfileList = () => {
  const profiles = useSelector(profileList);
  const appDispatch = useAppDispatch();

  function handleClickAdd() {
    alert('Should add another profile!')
  }

  return (
    <Stack spacing={1} sx={{textAlign: 'left'}}>
      <Box sx={{   boxSizing: 'border-box', width: '32em', padding: '.5em', margin: '0 auto', maxWidth: '100%', position: 'absolute', left: 0, right: 0 }}>
        <Box sx={{ border: '1px solid gray',
                  backgroundColor: 'white', 
                  padding: '.5em', 
                  width: '1em', 
                  height: '1em', 
                  float: 'right', 
                  borderRadius: '4px',
                  cursor: 'pointer',
                  lineHeight: '1.2em'
                  }}
            onClick={()=>handleClickAdd()}>
          Create new profile: ➕
        </Box>
      </Box>
      { profiles.length > 0 && profiles.map((profile)=>(
        <Link to={`/profile/${profile.id}`} onClick={()=>appDispatch(fetchProfile(profile.id))}>
          {/* TODO: switch this from an onClick so that it happens w/ forward and backward in browser. */}
          {/* TODO: I think that means a react-router Loader? And maybe some middleware? */}
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
// maybe this involves passing in a dispatch from index.tsx?

export default ProfileList;