import { Box } from '@mui/material';
import { Outlet } from "react-router-dom";

import { Status } from '../features/profile/Status';
import { fetchProfiles } from '../features/profile/profileSlice';
import { useAppDispatch } from '../store';

function Root() {
    const dispatch = useAppDispatch();
    dispatch(fetchProfiles());
  
    return (
      <div className="App">
        <header className="App-header" style={{textAlign: 'center'}}>
          <Box>
            <h1>Schala Challenge Solution</h1>
          </Box>
          <Box sx={{width: '32em', boxSizing: 'border-box', padding: '.5em', margin: '0 auto', maxWidth: '100%'}}>
            <Outlet />
          </Box>
          <Status></Status>
        </header>
      </div>
    );
}
  
export default Root;  