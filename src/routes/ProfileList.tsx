import { Box, Stack } from "@mui/material";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";

import { ProfileLineItem } from "../features/profile/ProfileLineItem";
import { profileList } from "../features/profile/profileSlice";

const ProfileList = () => {
  const profiles = useSelector(profileList);

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
      ))}
    </Stack>
  )
}

export default ProfileList;