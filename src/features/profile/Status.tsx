import { Box } from "@mui/material";
import { countProfiles, currentProfile } from "./profileSlice";
import { useSelector } from "react-redux";

const Status = () => {
  const count = useSelector(countProfiles)
  const current = useSelector(currentProfile);


  return (
    <Box sx={{fontSize: '12px', color: '#888', marginTop: '1em'}}>
      Loaded { count } profile(s). Last selected profile id: {current?.id ? current.id : 'none'}
    </Box>
  )
}

export { Status }